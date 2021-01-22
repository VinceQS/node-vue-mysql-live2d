import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  // baseURL: process.env.BASE_API,
  timeout: 5000,
  changeOrigin: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    const urlInfo = JSON.parse(sessionStorage.getItem('token'))
    console.log('11', urlInfo)
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (urlInfo) {
      config.headers.token = urlInfo
    }
    return config
  },
  error => {
    console.log(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '000000') {
      // 401 token校验不通过或token失效 ; code = '1' 系统异常
      if (res.code === '401') {
        MessageBox.confirm('账号登录失效，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(1)
          store.dispatch('log_out')
          router.push({ path: '/login' })
        })
      } else {
        Message({
          type: 'error',
          message: res.message,
          duration: 5000
        })
      }
      // return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  }, error => {
    console.log('error', error)
    Message({
      type: 'error',
      message: error.message,
      duration: 5000
    })
    // return Promise.reject(new Error(error))
  }
)
export default service
