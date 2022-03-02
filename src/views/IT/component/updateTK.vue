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
import { UpdateTKCompany } from "@/api/it";
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
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      console.log(results);
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
