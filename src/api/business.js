import request from '@/utils/requestT'

export function GetResultEmployee(data) {
  return request({
    url: 'Business/GetResultEmployee',
    method: 'post',
    data: data
  })
}