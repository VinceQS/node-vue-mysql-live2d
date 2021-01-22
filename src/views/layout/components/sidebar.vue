<template>
  <el-menu
    :collapse="isCollapse"
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    actice-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    :collapse-transition="false"
    :router="true"
    :default-active="$route.path">
    <el-menu-item index="/index"><i class="icon el-icon-menu"></i> <span
        slot="title"
      >首页</span></el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="icon el-icon-s-custom"></i>
        <span slot="title">用户</span>
      </template>
      <el-menu-item index="/userList">
        <!-- <svg-icon icon-class="user"></svg-icon> -->
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/companyList">
        <!-- <svg-icon icon-class="company"></svg-icon> -->
        <span slot="title">公司信息</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/map">
      <i class="icon el-icon-s-home"></i>
      <span slot="title">地图</span>
    </el-menu-item>
    <el-menu-item index="/socket">
      <i class="icon el-icon-chat-dot-round"></i>
      <span slot="title">聊天</span>
    </el-menu-item>
    <el-menu-item index="/page">
      <i class="icon el-icon-user"></i>
      <span slot="title">文章</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
// import path from 'path'
// import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  data() {
    return {
      // isCollapse: false,
    }
  },
  computed: {
    isCollapse: () => {
      return store.getters.isCollapse
    }
  }
}
</script>
<style lang="scss">
.el-menu {
  border: 0 none !important;
}
</style>

