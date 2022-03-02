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
    <div style="padding:10px 0px;">
  <div style="color:#409EFF;">
    <strong>Danh sách báo cáo: 
     <span>{{this.nameReport}}</span> 
     <span>từ ngày {{Date.parse(this.DateStart).toString("dd/MM/yyyy")}}</span>
     <span>đến ngày {{Date.parse(this.DateEnd).toString("dd/MM/yyyy")}}</span>
    </strong>
  </div>
  <div style="text-align:right">
    <el-button
    :loading="downloading"
      size="mini"
      type="success"
      @click="ExportExcel()"
    >
      <i class="fas fa-file-excel"></i> Export</el-button
    >
  </div>
  </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ReportDefineLst"
      style="width: 100%"
      border
      fit
      highlight-current-row
    >
      <el-table-column width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Đọc báo cáo" placement="top">
              <el-button type="text" @click="viewDetail(scope.row)">
                <i class="far fa-eye"></i>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="right" width="150">
                <template slot-scope="scope">
                  <div class="dat-cell" label="Trạng thái">
                    <el-tag :type="scope.row.Status | missionStatusColor">
                      {{ scope.row.Status | missionStatusText }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
      <el-table-column min-width="180px" label="Lệnh sản xuất">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lệnh sản xuất">
            {{ scope.row.OrderProductionIdBFO }}
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
      <el-table-column label="Thời gian tạo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{ scope.row.Time }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Chi tiết báo cáo" :visible.sync="dialogFormDetailReport">
      <view-report :Quota='rowData' :Rtype='""'></view-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import { GetReportByReportDefineIdAndDate } from "@/api/productionReport"
import { getStartDate, getEndDate } from "@/api/index"
import { parseTime } from "@/utils"
export default {
  components: {
    viewReport
  },
  data() {
    return {
      ReportDefineLst: [],
      ProductionOrderID: "",
      ReportType: "",
      dialogFormDetailReport: false,
      listLoading: false,
      rowData: "",
      value: "",
      downloading:false,
      OrderProductionIdBFO:'',
      nameReport:'',
      DateStart: getStartDate(),
      DateEnd:getEndDate()
    }
  },
  methods: {
    fetchData() {
      var a = []
      this.listLoading = true
      GetReportByReportDefineIdAndDate({
        token: Cookies.get("token"),
        ReportDefineID:this.value,
        DateStart: this.DateStart,
        DateEnd:this.DateEnd
      }).then(res => {
        if (res.RespCode == 0) {
          var _this=this
          this.nameReport = res.ReportLst[0].ReportName
          var a=[]
          res.ReportLst.forEach(function(item, index, arr) {
            
            var item2 = {
              EmployeeName: item.EmployeeName,
              ReportDefineID: item.ReportDefineID,
              OrderProductionIdBFO:item.OrderProductionIdBFO,
              ReportName: item.ReportName,
              LineAnswerLst:item.LineAnswerLst,
              Status: item.Status,
              Time: item.Time
            }
            a.push(item2)
          })
            this.ReportDefineLst = a
          
        }
      })
      this.listLoading = false
    },
    viewDetail(row) {
      this.rowData = row
      this.dialogFormDetailReport = true
    },
    tabletoExcel(){
      this.$notify({
        title: 'Sorry',
        message:'Tính năng này đang được phát triển',
        type:'info',
        position:'top-left'
      })
    },
     ExportExcel() {
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
        ReportDefineId: this.value
      }).then(response => {
        var data = response.ReportLst
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách báo cáo"+': '+this.nameReport+' từ ngày '+parseTime(this.DateStart,'{d}-{m}-{y}').substring(0,10)+' đến ngày '+parseTime(this.DateEnd,'{d}-{m}-{y}'), //Optional
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
    this.value = this.$route.params.string
    this.fetchData()
  },
  watch:{
    value(){
      this.fetchData()
    },
    DateStart(){
      this.fetchData()
    },
    DateEnd(){
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
