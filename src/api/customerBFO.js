import request from '@/utils/post'

export function GetCustomerBFO(data) {
  return request({
    url: 'CustomerBFO/Get',
    method: 'post',
    data: data
  })
}

export function GetInforFile(data) {
  return request({
    url: 'CustomerBFO/GetInforFile',
    method: 'post',
    data: data
  })
}