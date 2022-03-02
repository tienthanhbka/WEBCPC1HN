import request from '@/utils/requestT'
export function GetEmployeeLst(data) {
  return request({
    url: 'Employee/GetEmployeeLst',
    method: 'post',
    data: data
  })
}
export function CreateEmployeeNote(data) {
    return request({
      url: 'Employee/CreateEmployeeNote',
      method: 'post',
      data: data
    })
  }
  export function UpdateEmployeeNote(data) {
    return request({
      url: 'Employee/UpdateEmployeeNote',
      method: 'post',
      data: data
    })
  }
  export function DelEmployeeNote(data) {
    return request({
      url: 'Employee/DelEmployeeNote',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeNote(data) {
    return request({
      url: 'Employee/GetEmployeeNote',
      method: 'post',
      data: data
    })
  }