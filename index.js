// 获取导航栏元素
const header = document.querySelector('.header');

// 监听页面滚动事件
window.addEventListener('scroll', function () {
  // 检查页面滚动位置
  if (window.scrollY > 100) { // 50 是滚动距离的阈值，可以根据需要调整
    header.classList.add('scrolled'); // 添加 scrolled 类
  } else {
    header.classList.remove('scrolled'); // 移除 scrolled 类
  }
});

// 切换菜单显示状态的函数
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active'); // 切换 active 类
  }
  
  // 点击菜单外部时关闭菜单
  document.addEventListener('click', function (event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
  
    // 如果点击的是菜单外部，则关闭菜单
    if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  });


  // 房地产轮播图
  document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.imageSlider-container');
    const items = document.querySelectorAll('.imageSlider-item');
    const dots = document.querySelectorAll('.imageSlider-dot');
    const arrowLeft = document.querySelector('.imageSlider-arrow-left');
    const arrowRight = document.querySelector('.imageSlider-arrow-right');
    let currentIndex = 0;

    // 初始化轮播图
    function initializeSlider() {
        items.forEach((item, index) => {
            updateItemStyle(item, index, currentIndex);
        });
        updateDots();
    }

    // 更新单个图片的样式（核心逻辑）
    function updateItemStyle(item, index, currentIndex) {
        let offset = index - currentIndex;

        // 处理无限循环逻辑
        if (currentIndex === 0 && index === items.length - 1) {
            offset = -1; // 第一张时，最后一张显示在左侧
        } else if (currentIndex === items.length - 1 && index === 0) {
            offset = 1; // 最后一张时，第一张显示在右侧
        }

        if (offset === 0) {
            // 当前主图：居中，无模糊
            item.style.transform = 'translateX(0) scale(1)';
            item.style.zIndex = 3;
            item.classList.remove('blur');
        } else if (offset === 1 || offset === -items.length + 1) {
            // 右侧图片或循环到第一张
            item.style.transform = 'translateX(40%) scale(0.8)';
            item.style.zIndex = 2;
            item.classList.add('blur');
        } else if (offset === -1 || offset === items.length - 1) {
            // 左侧图片或循环到最后一张
            item.style.transform = 'translateX(-40%) scale(0.8)';
            item.style.zIndex = 2;
            item.classList.add('blur');
        } else {
            // 其他隐藏图片
            item.style.transform = 'translateX(150%) scale(0.8)';
            item.style.zIndex = 1;
            item.classList.add('blur');
        }
    }

    // 更新所有图片
    function updateSlider() {
        items.forEach((item, index) => {
            updateItemStyle(item, index, currentIndex);
        });
        updateDots();
    }

    // 更新小圆点
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // 左箭头点击（上一张）
    arrowLeft.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
    });

    // 右箭头点击（下一张）
    arrowRight.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    });

    // 小圆点点击
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSlider();
        });
    });

    // 中小屏点击图片切换（左半边上一张，右半边下一张）
    items.forEach(item => {
        item.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const halfWidth = rect.width / 2;
                
                if (clickX < halfWidth) {
                    // 点击左半边：上一张
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                } else {
                    // 点击右半边：下一张
                    currentIndex = (currentIndex + 1) % items.length;
                }
                updateSlider();
            }
        });
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', () => {
        const touchDiff = touchStartX - touchEndX;
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                // 向左滑动：下一张
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                // 向右滑动：上一张
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            updateSlider();
        }
    });

    // 初始化
    initializeSlider();

    // 窗口大小变化时重新计算（可选）
    window.addEventListener('resize', function () {
        updateSlider();
    });
});


// 文字的视差滚动
document.addEventListener('DOMContentLoaded', function () {
    const textContents = document.querySelectorAll('.text-content.scroll-effect'); // 获取所有需要效果的元素
  
    function checkScroll() {
      textContents.forEach((textContent) => {
        const contentTop = textContent.getBoundingClientRect().top; // 获取元素顶部距离视口顶部的距离
        const windowHeight = window.innerHeight; // 获取视口高度
  
        // 如果元素进入视口
        if (contentTop < windowHeight * 0.8) { // 0.8 表示元素进入视口的 80% 时触发
          textContent.classList.add('active'); // 添加 active 类
        }
      });
    }
  
    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);
  
    // 页面加载时检查一次
    checkScroll();
  });




//   老年项目市场图
// 获取扇形动画容器
const container = document.querySelector('.container');

// 获取百分比文字
const percentage = document.querySelector('.percentage');

