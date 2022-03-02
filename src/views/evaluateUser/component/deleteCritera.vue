<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      label-width="200px"
      size="mini"
    >
      <div style="padding: 10px 0; display: inline-block;">
        <h3>Tiêu chí:</h3>
        {{ critera.CriteriaName }}
      </div>
      <el-form-item size="large">
        <div style="border-top: 1px solid #ccc; padding:10px 0;">
          <el-button
            type="danger"
            v-if="critera != null"
            @click="onSubmit"
            icon="el-icon-delete"
          >
            Xóa tiêu chí</el-button
          >
          <el-button @click="cancelde" type="info">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { DelCriteriaDefine } from "@/api/NSCriteriaDefine"
import Cookies from "js-cookie";
export default {
  props: ["critera"],
  created() {},
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        CriteriaID: this.critera.CriteriaID
      }
      DelCriteriaDefine(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Xóa tiêu chí thành công",
            type: "success"
          })
          this.$emit("delCriteraOK");
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          })
        }
      });
    },
    cancelde() {
      this.$emit("deletecancelOK");
    }
  }
}
</script>
<style>
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
.el-dialog__body {
  padding: 0px 20px;
}
</style>
