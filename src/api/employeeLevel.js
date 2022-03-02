import request from '@/utils/post'

export function GetEmployeeLevel(data) {
  return request({
    url: 'EmployeeLevel/GetEmployeeLevel',
    method: 'post',
    data: data
  })
}

export function UpdateEmployeeLevel(data) {
    return request({
      url: 'EmployeeLevel/UpdateEmployeeLevel',
      method: 'post',
      data: data
    })
  }

  
export function UpdateEmployeeFromTableEmployee(data) {
  return request({
    url: 'EmployeeLevel/UpdateEmployeeFromTableEmployee',
    method: 'post',
    data: data
  })
}

  export function SearchEmployeeLevel(data) {
    return request({
      url: 'EmployeeLevel/SearchEmployeeLevel',
      method: 'post',
      data: data
    })
  }


  
