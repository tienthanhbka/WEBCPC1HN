import request from '@/utils/request'
export function CreateResponseProduct(data) {
  return request({
    url: 'DTResponseProduct/CreateResponseProduct',
    method: 'post',
    data: data
  })
}
export function UpdateResponseProduct(data) {
    return request({
      url: 'DTResponseProduct/UpdateResponseProduct',
      method: 'post',
      data: data
    })
  }
  export function GetResponseProduct(data) {
    return request({
      url: 'DTResponseProduct/GetResponseProduct',
      method: 'post',
      data: data
    })
  }