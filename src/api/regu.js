import request from '@/utils/post'

export function createRegu(data) {
  return request({
    url: 'Regu/CreateReguDefine',
    method: 'post',
    data: data
  })
}

export function UpdateReguDefine(data) {
  return request({
    url: 'Regu/UpdateReguDefine',
    method: 'post',
    data: data
  })
}

export function GetReguDefine(data) {
    return request({
      url: 'Regu/GetReguDefine',
      method: 'post',
      data: data
    })
  }

  export function createRegu2(data) {
    return request({
      url: 'Regu/CreateReguDefine2',
      method: 'post',
      data: data
    })
  }

  export function updateRegu2(data) {
    return request({
      url: 'Regu/UpdateReguDefine2',
      method: 'post',
      data: data
    })
  }
  
  export function GetReguDefine2(data) {
      return request({
        url: 'Regu/GetReguDefine2',
        method: 'post',
        data: data
      })
    }
  export function getReguById(data) {
    return request({
      url: 'Regu/GetReguDefineByID',
      method: 'post',
      data: data
    })
  }

export function getEmployeeDefine(data) {
    return request({
      url: 'Employee/GetEmployeeDefine',
      method: 'post',
      data: data
    })
  }
  
