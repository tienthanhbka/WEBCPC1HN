import request from '@/utils/requestWork'
export function GetCandidateRecruitment(data){
    return request({
        data: data,
        url: "Candidate/GetCandidateRecruitment",
        method: "post"
    })
}