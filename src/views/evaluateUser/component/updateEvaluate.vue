<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="Ai đánh giá">
        <el-autocomplete
          class="selectIDGroup"
          style="width:100%"
          v-model="employee"
          :fetch-suggestions="querySearch"
          placeholder="Nhập sđt người đánh giá..."
          @select="handleSelect"
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
        @click="updateSet"
        type="primary"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  UpdateCriteriaHeaderNoAuto,
  GetEmployeeEvaluateLstByEm,
  GetEmployeeEvaluateLstByDocID
} from "@/api/NSCriteriaDefine";
import { GetEmployeeInfo } from "@/api/it";
export default {
  props: ["row"],
  components: {},
  data() {
    return {
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
      GetEmployeeInfo({ Search: this.employee }).then(res => {
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
    updateSet() {
      const req = {
        DocumentID: this.row.DocumentID,
        EmployeeEvaluateLst: this.form.EmployeeEvaluateLst
      };
      UpdateCriteriaHeaderNoAuto(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật phiếu đánh giá thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("updateSetOK");
        }
      });
    },
    fetchData() {
      GetEmployeeEvaluateLstByDocID({
        DocumentID: this.row.DocumentID
      }).then(res => {
        if (res.RespCode === 0) {
          this.form.EmployeeEvaluateLst = res.EmployeeEvaluateLst;
        }
      });
      GetEmployeeEvaluateLstByEm({ EmployeeID: this.row.EmployeeID }).then(
        res => {
          if (res.RespCode === 0) {
            this.emEvalLst = res.EmployeeEvaluateLst;
          }
        }
      );
    }
  },
  mounted() {},
  watch: {
    row() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
.el-mobile-table {
  margin-top: 10px;
}
</style>
