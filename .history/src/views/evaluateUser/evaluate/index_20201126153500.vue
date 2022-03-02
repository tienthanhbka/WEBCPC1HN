<template>
  <div class="container">
    <el-button @click="print">IN</el-button>
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
          EmployeeEvaluedLst.filter(
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
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column width="100px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Đánh giá" effect="light">
                <el-button type="text" @click="rateEmployee(scope.row)"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Phê duyệt" effect="light">
                <el-button
                  @click="viewRate(scope.row)"
                  type="text"
                  style="color:#02bc77;"
                  ><i class="fas fa-medal"></i></el-button
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
        <el-table-column
          min-width="100px"
          label="Chức vụ"
          prop="Postition"
          sortable
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Chức vụ">
              {{ scope.row.Postition }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100px"
          label="Bộ phận"
          :filters="[
            { text: 'Nghiên cứu Phát triển', value: 'Nghiên cứu Phát triển' },
            { text: 'Kinh doanh PS', value: 'Kinh doanh PS' },
            { text: 'Kinh doanh ETC Hà Nội', value: 'Kinh doanh ETC Hà Nội' },
            { text: 'Kinh doanh Đà Nẵng', value: 'Kinh doanh Đà Nẵng' },
            { text: 'Xưởng sinh phẩm', value: 'Xưởng sinh phẩm' },
            { text: 'Kinh doanh GP', value: 'Kinh doanh GP' },
            {
              text: 'Kinh doanh OTC Miền Bắc',
              value: 'Kinh doanh OTC Miền Bắc'
            },
            { text: 'Kinh doanh Hồ Chí Minh', value: 'Kinh doanh Hồ Chí Minh' },
            { text: 'Kế hoạch', value: 'Kế hoạch' },
            { text: 'IT', value: 'IT' },
            {
              text: 'Truyền thông - Marketing',
              value: 'Truyền thông - Marketing'
            },
            { text: 'Kế toán - CN Hà Nội', value: 'Kế toán - CN Hà Nội' }
          ]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Bộ phận">
              {{ scope.row.Department }}
            </div>
          </template>
        </el-table-column>

        <el-table-column width="180px" label="Ngày vào làm">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày vào làm">
              {{ Date.parse(scope.row.DateStartWork).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="150px"
          label="Tuổi nghề"
          prop="WorkOld"
          sortable
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Tuổi nghề">
              {{ scope.row.WorkOld.toString().replace(0, "Thử việc") }}
              <span class="st-icon-pandora" v-if="scope.row.WorkOld != 0"
                >tháng</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div v-else class="blank-table">Vui lòng chọn loại nhân viên</div> -->
    <el-dialog :visible.sync="dialogFormRate" custom-class="medium-modal">
      <create-evaluate
        :employee="rowData"
        @RateOK="RateOK"
        :typeEvaluate="TypeEvaluate"
      ></create-evaluate>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormView" custom-class="fullscreen-modal">
      <span slot="title" style="font-weight:700;color: #0277bc;font-size: 20pt;"
        >&#32;&#32;Kết quả đánh giá nhân viên&#32;{{ rowData1.EmployeeName }}
      </span>
      <view-evaluate :employee="rowData1" @Approved="Approved"></view-evaluate>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormPrint">
      <print></print>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import print from "../component/print";
import { GetEmployeeEvalued } from "@/api/NSCriteriaDefine";
import { getStartDate, getEndDate } from "@/api/index";
import CreateEvaluate from "@/views/evaluateUser/component/createEvaluate";
import ViewEvaluate from "@/views/evaluateUser/component/viewEvaluate";
import { GetCriteriaHeaderByEmId } from "@/api/NSCriteriaEmployee";
export default {
  components: {
    CreateEvaluate,
    ViewEvaluate,
    print
  },
  data() {
    return {
      search: "",
      show: "",
      TypeEvaluate: "TV",
      EmployeeEvaluedLst: [],
      show: false,
      listLoading: false,
      dialogFormRate: false,
      dialogFormView: false,
      dialogFormLst: false,
      downloading: false,
      dialogFormPrint: false,
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
          label: "Định kỳ"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ]
    };
  },
  methods: {
    print() {
      this.dialogFormPrint = true;
    },
    fetchData() {
      this.listLoading = true;
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TypeEvaluate: this.TypeEvaluate
      };
      GetEmployeeEvalued(req).then(res => {
        if (res.RespCode == 0) {
          this.EmployeeEvaluedLst = res.EmployeeEvaluedLst;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    rateEmployee(row) {
      this.dialogFormRate = true;
      this.rowData = row;
    },
    RateOK() {
      this.dialogFormRate = false;
    },
    viewRate(row) {
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        EmployeeID: row.EmployeeID,
        WorkOld: row.WorkOld,
        TypeEvaluate: this.TypeEvaluate
      };
      GetCriteriaHeaderByEmId(req).then(res => {
        if (res.RespCode == 0) {
          if (res.CriteriaHeaderInfo.CriteriaLineLst.length > 0) {
            this.dialogFormView = true;
            this.rowData1 = row;
          } else {
            this.$message({
              message: "Nhân viên chưa được đánh giá",
              type: "warning"
            });
          }
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
    Approved() {
      this.dialogFormView = false;
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
