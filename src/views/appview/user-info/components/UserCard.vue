<template>
  <div>
    <div class="user-profile">
      <div @click="show" class="user-avatar box-center">
        <div class="profile">
          <div class="profile--cover__image">
            <!-- <div v-if="displayUpdate" class=" text-center bt-update">
              <el-button @click="updateInfor" type="text" size="mini"
                ><i class="far fa-edit"></i
              ></el-button>
            </div> -->
            <!-- <div v-if="!displayUpdate" class=" text-center bt-update">
              <el-button @click="acceptInfor" size="mini" type="text"
                ><i class="fas fa-check-double"></i
              ></el-button>
            </div> -->
            <div class="profile-top">
              <div class="user-name">
                <span>{{ user[0].EmployeeName }}</span>
                <!-- <span
                  class="status"
                  :style="'background-color:' + color"
                ></span> -->
                <span v-if="user[0].Status == 0">(Cập nhật lại)</span>
              </div>
              <div class="user-id">
                <span>{{ user[0].Position }}</span>
              </div>
            </div>
            <img
              :src="
                'https://icpc1hn.work/api/' +
                  'File/GetImageEmployee/' +
                  user[0].Img +
                  '?token=' +
                  Token +
                  '&EmployeeID=' +
                  user[0].EmployeeID
              "
              alt="avatar"
            />
          </div>
        </div>
      </div>
      <div class="box-social">
        <div style="margin-bottom:1rem;">
          <p style="font-size:10pt;font-weight:700;color:#0277bc;">
            {{ user[0].Branch }}
          </p>
        </div>
        <div style="margin-bottom:1rem;" v-if="user[0].Place">
          <p style="font-size:10pt;font-weight:700;color:#0277bc;">
            Địa bàn: {{ user[0].Place }}
          </p>
        </div>
        <div style="margin-bottom:2rem;">
          <span style="font-size:10pt">
            <i class="el-icon-phone" style="color:#0277bc;"></i
            >&nbsp;&nbsp;&nbsp;{{ user[0].EmployeeID }}</span
          >
        </div>
        <!-- <div style="border-radius:16px;">
          <router-link :to="'/lo-trinh-cong-danh/' + user[0].EmployeeID">
            <el-button
              style="width: 100%;color:#e6a23c;"
              type="text"
              size="mini"
              ><i class="far fa-list-alt"></i>&nbsp;&nbsp;Công danh</el-button
            ></router-link
          >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["user", "displayUpdate"],
  watch: {
    user() {
      if (this.user[0].StatusWork == "Đang làm việc") {
        this.color = "#00FF00";
      } else if (this.user[0].StatusWork == "Nghỉ thai sản") {
        this.color = "orange";
      } else {
        this.color = "#808080";
      }
    }
  },
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
    }
  },
  methods: {
    show() {
      this.imgVisible = true;
    },
    infoT() {
      return [
        {
          name: "Đơn vị",
          value: this.user[0].Branch
        },
        {
          name: "Phòng ban",
          value: this.user[0].Office
        },
        {
          name: "Chức danh",
          value: this.user[0].Position
        },
        {
          name: "Địa bàn",
          value: this.user[0].Place
        },
        {
          name: "Ngày vào",
          value: this.user[0].DateStartWork
        },
        {
          name: "Ngày nghỉ việc",
          value: this.user[0].DateEndWork
        }
      ];
    }
  },
  data() {
    return {
      imgVisible: false,
      color: "",
      user: [],
      Token: "",
      social: [
        {
          name: "Followers",
          count: 1235
        },
        {
          name: "Following",
          count: 23512
        },
        {
          name: "Friends",
          count: 7242
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.user-profile {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1),
    0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1),
    0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12),
    0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
  .profile {
    width: 100%;
    color: #fff;
    .profile-top {
      .user-name {
        font-size: 22px;
        text-align: center;
        padding: 10px 3px 3px;
      }
      .user-id {
        font-size: 10pt;
      }
    }
    .bt-update {
      position: absolute;
      padding: 5px;
      el-button {
        &:hover {
          background: #343a40;
          border: none;
        }
      }
    }
    .profile--cover__image {
      background-color: #343a40;
      max-width: 100%;
      max-height: 500px;
      text-align: center;
      img {
        max-width: 112px;
        max-height: 112px;
        margin-bottom: -50px;
        margin-top: 15px;
        border-radius: 10px;
        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.box-social {
  font-size: 14px;
  text-align: center;
  width: 100%;
  margin-top: 60px;
  padding-bottom: 5px;
}
.info {
  width: 100%;
  margin-top: 60px;
  padding: 5px;
  .text-center {
    text-align: center;
    color: gray;
    font-weight: 700;
    font-size: 18pt;
  }
}
.status {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid white;
}
</style>
<style lang="css">
.el-img {

    width: 50%;
}
img{
  width: 95%;
}

@media only screen and ( max-width: 600px) {
    .el-img {

    width: 100%;
}
}
</style>

<style></style>
