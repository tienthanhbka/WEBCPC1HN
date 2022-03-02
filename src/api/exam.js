import request from '@/utils/getOrderHCM'
export function getExam(data) {
    //data.token = '123'
    return request({
      url: 'Exam/Get',
      method: 'post',
      data:data
    })
  }

  export function getExamGroup(data) {
    //data.token = '123'
    return request({
      url: 'Exam/GetGroup',
      method: 'post',
      data:data
    })
  }