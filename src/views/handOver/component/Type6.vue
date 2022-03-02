<template>
  <div>
    <el-form
      class="form-custom"
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Khách hàng" class="selectIDGroup">
        <el-input
          placeholder="Nhập tên khách hàng"
          v-model="line.HandOver"
        ></el-input>
      </el-form-item>
      <el-form-item label="File đính kèm" label-width="120px">
        <el-upload
          class="upload-demo"
          action="https://icpc1hn.work/api/File/UploadImageHandOver"
          multiple
          :limit="1"
          accept="image/png, image/jpeg,.pdf,.zip,file_extension,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :data="token"
          :on-success="uploadImageOk"
          :file-list="image"
        >
          <el-button size="small" type="primary"
            >Click to upload file</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="Địa chỉ">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập địa chỉ"
          v-model="line.Address"
        ></el-input>
      </el-form-item>

      <el-form-item label="Số điện thoại">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập số điện thoại"
          v-model="line.Phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập ghi chú"
          v-model="line.Note"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";

export default {
  props: ["line", "lstEmployee"],
  data() {
    return {
      token: {
        token: Cookies.get("token")
      },
      image: [],
      form: {
        IDGroup: "",
        TypeHandOver: "",
        HandOver: "",
        Unit: "",
        Number: "",
        CurrentStatus: "",
        LinkFile: "",
        Address: "",
        Phone: "",
        StepNext: "",
        Note: "",
        EmployeeIDNext: ""
      }
    };
  },
  methods: {
    uploadImageOk(res, file, fileList) {
      this.image.push(res.Data.fileName);
      this.line.LinkFile = this.image.join();
    }
  },
  created() {}
};
</script>
