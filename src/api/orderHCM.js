import request from '@/utils/getOrderHCM'
//import axios from 'axios'
export function getOrder(data) {
  //data.token = '123'
  return request({
    url: 'OrderHCM',
    method: 'post',
    data:data
  })
}
