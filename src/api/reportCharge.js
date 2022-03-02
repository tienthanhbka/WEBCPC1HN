import requestT from '@/utils/requestT'
export function GetReportCharge(data) {
    return requestT({
      url: 'ReportCharge/GetReportCharge',
      method: 'post',
      data: data
    })
}
export function GetReportChargeLine(data) {
    return requestT({
      url: 'ReportCharge/GetReportChargeLine',
      method: 'post',
      data: data
    })
}
export function CreateReportCharge(data) {
    return requestT({
      url: 'ReportCharge/CreateReportCharge',
      method: 'post',
      data: data
    })
}
export function UpdateReportCharge(data) {
    return requestT({
      url: 'ReportCharge/UpdateReportCharge',
      method: 'post',
      data: data
    })
}
export function DelReportCharge(data) {
    return requestT({
      url: 'ReportCharge/DelReportCharge',
      method: 'post',
      data: data
    })
}