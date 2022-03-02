import request from '@/utils/post'



export function AddNewPost(data) {
  return request({
    url: 'Blog/AddNewPost',
    method: 'post',
    data: data
  })
}
export function GetPost(data) {
    return request({
      url: 'Blog/GetPost',
      method: 'post',
      data: data
    })
  }