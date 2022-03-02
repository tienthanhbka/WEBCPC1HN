import request from '@/utils/getOrderHCM'
export function getInvoiceLine(data) {
    //data.token = '123'
    return request({
      url: 'SalesLine',
      method: 'post',
      data:data
    })
  }