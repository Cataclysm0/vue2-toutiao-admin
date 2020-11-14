/**
 * 用户相关请求模块
 */
import request from "@/utils/request.js";

// 用户登录
export const login = user => {
  return request({
    method: "POST",
    url: "/mp/v1_0/authorizations",
    data: user
  });
};

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile"
  });
};
