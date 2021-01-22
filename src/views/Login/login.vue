<template>
  <div class="login-container">
    <div class="login-panel">
      <h2>This is a good product</h2>
      <div class="login-box">
        <el-form :model="loginForm" :inline="false" ref="loginForm" :rules="loginRules">
          <el-form-item label="" prop="user">
            <span class="svg-container">
              <svg-icon icon-class="user"></svg-icon>
            </span>
            <el-input v-model.trim="loginForm.user" placeholder="Please input username"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input :type="password ? 'password' : 'text'" v-model.trim="loginForm.password" placeholder="Please input password" @keyup.enter.native="handleLogin"></el-input>
            <span class="show-pwd">
              <svg-icon @click="showPwd" :icon-class="password ? 'eye' : 'eye-open'"></svg-icon>
            </span>
          </el-form-item>
          <span style="display:block;text-align:left; font-size:12px;margin-bottom:5px;">
            <el-link size="mini" :underline="false" type="primary" @click.native.prevent="forgetPsw">忘记密码</el-link>
          </span>
          <el-button :loading="loading" type="primary" style="width:100%; margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/login'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/
      if (!value) {
        callback(new Error('请输入账号'))
      } else if (!reg.test(value)) {
        callback(new Error('账号格式错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_@#$%&*]*$/
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        user: 'zhangsan',
        password: '123456'
      },
      password: true,
      loading: false,
      loginRules: {
        user: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.loginForm).then(response => {
            console.log(response)
            if (response.statusText === 'success') {
              this.$message({
                message: response.message,
                type: 'success',
                duration: 1400
              })
              const user = {
                userInfo: response.userInfo,
                token: response.token
              }
              this.$store.dispatch('log_in', user)
              setTimeout(() => {
                this.$router.push('/index')
              }, 1500)
            } else {
              this.$message.error(response.message)
            }
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    showPwd() {
      this.password = !this.password
    },
    forgetPsw() {
      this.$message.warning('你忘了怪谁！')
    }
  }
}
</script>
<style lang="sass">
  @import '@/styles/login.scss'
</style>
