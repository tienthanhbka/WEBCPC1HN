<template>
  <div class="container">
    <!-- <div class="inline-block">
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
    </div> -->
    <el-row>
      <div class="inline-block">
        <el-date-picker
          v-model="startDate"
          size="small"
          type="date"
          placeholder="Từ ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-date-picker
          v-model="endDate"
          size="small"
          type="date"
          placeholder="Đến ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          size="small"
          :loading="downloading"
          style="background-color:#02bc77;color:white;"
          icon="far fa-file-excel"
          @click="ExportExcel"
        >
          Xuất Excel</el-button
        >
      </div>
      <div class="inline-block" style="float:right;">
        <div class="inline-block">
          <p style="font-size:10pt;font-weight:600;color:#d80d0d">
            Số lượng: {{ currentTableData.length }}/{{ tableData.length }}
          </p>
        </div>
      </div>
    </el-row>
    <el-row>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="Branch"
          @change="getOffice"
          placeholder="Chọn chi nhánh"
          clearable
        >
          <el-option
            v-for="(item, index) in branchLst"
            :key="index"
            :label="item.Branch"
            :value="item.Branch"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="Office"
          @change="getPosition"
          placeholder="Chọn bộ phận"
          clearable
        >
          <el-option
            v-for="(item, index) in officeLst"
            :key="index"
            :label="item.Office"
            :value="item.Office"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <div class="inline-block">
        <el-select v-model="Position" placeholder="Chọn chức vụ" clearable>
          <el-option
            v-for="(item, index) in positionLst"
            :key="index"
            :label="item.Position"
            :value="item.Position"
          >
          </el-option>
        </el-select>
      </div> -->
      <div class="inline-block">
        <el-input
          size="small"
          placeholder="Tìm kiếm nhân viên..."
          v-model="search"
        >
        </el-input>
      </div>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="TypeEvaluate"
          placeholder="Chọn loại đánh giá"
          @change="changeType"
          clearable
        >
          <el-option
            v-for="item in TypeLst"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-button
          icon="el-icon-search"
          class="inline-block"
          @click="fetchData"
          circle
        ></el-button>
      </div>
    </el-row>

    <div class="body">
      <el-table
        size="small"
        class="el-mobile-table"
        :data="currentTableData"
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
        <el-table-column width="80px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <!-- <el-tooltip content="Chi tiết" effect="light">
                <el-button type="text" @click="ViewDetail(scope.row)"
                  ><i class="fas fa-eye"></i></el-button
              ></el-tooltip> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="230px" label="Nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              <span v-if="scope.row.EmployeeCode"
                >[{{ scope.row.EmployeeCode }}]
              </span>
              {{ scope.row.EmployeeName }}
              <span v-if="scope.row.Auto == 0">
                <el-tooltip content="Phiếu đánh giá đặc biệt" effect="light">
                  <i class="el-icon-info"></i></el-tooltip
              ></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200px" label="Vị trí việc làm">
          <template slot-scope="scope">
            <div class="dat-cell" label="Vị trí việc làm">
              <!-- <span v-if="scope.row.EmployeeCode"
                >[{{ scope.row.EmployeeCode }}]-</span
              >
              {{ scope.row.EmployeeName }} -->
              {{ scope.row.Position }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column width="180px" label="Chi nhánh">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chi nhánh">
              {{ scope.row.Branch }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column width="120px" label="Loại đánh giá">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại đánh giá">
              {{ scope.row.TypeEvaluate | typeEval }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="Thời hạn">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời hạn">
              <!-- <span v-if="scope.row.EmployeeCode"
                >[{{ scope.row.EmployeeCode }}]-</span
              >
              {{ scope.row.EmployeeName }} -->
              {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="190px" label="Ghi chú/ Kết luận">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú/ Kết luận">
              {{ scope.row.Comment }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column width="120px" label="Mã nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã nhân viên">
              {{ scope.row.EmployeeCode }}
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column width="120px" label="Tuổi nghề">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tuổi nghề">
              {{ scope.row.WorkOld.toString().replace(0, "Thử việc")
              }}<span class="st-icon-pandora" v-if="scope.row.WorkOld">
                tháng</span
              >
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
        <el-table-column min-width="100px" label="Người đánh giá">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người đánh giá">
              {{ scope.row.ApproveID }}
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column min-width="100px" label="Thời gian ĐG">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian ĐG">
              {{
                Date.parse(scope.row.TimeApprove).toString("HH:ss dd/MM/yyyy")
              }}
            </div>
          </template>
        </el-table-column> -->
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
        <el-table-column width="200px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <el-button-group>
                <el-button type="primary" size="mini" @click="print(scope.row)"
                  >In phiếu</el-button
                >
                <el-popover
                  placement="bottom"
                  width="250"
                  trigger="click"
                  v-if="modeAdmin"
                >
                  <el-input
                    size="small"
                    placeholder="Ghi chú..."
                    v-model="comment"
                    type="textarea"
                  ></el-input>
                  <div style="margin-top:5px">
                    <el-tooltip content="Không đạt" effect="light">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="approve(scope.row, 2)"
                        icon="el-icon-circle-close"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Đạt" effect="light">
                      <el-button
                        size="mini"
                        @click="approve(scope.row, 3)"
                        type="success"
                        icon="el-icon-circle-check"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="GĐ duyệt" effect="light">
                      <el-button
                        style="float:right"
                        size="mini"
                        @click="approve(scope.row, 5)"
                        type="primary"
                        icon="el-icon-circle-check"
                        >GĐ</el-button
                      >
                    </el-tooltip>
                  </div>
                  <el-button size="mini" type="success" slot="reference"
                    >Xác nhận</el-button
                  >
                </el-popover>
              </el-button-group>
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
        :typeEvaluate="TypeEvaluate"
      ></evaluate-view>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormPrint" custom-class="print-modal">
      <print-doc :employee="rowData"></print-doc>
    </el-dialog>
    <el-pagination
      class="pagination"
      :total="tableData.length"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { GetEmployeeEvalued } from "@/api/NSCriteriaDefine";
import { getStartDate, getEndDate } from "@/api/index";
import { getStartMonth, getEndMonth } from "@/api/index";
import PrintEvaluate from "@/views/evaluateUser/component/printEvaluate";
import EvaluateView from "../component/EvaluateView";
import PrintDoc from "../component/printDoc";
import { GetBranch, GetOffice, GetPosition } from "@/api/employeeInfor";
import {
  GetCriteriaHeader,
  ApproveCriteriaEmployee,
  GetCriteriaHeaderByEmId
} from "@/api/NSCriteriaEmployee";
export default {
  components: {
    PrintEvaluate,
    EvaluateView,
    PrintDoc
  },
  filters: {
    toStatusText(val) {
      if (val == 1) {
        return "Chưa phê duyệt";
      } else if (val == 2) {
        return "KHÔNG ĐẠT";
      } else if (val == 3) {
        return "ĐẠT";
      } else if (val == 5) {
        return "GĐ duyệt";
      }
    },
    toStatusColor(val) {
      if (val == 1) {
        return "info";
      } else if (val == 2) {
        return "danger";
      } else if (val == 3 || val == 5) {
        return "success";
      }
    },
    typeEval(type) {
      // console.log(type);
      if (type == "TV") {
        return "Thử việc";
      } else if (type == "CT") {
        return "Định kỳ";
      } else if (type == "BN") {
        return "Bổ nhiệm";
      }
    }
  },
  data() {
    return {
      search: "",
      show: "",
      pageSize: 10,
      currentPage: 1,
      downloading: false,
      startDate: getStartMonth(),
      endDate: getEndMonth(),
      TypeEvaluate: "TV",
      CriteriaHeaderLst: [],
      currentTableData: [],
      tableData: [],
      branchLst: [],
      Branch: "",
      Office: "",
      officeLst: [],
      CriteriaHeaderInfo: "",
      dialogFormView: false,
      dialogFormPrint: false,
      modeAdmin: false,
      rowData: "",
      comment: "",
      typeOTC: Cookies.get("otc"),
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
    fetchResult() {
      this.listLoading = true;
      var req = {
        TypeEvaluate: this.TypeEvaluate,
        TimeStart: this.startDate,
        TimeEnd: this.endDate
      };
      GetCriteriaHeader(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.CriteriaHeaderLst;
          this.listLoading = false;
          this.fetchData();
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
    print(val) {
      //this.dialogFormView = true;
      this.dialogFormPrint = true;
      this.rowData = val;
    },
    approve(row, result) {
      const req = {
        EmployeeID: row.EmployeeID,
        DocumentID: row.DocumentID,
        Comment: this.comment,
        Qualified: result
      };
      if (!this.comment) {
        req.Comment = row.Comment;
      }
      ApproveCriteriaEmployee(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Phê duyệt thành công",
            type: "success"
          });
          this.fetchResult();
        }
      });
    },
    fetchData() {
      //(this.Branch, this.Office);
      if (!this.Branch && !this.Office) {
        this.currentTableData = this.tableData
          .filter(o => {
            return o.EmployeeName.toLowerCase().includes(
              this.search.toLowerCase()
            );
          })
          .slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
      } else {
        this.currentTableData = this.tableData
          .filter(o => {
            return (
              o.Branch == this.Branch &&
              o.Department == this.Office &&
              o.EmployeeName.toLowerCase().includes(this.search.toLowerCase())
            );
          })
          .slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
      }
    },
    changeType() {},
    getOffice() {
      this.Office = null;
      this.Position = null;
      GetOffice({ Branch: this.Branch }).then(res => {
        this.officeLst = res.Data;
      });
    },
    getPosition() {
      this.Position = null;
      GetPosition({ Office: this.Office, Branch: this.Branch }).then(res => {
        this.positionLst = res.Data;
      });
    }
  },
  created() {
    this.fetchResult();
    GetBranch().then(res => {
      this.branchLst = res.Data;
    });
    if (this.typeOTC == 10 || this.typeOTC == 28) {
      this.modeAdmin = true;
    }
  },
  watch: {
    TypeEvaluate() {
      this.fetchResult();
    },
    startDate: function() {
      this.fetchResult();
    },
    endDate: function() {
      this.fetchResult();
    },
    search() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    pageSize: function() {
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
<style lang="scss">
.print-modal {
  width: 210mm !important;
  max-width: 98%;
  margin-top: 5px !important;

  .print-modal .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
