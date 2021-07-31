// // 测试cookie
// import Cookie from "js-cookie";
// window.myCookie = Cookie;

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import "@/assets/css/reset.less";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
