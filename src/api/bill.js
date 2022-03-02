import request from '@/utils/getOrderHCM'
// import axios from 'axios'
export function getBill(data) {
  data.token = '123'
  return request({
    url: 'user',
    method: 'post',
    data: data
  })
}
