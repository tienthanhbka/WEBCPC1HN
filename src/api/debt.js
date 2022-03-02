import request from '@/utils/post'
import requestApp from '@/utils/requestApp'
import requestT from '@/utils/requestT'
export function getDebt(data) {
  return request({
    url: 'Debt',
    method: 'post',
    data: data
  })
}

export function GetSalesReturn(data) {
  return request({
    url: 'Debt/GetSalesReturn',
    method: 'post',
    data: data
  })
}

export function GetSalesReturnLineByDocNo(data) {
  return request({
    url: 'Debt/GetSalesReturnLineByDocNo',
    method: 'post',
    data: data
  })
}
export function GetMoneyReciptHeader(data) {
  return request({
    url: 'Debt/GetMoneyReciptHeader',
    method: 'post',
    data: data
  })
}

export function GetSaleHeaderOfMoneyRecipt(data) {
  return request({
    url: 'Debt/GetSaleHeaderOfMoneyRecipt',
    method: 'post',
    data: data
  })
}
export function GetSaleLineOfSaleHeaderMoneyRecipt(data) {
  return request({
    url: 'Debt/GetSaleLineOfSaleHeaderMoneyRecipt',
    method: 'post',
    data: data
  })
}

export function CreateMoneyReciptCoupon(data) {
  return request({
    url: 'Debt/CreateMoneyReciptCoupon',
    method: 'post',
    data: data
  })
}
export function AddSaleHeaderLstToMoneyRecipt(data) {
  return request({
    url: 'Debt/AddSaleHeaderLstToMoneyRecipt',
    method: 'post',
    data: data
  })
}
export function AddOrUpdateMoneyReciptLine(data) {
  return request({
    url: 'Debt/AddOrUpdateMoneyReciptLine',
    method: 'post',
    data: data
  })
}

export function DeleteMoneyReciptHeader(data) {
  return request({
    url: 'Debt/DeleteMoneyReciptHeader',
    method: 'post',
    data: data
  })
}

export function ExportCoupon(data) {
  return request({
    url: 'Debt/ExportCoupon',
    method: 'post',
    data: data
  })
}

