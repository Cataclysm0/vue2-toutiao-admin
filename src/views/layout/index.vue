<template>
  <el-container class="layout-container">
    <el-aside class="aside" :width="wth">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <i
          :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse
          }"
          @click="(isCollapse = !isCollapse), changeAside()"
        ></i>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" />{{ user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">
              用户退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/aside";
import { getUserProfile } from "@/api/user";

export default {
  name: "LayoutIndex",
  components: {
    AppAside
  },
  data() {
    return {
      user: {},
      isCollapse: false,
      wth: "250px"
    };
  },
  created() {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then(res => {
        this.user = res.data.data;
      });
    },
    changeAside() {
      this.wth = this.isCollapse ? "auto" : "250px";
    },
    onLogout() {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          // 清除登录状态
          window.localStorage.removeItem("user");
          // 跳转到登录页
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "已退出!"
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b3c0d1;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
