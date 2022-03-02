<template>
  <div>
    <el-divider content-position="left"
      ><i class="far fa-address-book"></i> {{ place.PlaceName }}</el-divider
    >
    <div slot="body" style="padding: 10px;">
      <el-upload
        style="text-align:center;"
        class="upload-demo"
        ref="uploadFile"
        drag
        :on-change="onFileChange"
        :action="uploadFile"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Thả file vào đây or <em>Click</em></div>
      </el-upload>
      <el-divider content-position="left"
        ><i class="far fa-images"></i> Danh sách file hồ sơ</el-divider
      >
      <div
        v-for="(link, index) in CustomerFileLst"
        :key="index"
        v-loading="fileLoading"
      >
        <el-link
          icon="far fa-image"
          type="primary"
          style="padding:10px;"
          target="_blank"
          :href="
            'https://icpc1hn.work/CPC1HN/File/DownloadFileCustomer?UserName=' +
              UserName +
              '&Token=' +
              token +
              '&PlaceID=' +
              place.PlaceId +
              '&LinkFile=' +
              link.LinkFile
          "
        >
          &#32;&#32;{{ link.FileName }}</el-link
        >
        <el-button
          icon="el-icon-delete"
          type="text"
          style="color: red;"
          @click="deleteFile(link)"
        ></el-button>
      </div>
    </div>

    <div slot="footer" style="padding:10px;text-align:right;">
      <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
      <el-button
        icon="el-icon-edit"
        class="pan-btn yellow-btn"
        @click="submitUpload"
        >Cập nhật</el-button
      >
    </div>
  </div>
</template>
<script>
import { DelFileOfCustomer, GetFileOfCustomer } from "@/api/KDPlace";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
export default {
  props: ["place"],
  data() {
    return {
      fileList: [],
      DistrictLst: [],
      CustomerFileLst: [],
      UserName: Cookies.get("idEmployee"),
      token: Cookies.get("token"),
      file: null,
      fileLoading: false
    };
  },
  methods: {
    fetchData() {
      var req = {
        UserName: this.UserName,
        Token: this.token,
        PlaceID: this.place.PlaceId
      };
      GetFileOfCustomer(req).then(res => {
        if (res.RespCode == 0) {
          this.CustomerFileLst = res.CustomerFileLst;
        }
      });
    },
    submitUpload() {
      this.fileLoading = true;
      this.$refs.uploadFile.submit();

      this.$refs.uploadFile.clearFiles();
      this.$notify({
        title: "Thông báo",
        message: "thêm thành công",
        position: "bottom-right",
        type: "success"
      });
      setTimeout(() => {
        this.fetchData();
        this.fileLoading = false;
      }, 1000);
    },
    closeModal() {
      this.$emit("cancelUp");
    },
    onFileChange(file, fileList) {
      this.file = file;
    },
    deleteFile(data) {
      var req = {
        UserName: this.UserName,
        token: this.token,
        PlaceId: this.place.PlaceId,
        LinkFile: data.LinkFile
      };
      DelFileOfCustomer(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thông báo",
            message: "Xóa thành công",
            position: "bottom-right",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$notify({
            title: "Thông báo",
            message: res.RespText,
            position: "bottom-right",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {},
  watch: {
    place() {
      this.fetchData();
    }
  },
  computed: {
    uploadFile() {
      return (
        baseUrl +
        "File/UploadFileCustomer" +
        "?PlaceID=" +
        this.place.PlaceId +
        "&Token=" +
        this.token +
        "&UserName=" +
        this.UserName +
        "&FileName=" +
        (this.file ? this.file.name : "")
      );
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style>
.selectIDGroup .el-input__inner {
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box {
  width: 50%;
}
</style>
