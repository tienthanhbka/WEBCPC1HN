import request from '@/utils/reportproduct'
export function createReportDefine(data){
    return request({
        url: 'SXReport/CreateReportDefine',
        method: 'post',
        data: data
    })
}
export function UpdateReportDefineHeader(data){
    return request({
        url: 'SXReport/UpdateReportDefineHeader',
        method: 'post',
        data: data
    })
}
export function DelReportDefineHeader(data){
    return request({
        url: 'SXReport/DelReportDefineHeader',
        method: 'post',
        data: data
    })
}
export function UpdateReportLineDefine(data){
    return request({
        url: 'SXReport/UpdateReportLineDefine',
        method: 'post',
        data: data
    })
}
export function DelReportLineDefine(data){
    return request({
        url: 'SXReport/DelReportLineDefine',
        method: 'post',
        data: data
    })
}
export function GetReportDefine(data){
    return request({
        url: 'SXReport/GetReportDefine',
        method: 'post',
        data: data
    })
}
export function GetReportDefineById(data){
    return request({
        url: 'SXReport/GetReportDefineById',
        method: 'post',
        data: data
    })
}
export function WorkReport(data){
    return request({
        url:'SXReport/WorkReport',
        method: 'post',
        data: data
    })
}
export function GetReportByDate(data){
    return request({
        url: 'SXReport/GetReportByDate',
        method: 'post',
        data: data
    })
}
export function GetReportById(data){
    return request({
        url:'SXReport/GetReportById',
        method:'post',
        data: data
    })
}

export function GetReportByReportDefineIdAndDate(data){
    return request({
        url:'SXReport/GetReportByReportDefineIdAndDate',
        method:'post',
        data: data
    })
}
export function AcceptReport(data){
    return request({
        url:'SXReport/AcceptReport',
        method:'post',
        data: data
    })
}
