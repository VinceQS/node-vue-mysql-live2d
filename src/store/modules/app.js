import { getUserInfo } from '@/api/login'
const app = {
  state: {
    isCollapse: false, // 左侧菜单收起
    userInfo: {}
  },
  mutations: {
    SET_SIDEBAR: (state) => {
      state.isCollapse = !state.isCollapse
    },
    LOG_IN: (state, userInfo) => {
      state.userInfo = userInfo
    },
    LOG_OUT: (state) => {
      state.userInfo = {}
    }
  },
  actions: {
    // 切换菜单状态
    CHANGE_SIDEBAR: ({ commit }) => {
      commit('SET_SIDEBAR')
    },
    // 清除session
    log_out: ({ commit }) => {
      sessionStorage.removeItem('token')
      commit('LOG_OUT')
    },
    // 存储当前用户
    log_in: ({ commit }, user) => {
      sessionStorage.setItem('token', JSON.stringify(user.token))
      commit('LOG_IN', user.userInfo)
    },
    // 获取用户信息
    get_user: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          if (res.userInfo) {
            commit('LOG_IN', res.userInfo)
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    }
  }
}

export default app
