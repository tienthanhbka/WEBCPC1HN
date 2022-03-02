import request from '@/utils/getOrderHCM'
//import axios from 'axios'
export function getShip(data) {
  //data.token = '123'
  return request({
    url: 'Ship',
    method: 'post',
    data:data
  })
}

