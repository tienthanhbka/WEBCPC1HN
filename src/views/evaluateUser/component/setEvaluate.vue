<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="110px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Ngày bắt đầu đánh giá"
            required
            prop="DateStartEvalue"
            label-width="160"
          >
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              v-model="form.DateStartEvalue"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              type="date"
              placeholder="Chọn ngày bắt đầu đánh giá"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            required
            label="Ngày kết thúc đánh giá"
            prop="DateEndEvalue"
            label-width="160"
          >
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.DateEndEvalue"
              size="small"
              type="date"
              placeholder="Chọn ngày kết thúc đánh giá"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item required label="Loại đánh giá" prop="TypeEvaluate">
            <el-select
              class="selectIDGroup"
              style="width:100%"
              v-model="form.TypeEvaluate"
              placeholder="Chọn loại đánh giá"
            >
              <el-option
                v-for="item in TypeLst"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item required label="Tuổi nghề" prop="WorkOld">
            <el-select
              v-model="form.WorkOld"
              placeholder="Nhập tuổi nghề nhân viên..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in WorkOlds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item required label="Đánh giá ai" prop="EmployeeID">
            <el-input
              class="selectIDGroup"
              v-model="form.EmployeeID"
              style="width:100%"
              placeholder="Nhập sđt nhân viên..."
            >
              <el-tooltip
                slot="suffix"
                content="Check"
                placement="top"
                effect="light"
              >
                <!-- <el-popover placement="right" width="400" trigger="click">
                  <div v-if="emInfo.EmployeeID">
                    [{{ emInfo.EmployeeID }}] - {{ emInfo.EmployeeName }}
                  </div> -->
                <el-button @click="checkUser" type="text"
                  ><i style="margin-right: 10px;" class="el-icon-search"></i
                ></el-button>
                <!-- </el-popover> -->
              </el-tooltip>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item v-if="viewEm">
            <el-input
              class="selectIDGroup"
              v-model="employeeName"
              style="width:100%"
              placeholder="Tên..."
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Ai đánh giá">
        <!-- <el-input
          class="selectIDGroup"
          v-model="employee"
          style="width:100%"
          @focus="getEmEvaluate"
          placeholder="Nhập sđt người đánh giá..."
        >
          <el-tooltip slot="suffix" content="Add" placement="top">
            <el-button @click="addEm" type="text"
              ><i style="margin-right: 10px;" class="el-icon-plus"></i
            ></el-button>
          </el-tooltip>
        </el-input> -->
        <el-autocomplete
          class="selectIDGroup"
          style="width:100%"
          v-model="employee"
          :fetch-suggestions="querySearch"
          placeholder="Nhập sđt người đánh giá..."
          @select="handleSelect"
          @focus="getEmEvaluate"
        >
          <template slot-scope="{ item }">
            <span style="float: left">{{ item.EmployeeName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.EmployeeID
            }}</span>
          </template>
          <el-tooltip
            slot="suffix"
            content="Add"
            placement="top"
            effect="light"
          >
            <el-button @click="addEm" type="text"
              ><i style="margin-right: 10px;" class="el-icon-plus"></i
            ></el-button>
          </el-tooltip>
        </el-autocomplete>
        <el-table
          v-if="form.EmployeeEvaluateLst.length > 0"
          class="el-mobile-table"
          :data="form.EmployeeEvaluateLst"
          :loading="loadingTable"
          style="width: 100%"
          size="small"
          border
          fit
        >
          <el-table-column width="100px" label="STT" align="center">
            <template slot-scope="scope">
              <div class="dat-cell" label="STT">
                {{ scope.$index + 1 }}
                <el-tooltip content="Xóa" placement="top"
                  ><el-button
                    style="color:red;"
                    @click="delEm(scope.$index)"
                    type="text"
                  >
                    <i class="el-icon-delete"></i></el-button
                ></el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="75px" label="Nhân viên">
            <template slot-scope="scope">
              <div class="dat-cell" label="Nhân viên">
                {{ scope.row.EmployeeName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" label="Số điện thoại">
            <template slot-scope="scope">
              <div class="dat-cell" label="Số điện thoại">
                {{ scope.row.EmployeeID }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <div style="text-align:center;padding:10px">
      <el-button
        icon="el-icon-check"
        size="small"
        @click="create"
        type="primary"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  CreateCriteriaHeaderNoAuto,
  GetEmployeeEvaluateLstByEm
} from "@/api/NSCriteriaDefine";
import { NSGetEmployeeInfo } from "@/api/it";
import { GetEmployeeLevel } from "@/api/employeeAdmin";
import Cookies from "js-cookie";
export default {
  props: ["critera", "typeEvaluate"],
  components: {},
  data() {
    return {
      TypeLst: [
        {
          value: "TV",
          label: "Thử việc"
        },
        {
          value: "CT",
          label: "Định kỳ"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ],
      WorkOlds: [
        {
          value: 0,
          label: "Thử việc"
        },
        {
          value: 6,
          label: "6 tháng"
        },
        {
          value: 12,
          label: "1 năm"
        },
        {
          value: 18,
          label: "18 tháng"
        },
        {
          value: 24,
          label: "2 năm"
        },
        {
          value: 36,
          label: "3 năm"
        },
        {
          value: 48,
          label: "4 năm"
        }
      ],
      employee: "",
      employeeName: "",
      emInfo: {},
      loadingTable: false,
      viewEm: false,
      emEvalLst: [],
      form: {
        EmployeeName: "",
        WorkOld: "",
        TypeEvaluate: "",
        DateStartEvalue: "",
        DateEndEvalue: "",
        DateEndReport: "",
        EmployeeEvaluateLst: []
      }
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.emEvalLst;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      let emCheck = this.form.EmployeeEvaluateLst.find(
        p => p.EmployeeID == item.EmployeeID
      );
      if (emCheck) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Người đánh giá đã tồn tại",
          type: "warning",
          position: "top-left"
        });
        return;
      }
      let obj = {
        EmployeeID: item.EmployeeID,
        EmployeeName: item.EmployeeName
      };
      this.form.EmployeeEvaluateLst.push(obj);
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.EmployeeID.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    addEm() {
      this.loadingTable = true;
      NSGetEmployeeInfo({ Search: this.employee }).then(res => {
        if (res.RespCode == 0) {
          let emCheck = this.form.EmployeeEvaluateLst.find(
            p => p.EmployeeID == res.EmployeeInfo.EmployeeID
          );
          if (emCheck) {
            this.$notify({
              title: "Xảy ra lỗi",
              message: "Người đánh giá đã tồn tại",
              type: "warning",
              position: "top-left"
            });
            return;
          }
          let obj = {
            EmployeeID: res.EmployeeInfo.EmployeeID,
            EmployeeName: res.EmployeeInfo.EmployeeName
          };
          this.form.EmployeeEvaluateLst.push(obj);
        }
        this.loadingTable = false;
      });
    },
    delEm(index) {
      this.form.EmployeeEvaluateLst.splice(index, 1);
    },
    checkUser() {
      NSGetEmployeeInfo({ Search: this.form.EmployeeID }).then(res => {
        if (res.RespCode == 0) {
          this.viewEm = true;
          this.employeeName = res.EmployeeInfo.EmployeeName;
        }
      });
    },
    getEmEvaluate() {
      GetEmployeeEvaluateLstByEm({ EmployeeID: this.form.EmployeeID }).then(
        res => {
          if (res.RespCode === 0) {
            this.emEvalLst = res.EmployeeEvaluateLst;
          }
        }
      );
    },
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const req = {
            EmployeeID: this.form.EmployeeID,
            WorkOld: this.form.WorkOld,
            TypeEvaluate: this.form.TypeEvaluate,
            DateStartEvalue: this.form.DateStartEvalue,
            DateEndEvalue: this.form.DateEndEvalue,
            DateEndReport: this.form.DateEndEvalue,
            EmployeeEvaluateLst: this.form.EmployeeEvaluateLst
          };
          CreateCriteriaHeaderNoAuto(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Tạo phiếu đánh giá thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("setOK");
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.el-mobile-table {
  margin-top: 10px;
}
</style>
