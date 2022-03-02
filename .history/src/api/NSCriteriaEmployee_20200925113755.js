import request from "@/utils/request";

export function UpdateCriteriaEmployee(data) {
  return request({
    url: "NSCriteriaEmployee/UpdateCriteriaEmployee",
    method: "post",
    data: data
  });
}
export function GetCriteriaHeader(data) {
  return request({
    url: "NSCriteriaEmployee/GetCriteriaHeader",
    method: "post",
    data: data
  });
}
export function GetCriteriaHeaderByEmId(data) {
  return request({
    url: "NSCriteriaEmployee/GetCriteriaHeaderByEmId",
    method: "post",
    data: data
  });
}
export function GetCriteriaLineByHeader(data) {
  return request({
    url: "NSCriteriaEmployee/GetCriteriaLineByHeader",
    method: "post",
    data: data
  });
}
export function ApproveCriteriaEmployee(data) {
  return request({
    url: "NSCriteriaEmployee/ApproveCriteriaEmployee",
    method: "post",
    data: data
  });
}
