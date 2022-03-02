
import request from '@/utils/requestWork'

export function CreatePost(data) {
    return request({
      url: '/Post/CreatePost',
      method: 'post',
      data: data
    })
}
export function UpdatePost(data) {
  return request({
    url: 'Post/UpdatePost',
    method: 'post',
    data: data
  })
}
export function DelPost(data) {
  return request({
    url: 'Post/DelPost',
    method: 'post',
    data: data
  })
}
export function GetPostInfo(data) {
  return request({
    url: 'Post/GetPostInfo',
    method: 'post',
    data: data
  })
}
export function GetPublishPost(data) {
  return request({
    url: 'Post/GetPublishPost',
    method: 'post',
    data: data
  })
}
export function GetPostByUser(data) {
  return request({
    url: 'Post/GetPostByUser',
    method: 'post',
    data: data
  })
}
