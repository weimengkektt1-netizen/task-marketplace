// ========================================
// TaskHub - App
// 用户端基础功能
// ========================================


// ========================================
// Supabase 配置
// ========================================

const SUPABASE_URL = "https://pkinowzrhteoduvrttdk.supabase.co";

const SUPABASE_KEY = "sb_publishable_aPZF0KY7OFoDaZ_wIT60tg_2Hc_ctLT";


// ========================================
// ShopHub 商城地址（刷单任务跳转目标）
// 部署上线后请改为 ShopHub 正式网址，例如：
// const SHOP_HUB_BASE = "https://shophub.yourdomain.com/index.html";
// ========================================

const SHOP_HUB_BASE = "https://task-hub.co/shophub/index.html";


// 组装跳转 ShopHub 指定商品页的链接（携带任务/领取信息）
function shopHubUrl(productId, taskId, claimId) {

    const params = [];

    if (taskId) params.push("task=" + encodeURIComponent(taskId));

    if (claimId) params.push("claim=" + encodeURIComponent(claimId));

    const query = params.length > 0 ? "?" + params.join("&") : "";

    return SHOP_HUB_BASE + "#product/" + productId + query;

}

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// 打开登录 / 注册窗口
// ========================================

function openAuth(type) {

    const modal =
        document.getElementById("authModal");

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    if (!modal || !loginForm || !registerForm) {
        console.error("找不到登录窗口元素");
        return;
    }

    modal.classList.add("active");

    if (type === "register") {

        loginForm.style.display = "none";
        registerForm.style.display = "block";

    } else {

        loginForm.style.display = "block";
        registerForm.style.display = "none";

    }

}


// ========================================
// 关闭登录窗口
// ========================================

function closeAuth() {

    const modal =
        document.getElementById("authModal");

    if (modal) {
        modal.classList.remove("active");
    }

}


// ========================================
// 切换登录 / 注册
// ========================================

function switchAuth(type) {

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    if (!loginForm || !registerForm) {
        return;
    }

    if (type === "register") {

        loginForm.style.display = "none";
        registerForm.style.display = "block";

    } else {

        loginForm.style.display = "block";
        registerForm.style.display = "none";

    }

}


// ========================================
// 登录
// ========================================

async function login() {

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {
        console.error("找不到登录输入框");
        return;
    }

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    if (!email || !password) {

        alert(I18N.t("msg.enterEmailPwd"));
        return;

    }

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });


    if (error) {

        alert(
            I18N.t("msg.loginFailed") +
            error.message
        );

        return;

    }


    window.location.href =
        "dashboard.html";

}


// ========================================
// 注册
// 字段：昵称 / 邮箱 / 电话号码 / 密码 / 确认密码
// ========================================

async function register() {

    const nameInput =
        document.getElementById("registerName");

    const emailInput =
        document.getElementById("registerEmail");

    const phoneInput =
        document.getElementById("registerPhone");

    const passwordInput =
        document.getElementById("registerPassword");

    const confirmInput =
        document.getElementById("registerConfirmPassword");

    const inviteInput =
        document.getElementById("registerInvite");


    if (!emailInput || !passwordInput) {

        console.error("找不到注册输入框");
        return;

    }


    const name =
        nameInput ? nameInput.value.trim() : "";

    const email =
        emailInput.value.trim();

    const phone =
        phoneInput ? phoneInput.value.trim() : "";

    const password =
        passwordInput.value;

    const confirm =
        confirmInput ? confirmInput.value : "";


    // ================================
    // 基本校验
    // ================================

    if (!name) {

        alert(I18N.t("msg.nameRequired"));
        return;

    }


    if (!email) {

        alert(I18N.t("msg.enterEmailPwd"));
        return;

    }


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        )
    ) {

        alert(I18N.t("msg.emailInvalid"));
        return;

    }


    if (!phone) {

        alert(I18N.t("msg.phoneRequired"));
        return;

    }


    if (
        phone.replace(/\D/g, "").length <
        8
    ) {

        alert(I18N.t("msg.phoneInvalid"));
        return;

    }


    if (password.length < 6) {

        alert(
            I18N.t("msg.passwordTooShort")
        );

        return;

    }


    if (password !== confirm) {

        alert(
            I18N.t("msg.passwordMismatch")
        );

        return;

    }


    // ================================
    // 注册（昵称 / 电话存入 user_metadata，
    // 不修改数据库 schema）
    // ================================

    const { data, error } =
        await supabaseClient.auth.signUp({

            email: email,
            password: password,

            options: {
                data: {
                    display_name: name,
                    phone: phone,
                    invite_code: inviteInput ? inviteInput.value.trim() : ""
                }
            }

        });


    if (error) {

        alert(
            I18N.t("msg.registerFailed") +
            error.message
        );

        return;

    }


    alert(
        I18N.t("msg.registerSuccess")
    );


    // 注册成功后切换回登录
    switchAuth("login");

}


// ========================================
// 首页滚动到任务
// ========================================

// ========================================
// 移动端菜单
// ========================================

function toggleMobileMenu() {

    const menu =
        document.getElementById("mobileNav");

    if (menu) {

        menu.classList.toggle("open");

    }

}


// 点击菜单项后自动关闭

document.addEventListener("click", function (event) {

    const menu =
        document.getElementById("mobileNav");

    const toggle =
        document.querySelector(".nav-toggle");

    if (
        menu &&
        menu.classList.contains("open") &&
        (!toggle || !toggle.contains(event.target)) &&
        !menu.contains(event.target)
    ) {

        menu.classList.remove("open");

    }

});


// ========================================
// 首页滚动到任务
// ========================================

function scrollToTasks() {

    const element =
        document.getElementById("tasks");

    if (element) {

        element.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ========================================
// 登出
// ========================================

async function logout() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "index.html";

}
