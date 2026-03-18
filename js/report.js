document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.btn-generate');
    const loadingModal = document.getElementById('loadingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const loadingStatusText = document.getElementById('loadingStatusText');
    const multiProgressContainer = document.getElementById('multiProgressContainer');

    const taskGroups = [
        { id: 'zrzyb', name: "自然资源部", steps: ["连接服务器", "分析政策法规", "提取关键数据"], progress: 0 },
        { id: 'cqsgzj', name: "重庆市规资局", steps: ["抓取通知公告", "获取数据解读", "整合地方动态"], progress: 0 },
        { id: 'cqszfw', name: "重庆市政府网", steps: ["检索政府文件", "分析政策解读", "提取会议快报"], progress: 0 },
        { id: 'ai_analysis', name: "AI 多维度分析", steps: ["关键词提取", "关联性分析", "生成决策建议"], progress: 0 },
        { id: 'final_report', name: "生成策研内参", steps: ["内容排版", "格式校核", "导出最终报告"], progress: 0 }
    ];

    let currentGroupIndex = 0;
    let progressInterval;

    function createProgressItems() {
        multiProgressContainer.innerHTML = '';
        taskGroups.forEach(group => {
            const item = document.createElement('div');
            item.className = 'progress-item';
            item.innerHTML = `
                <div class="progress-label">
                    <span>${group.name} <small class="status-small" id="status-${group.id}">待处理</small></span>
                    <span class="progress-percent-small" id="percent-${group.id}">0%</span>
                </div>
                <div class="progress-bar-small">
                    <div class="progress-bar-small-inner" id="bar-inner-${group.id}" style="width: 0%"></div>
                </div>
            `;
            multiProgressContainer.appendChild(item);
        });
    }

    function startGeneratingReport() {
        loadingModal.classList.add('visible');
        createProgressItems();
        currentGroupIndex = 0;
        loadingStatusText.textContent = "正在准备数据采集任务...";
        
        processNextGroup();
    }

    function processNextGroup() {
        if (currentGroupIndex >= taskGroups.length) {
            loadingStatusText.textContent = "所有任务已完成！";
            setTimeout(() => {
                alert('报告生成完成！即将跳转到报告页面。');
                // window.location.href = 'report-final.html';
            }, 800);
            return;
        }

        const group = taskGroups[currentGroupIndex];
        const barInner = document.getElementById(`bar-inner-${group.id}`);
        const percentText = document.getElementById(`percent-${group.id}`);
        const statusSmall = document.getElementById(`status-${group.id}`);
        
        let currentProgress = 0;
        let currentStepIndex = 0;
        statusSmall.textContent = group.steps[0];
        statusSmall.style.color = 'var(--primary-light)';

        const stepDuration = 1000 + Math.random() * 1000; // 随机时间
        const intervalSpeed = 50; // 更新频率
        const increment = 100 / (stepDuration / intervalSpeed);

        progressInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
                
                barInner.style.width = '100%';
                percentText.textContent = '100%';
                statusSmall.textContent = '已完成';
                statusSmall.style.color = '#7ed321';

                currentGroupIndex++;
                setTimeout(processNextGroup, 300);
            } else {
                barInner.style.width = currentProgress + '%';
                percentText.textContent = Math.round(currentProgress) + '%';
                
                // 模拟步骤切换
                const stepIdx = Math.floor((currentProgress / 100) * group.steps.length);
                if (stepIdx > currentStepIndex && stepIdx < group.steps.length) {
                    currentStepIndex = stepIdx;
                    statusSmall.textContent = group.steps[currentStepIndex];
                    loadingStatusText.textContent = `正在处理: ${group.name} - ${group.steps[currentStepIndex]}`;
                }
            }
        }, intervalSpeed);
    }

    function stopGeneratingReport() {
        clearInterval(progressInterval);
        loadingModal.classList.remove('visible');
    }

    generateBtn.addEventListener('click', function() {
        startGeneratingReport();
    });

    closeModalBtn.addEventListener('click', function() {
        stopGeneratingReport();
    });

    loadingModal.addEventListener('click', function(event) {
        if (event.target === loadingModal) {
            stopGeneratingReport();
        }
    });
});
