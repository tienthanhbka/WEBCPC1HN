<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Danh mục bàn giao" label-width="180px">
        <el-input
          placeholder="Nhập tên danh mục cần bàn giao"
          class="selectIDGroup"
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
      <el-form-item label="Hiện trạng">
        <el-input
          placeholder="Mô tả hiện trạng"
          class="selectIDGroup"
          v-model="line.CurrentStatus"
        ></el-input>
      </el-form-item>

      <el-form-item label="Hướng xử lý">
        <el-input
          placeholder="Nhập hướng xử lý"
          class="selectIDGroup"
          v-model="line.StepNext"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="Số điện thoại liên hệ" label-width="180px">
        <el-input
          placeholder="Nhập số điện thoại liên hệ"
          class="selectIDGroup"
          v-model="line.Phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input
          placeholder="Nhập ghi chú"
          class="selectIDGroup"
          v-model="line.Note"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="Người tiếp nhận">
        <div style="display:flex">
          <el-select
            v-if="isGroup"
            class="selectIDGroup"
            v-model="line.EmployeeIDNext"
            placeholder="Chọn người tiếp nhận"
            style="width:100%"
          >
            <el-option
              v-for="(item, index) in lstEmployee"
              :key="index"
              :label="item.nameEmployee"
              :value="item.idEmployee"
            ></el-option>
          </el-select>
          <el-input
            v-else
            placeholder="Nhập tài khoản SĐT người tiếp nhận..."
            class="selectIDGroup"
            v-model="line.EmployeeIDNext"
          ></el-input>
          <el-button type="primary" size="mini" @click="isGroup = !isGroup"
            >Khác</el-button
          >
        </div>
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
      isGroup: true,
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
