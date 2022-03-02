import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import baseURL from './baseUrl'

// create an axios instance
const service = axios.create({

  // baseURL: 'http://1.53.252.137:81/apiCall/api.php/', // url = base url + request url
  // withCredentials: false, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // }
  baseURL: 'https://icpc1hn.work/node/',


  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

})

// request interceptor
service.interceptors.request.use(
  config => {
    if(config.data==null){
      config.data={}
    }
    if (store.getters.token) {
      config.data.token = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    if (response.data == null) {
      response.data = {}
    }
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // eslint-disable-next-line eqeqeq
    
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service
