<template>
  <div>
    <el-form ref="form" label-position="top" label-width="200px" size="mini">
      <div style="padding: 10px 0; display: inline-block;">
        <h3>Khách hàng:</h3>
        {{ customer.CustomerName }}
      </div>
      <el-form-item size="large">
        <div style="border-top: 1px solid #ccc; padding:10px 0;">
          <el-button
            type="danger"
            v-if="this.customer != null"
            @click="onSubmit"
            icon="el-icon-delete"
          >
            Xóa khách hàng</el-button
          >
          <el-button @click="cancelde" type="info">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { DelCustomerByCId } from "@/api/KDCustomer";
import Cookies from "js-cookie";
export default {
  props: ["customer"],
  created() {},
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        CustomerId: this.customer.CustomerId
      };
      DelCustomerByCId(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Xóa khách hàng thành công",
            type: "success"
          });
          this.$emit("delOK");
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    cancelde() {
      this.$emit("deletecancelOK");
    }
  }
};
</script>
<style></style>
