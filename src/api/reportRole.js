import request from '@/utils/post'

export function createReportDefine(data) {
  return request({
    url: 'ReportRole/CreateDefine',
    method: 'post',
    data: data
  })
}

export function getReportDefine(data) {
    return request({
      url: 'ReportRole/GetReportDefine',
      method: 'post',
      data: data
    })
  }

  export function getReportLineDefine(data) {
    return request({
      url: 'ReportRole/GetReportLineDefine',
      method: 'post',
      data: data
    })
  }

  export function StartReport(data) {
    return request({
      url: 'ReportRole/StartReport',
      method: 'post',
      data: data
    })
  }
  export function GetAnswer(data) {
    return request({
      url: 'ReportRole/GetAnswer',
      method: 'post',
      data: data
    })
  }
  export function WorkReport(data) {
    return request({
      url: 'ReportRole/WorkReport',
      method: 'post',
      data: data
    })
  }

  export function GetReportHeaderValue(data) {
    return request({
      url: 'ReportRole/GetReportHeaderValue',
      method: 'post',
      data: data
    })
  }

  export function GetReportValue(data) {
    return request({
      url: 'ReportRole/GetReportValue',
      method: 'post',
      data: data
    })
  }

  export function GetReportHeaderValueGroup(data) {
    return request({
      url: 'ReportRole/GetReportHeaderValueGroup',
      method: 'post',
      data: data
    })
  }

  export function ConfirmReport(data) {
    return request({
      url: 'ReportRole/ConfirmReport',
      method: 'post',
      data: data
    })
  }

  export function GetSumKPIReport(data) {
    return request({
      url: 'ReportRole/GetSumKPIReport',
      method: 'post',
      data: data
    })
  }

  export function SendMailReport(data) {
    return request({
      url: 'ReportRole/SendMailReport',
      method: 'post',
      data: data
    })
  }


  export function GetPartValue(data) {
    return request({
      url: 'ReportRole/GetPartValue',
      method: 'post',
      data: data
    })
  }




