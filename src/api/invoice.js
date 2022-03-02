import request from '@/utils/getOrderHCM'
//import axios from 'axios'
import requestT from '@/utils/requestT'
export function GetProductSaleByUser(data) {
    return requestT({
      url: 'Product/GetProductSaleByUser',
      method: 'post',
      data:data
    })
  }
  export function GetProductByLocation(data) {
    return requestT({
      url: 'Product/GetProductByLocation',
      method: 'post',
      data:data
    })
  }
  export function GetPlaceByUser(data) {
    return requestT({
      url: 'Product/GetPlaceByUser',
      method: 'post',
      data:data
    })
  }
export function getInvoice(data) {
  //data.token = '123'
  return request({
    url: 'SalesHeader',
    method: 'post',
    data:data
  })
}

export function getInvoiceGroup(data) {
  //data.token = '123'
  return request({
    url: 'SalesHeader/Group',
    method: 'post',
    data:data
  })
}

export function getInvoiceMoney(data) {
  //data.token = '123'
  return request({
    url: 'SalesHeader/Money',
    method: 'post',
    data:data
  })
}

export function SendMailOrder(data) {
  return requestT({
    url: 'Order/SendMailOrder',
    method: 'post',
    data:data
  })
}
