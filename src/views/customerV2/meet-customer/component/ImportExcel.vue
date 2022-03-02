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
      <span>Tải lên</span>
    </el-button>
    <span v-if="uploading" style="font-weight:700;color:#02bc77"
      >Upload THÀNH CÔNG<i v-show="uploading" class="el-icon-loading"></i>:{{
        prUpload
      }}
      /{{ excelData.results.length }}</span
    >
    <span
      v-if="errUpload > 0"
      style="font-weight:700;color:#9d0830;margin-left:30px"
    >
      Dữ liệu lỗi :{{ errUpload }}</span
    >
    <!-- <span v-if="complete" style="font-weight:700;color:#02bc77"
      >HOÀN THÀNH ! Vui lòng kiểm tra dữ liệu.</span
    > -->
    <!-- <span
      v-if="uploading"
      style="font-weight:700;color:#0277bc;margin-left:30px"
      >Vui lòng chờ !</span
    > -->
  </div>
</template>

<script>
import XLSX from "xlsx";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { getToken } from "@/utils/auth";
import { GetPlaceByPId, UpdatePlaceByPId } from "@/api/KDPlace";
import { SetMetCustomerByCId } from "@/api/appview";

import Cookies from "js-cookie";
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    modeImport: String
  },
  data() {
    return {
      uploading: false,
      complete: false,
      prUpload: 0,
      errUpload: 0,
      File: null,
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    };
  },
  created() {
    this.uploading = false;
    this.prUpload = 0;
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
      //var formData = new FormData();
      this.uploading = true;
      let processLoading = 0;
      let errorLoading = 0;
      let _this = this;
      _this.excelData.results.forEach((item, index) => {
        if (_this.modeImport == "place") {
          const req = {
            UserName: Cookies.get("idEmployee"),
            Token: Cookies.get("token"),
            UserCode: Cookies.get("idEmployee"),
            PlaceId: item["Mã TC"]
          };
          let obj = {
            Frequency: item["Tần suất viếng thăm"],
            NoteEm: item["Ghi chú"]
          };
          if (obj.Frequency > 0) {
            //console.log("a");
            GetPlaceByPId(req).then(res => {
              if (res.RespCode === 0) {
                Object.assign(res.PlaceInfo, obj);

                var req = {
                  Token: Cookies.get("token"),
                  UserName: Cookies.get("idEmployee"),
                  PlaceInfo: Object.assign(res.PlaceInfo, obj)
                };
                UpdatePlaceByPId(req).then(res => {
                  if (res.RespCode == 0) {
                    processLoading++;
                    // console.log(processLoading);
                    _this.prUpload = processLoading;
                  } else {
                    errorLoading++;
                    _this.errUpload = errorLoading;
                    //console.log(errorLoading);
                    this.$message({
                      message: res.RespText,
                      type: "warning"
                    });
                  }
                });
              }
            });
          }
        }
        if (_this.modeImport == "customer") {
          let obj = {
            UserName: Cookies.get("idEmployee"),
            Token: Cookies.get("token"),
            MeetDay: item["Số ngày gặp"],
            QuantiyCall: item["Số Call cần check"],
            NoteEm: item["Ghi chú"],
            PlaceID: item["Mã TC"],
            CustomerId: item["Mã KH"]
          };
          if (obj.MeetDay > 0 && obj.QuantiyCall > 0) {
            //console.log("b");
            SetMetCustomerByCId(obj).then(res => {
              if (res.RespCode === 0) {
                processLoading++;
                //console.log(processLoading);
                _this.prUpload = processLoading;
              } else {
                errorLoading++;
                _this.errUpload = errorLoading;
                //console.log(errorLoading);
              }
            });
          }
        }
        //console.log(index);
        if (index == _this.excelData.results.length - 1) {
          // this.complete = true;
          // this.uploading = false;
          //console.log("thành công");
        }
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
