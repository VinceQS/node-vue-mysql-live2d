// 路由改变前，查询用户信息
// 正常点击切换路由，存储在Vuex中的用户信息是没问题的，但是刷新页面时Vuex信息重置，
// 可通过token去重新请求用户信息回填，触发点在路由切换前
import router from './router'
import store from './store'
// import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const noToken = ['/login', '/register']
  if (noToken.includes(to.path)) {
    next()
  } else {
    if (token) {
      // 通过判断vuex中是否有user信息，可知道当前是刷新了页面还是正常切换路由
      if (JSON.stringify(store.getters.userInfo) !== '{}') {
        next()
      } else {
        store.dispatch('get_user').then(() => {
          next()
        }).catch()
      }
    } else {
      // 没有token信息，触发logout并退出到登录
      router.push({ path: '/' })
    }
  }
})
