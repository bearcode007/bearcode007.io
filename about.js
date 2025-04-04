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

  // about me
// 检测 Imgur 可用性
function checkImgurAvailability(callback) {
  const testImg = new Image();
  testImg.src = 'https://i.imgur.com/favicon.ico?test=' + Date.now();
  
  testImg.onload = function() {
    callback(true); // Imgur 可用（国外网络）
  };
  testImg.onerror = function() {
    callback(false); // Imgur 不可用（国内网络）
  };
}

// **定义国内外两套图片路径**
const bigImagePaths = {
  imgur: [
    'https://i.imgur.com/LxW0Etl.png',  // 对应左小图1
    'https://i.imgur.com/1h9yM9T.png',  
    'https://i.imgur.com/AdtJQUr.png',  
    'https://i.imgur.com/rR29z5I.png',  
    'https://i.imgur.com/n7jvkzW.png',  
    'https://i.imgur.com/1VLf2js.png',  // 对应右小图1
    'https://i.imgur.com/0NGijlp.png',  
    'https://i.imgur.com/BylNl9z.png',  
    'https://i.imgur.com/Nnmm2cF.png',  
    'https://i.imgur.com/k5gOsPe.png', 
    'https://i.imgur.com/iD6NXMQ.png'  
  ],
  fallback: [
    'https://pic1.imgdb.cn/item/67ed30a40ba3d5a1d7eb1961.png',  // 国内对应左小图1
    'https://pic1.imgdb.cn/item/67ed31000ba3d5a1d7eb196e.png',  
    'https://pic1.imgdb.cn/item/67ed31010ba3d5a1d7eb1971.png',  
    'https://pic1.imgdb.cn/item/67ed31010ba3d5a1d7eb196f.png',  
    'https://pic1.imgdb.cn/item/67ed31010ba3d5a1d7eb1972.png',  
    'https://pic1.imgdb.cn/item/67ed31010ba3d5a1d7eb1970.png',  // 国内对应右小图1
    'https://pic1.imgdb.cn/item/67ed31cf0ba3d5a1d7eb199f.png',  
    'https://pic1.imgdb.cn/item/67ed31d00ba3d5a1d7eb19a0.png',  
    'https://pic1.imgdb.cn/item/67ed31ce0ba3d5a1d7eb199d.png',  
    'https://pic1.imgdb.cn/item/67ed31ce0ba3d5a1d7eb199c.png', 
    'https://pic1.imgdb.cn/item/67ed31cf0ba3d5a1d7eb199e.png'  
  ]
};

// **自动切换图片**
function setImageSources(useImgur) {
  // 替换所有 .auto-switch-image 的 src
  document.querySelectorAll('.auto-switch-image').forEach(img => {
    img.src = useImgur ? img.dataset.imgur : img.dataset.fallback;
  });

  // **更新 bigImagePaths（大图）**
  window.currentBigImagePaths = useImgur ? bigImagePaths.imgur : bigImagePaths.fallback;
}

// **等待 DOM 加载完后执行检测**
document.addEventListener('DOMContentLoaded', function() {
  checkImgurAvailability(setImageSources);
});

// **悬浮事件：显示大图**
document.querySelectorAll('.smallImage').forEach((smallImage, index) => {
  smallImage.addEventListener('mouseenter', () => {
    const popupImage = document.createElement('img');
    popupImage.src = window.currentBigImagePaths[index]; // 使用动态切换后的路径
    popupImage.classList.add('popupImage');
    popupImage.style.position = 'absolute';
    popupImage.style.zIndex = '1000';

    const rect = smallImage.getBoundingClientRect();
    popupImage.style.left = `${rect.left + rect.width / 2}px`;
    popupImage.style.top = `${rect.top + rect.height / 2}px`;
    popupImage.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(popupImage);
  });

  smallImage.addEventListener('mouseleave', () => {
    document.querySelector('.popupImage')?.remove();
  });
});
