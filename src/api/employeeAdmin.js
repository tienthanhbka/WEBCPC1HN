import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function GetLstEmployee(data) {
  return request({
    url: 'Employee/GetLstEmployee',
    method: 'post',
    data: data
  })
}

export function GetDetailEmployee(data) {
    return request({
      url: 'Employee/GetDetailEmployee',
      method: 'post',
      data: data
    })
  }

  
export function GetEmployeeDefine(data) {
  return request({
    url: 'Employee/GetEmployeeDefine',
    method: 'post',
    data: data
  })
}

export function GetLstGroup(data) {
    return request({
      url: 'Employee/GetLstGroup',
      method: 'post',
      data: data
    })
  }

  export function UpdateGroup(data) {
    return request({
      url: 'Employee/UpdateGroup',
      method: 'post',
      data: data
    })
  }

  export function UpdateOTC(data) {
    return request({
      url: 'Employee/UpdateOTC',
      method: 'post',
      data: data
    })
  }

  export function GetKH(data) {
    return request({
      url: 'Employee/GetKH',
      method: 'post',
      data: data
    })
  }
  export function GetAccountNumberLst(data) {
    return requestT({
      url: 'Employee/GetAccountNumberLst',
      method: 'post',
      data: data
    })
  }
  export function CreateEmAccount(data) {
    return requestT({
      url: 'Employee/CreateEmAccount',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeLevel(data) {
    return requestT({
      url: 'Employee/GetEmployeeLevel',
      method: 'post',
      data: data
    })
  }


  
