import request from '@/utils/request'

// 新增
export function addUser(params) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data: params
  })
}
// 删除
export function delUser(params) {
  return request({
    url: '/user/delUser/' + params,
    method: 'delete'
  })
}
// 列表
export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    params: params
  })
}
// 修改
export function updateUser(params) {
  return request({
    url: '/user/updateUser',
    method: 'patch',
    data: params
  })
}
