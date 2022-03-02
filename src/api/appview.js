import request from '@/utils/appview'
import requestNPP from '@/utils/requestApp'
import requestApp from '@/utils/requestApp'
/*api appview công nợ */
export function getDebt(data) {
  return request({
    url: 'Debt',
    method: 'post',
    data: data
  })
}
export function getSalesLineByDocNo(data) {
    return request({
      url: 'SalesLine/GetSalesLineByDocNo',
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
  /*api appview phương tiện công tác */
  export function GetCarPlan(data) {
    return request({
      url: 'Mission/GetCarPlan',
      method: 'post',
      data: data
    })
  }
  export function GetListGroupAdminByToken(data) {
    return request({
      url: 'Groups/GetListGroupAdminByToken',
      method: 'post',
      data: data
    })
  }
  export function getEmployeesByIdGroup(data) {
    return request({
      url: 'Groups/GetEmployeesByIdGroup',
      method: 'post',
      data: data
    })
  }
  /*api appview nghỉ-làm bù */
  export function GetMissionVacation(data) {
    return request({
      url: 'Mission/GetMissionVacation',
      method: 'post',
      data: data
    })
  }
  
  export function GetGroupMissionVacation(data) {
    return request({
      url: 'Mission/GetGroupMissionVacation',
      method: 'post',
      data: data
    })
  }
  export function GetNumberMissionNP(data) {
    return request({
      url: 'Mission/GetNumberMissionNP',
      method: 'post',
      data: data
    })
  }
  /*api appview quy định */
  export function GetReguDefine(data) {
    return request({
      url: 'Regu/GetReguDefine',
      method: 'post',
      data: data
    })
  }
    /*api appview KPI */

  export function GetResult(data) {
    return request({
      url: 'KPIList/GetResult',
      method: 'post',
      data: data
    })
  }
  
  export function UpdateResultKPIList(data) {
    return request({
      url: 'KPIList/UpdateResultKPIList',
      method: 'post',
      data: data
    })
  }
  export function GetResultEmployee(data) {
    return request({
      url: 'KPIList/GetResultEmployee',
      method: 'post',
      data: data
    })
  }
  export function GetSumKPIReport(data) {
    return request({
      url: 'Report/GetSumKPIReport',
      method: 'post',
      data: data
    })
  }
      /*api appview thông tin cá nhân */

  export function GetEmployeeInforByToken(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeInforByToken',
      method: 'post',
      data: data
    })
  }
      /*api appview khối lượng công việc */


  export function getWork(data) {
    return request({
      url: 'Work/Get',
      method: 'post',
      data:data
    })
  }
  /*api appview tồn kho nhà phân phối */


  export function GetStoreNPPByEm(data) {
    return requestNPP({
      url: 'NPPInventory/GetStoreNPPByEm',
      method: 'post',
      data:data
    })
  }
  export function GetStoreProductByCode(data) {
    return requestNPP({
      url: 'NPPInventory/GetStoreProductByCode',
      method: 'post',
      data:data
    })
  }
  /* API call tuyến khách hàng*/
  export function GetResultMeetCustomerByEm(data) {
    return requestApp({
      url: 'Customer/GetResultMeetCustomerByEm',
      method: 'post',
      data:data
    })
  }
  export function SetMetCustomerByCId(data) {
    return requestApp({
      url: 'Customer/SetMetCustomerByCId',
      method: 'post',
      data: data
    })
  }
  export function GetCustomerByUId(data) {
    return requestApp({
      url: 'Customer/GetCustomerByUId',
      method: 'post',
      data: data
    })
  }
  /* API check chấm công*/

  export function GetTimeKeepingByEm(data) {
    return requestApp({
      url: 'Other/GetTimeKeepingByEm',
      method: 'post',
      data: data
    })
  }
  /* API tra cứu công nợ Cận / Quá hạn */
  export function GetCustomerWarningDebt(data) {
    return requestApp({
      url: 'Other/GetCustomerWarningDebt',
      method: 'post',
      data: data
    })
  }