import request from '@/utils/requestApp'

export function GetMaterial(data) {
    return request({
      url: 'RDMaterial/GetMaterial',
      method: 'post',
      data: data
    })
  }

  export function GetMaterialById(data) {
    return request({
      url: 'RDMaterial/GetMaterialById',
      method: 'post',
      data: data
    })
  }

  export function UpdateSttMaterial(data) {
    return request({
      url: 'RDMaterial/UpdateSttMaterial',
      method: 'post',
      data: data
    })
  }

  export function RemoveMaterial(data) {
    return request({
      url: 'RDMaterial/RemoveMaterial',
      method: 'post',
      data: data
    })
  }

  export function CreateMaterial(data) {
    return request({
      url: 'RDMaterial/CreateMaterial',
      method: 'post',
      data: data
    })
  }