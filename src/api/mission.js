import request from '@/utils/post'
import requestAPP from '@/utils/requestApp'
import requestT from '@/utils/requestT'
export function getMyMission(data) {
  return request({
    url: 'Mission/GetMyMission',
    method: 'post',
    data: data
  })
}
export function GetEmailLst(data) {
  return request({
    url: 'Mission/GetEmailLst',
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
export function UploadMissionVacation(data) {
  return request({
    url: 'Mission/UploadMissionVacation',
    method: 'post',
    data: data
  })
}
export function AddCarMission(data) {
  return request({
    url: 'Mission/AddCarMission',
    method: 'post',
    data: data
  })
}

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

export function GetBranchMissionVacation(data) {
  return request({
    url: 'Mission/GetBranchMissionVacation',
    method: 'post',
    data: data
  })
}

export function GetTypeMissionVacation(data) {
  return request({
    url: 'Mission/GetTypeMissionVacation',
    method: 'post',
    data: data
  })
}

export function CreateCarPlan(data) {
  return request({
    url: 'Mission/CreateCarPlan',
    method: 'post',
    data: data
  })
}


export function CreateMissionVacation(data) {
  return request({
    url: 'Mission/CreateMissionVacation',
    method: 'post',
    data: data
  })
}

export function EditMissionVacation(data) {
  return request({
    url: 'Mission/UpdateMissionVacation',
    method: 'post',
    data: data
  })
}

export function ConfirmMissionVacation(data) {
  return request({
    url: 'Mission/ConfirmMissionVacation',
    method: 'post',
    data: data
  })
}

export function DeleteMissionVacation(data) {
  return request({
    url: 'Mission/DeleteMissionVacation',
    method: 'post',
    data: data
  })
}

export function GetCarPlan(data) {
  return request({
    url: 'Mission/GetCarPlan',
    method: 'post',
    data: data
  })
}

export function GetCar(data) {
  return request({
    url: 'Mission/GetCar',
    method: 'post',
    data: data
  })
}

export function GetCity(data) {
  return request({
    url: 'Mission/GetCity',
    method: 'post',
    data: data
  })
}

export function GetMissionWorkGroup(data) {
  return request({
    url: 'Mission/GetMissionWorkGroup',
    method: 'post',
    data: data
  })
}

export function GetMissionWork(data) {
  return request({
    url: 'Mission/GetMissionWork',
    method: 'post',
    data: data
  })
}

export function GetPlaceByIDMission(data) {
  return request({
    url: 'Mission/GetPlaceByIDMission',
    method: 'post',
    data: data
  })
}

export function GetCallByIDMissionIDPlace(data) {
  return request({
    url: 'Mission/GetCallByIDMissionIDPlace',
    method: 'post',
    data: data
  })
}

export function GetSuggestTypeMission(data) {
  return request({
    url: 'Mission/GetSuggestTypeMission',
    method: 'post',
    data: data
  })
}
export function GetSuggestNameMission(data) {
  return request({
    url: 'Mission/GetSuggestNameMission',
    method: 'post',
    data: data
  })
}

export function GetMissionByIdGroup(data) {
  return request({
    url: 'Mission/GetMissionByIdGroup',
    method: 'post',
    data: data
  })
}

export function AddLstMission(data) {
  return request({
    url: 'Mission/AddLstMission',
    method: 'post',
    data: data
  })
}
export function GetMeetingOfMe(data) {
  return request({
    url: 'Mission/GetMeetingOfMe',
    method: 'post',
    data: data
  })
}
export function MeetingFullReport(data) {
  return request({
    url: 'Mission/MeetingFullReport',
    method: 'post',
    data: data
  })
}

export function DeleteCarPlan(data) {
  return request({
    url: 'Mission/DeleteCarPlan',
    method: 'post',
    data: data
  })
}

export function GetGroupMeetingOfMe(data) {
  return request({
    url: 'Mission/GetGroupMeetingOfMe',
    method: 'post',
    data: data
  })
}
export function AddMeeting(data) {
  return request({
    url: 'Mission/AddMeeting',
    method: 'post',
    data: data
  })
}

export function GetMeetingLineOfHeader(data) {
  return request({
    url: 'Mission/GetMeetingLineOfHeader',
    method: 'post',
    data: data
  })
}
export function EditMeeting(data) {
  return request({
    url: 'Mission/EditMeeting',
    method: 'post',
    data: data
  })
}
export function DeleteMeetingHeader(data) {
  return request({
    url: 'Mission/DeleteMeetingHeader',
    method: 'post',
    data: data
  })
}
export function GetMeetingPointingDetail(data) {
  return request({
    url: 'Mission/GetMeetingPointingDetail',
    method: 'post',
    data: data
  })
}

/*API ẩn KH tổ chức trong nhiệm vụ*/
export function HidePlaceMission(data) {
  return requestAPP({
    url: 'Mission/HidePlaceMission',
    method: 'post',
    data: data
  })
}

export function AddPlaceMission(data) {
  return requestAPP({
    url: 'Mission/AddPlaceMission',
    method: 'post',
    data: data
  })
}
export function CreateDocOverTime(data) {
  return requestAPP({
    url: 'OverTime/CreateDocOverTime',
    method: 'post',
    data: data
  })
}
export function UpdateDocOverTime(data) {
  return requestAPP({
    url: 'OverTime/UpdateDocOverTime',
    method: 'post',
    data: data
  })
}
export function GetDocOverTimeByID(data) {
  return requestAPP({
    url: 'OverTime/GetDocOverTimeByID',
    method: 'post',
    data: data
  })
}
export function GetDocOverTimeByGroupID(data) {
  return requestAPP({
    url: 'OverTime/GetDocOverTimeByGroupID',
    method: 'post',
    data: data
  })
}
export function GetDocOverTimeByEm(data) {
  return requestAPP({
    url: 'OverTime/GetDocOverTimeByEm',
    method: 'post',
    data: data
  })
}
export function DelDocOverTime(data) {
  return requestAPP({
    url: 'OverTime/DelDocOverTime',
    method: 'post',
    data: data
  })
}
export function AppproveDocOverTime(data) {
  return requestAPP({
    url: 'OverTime/AppproveDocOverTime',
    method: 'post',
    data: data
  })
}
export function UpdateMissionByMId(data) {
  return requestAPP({
    url: 'Mission/UpdateMissionByMId',
    method: 'post',
    data: data
  })
}
export function DelMissionByMId(data) {
  return requestAPP({
    url: 'Mission/DelMissionByMId',
    method: 'post',
    data: data
  })
}
export function ApproveMission(data) {
  return requestT({
    url: 'Mission/ApproveMission',
    method: 'post',
    data: data
  })
}