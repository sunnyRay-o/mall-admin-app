import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index";
import getMenuRoutes from "@/utils/permission";
import Home from '../views/layout/Home.vue';
import Login from "../views/layout/Login.vue";

Vue.use(VueRouter);

/**
 * 系统中的页面的异步路由信息
 */
// const asyncRoutesMap = [{
//   path: "/product",
//   name: "Product",
//   meta: {
//     title: "商品",
//   },
//   component: Home,
//   children: [{
//     path: "list",
//     name: "ProductList",
//     meta: {
//       title: "商品列表",
//     },
//     component: () => import("../views/page/ProductList.vue"),
//   },
//   {
//     path: "add",
//     name: "ProductAdd",
//     meta: {
//       title: "添加商品",
//     },
//     component: () => import("../views/page/ProductAdd.vue"),
//   },
//   {
//     path: "category",
//     name: "Category",
//     meta: {
//       title: "类目管理",
//     },
//     component: () => import("../views/page/Category.vue"),
//   },
//   ],

// }];

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
    },
    component: () => import('@/views/page/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
    },
    component: () => import('@/views/page/Category.vue'),
  }],
}];

/**
 *  路由信息
 */
// const routes = [{
//   path: '/',
//   name: 'Home',
//   component: Home,
//   meta: {
//     title: "首页",
//   },
//   children: [{
//     path: "index",
//     name: "Index",
//     meta: {
//       title: "统计",
//     },
//     component: () => import("@/views/page/Index.vue"),
//   }],
// },
// {
//   path: "/login",
//   name: "Login",
//   meta: {
//     title: "登录",
//   },
//   component: Login,
// },
// ];

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '首页',
  },
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
    },
    component: () => import('../views/page/Index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
  },
},
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    console.log(store.state.userInfo.username);
    // 判断当前页面是否是登陆状态
    if (store.state.userInfo.username && store.state.userInfo.appkey && store.state.userInfo
      .email && store.state.userInfo.role) {
      console.log(store.state.userInfo.role);
      const menuRoutes = getMenuRoutes(store.state.userInfo.role, asyncRouterMap);
      console.log("过滤后的路由信息", menuRoutes);
      if (!isAddRoutes) {
        router.addRoutes(menuRoutes);
        store.dispatch("menuRoute/asyncChangeMenuRoutes", routes.concat(menuRoutes));
        isAddRoutes = true;
      }
      return next();
    }
    return next("/login");
  }
  return next();
});

export default router;
