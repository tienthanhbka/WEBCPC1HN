import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import baseURL from "./baseURLRD";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  baseURL: baseURL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.data == null) {
      config.data = {};
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

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.RespCode == -1) {
      //   // to re-login
      //   MessageBox.confirm("Bạn đã bị đăng xuất, Đăng nhập lại?", "Thông báo", {
      //     confirmButtonText: "Đăng nhập",
      //     cancelButtonText: "Hủy",
      //     type: "warning"
      //   }).then(() => {
      //     store.dispatch("user/resetToken").then(() => {
      //       location.reload();
      //     });
      //   });
      // }
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
