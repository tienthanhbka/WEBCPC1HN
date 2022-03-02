<template>
  <div>
    <div class="container">
      <div class="inline-block">
        <span></span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateStart"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <el-input
          placeholder="Tìm kiếm.."
          v-model="TextSearch"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="fetchData"
          ></el-button>
        </el-input>
      </div>

      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="inline-block"
        @click="fetchData2"
      ></el-button>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="ProductionOrderLst"
        style="width: 100%"
        border
        fit
        highlight-current-row
        @expand-change="expand"
        stripe
      >
        <el-table-column min-width="100" type="expand">
          <template slot-scope="scope">
            <!-- <template>
              <div>
                <el-button
                  size="mini"
                  style="margin-bottom: 5px;"
                  type="success"
                  @click="tabletoExcel('tblData', 'OKR')"
                >
                  <i class="fas fa-file-excel"></i> Export</el-button
                >
              </div>
            </template> -->
            <el-tooltip content="Thêm báo cáo" placement="top">
                <el-button @click="addReport(scope.row)" style="position:absolute;left:0; color: red;
            padding: 16px 18px;" ><i class="fas fa-plus"></i></el-button>
                </el-tooltip>
            <el-table
              class="el-mobile-table"
              border
              v-loading="listLoading1"
              style="width: 100%"
              :data="scope.row.lines"
              fit
              highlight-current-row
            >
              <el-table-column width="75px">
                <template slot-scope="props">
                  <el-tooltip content="Tạo định mức" placement="top">
                    <el-button
                      type="text"
                      @click="CreateQuota(scope.row, props.row)"
                    >
                      <i class="el-icon-first-aid-kit"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Chỉnh sửa định mức" placement="top">
                    <el-button
                    style="color: #E6A23C"
                      type="text"
                      @click="UpdateQuota(scope.row, props.row)"
                    >
                      <i class="el-icon-edit-outline"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="Parameter"
                label="Mã báo cáo"
                align="center"
              >
                <template slot-scope="props">
                  <div class="dat-cell" label="Mã báo cáo">
                    {{ props.row.ReportDefineID }}
                  </div>
                </template>
              </el-table-column>

              <el-table-column prop="Type" label="Tên báo cáo" align="center">
                <template slot-scope="props">
                  <div class="dat-cell" label="Tên báo cáo">
                    {{ props.row.ReportName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="OptionAnswer"
                label="Người tạo"
                align="center"
              >
                <template slot-scope="props">
                  <div class="dat-cell" label="Người tạo">
                    {{ props.row.EmployeeName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="OptionAnswer"
                label="Thời gian tạo"
                align="center"
              >
                <template slot-scope="props">
                  <div class="dat-cell" label="Thời gian tạo">
                    {{ props.row.Time }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="155px" label="Lệnh SX">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lệnh SX">
              {{ scope.row.ProductionOrderIDBFO }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Sản phẩm" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">{{ scope.row.Product }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Lô sản xuất" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lô sản xuất">
              {{ scope.row.ProductionBatch }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số lượng">
              {{ scope.row.Quantity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày bắt đầu" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày bắt đầu">
              <i class="el-icon-time"></i>
              <span style="margin-left:5px;">{{
                Date.parse(scope.row.DateStart).toString("dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày kết thúc" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày kết thúc">
              <i class="el-icon-time"></i>
              <span style="margin-left:5px;">{{
                Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>
       
      </el-table>
      <el-dialog
        title="Thêm báo cáo cho lệnh SX"
        :visible.sync="dialogFormAddReport"
      >
        <get-report
          :quota="data"
          :report="ReportLst"
          @addReportOK="addReportOK"
          @cancelOK="cancelOK"
        ></get-report>
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>
      <el-dialog title="Chi tiết báo cáo" :visible.sync="dialogFormViewReport">
        <view-report :Rtype="data"></view-report>
      </el-dialog>
      <el-dialog
        title="Tạo/Chỉnh sửa định mức cho báo cáo"
        :visible.sync="dialogFormWorkReport"
      >
        <create-quota
          :quota1="data1"
          :report="data2"
          :Quota="QuotaLst"
          @submitOK="submitOK"
          @UpdateOK="updateOK"
        ></create-quota>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import WorkReport from "@/views/manufacturing/reportProduct/component/workReport"
import createQuota from "@/views/manufacturing/quota/component/createQuota"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import getReport from "@/views/manufacturing/quota/component/getReport"
import {
  GetReportByDate,
  GetReportDefine,
  GetReportDefineById
} from "@/api/productionReport"
import {
  GetProductionOrder,
  GetQuotaProductionReport,
  GetProductionOrderReportLst
} from "@/api/productionOrder"
import Cookies from "js-cookie"
import { getStartDate, getEndDate } from "@/api/index"
export default {
  components: { WorkReport, viewReport, createQuota, getReport },
  data() {
    return {
      ReportLst: [],
      ReportDefineLst: [],
      ReportDefine: [],
      ReportName: "",
      obj: "",
      dialogFormAddReport: false,
      dialogFormWorkReport: false,
      dialogFormViewReport: false,
      listLoading: false,
      listLoading1: false,
      ProductionOrderID: "",
      ProductionOrderLst: [],
      QuotaLst: "",
      DateOrder: "",
      TextSearch: "",
      ReportType: "",
      data1: "",
      data2: "",
      data: "",
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      rowData: "",
      value: ""
    }
  },
  methods: {
    createReport() {
      this.dialogFormCreateReport = true
    },
    addReport(row) {
      this.data = row
      GetProductionOrderReportLst({
        token: Cookies.get("token"),
        ProductionOrderID: row.ProductionOrderID
      }).then(res => {
        this.reportOrder = res.ProductionOrderReportLst
        if (this.reportOrder != "") {
          var _this = this
          var a=[]
          _this.ReportLst=[]
          _this.reportOrder.split(";").forEach(function(item, index, arr) {
            var req = {
              token: Cookies.get("token"),
              ReportDefineID: item
            }
            GetReportDefineById(req).then(response1 => {
              if (response1.RespCode == 0) {
                a.push(response1.ReportDefineInfo.ReportDefineID)
              }
            })
          })
          this.ReportLst = a
        }
        else{
          this.ReportLst=null
        }
      })
      this.dialogFormAddReport = true
    },
    viewReport(row) {
      this.data = row
      this.dialogFormViewReport = true
    },
    addReportOK() {
      this.dialogFormAddReport = false
    },
    updateOK() {
      this.dialogFormWorkReport = false
    },
    Copy() {
      this.$notify({
        title: "Sorry",
        message: "Tính năng này đang được phát triển",
        type: "info",
        position: "top-left"
      })
    },
    tabletoExcel() {
      this.$notify({
        title: "Sorry",
        message: "Tính năng này đang được phát triển",
        type: "info",
        position: "top-left"
      })
    },
    cancelOK() {
      this.dialogFormAddReport = false
    },
    CreateQuota(row1, row2) {
      GetQuotaProductionReport({
        token: Cookies.get("token"),
        ProductionOrderID: row1.ProductionOrderID,
        ReportID: row2.ReportDefineID
      }).then(res => {
        if (res.LineQuotaLst[0] != null) {
          this.$message({
            message: "Báo cáo đã được tạo định mức",
            type: "warning"
          })
        } else {
          this.QuotaLst = null
          this.data2 = row2
          this.data1 = row1
          this.dialogFormWorkReport = true
        }
      })
    },
    UpdateQuota(row1, row2) {
      GetQuotaProductionReport({
        token: Cookies.get("token"),
        ProductionOrderID: row1.ProductionOrderID,
        ReportID: row2.ReportDefineID
      }).then(res => {
        if (res.LineQuotaLst[0] == null) {
          this.$message({
            message: "Báo cáo chưa được tạo định mức",
            type: "warning"
          })
        } else {
          this.dialogFormWorkReport = true
          this.QuotaLst = res.LineQuotaLst
          this.data2 = row2
          this.data1 = row1
        }
      })
    },

    submitOK() {
      this.dialogFormWorkReport = false
    },
    fetchData() {
      this.listLoading = true
      var req2 = {
        token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        Search: this.TextSearch
      }
      GetProductionOrder(req2).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderLst = res.ProductionOrderLst
          this.listLoading = false
        }
      })
    },
    fetchData2() {
      this.TextSearch=''
      this.listLoading = true
      var req = {
        token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        Search: ""
      }
      GetProductionOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderLst = res.ProductionOrderLst
          this.listLoading = false
        }
      })
    },
    expand(row) {
      this.listLoading1 = true
      GetProductionOrderReportLst({
        token: Cookies.get("token"),
        ProductionOrderID: row.ProductionOrderID
      }).then(response => {
        if (response.RespCode == 0) {
          this.ReportDefine = response.ProductionOrderReportLst
          if (this.ReportDefine != "") {
            var a = []
            this.ReportDefine.split(";").forEach(function(item, index, arr) {
              var req = {
                token: Cookies.get("token"),
                ReportDefineID: item
              }
              GetReportDefineById(req).then(response => {
                if (response.RespCode == 0) {
                  a.push(response.ReportDefineInfo)
                }
              })
            })
            row.lines = a
          }
          this.listLoading1 = false
        }
      })
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    DateStart: function() {
      this.fetchData()
    },
    DateEnd: function() {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;

  .header-container {
    display: inline-block;
    margin-bottom: 5px;
  }

  .table-pagination {
    margin-top: 10px;
  }
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
.border .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
  width: 90%;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
