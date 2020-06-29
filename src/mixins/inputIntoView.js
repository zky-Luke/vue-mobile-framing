export default {
  data () {
    return {
      fullHeight: 0, // 屏幕高度
      delay: 300 // 移动可视区延时
    }
  },
  
  methods: {
    // 判断设备类型
    judgeDeviceType () {
      var ua = window.navigator.userAgent.toLocaleLowerCase();
      var isIOS = /iphone|ipad|ipod/.test(ua);
      var isAndroid = /android/.test(ua);
      return {
        isIOS: isIOS,
        isAndroid: isAndroid
      }
    },
    
    // 初始化监听
    initResize () {
      var $inputs = document.querySelectorAll('input');
      console.log('$inputs', $inputs)
      for (var i = 0; i < $inputs.length; i++) {
        this.listenKeybord($inputs[i])
      }
    },
    
    // 监听输入框的软键盘弹起和收起事件
    listenKeybord ($input) {
      if (this.judgeDeviceType().isIOS) {
        // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
        $input.addEventListener('focus', () => {}, false)
        // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
        $input.addEventListener('blur', () => {})
      }

      // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
      if (this.judgeDeviceType().isAndroid) {
        this.fullHeight = document.documentElement.clientHeight || document.body.clientHeight;
        window.addEventListener('resize', () => {
          var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (resizeHeight < this.fullHeight) {
            // console.log('Android 键盘弹起啦！');
            this.activeElementScrollIntoView($input);
          } else {
            // console.log('Android 键盘收起啦！');
          }
        }, false)
      }
    },
    
    // 获取到焦点元素滚动到可视区
    activeElementScrollIntoView (activeElement) {
      var editable = activeElement.getAttribute('contenteditable')

      // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
      if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' || editable === '' || editable) {
        setTimeout(() => {
          activeElement.scrollIntoView();
        }, this.delay)
      }
    }
  }
}