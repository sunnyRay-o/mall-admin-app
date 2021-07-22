import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 左侧导航栏的闭合状态，false表示不闭合，true表示闭合
    collapsed: false,
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    asyncChangeCollapsed(ctx) {
      ctx.commit("changeCollapsed");
    },
  },
  modules: {
  },
});
