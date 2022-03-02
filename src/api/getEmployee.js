import request from '@/utils/post'

export function getEmployee(data) {
    return request({
      url: 'Employee/Get',
      method: 'post',
      data: data
    })
  }

  export function GetLstEmployeeHandOver(data) {
    return request({
      url: 'Employee/GetLstEmployeeHandOver',
      method: 'post',
      data: data
    })
  }

  export function GetDriver(data) {
    return request({
      url: 'Employee/GetDriver',
      method: 'post',
      data: data
    })
  }

  export function CreateUser(data) {
    return request({
      url: 'Employee/CreateUser',
      method: 'post',
      data: data
    })
  }
 