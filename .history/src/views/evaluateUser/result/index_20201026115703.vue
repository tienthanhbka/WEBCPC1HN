<template>
  <div class="container">
    <div class="inline-block">
      <el-select v-model="TypeEvaluate" placeholder="Chọn loại nhân viên">
        <el-option
          v-for="item in TypeLst"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        style="background-color:#02bc77;color:white;"
        icon="far fa-file-excel"
        @click="ExportExcel"
      >
        Xuất Excel</el-button
      >
    </div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm nhân viên..."
        v-model="search"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="
          CriteriaHeaderLst.filter(
            data =>
              !search ||
              data.EmployeeName.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="listLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        style="width: 100%"
        border
        fit
        highlight-current-row
        @expand-row="expand"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <print-evaluate :card="scope.row"></print-evaluate>
          </template>
        </el-table-column>
        <el-table-column width="80px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Chi tiết">
                <el-button type="text" @click="ViewDetail(scope.row)"
                  ><i class="fas fa-eye"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200px" label="Nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              {{ scope.row.EmployeeName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="Mã nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã nhân viên">
              {{ scope.row.EmployeeCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="Tuổi nghề">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tuổi nghề">
              {{ scope.row.WorkOld }}<span class="st-icon-pandora"> tháng</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" label="Tên phiếu">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên phiếu">
              {{ scope.row.DocType.replace("0 tháng", "thử việc") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.Comment }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150px" label="Trạng thái" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                style="width:120px"
                effect="plain"
                :type="scope.row.Status | toStatusColor"
                >{{ scope.row.Status | toStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div v-else class="blank-table">Vui lòng chọn loại nhân viên</div> -->
    <el-dialog
      :visible.sync="dialogFormView"
      title="chi tiết phiếu đánh giá"
      width="700.44pt"
    >
      <evaluate-view
        :card="rowData"
        @RateOK="RateOK"
        :typeEvaluate="TypeEvaluate"
      ></evaluate-view>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { GetEmployeeEvalued } from "@/api/NSCriteriaDefine";
import { getStartDate, getEndDate } from "@/api/index";
import PrintEvaluate from "@/views/evaluateUser/component/printEvaluate";
import EvaluateView from "../component/EvaluateView";
import {
  GetCriteriaHeader,
  GetCriteriaHeaderByEmId
} from "@/api/NSCriteriaEmployee";
export default {
  components: {
    PrintEvaluate,
    EvaluateView
  },
  filters: {
    toStatusText(val) {
      if (val == 1) {
        return "Chưa phê duyệt";
      } else if (val == 2) {
        return "KHÔNG ĐẠT";
      } else if (val == 3) {
        return "ĐẠT";
      }
    },
    toStatusColor(val) {
      if (val == 1) {
        return "info";
      } else if (val == 2) {
        return "danger";
      } else if (val == 3) {
        return "success";
      }
    }
  },
  data() {
    return {
      search: "",
      show: "",
      downloading: false,
      TypeEvaluate: "TV",
      CriteriaHeaderLst: [],
      CriteriaHeaderInfo: "",
      dialogFormView: false,
      rowData: "",
      rowData1: "",
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      TypeLst: [
        {
          value: "TV",
          label: "Thử việc"
        },
        {
          value: "CT",
          label: "Chính thức"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ]
    };
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TypeEvaluate: this.TypeEvaluate
      };
      GetCriteriaHeader(req).then(res => {
        if (res.RespCode == 0) {
          this.CriteriaHeaderLst = res.CriteriaHeaderLst;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Tên nhân viên",
        "Điện thoại",
        "Chức vụ",
        "Bộ phận",
        "Ngày vào làm",
        "Tuổi nghề"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "EmployeeID",
        "Postition",
        "Department",
        "DateStartWork",
        "WorkOld"
      ];
      var data = this.EmployeeEvaluedLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách nhân viên đánh giá", //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    expand(row) {
      this.CriteriaHeaderInfo = row;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    filterHandler(value, row) {
      return row.Department === value;
    },
    ViewDetail(val) {
      console.log(val);
      this.dialogFormView = true;
      this.rowData = val;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    TypeEvaluate() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
