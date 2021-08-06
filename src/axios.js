import axios from "axios";
import store from "@/store";

const ins = axios.create({
  baseURL: "https://mallapi.duyiedu.com/",
}); // axios实例
ins.interceptors.request.use((config) => {
  const reg = /^\/passport[\s\S]*$/gi;
  if (reg.test(config.url)) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.userInfo.appkey,
    },
  };
}, (error) => Promise.reject(error));
ins.interceptors.response.use((response) => {
  if (response.data.status === "fail") {
    // 登录失败
    return Promise.reject(response.data.msg);
  }
  // 登录成功
  return response.data.data;
}, (error) => Promise.reject(error));
export default ins;
