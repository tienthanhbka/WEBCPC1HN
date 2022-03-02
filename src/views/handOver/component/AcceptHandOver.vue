<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="Ghi chú">
        <el-input v-model="form.Comment" class="selectIDGroup"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="small" type="info" @click="modalOK1"
        >Không duyệt</el-button
      >
      <el-button
        size="small"
        style="background-color:#02bc77;color:#fff"
        icon="el-icon-circle-check"
        @click="modalOK2"
      >
        Phê duyệt</el-button
      >
    </div>
  </div>
</template>
<script>
import { ApproveHandOver } from "@/api/handOver";
import Cookies from "js-cookie";

export default {
  props: ["groupList", "row"],
  data() {
    return {
      token: Cookies.get("token"),
      lstEmployee: [],
      form: {
        RowID: 0,
        Comment: "",
        Status: 0
      }
    };
  },
  methods: {
    modalOK1() {
      const req = {
        DocumentID: this.row,
        Comment: this.form.Comment,
        Status: 3
      };
      ApproveHandOver(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Không phê duyệt phiếu bàn giao thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("acceptOK", this.form);
        }
      });
    },
    modalOK2() {
      const req = {
        DocumentID: this.row,
        Comment: this.form.Comment,
        Status: 10
      };
      ApproveHandOver(req).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Phê duyệt phiếu bàn giao thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("acceptOK", this.form);
        }
      });
    }
  },
  created() {
    // console.log(this.row);
  }
};
</script>
