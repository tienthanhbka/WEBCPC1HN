import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function CreateType(data) {
    return requestT({
      url: 'HandOver/CreateType',
      method: 'post',
      data:data
    })
  }

  export function GetType(data) {
    return requestT({
      url: 'HandOver/GetType',
      method: 'post',
      data:data
    })
  }

  export function AcceptHandOver(data) {
    return requestT({
      url: 'HandOver/AcceptHandOver',
      method: 'post',
      data:data
    })
  }
  export function GetApproveHandOver(data) {
    return requestT({
      url: 'HandOver/GetApproveHandOver',
      method: 'post',
      data:data
    })
  }
  export function ApproveHandOver(data) {
    return requestT({
      url: 'HandOver/ApproveHandOver',
      method: 'post',
      data:data
    })
  }
  export function GetHandOver(data) {
    return requestT({
      url: 'HandOver/GetHandOver',
      method: 'post',
      data:data
    })
  }

  export function GetDetailHandOver(data) {
    return requestT({
      url: 'HandOver/GetDetailHandOver',
      method: 'post',
      data:data
    })
  }

  export function GetHandOverLineType(data) {
    return request({
      url: 'HandOver/GetHandOverLineType',
      method: 'post',
      data:data
    })
  }
  export function GetHandOverLineLst(data) {
    return requestT({
      url: 'HandOver/GetHandOverLineType',
      method: 'post',
      data:data
    })
  }
  export function GetHandOverNS(data) {
    return requestT({
      url: 'HandOver/GetHandOverNS',
      method: 'post',
      data:data
    })
  }

  export function CreateHandOver(data) {
    return requestT({
      url: 'HandOver/CreateHandOver',
      method: 'post',
      data:data
    })
  }

  export function DelType(data) {
    return requestT({
      url: 'HandOver/DelType',
      method: 'post',
      data:data
    })
  }
  export function DelHandOver(data) {
    return requestT({
      url: 'HandOver/DelHandOver',
      method: 'post',
      data:data
    })
  }
  export function UpdateHandOver(data) {
    return requestT({
      url: 'HandOver/UpdateHandOver',
      method: 'post',
      data:data
    })
  }
  export function DelApproveHandOver(data) {
    return requestT({
      url: 'HandOver/DelApproveHandOver',
      method: 'post',
      data:data
    })
  }