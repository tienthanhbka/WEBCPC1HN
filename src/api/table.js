import request from '@/utils/requestApp'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
