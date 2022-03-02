<template>
  <div>
    <el-form
      ref="form"
      :model="ReportDefineLst"
      label-position="top"
      label-width="200px"
      size="mini"
    >
      <div style="margin-bottom:20px;">
        <span style="font-weight: bold;">Báo cáo:</span>
        {{ report.ReportName }}
      </div>
      <el-form-item size="large">
        <el-button
          type="danger"
          v-if="report != null"
          @click="onSubmit"
          icon="el-icon-delete"
          >Xóa báo cáo</el-button
        >
        <el-button @click="cancelde">Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { DelReportDefineHeader } from "@/api/productionReport"
import Cookies from "js-cookie"
export default {
  props: ["report"],
  created() {},
  data() {
    return {
      ReportDefineLst: {
        ReportDefineID: "",
        EmployeeID: "",
        ReportName: "",
        Email: ""
      }
    }
  },
  methods: {
    onSubmit() {
      var rep = {
        token: Cookies.get("token"),
        ReportDefineID: this.report.ReportDefineID
      }
      DelReportDefineHeader(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Xóa header báo cáo thành công",
            type: "success"
          })
          this.$emit("delreportOK", this.ReportDefineLst)
        }
      })
    },
    cancelde() {
      this.$emit("deletecancelOK")
    }
  }
}
</script>
