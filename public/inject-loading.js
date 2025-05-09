// public/inject-loading.js
(() => {
  // 配置项
  const config = {
    id: 'app-loading',
    text: '正在加载应用...',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: '#ffffff',
    fontSize: '18px',
    spinnerColor: '#4a90e2',
    showSpinner: true,
    zIndex: 9999,
    duration: 300,
    fadeOutTime: 500,
  };

  // 创建加载样式
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // 创建加载元素
  const loadingEl = document.createElement('div');
  loadingEl.id = config.id;
  loadingEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${config.backgroundColor};
    color: ${config.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${config.fontSize};
    z-index: ${config.zIndex};
  `;

  // 如果需要显示加载动画
  if (config.showSpinner) {
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
      border: 4px solid ${config.spinnerColor};
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    `;
    loadingEl.appendChild(spinner);
  }

  // 创建文本元素
  const textEl = document.createElement('div');
  textEl.textContent = config.text;
  loadingEl.appendChild(textEl);

  // 将加载元素添加到body
  document.body.appendChild(loadingEl);

  // 当页面加载完成后隐藏加载元素
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingEl.style.transition = `opacity ${config.fadeOutTime}ms`;
      loadingEl.style.opacity = '0';

      setTimeout(() => {
        if (loadingEl.parentNode) {
          loadingEl.parentNode.removeChild(loadingEl);
        }
      }, config.fadeOutTime);
    }, config.duration);
  });
})();
