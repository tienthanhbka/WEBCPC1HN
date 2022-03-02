import request from '@/utils/post'

export function GetReportLst(data) {
    return request({
      url: 'Help/GetReportLst',
      method: 'post',
      data: data
    })
  }

  