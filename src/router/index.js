import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index";
import Home from '../views/layout/Home.vue';
import Login from "../views/layout/Login.vue";

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: "/login",
  name: "Login",
  component: Login,
},
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    console.log(store.state.userInfo.username);
    // 判断当前页面是否是登陆状态
    if (store.state.userInfo.username && store.state.userInfo.appkey && store.state.userInfo
      .email && store.state.userInfo.role) {
      return next();
    }
    return next("/login");
  }
  return next();
});

export default router;
