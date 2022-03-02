<template>
  <div>
    <audio id="alertSound" ref="alertSound">
      <source src="definite.ogg" type="audio/ogg" />
      <source src="definite.mp3" type="audio/mpeg" />
    </audio>
    <el-dropdown :hide-on-click="false" trigger="click">
      <el-badge :value="notifies.length" :max="99" class="item">
        <span class="noti-btn">
          <i class="fas fa-bell"></i>
        </span>
      </el-badge>
      <el-dropdown-menu v-loading="isLoading" slot="dropdown" class="dropdown-notifi">
        <div class="noti-top-command">
          <span @click="fetchData()" class="btn-left">Cập nhật</span>
          <span class="btn-right">Đã đọc toàn bộ</span>
          <span class="btn-right">
            <router-link to="/thong-bao">Toàn bộ thông báo</router-link>
          </span>
        </div>

        <el-dropdown-item v-for="(item, index) in notifies" :key="index" class="dropdown-item">
          <div class="message">
            <div class="pt-3 mr-3 float-left">
              <div class="avatar">
                <img :src="(item.Img==null?'/imgs/cpc1hn-100.png':item.Img)" class="img-avatar" />
                <span class="avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <span class="text-muted font-weight-bold">{{item.Title}}</span>
              <small
                class="text-muted float-right mt-1"
              >{{(item.Time?(new Date.parse(item.Time).toString('dd/MM HH:mm')):'Vừa xong')}}</small>
            </div>

            <div class="small text-muted text-truncate">{{item.Content}}</div>
          </div>
        </el-dropdown-item>

        <el-dropdown-item>
          <div @click="fetchData(1)" style="text-align:center">
            <b>Xem thêm</b>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { setNToken } from "@/utils/auth";
import "firebase/messaging";
import { SendNToken, GetNotification } from "@/api/notification";
import { from } from "zen-observable";
var firebaseConfig = {
  apiKey: "AIzaSyAYJsyBG-IUpoToLW2bW4cVhCPQz8vHNWw",
  authDomain: "icpc1hn-8ed88.firebaseapp.com",
  databaseURL: "https://icpc1hn-8ed88.firebaseio.com",
  projectId: "icpc1hn-8ed88",
  storageBucket: "icpc1hn-8ed88.appspot.com",
  messagingSenderId: "224723205949",
  appId: "1:224723205949:web:f511eb55f2ace1fe"
};

// Initialize Firebase

export default {
  data() {
    return {
      notifies: [],
      audio: null,
      currentPage: 1,
      pageSize: 10,
      isLoading: false
    };
  },
  methods: {
    playSound() {
      //var x = document.getElementById('alertSound')

      //x.pause();
      this.audio.play();
    },
    fetchData(num) {
      if (num) {
        this.pageSize += 10;
      } else {
      }
      this.isLoading = true;
      GetNotification({
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      })
        .then(res => {
          this.isLoading = false;
          this.notifies = res.Data;
        })
        .catch(e => {
          this.isLoading = false;
        });
    }
  },

  mounted() {
    this.fetchData();
    if ("Notification" in window && Notification.permission !== "granted") {
      alert(
        "Hãy CHO PHÉP trang web gửi Thông Báo để IT phát triển tính năng này.\n IT xin cảm ơn"
      );
    }

    this.audio = new Audio("/definite.mp3");
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    // messaging.usePublicVapidKey('BIHOgNy0pYFpU9ePc0kS0BsUZmg_feJN5jPiZH3TuMRpzzJb-S9pM2iBCMNJYkCkALqrvmbuWHN9U33vlDX2Z3U')
    messaging
      .requestPermission()
      .then(function() {
        return messaging.getToken();
      })
      .then(function(token) {
        setNToken(token);
        SendNToken({
          ntoken: token
        }).then(res => {});
      })
      .catch(function(err) {
      });

    var self = this;
    messaging.onMessage(function(payload) {
      self.notifies.push({
        Title:payload.data.title,
        Content:payload.data.body,
        Img:null,
        NStatus:1
      });
      self.playSound();
      self.$notify({
        title: payload.data.title,
        message: payload.data.body,
        duration: 3000
      });
    });
    const channel = new BroadcastChannel("firebase-messaging-sw.js");
    channel.addEventListener("message", event => {
      self.notifies.unshift({
        Title:event.data.data.title,
        Content:event.data.data.body,
        Img:null,
        NStatus:1,
        Time:null
      });
   
   
    });
  }
};
</script>
<style>
.el-badge__content.is-fixed {
  position: absolute;
  top: 7px;
  right: 10px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
.img-avatar {
  height: 44px;
}
.noti-btn {
  font-size: 20px;
  cursor: pointer;
  color: #2c3e50;
}
</style>
<style scoped>
.dropdown-item:nth-child(2) {
  border-top: 1px solid #c8ced3;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(200, 206, 211);
}
.noti-top-command {
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 13px;
}
.noti-top-command span {
  cursor: pointer;
  color: #409eff;
}
.noti-top-command span:hover {
  color: #0652dd;
}
.noti-top-command .btn-left {
}
.noti-top-command .btn-right {
  float: right;
  margin-right: 8px;
}
.dropdown-item {
  min-width: 220px;
  position: relative;
  padding: 8px 8px;

  display: block;
  width: 100%;

  clear: both;
  font-weight: 400;
  color: #23282c;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;

  border-bottom: 1px solid #c8ced3;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(200, 206, 211);
}

.pt-3,
.py-3 {
}

.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}
.left-div {
  float: left !important;
}
.float-left {
  float: left !important;
}
.float-right {
  float: right !important;
}
.text-muted {
  color: #73818f !important;
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.font-weight-bold {
  font-weight: 700 !important;
}
.message {
  width: 400px;
}
.message div {
  line-height: 20px;
}
.small,
small {
  font-size: 80%;
  font-weight: 400;
}
</style>

