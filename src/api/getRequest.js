import request from '@/utils/getOrderHCM'
//import axios from 'axios'
export function getRequest(data) {
  //data.token = '123'
  return request({
    url: 'Request/Get',
    method: 'post',
    data:data
  })
}


export function ErrorDetail(data) {
  //data.token = '123'
  return request({
    url: 'Request/GetErrorDetail',
    method: 'post',
    data:data
  })
}
export function getRequestEx(data) {
  //data.token = '123'
  return request({
    url: 'Request/GetEx',
    method: 'post',
    data:data
  })
}

export function getRequestGroup(data) {
  //data.token = '123'
  return request({
    url: 'Request/Group',
    method: 'post',
    data:data
  })
}

export function complete(data) {
  return request({
    url: 'Request/UpdateRequest',
    method: 'post',
    data: data
  })
}

export function report(data) {
  return request({
    url: 'Request/UpdateOrderGroup',
    method: 'post',
    data: data
  })
}

export function confirm(data) {
  return request({
    url: 'Request/Confirm',
    method: 'post',
    data: data
  })
}

