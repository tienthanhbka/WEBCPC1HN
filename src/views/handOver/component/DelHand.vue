<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="90px"
    >
      <el-form-item label="Ghi chú">
        <el-input class="selectIDGroup" v-model="form.Comment"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button icon="el-icon-delete" type="danger" @click="deleteDoc">
        Xác nhận xóa</el-button
      >
    </div>
  </div>
</template>
<script>
import { DelHandOver } from "@/api/handOver";
export default {
  props: ["row"],
  data() {
    return {
      form: {
        RowID: 0,
        Comment: "",
        Status: 0
      }
    };
  },
  methods: {
    deleteDoc() {
      const req = {
        DocumentID: this.row.RowID
      };
      DelHandOver(req).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa phiếu bàn giao thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("delOK");
      });
    }
  },
  created() {}
};
</script>
