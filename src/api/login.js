import request from '@/utils/request'

// 获取用户信息（根据token）
export function getUserInfo() {
  return request({
    url: '/login/getUserInfo',
    method: 'get'
  })
}
// 登录
export function login(params) {
  return request({
    url: '/login/login',
    method: 'post',
    data: params
  })
}
