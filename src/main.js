// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import i18n from "@/lang";

import "@/base";
import "@/api"; // 导入api
import "amfe-flexible"; // 自适应布局
import "@/icons"; // svg图标 <svg-icon icon-class="id"/>
import "@/errorLog";
import "@/permission";

import * as filters from "@/filters"; // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
import {
  Button,
  Popup,
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Swipe,
  SwipeItem
} from "vant";
Vue.use(Button)
  .use(Popup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
