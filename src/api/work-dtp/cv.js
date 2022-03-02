import request from "@/utils/requestWork"
export function CreateSuggestionCV(data){
    return request({
        url: "CV/CreateSuggestionCV",
        data: data,
        method:"post"
    })
}
export function UpdateSuggestionCV(data){
    return request({
        url: "CV/UpdateSuggestionCV",
        data: data,
        method:"post"
    })
}
export function DelSuggestionCV(data){
    return request({
        url: "CV/DelSuggestionCV",
        data: data,
        method:"post"
    })
}
export function GetSuggestionCV(data){
    return request({
        url: "CV/GetSuggestionCV",
        data: data,
        method:"post"
    })
}
export function CreateSampleCV(data){
    return request({
        url: "CV/CreateSampleCV",
        data: data,
        method:"post"
    })
}
export function UpdateSampleCV(data){
    return request({
        url: "CV/UpdateSampleCV",
        data: data,
        method:"post"
    })
}
export function DelSampleCV(data){
    return request({
        url: "CV/DelSampleCV",
        data: data,
        method:"post"
    })
}
export function GetPublishSampleCV(data){
    return request({
        url: "CV/GetPublishSampleCV",
        data: data,
        method:"post"
    })
}
export function GetSampleCVByUser(data){
    return request({
        url: "CV/GetSampleCVByUser",
        data: data,
        method:"post"
    })
}
export function GetSuggestionLst(data){
    return request({
        url: "CV/GetSuggestionLst",
        data: data,
        method:"post"
    })
}