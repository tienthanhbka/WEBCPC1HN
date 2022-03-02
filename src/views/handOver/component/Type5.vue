<template>
  <div class="cn-container">
    <a
      class="btn-file"
      target="_blank"
      href="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/H%E1%BB%8D%20v%C3%A0%20t%C3%AAn_K%C3%AAnh%20KD_B%C3%A0n%20giao%20c%C3%B4ng%20n%E1%BB%A3.xlsx?alt=media&token=40d10901-0a18-4b62-aef6-621831a53c71"
    >
      <i class="fas fa-file-download"></i> Tải mẫu</a
    ><span style="margin-left:10px;font-size:10pt;color:#9c1919"
      >(yêu cầu bắt buộc nếu còn công nợ)</span
    >
    <el-form
      class="form-custom"
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Tên khách hàng">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập tên khách hàng"
          v-model="line.HandOver"
        ></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Số tiền" label-width="80px">
            <el-input class="selectIDGroup" v-model="line.Number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Đơn vị" label-width="80px">
            <el-input class="selectIDGroup" v-model="line.Unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
      <el-form-item label="Hướng xử lý">
        <el-input
          class="selectIDGroup"
          placeholder="Mô tả hướng xử lý"
          v-model="line.StepNext"
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input class="selectIDGroup" v-model="line.Note"></el-input>
      </el-form-item>
      <el-form-item label="Người tiếp nhận" label-width="120px">
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
        <!-- <el-input v-model="form.EmployeeIDNext"></el-input> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetType, CreateHandOver } from "@/api/handOver";
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
<style scoped>
.btn-file {
  padding: 10px 15px;
  font-size: 10pt;
  font-weight: 600;
  display: inline-block;
  background-color: #0277bc;
  border-radius: 5px;
  color: #fff;
  margin-bottom: 10px;
}
</style>
