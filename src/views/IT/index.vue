<template>
  <div class="admin-box">
    <div class="admin-view">
      <div class="box-check" v-if="viewIT">
        <div class="inline-block">
          <el-input
            size="small"
            v-model="keyAdmin"
            placeholder="Nhập Key2"
            type="password"
            @keyup.enter.native="checkAdmin2"
          ></el-input>
        </div>
        <div class="inline-block">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-circle-check"
            @click="checkAdmin2"
            >Kích hoạt</el-button
          >
        </div>
      </div>
      <transition name="el-zoom-in-center">
        <div class="box-content" v-if="viewAll">
          <el-row :gutter="20">
            <el-col :xs="24" :lg="12">
              <el-input
                v-model="searchEm"
                placeholder="Tìm kiếm theo SĐT"
                @keyup.enter.native="searchEmployee"
                ><el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchEmployee"
                ></el-button
              ></el-input>

              <div class="box-form" v-loading="loading">
                <el-divider content-position="left">Thông tin</el-divider>
                <el-form
                  v-if="!disable"
                  ref="form"
                  size="mini"
                  class="form-custom"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="Họ và tên: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.EmployeeName }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="Mã nhân viên: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.EmployeeCode }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="Mail công ty: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.MailEmployee }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="IDEmployee: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.EmployeeID }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="TTKD: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.Center }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="IDGroup: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.GroupID }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="Admin: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.Admin }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="Password: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.Password }}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="OTC: ">
                    <div class="form-item-block">
                      <span>{{ employeeInfo.TypeOTC }}</span>
                    </div>
                  </el-form-item>
                </el-form>
                <div v-else class="blank-table">
                  Không có dữ liệu
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :lg="12">
              <div class="box-form-info">
                <el-divider content-position="left">Actions</el-divider>
                <el-form
                  ref="form"
                  size="mini"
                  class="form-custom"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="Mật khẩu mới">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-input
                          v-model="newPassword"
                          style="width:100%"
                          :disabled="disable"
                        >
                        </el-input>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          @click="changePass"
                          style="width:100px"
                          type="primary"
                          icon="fas fa-key"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Mã nhân viên">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-input
                          v-model="employeeCode"
                          style="width:100%"
                          :disabled="disable"
                        >
                        </el-input>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          @click="changeEmployeeCode"
                          style="width:100px"
                          type="primary"
                          icon="fas fa-user"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Email công ty">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-input
                          v-model="mailCompany"
                          style="width:100%"
                          :disabled="disable"
                        >
                        </el-input>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          @click="changeMailCompany"
                          style="width:100px"
                          type="primary"
                          icon="fas fa-envelope-open"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Đặt làm Admin">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18" class="form-item-block">
                        <el-row>
                          <el-col :xs="24" :lg="16">
                            <el-select
                              :disabled="disable"
                              style="width:100%"
                              v-model="adminGroup"
                              filterable
                              placeholder="Chọn nhóm"
                            >
                              <el-option
                                v-for="(item, index) in groupLst"
                                :key="index"
                                :label="item.GroupID"
                                :value="item.GroupID"
                              >
                              </el-option>
                            </el-select>
                          </el-col>
                          <el-col :xs="24" :lg="8">
                            <el-input-number
                              style="width:100%"
                              :disabled="disable"
                              v-model="typeEm"
                              :min="1"
                              :max="10"
                            ></el-input-number>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          @click="setRole"
                          type="primary"
                          icon="fas fa-user-cog"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Loại NV(OTC)">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          :disabled="disable"
                          style="width:100%"
                          v-model="typeOTC"
                          filterable
                          placeholder="Chọn loại nhân viên"
                        >
                          <el-option
                            v-for="(item, index) in typeLst"
                            :key="index"
                            :label="item.Description"
                            :value="item.TypeCode"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          @click="changeType"
                          type="primary"
                          icon="fas fa-user-edit"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Thêm vào nhóm">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          :disabled="disable"
                          style="width:100%"
                          v-model="emSelectGroup"
                          filterable
                          placeholder="Chọn nhóm"
                        >
                          <el-option
                            v-for="(item, index) in groupLst"
                            :key="index"
                            :label="item.GroupID"
                            :value="item.GroupID"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          @click="addEmGroup"
                          type="primary"
                          icon="fas fa-user-plus"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Chuyển nhóm">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          :disabled="disable"
                          style="width:100%"
                          v-model="emGroup"
                          filterable
                          placeholder="Chọn nhóm"
                        >
                          <el-option
                            v-for="(item, index) in groupLst"
                            :key="index"
                            :label="item.GroupID"
                            :value="item.GroupID"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          @click="moveGroup"
                          type="primary"
                          icon="fas fa-exchange-alt"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Cài đặt TTKD">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          :disabled="disable"
                          style="width:100%"
                          v-model="center"
                          filterable
                          placeholder="Chọn TTKD"
                        >
                          <el-option
                            v-for="(item, index) in centerLst"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          @click="setupCenter"
                          type="primary"
                          icon="fas fa-exchange-alt"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
              <div class="box-form">
                <el-divider content-position="left">NPP</el-divider>
                <div style="float:right;padding: 5px 0">
                  <div class="inline-block">
                    <el-select
                      size="small"
                      style="width:100%"
                      v-model="localStore"
                      filterable
                      placeholder="Chọn NPP"
                    >
                      <el-option
                        v-for="(item, index) in localLst"
                        :key="index"
                        :label="item.LocalName"
                        :value="item"
                      >
                        <span style="float: left">{{ item.LocalName }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ item.City }}</span
                        >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="inline-block">
                    <el-button
                      size="small"
                      type="primary"
                      icon="fas fa-plus-circle"
                      @click="addLocal"
                    ></el-button>
                  </div>
                </div>
                <div class="clear--both"></div>
                <el-table
                  class="el-mobile-table"
                  :data="localEmLst"
                  size="small"
                  border
                  fit
                  highlight-current-row
                >
                  <el-table-column align="center" width="100px" label="STT">
                    <template slot-scope="scope">
                      <div class="dat-cell" label="STT">
                        {{ scope.$index + 1 }}

                        <el-tooltip content="Xóa">
                          <el-button
                            @click="delLocal(scope.row)"
                            type="text"
                            style="color:red;"
                            ><i class="el-icon-delete"></i></el-button
                        ></el-tooltip>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column width="150px" label="Mã NPP">
                    <template slot-scope="scope">
                      <div class="dat-cell" label="Mã NPP">
                        {{ scope.row.StoreCode }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="150px" label="Tên nhà phân phối">
                    <template slot-scope="scope">
                      <div class="dat-cell" label="Tên nhà phân phối">
                        {{ scope.row.LocalName }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="box-form">
                <el-divider content-position="left">Nhóm</el-divider>
                <el-form
                  ref="form"
                  size="mini"
                  class="form-custom"
                  label-width="120px"
                  label-position="left"
                >
                  <el-form-item label="Tạo nhóm mới">
                    <el-input
                      v-model="groupName"
                      placeholder="Nhập tên nhóm"
                      style="width:100%"
                    >
                    </el-input>
                    <el-row style="width:100%;margin-top:5px">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          style="width:100%"
                          v-model="branchGroup"
                          filterable
                          placeholder="Chọn chi nhánh"
                        >
                          <el-option
                            v-for="(item, index) in branchLst"
                            :key="index"
                            :label="item.value"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          style="width:100px"
                          type="primary"
                          icon="fas fa-plus-circle"
                          @click="createGroup"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="Khóa nhóm">
                    <el-row style="width:100%">
                      <el-col :xs="24" :lg="18">
                        <el-select
                          style="width:100%"
                          v-model="groupSelect"
                          filterable
                          placeholder="Chọn nhóm"
                        >
                          <el-option
                            v-for="(item, index) in groupLst"
                            :key="index"
                            :label="item.GroupID"
                            :value="item.GroupID"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :xs="24" :lg="6">
                        <el-button
                          @click="delGroup"
                          style="width:100px"
                          icon="fas fa-lock"
                          type="primary"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </transition>
    </div>
    <!-- <el-dialog
      :visible.sync="dialogFormCheck"
      custom-class="small-modal"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="form-check">
        <el-input
          placeholder="Nhập Key1"
          v-model="checkIT"
          type="password"
          @keyup.enter.native="checkAdmin"
          ><el-button
            slot="append"
            icon="el-icon-circle-check"
            @click="checkAdmin"
          ></el-button
        ></el-input>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  CheckUserIT,
  ChangePassword,
  ChangeEmployeeType,
  GetGroupLst,
  DeleteGroup,
  SetRoleEmployee,
  MoveGroupEmployee,
  GetEmployeeInfo,
  AddEmployeeGroup,
  CreateGroup,
  ChangeEmployeeCode,
  ChangeMailCompany,
  SetupCenterEmployee
} from "@/api/it";
import { GetEmployeeDefine } from "@/api/employeeAdmin";
import {
  GetLocalStore,
  GetLocalStoreByEm,
  CreateEmployeeLocal,
  DelEmployeeLocal
} from "@/api/npp";
export default {
  data() {
    return {
      dialogFormCheck: false,
      loading: false,
      disable: true,
      titleDialog: "",
      adminGroup: "",
      emSelectGroup: "",
      checkIT: "",
      keyAdmin: "",
      newPassword: "",
      employeeCode: "",
      mailCompany: "",
      searchEm: "",
      typeEm: 2,
      typeOTC: "",
      emGroup: "",
      groupName: "",
      branchGroup: "",
      groupSelect: "",
      center: "",
      localStore: "",
      groupLst: [],
      localLst: [],
      localEmLst: [],
      centerLst: [
        { value: "01", label: "Trụ sở chính - nhà máy" },
        { value: "02", label: "Chi nhánh Hồ Chí Minh" },
        { value: "03", label: "Chi nhánh Đà Nẵng" },
        { value: "04", label: "Chi nhánh Hà Nội" }
      ],
      employeeInfo: {},
      branchLst: [
        { value: "CNHN" },
        { value: "CNDN" },
        { value: "CNHCM" },
        { value: "CNHBP" }
      ],
      viewIT: true,
      viewAll: false
    };
  },
  methods: {
    //key check IT : cpc1hn2021@
    // checkAdmin() {
    //   if (this.checkIT === "cpc1hn2021@") {
    //     this.dialogFormCheck = false;
    //     this.viewIT = true;
    //   }
    // },
    checkAdmin2() {
      CheckUserIT({ KeyIT: this.keyAdmin }).then(res => {
        if (res.RespCode == 0) {
          this.viewAll = true;
        }
      });
    },
    fetchGroup() {
      GetGroupLst().then(res => {
        this.groupLst = res.GroupLst;
      });
    },
    fetchTypeOTC() {
      GetEmployeeDefine().then(res => {
        this.typeLst = res.Data;
      });
    },
    searchEmployee() {
      this.loading = true;
      GetEmployeeInfo({ Search: this.searchEm }).then(res => {
        if (res.RespCode == 0) {
          this.employeeInfo = res.EmployeeInfo;
          this.loading = false;
          this.disable = false;
        } else if (res.RespCode != 0) {
          this.disable = true;
          this.loading = false;
        }
      });
      this.fetchLocalEm();
    },
    changePass() {
      const req = {
        EmployeeID: this.searchEm,
        NewPass: this.newPassword
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      }
      if (!this.newPassword) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập mật khẩu",
          type: "error",
          position: "top-left"
        });
      } else {
        ChangePassword(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Đổi mật khẩu thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    setRole() {
      const req = {
        EmployeeID: this.searchEm,
        GroupID: this.adminGroup,
        Type: this.typeEm
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else if (!this.adminGroup) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn nhóm !",
          type: "error",
          position: "top-left"
        });
      } else {
        SetRoleEmployee(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Phân quyền thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    setupCenter() {
      const req = {
        EmployeeID: this.searchEm,
        Center: this.center
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else {
        SetupCenterEmployee(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật TTKD thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    changeEmployeeCode() {
      const req = {
        EmployeeID: this.searchEm,
        EmployeeCode: this.employeeCode
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else {
        ChangeEmployeeCode(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    changeMailCompany() {
      const req = {
        EmployeeID: this.searchEm,
        MailCompany: this.mailCompany
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else {
        ChangeMailCompany(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    changeType() {
      const req = {
        EmployeeID: this.searchEm,
        TypeOTC: this.typeOTC
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else if (!this.typeOTC) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn loại nhân viên",
          type: "error",
          position: "top-left"
        });
      } else {
        ChangeEmployeeType(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Đổi loại nhân viên thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    moveGroup() {
      const req = {
        EmployeeID: this.searchEm,
        GroupID: this.emGroup
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else if (!this.emGroup) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn nhóm",
          type: "error",
          position: "top-left"
        });
      } else {
        MoveGroupEmployee(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Chuyển nhóm nhân viên thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    createGroup() {
      const groupInfo = {
        GroupID: this.groupName,
        Branch: this.branchGroup
      };
      if (!this.groupName || !this.branchGroup) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhóm",
          type: "error",
          position: "top-left"
        });
      } else {
        CreateGroup({ GroupInfo: groupInfo }).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Tạo nhóm mới thành công",
              type: "success",
              position: "top-left"
            });
            this.fetchGroup();
          }
        });
      }
    },
    delGroup() {
      const req = {
        GroupID: this.groupSelect
      };
      if (!this.groupSelect) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn nhóm",
          type: "error",
          position: "top-left"
        });
      } else {
        DeleteGroup(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Khóa nhóm thành công",
              type: "success",
              position: "top-left"
            });
            this.fetchGroup();
          }
        });
      }
    },
    addEmGroup() {
      const req = {
        EmployeeID: this.searchEm,
        GroupID: this.emSelectGroup
      };
      if (!this.searchEm) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa nhập thông tin nhân viên",
          type: "error",
          position: "top-left"
        });
      } else if (!this.emSelectGroup) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn nhóm",
          type: "error",
          position: "top-left"
        });
      } else {
        AddEmployeeGroup(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Thêm nhân viên vào nhóm thành công",
              type: "success",
              position: "top-left"
            });
            this.searchEmployee();
          }
        });
      }
    },
    addLocal() {
      const req = {
        EmployeeID: this.searchEm,
        StoreCode: this.localStore.StoreCode,
        LocalName: this.localStore.LocalName
      };
      CreateEmployeeLocal({ EmployeeLocalInfo: req }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Cài đặt NPP thành công",
            type: "success",
            position: "top-left"
          });
          this.fetchLocalEm();
        }
      });
    },
    delLocal(item) {
      const req = {
        EmployeeID: this.searchEm,
        StoreCode: item.StoreCode,
        LocalName: item.LocalName
      };
      DelEmployeeLocal({ EmployeeLocalInfo: req }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xóa NPP thành công",
            type: "success",
            position: "top-left"
          });
          this.fetchLocalEm();
        }
      });
    },
    fetchLocal() {
      GetLocalStore().then(res => {
        if (res.RespCode == 0) {
          this.localLst = res.Data;
        }
      });
    },
    fetchLocalEm() {
      GetLocalStoreByEm({ EmployeeID: this.searchEm }).then(res => {
        if (res.RespCode == 0) {
          this.localEmLst = res.Data;
        }
      });
    }
  },
  created() {
    this.fetchGroup();
    this.fetchTypeOTC();
    this.fetchLocal();
  },
  mounted() {
    //this.dialogFormCheck = true;
  }
};
</script>

<style lang="scss" scoped>
.admin-box {
  padding: 20px;
  background-color: #f0f2f5;
  .form-item-block {
    display: flex;
  }
  .admin-view {
    .box-check {
      padding: 20px 0;
      .inline-block {
        display: inline-block;
      }
    }
    .box-content {
      padding: 20px;
      background-color: #fff;
      .box-form {
        margin: 20px 0;

        padding: 5px 10px 10px 10px;

        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
          rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      }
      .box-form-info {
        padding: 5px 10px 10px 10px;

        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
          rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      }
    }
  }
}
</style>
