import request from '@/utils/post'

export function CloseVideo(data) {
  return request({
    url: 'MeetingGroup/CloseVideo',
    method: 'post',
    data: data
  })
}

export function OpenVideo(data) {
  return request({
    url: 'MeetingGroup/OpenVideo',
    method: 'post',
    data: data
  })
}

export function createMeetingGroup(data) {
  return request({
    url: 'MeetingGroup/Create',
    method: 'post',
    data: data
  })
}

export function updateMeetingGroup(data) {
  return request({
    url: 'MeetingGroup/Update',
    method: 'post',
    data: data
  })
}

export function GetProductLst(data) {
    return request({
      url: 'MeetingGroup/GetProductLst',
      method: 'post',
      data: data
    })
  }


  export function GetMeetingGroup(data) {
    return request({
      url: 'MeetingGroup/GetGroup',
      method: 'post',
      data: data
    })
  }

  
export function GetAll(data) {
    return request({
      url: 'MeetingGroup/GetAll',
      method: 'post',
      data: data
    })
  }
  export function GetTeacherLst(data) {
    return request({
      url: 'MeetingGroup/GetTeacherLst',
      method: 'post',
      data: data
    })
  }

  export function AddTeacher(data) {
    return request({
      url: 'MeetingGroup/AddTeacher',
      method: 'post',
      data: data
    })
  }

  
  export function UploadVideo(data) {
    return request({
      url: 'MeetingGroup/UploadVideo',
      method: 'post',
      data: data
    })
  }

  
  export function Note(data) {
    return request({
      url: 'MeetingGroup/Note',
      method: 'post',
      data: data
    })
  }

   
  export function AcceptMeetingGroup(data) {
    return request({
      url: 'MeetingGroup/AcceptMeeting',
      method: 'post',
      data: data
    })
  }

   
  export function NoAcceptMeetingGroup(data) {
    return request({
      url: 'MeetingGroup/NoAcceptMeeting',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeNOTMeeting(data) {
    return request({
      url: 'MeetingGroup/GetEmployeeNOTMeeting',
      method: 'post',
      data: data
    })
  }
 
  
 
  
