import request from '@/utils/requestT'
export function CreateReminder(data) {
    return request({
      url: 'Reminder/CreateReminder',
      method: 'post',
      data: data
    })
  }
  export function UpdateReminder(data) {
    return request({
      url: 'Reminder/UpdateReminder',
      method: 'post',
      data: data
    })
  }
  export function DelReminder(data) {
    return request({
      url: 'Reminder/DelReminder',
      method: 'post',
      data: data
    })
  }
  export function AcceptReminder(data) {
    return request({
      url: 'Reminder/AcceptReminder',
      method: 'post',
      data: data
    })
  }
  export function GetReminderByEm(data) {
    return request({
      url: 'Reminder/GetReminderByEm',
      method: 'post',
      data: data
    })
  }
  export function GetReminderByGroup(data) {
    return request({
      url: 'Reminder/GetReminderByGroup',
      method: 'post',
      data: data
    })
  }
  export function GetReminderByPlace(data) {
    return request({
      url: 'Reminder/GetReminderByPlace',
      method: 'post',
      data: data
    })
  }