import request from '@/utils/requestApp'

export function ApproveReportMarket(data) {
  return request({
    url: 'RDReportEdit/ApproveReportMarket',
    method: 'post',
    data: data
  })
}

export function GetReportMarketForApprove(data) {
    return request({
      url: 'RDReportEdit/GetReportMarketForApprove',
      method: 'post',
      data: data
    })
  }

  export function GetReportMarketByIdea(data) {
    return request({
      url: 'RDReportEdit/GetReportMarketByIdea',
      method: 'post',
      data: data
    })
  }

  export function GetReportMarketByUser(data) {
    return request({
      url: 'RDReportEdit/GetReportMarketByUser',
      method: 'post',
      data: data
    })
  }

  export function RemoveReportMarket(data) {
    return request({
      url: 'RDReportEdit/RemoveReportMarket',
      method: 'post',
      data: data
    })
  }

  export function UpdateReportMarket(data) {
    return request({
      url: 'RDReportEdit/UpdateReportMarket',
      method: 'post',
      data: data
    })
  }

  export function CreateReportMarket(data) {
    return request({
      url: 'RDReportEdit/CreateReportMarket',
      method: 'post',
      data: data
    })
  }
  export function GetReportEditForApprove(data) {
    return request({
      url: 'RDReportEdit/GetReportEditForApprove',
      method: 'post',
      data: data
    })
  }
  export function ApproveReportEdit(data) {
    return request({
      url: 'RDReportEdit/ApproveReportEdit',
      method: 'post',
      data: data
    })
  }
  export function GetReportEditByResearch(data) {
    return request({
      url: 'RDReportEdit/GetReportEditByResearch',
      method: 'post',
      data: data
    })
  }
  export function GetReportEditByUser(data) {
    return request({
      url: 'RDReportEdit/GetReportEditByUser',
      method: 'post',
      data: data
    })
  }
  export function GetReportEditById(data) {
    return request({
      url: 'RDReportEdit/GetReportEditById',
      method: 'post',
      data: data
    })
  }
  export function UpdateReportEdit(data) {
    return request({
      url: 'RDReportEdit/UpdateReportEdit',
      method: 'post',
      data: data
    })
  }