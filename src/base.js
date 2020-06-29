import Vue from "vue";
import { lStorage, sStorage } from '@/utils/storage';

let base = {};
base.install = function(Vue) {
  // 路由跳转动画
  Object.defineProperties(Vue.prototype, {
    $transition: {
      value: "fade-effect",
      writable: true,
      configurable: true
    },

    // 本地存储注册
    $lStorage: {
      get() {
        return lStorage;
      }
    },

    $sStorage: {
      get() {
        return sStorage;
      }
    }
  });
};
Vue.use(base);
export default base;
