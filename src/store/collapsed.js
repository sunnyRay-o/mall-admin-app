export default {
  namespaced: true,
  state: {
    // 左侧导航栏的闭合状态，false表示不闭合，true表示闭合
    collapsed: false,
  },
  mutations: {
    // 改变左侧导航栏的闭合状态
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    // 提交一个mutation，异步改变左侧导航栏的闭合状态
    asyncChangeCollapsed(ctx) {
      ctx.commit("changeCollapsed");
    },
  },
};
