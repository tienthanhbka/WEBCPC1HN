import request from '@/utils/request'
export function CreateOfferIdea(data) {
  return request({
    url: 'STOfferIdea/CreateOfferIdea',
    method: 'post',
    data: data
  })
}
export function UpdateOfferIdea(data){
    return request({
        url: 'STOfferIdea/UpdateOfferIdea',
        method: 'post',
        data: data
      })
}
export function AddEmpInfoOfferIdea(data) {
    return request({
      url: 'STOfferIdea/AddEmpInfoOfferIdea',
      method: 'post',
      data: data
    })
  }
  export function DelOfferIdea(data){
      return request({
          url: 'STOfferIdea/DelOfferIdea',
          method: 'post',
          data: data
        })
  }
  export function ApproveIdea(data) {
    return request({
      url: 'STOfferIdea/ApproveIdea',
      method: 'post',
      data: data
    })
  }
  export function MoveIdeaByGID(data){
      return request({
          url: 'STOfferIdea/MoveIdeaByGID',
          method: 'post',
          data: data
        })
  }
  export function GetOfferIdeaByGID(data) {
    return request({
      url: 'STOfferIdea/GetOfferIdeaByGID',
      method: 'post',
      data: data
    })
  }
  export function GetOfferIdeaByID(data){
      return request({
          url: 'STOfferIdea/GetOfferIdeaByID',
          method: 'post',
          data: data
        })
  }
  export function GetOfferIdeaByUser(data) {
    return request({
      url: 'STOfferIdea/GetOfferIdeaByUser',
      method: 'post',
      data: data
    })
  }