import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index";
import getMenuRoutes from "@/utils/permission";
import Home from '../views/layout/Home.vue';
import Login from "../views/layout/Login.vue";
import Logon from "../views/layout/Logon.vue";

Vue.use(VueRouter);

/**
 * 系统中的页面的异步路由信息
 */
const asyncRoutesMap = [{
  path: "/product",
  name: "Product",
  meta: {
    title: "商品",
    hidden: false,
    icon: "project",
  },
  component: Home,
  children: [{
    path: "list",
    name: "ProductList",
    meta: {
      title: "商品列表",
      hidden: false,
      icon: "unordered-list",
    },
    component: () => import("../views/page/ProductList.vue"),
  },
  {
    path: "add",
    name: "ProductAdd",
    meta: {
      title: "添加商品",
      hidden: false,
      icon: "folder-add",
    },
    component: () => import("../views/page/ProductAdd.vue"),
  },
  {
    path: "category",
    name: "Category",
    meta: {
      title: "类目管理",
      hidden: false,
      icon: "user",
    },
    component: () => import("../views/page/Category.vue"),
  },
  {
    path: "edit/:id",
    name: "ProductEdit",
    meta: {
      title: "编辑商品",
      hidden: true,
      icon: "edit",
    },
    component: () => import("../views/page/ProductAdd.vue"),
  },
  ],

}];

/**
 *  路由信息
 */
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: "首页",
    hidden: false,
    icon: "home",
  },
  redirect: {
    name: "Index",
  },
  children: [{
    path: "index",
    name: "Index",
    meta: {
      title: "统计",
      hidden: false,
      icon: "number",
    },
    component: () => import("@/views/page/Index.vue"),
  }],
},
{
  path: "/login",
  name: "Login",
  meta: {
    title: "登录",
    hidden: true,
  },
  component: Login,
},
{
  path: "/system/logon",
  name: "Logon",
  meta: {
    title: "注册",
    hidden: true,
  },
  component: Logon,
},
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    // 判断当前页面是否是登陆状态
    if (store.state.userInfo.username && store.state.userInfo.appkey && store.state.userInfo
      .email && store.state.userInfo.role) {
      const menuRoutes = getMenuRoutes(store.state.userInfo.role, asyncRoutesMap);
      if (!isAddRoutes) {
        const storeRoutes = routes.concat(menuRoutes);
        store.dispatch("menuRoute/asyncChangeMenuRoutes", storeRoutes).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next("/login");
  }
  return next();
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
