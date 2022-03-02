import request from '@/utils/requestApp'
import requestT from '@/utils/requestT'
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
  export function GetItemFast(data) {
    return requestT({
      url: 'Product/GetItemFast',
      method: 'post',
      data: data
    })
  }
  export function CreateProductEm(data) {
    return requestT({
      url: 'Product/CreateProductEm',
      method: 'post',
      data: data
    })
  }
  export function UpdateProductEm(data) {
    return requestT({
      url: 'Product/UpdateProductEm',
      method: 'post',
      data: data
    })
  }
  export function DelProductEm(data) {
    return requestT({
      url: 'Product/DelProductEm',
      method: 'post',
      data: data
    })
  }
  export function GetProductEm(data) {
    return requestT({
      url: 'Product/GetProductEm',
      method: 'post',
      data: data
    })
  }
  export function AcceptProductEm(data) {
    return requestT({
      url: 'Product/AcceptProductEm',
      method: 'post',
      data: data
    })
  }
  export function GetProductEmByAdmin(data) {
    return requestT({
      url: 'Product/GetProductEmByAdmin',
      method: 'post',
      data: data
    })
  }