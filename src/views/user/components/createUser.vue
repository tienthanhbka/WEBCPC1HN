<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Họ và tên">
        <el-input v-model="form.nameEmployee"></el-input>
      </el-form-item>

      <el-form-item label="Số điện thoại">
        <el-input v-model="form.idEmployee"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import { CreateUser } from "@/api/getEmployee";
export default {
  props: [""],
  data() {
    return {
      form: {
        nameEmployee: "",
        idEmployee: ""
      }
    };
  },
  methods: {
    modalOK() {
      CreateUser(this.form).then(res => {
        if (res.ResCode == 0) {
          this.$notify({
            title: "Tạo tài khoản thành công",
            message: "Mật khẩu là sdt",
            type: "success",
            position: "top-left"
          });
        } else if (res.ResCode == 1118) {
          this.$notify({
            title: "Tài khoản đã được tạo trước đó",
            message: "Liên hệ với bộ phân IT để được biết mật khẩu",
            type: "success",
            position: "top-left"
          });
        }

        this.$emit("click-something", this.form);
      });
    }
  },
  created() {}
};
</script>
