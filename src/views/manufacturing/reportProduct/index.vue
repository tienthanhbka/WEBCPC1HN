<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker
        v-model="DateStart"
        type="date"
        placeholder="Từ ngày"
        default-value="2020-01-01"
        style="width:133px;"
      >
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-date-picker
        v-model="DateEnd"
        type="date"
        placeholder="Đến ngày"
        default-value="2030-10-01"
        style="width:133px;"
      >
      </el-date-picker>
    </div>
    
  
    <div class="inline-block">
      <el-input
        placeholder="Tìm kiếm"
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
     <div class="inline-block">
      <el-button @click="scanQR" type="info" icon="fas fa-qrcode"
        >&#32;Soạn báo cáo
      </el-button>
    </div>
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
            >
            <el-table-column width="40px" >
              <template slot-scope="props">
                <div class="dat-cell" >
                  <router-link :to="'/san-xuat/soan-bao-cao/ma-qr/'+props.row.ReportDefineID+'/'+scope.row.ProductionOrderID"><el-button type="text"><i class="fas fa-qrcode"></i></el-button></router-link>
                </div>
              </template>
            </el-table-column>
              <el-table-column width="75px">
                <template slot-scope="props">
                  <el-tooltip content="Báo cáo" placement="top">
                    <el-button
                      type="text"
                      @click="onSubmit(scope.row, props.row)"
                    >
                      <i class="el-icon-first-aid-kit"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="Trạng thái" align="right" width="110">
                <template slot-scope="props">
                  <div class="dat-cell" label="Trạng thái">
                    <el-tag :type="props.row.Status | missionStatusColor">
                      {{ props.row.Status | missionStatusText }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Type"
                label="Mã"
                align="center"
                width="70px"
              >
                <template slot-scope="props">
                  <div class="dat-cell" label="Mã">
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
      <view-report :Rtype="data"></view-report>
    </el-dialog>
    <el-dialog :visible.sync="formReportQR" title="Quét mã QR">
      <scan-q-r :id='data3' @answer="stringQR"></scan-q-r>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import WorkReport from "@/views/manufacturing/reportProduct/component/workReport"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import scanQR from "@/views/manufacturing/reportProduct/component/scanQR"
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
  components: { WorkReport, viewReport,scanQR },
  data() {
    return {
      ReportLst: [],
      ReportDefineLst: [],
      ReportName: "",
      ReportDefine: [],
      dialogFormCreateReport: false,
      dialogFormWorkReport: false,
      dialogFormViewReport: false,
      formReportQR:false,
      ProductionOrderID: "",
      ProductionOrderLst: [],
      listLoading: false,
      listLoading1: false,
      ProductionOrderID: "",
      ReportType: "",
      data: "",
      QuotaLst: [],
      data2: "",
      data3:'',
      status: "",
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      rowData: "",
      value: "",
      TextSearch: ""
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
                  a.push(response.ReportDefineInfo)
                }
              })
            })
            row.lines = a
          }
          this.listLoading1 = false
        }
      })
    },
    scanQR(){
      this.formReportQR=true
    },
    createReport() {
      this.dialogFormCreateReport = true
    },
    viewReport(row) {
      this.data = row
      this.dialogFormViewReport = true
    },
    onSubmit(a, b) {
      var req = {
        token: Cookies.get("token"),
        ProductionOrderID: a.ProductionOrderID,
        ReportDefineId: b.ReportDefineID
      }
      // GetReportByProductionOrderIdAndReportDefineId(req).then(res => {
      //   if (res.ReportLst[0] == null) {
          GetQuotaProductionReport({
            token: Cookies.get("token"),
            ProductionOrderID: a.ProductionOrderID,
            ReportID: b.ReportDefineID
          }).then(res1 => {
            if (res1.LineQuotaLst[0]) {
              this.QuotaLst = res1.LineQuotaLst
              this.data = b.ReportDefineID
              this.data2 = a.ProductionOrderID
              this.dialogFormWorkReport = true
              
            } else {
              this.$message({
                message: "Báo cáo chưa được tạo định mức",
                type: "warning"
              })
             }
           })
    },
    submitOK() {
      this.dialogFormWorkReport = false
      this.fetchData()
    },
    stringQR(string){
      var b= string.split(';')[1]
      var a= string.split(';')[0]
      var req = {
        token: Cookies.get("token"),
        ProductionOrderID: a,
        ReportDefineId: b
      }
      // GetReportByProductionOrderIdAndReportDefineId(req).then(res => {
      //   if (res.ReportLst[0] == null) {
          GetQuotaProductionReport({
            token: Cookies.get("token"),
            ProductionOrderID: a,
            ReportID: b
          }).then(res1 => {
            if (res1.LineQuotaLst[0]) {
              this.QuotaLst = res1.LineQuotaLst
              this.data = b
              this.data2 = a
              this.dialogFormWorkReport = true
              
            } else {
              this.$message({
                message: "Báo cáo chưa được tạo định mức",
                type: "warning"
              })
             }
           })
           this.formReportQR = false
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
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
