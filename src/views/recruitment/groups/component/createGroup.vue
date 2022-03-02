<template>
  <div class="user-type">
    <el-form
      label-position="left"
      label-width="150px"
      :model="form"
      size="small"
    >
      <el-form-item label="Tên nhóm">
        <el-input v-model="form.CompanyName"></el-input>
      </el-form-item>
      <el-form-item label="Tên người đại diện">
        <el-input v-model="form.ContactRepresent"></el-input>
      </el-form-item>
      <el-form-item label="Số điện thoại">
        <el-input v-model="form.ContactPhone"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.ContactEmail"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button class="t-button" type="primary" size="small" @click="create"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>

<script>
import { UpdateCompanyInfo } from "@/api/work-dtp/company";
export default {
  props: {
    employee: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      form: {
        CompanyID: "",
        CompanyName: "",
        City: "",
        Address: "",
        MoreInfo: "",
        Scale: "",
        LinkWeb: "",
        LinkVideo: "",
        CompanyImage: "",
        PhoneNumber: "",
        Fax: "",
        CompanyLicence: "",
        ContactRepresent: "",
        ContactPosition: "",
        ContactEmail: "",
        ContactPhone: "",
        CreaterID: "",
        TimeCreate: "",
        Status: ""
      },
      UserTypeLst: []
    };
  },
  methods: {
    create() {
      UpdateCompanyInfo({ CompanyInfo: this.form }).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Tạo công ty thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("addOK");
          this.clear();
        }
      });
    },
    clear() {
      (this.form.CompanyID = ""),
        (this.form.CompanyName = ""),
        (this.form.City = ""),
        (this.form.Address = ""),
        (this.form.MoreInfo = ""),
        (this.form.Scale = ""),
        (this.form.LinkWeb = ""),
        (this.form.LinkVideo = ""),
        (this.form.CompanyImage = ""),
        (this.form.PhoneNumber = ""),
        (this.form.Fax = ""),
        (this.form.CompanyLicence = ""),
        (this.form.ContactRepresent = ""),
        (this.form.ContactPosition = ""),
        (this.form.ContactEmail = ""),
        (this.form.ContactPhone = ""),
        (this.form.CreaterID = ""),
        (this.form.TimeCreate = ""),
        (this.form.Status = "");
    }
  },
  created() {}
};
</script>

<style></style>
