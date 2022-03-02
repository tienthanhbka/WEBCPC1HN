import post from '@/utils/post'

export function login(data) {
  return post({
    url: '/User/Login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return post({
    url: '/User/GetInfoByToken',
    method: 'post',
    data
  })
}

export function logout(data) {
  return post({
    url: '/User/Logout',
    method: 'post',
    data
  })
}
export function GetMyWorkDay(data) {
  return post({
    url: '/User/GetMyWorkDay',
    method: 'post',
    data
  })
}