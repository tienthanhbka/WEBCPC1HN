import request from '@/utils/requestApp'

export function GetActiveElement(data) {
  return request({
    url: 'DefaultValue/GetActiveElement',
    method: 'post',
    data: data
  })
}