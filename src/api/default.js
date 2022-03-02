import request from '@/utils/post'
import requestApp from '@/utils/requestApp'
import requestSX from '@/utils/requestSX'
export function GetCity(data) {
    return request({
      url: 'Default/GetCity',
      method: 'post',
      data: data
    })
  }

  export function GetDistrictByCity(data) {
    return request({
      url: 'Default/GetDistrictByCity',
      method: 'post',
      data: data
    })
  }

  export function GetCommuneByCityAndDistrict(data) {
    return request({
      url: 'Default/GetCommuneByCityAndDistrict',
      method: 'post',
      data: data
    })
  }

  export function GetDH(data) {
    return request({
      url: 'Default/GetDH',
      method: 'post',
      data: data
    })
  }

  export function GetSpecialized(data) {
    return request({
      url: 'Default/GetSpecialized',
      method: 'post',
      data: data
    })
  }

  export function GetDegree(data) {
    return request({
      url: 'Default/GetDegree',
      method: 'post',
      data: data
    })
  }

  export function GetSpecializedFather(data) {
    return request({
      url: 'Default/GetSpecializedFather',
      method: 'post',
      data: data
    })
  }
  
  export function GetDefaultValue(data) {
    return requestSX({
      url: 'Other/GetDefaultValue',
      method: 'post',
      data: data
    })
  }
  

  export function GetSaleType(data) {
    return requestApp({
      url: 'Other/GetSaleType',
      method: 'post',
      data: data
    })
  }