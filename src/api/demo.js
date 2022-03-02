import request from '@/utils/request2'

export function getData(data) {
  // return request.get('/call123')
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
  // return request.post('/UserLogin', data)
}
