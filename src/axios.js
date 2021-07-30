import axios from "axios";

const ins = axios.create({
  baseURL: "https://mallapi.duyiedu.com/",
});// axios实例
ins.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});
ins.interceptors.response.use((response) => {
  console.log(response);
  if (response.data.status === "fail") {
    // 登录失败
    return Promise.reject(response.data.msg);
  }
  // 登录成功
  return response.data.data;
}, (error) => Promise.reject(error));
export default ins;
