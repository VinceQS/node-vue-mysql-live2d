import request from '../utils/request'

export function getCompany(params) {
  return request({
    url: '/company/getCompany',
    method: 'get',
    params: params
  })
}

// 新增
export function addCompany(params) {
  return request({
    url: '/company/addCompany',
    method: 'post',
    data: params
  })
}
