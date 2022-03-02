import requestT from '@/utils/requestT'

export function CreateVaccineInfoByAdmin(data) {
  return requestT({
    url: '/VC/CreateVaccineInfoByAdmin',
    method: 'post',
    data
  })
}
export function GetVaccineInfoLst(data) {
    return requestT({
      url: '/VC/GetVaccineInfoLst',
      method: 'post',
      data
    })
  }
  export function GetUserCheckSK(data) {
    return requestT({
      url: '/VC/GetUserCheckSK',
      method: 'post',
      data
    })
  }
  export function GetUserCheckOK(data) {
    return requestT({
      url: '/VC/GetUserCheckOK',
      method: 'post',
      data
    })
  }
  export function CheckSKUser(data) {
    return requestT({
      url: '/VC/CheckSKUser',
      method: 'post',
      data
    })
  }
  export function CheckOKUser(data) {
    return requestT({
      url: '/VC/CheckOKUser',
      method: 'post',
      data
    })
  }
  export function GetVaccineInfoByID(data) {
    return requestT({
      url: '/VC/GetVaccineInfoByID',
      method: 'post',
      data
    })
  }