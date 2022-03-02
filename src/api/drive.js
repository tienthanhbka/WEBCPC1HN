import request from '@/utils/drive'
export function GetVideo(data) {
    return request({
      url: 'getVideo?id='+data,
      method: 'get',
      
    })
  }