export function DeleteSaleHeader(data) {
  return request({
    url: 'Debt/DeleteSaleHeader',
    method: 'post',
    data: data
  })
}
export function ApproveMoneyReciptHeader(data) {
  return request({
    url: 'Debt/ApproveMoneyReciptHeader',
    method: 'post',
    data: data
  })
}
export function EditMoneyReciptCoupon(data) {
  return request({
    url: 'Debt/EditMoneyReciptCoupon',
    method: 'post',
    data: data
  })
}
export function GetCommissionOrderHeader(data) {
  return requestT({
    url: 'CommissionOrder/GetCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function GetCommissionOrderHeaderByIdGroup(data) {
  return requestT({
    url: 'CommissionOrder/GetCommissionOrderHeaderByIdGroup',
    method: 'post',
    data: data
  })
}

export function AddCommissionOrderHeader(data) {
  return request({
    url: 'Debt/AddCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function GetItemOfCommissionOrderHeader(data) {
  return request({
    url: 'Debt/GetItemOfCommissionOrderHeader',
    method: 'post',
    data: data
  })
}

export function GetTypeCustomerFromIdCustomer(data) {
  return request({
    url: 'Debt/GetTypeCustomerFromIdCustomer',
    method: 'post',
    data: data
  })
}

export function UpsertCommissionOrderLine(data) {
  return request({
    url: 'Debt/UpsertCommissionOrderLine',
    method: 'post',
    data: data
  })
}

export function GetCommissonLinesOfHeaderAndItem(data) {
  return request({
    url: 'Debt/GetCommissonLinesOfHeaderAndItem',
    method: 'post',
    data: data
  })
}
export function UpdateCommissionOrderLineLstStatus(data) {
  return request({
    url: 'Debt/UpdateCommissionOrderLineLstStatus',
    method: 'post',
    data: data
  })
}

export function EditCommissionOrderHeader(data) {
  return request({
    url: 'Debt/EditCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function ChangeStatusCommissionOrderHeader(data) {
  return request({
    url: 'Debt/ChangeStatusCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function GetListGroupAdminWithCMHInfo(data) {
  return request({
    url: 'Debt/GetListGroupAdminWithCMHInfo',
    method: 'post',
    data: data
  })
}
export function GetProjectsOfCommissionOrderHeader(data) {
  return request({
    url: 'Debt/GetProjectsOfCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function AddProjectToCommissionOrderHeader(data) {
  return request({
    url: 'Debt/AddProjectToCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function GetItemOfComHeaderProject(data) {
  return request({
    url: 'Debt/GetItemOfComHeaderProject',
    method: 'post',
    data: data
  })
}

export function UpsertCommissionOrderTHLine(data) {
  return request({
    url: 'Debt/UpsertCommissionOrderTHLine',
    method: 'post',
    data: data
  })
}
export function UpsertCommissionOrderKDLine(data) {
  return request({
    url: 'Debt/UpsertCommissionOrderKDLine',
    method: 'post',
    data: data
  })
}
export function AddItemLstToCommissionOrderLine(data) {
  return request({
    url: 'Debt/AddItemLstToCommissionOrderLine',
    method: 'post',
    data: data
  })
}
export function GetPhanBoCouponReport(data) {
  return request({
    url: 'Debt/GetPhanBoCouponReport',
    method: 'post',
    data: data
  })
}
export function UpdateLstCommissionOrderTHLine(data) {
  return request({
    url: 'Debt/UpdateLstCommissionOrderTHLine',
    method: 'post',
    data: data
  })
}
export function UpdateCommissionOrderHeader(data) {
  return request({
    url: 'Debt/UpdateCommissionOrderHeader',
    method: 'post',
    data: data
  })
}
export function DeleteProjectFromCommissionOrderHeader(data) {
  return request({
    url: 'Debt/DeleteProjectFromCommissionOrderHeader',
    method: 'post',
    data: data
  })
}

export function DeleteItemFromProject(data) {
  return request({
    url: 'Debt/DeleteItemFromProject',
    method: 'post',
    data: data
  })
}
export function UpdateCommissionOrderLine(data) {
  return request({
    url: 'Debt/UpdateCommissionOrderLine',
    method: 'post',
    data: data
  })
}
export function UpdateLstCommissionOrderLine(data) {
  return request({
    url: 'Debt/UpdateLstCommissionOrderLine',
    method: 'post',
    data: data
  })
}
export function DeleteItemInCommissionOrderLine(data) {
  return request({
    url: 'Debt/DeleteItemInCommissionOrderLine',
    method: 'post',
    data: data
  })
}

export function GetCommissionOrderTD(data) {
  return request({
    url: 'Debt/GetCommissionOrderTD',
    method: 'post',
    data: data
  })
}
export function AddCommissionOrderTD(data) {
  return request({
    url: 'Debt/AddCommissionOrderTD',
    method: 'post',
    data: data
  })
}
export function EditCommissionOrderTD(data) {
  return request({
    url: 'Debt/EditCommissionOrderTD',
    method: 'post',
    data: data
  })
}
export function GetCommissionOrderTDByIDGroup(data) {
  return request({
    url: 'Debt/GetCommissionOrderTDByIDGroup',
    method: 'post',
    data: data
  })
}

export function ChangeLstStatusTDCommissionLine(data) {
  return request({
    url: 'Debt/ChangeLstStatusTDCommissionLine',
    method: 'post',
    data: data
  })
}
export function ChangeStatusCommissionOrderTDHeader(data) {
  return request({
    url: 'Debt/ChangeStatusCommissionOrderTDHeader',
    method: 'post',
    data: data
  })
}

export function GetFeeRequestTable(data) {
  return request({
    url: 'Debt/GetFeeRequestTable',
    method: 'post',
    data: data
  })
}

export function CreateFeeRequest(data) {
  return request({
    url: 'Debt/CreateFeeRequest',
    method: 'post',
    data: data
  })
}


export function GetFeeRequestHeader(data) {
  return request({
    url: 'Debt/GetFeeRequestHeader',
    method: 'post',
    data: data
  })
}
export function DelFeeRequestHeader(data) {
  return request({
    url: 'Debt/DelFeeRequestHeader',
    method: 'post',
    data: data
  })
}
export function EditFeeRequest(data) {
  return request({
    url: 'Debt/EditFeeRequest',
    method: 'post',
    data: data
  })
}
export function GetKDPLOfCus(data) {
  return request({
    url: 'Debt/GetKDPLOfCus',
    method: 'post',
    data: data
  })
}
export function FindSalesHeaderF(data) {
  return requestApp({
    url: 'Call/FindSalesHeader',
    method: 'post',
    data: data
  })
}

export function GetSaleHeaderOfMoneyReciptF(data) {
  return requestApp({
    url: 'Call/GetSaleHeaderOfMoneyRecipt',
    method: 'post',
    data: data
  })
}

export function GetSaleLineOfSaleHeaderMoneyReciptF(data) {
  return requestApp({
    url: 'Call/GetSaleLineOfSaleHeaderMoneyRecipt',
    method: 'post',
    data: data
  })
}
export function AddNewMoneyReciptHeaderSaleHeader(data) {
  return requestApp({
    url: 'Call/AddNewMoneyReciptHeaderSaleHeader',
    method: 'post',
    data: data
  })
}
export function CreateDebtExtension(data) {
  return requestT({
    url: 'Debt/CreateDebtExtension',
    method: 'post',
    data: data
  })
}
export function UpdateDebtExtension(data) {
  return requestT({
    url: 'Debt/UpdateDebtExtension',
    method: 'post',
    data: data
  })
}

export function DelDebtExtension(data) {
  return requestT({
    url: 'Debt/DelDebtExtension',
    method: 'post',
    data: data
  })
}

export function GetDebtExtensionByEm(data) {
  return requestT({
    url: 'Debt/GetDebtExtensionByEm',
    method: 'post',
    data: data
  })
}

export function GetDebtExtensionByAdmin(data) {
  return requestT({
    url: 'Debt/GetDebtExtensionByAdmin',
    method: 'post',
    data: data
  })
}

export function AcceptDebtExtension(data) {
  return requestT({
    url: 'Debt/AcceptDebtExtension',
    method: 'post',
    data: data
  })
}
export function ApproveDebtExtension(data) {
  return requestT({
    url: 'Debt/ApproveDebtExtension',
    method: 'post',
    data: data
  })
}



