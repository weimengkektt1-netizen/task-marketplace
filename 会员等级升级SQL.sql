-- ============================================================
-- TaskHub 会员等级体系升级（旧 4 级 → 新 6 级）
-- 说明：
--   · 本脚本只重建 3 个数据库函数，不修改任何表结构 / RLS / 其他函数
--   · 运行前请确认没有其他正在进行的注册/领取操作（影响极小）
--   · 新等级：初章2% / 银章6% / 金章8% / 铂章12% / 钻章15% / 曜章18%
-- 在 Supabase SQL Editor 中整段运行即可
-- ============================================================

-- 1) 管理员修改会员等级：允许 6 个等级
create or replace function public.admin_update_membership(
    p_user_id uuid,
    p_level text default null,
    p_balance numeric default null,
    p_display_name text default null,
    p_phone text default null
)
returns json
language plpgsql
security definer
set search_path = 'public'
as $function$
declare
    v_role text;
begin
    select role into v_role from profiles where id = auth.uid();
    if v_role <> 'admin' then
        raise exception '没有管理员权限';
    end if;
    if p_level is not null and p_level not in ('basic','silver','gold','platinum','diamond','radiant') then
        raise exception '无效的会员等级';
    end if;
    update profiles set
        membership_level = coalesce(p_level, membership_level),
        balance = coalesce(p_balance, balance),
        display_name = coalesce(nullif(btrim(p_display_name), ''), display_name),
        phone = coalesce(nullif(btrim(p_phone), ''), phone)
    where id = p_user_id;
    return json_build_object('ok', true);
end;
$function$;

-- 2) 每日接单限额触发器：按新等级（银章2 / 金章5 / 铂章10 / 钻章20 / 曜章不限）
create or replace function public.check_daily_claim_limit()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $function$
declare
    v_level text;
    v_role text;
    v_limit int;
    v_count int;
begin
    select membership_level, role into v_level, v_role from public.profiles where id = new.user_id;
    if v_role = 'admin' then
        return new;
    end if;
    v_limit := case v_level
        when 'silver' then 2
        when 'gold' then 5
        when 'platinum' then 10
        when 'diamond' then 20
        when 'radiant' then -1
        else 1
    end;
    if v_limit < 0 then
        return new;
    end if;
    select count(*) into v_count
    from public.task_claims
    where user_id = new.user_id
      and (claimed_at AT TIME ZONE 'Asia/Kuala_Lumpur')::date = (now() AT TIME ZONE 'Asia/Kuala_Lumpur')::date;
    if v_count >= v_limit then
        raise exception '今日领取任务数量已达上限（%），升级会员可提升每日接单数', v_limit;
    end if;
    return new;
end;
$function$;

-- 3) 注册触发器：邀请自动升级（新等级：邀请3→银章 / 6→金章 / 10→铂章；只升不降）
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $function$
declare
    v_inviter uuid;
    v_code text;
    v_invite_count int;
    v_new_code text;
    v_new_level text;
    v_cur_order int;
    v_new_order int;
begin
    v_new_code := substr(md5(new.id::text || clock_timestamp()::text), 1, 10);
    loop
        exit when not exists (select 1 from public.profiles where invite_code = v_new_code);
        v_new_code := substr(md5(v_new_code || clock_timestamp()::text), 1, 10);
    end loop;

    insert into public.profiles (id, username, display_name, email, phone, invite_code, invited_by)
    values (
        new.id,
        split_part(coalesce(new.email, new.id::text), '@', 1),
        coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email, new.id::text), '@', 1)),
        new.email,
        new.raw_user_meta_data->>'phone',
        v_new_code,
        null
    );

    -- 邀请关系 + 自动升级（只升不降）
    v_code := new.raw_user_meta_data->>'invite_code';
    if v_code is not null and btrim(v_code) <> '' then
        select id into v_inviter from public.profiles where invite_code = btrim(v_code) and id <> new.id;
        if v_inviter is not null then
            update public.profiles set invited_by = v_inviter where id = new.id;
            select count(*) into v_invite_count from public.profiles where invited_by = v_inviter;
            if v_invite_count >= 10 then
                v_new_level := 'platinum';
            elsif v_invite_count >= 6 then
                v_new_level := 'gold';
            elsif v_invite_count >= 3 then
                v_new_level := 'silver';
            else
                v_new_level := null;
            end if;
            if v_new_level is not null then
                select case membership_level
                    when 'basic' then 0 when 'silver' then 1 when 'gold' then 2
                    when 'platinum' then 3 when 'diamond' then 4 when 'radiant' then 5
                    else 0 end
                into v_cur_order from public.profiles where id = v_inviter;
                v_new_order := case v_new_level
                    when 'basic' then 0 when 'silver' then 1 when 'gold' then 2
                    when 'platinum' then 3 when 'diamond' then 4 when 'radiant' then 5
                    else 0 end;
                if v_new_order > v_cur_order then
                    update public.profiles set membership_level = v_new_level where id = v_inviter;
                end if;
            end if;
        end if;
    end if;
    return new;
end;
$function$;

-- 完成。可运行以下命令确认：
-- select proname from pg_proc where proname in ('admin_update_membership','check_daily_claim_limit','handle_new_user');
