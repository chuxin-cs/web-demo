export default {
  bind(el, binding) {
    const resizeLinePaneId = `resize-line-pane-${Math.random().toString(36).substr(2, 9)}`;
    el.setAttribute('id', resizeLinePaneId); // 设置元素 ID

    // 初始化拖拽逻辑
    const initResize = () => {
      const firstComponent = el.querySelector('.pane-1st');
      const secondComponent = el.querySelector('.pane-2nd');
      const resizeLine = el.querySelector('.resize-line');

      let startValue, old1stComponentSize, old2ndComponentSize;
      let isVertical = binding.value.isVertical; // 从绑定的值获取方向
      let firstMinValue = binding.value.firstMinValue || 0;
      let secondMinValue = binding.value.secondMinValue || 0;

      resizeLine.onmousedown = (e) => {
        e.preventDefault();
        startValue = isVertical ? e.clientX : e.clientY;
        old1stComponentSize = firstComponent[isVertical ? 'offsetWidth' : 'offsetHeight'];
        old2ndComponentSize = secondComponent[isVertical ? 'offsetWidth' : 'offsetHeight'];

        document.onmousemove = (e) => {
          let endValue = isVertical ? e.clientX : e.clientY;
          let new1stComponentSize = old1stComponentSize + (endValue - startValue);
          let new2ndComponentSize = old2ndComponentSize - (endValue - startValue);

          // 最小值检查
          if (new1stComponentSize < firstMinValue) {
            new1stComponentSize = firstMinValue;
            new2ndComponentSize = old2ndComponentSize + (old1stComponentSize - new1stComponentSize);
          } else if (new2ndComponentSize < secondMinValue) {
            new2ndComponentSize = secondMinValue;
            new1stComponentSize = old1stComponentSize + (old2ndComponentSize - new2ndComponentSize);
          }

          firstComponent.style.width = isVertical ? new1stComponentSize + 'px' : '100%';
          secondComponent.style.width = isVertical ? new2ndComponentSize + 'px' : '100%';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    };

    initResize(); // 调用初始化函数
  }
};