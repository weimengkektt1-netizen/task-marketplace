        </span>

        <h2 style="margin:4px 0 0;">
            提现审核
        </h2>
    </div>

    <div id="pendingWithdrawalsContainer"></div>

</div>
`;

const parent =
    document.getElementById("pendingSubmissionsSection")
    || document.getElementById("adminTasksContainer")
    || document.querySelector("main");

if (parent) {
    parent.parentNode.insertBefore(
        section,
        parent.nextSibling
    );
}
}


// ========================================
// 通过提现
// ========================================

async function approveWithdrawal(withdrawalId) {

    if (!confirm(
        "确定要通过这笔提现吗？\n\n通过后会自动扣除用户余额，并记录钱包交易。"
    )) {
        return;
    }

    try {

        const { error } = await supabaseClient
            .rpc("admin_approve_withdrawal", {
                p_withdrawal_id: withdrawalId,
                p_admin_note: null
            });

        if (error) {
            console.error(
                "通过提现失败:",
                error
            );

            alert(
                "通过提现失败：" +
                error.message
            );

            return;
        }

        alert(
            "提现已通过，用户余额已扣除。"
        );

        await loadPendingWithdrawals();

    } catch (err) {

        console.error(err);

        alert(
            "处理提现时发生错误：" +
            err.message
        );

    }

}


// ========================================
// 拒绝提现
// ========================================

async function rejectWithdrawal(withdrawalId) {

    const note = prompt(
        "请输入拒绝原因（可留空）："
    );

    if (note === null) {
        return;
    }

    try {

        const { error } = await supabaseClient
            .rpc("admin_reject_withdrawal", {
                p_withdrawal_id: withdrawalId,
                p_admin_note: note || null
            });

        if (error) {
            console.error(
                "拒绝提现失败:",
                error
            );

            alert(
                "拒绝提现失败：" +
                error.message
            );

            return;
        }

        alert(
            "提现申请已拒绝。"
        );

        await loadPendingWithdrawals();

    } catch (err) {

        console.error(err);

        alert(
            "处理提现时发生错误：" +
            err.message
        );

    }

}


// ========================================
// 创建任务卡片
// ========================================

function createTaskCard(task) {

    const card =
        document.createElement("div");

    card.className =
        "admin-task-card";

    const statusText =
        task.status === "open"
            ? "开放"
            : "关闭";

    const statusClass =
        task.status === "open"
            ? "status-open"
            : "status-closed";

    const createdTime =
        task.created_at
            ? new Date(
                task.created_at
              ).toLocaleString("zh-CN")
            : "-";

    card.innerHTML = `

        <div class="admin-task-top">

            <div>

                <div
                    class="admin-task-status ${statusClass}"
                >
                    ${statusText}
                </div>

                <h3>
                    ${escapeHtml(task.title)}
                </h3>

            </div>

            <div class="admin-task-reward">
                RM ${Number(
                    task.reward
                ).toFixed(2)}
            </div>

        </div>

        <div class="admin-task-description">
            ${escapeHtml(
                task.description
            )}
        </div>

        <div class="admin-task-info">

            <div>
                👥 最多
                ${task.max_claims || 0}
                人
            </div>

            <div>
                📅
                ${escapeHtml(createdTime)}
            </div>

            <div>
                ID:
                ${escapeHtml(task.id)}
            </div>

        </div>

        <div class="admin-task-actions">

            <button
                class="admin-small-btn"
                onclick="toggleTaskStatus(
                    '${escapeHtml(String(task.id))}',
                    '${escapeHtml(String(task.status))}'
                )"
            >
                ${
                    task.status === "open"
                        ? "🔴 关闭任务"
                        : "🟢 开放任务"
                }
            </button>

            <button
                class="admin-small-btn danger"
                onclick="deleteTask(
                    '${escapeHtml(String(task.id))}'
                )"
            >
                🗑 删除
            </button>

        </div>

    `;

    return card;

}


// ========================================
// 修改任务状态
// ========================================

async function toggleTaskStatus(
    taskId,
    currentStatus
) {

    const newStatus =
        currentStatus === "open"
            ? "closed"
            : "open";

    const confirmText =
        newStatus === "open"
            ? "确定要开放这个任务吗？"
            : "确定要关闭这个任务吗？";

    if (!confirm(confirmText)) {
        return;
    }

    try {

        const { error } =
            await supabaseClient
                .from("tasks")
                .update({
                    status: newStatus
                })
                .eq("id", taskId);

        if (error) {
            throw error;
        }

        await loadAdminTasks();

    } catch (error) {

        console.error(error);

        alert(
            "操作失败：\n" +
            error.message
        );

    }

}


// ========================================
// 删除任务
// ========================================

async function deleteTask(
    taskId
) {

    if (!confirm(
        "确定要删除这个任务吗？\n\n" +
        "如果这个任务已经有人领取，删除可能受到数据库限制。"
    )) {
        return;
    }

    try {

        const { error } =
            await supabaseClient
                .from("tasks")
                .delete()
                .eq("id", taskId);

        if (error) {
            throw error;
        }

        alert("任务已删除");

        await loadAdminTasks();

    } catch (error) {

        console.error(error);

        alert(
            "删除失败：\n" +
            error.message
        );

    }

}


// ========================================
// 更新统计
// ========================================

function updateStatistics(tasks) {

    const total =
        tasks.length;

    const open =
        tasks.filter(
            task =>
                task.status === "open"
        ).length;

    const closed =
        tasks.filter(
            task =>
                task.status !== "open"
        ).length;

    const totalElement =
        document.getElementById(
            "totalTasks"
        );

    const openElement =
        document.getElementById(
            "openTasks"
        );

    const closedElement =
        document.getElementById(
            "closedTasks"
        );

    if (totalElement) {
        totalElement.textContent =
            total;
    }

    if (openElement) {
        openElement.textContent =
            open;
    }

    if (closedElement) {
        closedElement.textContent =
            closed;
    }

}


// ========================================
// 登出
// ========================================

async function adminLogout() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "index.html";

}


// ========================================
// 防止 HTML 注入
// ========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}