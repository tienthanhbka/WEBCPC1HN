import request from '@/utils/post'
import requestApp from '@/utils/requestApp'
import requestT from '@/utils/requestT'

export function GetMyCall(data) {
  return request({
    url: 'Call/GetMyCall',
    method: 'post',
    data: data
  })
}

export function DisplayCall(data) {
  return request({
    url: 'Call/DisplayCall',
    method: 'post',
    data: data
  })
}

export function GetImgInfoInCall(data) {
  return request({
    url: 'Call/GetImgInfoInCall',
    method: 'post',
    data: data
  })
}
export function GetCallByIdGroup(data) {
  return request({
    url: 'Call/GetCallByIdGroup',
    method: 'post',
    data: data
  })
}
export function EvaluateCall(data) {
  return request({
    url: 'Call/EvaluateCall',
    method: 'post',
    data: data
  })
}
export function EvaluateLstCall(data) {
  return request({
    url: 'Call/EvaluateLstCall',
    method: 'post',
    data: data,
    timeout:10000
  })
}
export function GetLocation(data) {
  return request({
    url: 'Call/GetLocation',
    method: 'post',
    data: data
  })
}

export function GetMyLocaion(data) {
  return request({
    url: 'Call/GetMyLocaion',
    method: 'post',
    data: data
  })
}

export function GetWorkDayOfGroup(data) {
  return request({
    url: 'Call/GetWorkDayOfGroup',
    method: 'post',
    data: data
  })
}
export function GetNumCallReportOfGroup(data) {
  return request({
    url: 'Call/GetNumCallReportOfGroup',
    method: 'post',
    data: data
  })
}
export function GetCallOfIdGroupByDay(data) {
  return request({
    url: 'Call/GetCallOfIdGroupByDay',
    method: 'post',
    data: data
  })
}

export function GetAllCallByTime(data) {
  return request({
    url: 'Call/GetAllCallByTime',
    method: 'post',
    data: data
  })
}

export function EvaluateCallImg(data) {
  return request({
    url: 'Call/EvaluateCallImg',
    method: 'post',
    data: data
  })
}
export function ReportCallImgs(data) {
  return request({
    url: 'Call/ReportCallImgs',
    method: 'post',
    data: data
  })
}
export function GetCallLocationByTime(data) {
  return request({
    url: 'Call/GetCallLocationByTime',
    method: 'post',
    data: data
  })
}
export function GetCallByID(data) {
  return request({
    url: 'Call/GetCallByID',
    method: 'post',
    data: data
  })
}
export function GetCallByGId(data) {
  return requestApp({
    url: 'Call/GetCallByGId',
    method: 'post',
    data: data
  })
}

export function GetCallPoster3D(data) {
  return requestT({
    url: 'Call/GetCallPoster3D',
    method: 'post',
    data: data
  })
}
export function ApprovePoster3D(data) {
  return requestT({
    url: 'Call/ApprovePoster3D',
    method: 'post',
    data: data
  })
}
export function GetPoster3D(data) {
  return requestT({
    url: 'Call/GetPoster3D',
    method: 'post',
    data: data
  })
}
export function CreateScheduleCheck(data) {
  return requestT({
    url: 'Uniform/CreateScheduleCheck',
    method: 'post',
    data: data
  })
}
export function DelScheduleCheck(data) {
  return requestT({
    url: 'Uniform/DelScheduleCheck',
    method: 'post',
    data: data
  })
}
export function GetScheduleCheckLst(data) {
  return requestT({
    url: 'Uniform/GetScheduleCheckLst',
    method: 'post',
    data: data
  })
}
export function GetCallWithImgInfo(data) {
  return requestT({
    url: 'Uniform/GetCallWithImgInfo',
    method: 'post',
    data: data
  })
}
export function ApproveUniform(data) {
  return requestT({
    url: 'Uniform/ApproveUniform',
    method: 'post',
    data: data
  })
}
export function GetResultCheck(data) {
  return requestT({
    url: 'Uniform/GetResultCheck',
    method: 'post',
    data: data
  })
}
export function GetDetailResultCheck(data) {
  return requestT({
    url: 'Uniform/GetDetailResultCheck',
    method: 'post',
    data: data
  })
}
export function GetCallEm(data) {
  return requestT({
    url: 'Call/GetCallEm',
    method: 'post',
    data: data
  })
}

export function GetCallDecal(data) {
  return requestT({
    url: 'Call/GetCallDecal',
    method: 'post',
    data: data
  })
}
export function ApproveDecal(data) {
  return requestT({
    url: 'Call/ApproveDecal',
    method: 'post',
    data: data
  })
}
export function GetDecal(data) {
  return requestT({
    url: 'Call/GetDecal',
    method: 'post',
    data: data
  })
}