import request from '@/utils/post'


export function AddFileToCus(data) {
  return request({
    url: 'Customer/AddFileToCus',
    method: 'post',
    data: data
  })
}

export function AddInventoryHistoryToCus(data) {
  return request({
    url: 'Customer/AddInventoryHistoryToCus',
    method: 'post',
    data: data
  })
}
export function GetInventoryHistoryOfCus(data) {
    return request({
      url: 'Customer/GetInventoryHistoryOfCus',
      method: 'post',
      data: data
    })
  }
  export function CalInventoryReportByCus(data) {
    return request({
      url: 'Customer/CalInventoryReportByCus',
      method: 'post',
      data: data
    })
  }
  export function GetCusCNOfCusTC(data) {
    return request({
      url: 'Customer/GetCusCNOfCusTC',
      method: 'post',
      data: data
    })
  }
  export function DelInventoryRow(data) {
    return request({
      url: 'Customer/DelInventoryRow',
      method: 'post',
      data: data
    })
  }
  
