<template>
  <div slot="body">
    <el-form ref="form" label-position="left" class="form-custom" size="mini">
      <el-form-item label="Tiêu đề" label-width="120px">
        <el-input v-model="form.Title" placeholder="Nhập tiêu đề..."></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="TG bắt đầu" label-width="120px">
            <el-date-picker
              style="width:100%"
              v-model="form.TimeStart"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="Từ ngày..."
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="TG kết thúc" label-width="120px">
            <el-date-picker
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.TimeEnd"
              size="small"
              type="datetime"
              placeholder="Đến ngày..."
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Chọn danh sách" label-width="120px">
        <upload-excel-component
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        />
      </el-form-item>
      <div class="view-table" v-if="results.length > 0">
        <el-table
          v-if="results.length > 0"
          :data="results"
          :loading="loading"
          size="small"
          style="width:100%"
          border=""
          fit
          show-header
        >
          <el-table-column align="center" width="100" label="STT">
            <template slot-scope="scope">
              <div class="dat-cell" label="STT">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="150"
            label="Mã nhân viên"
            prop="MaNhanVien"
          >
          </el-table-column>
          <el-table-column
            min-width="180"
            label="Tên nhân viên"
            prop="TenNhanVien"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-form-item label="Ghi chú" label-width="120px">
        <el-input
          v-model="form.Note"
          placeholder="Nhập ghi chú..."
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div style="text-align:center;">
      <el-button
        type="primary"
        icon="fas fa-plus"
        :loading="createLoad"
        @click="create"
      >
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

import { CreateScheduleCheck, DelScheduleCheck } from "@/api/call";
import Cookies from "js-cookie";
export default {
  props: ["row"],
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      form: {
        Title: "",
        TimeStart: "",
        TimeEnd: "",
        Note: "",
        EmployeeCheckLst: [],

        RowID: ""
      },
      loading: false,
      createLoad: false,
      results: [],
      header: []
    };
  },

  methods: {
    beforeUpload(file) {
      this.loading = true;
      this.form.EmployeeCheckLst = [];
      this.results = [];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 2m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.results = results;
      this.loading = false;
      this.form.EmployeeCheckLst = results.map(item => {
        let obj = {
          EmployeeCode: item.MaNhanVien,
          Note: null
        };
        return obj;
      });
    },
    create() {
      this.createLoad = true;
      CreateScheduleCheck({ ScheduleCheckInfo: this.form }).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Tạo lịch thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("addOK");
          this.initData();
          this.createLoad = false;
        }
      });
    },
    initData() {
      (this.form.RowID = ""),
        (this.form.Title = ""),
        (this.form.TimeStart = ""),
        (this.form.TimeEnd = ""),
        (this.form.Note = ""),
        (this.form.EmployeeCheckLst = []),
        (this.results = []);
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.view-table {
  padding: 10px 0;
}
</style>
