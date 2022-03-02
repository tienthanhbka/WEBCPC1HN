import request from '@/utils/requestT'
export function CreateSaleF(data) {
  return request({
    url: 'OCE/CreateSaleF',
    method: 'post',
    data: data
  })
}
export function UpdateSaleF(data) {
    return request({
      url: 'OCE/UpdateSaleF',
      method: 'post',
      data: data
    })
  }
  export function DelSaleF(data) {
    return request({
      url: 'OCE/DelSaleF',
      method: 'post',
      data: data
    })
  }
  export function GetSaleF(data) {
    return request({
      url: 'OCE/GetSaleF',
      method: 'post',
      data: data
    })
  }
  export function CreateCallF(data) {
    return request({
      url: 'OCE/CreateCallF',
      method: 'post',
      data: data
    })
  }
  export function UpdateCallF(data) {
    return request({
      url: 'OCE/UpdateCallF',
      method: 'post',
      data: data
    })
  }
  export function DelCallF(data) {
    return request({
      url: 'OCE/DelCallF',
      method: 'post',
      data: data
    })
  }
  export function GetCallF(data) {
    return request({
      url: 'OCE/GetCallF',
      method: 'post',
      data: data
    })
  }
  export function GetSetFDetail(data) {
    return request({
      url: 'OCE/GetSetFDetail',
      method: 'post',
      data: data
    })
  }
  export function AcceptSaleF(data) {
    return request({
      url: 'OCE/AcceptSaleF',
      method: 'post',
      data: data
    })
  }
  export function GetSetFLastMonth(data) {
    return request({
      url: 'OCE/GetSetFLastMonth',
      method: 'post',
      data: data
    })
  }