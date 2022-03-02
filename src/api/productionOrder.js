import request from '@/utils/reportproduct'
export function CreateProductionOrder(data){
    return request({
        url: 'SXProductionOrder/CreateProductionOrder',
        method: 'post',
        data: data
    })
}
export function UpdateProductionOrder(data){
    return request({
        url:'SXProductionOrder/UpdateProductionOrder',
        method: 'post',
        data: data
    })
}
export function DelProductionOrder(data){
    return request({
        url: 'SXProductionOrder/DelProductionOrder',
        method: 'post',
        data: data
    })
}
export function QuotaProductionReport(data){
    return request({
        url:'SXProductionOrder/QuotaProductionReport',
        method: 'post',
        data: data
    })
}
export function GetProductionOrder(data){
    return request({
        url: 'SXProductionOrder/GetProductionOrder',
        method: 'post',
        data: data
    })
}
export function GetQuotaProductionReport(data){
    return request({
        url:'SXProductionOrder/GetQuotaProductionReport',
        method:'post',
        data:data
    })
}
export function GetProductionOrderBFO(data){
    return request({
        url:'SXProductionOrder/GetProductionOrderBFO',
        method:'post',
        data:data
    })
}
export function AddProductionOrderReport(data){
    return request({
        url:'SXProductionOrder/AddProductionOrderReport',
        method:'post',
        data:data
    })
}
export function GetProductionOrderReportLst(data){
    return request({
        url:'SXProductionOrder/GetProductionOrderReportLst',
        method:'post',
        data:data
    })
}

export function UpdateQuotaProductionReport(data){
    return request({
        url:'SXProductionOrder/UpdateQuotaProductionReport',
        method:'post',
        data:data
    })
}

export function GetReportByProductionOrderIdAndReportDefineId(data){
    return request({
        url:'SXReport/GetReportByProductionOrderIdAndReportDefineId',
        method:'post',
        data:data
    })
}
export function GetProductionOrderById(data){
    return request({
        url:'SXProductionOrder/GetProductionOrderById',
        method:'post',
        data:data
    })
}

