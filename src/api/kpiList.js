import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function GetUnitWorkCode(data) {
  return requestT({
    url: 'KPI/GetUnitWorkCode',
    method: 'post',
    data: data
  })
}
export function UpdateTargetGroupForEm(data) {
  return requestT({
    url: 'KPI/UpdateTargetGroupForEm',
    method: 'post',
    data: data
  })
}
export function UpdateTargetLastMonthForEm(data) {
  return requestT({
    url: 'KPI/UpdateTargetLastMonthForEm',
    method: 'post',
    data: data
  })
}
export function DelTargetAction(data) {
  return requestT({
    url: 'KPI/DelTargetAction',
    method: 'post',
    data: data
  })
}
export function GetKPIList(data) {
    return request({
      url: 'KPIList/Get',
      method: 'post',
      data: data
    })
  }

  export function GetKPIListByGroupEmployee(data) {
    return request({
      url: 'KPIList/GetByIDEmployee',
      method: 'post',
      data: data
    })
  }
  export function CreateKPIList(data) {
    return request({
      url: 'KPIList/Create',
      method: 'post',
      data: data
    })
  }

  export function UpdateKPIList(data) {
    return request({
      url: 'KPIList/Update',
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

  export function PauseKPIList(data) {
    return request({
      url: 'KPIList/Pause',
      method: 'post',
      data: data
    })
  }

  export function GetTarget(data) {
    return request({
      url: 'Target/Get',
      method: 'post',
      data: data
    })
  }

  export function GetTargetGroup(data) {
    return request({
      url: 'Target/GetGroup',
      method: 'post',
      data: data
    })
  }

  export function GetTargetEmployeeGroup(data) {
    return request({
      url: 'Target/GetTargetEmployeeGroup',
      method: 'post',
      data: data
    })
  }

  
  export function GetTargetEmployeeGroupDetail(data) {
    return request({
      url: 'Target/GetTargetEmployeeGroupDetail',
      method: 'post',
      data: data
    })
  }


  export function GetResult(data) {
    return request({
      url: 'KPIList/GetResult',
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

  export function GetResultEmployeeByID(data) {
    return request({
      url: 'KPIList/GetResultEmployeeByID',
      method: 'post',
      data: data
    })
  }

  export function GetResultGroup(data) {
    return request({
      url: 'KPIList/GetResultGroup',
      method: 'post',
      data: data
    })
  }

  export function GetResultEmployeeGroup(data) {
    return request({
      url: 'KPIList/GetResultEmployeeGroup',
      method: 'post',
      data: data
    })
  }

  export function ConfirmTargetAction(data) {
    return request({
      url: 'Target/ConfirmAction',
      method: 'post',
      data: data
    })
  }

  export function EditTargetAction(data) {
    return request({
      url: 'Target/EditTargetAction',
      method: 'post',
      data: data
    })
  }
  export function GetResultEmployeeGroupDetail(data) {
    return request({
      url: 'KPIList/GetResultEmployeeGroupDetail',
      method: 'post',
      data: data
    })
  }
  export function CreateTarget(data) {
    return request({
      url: 'Target/Create',
      method: 'post',
      data: data
    })
  }

  export function CreateTargetAction(data) {
    return request({
      url: 'Target/CreateTargetAction',
      method: 'post',
      data: data
    })
  }

  export function GetTargetAction(data) {
    return request({
      url: 'Target/GetTargetAction',
      method: 'post',
      data: data
    })
  }

  export function EditTarget(data) {
    return request({
      url: 'Target/Edit',
      method: 'post',
      data: data
    })
  }

  export function ConfirmTarget(data) {
    return request({
      url: 'Target/Confirm',
      method: 'post',
      data: data
    })
  }

  export function DeleteTarget(data) {
    return request({
      url: 'Target/Delete',
      method: 'post',
      data: data
    })
  }
  export function DeleteResult(data) {
    return request({
      url: 'KPIList/Delete',
      method: 'post',
      data: data
    })
  }

  export function getGroupKPI(data) {
    return request({
      url: 'KPIList/GetKPIGroup',
      method: 'post',
      data: data
    })
  }

  