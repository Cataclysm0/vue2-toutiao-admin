/* 
    基于 axios 封装的请求模块
*/
import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/"
});

// 请求拦截器
request.interceptors.request.use(config => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  // 如果有登录用户信息，则统一设置 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default request;
