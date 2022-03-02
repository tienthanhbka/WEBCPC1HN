import request from '@/utils/post'

export function createSurvey(data) {
  return request({
    url: 'Survey/Create',
    method: 'post',
    data: data
  })
}

export function GetSurveyByID(data) {
  return request({
    url: 'Survey/GetForm',
    method: 'post',
    data: data
  })
}

export function GetResponseSurveyByID(data) {
  return request({
    url: 'Survey/GetResponse',
    method: 'post',
    data: data
  })
}

export function GetResult(data) {
  return request({
    url: 'Survey/GetResult',
    method: 'post',
    data: data
  })
}

export function GetSurvey(data) {
  return request({
    url: 'Survey/GetAll',
    method: 'post',
    data: data
  })
}

export function SubmitSurvey(data) {
  return request({
    url: 'Survey/Submit',
    method: 'post',
    data: data
  })
}





