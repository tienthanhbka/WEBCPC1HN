
import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function GetSaleHeaderByCustomer(data) {
    return request({
      url: 'SalesHeader/GetSaleHeaderByCustomer',
      method: 'post',
      data: data
    })
  }
  export function GetSalesGroup(data) {
    return requestT({
      url: 'Sales/GetSalesGroup',
      method: 'post',
      data: data
    })
  }
  export function FindSaleHeaders(data) {
    return request({
      url: 'SalesHeader/FindSaleHeaders',
      method: 'post',
      data: data
    })
  } 	
  export function GetEmployeeProductSale(data) {
    return requestT({
      url: 'Sales/GetEmployeeProductSale',
      method: 'post',
      data: data
    })
  }
  export function GetProductSale(data) {
    return requestT({
      url: 'Sales/GetProductSale',
      method: 'post',
      data: data
    })
  }
  export function GetBranchSaleByEmInDay(data) {
    return requestT({
      url: 'Sales/GetBranchSaleByEmInDay',
      method: 'post',
      data: data
    })
  }
  export function GetBranchSaleByAdmin(data) {
    return requestT({
      url: 'Sales/GetBranchSaleByAdmin',
      method: 'post',
      data: data
    })
  }
