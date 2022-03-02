<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker
        v-model="DateStart"
        type="date"
        placeholder="Từ ngày"
        default-value="2020-01-01"
      >
      </el-date-picker>
    </div>
    <div class="inline-block">
      <span class="demonstration">Đến</span>
      <el-date-picker
        v-model="DateEnd"
        type="date"
        placeholder="Đến ngày"
        default-value="2030-10-01"
      >
      </el-date-picker>
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
    >
      <el-table-column min-width="100" type="expand">
        <template slot-scope="scope">
          
          <el-row>
            <el-table
              class="el-mobile-table"
              border
              v-loading="listLoading1"
              style="width: 100%"
              :data="scope.row.lines"
              fit
              highlight-current-row
              @expand-change="expand2"
            >
            <el-table-column min-width="100" type="expand">
        <template slot-scope="props">
          <el-row>
            <el-table
              class="el-mobile-table"
              border
              v-loading="listLoading1"
              style="width: 100%"
              :data="props.row.line"
              fit
              highlight-current-row
            >
            
            <el-table-column width="75px">
                <template slot-scope="scope1">
                  <el-tooltip content="Xem báo cáo" placement="top">
                    <el-button
                      type="text"
                      @click="onSubmit(scope1.row,props.row)"
                    >
                      <i class="el-icon-view"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
               <el-table-column width="75px" label="STT">
              <template slot-scope="scope1">
                  <div class="dat-cell" label="STT">{{ scope1.$index + 1 }}</div>
                </template>
              </el-table-column>
              <el-table-column label="Trạng thái" align="right" width="150">
                <template slot-scope="scope1">
                  <div class="dat-cell" label="Trạng thái">
                    <el-tag :type="scope1.row.Status | missionStatusColor">
                      {{ scope1.row.Status | missionStatusText }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="Type" label="Tên báo cáo" align="center">
                <template slot-scope="scope1">
                  <div class="dat-cell" label="Tên báo cáo">
                    {{ scope1.row.ReportName }}
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="OptionAnswer"
                label="Người tạo"
                align="center"
              >
                <template slot-scope="scope1">
                  <div class="dat-cell" label="Người tạo">
                    {{ scope1.row.EmployeeName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="OptionAnswer"
                label="Thời gian tạo"
                align="center"
              >
                <template slot-scope="scope1">
                  <div class="dat-cell" label="Thời gian tạo">
                    {{ scope1.row.Time }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </template>
      </el-table-column>
               <el-table-column width="110px" label="Mã báo cáo">
                  <template slot-scope="scope1">
                    <div class="dat-cell" label="Mã báo cáo">
                      {{ scope1.row.ReportDefineID }}
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
              
            <el-table-column prop="Type" align="center" width="110px">
                <template slot-scope="props">
              <div>
                <el-button
                :loading="downloading"
                  size="mini"
                  style="margin-bottom: 5px;"
                  type="success"
                  @click="ExportExcel(props.row,scope.row)"
                >
                  <i class="fas fa-file-excel"></i> Export</el-button
                >
              </div>
            </template>
              </el-table-column>
            </el-table>
          </el-row>
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
          <div class="dat-cell" label="Số lượng">{{ scope.row.Quantity }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Bắt đầu BC" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Bắt đầu BC">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{
              Date.parse(scope.row.DateStart).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Kết thúc BC" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Kết thúc BC">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{
              Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Thêm báo cáo" :visible.sync="dialogFormCreateReport">
      <create-report></create-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Soạn báo cáo" :visible.sync="dialogFormWorkReport">
      <work-report
        :Rtype="data"
        :order="data2"
        :quotaLst="QuotaLst"
        @submitOK="submitOK"
      ></work-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Chi tiết báo cáo" :visible.sync="dialogFormViewReport">
      <view-report
        :Rtype="data"
        :Quota="QuotaLst"
        @acceptOK='acceptOK'
      ></view-report>
    </el-dialog>
  </div>
</template>
<script>
import WorkReport from "@/views/manufacturing/reportProduct/component/workReport"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import { parseTime } from "@/utils"
import {
  GetReportByDate,
  GetReportDefine,
  GetReportDefineById
} from "@/api/productionReport"
import {
  GetProductionOrder,
  GetProductionOrderReportLst,
  GetQuotaProductionReport,
  GetReportByProductionOrderIdAndReportDefineId
} from "@/api/productionOrder"
import Cookies from "js-cookie"
import { getStartDate, getEndDate } from "@/api/index"
export default {
  components: { WorkReport, viewReport },
  data() {
    return {
      ReportLst: [],
      ReportDefineLst: [],
      ReportName: "",
      ReportDefine: [],
      dialogFormCreateReport: false,
      dialogFormWorkReport: false,
      dialogFormViewReport: false,
      ProductionOrderID: "",
      ProductionOrderLst: [],
      listLoading: false,
      listLoading1: false,
      ProductionOrderID: "",
      ReportType: "",
      downloading:false,
      data: "",
      QuotaLst: [],
      data2: "",
      status: "",
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      rowData: "",
      TextSearch: "",
      value: ""
    }
  },
  methods: {
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
                  var b={
                    ProductionOrderID: row.ProductionOrderID,
                    ProductionOrderIDBFO: row.ProductionOrderIDBFO,
                    Product: row.Product,
                    Email: response.ReportDefineInfo.Email,
                    EmployeeID: response.ReportDefineInfo.EmployeeID,
                    EmployeeName: response.ReportDefineInfo.EmployeeName,
                    ReportDefineID: response.ReportDefineInfo.ReportDefineID,
                    ReportLineLst: response.ReportDefineInfo.ReportLineLst,
                    ReportName: response.ReportDefineInfo.ReportName,
                    Status: response.ReportDefineInfo.Status,
                    Time: response.ReportDefineInfo.Time,
                  }
                  a.push(b)
                }
              })
            })
            row.lines = a
          }
          this.listLoading1 = false
        }
      })
    },
    expand2(row){
      this.listLoading1=true
      GetReportByProductionOrderIdAndReportDefineId({
        token: Cookies.get("token"),
        ProductionOrderID: row.ProductionOrderID,
        ReportDefineId: row.ReportDefineID
      }).then(res => {
        row.line=res.ReportLst
        this.listLoading1=false
      })
    },
    createReport() {
      this.dialogFormCreateReport = true
    },
    viewReport(row) {
      this.data = row
      this.dialogFormViewReport = true
    },
    onSubmit(row1,row2) {
          this.QuotaLst = row1
          this.data = row2
          this.dialogFormViewReport = true
    },
    submitOK() {
      this.dialogFormWorkReport = false
      this.fetchData()
    },
    acceptOK(){
      this.dialogFormViewReport = false
    },
    fetchData() {
      this.listLoading = true
      var req = {
        token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd
      }
      var req2 = {
        token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        Search: this.TextSearch
      }
      GetReportByDate(req).then(res => {
        if (res.RespCode == 0) {
          this.ReportLst = res.ReportLst
        }
      }),
        GetReportDefine({
          token: Cookies.get("token")
        }).then(response => {
          if (response.RespCode == 0) {
            this.ReportDefineLst = response.ReportDefineLst
          }
        }),
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
    ExportExcel(row, order) {
      this.downloading = true
      const tHeader = [
        "Trạng thái",
        "Lệnh sản xuất",
        "Người tạo",
        "Thời gian tạo"
      ]
      const filterHeader = [
        "Status",
        "OrderProductionIdBFO",
        "EmployeeName",
        "Time"
      ]
      GetReportByProductionOrderIdAndReportDefineId({
         token: Cookies.get("token"),
        ProductionOrderID: order.ProductionOrderID,
        ReportDefineId: row.ReportDefineID
      }).then(response => {
        var data = response.ReportLst
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách báo cáo"+': '+row.ReportName+' từ ngày '+parseTime(this.DateStart,'{d}-{m}-{y}').substring(0,10)+' đến ngày '+parseTime(this.DateEnd,'{d}-{m}-{y}'), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        });
        this.downloading = false
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j])
          }
          // else if(j === 'Deadline'){
          //   return this.$options.filters.toDate(v[j])
          // }
          else {
            return v[j]
          }
        })
      )
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
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
