/* ========================================
   TaskHub - i18n
   全站中英文切换核心
   用法：
   - I18N.init()    页面加载时调用（script 加载即自动执行）
   - I18N.t(key)    取当前语言文本，支持 {param} 占位
   - I18N.toggle()  切换语言（按钮 onclick 调用）
   - data-i18n="key"              静态文本替换
   - data-i18n-placeholder="key"  输入框 placeholder 替换
   删除本文件即可整体回滚（页面恢复默认中文）
   ======================================== */

(function () {

    "use strict";

    var STORAGE_KEY = "taskhub_lang";

    var DICT = {

        /* ========== 通用 ========== */
        "common.appName": { zh: "TaskHub", en: "TaskHub" },
        "common.login": { zh: "登录", en: "Log in" },
        "common.register": { zh: "注册", en: "Sign up" },
        "common.logout": { zh: "登出", en: "Log out" },
        "common.loading": { zh: "正在加载...", en: "Loading..." },
        "common.submitting": { zh: "正在提交...", en: "Submitting..." },
        "common.user": { zh: "用户", en: "User" },
        "common.refresh": { zh: "刷新", en: "Refresh" },
        "common.back": { zh: "返回", en: "Back" },
        "common.open": { zh: "开放", en: "Open" },
        "common.closed": { zh: "关闭", en: "Closed" },
        "common.delete": { zh: "删除", en: "Delete" },
        "common.approve": { zh: "通过", en: "Approve" },
        "common.reject": { zh: "拒绝", en: "Reject" },
        "common.bank": { zh: "银行转账", en: "Bank Transfer" },
        "common.ewallet": { zh: "电子钱包", en: "E-Wallet" },
        "common.unknown": { zh: "未知", en: "Unknown" },
        "common.admin": { zh: "管理员", en: "Admin" },

        /* ========== 导航 ========== */
        "nav.home": { zh: "首页", en: "Home" },
        "nav.tasks": { zh: "任务", en: "Tasks" },
        "nav.about": { zh: "关于我们", en: "About Us" },
        "nav.login": { zh: "登录", en: "Log in" },
        "nav.register": { zh: "注册", en: "Sign up" },
        "nav.getStarted": { zh: "立即开始", en: "Get Started" },
        "nav.browseTasks": { zh: "浏览任务", en: "Browse Tasks" },
        "nav.loginMore": { zh: "登录查看更多", en: "Log in for more" },

        /* ========== 落地页 ========== */
        "home.title": { zh: "TaskHub - 兼职任务平台", en: "TaskHub - Freelance Task Platform" },
        "home.badge": { zh: "● 简单 · 灵活 · 在线", en: "● Simple · Flexible · Online" },
        "home.title1": { zh: "找到适合你的", en: "Find the right" },
        "home.title2": { zh: "线上任务", en: "online tasks" },
        "home.subtitle": { zh: "注册账号，浏览平台任务，选择适合自己的兼职工作。在空闲时间完成任务并获得报酬。", en: "Sign up, browse platform tasks, and pick the freelance jobs that suit you. Complete tasks in your free time and get paid." },
        "home.statJobs": { zh: "任务机会", en: "Task Opportunities" },
        "home.statOnline": { zh: "在线平台", en: "Online Platform" },
        "home.statEarn": { zh: "灵活赚取", en: "Flexible Earnings" },
        "home.cardTitle": { zh: "任务大厅", en: "Task Hall" },
        "home.cardOnline": { zh: "● Online", en: "● Online" },
        "home.cardTask1": { zh: "TikTok 内容任务", en: "TikTok Content Task" },
        "home.cardTask1Desc": { zh: "完成指定内容任务", en: "Complete assigned content tasks" },
        "home.cardTask2": { zh: "资料整理任务", en: "Data Organization Task" },
        "home.cardTask2Desc": { zh: "完成线上资料整理", en: "Organize online materials" },
        "home.cardTask3": { zh: "线上简单任务", en: "Simple Online Task" },
        "home.cardTask3Desc": { zh: "适合新手参与", en: "Great for beginners" },
        "home.cardTask1Full": { zh: "根据任务要求完成指定内容并提交证明。", en: "Complete the assigned content per task requirements and submit proof." },
        "home.cardTask2Full": { zh: "完成平台指定的数据整理工作。", en: "Complete the data organization work specified by the platform." },
        "home.cardTask3Full": { zh: "简单的线上任务，适合新用户参与。", en: "Simple online tasks, great for new users to get started." },
        "home.reward": { zh: "奖励", en: "Reward" },
        "home.hotTasks": { zh: "热门任务", en: "Popular Tasks" },
        "home.claimable": { zh: "可领取", en: "Available" },
        "home.viewTask": { zh: "查看任务", en: "View Task" },
        "home.whyTitle": { zh: "灵活安排你的时间", en: "Flexible Use of Your Time" },
        "home.whyDesc": { zh: "TaskHub 致力于提供一个简单、清晰的线上任务平台。用户可以根据自己的时间和能力选择任务。", en: "TaskHub is committed to providing a simple, clear online task platform. Users can choose tasks based on their own time and ability." },
        "home.step1": { zh: "注册账号", en: "Create an Account" },
        "home.step1Desc": { zh: "创建你的个人账户。", en: "Create your personal account." },
        "home.step2": { zh: "选择任务", en: "Choose a Task" },
        "home.step2Desc": { zh: "浏览平台提供的任务。", en: "Browse tasks offered on the platform." },
        "home.step3": { zh: "完成任务", en: "Complete the Task" },
        "home.step3Desc": { zh: "按照任务要求完成工作。", en: "Complete the work as required." },

        /* ========== 认证 ========== */
        "auth.welcome": { zh: "欢迎回来", en: "Welcome back" },
        "auth.loginSub": { zh: "登录你的 TaskHub 账户", en: "Log in to your TaskHub account" },
        "auth.email": { zh: "邮箱", en: "Email" },
        "auth.emailPh": { zh: "your@email.com", en: "your@email.com" },
        "auth.password": { zh: "密码", en: "Password" },
        "auth.passwordPh": { zh: "请输入密码", en: "Enter your password" },
        "auth.noAccount": { zh: "还没有账号？", en: "Don't have an account?" },
        "auth.signUpNow": { zh: "立即注册", en: "Sign up now" },
        "auth.createAccount": { zh: "创建账户", en: "Create Account" },
        "auth.registerSub": { zh: "免费注册 TaskHub", en: "Sign up for TaskHub for free" },
        "auth.name": { zh: "昵称", en: "Nickname" },
        "auth.namePh": { zh: "你的昵称", en: "Your nickname" },
        "auth.phone": { zh: "电话号码", en: "Phone Number" },
        "auth.phonePh": { zh: "+60 12-345 6789", en: "+60 12-345 6789" },
        "auth.confirmPwd": { zh: "确认密码", en: "Confirm Password" },
        "auth.confirmPwdPh": { zh: "再次输入密码", en: "Re-enter your password" },
        "auth.pwdMin": { zh: "至少 6 个字符", en: "At least 6 characters" },
        "auth.createBtn": { zh: "创建账户", en: "Create Account" },
        "auth.hasAccount": { zh: "已经有账号？", en: "Already have an account?" },
        "auth.backLogin": { zh: "返回登录", en: "Back to login" },

        /* ========== Dashboard ========== */
        "dash.overview": { zh: "总览", en: "Overview" },
        "dash.taskHall": { zh: "任务大厅", en: "Task Hall" },
        "dash.moreTasks": { zh: "更多任务", en: "More Tasks" },
        "tasks.backToDashboard": { zh: "返回仪表盘", en: "Back to Dashboard" },
        "tasks.hint": { zh: "领取后请在仪表盘的「我的任务」中提交完成证明。", en: "After claiming, submit your proof in \"My Tasks\" on the dashboard." },
        "tasks.recruiting": { zh: "招募中", en: "Recruiting" },
        "tasks.limited": { zh: "名额有限", en: "Limited Slots" },
        "tasks.ended": { zh: "已结束", en: "Ended" },
        "tasks.deadline": { zh: "截止", en: "Deadline" },
        "tasks.noDeadline": { zh: "长期有效", en: "No Deadline" },
        "tasks.applied": { zh: "已有", en: "Applied" },
        "tasks.slotsLeft": { zh: "剩余名额", en: "Slots Left" },
        "tasks.perTask": { zh: "每单", en: "per task" },
        "dash.myTasks": { zh: "我的任务", en: "My Tasks" },
        "dash.myWallet": { zh: "我的钱包", en: "My Wallet" },
        "dash.withdraw": { zh: "提现", en: "Withdraw" },
        "dash.adminPanel": { zh: "管理后台", en: "Admin Panel" },
        "dash.logout": { zh: "登出", en: "Log out" },
        "dash.userDashboard": { zh: "用户中心", en: "User Dashboard" },
        "dash.welcome": { zh: "欢迎回来", en: "Welcome back" },
        "dash.balance": { zh: "当前余额", en: "Current Balance" },
        "dash.balanceDesc": { zh: "可用于提现的账户余额", en: "Balance available for withdrawal" },
        "dash.completed": { zh: "已完成任务", en: "Completed Tasks" },
        "dash.completedDesc": { zh: "Total completed", en: "Total completed" },
        "dash.active": { zh: "进行中任务", en: "Active Tasks" },
        "dash.activeDesc": { zh: "Currently working", en: "Currently working" },
        "dash.marketplace": { zh: "可领取任务", en: "Available Tasks" },
        "dash.claimable": { zh: "可领取", en: "Available" },
        "dash.noTaskDesc": { zh: "暂无任务说明", en: "No description" },
        "dash.reward": { zh: "任务奖励", en: "Reward" },
        "dash.slots": { zh: "剩余名额", en: "Slots Left" },
        "dash.claim": { zh: "领取任务", en: "Claim Task" },
        "dash.noTasks": { zh: "目前没有可领取的任务", en: "No tasks available right now" },
        "dash.myTasksTitle": { zh: "我的任务", en: "My Tasks" },
        "dash.noMyTasks": { zh: "暂时没有领取任何任务", en: "No claimed tasks yet" },
        "dash.claimedAt": { zh: "领取时间：", en: "Claimed at: " },
        "dash.task": { zh: "任务", en: "Task" },
        "dash.submitTask": { zh: "提交任务", en: "Submit Task" },

        /* ========== 钱包 ========== */
        "wallet.title": { zh: "钱包记录", en: "Wallet Records" },
        "wallet.loading": { zh: "正在加载交易记录...", en: "Loading transactions..." },
        "wallet.failed": { zh: "无法加载交易记录", en: "Failed to load transactions" },
        "wallet.empty": { zh: "暂时没有交易记录", en: "No transactions yet" },
        "wallet.generic": { zh: "钱包交易", en: "Wallet Transaction" },
        "wallet.taskReward": { zh: "任务奖励", en: "Task Reward" },

        /* ========== 提现 ========== */
        "withdraw.title": { zh: "提现", en: "Withdraw" },
        "withdraw.amount": { zh: "提现金额", en: "Withdrawal Amount" },
        "withdraw.amountHint": { zh: "请输入你希望提现的金额。", en: "Enter the amount you wish to withdraw." },
        "withdraw.method": { zh: "提现方式", en: "Withdrawal Method" },
        "withdraw.selectMethod": { zh: "请选择提现方式", en: "Select a withdrawal method" },
        "withdraw.account": { zh: "收款账户", en: "Payee Account" },
        "withdraw.accountPlaceholder": { zh: "请输入银行账号 / 电子钱包账号", en: "Enter bank account / e-wallet account" },
        "withdraw.accountHint": { zh: "请确认收款账户资料正确。", en: "Please make sure your payee account details are correct." },
        "withdraw.guide": { zh: "提现说明", en: "Withdrawal Guide" },
        "withdraw.guideAmount": { zh: "填写提现金额", en: "Enter the withdrawal amount" },
        "withdraw.guideAmountDesc": { zh: "输入你希望提现的余额金额。", en: "Enter the amount you want to withdraw from your balance." },
        "withdraw.guideAccount": { zh: "填写收款账户", en: "Fill in the payee account" },
        "withdraw.guideAccountDesc": { zh: "选择提现方式并填写对应账户。", en: "Choose a withdrawal method and fill in the matching account." },
        "withdraw.guideWait": { zh: "等待审核处理", en: "Wait for admin review" },
        "withdraw.guideWaitDesc": { zh: "提交申请后由管理员审核提现。", en: "After submitting, an admin will review your withdrawal." },
        "withdraw.history": { zh: "提现记录", en: "Withdrawal History" },
        "withdraw.available": { zh: "可用余额", en: "Available Balance" },
        "withdraw.amount": { zh: "提现金额", en: "Withdrawal Amount" },
        "withdraw.amountHint": { zh: "请输入你希望提现的金额。", en: "Enter the amount you wish to withdraw." },
        "withdraw.method": { zh: "提现方式", en: "Withdrawal Method" },
        "withdraw.selectMethod": { zh: "请选择提现方式", en: "Select a method" },
        "withdraw.account": { zh: "收款账户", en: "Receiving Account" },
        "withdraw.accountPh": { zh: "请输入银行账号 / 电子钱包账号", en: "Enter bank account / e-wallet account" },
        "withdraw.accountHint": { zh: "请确认收款账户资料正确。", en: "Make sure the account details are correct." },
        "withdraw.bank": { zh: "提现银行", en: "Bank Name" },
        "withdraw.bankPh": { zh: "请输入银行名称（如 Maybank）", en: "Enter bank name (e.g. Maybank)" },
        "withdraw.bankHint": { zh: "请填写你希望收款使用的银行名称。", en: "Enter the bank you want to receive the payout in." },
        "withdraw.accountName": { zh: "收款人名称", en: "Payee Name" },
        "withdraw.accountNamePh": { zh: "请输入收款人姓名", en: "Enter the payee's name" },
        "withdraw.accountNameHint": { zh: "请填写与收款账号一致的姓名。", en: "Use the name that matches the receiving account." },
        "withdraw.submitBtn": { zh: "提交提现申请", en: "Submit Withdrawal" },
        "withdraw.submitting": { zh: "正在提交...", en: "Submitting..." },
        "withdraw.infoTitle": { zh: "提现说明", en: "Withdrawal Info" },
        "withdraw.step1": { zh: "填写提现金额", en: "Enter the amount" },
        "withdraw.step1Desc": { zh: "输入你希望提现的余额金额。", en: "Enter the amount you want to withdraw." },
        "withdraw.step2": { zh: "填写收款账户", en: "Enter receiving account" },
        "withdraw.step2Desc": { zh: "选择提现方式并填写对应账户。", en: "Choose a method and fill in the account." },
        "withdraw.step3": { zh: "等待审核处理", en: "Wait for review" },
        "withdraw.step3Desc": { zh: "提交申请后由管理员审核提现。", en: "The admin reviews your withdrawal after submission." },
        "faq.title": { zh: "常见问题", en: "FAQ" },
        "faq.subtitle": { zh: "还有疑问？随时联系客服", en: "Still have questions? Contact our support" },
        "faq.q1": { zh: "任务完成后怎么提交？", en: "How do I submit my completed task?" },
        "faq.a1": { zh: "在我的任务中找到对应任务，点击\"提交审核\"，上传完成截图并填写完成说明，提交后等待管理员审核。", en: "In My Tasks, find the task and click \"Submit\", upload your completion screenshot and description, then wait for admin review." },
        "faq.q2": { zh: "报酬什么时候到账？", en: "When does my reward arrive?" },
        "faq.a2": { zh: "管理员审核通过后即完成结算，金额会直接计入你的可提现余额，通常会在 24 小时内处理。", en: "Once approved by an admin, the reward is settled and credited to your withdrawable balance, usually within 24 hours." },
        "faq.q3": { zh: "怎么提现？", en: "How do I withdraw?" },
        "faq.a3": { zh: "在提现页面填写提现金额、选择提现方式并填写收款信息（银行、收款人、账号），提交后由管理员审核打款。", en: "On the Withdraw page, enter the amount, choose a method and fill in your receiving details (bank, payee, account), then the admin reviews and pays out." },
        "faq.q4": { zh: "申请被驳回了怎么办？", en: "What if my submission is rejected?" },
        "faq.a4": { zh: "查看驳回原因，按提示修改后重新提交；如有疑问可联系客服。", en: "Check the rejection reason, fix it as instructed and resubmit; contact support if you have questions." },
        "faq.q5": { zh: "可以同时做多个任务吗？", en: "Can I take multiple tasks at once?" },
        "faq.a5": { zh: "可以，只要任务还有剩余名额，你就可以领取多个任务，按自己的时间安排完成。", en: "Yes, as long as a task still has slots available, you can claim multiple tasks and complete them at your own pace." },
        "faq.q6": { zh: "一个任务可以申请多次吗？", en: "Can I apply for the same task twice?" },
        "faq.a6": { zh: "每个任务每人限领取一次，领取过的任务不能重复申请。", en: "Each task can only be claimed once per user; you cannot claim the same task twice." },
        "common.contactSupport": { zh: "联系客服", en: "Contact Support" },
        "withdraw.history": { zh: "提现记录", en: "Withdrawal History" },
        "withdraw.noHistory": { zh: "暂时没有提现记录", en: "No withdrawal records yet" },
        "withdraw.loading": { zh: "正在加载提现记录...", en: "Loading withdrawal records..." },
        "withdraw.failed": { zh: "无法加载提现记录", en: "Failed to load withdrawal records" },
        "withdraw.pending": { zh: "审核中", en: "Pending Review" },
        "withdraw.approved": { zh: "审核通过", en: "Approved" },
        "withdraw.rejected": { zh: "审核拒绝", en: "Rejected" },
        "withdraw.cancelled": { zh: "已取消", en: "Cancelled" },
        "withdraw.status": { zh: "状态：等待管理员审核", en: "Status: Pending admin review" },

        /* ========== 提交任务弹窗 ========== */
        "submit.title": { zh: "提交任务", en: "Submit Task" },
        "submit.submitting": { zh: "正在提交任务...", en: "Submitting task..." },
        "submit.proof": { zh: "完成截图", en: "Completion Screenshot" },
        "submit.desc": { zh: "完成说明", en: "Completion Description" },
        "submit.descPh": { zh: "请简单说明你是如何完成这个任务的", en: "Briefly describe how you completed the task" },
        "submit.submitBtn": { zh: "提交审核", en: "Submit for Review" },
        "submit.proof": { zh: "完成截图", en: "Completion Screenshot" },
        "submit.desc": { zh: "完成说明", en: "Completion Description" },
        "submit.descPlaceholder": { zh: "请简单说明你是如何完成这个任务的", en: "Briefly describe how you completed this task" },
        "submit.submittingBtn": { zh: "正在提交...", en: "Submitting..." },

        /* ========== 状态徽章 ========== */
        "status.claimed": { zh: "🟡 已领取", en: "🟡 Claimed" },
        "status.submitted": { zh: "🟠 待审核", en: "🟠 Under Review" },
        "status.approved": { zh: "🟢 审核通过", en: "🟢 Approved" },
        "status.rejected": { zh: "🔴 审核不通过", en: "🔴 Rejected" },
        "status.cancelled": { zh: "⚪ 已取消", en: "⚪ Cancelled" },

        /* ========== Admin ========== */
        "admin.panel": { zh: "管理后台", en: "Admin Panel" },
        "admin.dashboard": { zh: "概览", en: "Dashboard" },
        "admin.taskManage": { zh: "任务管理", en: "Task Management" },
        "admin.createTask": { zh: "发布任务", en: "Create Task" },
        "admin.reviewTask": { zh: "任务审核", en: "Task Review" },
        "admin.withdrawReview": { zh: "提现审核", en: "Withdrawal Review" },
        "admin.backUser": { zh: "← 用户中心", en: "← User Center" },
        "admin.logout": { zh: "🚪 登出", en: "🚪 Log out" },
        "admin.title": { zh: "管理员后台", en: "Admin Console" },
        "admin.subtitle": { zh: "管理平台任务与任务状态", en: "Manage platform tasks and their status" },
        "admin.role": { zh: "管理员", en: "Administrator" },
        "admin.overview": { zh: "平台任务概况", en: "Platform task overview" },
        "admin.totalTasks": { zh: "总任务", en: "Total Tasks" },
        "admin.openTasks": { zh: "开放任务", en: "Open Tasks" },
        "admin.closedTasks": { zh: "已关闭", en: "Closed" },
        "admin.newTask": { zh: "发布新任务", en: "Create New Task" },
        "admin.newTaskSub": { zh: "创建一个新的平台任务", en: "Create a new platform task" },
        "admin.taskTitle": { zh: "任务标题", en: "Task Title" },
        "admin.taskTitlePh": { zh: "例如：点赞 TikTok 视频", en: "e.g. Like a TikTok video" },
        "admin.taskDesc": { zh: "任务描述", en: "Task Description" },
        "admin.taskDescPh": { zh: "详细说明用户需要完成什么任务...", en: "Describe in detail what users need to do..." },
        "admin.reward": { zh: "任务奖励（RM）", en: "Reward (RM)" },
        "admin.maxClaims": { zh: "最大领取人数", en: "Max Claims" },
        "admin.taskStatus": { zh: "任务状态", en: "Task Status" },
        "admin.publishBtn": { zh: "➕ 发布任务", en: "➕ Publish Task" },
        "admin.taskImage": { zh: "任务图片（可选）", en: "Task Image (optional)" },
        "admin.uploadImage": { zh: "选择图片", en: "Choose Image" },
        "admin.needImageFile": { zh: "请选择图片文件。", en: "Please choose an image file." },
        "admin.imageTooLarge": { zh: "图片不能超过 5MB。", en: "Image must be under 5MB." },
        "admin.imageUploadFailed": { zh: "图片上传失败：", en: "Image upload failed: " },
        "admin.publishing": { zh: "正在发布...", en: "Publishing..." },
        "admin.manageTitle": { zh: "任务管理", en: "Task Management" },
        "admin.manageSub": { zh: "查看及管理平台任务", en: "View and manage platform tasks" },
        "admin.reviewTitle": { zh: "待审核任务", en: "Pending Reviews" },
        "admin.reviewSub": { zh: "用户提交的任务会出现在这里", en: "User submissions appear here" },
        "admin.refreshReview": { zh: "🔄 刷新审核", en: "🔄 Refresh" },
        "admin.withdrawReviewTitle": { zh: "提现审核", en: "Withdrawal Review" },
        "admin.withdrawReviewSub": { zh: "审核用户的提现申请", en: "Review user withdrawal requests" },
        "admin.refreshWithdraw": { zh: "🔄 刷新提现", en: "🔄 Refresh" },
        "admin.taskLoading": { zh: "正在加载任务...", en: "Loading tasks..." },
        "admin.refresh": { zh: "🔄 刷新", en: "🔄 Refresh" },
        "admin.statusOpen": { zh: "开放", en: "Open" },
        "admin.statusClosed": { zh: "关闭", en: "Closed" },
        "admin.noTasks": { zh: "目前还没有任何任务。", en: "No tasks yet." },
        "admin.reviewLoading": { zh: "正在加载待审核任务...", en: "Loading pending reviews..." },
        "admin.noReviews": { zh: "🎉 目前没有待审核任务", en: "🎉 No pending reviews" },
        "admin.withdrawLoading": { zh: "正在加载提现申请...", en: "Loading withdrawal requests..." },
        "admin.noWithdrawals": { zh: "🎉 暂时没有待审核提现", en: "🎉 No pending withdrawals" },
        "admin.taskNo": { zh: "任务 #", en: "Task #" },
        "admin.noProofText": { zh: "用户没有填写完成说明", en: "User did not provide a description" },
        "admin.proofTitle": { zh: "🖼️ 完成截图", en: "🖼️ Screenshot" },
        "admin.proofAlt": { zh: "任务完成截图", en: "Task completion screenshot" },
        "admin.viewOriginal": { zh: "🔗 新窗口查看原图", en: "🔗 View original in new tab" },
        "admin.noProof": { zh: "⚠️ 没有找到用户上传的截图", en: "⚠️ No screenshot uploaded" },
        "admin.pending": { zh: "🟡 待审核", en: "🟡 Pending" },
        "admin.proofDesc": { zh: "📝 完成说明", en: "📝 Description" },
        "admin.userId": { zh: "👤 用户 ID：", en: "👤 User ID: " },
        "admin.claimId": { zh: "📋 Claim ID：", en: "📋 Claim ID: " },
        "admin.submitTime": { zh: "📅 提交时间：", en: "📅 Submitted: " },
        "admin.approveBtn": { zh: "✅ 通过", en: "✅ Approve" },
        "admin.rejectBtn": { zh: "❌ 拒绝", en: "❌ Reject" },
        "admin.maxLabel": { zh: "👥 最多", en: "👥 Max" },
        "admin.people": { zh: "人", en: "people" },
        "admin.id": { zh: "ID：", en: "ID: " },
        "admin.closeTask": { zh: "🔴 关闭任务", en: "🔴 Close Task" },
        "admin.openTask": { zh: "🟢 开放任务", en: "🟢 Open Task" },
        "admin.deleteBtn": { zh: "🗑 删除", en: "🗑 Delete" },
        "admin.withdrawAmount": { zh: "💰 提现 RM {amount}", en: "💰 Withdraw RM {amount}" },
        "admin.method": { zh: "💳 提现方式：", en: "💳 Method: " },
        "admin.bankName": { zh: "🏦 银行：", en: "🏦 Bank: " },
        "admin.accountName": { zh: "👤 收款人：", en: "👤 Payee: " },
        "admin.userName": { zh: "👤 昵称：", en: "👤 Nickname: " },
        "admin.userPhone": { zh: "📞 电话：", en: "📞 Phone: " },
        "admin.loadUserFailed": { zh: "加载用户资料失败", en: "Failed to load user profiles" },
        "admin.account": { zh: "🏦 收款账户：", en: "🏦 Account: " },
        "admin.applyTime": { zh: "📅 申请时间：", en: "📅 Applied: " },
        "admin.withdrawId": { zh: "🆔 提现 ID：", en: "🆔 Withdrawal ID: " },
        "admin.approveWithdraw": { zh: "✅ 通过提现", en: "✅ Approve" },
        "admin.rejectWithdraw": { zh: "❌ 拒绝提现", en: "❌ Reject" },
        "admin.loadFailed": { zh: "加载失败：", en: "Load failed: " },
        "admin.sysError": { zh: "系统错误：", en: "System error: " },
        "admin.loadReviewFailed": { zh: "无法读取待审核资料：", en: "Failed to load review data: " },
        "admin.loadWithdrawFailed": { zh: "加载提现申请失败：", en: "Failed to load withdrawal requests: " },
        "admin.needLogin": { zh: "请先登录", en: "Please log in first" },
        "admin.fallbackName": { zh: "管理员", en: "Admin" },
        "admin.readProfileFailed": { zh: "读取管理员资料失败：", en: "Failed to load admin profile: " },
        "admin.profileReadFailed": { zh: "无法读取管理员资料", en: "Unable to load admin profile" },
        "admin.noPermission": { zh: "你没有管理员权限", en: "You do not have admin permission" },
        "admin.checkFailed": { zh: "管理员检查失败：", en: "Admin check failed: " },
        "admin.sysErrorPrefix": { zh: "系统发生错误：\n", en: "A system error occurred:\n" },
        "admin.needTitle": { zh: "请输入任务标题", en: "Please enter a task title" },
        "admin.needDesc": { zh: "请输入任务描述", en: "Please enter a task description" },
        "admin.needReward": { zh: "请输入正确的任务奖励", en: "Please enter a valid task reward" },
        "admin.needClaims": { zh: "请输入正确的领取人数", en: "Please enter a valid number of claims" },
        "admin.sessionExpired": { zh: "登录已失效", en: "Session expired" },
        "admin.publishFailed": { zh: "发布任务失败：", en: "Failed to publish task: " },
        "admin.publishFailedMsg": { zh: "发布失败：\n", en: "Publish failed:\n" },
        "admin.publishSuccess": { zh: "✅ 任务发布成功！", en: "✅ Task published successfully!" },
        "admin.publishException": { zh: "发布任务异常：", en: "Publish task error: " },
        "admin.sysErrorMsg": { zh: "系统错误：\n", en: "System error:\n" },
        "admin.noContainer": { zh: "找不到 adminTasksContainer", en: "adminTasksContainer not found" },
        "admin.taskReadFailed": { zh: "读取任务失败：", en: "Failed to load tasks: " },
        "admin.taskLoadException": { zh: "加载任务异常：", en: "Task loading error: " },
        "admin.approveConfirm": { zh: "确定要通过这个任务吗？\n\n", en: "Are you sure you want to approve this task?\n\n" },
        "admin.approveConfirm2": { zh: "通过后，系统会自动把任务奖励加入用户钱包。", en: "Once approved, the task reward will be added to the user's wallet automatically." },
        "admin.rewardFailed": { zh: "审核奖励失败：", en: "Failed to grant reward: " },
        "admin.rewardResult": { zh: "审核奖励结果：", en: "Reward result: " },
        "admin.approveSuccess": { zh: "✅ 审核通过！\n\n", en: "✅ Approved!\n\n" },
        "admin.rewardLabel": { zh: "奖励 RM ", en: "Reward RM " },
        "admin.rewardAdded": { zh: " 已加入用户钱包。", en: " has been added to the user's wallet." },
        "admin.approveFailed": { zh: "审核失败：", en: "Approval failed: " },
        "admin.approveFailedMsg": { zh: "审核失败：\n", en: "Approval failed:\n" },
        "admin.rejectConfirm": { zh: "确定要拒绝这个任务吗？", en: "Are you sure you want to reject this task?" },
        "admin.taskProcessed": { zh: "任务不存在，或者已经被处理", en: "Task does not exist or has already been processed" },
        "admin.rejectSuccess": { zh: "❌ 已拒绝这个任务提交。", en: "❌ Task submission rejected." },
        "admin.rejectFailed": { zh: "拒绝任务失败：", en: "Failed to reject task: " },
        "admin.rejectFailedMsg": { zh: "拒绝失败：\n", en: "Reject failed:\n" },
        "admin.withdrawLoadException": { zh: "提现审核加载异常：", en: "Withdrawal loading error: " },
        "admin.approveWithdrawConfirm": { zh: "确定要通过这笔提现吗？\n\n", en: "Are you sure you want to approve this withdrawal?\n\n" },
        "admin.approveWithdrawConfirm2": { zh: "通过后会自动扣除用户余额，并记录钱包交易。", en: "Once approved, the user's balance will be deducted and a wallet transaction recorded." },
        "admin.approveWithdrawFailed": { zh: "通过提现失败：", en: "Failed to approve withdrawal: " },
        "admin.approveWithdrawFailedMsg": { zh: "通过提现失败：\n", en: "Approve withdrawal failed:\n" },
        "admin.approveWithdrawSuccess": { zh: "✅ 提现已通过！\n\n", en: "✅ Withdrawal approved!\n\n" },
        "admin.approveWithdrawSuccess2": { zh: "用户余额已扣除，钱包交易已记录。", en: "The user's balance has been deducted and the transaction recorded." },
        "admin.withdrawException": { zh: "处理提现异常：", en: "Withdrawal processing error: " },
        "admin.withdrawError": { zh: "处理提现时发生错误：\n", en: "An error occurred while processing the withdrawal:\n" },
        "admin.rejectReasonPrompt": { zh: "请输入拒绝原因（可留空）：", en: "Enter a rejection reason (optional):" },
        "admin.rejectWithdrawFailed": { zh: "拒绝提现失败：", en: "Failed to reject withdrawal: " },
        "admin.rejectWithdrawFailedMsg": { zh: "拒绝提现失败：\n", en: "Reject withdrawal failed:\n" },
        "admin.rejectWithdrawSuccess": { zh: "❌ 提现申请已拒绝。", en: "❌ Withdrawal request rejected." },
        "admin.toggleConfirm1": { zh: "确定要", en: "Are you sure you want to " },
        "admin.toggleConfirm2": { zh: "这个任务吗？", en: " this task?" },
        "admin.taskUpdated": { zh: "任务已", en: "Task has been " },
        "admin.toggleFailed": { zh: "修改任务状态失败：", en: "Failed to update task status: " },
        "admin.opFailed": { zh: "操作失败：\n", en: "Operation failed:\n" },
        "admin.deleteConfirm": { zh: "确定要删除这个任务吗？\n\n", en: "Are you sure you want to delete this task?\n\n" },
        "admin.deleteConfirm2": { zh: "如果这个任务已经有人领取，删除可能受到数据库限制。", en: "If the task has already been claimed, deletion may be restricted by the database." },
        "admin.taskDeleted": { zh: "任务已删除", en: "Task deleted" },
        "admin.deleteFailed": { zh: "删除任务失败：", en: "Failed to delete task: " },
        "admin.deleteFailedMsg": { zh: "删除失败：\n", en: "Delete failed:\n" },
        "admin.logoutFailed": { zh: "登出失败：", en: "Logout failed: " },

        /* ========== 消息（alert/confirm/prompt） ========== */
        "msg.enterEmailPwd": { zh: "请输入邮箱和密码", en: "Please enter your email and password" },
        "msg.loginFailed": { zh: "登录失败：\n", en: "Login failed:\n" },
        "msg.nameRequired": { zh: "请输入昵称", en: "Please enter a nickname" },
        "msg.emailInvalid": { zh: "请输入有效的邮箱地址", en: "Please enter a valid email address" },
        "msg.phoneRequired": { zh: "请输入电话号码", en: "Please enter a phone number" },
        "msg.phoneInvalid": { zh: "请输入有效的电话号码", en: "Please enter a valid phone number" },
        "msg.passwordTooShort": { zh: "密码至少需要 6 个字符", en: "Password must be at least 6 characters" },
        "msg.passwordMismatch": { zh: "两次输入的密码不一致", en: "Passwords do not match" },
        "msg.registerFailed": { zh: "注册失败：\n", en: "Registration failed:\n" },
        "msg.registerSuccess": { zh: "✅ 注册成功！\n\n如果系统要求验证邮箱，请先完成邮箱验证，然后再登录。", en: "✅ Registration successful!\n\nIf email verification is required, please verify your email first, then log in." },
        "msg.claimedAlready": { zh: "你已经领取过这个任务了。", en: "You have already claimed this task." },
        "msg.claimFailed": { zh: "领取失败：", en: "Claim failed: " },
        "msg.claimSuccess": { zh: "任务领取成功！", en: "Task claimed successfully!" },
        "msg.noTaskSelected": { zh: "没有选择任务", en: "No task selected" },
        "msg.needProof": { zh: "请先选择完成截图", en: "Please select a screenshot first" },
        "msg.needDesc": { zh: "请填写完成说明", en: "Please fill in the description" },
        "msg.imageOnly": { zh: "请上传图片格式的截图", en: "Please upload an image file" },
        "msg.imageTooLarge": { zh: "图片不能超过 10MB", en: "Image must not exceed 10MB" },
        "msg.sessionExpired": { zh: "登录已经失效，请重新登录", en: "Your session has expired, please log in again" },
        "msg.uploadFailed": { zh: "截图上传失败：\n", en: "Screenshot upload failed:\n" },
        "msg.noProofUrl": { zh: "无法获取截图网址", en: "Failed to get screenshot URL" },
        "msg.saveFailed": { zh: "保存提交资料失败：\n", en: "Failed to save submission:\n" },
        "msg.statusUpdateFailed": { zh: "任务状态更新失败：\n", en: "Failed to update task status:\n" },
        "msg.submitSuccess": { zh: "✅ 提交成功！\n\n截图和完成说明已经保存。\n现在等待管理员审核。", en: "✅ Submitted successfully!\n\nYour screenshot and description have been saved.\nNow waiting for admin review." },
        "msg.submitSuccess1": { zh: "✅ 提交成功！\n\n", en: "✅ Submitted successfully!\n\n" },
        "msg.submitSuccess2": { zh: "截图和完成说明已经保存。\n", en: "Your screenshot and description have been saved.\n" },
        "msg.submitSuccess3": { zh: "现在等待管理员审核。", en: "Now waiting for admin review." },
        "msg.submitFailed": { zh: "提交失败：\n\n", en: "Submission failed:\n\n" },
        "msg.withdrawAmountInvalid": { zh: "请输入正确的提现金额。", en: "Please enter a valid withdrawal amount." },
        "msg.bankRequired": { zh: "请输入银行名称", en: "Please enter the bank name" },
        "msg.accountNameRequired": { zh: "请输入收款人名称", en: "Please enter the payee name" },
        "msg.withdrawMethodRequired": { zh: "请选择提现方式。", en: "Please select a withdrawal method." },
        "msg.withdrawAccountRequired": { zh: "请输入收款账户。", en: "Please enter the receiving account." },
        "msg.withdrawSession": { zh: "登录状态已经失效，请重新登录。", en: "Your login has expired, please log in again." },
        "msg.balanceReadFailed": { zh: "无法读取当前余额：\n", en: "Failed to read current balance:\n" },
        "msg.balanceNotEnoughPrefix": { zh: "提现金额不能超过当前余额。\n\n当前余额：RM", en: "Withdrawal amount cannot exceed your balance.\n\nCurrent balance: RM" },
        "msg.withdrawSuccess1": { zh: "✅ 提现申请提交成功！\n\n金额：RM", en: "✅ Withdrawal submitted successfully!\n\nAmount: RM" },
        "msg.balanceNotEnough": { zh: "提现金额不能超过当前余额。\n\n当前余额：RM{balance}", en: "Withdrawal amount cannot exceed your balance.\n\nCurrent balance: RM{balance}" },
        "msg.withdrawSuccess": { zh: "✅ 提现申请提交成功！\n\n金额：RM{amount}\n状态：等待管理员审核", en: "✅ Withdrawal submitted successfully!\n\nAmount: RM{amount}\nStatus: Pending admin review" },
        "msg.withdrawFailed": { zh: "提现申请失败：\n\n", en: "Withdrawal failed:\n\n" },
        "msg.notAdmin": { zh: "你没有管理员权限", en: "You do not have admin access" },
        "msg.loginFirst": { zh: "请先登录", en: "Please log in first" },
        "msg.adminProfileFailed": { zh: "无法读取管理员资料", en: "Failed to load admin profile" },
        "msg.sysErrorWithMsg": { zh: "系统发生错误：\n", en: "A system error occurred:\n" },
        "msg.taskTitleRequired": { zh: "请输入任务标题", en: "Please enter a task title" },
        "msg.taskDescRequired": { zh: "请输入任务描述", en: "Please enter a task description" },
        "msg.rewardInvalid": { zh: "请输入正确的任务奖励", en: "Please enter a valid reward" },
        "msg.maxClaimsInvalid": { zh: "请输入正确的领取人数", en: "Please enter a valid claim limit" },
        "msg.publishFailed": { zh: "发布失败：\n", en: "Publish failed:\n" },
        "msg.publishSuccess": { zh: "✅ 任务发布成功！", en: "✅ Task published successfully!" },
        "msg.approveConfirm": { zh: "确定要通过这个任务吗？\n\n通过后，系统会自动把任务奖励加入用户钱包。", en: "Approve this task?\n\nThe reward will be added to the user's wallet automatically." },
        "msg.approveSuccess": { zh: "✅ 审核通过！\n\n奖励 RM {reward} 已加入用户钱包。", en: "✅ Approved!\n\nRM {reward} reward has been added to the user's wallet." },
        "msg.approveFailed": { zh: "审核失败：\n", en: "Approval failed:\n" },
        "msg.rejectConfirm": { zh: "确定要拒绝这个任务吗？", en: "Reject this task submission?" },
        "msg.taskNotExist": { zh: "任务不存在，或者已经被处理", en: "Task does not exist or has already been processed" },
        "msg.rejectSuccess": { zh: "❌ 已拒绝这个任务提交。", en: "❌ Task submission rejected." },
        "msg.rejectFailed": { zh: "拒绝失败：\n", en: "Rejection failed:\n" },
        "msg.withdrawApproveConfirm": { zh: "确定要通过这笔提现吗？\n\n通过后会自动扣除用户余额，并记录钱包交易。", en: "Approve this withdrawal?\n\nThe user's balance will be deducted and a wallet transaction recorded." },
        "msg.withdrawApproveFailed": { zh: "通过提现失败：\n", en: "Failed to approve withdrawal:\n" },
        "msg.withdrawApproveSuccess": { zh: "✅ 提现已通过！\n\n用户余额已扣除，钱包交易已记录。", en: "✅ Withdrawal approved!\n\nThe user's balance has been deducted and the transaction recorded." },
        "msg.withdrawHandleError": { zh: "处理提现时发生错误：\n", en: "An error occurred while processing the withdrawal:\n" },
        "msg.rejectNotePrompt": { zh: "请输入拒绝原因（可留空）：", en: "Enter rejection reason (optional):" },
        "msg.withdrawRejectFailed": { zh: "拒绝提现失败：\n", en: "Failed to reject withdrawal:\n" },
        "msg.withdrawRejectSuccess": { zh: "❌ 提现申请已拒绝。", en: "❌ Withdrawal request rejected." },
        "msg.toggleConfirm": { zh: "确定要{action}这个任务吗？", en: "Are you sure you want to {action} this task?" },
        "msg.toggleDone": { zh: "任务已{action}", en: "Task {action}" },
        "msg.toggleFailed": { zh: "操作失败：\n", en: "Operation failed:\n" },
        "msg.deleteConfirm": { zh: "确定要删除这个任务吗？\n\n如果这个任务已经有人领取，删除可能受到数据库限制。", en: "Delete this task?\n\nIf users have already claimed it, deletion may be blocked by the database." },
        "msg.deleteSuccess": { zh: "任务已删除", en: "Task deleted" },
        "msg.deleteFailed": { zh: "删除失败：\n", en: "Delete failed:\n" },
        "msg.logoutFailed": { zh: "登出失败：", en: "Logout failed: " },
        "msg.taskOpen": { zh: "开放", en: "open" },
        "msg.taskClose": { zh: "关闭", en: "close" },
        "msg.walletLoadFailed": { zh: "加载钱包记录失败：", en: "Failed to load wallet transactions: " },
        "msg.loadingTasks": { zh: "正在加载任务...", en: "Loading tasks..." },
        "msg.loadingRecords": { zh: "正在加载交易记录...", en: "Loading transactions..." },
        "msg.failedLoadTasks": { zh: "无法加载任务", en: "Failed to load tasks" }

    };


    var currentLang = "zh";


    function t(key, params) {

        var entry =
            DICT[key] || {};

        var text =
            entry[currentLang] !== undefined
                ? entry[currentLang]
                : (entry.zh !== undefined ? entry.zh : key);

        if (params) {

            Object.keys(params).forEach(
                function (k) {

                    text = String(text).replace(
                        new RegExp("\\{" + k + "\\}", "g"),
                        params[k]
                    );

                }
            );

        }

        return text;

    }


    function applyStatic() {

        document.documentElement.lang =
            currentLang === "zh" ? "zh-CN" : "en";


        var i18nEls =
            document.querySelectorAll(
                "[data-i18n]"
            );


        i18nEls.forEach(
            function (el) {

                var key =
                    el.getAttribute(
                        "data-i18n"
                    );

                // 含子元素（如图标 span）时：
                // 只更新非空文本节点，保留图标
                if (
                    el.children.length > 0
                ) {

                    var nodes =
                        el.childNodes;

                    for (
                        var i = 0;
                        i < nodes.length;
                        i++
                    ) {

                        if (
                            nodes[i].nodeType === 3 &&
                            nodes[i].textContent.trim() !== ""
                        ) {

                            nodes[i].textContent =
                                t(key);

                            break;

                        }

                    }

                } else {

                    el.textContent =
                        t(key);

                }

            }
        );


        var phEls =
            document.querySelectorAll(
                "[data-i18n-placeholder]"
            );


        phEls.forEach(
            function (el) {

                el.setAttribute(
                    "placeholder",
                    t(
                        el.getAttribute(
                            "data-i18n-placeholder"
                        )
                    )
                );

            }
        );


        var langBtns =
            document.querySelectorAll(
                "[data-i18n-lang]"
            );


        langBtns.forEach(
            function (btn) {

                btn.textContent =
                    currentLang === "zh"
                        ? "EN"
                        : "中文";

            }
        );

    }


    function init() {

        try {

            var saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (
                saved === "en" ||
                saved === "zh"
            ) {

                currentLang = saved;

            }

        } catch (e) {

            currentLang = "zh";

        }


        applyStatic();

    }


    function toggle() {

        currentLang =
            currentLang === "zh"
                ? "en"
                : "zh";


        try {

            localStorage.setItem(
                STORAGE_KEY,
                currentLang
            );

        } catch (e) { }


        applyStatic();


        // 通知页面重新渲染动态内容
        document.dispatchEvent(
            new CustomEvent(
                "taskhub:langchange",
                {
                    detail: {
                        lang: currentLang
                    }
                }
            )
        );

    }


    function get() {

        return currentLang;

    }


    // 暴露全局接口
    window.I18N = {
        init: init,
        t: t,
        toggle: toggle,
        get: get,
        applyStatic: applyStatic
    };


    // 脚本加载时自动初始化
    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
