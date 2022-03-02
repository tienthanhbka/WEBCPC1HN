import request from '@/utils/post'

export function getCall(data) {
  return request({
    url: 'Call',
    method: 'post',
    data: data
  })
}

export function getMission(data) {
  return request({
    url: 'Mission',
    method: 'post',
    data: data
  })
}

export function getDebt(data) {
  return request({
    url: 'DebtToDate',
    method: 'post',
    data: data
  })
}

export function getSales(data) {
  return request({
    url: 'SalesLine',
    method: 'post',
    data: data
  })
}
