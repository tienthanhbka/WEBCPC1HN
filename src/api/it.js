import request from '@/utils/requestT'
export function UpdateTKCompany(data) {
    return request({
      url: 'IT/UpdateTKCompany',
      method: 'post',
      data:data
    })
  }
  export function CheckUserIT(data) {
    return request({
      url: 'IT/CheckUserIT',
      method: 'post',
      data:data
    })
  }
  export function ChangePassword(data) {
    return request({
      url: 'IT/ChangePassword',
      method: 'post',
      data:data
    })
  }
  export function ChangeEmployeeType(data) {
    return request({
      url: 'IT/ChangeEmployeeType',
      method: 'post',
      data:data
    })
  }
  export function GetGroupLst(data) {
    return request({
      url: 'IT/GetGroupLst',
      method: 'post',
      data:data
    })
  }
  export function CreateGroup(data) {
    return request({
      url: 'IT/CreateGroup',
      method: 'post',
      data:data
    })
  }
  export function DeleteGroup(data) {
    return request({
      url: 'IT/DeleteGroup',
      method: 'post',
      data:data
    })
  }
  export function SetRoleEmployee(data) {
    return request({
      url: 'IT/SetRoleEmployee',
      method: 'post',
      data:data
    })
  }
  export function MoveGroupEmployee(data) {
    return request({
      url: 'IT/MoveGroupEmployee',
      method: 'post',
      data:data
    })
  }
  export function GetEmployeeInfo(data) {
    return request({
      url: 'IT/GetEmployeeInfo',
      method: 'post',
      data:data
    })
  }
  export function AddEmployeeGroup(data) {
    return request({
      url: 'IT/AddEmployeeGroup',
      method: 'post',
      data:data
    })
  }
  export function ChangeEmployeeCode(data) {
    return request({
      url: 'IT/ChangeEmployeeCode',
      method: 'post',
      data:data
    })
  }
  export function ChangeMailCompany(data) {
    return request({
      url: 'IT/ChangeMailCompany',
      method: 'post',
      data:data
    })
  }
  export function NSGetEmployeeInfo(data) {
    return request({
      url: 'IT/NSGetEmployeeInfo',
      method: 'post',
      data:data
    })
  }
  export function CreateCPC1HNVote(data) {
    return request({
      url: 'IT/CreateCPC1HNVote',
      method: 'post',
      data:data
    })
  }
  export function GetCPC1HNVoteByEm(data) {
    return request({
      url: 'IT/GetCPC1HNVoteByEm',
      method: 'post',
      data:data
    })
  }
  export function GetCPC1HNLst(data) {
    return request({
      url: 'IT/GetCPC1HNLst',
      method: 'post',
      data:data
    })
  }
  export function GetCPC1HNVote(data) {
    return request({
      url: 'IT/GetCPC1HNVote',
      method: 'post',
      data:data
    })
  }
  export function SetupCenterEmployee(data) {
    return request({
      url: 'IT/SetupCenterEmployee',
      method: 'post',
      data:data
    })
  }
  