<template>
<div>
<el-divider content-position="center">Cập nhật trạng thái</el-divider>
  <el-form ref="form" label-position="top" label-width="200px" size="mini">
    <el-form-item label="Trạng thái">
      <el-select
        v-model="Status"
        placeholder="Trạng thái..."
        class="selectIDGroup"
        style="width:100%"
      >
        <el-option
          v-for="item in StatusLst"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Ghi chú">
      <el-input
        class="selectIDGroup"
        v-model="Note"
        style="width:100%"
        placeholder="Nhập ghi chú..."
        type="textarea"
        autosize
      >
      </el-input>
    </el-form-item>
    <el-form-item size="large">
      <div style="float: right;">
        <el-button type="primary" @click="onSubmit" icon="el-icon-finished"
          >Xác nhận</el-button
        >
      </div>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import { UpdateSttMaterial } from "@/api/material";
import Cookies from "js-cookie";
export default {
  props: ["material"],
  created() {},
  watch: {
    // idea() {
    //     this.initForm()
    // }
  },
  data() {
    return {
      StatusLst: [
        {
          value: "1",
          label: "Còn"
        },
        {
          value: "0",
          label: "Hết"
        }
      ],
      Note: "",
      Status: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("CancelOK");
    },
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        MaterialId: this.material.MaterialId,
        Status: this.Status,
        Note: this.Note
      };
      UpdateSttMaterial(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Cập nhật thành công",
            type: "success"
          });
          this.$emit("UpdateStatusOK");
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
