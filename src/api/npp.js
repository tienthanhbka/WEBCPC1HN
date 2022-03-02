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