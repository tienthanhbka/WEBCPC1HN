<template>
  <div>
    <el-form ref="form" label-position="top" label-width="200px" size="mini">
      <div style="padding: 10px 0; display: inline-block;">
        <h3>Tổ chức:</h3>
        {{ place.PlaceName }}
      </div>
      <el-form-item size="large">
        <div style="border-top: 1px solid #ccc; padding:10px 0;">
          <el-button
            type="danger"
            v-if="this.place != null"
            @click="onSubmit"
            icon="el-icon-delete"
          >
            Xóa tổ chức</el-button
          >
          <el-button @click="cancelde" type="info">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { DelPlaceByPId } from "@/api/KDPlace";
import Cookies from "js-cookie";
export default {
  props: ["place"],
  created() {},
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        PlaceId: this.place.PlaceId
      };
      DelPlaceByPId(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Xóa tổ chức thành công",
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
      this.$emit("PcancelOK");
    }
  }
};
</script>
<style></style>
