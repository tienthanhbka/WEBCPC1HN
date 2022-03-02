import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: "http://icpc1hn.work/WEBICPC1HN/",

  withCredentials: false, // send cookies when cross-domain requests
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
    if (store.getters.token) {
      config.data.token = getToken();
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
  response => {
    if (response.data == null) {
      response.data = {};
    }
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // eslint-disable-next-line eqeqeq
    if (res.RespCode != 0) {
      Message({
        message: res.RespText || "error",
        type: "error",
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.RespCode === 1004) {
        // to re-login
        MessageBox.confirm("Bạn đã bị đăng xuất, Đăng nhập lại?", "Thông báo", {
          confirmButtonText: "Đăng nhập",
          cancelButtonText: "Hủy",
          type: "warning"
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(res.message || "error");
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
