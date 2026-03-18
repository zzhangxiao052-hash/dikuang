// 移动端菜单交互
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    // 打开菜单
    menuBtn.addEventListener('click', function() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
    });

    // 关闭菜单
    menuOverlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });

    // 点击菜单项关闭菜单
    const menuItems = document.querySelectorAll('.m-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });
});
