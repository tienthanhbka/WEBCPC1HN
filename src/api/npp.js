import request from '@/utils/requestT'

export function GetSalesHeaderByEm(data) {
  return request({
    url: 'NPP/GetSalesHeaderByEm',
    method: 'post',
    data
  })
}
export function GetSalesLineByIDHeader(data) {
    return request({
      url: 'NPP/GetSalesLineByIDHeader',
      method: 'post',
      data
    })
  }
  export function TransferSalesLineForEm(data) {
    return request({
      url: 'NPP/TransferSalesLineForEm',
      method: 'post',
      data
    })
  }
  export function GetLocalStore(data) {
    return request({
      url: 'NPP/GetLocalStore',
      method: 'post',
      data
    })
  }
  export function GetLocalStoreByEm(data) {
    return request({
      url: 'NPP/GetLocalStoreByEm',
      method: 'post',
      data
    })
  }
  export function CreateEmployeeLocal(data) {
    return request({
      url: 'NPP/CreateEmployeeLocal',
      method: 'post',
      data
    })
  }
  export function DelEmployeeLocal(data) {
    return request({
      url: 'NPP/DelEmployeeLocal',
      method: 'post',
      data
    })
  }