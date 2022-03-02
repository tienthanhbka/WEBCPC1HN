import request from "@/utils/requestWork"
export function GetDefaultValue(data){
    return request({
        url: "DefaultValue/GetDefaultValue",
        data: data,
        method:"post"
    })
}