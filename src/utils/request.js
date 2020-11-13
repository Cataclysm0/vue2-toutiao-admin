/* 
    基于 axios 封装的请求模块
*/
import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/"
});

export default request;
