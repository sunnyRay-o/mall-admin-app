import Cookie from "js-cookie";
/**
 * 设置用户的cookie信息
 * @param {Object} userInfo 登录的用户的信息
 */
export function setUserCookie(userInfo) {
  const arr = Object.entries(userInfo);
  for (let i = 0; i < arr.length; i += 1) {
    Cookie.set(arr[i][0], arr[i][1]);
  }
  return true;
}
/**
 * 获取用户的cookie信息
 */
window.myCookie = Cookie;
export function getUserCookie() {
  return {
    username: Cookie.get("username"),
    email: Cookie.get("email"),
    appkey: Cookie.get("appkey"),
    role: Cookie.get("role"),
  };
}
/**
 * 删除用户的cookie信息
 */
export function removeUserCookie() {
  Cookie.remove("username");
  Cookie.remove("email");
  Cookie.remove("appkey");
  Cookie.remove("role");
  return true;
}
