import request from '@/utils/post'
//import axios from 'axios'
export function getWork(data) {
  return request({
    url: 'Work/Get',
    method: 'post',
    data:data
  })
}

export function GetWorkGroup(data) {
    return request({
      url: 'Work/GetGroup',
      method: 'post',
      data:data
    })
  }
  