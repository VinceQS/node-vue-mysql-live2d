<template>
  <div class="navbar-main">
    <div class="hamburger-container" style="padding: 0 15px;" @click="toggleClick">
      <svg
        :class="{'is-active':isCollapse}"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        >
        <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
      </svg>
    </div>
    <div class="user-container">
      <el-dropdown>
        <span class="el-dropdown-link">
          <svg-icon icon-class="header"></svg-icon>
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'navBar',
  data() {
    return {

    }
  },
  computed: {
    isCollapse: function() {
      return store.getters.isCollapse
    },
    username: function() {
      return store.getters.userInfo.name
    }
  },
  methods: {
    toggleClick() {
      store.dispatch('CHANGE_SIDEBAR')
    },
    logout() {
      store.dispatch('log_out')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
.user-container {
  float: right;
  margin-right: 30px;
  cursor: pointer;
  .el-dropdown {
    font-size: 16px;
    line-height: 40px;
  }
}
</style>
