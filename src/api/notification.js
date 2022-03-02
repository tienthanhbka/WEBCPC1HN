import request from '@/utils/post'

export function SendNToken(data) {
  return request({
    url: 'Notification/SendNToken',
    method: 'post',
    data: data
  })
}
export function GetNotification(data) {
  return request({
    url: 'Notification/GetNotification',
    method: 'post',
    data: data
  })
}
