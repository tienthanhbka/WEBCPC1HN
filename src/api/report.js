import request from '@/utils/post'

export function createReportDefine(data) {
  return request({
    url: 'Report/CreateDefine',
    method: 'post',
    data: data
  })
}

export function getReportDefine(data) {
    return request({
      url: 'Report/GetReportDefine',
      method: 'post',
      data: data
    })
  }

  export function getReportLineDefine(data) {
    return request({
      url: 'Report/GetReportLineDefine',
      method: 'post',
      data: data
    })
  }

  export function StartReport(data) {
    return request({
      url: 'Report/StartReport',
      method: 'post',
      data: data
    })
  }

  export function WorkReport(data) {
    return request({
      url: 'Report/WorkReport',
      method: 'post',
      data: data
    })
  }

  export function GetReportHeaderValue(data) {
    return request({
      url: 'Report/GetReportHeaderValue',
      method: 'post',
      data: data
    })
  }

  export function GetReportValue(data) {
    return request({
      url: 'Report/GetReportValue',
      method: 'post',
      data: data
    })
  }

  export function GetReportHeaderValueGroup(data) {
    return request({
      url: 'Report/GetReportHeaderValueGroup',
      method: 'post',
      data: data
    })
  }

  export function ConfirmReport(data) {
    return request({
      url: 'Report/ConfirmReport',
      method: 'post',
      data: data
    })
  }

  export function GetSumKPIReport(data) {
    return request({
      url: 'Report/GetSumKPIReport',
      method: 'post',
      data: data
    })
  }

  export function SendMailReport(data) {
    return request({
      url: 'Report/SendMailReport',
      method: 'post',
      data: data
    })
  }





