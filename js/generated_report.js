document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    const exportWordButton = document.getElementById('export-word-button');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'report.html';
        });
    }

    if (exportWordButton) {
        exportWordButton.addEventListener('click', () => {
            alert('模拟导出Word文档成功！');
        });
    }
});
