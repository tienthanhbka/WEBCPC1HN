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
      <el-form-item label="Ghi chú">
        <el-input class="selectIDGroup" v-model="form.Comment"></el-input>
      </el-form-item>
    </el-form>
    <div style="width:100%;text-align:center;">
      <el-button type="info" @click="modalOK1">Không duyệt</el-button>
      <el-button type="success" icon="el-icon-circle-check" @click="modalOK2">
        Phê duyệt</el-button
      >
    </div>
  </div>
</template>
<script>
import { AcceptHandOver } from "@/api/handOver";
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
    modalOK1() {
      //this.form.EmployeeID = this.$route.params.id
      this.form.Status = 0;
      AcceptHandOver(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Hủy phiếu bàn giao thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("acceptOK", this.form);
        //this.initForm()
      });
    },
    modalOK2() {
      this.form.Status = 2;
      this.form.RowID = this.row.RowID;
      //this.form.EmployeeID = this.$route.params.id
      AcceptHandOver(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Gửi yêu cầu duyệt phiếu bàn giao thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("acceptOK", this.form);
        //this.initForm()
      });
    }
  },
  created() {}
};
</script>
