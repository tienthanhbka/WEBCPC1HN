<template>
  <div>
    <div class="user-profile">
      <div @click="show" class="user-avatar box-center">
        <div class="profile">
          <div class="profile--cover__image">
            <div v-if="displayUpdate" class=" text-center bt-update">
              <el-button @click="updateInfor" type="text" size="mini"
                ><i class="far fa-edit"></i
              ></el-button>
            </div>
            <div v-if="!displayUpdate" class=" text-center bt-update">
              <el-button @click="acceptInfor" size="mini" type="text"
                ><i class="fas fa-check-double"></i
              ></el-button>
            </div>
            <div class="profile-top">
              <div class="user-name">
                <span>{{ user[0].EmployeeName }}</span>
                <!-- <span v-if="user[0].Status == 2">
                  <i style="color:green;" class="far fa-check-circle"></i
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
                  token +
                  '&EmployeeID=' +
                  user[0].EmployeeID
              "
              alt="avatar"
            />
            <div class="status" :style="'background-color:' + color"></div>
            <!-- <div class="user-nameemployee">
              <h2>{{ user[0].EmployeeName }}-{{ user[0].EmployeeCode }}</h2>
            </div> -->
          </div>
        </div>
      </div>
      <div class="box-social">
        <!-- <el-table :data="infoT()" :show-header="false">
          <el-table-column label="Name">
            <template v-if="scope.row.value != null" slot-scope="scope">{{
              scope.row.name
            }}</template>
          </el-table-column>
          <el-table-column label="Count" align="right">
            <template v-if="scope.row.value != null" slot-scope="scope">{{
              scope.row.value
            }}</template>
          </el-table-column>
        </el-table> -->
        <div style="margin-bottom:1rem;">
          <p style="font-size:10pt;font-weight:700;color:#0277bc;">
            {{ user[0].Branch }}
          </p>
        </div>
        <div style="margin-bottom:2rem;">
          <span style="font-size:10pt">
            <i class="el-icon-phone" style="color:#0277bc;"></i
            >&nbsp;&nbsp;&nbsp;{{ user[0].EmployeeID }}</span
          >
        </div>
        <div style="border-radius:16px;">
          <router-link :to="'/lo-trinh-cong-danh/' + user[0].EmployeeID">
            <el-button
              style="width: 100%;color:#e6a23c;"
              type="text"
              size="mini"
              ><i class="far fa-list-alt"></i>&nbsp;&nbsp;Công danh</el-button
            ></router-link
          >
        </div>
      </div>
      <!-- <div class="user-name text-center">
          <span>{{ user[0].EmployeeName }}</span>
          <span v-if="user[0].Status == 2">
            <i style="color:green;" class="far fa-check-circle"></i
          ></span>
          <span v-if="user[0].Status == 0">(Cập nhật lại)</span>
        </div>
        <div class="user-name text-center">
          <span>{{ user[0].EmployeeCode }}</span>
        </div> -->
      <!-- <div v-if="user[0].Status < 2" class="user-name text-center">
          <span>{{ user[0].Note }}</span>
        </div> -->

      <!-- <div>
        <div class="box-social">
          <el-table :data="infoT()" :show-header="false">
            <el-table-column label="Name">
              <template v-if="scope.row.value != null" slot-scope="scope">{{
                scope.row.name
              }}</template>
            </el-table-column>
            <el-table-column label="Count" align="right">
              <template v-if="scope.row.value != null" slot-scope="scope">{{
                scope.row.value
              }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div> -->
      <el-dialog title="Cập nhật thông tin" :visible.sync="dialogFormUpdate">
        <updateInfor :user="user" @click-something="addOK"></updateInfor>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>

      <el-dialog title="Phê duyệt thông tin" :visible.sync="dialogFormAccept">
        <acceptInfor
          :user="user"
          @click-something="acceptOK"
          @cancel="cancelInfo"
        ></acceptInfor>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>

      <el-dialog
        title="Yêu cầu cập nhật lại thông tin"
        :visible.sync="dialogFormNoAccept"
      >
        <cancel
          :row="user"
          @noacceptOK="noacceptOK"
          @cancel="cancelInfo"
        ></cancel>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>

      <el-dialog
        title="Cập nhật thông tin gia đình"
        :visible.sync="dialogFormUpdateRe"
      >
        <updateInforRe :user="user" @click-something="addReOK"></updateInforRe>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>

      <el-dialog class="el-img" :visible.sync="imgVisible">
        <img
          :src="
            'https://icpc1hn.work/api/' +
              'File/GetImageEmployee/' +
              user[0].Img +
              '?token=' +
              token +
              '&EmployeeID=' +
              user[0].EmployeeID
          "
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UpdateInfor from "@/views/user/components/UpdateInforEmployee";
import AcceptInfor from "@/views/user/components/AcceptInfor";
import Cancel from "@/views/user/components/cancelInfor";
import UpdateInforRe from "@/views/user/components/CreateRelative";
import PanThumb from "@/components/PanThumb";
import Cookies from "js-cookie";
export default {
  components: { PanThumb, UpdateInfor, UpdateInforRe, AcceptInfor, Cancel },
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
    //console.log(this.user[0].Img)
  },
  methods: {
    acceptInfor(row) {
      // this.user=[]
      // this.user.push(row)
      //console.log(this.user)
      this.dialogFormAccept = true;
    },
    acceptOK() {
      this.dialogFormAccept = false;
      // this.fetchData();
    },
    noacceptOK() {
      this.dialogFormNoAccept = false;
    },
    cancelInfo() {
      this.dialogFormAccept = false;
      this.dialogFormNoAccept = true;
    },
    show() {
      //alert('OK')
      this.imgVisible = true;
    },
    addOK() {
      this.dialogFormUpdate = false;
      this.$emit("addOK", "ok");
    },
    updateInfor() {
      this.dialogFormUpdate = true;
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
      dialogFormAccept: false,
      dialogFormNoAccept: false,
      token: Cookies.get("token"),
      dialogFormUpdate: false,
      dialogFormUpdateRe: false,
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
// .user-profile {
//   position: relative;
//   border-radius: 16px;
//   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//   .bt-update {
//     position: absolute;
//     right: -10px;
//     top: -15px;
//   }
//   .user-name {
//     font-weight: bold;
//   }
// .box-center {
//   padding-top: 10px;
//   margin: 0 auto;
//   vertical-align: center;
//   width: 100px;
//   // height: 200px;
// }

//   .text-center {
//     margin-top: 10px;
//     text-align: center;
//   }
//   .user-role {
//     padding-top: 10px;
//     font-weight: 400;
//     font-size: 14px;
//   }
//   .box-social {
//     padding-top: 30px;
//     .el-table {
//       border-top: 1px solid #dfe6ec;
//     }
//   }
//   .user-follow {
//     padding-top: 20px;
//   }
// }
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
