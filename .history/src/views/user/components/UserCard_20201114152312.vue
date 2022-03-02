<template>
  <div>
    <div class="user-profile">
      <div v-if="displayUpdate" class=" text-center bt-update">
        <el-button @click="updateInfor" size="mini" type="primary" plain
          ><i class="far fa-edit"></i
        ></el-button>
      </div>
      <div v-if="!displayUpdate" class=" text-center bt-update">
        <el-button @click="acceptInfor" size="mini" type="primary" plain
          ><i class="fas fa-check-double"></i
        ></el-button>
      </div>
      <div @click="show" class="user-avatar box-center">
        <!-- <pan-thumb
          :image="'https://icpc1hn.work/api/'+'File/GetImageEmployee/'+user[0].Img+'?token='+token+'&EmployeeID='+user[0].EmployeeID"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
          :color="color"
          
          style="object-fit: cover;"
        /> -->
        <div class="profile">
          <div class="profile--cover__image">
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
          </div>
        </div>
      </div>

      <div class="user-name text-center">
        <span>{{ user[0].EmployeeName }}</span>
        <span v-if="user[0].Status == 2">
          <i style="color:green;" class="far fa-check-circle"></i
        ></span>
        <span v-if="user[0].Status == 0">(Cập nhật lại)</span>
      </div>
      <div class="user-name text-center">
        <span>{{ user[0].EmployeeCode }}</span>
      </div>
      <div v-if="user[0].Status < 2" class="user-name text-center">
        <span>{{ user[0].Note }}</span>
      </div>
      <div>
        <router-link :to="'/lo-trinh-cong-danh/' + user[0].EmployeeID">
          <el-button style="width: 100%;" size="mini"
            ><i class="far fa-list-alt"></i>Công danh</el-button
          ></router-link
        >
      </div>

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
.user-profile {
  position: relative;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .bt-update {
    position: absolute;
    right: -10px;
    top: -15px;
  }
  .user-name {
    font-weight: bold;
  }
  // .box-center {
  //   padding-top: 10px;
  //   margin: 0 auto;
  //   vertical-align: center;
  //   width: 100px;
  //   // height: 200px;
  // }

  .text-center {
    margin-top: 10px;
    text-align: center;
  }
  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
  .box-social {
    padding-top: 30px;
    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }
  .user-follow {
    padding-top: 20px;
  }
}
.profile {
  width: 100%;
  .profile--cover__image {
    background: url(./img/company.jpg) no-repeat center;
    max-width: 100%;
    max-height: 500px;
    text-align: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    img {
      max-width: 200px;
      max-height: 200px;
      margin-bottom: -70px;
      border-radius: 10px;
    }
  }
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
