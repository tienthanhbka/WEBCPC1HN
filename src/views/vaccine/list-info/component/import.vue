<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { CreateVaccineInfoByAdmin } from "@/api/vaccine";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      loadingTable: false,
      downloading: false
    };
  },
  created() {},
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 2048 / 2048 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 2m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      console.log(results);
      this.tableData = [];
      this.loadingTable = true;
      results.forEach(element => {
        var obj = {
          Time: element.Time,
          Line: element.Line,
          TypeGroup: element.TypeGroup,
          EmployeeCode: element.EmployeeCode,
          TypeTest: element.TypeTest,
          Branch: element.Branch,
          Department: element.Department,
          Position: element.Position,
          FullName: element.FullName,
          DateOfBirth: element.DateOfBirth,
          Sex: element.Sex,
          Work: element.Work,
          PhoneNumber: element.PhoneNumber,
          Address:
            element.Add1 +
            "-" +
            element.Add2 +
            "-" +
            element.Add3 +
            "-" +
            element.Add4,
          Note: element.Note,
          Email: element.Email,
          CMND: element.CMND
        };
        this.tableData.push(obj);
      });
      CreateVaccineInfoByAdmin({ VaccineInfoLst: this.tableData }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Check thành công",
            type: "success"
          });
          this.$emit("createOK");
        }
      });
      this.loadingTable = false;
    },
    getPoint(item) {
      const req = {
        EmployeeID: item.MNV,
        TKCompany: item.STK
      };
      UpdateTKCompany(req).then(res => {
        this.success();
      });
    },
    error() {
      this.$message({
        message: "Vui lòng chọn kì học muốn lấy điểm",
        type: "warning"
      });
    },
    success() {
      this.$message({
        message: "Thàn công",
        type: "success"
      });
    }
  }
};
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
.btn-down {
  display: inline-block;
  background: #409eff;
  color: #fff;
  font-size: 10pt;
  border-radius: 5px;
  padding: 8px 10px;
}
</style>
