import request from '@/utils/requestApp'

export function ApproveResearch(data) {
  return request({
    url: 'RDResearch/ApproveResearch',
    method: 'post',
    data: data
  })
}

export function RemoveResearch(data) {
  return request({
    url: 'RDResearch/RemoveResearch',
    method: 'post',
    data: data
  })
}

export function UpdateResearch(data) {
    return request({
      url: 'RDResearch/UpdateResearch',
      method: 'post',
      data: data
    })
  }

  export function CreateResearch(data) {
    return request({
      url: 'RDResearch/CreateResearch',
      method: 'post',
      data: data
    })
  }

  export function GetResearchByUser(data) {
    return request({
      url: 'RDResearch/GetResearchByUser',
      method: 'post',
      data: data
    })
  }

  export function GetResearchByIdea(data) {
    return request({
      url: 'RDResearch/GetResearchByIdea',
      method: 'post',
      data: data
    })
  }

  export function GetResearchForApprove(data) {
    return request({
      url: 'RDResearch/GetResearchForApprove',
      method: 'post',
      data: data
    })
  }
  export function GetResearchById(data) {
    return request({
      url: 'RDResearch/GetResearchById',
      method: 'post',
      data: data
    })
  }

  


