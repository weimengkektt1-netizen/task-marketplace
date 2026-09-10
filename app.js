// ========================================
// TaskHub - App
// 用户端基础功能
// ========================================


// ========================================
// Supabase 配置
// ========================================

const SUPABASE_URL = "https://pkinowzrhteoduvrttdk.supabase.co";

const SUPABASE_KEY = "sb_publishable_aPZF0KY7OFoDaZ_wIT60tg_2Hc_ctLT";

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

        alert("请输入邮箱和密码");
        return;

    }

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });


    if (error) {

        alert(
            "登录失败：\n" +
            error.message
        );

        return;

    }


    window.location.href =
        "dashboard.html";

}


// ========================================
// 注册
// ========================================

async function register() {

    const emailInput =
        document.getElementById("registerEmail");

    const passwordInput =
        document.getElementById("registerPassword");


    if (!emailInput || !passwordInput) {

        console.error("找不到注册输入框");
        return;

    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    if (!email || !password) {

        alert("请输入邮箱和密码");
        return;

    }


    if (password.length < 6) {

        alert(
            "密码至少需要 6 个字符"
        );

        return;

    }


    const { data, error } =
        await supabaseClient.auth.signUp({

            email: email,
            password: password

        });


    if (error) {

        alert(
            "注册失败：\n" +
            error.message
        );

        return;

    }


    alert(
        "✅ 注册成功！\n\n" +
        "如果系统要求验证邮箱，请先完成邮箱验证，然后再登录。"
    );


    // 注册成功后切换回登录
    switchAuth("login");

}


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