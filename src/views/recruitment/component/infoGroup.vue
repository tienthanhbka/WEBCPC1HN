<template>
  <div class="info-container">
    <el-row class="info-company" :gutter="30">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="info-basic info-box">
          <div class="header">
            <img
              :src="avatarGroup"
              onerror="this.onerror = null; this.src = 'https://cpc1hn.com.vn/wp-content/uploads/%E1%BA%A2nh/ve-chung-toi.jpg';"
              alt="avatar group"
            />
          </div>
          <div class="content">
            <h3 class="group-name">{{ dataGroup.CompanyName }}</h3>
            <el-form
              label-position="left"
              label-width="80px"
              class="form-custom"
              :model="dataGroup"
              size="mini"
            >
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Website:</span>
                <span v-if="!dataGroup.LinkWeb" class="no-data"></span>
                <el-link v-else :href="dataGroup.LinkWeb" target="_blank">{{
                  dataGroup.LinkWeb
                }}</el-link>
              </el-form-item>
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Địa chỉ:</span>
                <span :class="dataGroup.Address ? '' : 'no-data'">{{
                  dataGroup.Address
                }}</span>
              </el-form-item>
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Fax:</span>
                <span :class="dataGroup.Fax ? '' : 'no-data'">{{
                  dataGroup.Fax
                }}</span>
              </el-form-item>
            </el-form>
          </div>
          <el-upload
            class="image-company"
            ref="uploadFile"
            :action="uploadFile"
            :auto-upload="true"
            :on-success="handleSuccess"
            :limit="1"
          >
            <el-button class="btn-update"
              ><i class="fas fa-image"></i
            ></el-button>
          </el-upload>
        </div>
        <div class="info-contact info-box">
          <h3 class="title-box">Thông tin liên hệ:</h3>
          <el-form
            label-position="left"
            label-width="90px"
            class="form-custom"
            :model="dataGroup"
            size="mini"
          >
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Liên hệ:</span>
              <span :class="dataGroup.ContactRepresent ? '' : 'no-data'">{{
                dataGroup.ContactRepresent
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Chức vụ:</span>
              <span :class="dataGroup.ContactPosition ? '' : 'no-data'">{{
                dataGroup.ContactPosition
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Điện thoại:</span>
              <span :class="dataGroup.ContactPhone ? '' : 'no-data'">{{
                dataGroup.ContactPhone
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Email:</span>
              <span :class="dataGroup.ContactEmail ? '' : 'no-data'">{{
                dataGroup.ContactEmail
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="info-introduce info-box">
          <h3 class="title-box">Giới thiệu:</h3>
          <contenteditable
            style="width:100%;overflow:hidden;"
            class="content-edit"
            v-if="dataGroup.MoreInfo"
            tag="p"
            :noHTML="false"
            :contenteditable="false"
            v-model="dataGroup.MoreInfo"
          />
          <p style="text-align:center" v-else class="no-data"></p>
          <el-button class="btn-update" @click="updateCom"
            ><i class="fas fa-edit"></i
          ></el-button>
        </div>
        <div class="info-employee info-box">
          <h3 class="title-box">Danh sách thành viên:</h3>
          <div style="text-align:center;" :class="employeeLst ? '' : 'no-data'">
            <el-table :data="employeeLst" style="width: 100%" size="small">
              <el-table-column label="" width="80">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="UserCode" label="Tài khoản" width="100">
              </el-table-column>
              <el-table-column prop="FullName" label="Họ tên" width="180">
              </el-table-column>
              <el-table-column prop="Email" label="Email" width="180">
              </el-table-column>
              <el-table-column
                prop="UserType"
                label="Phân quyền"
                width="150"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.UserType | WEmployeeStatusColor"
                    size="small"
                  >
                    {{ scope.row.UserType | WEmployeeStatusText }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column width="100" label="Actions" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    content="Xóa thành viên"
                    placement="top"
                    effect="light"
                    ><el-button @click="deleteEm(scope.row)" type="text">
                      <i
                        class="fas fa-user-minus"
                        style="color:#d85252;font-size:14pt"
                      ></i></el-button
                  ></el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-button class="btn-update" @click="addEm"
            ><i class="fas fa-user-plus"></i
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormUpdate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <update-info
        :row="dataGroup"
        @updateOK="updateOK"
      ></update-info> </el-dialog
    ><el-dialog :visible.sync="dialogFormAddEm" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <add-employee @addEmOK="addEmOK" :company="CompanyID"></add-employee>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetCompanyInfoByID,
  GetEmployeeCompany,
  DelMemberCompany
} from "@/api/work-dtp/company";
import UpdateInfo from "../groups/component/updateGroupInfo";
import AddEmployee from "../groups/component/addEmployee";
import Cookies from "js-cookie";
import baseURL from "@/utils/workUrl";
export default {
  props: {},
  components: {
    UpdateInfo,
    AddEmployee
  },
  data() {
    return {
      dataGroup: {},
      employeeLst: [],
      CompanyID: this.$route.params.id,
      dialogFormUpdate: false,
      dialogFormAddEm: false,
      titleDialog: "",
      userName: Cookies.get("idEmployee"),
      token: Cookies.get("token"),
      avatarGroup: ""
    };
  },
  computed: {
    uploadFile: {
      get() {
        return (
          baseURL +
          "/File/UploadCompanyImage?CompanyID=" +
          this.CompanyID +
          "&Token=" +
          this.token +
          "&UserName=" +
          this.userName
        );
      },
      set() {}
    }
  },
  methods: {
    fetchGroupData() {
      const req = { CompanyID: this.CompanyID };
      GetCompanyInfoByID(req).then(res => {
        this.dataGroup = res.CompanyInfo;
      });
    },
    fetchGroupEm() {
      const req = { CompanyID: this.CompanyID };
      GetEmployeeCompany(req).then(res => {
        this.employeeLst = res.EmployeeLst;
      });
    },
    fetchAvatar() {
      this.avatarGroup =
        baseURL + "/File/DownloadCompanyImage?CompanyID=" + this.CompanyID;
    },
    updateCom() {
      this.dialogFormUpdate = true;
      this.titleDialog = "Cập nhật thông tin nhóm";
    },
    addEm() {
      this.dialogFormAddEm = true;
      this.titleDialog = "Thêm thành viên";
    },
    addEmOK() {
      this.dialogFormAddEm = false;
      this.fetchGroupEm();
    },
    deleteEm(line) {
      this.$confirm(
        "Xóa thành viên " + line.UserCode + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            CompanyID: this.$route.params.id,
            EmployeeID: line.UserCode
          };
          DelMemberCompany(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa thành viên thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchGroupEm();
            }
          });
        })
        .catch(() => {});
    },
    updateOK() {
      this.dialogFormUpdate = false;
      this.fetchGroupData();
    },
    handleSuccess(res, file, fileList) {
      if (res.RespCode == 0) {
        this.fetchAvatar();
        this.$notify({
          title: "Thành công",
          message: "Cập nhật ảnh thành công",
          type: "success",
          position: "top-left"
        });
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    }
  },
  created() {
    this.fetchGroupData();
    this.fetchGroupEm();
    this.fetchAvatar();
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  padding: 20px 10%;
  background-color: #f0f2f5;
  .info-box {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    .title-box {
      display: inline-block;
      font-size: 12pt;
      border-bottom: 1px solid #0277bc;
      color: #0277bc;
    }
    .no-data:empty:before {
      content: "Không có dữ liệu";
      color: #9197a3;
      text-align: center;
      font-weight: 100;
      font-size: 10pt;
      padding: 3px;
    }
  }
  .info-company {
    .info-basic {
      position: relative;
      .header {
        img {
          width: 100%;
          max-height: 250px;
        }
      }
      .content {
        padding: 10px;
        .group-name {
          font-size: 12pt;
          color: #0277bc;
          text-transform: uppercase;
          margin: 0;
          text-align: center;
        }
      }
    }
    .info-contact {
      padding: 10px;
      .title {
      }
    }
    .info-introduce {
      padding: 10px;
      min-height: 200px;
      position: relative;
    }
    .info-employee {
      position: relative;
      padding: 10px;
    }
    .btn-update {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 10px 0 10px;
      border: 0;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #0277bc;
      color: #fff;
    }
  }
  .form-custom {
    .label-custom {
      margin: 5px;
      .label {
        font-size: 10pt;
      }
    }
  }
}
</style>
