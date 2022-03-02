import request from '@/utils/requestApp'

export function CreateCriteriaDefine(data) {
  return request({
    url: 'NSCriteriaDefine/CreateCriteriaDefine',
    method: 'post',
    data: data
  })
}
export function UpdateCriteriaDefine(data) {
    return request({
      url: 'NSCriteriaDefine/UpdateCriteriaDefine',
      method: 'post',
      data: data
    })
  }
  export function DelCriteriaDefine(data) {
    return request({
      url: 'NSCriteriaDefine/DelCriteriaDefine',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeDefine(data) {
    return request({
      url: 'NSCriteriaDefine/GetEmployeeDefine',
      method: 'post',
      data: data
    })
  }
  export function GetCriteriaDefine(data) {
    return request({
      url: 'NSCriteriaDefine/GetCriteriaDefine',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeEvalued(data) {
    return request({
      url: 'NSCriteriaDefine/GetEmployeeEvalued',
      method: 'post',
      data: data
    })
  }
  
  export function GetCriteriaByEm(data) {
    return request({
      url: 'NSCriteriaDefine/GetCriteriaByEm',
      method: 'post',
      data: data
    })
  }
  
  export function GetReferenceCode(data) {
    return request({
      url: 'NSCriteriaDefine/GetReferenceCode',
      method: 'post',
      data: data
    })
  }
  export function GetDefaultValue(data) {
    return request({
      url: 'Other/GetDefaultValue',
      method: 'post',
      data: data
    })
  }
  export function LockCriteriaDefine(data) {
    return request({
      url: 'NSCriteriaDefine/LockCriteriaDefine',
      method: 'post',
      data: data
    })
  }
  export function CreateCriteriaHeaderNoAuto(data) {
    return request({
      url: 'NSCriteriaDefine/CreateCriteriaHeaderNoAuto',
      method: 'post',
      data: data
    })
  }
  export function UpdateCriteriaHeaderNoAuto(data) {
    return request({
      url: 'NSCriteriaDefine/UpdateCriteriaHeaderNoAuto',
      method: 'post',
      data: data
    })
  }
  export function DelCriteriaHeaderNoAuto(data) {
    return request({
      url: 'NSCriteriaDefine/DelCriteriaHeaderNoAuto',
      method: 'post',
      data: data
    })
  }
  export function GetCriteriaHeaderNoAutoByID(data) {
    return request({
      url: 'NSCriteriaDefine/GetCriteriaHeaderNoAutoByID',
      method: 'post',
      data: data
    })
  }
  export function UpdateCriteriaEmployeeNoAuto(data) {
    return request({
      url: 'NSCriteriaDefine/UpdateCriteriaEmployeeNoAuto',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeEvaluateLstByDocID(data) {
    return request({
      url: 'NSCriteriaDefine/GetEmployeeEvaluateLstByDocID',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeEvaluateLstByEm(data) {
    return request({
      url: 'NSCriteriaDefine/GetEmployeeEvaluateLstByEm',
      method: 'post',
      data: data
    })
  }