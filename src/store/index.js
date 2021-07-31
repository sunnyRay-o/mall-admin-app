import Vue from 'vue';
import Vuex from 'vuex';
import {
  setUserCookie,
  getUserCookie,
  removeUserCookie,
} from "@/utils/userCookie";
import collapsed from "./collapsed";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    collapsed,
  },
  state: {
    // 用户的登录信息
    userInfo: getUserCookie(),
  },
  mutations: {
    // 改变用户的登录信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 登出
    logout(state) {
      state.userInfo = {
        username: "",
        email: "",
        appkey: "",
        role: "",
      };
    },
  },
  actions: {
    // 提交一个mutation，异步改变用户的登录信息
    asyncSetUserInfo({ commit }, userInfo) {
      commit("setUserInfo", userInfo);
      setUserCookie(userInfo);
    },
    // 提交一个mutation，异步的登出当前用户
    asyncLogout({ commit }) {
      commit("logout");
      removeUserCookie();
    },
  },
});
