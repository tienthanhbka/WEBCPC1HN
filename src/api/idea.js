import request from '@/utils/requestApp'

export function CreateIdeaInfo(data) {
  return request({
    url: 'RDIdea/CreateIdeaInfo',
    method: 'post',
    data: data
  })
}

export function UpdateIdeaInfo(data) {
  return request({
    url: 'RDIdea/UpdateIdeaInfo',
    method: 'post',
    data: data
  })
}

export function GetEmployeeRD(data) {
    return request({
      url: 'RDIdea/GetEmployeeRD',
      method: 'post',
      data: data
    })
  }

export function RemoveIdeaInfo(data) {
    return request({
      url: 'RDIdea/RemoveIdeaInfo',
      method: 'post',
      data: data
    })
  }

  export function GetApprovedIdea(data) {
    return request({
      url: 'RDIdea/GetApprovedIdea',
      method: 'post',
      data: data
    })
  }

  export function GetIdeaById(data) {
    return request({
      url: 'RDIdea/GetIdeaById',
      method: 'post',
      data: data
    })
  }

  export function GetIdeaByUser(data) {
    return request({
      url: 'RDIdea/GetIdeaByUser',
      method: 'post',
      data: data
    })
  }

  export function GetIdeaForApprove(data) {
    return request({
      url: 'RDIdea/GetIdeaForApprove',
      method: 'post',
      data: data
    })
  }

  export function AppvoveIdea(data) {
    return request({
      url: 'RDIdea/AppvoveIdea',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeViewIdea(data) {
    return request({
      url: 'RDIdea/GetEmployeeViewIdea',
      method: 'post',
      data: data
    })
  }

  export function AddEmployeeIntoIdea(data) {
    return request({
      url: 'RDIdea/AddEmployeeIntoIdea',
      method: 'post',
      data: data
    })
  }

  export function RemoveEmployeeIntoIdea(data) {
    return request({
      url: 'RDIdea/RemoveEmployeeIntoIdea',
      method: 'post',
      data: data
    })
  }


