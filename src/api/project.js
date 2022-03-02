import request from '@/utils/post'

export function GetBFOProject(data) {
    return request({
      url: 'Project/Get',
      method: 'post',
      data: data
    })
  }
