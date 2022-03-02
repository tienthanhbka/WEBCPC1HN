import request from '@/utils/requestWork'
export function UpdateCompanyInfo(data){
    return request({
        data: data,
        url: "Company/UpdateCompanyInfo",
        method: "post"
    })
}
export function GetEmployeeCompany(data){
    return request({
        data: data,
        url: "Company/GetEmployeeCompany",
        method: "post"
    })
}
export function AddMemberCompany(data){
    return request({
        data: data,
        url: "Company/AddMemberCompany",
        method: "post"
    })
}
export function SetUserType(data){
    return request({
        data: data,
        url: "Company/SetUserType",
        method: "post"
    })
}
export function GetCompanyByUser(data){
    return request({
        data: data,
        url: "Company/GetCompanyByUser",
        method: "post"
    })
}
export function GetCompanyInfoByID(data){
    return request({
        data: data,
        url: "Company/GetCompanyInfoByID",
        method: "post"
    })
}
export function GetCompanyByAdmin(data){
    return request({
        data: data,
        url: "Company/GetCompanyByAdmin",
        method: "post"
    })
}
export function DelMemberCompany(data){
    return request({
        data: data,
        url: "Company/DelMemberCompany",
        method: "post"
    })
}
export function ApproveCompany(data){
    return request({
        data: data,
        url: "Company/ApproveCompany",
        method: "post"
    })
}