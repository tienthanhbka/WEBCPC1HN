import request from '@/utils/requestT'
export function CreateMissionVacation(data) {
    return request({
      url: 'MissionVacation/CreateMissionVacation',
      method: 'post',
      data:data
    })
}
export function UpdateMissionVacation(data) {
    return request({
      url: 'MissionVacation/UpdateMissionVacation',
      method: 'post',
      data:data
    })
}
export function DelMissionVacation(data) {
    return request({
      url: 'MissionVacation/DelMissionVacation',
      method: 'post',
      data:data
    })
}
export function ApproveMissionVacation(data) {
    return request({
      url: 'MissionVacation/ApproveMissionVacation',
      method: 'post',
      data:data
    })
}
export function GetMissionVacation(data) {
    return request({
      url: 'MissionVacation/GetMissionVacation',
      method: 'post',
      data:data
    })
}
export function GetGroupMissionVacation(data) {
    return request({
      url: 'MissionVacation/GetGroupMissionVacation',
      method: 'post',
      data:data
    })
}
export function GetBranchMissionVacation(data) {
    return request({
      url: 'MissionVacation/GetBranchMissionVacation',
      method: 'post',
      data:data
    })
}

export function GetNumVacation(data) {
  return request({
    url: 'MissionVacation/GetNumVacation',
    method: 'post',
    data:data
  })
}
export function CreateShift(data) {
  return request({
    url: 'MissionVacation/CreateShift',
    method: 'post',
    data:data
  })
}
export function UpdateShift(data) {
  return request({
    url: 'MissionVacation/UpdateShift',
    method: 'post',
    data:data
  })
}
export function DelShift(data) {
  return request({
    url: 'MissionVacation/DelShift',
    method: 'post',
    data:data
  })
}
export function CreateShiftByAdmin(data) {
  return request({
    url: 'MissionVacation/CreateShiftByAdmin',
    method: 'post',
    data:data
  })
}
export function AcceptShift(data) {
  return request({
    url: 'MissionVacation/AcceptShift',
    method: 'post',
    data:data
  })
}
export function GetShift(data) {
  return request({
    url: 'MissionVacation/GetShift',
    method: 'post',
    data:data
  })
}
export function GetShiftByAdmin(data) {
  return request({
    url: 'MissionVacation/GetShiftByAdmin',
    method: 'post',
    data:data
  })
}
export function CreateShiftLine(data) {
  return request({
    url: 'MissionVacation/CreateShiftLine',
    method: 'post',
    data:data
  })
}
export function UpdateShiftLine(data) {
  return request({
    url: 'MissionVacation/UpdateShiftLine',
    method: 'post',
    data:data
  })
}
export function DelShiftLine(data) {
  return request({
    url: 'MissionVacation/DelShiftLine',
    method: 'post',
    data:data
  })
}
export function GetShiftLine(data) {
  return request({
    url: 'MissionVacation/GetShiftLine',
    method: 'post',
    data:data
  })
}