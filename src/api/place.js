import request from '@/utils/post'

export function GetMyPlace(data) {
    return request({
      url: 'Place/GetMyPlace',
      method: 'post',
      data: data
    })
  }
  export function GetPlaceByIdEmployee(data) {
    return request({
      url: 'Place/GetPlaceByIdEmployee',
      method: 'post',
      data: data
    })
  }
  export function GetPlaceByIdGroup(data) {
    return request({
      url: 'Place/GetPlaceByIdGroup',
      method: 'post',
      data: data
    })
  }
  
  