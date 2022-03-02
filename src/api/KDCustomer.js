import request from '@/utils/requestApp'
import requestApp from '@/utils/requestApp'
import requestT from '@/utils/requestT'
export function CreateCustomer(data) {
  return requestApp({
    url: 'Customer/CreateCustomer',
    method: 'post',
    data: data
  })
}
export function UpdateCustomer(data) {
    return requestApp({
      url: 'Customer/UpdateCustomer',
      method: 'post',
      data: data
    })
  }
  export function DelCustomerByCId(data) {
    return requestApp({
      url: 'Customer/DelCustomerByCId',
      method: 'post',
      data: data
    })
  }
  export function GetCustomerByCId(data) {
    return requestApp({
      url: 'Customer/GetCustomerByCId',
      method: 'post',
      data: data
    })
  }
  export function GetCustomerByPId(data) {
    return requestApp({
      url: 'Customer/GetCustomerByPId',
      method: 'post',
      data: data
    })
  }
  
  export function TGetCustomerByPId(data) {
    return requestT({
      url: 'Customer/GetCustomerByPId',
      method: 'post',
      data: data
    })
  }
  /*API appview timeline customer*/
  export function GetReportTimelineByCus(data) {
    return request({
      url: 'Customer/GetReportTimelineByCus',
      method: 'post',
      data: data
    })
  }
  /*API appview warning employee */
  
  export function GetWarningEmployee(data) {
    return request({
      url: 'Customer/GetWarningEmployee',
      method: 'post',
      data:data
    })
  }
  /*API appview lấy danh sách khách hàng chưa đc viếng thăm */
  export function GetLastTakeCareCustomer(data) {
    return request({
      url: 'Customer/GetLastTakeCareCustomer',
      method: 'post',
      data:data
    })
  }
  export function GetDetailLastTakeCareCustomer(data) {
    return request({
      url: 'Customer/GetDetailLastTakeCareCustomer',
      method: 'post',
      data:data
    })
  }