<template>
  <div>
    <div style="display:inline-block">
      <input
        ref="excel-upload-input"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      />
      <div
        class="drop"
        @drop="handleDrop"
        @dragover="handleDragover"
        @dragenter="handleDragover"
      >
        Kéo file Excel vào đây hoặc
        <el-button
          :loading="loading"
          style="margin-left:16px;"
          size="mini"
          type="primary"
          @click="handleUpload"
          >Chọn file</el-button
        >
      </div>
    </div>
    <el-button size="mini" @click="uploadFile">
      <span v-if="!uploading">Tải lên</span>
      <span v-show="uploading">
        <i class="el-icon-loading"></i>
        {{ prUpload }}
      </span>
    </el-button>
  </div>
</template>

<script>
import XLSX from "xlsx";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { getToken } from "@/utils/auth";
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function // eslint-disable-line
  },
  data() {
    return {
      uploading: false,
      prUpload: 0,
      File: null,
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    };
  },
  methods: {
    uploadFile() {
      var sef = this;
      this.$confirm(
        `Hệ thống vẫn cố gắng import các dòng dữ liệu bị lỗi (nếu có). 
      Tuy nhiên các giá trị lỗi sẽ bị đưa về mặc định. Vì vậy hãy kiểm tra kĩ dữ liệu trước và sau khi import. Bấm OK để bắt đầu import.`,
        "Thông báo",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        sef.submitFile();
      });
    },
    submitFile() {
      if (this.uploading) return;
      var formData = new FormData();
      this.uploading = true;
      var type = "";
      if (this.$router.currentRoute.path.includes("thau")) {
        type = "TH";
      } else {
        type = "KD";
      }
      formData.append("file", this.File);
      formData.append("token", getToken());
      formData.append("type", type);
      var sef = this;
      axios
        .post(baseUrl + "Debt/UploadPhanBo", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
          // onUploadProgress: function(progressEvent) {
          //   var percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   console.log(percentCompleted);
          //   if (percentCompleted >= 100) {
          //     sef.prUpload = "Đã tải lên thành công, đang import dữ liệu";
          //   } else {
          //     sef.prUpload = percentCompleted + " %";
          //   }
          // }
        })
        .then(res => {
          res = res.data;
          this.uploading = false;
          if (res.ResCode == 0) {
            this.$message({
              message: "Import thành công " + res.Data + " dòng dữ liệu",
              type: "success"
            });
          } else {
            this.$message({
              message: res.ResMes,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.uploading = false;
          this.$message({
            message: "Có lỗi xảy ra",
            type: "error"
          });
        });
    },
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      this.File = rawFile;
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      this.File = rawFile;

      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    }
  }
};
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 277px;
  /* height: 160px; */
  /* line-height: 160px; */
  /* margin: 0 auto; */
  /* font-size: 24px; */
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
