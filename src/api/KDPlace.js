import requestApp from '@/utils/requestApp'
import request from '@/utils/requestApp'
export function GetPlaceByPId(data) {
  return requestApp({
    url: 'Place/GetPlaceByPId',
    method: 'post',
    data: data
  })
}
export function GetPlaceByUId(data) {
    return requestApp({
      url: 'Place/GetPlaceByUId',
      method: 'post',
      data: data
    })
  }
  export function GetPlaceByEmType(data) {
    return requestApp({
      url: 'Place/GetPlaceByEmType',
      method: 'post',
      data: data
    })
  }
  export function GetPlaceByCity(data) {
    return requestApp({
      url: 'Place/GetPlaceByCity',
      method: 'post',
      data: data
    })
  }
  export function DelPlaceByPId(data) {
    return requestApp({
      url: 'Place/DelPlaceByPId',
      method: 'post',
      data: data
    })
  }
  export function UpdatePlaceByPId(data) {
    return requestApp({
      url: 'Place/UpdatePlaceByPId',
      method: 'post',
      data: data
    })
  }
  export function CreatePlace(data) {
    return requestApp({
      url: 'Place/CreatePlace',
      method: 'post',
      data: data
    })
  }
  export function AddPlaceFromSystem(data) {
    return requestApp({
      url: 'Place/AddPlaceFromSystem',
      method: 'post',
      data: data
    })
  }
  export function GetFileOfCustomer(data) {
    return request({
      url: 'Place/GetFileOfCustomer',
      method: 'post',
      data: data
    })
  }
  export function DelFileOfCustomer(data) {
    return request({
      url: 'Place/DelFileOfCustomer',
      method: 'post',
      data: data
    })
  }
  
  export function GetPlaceByMId(data) {
    return requestApp({
      url: 'Place/GetPlaceByMId',
      method: 'post',
      data: data
    })
  }