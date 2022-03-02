import request from '@/utils/post'

export function getTypeEmployee(params) {
  return request({
    url: '/TypeEmployee',
    method: 'post',
    params
  })
}
