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
      <el-form-item label="Số tài khoản">
        <el-input
          class="selectIDGroup"
          v-model="form.AccountNumber"
          placeholder="Nhập số tài khoản..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Ngân hàng" prop="date">
        <el-input
          class="selectIDGroup"
          v-model="form.Bank"
          placeholder="Nhập tên ngân hàng..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="date">
        <el-input class="selectIDGroup" v-model="form.Note"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateEmAccount } from "@/api/employeeAdmin";

export default {
  props: ["employee"],
  data() {
    return {
      form: {
        EmployeeID: "",
        AccountNumber: "",
        Bank: "",
        Note: ""
      }
    };
  },
  methods: {
    modalOK() {
      this.form.EmployeeID = this.employee;
      CreateEmAccount({ EmAccountInfo: this.form }).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("addOK");
        this.initForm();
      });
    },
    initForm() {
      this.form.EmployeeID = null;
      this.form.AccountNumber = null;
      this.form.Bank = null;
      this.form.Note = null;
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
  }
};
</script>