// 扇形动画函数
function startPieAnimation() {
  const canvas = document.getElementById('pieChart');
  const ctx = canvas.getContext('2d');
  const centerX = 150;
  const centerY = 150;
  const radius = 150;
  let currentAngle = -Math.PI / 2; // 起始角度（12点方向）
  const targetAngle = -Math.PI / 2 + (Math.PI * 2) * 0.198; // 19.8% 对应 71.28 度
  const startTime = Date.now();
  const duration = 2000; // 动画时长 2 秒

  // 绘制基础圆
  function drawBase() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(101, 163, 13, 0.18)'; // 18% 透明度
    ctx.fill();
  }

  // 绘制动态扇形和半径线
  function drawProgress() {
    const timePassed = Date.now() - startTime;
    const progress = Math.min(timePassed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // 缓动函数

    // 当前角度计算
    const angle = currentAngle + (targetAngle - currentAngle) * easedProgress;

    // 清除画布
    ctx.clearRect(0, 0, 300, 300);

    // 绘制基础圆
    drawBase();

    // 绘制紫色扇形
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, angle);
    ctx.closePath();
    ctx.fillStyle = '#65A30D'; // 100% 不透明度
    ctx.fill();

    // 绘制动态半径线
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius
    );
    ctx.strokeStyle = '#65A30D';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(drawProgress);
    } else {
      // 最终精确角度
      ctx.clearRect(0, 0, 300, 300);
      drawBase();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, targetAngle);
      ctx.closePath();
      ctx.fillStyle = '#65A30D';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(targetAngle) * radius,
        centerY + Math.sin(targetAngle) * radius
      );
      ctx.stroke();

      // 数字渐显动画
      percentage.style.animation = 'fadeIn 0.5s forwards';
    }
  }

  // 启动动画
  drawProgress();
}

// Intersection Observer 配置
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视口时启动动画
        startPieAnimation();
        observer.unobserve(container); // 动画触发后停止观察
      }
    });
  },
  {
    threshold: 0.5, // 当元素 50% 进入视口时触发
  }
);

// 开始观察扇形动画容器
observer.observe(container);







// 数字滚动动画函数
function animateNumber(target, duration = 2000) { // 保持动画时长不变
    const element = document.querySelector('.number-display');
    let start = null;
    const initial = parseFloat(element.textContent); // 初始值
  
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
  
      // 动态计算当前值（调整缓动函数实现更慢的效果）
      const easedProgress = 1 - Math.pow(1 - progress / duration, 2); // 将指数从 3 改为 5
      const current = initial + (target - initial) * easedProgress;
  
      // 随机偏移量（增加随机滚动效果）
      const randomOffset = Math.random() * 1; // 随机偏移范围 0 到 2
      const displayValue = (current + randomOffset).toFixed(1); // 显示一位小数
  
      // 更新显示值
      element.textContent = displayValue;
  
      // 动画结束条件
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toFixed(1); // 最终精确值
      }
    }
  
    requestAnimationFrame(step);
  }
  
  // 页面加载完成后启动动画
  window.onload = () => {
    animateNumber(4.2, 2000); // 最终停留在 4.2，动画时长 2 秒
  };// 数字滚动动画函数
  function animateNumber(target, duration = 2000) { // 保持动画时长不变
    const element = document.querySelector('.number-display');
    let start = null;
    const initial = parseFloat(element.textContent); // 初始值
  
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
  
      // 动态计算当前值（使用更平缓的缓动函数）
      const easedProgress = 1 - Math.pow(1 - progress / duration, 2); // 将指数改为 2
      const current = initial + (target - initial) * easedProgress;
  
      // 减少随机偏移量（让动画更平滑）
      const randomOffset = Math.random() * 0.5; // 随机偏移范围从 0 到 0.5
      const displayValue = (current + randomOffset).toFixed(1); // 显示一位小数
  
      // 更新显示值
      element.textContent = displayValue;
  
      // 动画结束条件
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toFixed(1); // 最终精确值
      }
    }
  
    requestAnimationFrame(step);
  }
  
  // 页面加载完成后启动动画
  window.onload = () => {
    animateNumber(4.2, 2000); // 最终停留在 4.2，动画时长 2 秒
  };






//   老年横向数据
// 动态加载进度条
document.addEventListener("DOMContentLoaded", function () {
    const bars = document.querySelectorAll(".bar-container");
    bars.forEach((bar) => {
      const label = bar.getAttribute("data-label");
      const value = bar.getAttribute("data-value");
      const color = bar.getAttribute("data-color");
  
      // 创建进度条
      bar.innerHTML = `
        <div class="bar-label">${label}</div>
        <div class="bar">
          <div class="bar-fill" style="background-color: ${color};"></div>
        </div>
        <div class="bar-value">${value}%</div>
      `;
  
      // 设置进度条的最终宽度
      const barFill = bar.querySelector(".bar-fill");
      barFill.dataset.width = `${value}%`; // 将最终宽度存储在 data 属性中
    });
  
    // 检测元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当图表容器进入视口时，为所有 .bar-fill 添加动画类
            const barFills = document.querySelectorAll(".bar-fill");
            barFills.forEach((barFill, index) => {
              // 设置延迟，使每个颜色条依次动画
              setTimeout(() => {
                barFill.classList.add("animate");
                barFill.style.width = barFill.dataset.width; // 设置为最终宽度
              }, index * 200); // 每个颜色条延迟 200ms
            });
          }
        });
      },
      {
        threshold: 0.5, // 当元素 50% 进入视口时触发
      }
    );
  
    // 观察图表容器
    const chartContainer = document.querySelector(".chart-container");
    if (chartContainer) {
      observer.observe(chartContainer);
    }
  });

  