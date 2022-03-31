import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function getBranch(data) {
  return request({
    url: 'Groups/GetBranch',
    method: 'post',
    data: data
  })
}

export function GetAllGroup(data) {
  return request({
    url: 'Groups/GetAllGroup',
    method: 'post',
    data: data
  })
}

export function GetEmployeeAll(data) {
  return request({
    url: 'Groups/GetEmployeeAll',
    method: 'post',
    data: data
  })
}

export function getGroupByBranch(data) {
  return request({
    url: 'Groups/GetGroupsByBranch',
    method: 'post',
    data: data
  })
}

export function getEmployeesByIdGroup(data) {
  return request({
    url: 'Groups/GetEmployeesByIdGroup',
    method: 'post',
    data: data
  })
}

export function addEmployeeGroup(data) {
  return request({
    url: 'Groups/AddEmployeeGroup',
    method: 'post',
    data: data
  })
}

export function deleteEmployeeGroup(data) {
  return request({
    url: 'Groups/DeleteEmployeeGroup',
    method: 'post',
    data: data
  })
}

export function GetListGroupAdminByToken(data) {
  return request({
    url: 'Groups/GetListGroupAdminByToken',
    method: 'post',
    data: data
  })
}
export function AddBranch(data) {
  return request({
    url: 'Groups/AddBranch',
    method: 'post',
    data: data
  })
}

export function GetGroup(data) {
  return request({
    url: 'Groups/GetGroup',
    method: 'post',
    data: data
  })
}

export function GetGroupEmployee(data) {
  return request({
    url: 'Groups/Get',
    method: 'post',
    data: data
  })
}
export function GetAllEmployeesByIdGroup(data) {
  return request({
    url: 'Groups/GetAllEmployeesByIdGroup',
    method: 'post',
    data: data
  })
}
export function GetDetailEmployeeGroup(data) {
  return requestT({
    url: 'Group/GetDetailEmployeeGroup',
    method: 'post',
    data: data
  })
}

