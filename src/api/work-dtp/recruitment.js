import request from '@/utils/requestWork'
export function DelRecruitment(data) {
  return request({
    url: 'Recruitment/DelRecruitment',
    method: 'post',
    data: data
  })
}
export function UpdateRecruitment(data) {
  return request({
    url: 'Recruitment/UpdateRecruitment',
    method: 'post',
    data: data
  })
}
export function GetRecruitmentByUser(data) {
    return request({
      url: 'Recruitment/GetRecruitmentByUser',
      method: 'post',
      data: data
    })
}
export function GetPublishRecruitment(data) {
    return request({
      url: 'Recruitment/GetPublishRecruitment',
      method: 'post',
      data: data
    })
}
export function CreateRecruitment(data) {
    return request({
      url: 'Recruitment/CreateRecruitment',
      method: 'post',
      data: data
    })
}
export function GetRecruitmentByAdmin(data) {
  return request({
    url: 'Recruitment/GetRecruitmentByAdmin',
    method: 'post',
    data: data
  })
}
export function GetRecruitmentInfo(data) {
  return request({
    url: 'Recruitment/GetRecruitmentInfo',
    method: 'post',
    data: data
  })
}
export function ApproveRecruitment(data) {
  return request({
    url: 'Recruitment/ApproveRecruitment',
    method: 'post',
    data: data
  })
}

export function GetCandidateRecruitment(data) {
  return request({
    url: 'Candidate/GetCandidateRecruitment',
    method: 'post',
    data: data
  })
}