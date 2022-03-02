<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker v-model="DateStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <span class="demonstration">Đến</span>
      <el-date-picker v-model="DateEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ReportDefineLst"
      style="width: 100%"
      border
      fit
      highlight-current-row
      @expand-change="expand"
    >
    
     <el-table-column min-width="100" type="expand">
        <template slot-scope="props">
            <div style="text-align:right; margin-bottom:10px;">
                <el-button
                :loading='dowloading'
                size="mini"
                type="success"
                @click="ExportExcel(props.row)"
                >
                <i class="fas fa-file-excel"></i> Export</el-button
                >
            </div>
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
              <el-table-column label="Lệnh SX" align="center" width="150">
                <template slot-scope="scope1">
                  <div class="dat-cell" label="Lệnh SX">
                    {{ scope1.row.OrderProductionIdBFO }}
                  </div>
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
      <el-table-column width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
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
            {{ scope.row.EmployeeID }}
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
    </el-table>
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
import Cookies from "js-cookie"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import { GetReportDefine,GetReportByReportDefineIdAndDate } from "@/api/productionReport"
import { getStartDate, getEndDate } from "@/api/index"
import { parseTime } from "@/utils"
import QR from "@/views/manufacturing/create/component/QR"
export default {
  components: {
    viewReport
  },
  data() {
    return {
      ReportDefineLst: [],
      ProductionOrderID: "",
      ReportType: "",
      dialogFormViewReport: false,
      listLoading: false,
      listLoading1:false,
      downloading:false,
      value: "",
      data:'',
      QuotaLst:'',
      DateStart:getStartDate(),
      DateEnd:getEndDate()
    }
  },
  watch:{
      DateStart(){
          this.expand()
      },
      DateEnd(){
          this.expand()
      }
  },
  methods: {
      expand(row){
      this.listLoading1=true
      GetReportByReportDefineIdAndDate({
        token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        ReportDefineId: row.ReportDefineID
      }).then(res => {
        row.line=res.ReportLst
        this.listLoading1=false
      })
    },
    // tabletoExcel(){
    //     this.$message({
    //          message: "Tính năng này đang được phát triển",
    //         type: "info"
    //     })
    // },
    onSubmit(row1,row2) {
          this.QuotaLst = row1
          this.data = row2
          this.dialogFormViewReport = true
    },
    acceptOK(){
      this.dialogFormViewReport = false
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
    ExportExcel(row) {
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
      GetReportByReportDefineIdAndDate({
         token: Cookies.get("token"),
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
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
