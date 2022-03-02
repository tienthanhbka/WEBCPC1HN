import request from '@/utils/post'

export function GetBFOItemByCus(data) {
    return request({
      url: 'Item/GetBFOItemByCus',
      method: 'post',
      data: data
    })
  }
  export function GetByProject(data) {
    return request({
      url: 'Item/GetByProject',
      method: 'post',
      data: data
    })
  }
  

  