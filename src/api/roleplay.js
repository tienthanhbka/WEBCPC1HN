import request from '@/utils/post'

export function CloseVideo(data) {
  return request({
    url: 'Role/CloseVideo',
    method: 'post',
    data: data
  })
}

export function OpenVideo(data) {
  return request({
    url: 'Role/OpenVideo',
    method: 'post',
    data: data
  })
}

export function createRole(data) {
  return request({
    url: 'Role/Create',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: 'Role/Update',
    method: 'post',
    data: data
  })
}

export function GetProductLst(data) {
    return request({
      url: 'Role/GetProductLst',
      method: 'post',
      data: data
    })
  }


  export function GetRoleEmployee(data) {
    return request({
      url: 'Role/GetRoleEmployee',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeNOTRole(data) {
    return request({
      url: 'Role/GetEmployeeNOTRole',
      method: 'post',
      data: data
    })
  }
export function GetRoleGroup(data) {
    return request({
      url: 'Role/GetRoleGroup',
      method: 'post',
      data: data
    })
  }
  
export function GetRoleIDGroup(data) {
  return request({
    url: 'Role/GetRoleIDGroup',
    method: 'post',
    data: data
  })
}
  export function GetTeacherLst(data) {
    return request({
      url: 'Role/GetTeacherLst',
      method: 'post',
      data: data
    })
  }

  export function GetAcceptLst(data) {
    return request({
      url: 'Role/GetAcceptLst',
      method: 'post',
      data: data
    })
  }

  export function AddTeacher(data) {
    return request({
      url: 'Role/AddTeacher',
      method: 'post',
      data: data
    })
  }

  export function AddAccept(data) {
    return request({
      url: 'Role/AddAccept',
      method: 'post',
      data: data
    })
  }
  
  export function CancelRole(data) {
    return request({
      url: 'Role/CancelRole',
      method: 'post',
      data: data
    })
  }
  
  export function UpdateTime(data) {
    return request({
      url: 'Role/UpdateTime',
      method: 'post',
      data: data
    })
  }

  
  export function UploadVideo(data) {
    return request({
      url: 'Role/UploadVideo',
      method: 'post',
      data: data
    })
  }

   
  export function AcceptRole(data) {
    return request({
      url: 'Role/AcceptRole',
      method: 'post',
      data: data
    })
  }

   
  export function NoAcceptRole(data) {
    return request({
      url: 'Role/NoAcceptRole',
      method: 'post',
      data: data
    })
  }
 
  
 
  
