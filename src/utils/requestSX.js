import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken,getIdUser } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  baseURL: 'https://icpc1hn.work/WebSX_API/',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if(config.data==null){
      config.data={}
    }
    if(!config.url.includes("UserLogin")){
      if (store.getters.token) {
        config.data.Token = getToken();
        config.data.UserName=getIdUser();
        
      }
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.data == null) {
      response.data = {};
    }
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.RespCode != 0) {
      Message({
        message: res.RespText || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || "Error"));
    }
    if (res.RespCode == 503) {
      Message({
        message: res.RespText || "Error",
        type: "warning",
        duration: 5 * 1000
      });
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;