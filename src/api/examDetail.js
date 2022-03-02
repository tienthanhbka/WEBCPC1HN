import request from '@/utils/getOrderHCM'
export function examDetail(data) {
    //data.token = '123'
    return request({
      url: 'Exam/Detail',
      method: 'post',
      data:data
    })
  }