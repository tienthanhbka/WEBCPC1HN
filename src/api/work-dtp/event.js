
import request from '@/utils/requestWork'

export function CreateEvent(data) {
    return request({
      url: '/Event/CreateEvent',
      method: 'post',
      data: data
    })
}
export function UpdateEvent(data) {
  return request({
    url: 'Event/UpdateEvent',
    method: 'post',
    data: data
  })
}
export function DelEvent(data) {
  return request({
    url: 'Event/DelEvent',
    method: 'post',
    data: data
  })
}
export function GetEventInfo(data) {
  return request({
    url: 'Event/GetEventInfo',
    method: 'post',
    data: data
  })
}
export function GetPublishEvent(data) {
  return request({
    url: 'Event/GetPublishEvent',
    method: 'post',
    data: data
  })
}
export function GetEventByUser(data) {
  return request({
    url: 'Event/GetEventByUser',
    method: 'post',
    data: data
  })
}
