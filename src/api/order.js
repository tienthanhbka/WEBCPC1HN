import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function getOrder(data) {
  return request({
    url: 'Order',
    method: 'post',
    data: data
  })
}

export function getEmployee(data) {
  return request({
    url: 'Order/Employee',
    method: 'post',
    data: data
  })
}

export function getAction(data) {
  return request({
    url: 'Order/GetAction',
    method: 'post',
    data: data
  })
}

export function getCodeWork(data) {
  return request({
    url: 'Order/GetCodeWork',
    method: 'post',
    data: data
  })
}

export function getActionByID(data) {
  return request({
    url: 'Order/GetActionByID',
    method: 'post',
    data: data
  })
}

export function getOffice(data) {
  return request({
    url: 'Order/getOffice',
    method: 'post',
    data: data
  })
}

export function getOfficeService(data) {
  return request({
    url: 'Order/getOfficeService',
    method: 'post',
    data: data
  })
}

export function getServiceOffice(data) {
  return request({
    url: 'Order/getServiceOffice',
    method: 'post',
    data: data
  })
}

export function getService(data) {
  return request({
    url: 'Order/getService',
    method: 'post',
    data: data
  })
}

export function GetServiceFilter(data) {
  return request({
    url: 'Order/GetServiceFilter',
    method: 'post',
    data: data
  })
}

export function getServicePublic(data) {
  return request({
    url: 'Order/getServicePublic',
    method: 'post',
    data: data
  })
}

export function getServiceAction(data) {
  return request({
    url: 'Order/getServiceAction',
    method: 'post',
    data: data
  })
}

export function setOrder(data) {
  return request({
    url: 'Order/setEmployee',
    method: 'post',
    data: data
  })
}

export function getOrderSearch(data) {
  return request({
    url: 'Order/OrderSearch',
    method: 'post',
    data: data
  })
}

export function receiveOrder(data) {
  return request({
    url: 'Order/receiveEmployee',
    method: 'post',
    data: data
  })
}

export function getOrderTable(data) {
  return request({
    url: 'Order/getOrderTable',
    method: 'post',
    data: data
  })
}

export function getOrderGroup(data) {
  return request({
    url: 'Order/getOrderGroup',
    method: 'post',
    data: data
  })
}

export function createOrderSend(data) {
  return request({
    url: 'Order/createOrderSend',
    method: 'post',
    data: data
  })
}

export function editOrderSend(data) {
  return request({
    url: 'Order/editOrderSend',
    method: 'post',
    data: data
  })
}

export function editAdminOrder(data) {
  return request({
    url: 'Order/editAdminOrder',
    method: 'post',
    data: data
  })
}

export function deleteAdminOrder(data) {
  return request({
    url: 'Order/deleteAdminOrder',
    method: 'post',
    data: data
  })
}

export function deleteOrderSend(data) {
  return request({
    url: 'Order/deleteOrderSend',
    method: 'post',
    data: data
  })
}

export function getOrderSend(data) {
  return request({
    url: 'Order/getOrderSend',
    method: 'post',
    data: data
  })
}

export function getOrderSendGroup(data) {
  return request({
    url: 'Order/getOrderSendGroup',
    method: 'post',
    data: data
  })
}

export function getSendOrtherGroup(data) {
  return request({
    url: 'Order/getSendOrtherGroup',
    method: 'post',
    data: data
  })
}


export function CloneServiceDefine(data) {
  return requestT({
    url: 'KPI/CloneServiceDefine',
    method: 'post',
    data: data
  })
}
export function createServiceDefine(data) {
  return request({
    url: 'ServiceDefine/Create',
    method: 'post',
    data: data
  })
}

export function editServiceDefine(data) {
  return request({
    url: 'ServiceDefine/Edit',
    method: 'post',
    data: data
  })
}

export function deleteServiceDefine(data) {
  return request({
    url: 'ServiceDefine/Delete',
    method: 'post',
    data: data
  })
}

export function createAction(data) {
  return request({
    url: 'Order/createAction',
    method: 'post',
    data: data
  })
}
export function editAction(data) {
  return request({
    url: 'Order/editAction',
    method: 'post',
    data: data
  })
}

export function deleteAction(data) {
  return request({
    url: 'Order/deleteAction',
    method: 'post',
    data: data
  })
}

export function lockUp(data) {
  return request({
    url: 'Order/lockUpService',
    method: 'post',
    data: data
  })
}

export function lockOff(data) {
  return request({
    url: 'Order/lockOffService',
    method: 'post',
    data: data
  })
}

export function CreateConsignment(data) {
  return requestT({
    url: 'Order/CreateConsignment',
    method: 'post',
    data: data
  })
}

export function UpdateConsignment(data) {
  return requestT({
    url: 'Order/UpdateConsignment',
    method: 'post',
    data: data
  })
}
export function DelConsignment(data) {
  return requestT({
    url: 'Order/DelConsignment',
    method: 'post',
    data: data
  })
}
export function AcceptConsignment(data) {
  return requestT({
    url: 'Order/AcceptConsignment',
    method: 'post',
    data: data
  })
}
export function GetConsignmentByEm(data) {
  return requestT({
    url: 'Order/GetConsignmentByEm',
    method: 'post',
    data: data
  })
}
export function GetConsignmentByAdmin(data) {
  return requestT({
    url: 'Order/GetConsignmentByAdmin',
    method: 'post',
    data: data
  })
}
export function GetSaleOutputHeader(data) {
  return requestT({
    url: 'Order/GetSaleOutputHeader',
    method: 'post',
    data: data
  })
}
export function GetSaleOutputLine(data) {
  return requestT({
    url: 'Order/GetSaleOutputLine',
    method: 'post',
    data: data
  })
}





