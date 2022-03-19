import requestT from '@/utils/requestT'
export function GetPlaceCover(data) {
    return requestT({
      url: 'Cover/GetPlaceCover',
      method: 'post',
      data:data
    })
  }
  export function GetProductCover(data) {
    return requestT({
      url: 'Cover/GetProductCover',
      method: 'post',
      data:data
    })
  }
  export function GetCallCover(data) {
    return requestT({
      url: 'Cover/GetCallCover',
      method: 'post',
      data:data
    })
  }
  export function GetPlaceCoverUnit(data) {
    return requestT({
      url: 'Cover/GetPlaceCoverUnit',
      method: 'post',
      data:data
    })
  }
  export function GetPlaceByCityCover(data) {
    return requestT({
      url: 'Cover/GetPlaceByCityCover',
      method: 'post',
      data:data
    })
  }