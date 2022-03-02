import request from '@/utils/post'
// import axios from 'axios'
export function getSalesLineByDocNo(data) {
  return request({
    url: 'SalesLine/GetSalesLineByDocNo',
    method: 'post',
    data: data
  })
}
