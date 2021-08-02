export default {
  namespaced: true,
  state: {
    menuRoutes: [], // 菜单导航的路由信息
  },
  mutations: {
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    asyncChangeMenuRoutes({ commit }, routes) {
      commit("changeMenuRoutes", routes);
    },
  },
};
