<template>
  <div>
    <div class="container">
      <el-form ref="form" label-position="top" label-width="200px" size="mini">
        <el-form-item>
          <el-table
            class="el-mobile-table"
            border
            ref="multipleTable"
            v-loading="listLoading"
            style="width: 100%"
            :data="ReportDefineLst"
            fit
            :filtered-value="this.report"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="Parameter"
              label="Mã"
              align="center"
              width="60"
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
                  {{ props.row.EmployeeID }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <div style="padding:5px;text-align:right">
          <el-form-item size="large">
            <el-button type="info" @click="cancelup">Hủy</el-button>
            <el-button type="success" @click="onSubmit" icon="fas fa-plus"
              >Thêm báo cáo</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import WorkReport from "@/views/manufacturing/reportProduct/component/workReport"
import createQuota from "@/views/manufacturing/quota/component/createQuota"
import viewReport from "@/views/manufacturing/reportProduct/component/viewReport"
import {
  GetReportByDate,
  GetReportDefine,
  GetReportDefineById
} from "@/api/productionReport"
import {
  GetProductionOrder,
  GetQuotaProductionReport,
  AddProductionOrderReport,
  GetProductionOrderReportLst
} from "@/api/productionOrder"
import Cookies from "js-cookie"
import { getStartDate, getEndDate } from "@/api/index"
import { setTimeout } from "timers"
export default {
  components: { WorkReport, viewReport, createQuota },
  props: ["quota", "report"],
  data() {
    return {
      ReportLst: [],
      ReportDefine: [],
      ReportDefineLst: "",
      Report: [],
      ReportDefineIDLst: "",
      listLoading: false,
      DateStart: getStartDate(),
      DateEnd: getEndDate()
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.ReportDefine = val
    },
    handleCurrentChange(val) {
      val = this.report
    },
    onSubmit() {
      var reportLst = ""
      this.ReportDefine.forEach(fun)
      function fun(item, index, arr) {
        if (index == 0) {
          reportLst += item.ReportDefineID
        } else {
          reportLst += ";" + item.ReportDefineID
        }
      }
      AddProductionOrderReport({
        token: Cookies.get("token"),
        ProductionOrderID: this.quota.ProductionOrderID,
        ReportDefineIDLst: reportLst
      }).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Thêm báo cáo thành công",
            type: "success"
          })
          this.$emit("addReportOK")
        }
      })
    },
    cancelup() {
      this.$emit("cancelOK")
    },
    submitOK() {
      this.dialogFormWorkReport = false
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      GetReportDefine({
        token: Cookies.get("token")
      }).then(response => {
        if (response.RespCode == 0) {
          this.ReportDefineLst = response.ReportDefineLst
          this.listLoading = false
        }
      })
      
    },
    fetchData2() {
      this.$refs.multipleTable.clearSelection()
      if (this.report) {
        var _this = this
        setTimeout(function() {
          _this.report.forEach(row => {
            
            var _this2 = _this
            _this.ReportDefineLst.forEach(function(item, index, arr) {
              if (item.ReportDefineID==row) {
                _this2.$refs.multipleTable.toggleRowSelection(
                  _this2.ReportDefineLst[index],
                  true
                )
              }
            })
          })
        }, 1000)
       } 
      else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  },
  mounted() {
    this.fetchData2()
  },

  created() {
    this.fetchData()
  },
  watch: {
    quota(){
      this.fetchData2()
    }
  }
}
</script>

<style lang="scss">
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
