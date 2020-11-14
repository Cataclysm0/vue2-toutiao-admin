<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="user"
      :rules="formRules"
    >
      <el-form-item>
        <div class="login-head"></div>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="isAgree">
        <el-checkbox v-model="user.isAgree">
          我已阅读并同意用户协议和隐私条款
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
        isAgree: false
      },
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
            trigger: "blur"
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请勾选同意用户协议"));
              }
              setTimeout(() => {
                callback();
              }, 1000);
            },
            // message: "请勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    onLogin() {
      // 获取表单数据
      const user = this.user;
      // 表单验证
      this.$refs["loginForm"].validate(valid => {
        if (!valid) {
          return;
        }
        this.login(user);
      });
    },
    login(user) {
      this.loginLoading = true;
      login(user)
        .then(res => {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.loginLoading = false;
          // 将接口返回的用户相关数据放到本地存储
          // 本地存储只能存储字符串
          // 对象、数组可转为json
          window.localStorage.setItem("user", JSON.stringify(res.data.data));
          this.$router.push({
            name: "home"
          });
        })
        .catch(() => {
          this.$message.error("手机号或验证码错误");
          this.loginLoading = false;
        });
      // 验证通过，提交登录
      // 处理响应结果
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(./login_bg.jpg) no-repeat;
  background-size: cover;
  .login-head {
    width: 100%;
    height: 57px;
    background: url("./login_index.png") no-repeat;
  }
  .login-form {
    background-color: #fff;
    padding: 50px 50px 20px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
