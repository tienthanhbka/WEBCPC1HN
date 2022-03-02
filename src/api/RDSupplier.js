import request from '@/utils/requestApp'

export function CreateSupplier(data) {
  return request({
    url: 'RDSupplier/CreateSupplier',
    method: 'post',
    data: data
  })
}
export function UpdateSupplier(data) {
    return request({
      url: 'RDSupplier/UpdateSupplier',
      method: 'post',
      data: data
    })
  }
  export function GetSupplierById(data) {
    return request({
      url: 'RDSupplier/GetSupplierById',
      method: 'post',
      data: data
    })
  }
  export function GetSupplierLst(data) {
    return request({
      url: 'RDSupplier/GetSupplierLst',
      method: 'post',
      data: data
    })
  }