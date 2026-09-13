-- ============================================================
-- WZRY：下单人评价 + 管理员 WhatsApp 审核同步
-- 在 Supabase SQL Editor 中一次性执行本文件
-- ============================================================

-- ---------- 1. 订单评价表 ----------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  seller_id uuid not null,
  buyer_id uuid not null,
  rating int not null check (rating in (0, 1)),
  comment text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

drop policy if exists "reviews read all" on public.reviews;
create policy "reviews read all" on public.reviews for select using (true);

drop policy if exists "reviews insert own" on public.reviews;
create policy "reviews insert own" on public.reviews for insert with check (auth.uid() = buyer_id);

drop policy if exists "reviews update own" on public.reviews;
create policy "reviews update own" on public.reviews for update using (auth.uid() = buyer_id);

-- ---------- 2. 提交评价 RPC ----------
create or replace function public.submit_review(p_order_id uuid, p_rating int, p_comment text) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_ord public.orders%rowtype;
begin
  if v_user is null then raise exception '未登录'; end if;
  if p_rating not in (0, 1) then raise exception '评价无效'; end if;
  select * into v_ord from public.orders where id = p_order_id;
  if v_ord.id is null then raise exception '订单不存在'; end if;
  if v_ord.status <> 'completed' then raise exception '订单完成后才能评价'; end if;
  if v_ord.buyer_id <> v_user then raise exception '仅下单人可评价该订单'; end if;
  if v_ord.claimed_by is null then raise exception '订单无接单人'; end if;
  insert into public.reviews(order_id, seller_id, buyer_id, rating, comment)
  values (p_order_id, v_ord.claimed_by, v_user, p_rating, nullif(trim(coalesce(p_comment, '')), ''))
  on conflict (order_id) do nothing;
  return 'ok';
end $$;

-- ---------- 3. 管理员 WhatsApp 审核同步队列 ----------
create table if not exists public.admin_wa_log (
  id uuid primary key default gen_random_uuid(),
  event_type text,
  summary text,
  status text default 'pending',
  created_at timestamptz default now(),
  sent_at timestamptz
);

alter table public.admin_wa_log enable row level security;

-- 仅管理员可查看 / 更新队列
drop policy if exists "wa log admin read" on public.admin_wa_log;
create policy "wa log admin read" on public.admin_wa_log for select using (public.is_admin());

drop policy if exists "wa log admin update" on public.admin_wa_log;
create policy "wa log admin update" on public.admin_wa_log for update using (public.is_admin());

-- 记录审核事件（任何登录用户触发，security definer 插入，前端静默调用）
create or replace function public.log_wa_event(p_type text, p_summary text) returns text
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return 'noop'; end if;
  insert into public.admin_wa_log(event_type, summary)
  values (coalesce(p_type, 'event'), coalesce(p_summary, ''));
  return 'ok';
end $$;

-- 管理员标记已同步
create or replace function public.mark_wa_sent(p_id uuid) returns text
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception '需要管理员权限'; end if;
  update public.admin_wa_log set status = 'sent', sent_at = now() where id = p_id;
  return 'ok';
end $$;

-- ---------- 4. 收款设置增加管理员 WhatsApp 号码字段 ----------
alter table public.pay_settings add column if not exists wa_admin_number text;
