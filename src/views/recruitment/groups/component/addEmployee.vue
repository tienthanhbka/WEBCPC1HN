<template>
  <div class="user-type">
    <el-form
      label-position="right"
      label-width="100px"
      class="form-custom"
      :model="form"
      size="small"
    >
      <el-form-item label="Họ và tên">
        <el-input v-model="form.FullName"></el-input>
      </el-form-item>
      <el-form-item label="Tài khoản">
        <el-input v-model="form.EmployeeID"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.Email"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Cấp bậc">
        <el-select
          style="width:100%"
          v-model="form.UserType"
          placeholder="Chọn cấp bậc thành viên"
        >
          <el-option
            v-for="item in UserTypeLst"
            :key="item.UserType"
            :label="item.NameType"
            :value="item.UserType"
          ></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <div style="text-align:center">
      <el-button
        class="t-button"
        type="primary"
        size="small"
        icon="fas fa-check-double"
        @click="submit"
      >
        Xác nhận</el-button
      >
    </div>
  </div>
</template>

<script>
import { AddMemberCompany } from "@/api/work-dtp/company";
// import { GetUserType } from "@/api/user";
export default {
  props: { company: String },
  data() {
    return {
      form: {
        FullName: "",
        CompanyID: "",
        Email: "",
        UserType: "",
        EmployeeID: "",
        Status: ""
      },
      UserTypeLst: []
    };
  },
  methods: {
    submit() {
      const req = {
        CompanyID: this.company,
        FullName: this.form.FullName,
        Email: this.form.Email,
        EmployeeID: this.form.EmployeeID
      };
      AddMemberCompany(req).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Thêm thành viên thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("addEmOK");
        }
      });
    }
  },
  created() {}
};
</script>

<style></style>
