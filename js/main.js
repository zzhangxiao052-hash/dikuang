/**
 * 地矿内参 - 主脚本文件
 * 粒子动画效果 + 交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('地矿内参平台已加载');
    
    // 初始化粒子动画
    initParticles();
    
    // 初始化导航栏滚动效果
    initHeaderScroll();
});

/**
 * 导航栏滚动效果
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 粒子动画效果
 */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    // 创建粒子
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    // 绘制粒子
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界检测
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
            ctx.fill();
            
            // 绘制连线
            particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(drawParticles);
    }
    
    // 初始化
    resizeCanvas();
    createParticles();
    drawParticles();
    
    // 窗口大小改变时重新初始化
    window.addEventListener('resize', function() {
        cancelAnimationFrame(animationId);
        resizeCanvas();
        createParticles();
        drawParticles();
    });
}
