import request from '@/utils/requestT'
export function GetVoucherList(data) {
    return request({
      url: 'Voucher/GetVoucherList',
      method: 'post',
      data: data
    })
}
export function GetCusByEm(data) {
    return request({
      url: 'Voucher/GetCusByEm',
      method: 'post',
      data: data
    })
}
export function GetDetailVoucherCus(data) {
    return request({
      url: 'Voucher/GetDetailVoucherCus',
      method: 'post',
      data: data
    })
}