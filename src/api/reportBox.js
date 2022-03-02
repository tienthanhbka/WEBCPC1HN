import request from '@/utils/requestApp'

export function CreateQuotaBoxFactory(data) {
  return request({
    url: 'SXReportBox/CreateQuotaBoxFactory',
    method: 'post',
    data: data
  })
}
export function UpdateQuotaBoxFactory(data) {
    return request({
      url: 'SXReportBox/UpdateQuotaBoxFactory',
      method: 'post',
      data: data
    })
  }
  export function GetQuotaBoxFactory(data) {
    return request({
      url: 'SXReportBox/GetQuotaBoxFactory',
      method: 'post',
      data: data
    })
  }
  export function GetQuotaBoxFactoryByPId(data) {
    return request({
      url: 'SXReportBox/GetQuotaBoxFactoryByPId',
      method: 'post',
      data: data
    })
  }
  
  export function CreateReportQuotaBox(data) {
    return request({
      url: 'SXReportBox/CreateReportQuotaBox',
      method: 'post',
      data: data
    })
  }
  
  export function GetReportQuotaBox(data) {
    return request({
      url: 'SXReportBox/GetReportQuotaBox',
      method: 'post',
      data: data
    })
  }
  export function DelReportQuotaBox(data) {
    return request({
      url: 'SXReportBox/DelReportQuotaBox',
      method: 'post',
      data: data
    })
  }
  export function UpdateReportQuotaBox(data) {
    return request({
      url: 'SXReportBox/UpdateReportQuotaBox',
      method: 'post',
      data: data
    })
  }