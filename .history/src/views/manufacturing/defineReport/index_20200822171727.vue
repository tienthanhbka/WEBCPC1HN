<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker v-model="DateStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-date-picker v-model="DateEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-button @click="ReportQR" type="info" icon="fas fa-qrcode"
        >&#32;Tìm kiếm
      </el-button>
    </div>
    <div class="inline-block">
      <el-button @click="createReport" type="success" icon="fas fa-plus"
        >&#32;Tạo mẫu báo cáo
      </el-button>
    </div>

    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ReportDefineLst"
      style="width: 100%"
      height="700"
      border
      fit
      highlight-current-row
      stripe
    >
    <el-table-column width="40px" >
        <template slot-scope="scope">
          <div class="dat-cell" >
            <router-link :to="'/san-xuat/bao-cao/ma-qr/'+scope.row.ReportDefineID"><el-button type="text"><i class="fas fa-qrcode"></i></el-button></router-link>
          </div>
        </template>
      </el-table-column>
    
      <el-table-column width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chi tiết" placement="top">
              <el-button type="text" @click="viewDetail(scope.row)">
                <i class="far fa-eye"></i>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="Mã báo cáo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã báo cáo">
            {{ scope.row.ReportDefineID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Tên báo cáo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên báo cáo" style="text-align:left;">
            {{ scope.row.ReportName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" min-width="70">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Email người nhận" min-width="160" >
        <template slot-scope="scope">
          <div class="dat-cell" label="Email người nhận" style="text-align:left;">
            <span v-for="(email, index) in scope.row.Email" :key="index">
              <br />
              <i class="far fa-envelope"></i>
              <span style="margin-left: 5px">{{ email }}</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thời gian tạo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{ scope.row.Time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
              <el-tooltip content="Chỉnh sửa">
                <el-button
                  @click="updateReportHeader(scope.row)"
                  type="text"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top">
                <el-button
                style="color:red;"
                  @click="delHeaderReport(scope.row)"
                  type="text"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Copy">
                <el-button @click="Copy(scope.row)"  type="text" style="color:grey;"
                  ><i
                    class="fas fa-copy
                "
                  ></i></el-button
              ></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog 
    title="Tạo mẫu báo cáo"
    :visible.sync="dialogFormCreateReport"
    center
    >
      <create-report @click="createOK" :report="rowData"></create-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormupdateReportHeader"
    >
      <update-report-header
        :report="rowData3"
        @updateOK="updateOK"
        @cancelUpdate="cancelOK"
      ></update-report-header>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog
      title="Xóa header báo cáo"
      :visible.sync="dialogFormdelReportHeader"
    >
      <del-report-define-header
        :report="rowData"
        @delreportOK="delreportOK"
        @deletecancelOK="deletecancelOK"
      ></del-report-define-header>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Chi tiết báo cáo" :visible.sync="dialogFormDetailReport">
      <view-detail-report :report="rowData2"></view-detail-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Copy báo cáo" :visible.sync="dialogFormCopyDefineReport">
      <copy-define-report :report='rowData4' @copyOK='copyOK'></copy-define-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="formQR" title="Thông tin">
      <q-r :qr='rowData'></q-r>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="formReportQR" title="Quét mã QR">
      <report-qr :date1='rowData' :date2='rowData2' @answer=ok></report-qr>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie"
import ReportQr from "@/views/manufacturing/defineReport/component/reportQR"
import createReport from "@/views/manufacturing/defineReport/component/createDefine"
import updateReportHeader from "@/views/manufacturing/defineReport/component/updateReportDefineHeader"
import delReportDefineHeader from "@/views/manufacturing/defineReport/component/delReportDefineHeader"
import viewDetailReport from "@/views/manufacturing/defineReport/component/viewDetailReport"
import CopyDefineReport from '@/views/manufacturing/defineReport/component/CopyDefineReport'
import { GetReportDefine } from "@/api/productionReport"
import { getStartDate, getEndDate } from "@/api/index"
import QR from "@/views/manufacturing/create/component/QR"
export default {
  components: {
    createReport,
    updateReportHeader,
    delReportDefineHeader,
    viewDetailReport,
    CopyDefineReport,
    QR,
    ReportQr
  },
  data() {
    return {
      ReportDefineLst: [],
      ProductionOrderID: "",
      ReportType: "",
      dialogFormCreateReport: false,
      dialogFormupdateReportHeader: false,
      dialogFormdelReportHeader: false,
      dialogFormDetailReport: false,
      dialogFormCopyDefineReport:false,
      listLoading: false,
      formQR:false,
      formReportQR:false,
      rowData: "",
      rowData2:'',
      rowData3:'',
      rowData4:'',
      value: "",
      DateStart:getStartDate(),
      DateEnd:getEndDate()
    }
  },
  methods: {
    ReportQR(){
      this.rowData = this.DateStart
      this.rowData2 = this.DateEnd
      this.formReportQR = true
    },
    ok(string){
    },
    getQRCode(row){
      this.rowData=row
      this.formQR=true
    },
    createReport() {
      this.rowData = null
      this.dialogFormCreateReport = true
    },
    updateReportHeader(row) {
      this.dialogFormupdateReportHeader= true
      this.rowData3 = row.ReportDefineID
    },
    fetchData() {
      var a = []
      this.listLoading = true
      GetReportDefine({
        token: Cookies.get("token")
      }).then(res => {
        if (res.RespCode == 0) {
          var _this=this
          var a=[]
          res.ReportDefineLst.forEach(function(item, index, arr) {
            var item2 = {
              Email: item.Email.split(";", 100),
              EmployeeID: item.EmployeeID,
              EmployeeName:item.EmployeeName,
              ReportDefineID: item.ReportDefineID,
              ReportName: item.ReportName,
              ReportLineLst: item.ReportLineLst,
              Status: item.Status,
              Time: item.Time
            }
            a.push(item2)
          })
          this.ReportDefineLst =a
          this.listLoading = false
        }
      })
    },
    viewDetail(row) {
      this.rowData2 = row
      this.dialogFormDetailReport = true
    },
    delHeaderReport(row) {
      this.rowData = row
      this.dialogFormdelReportHeader = true
    },
    createOK() {
      this.dialogFormCreateReport = false
      this.fetchData()
    },
    updateOK() {
      this.dialogFormupdateReportHeader = false
      this.fetchData()
    },
    delreportOK() {
      this.dialogFormdelReportHeader = false
      this.fetchData()
    },
    deletecancelOK() {
      this.dialogFormdelReportHeader = false
    },
    cancelOK() {
      this.dialogFormupdateReportHeader = false
    },
    Copy(row) {
      this.dialogFormCopyDefineReport= true
      this.rowData4 = row.ReportDefineID
      // this.$notify({
      //   title: "Sorry",
      //   message: "Tính năng đang được phát triển",
      //   type: "info",
      //   position: "top-left"
      // })
    },
    copyOK(){
      this.dialogFormCopyDefineReport=false
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
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
