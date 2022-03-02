<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadFile"
      multiple
      :limit="5"
      accept="image/png, image/jpeg"
      :data="dataUpload"
      :on-success="uploadImageOk"
      :file-list="image"
    >
      <el-button size="small" type="primary">Click to upload image</el-button>
    </el-upload>

    <el-form>
      <el-form-item label="Tên tài liệu">
        <el-input v-model="form.NameFile"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import Cookies from "js-cookie"
import { AddFileToCus } from "@/api/customer"
export default {
  props: ["row"],
  created() {
    this.dataUpload.CodeCustomer = this.row.PlaceId;
  },
  watch: {
    row() {
      this.dataUpload.CodeCustomer = this.row.PlaceId;
    }
  },

  data() {
    return {
      image: [],
      dataUpload: {
        token: Cookies.get("token"),
        CodeCustomer: ""
      },
      form: {
        CustomerCode: "",
        LinkFile: "",
        NameFile: ""
      }
    }
  },
  methods: {
    modalOK() {
      this.form.CustomerCode = this.row.No_;
      this.form.LinkFile = this.image.join();
      AddFileToCus(this.form).then(res => {
        this.$message({
          message: "Upload file thành công",
          type: "success"
        });
        this.$emit("click-something", "OK");
      })
    },
    uploadImageOk(res, file, fileList) {
      this.image.push(res.Data.fileName);
    }
  }
};
</script>
