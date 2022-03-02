<template>
  <div class="container-approve">
    <el-input
      size="small"
      v-model="txtNote"
      placeholder="Nhập ghi chú..."
    ></el-input>
    <div class="btn">
      <el-button
        size="small"
        type="info"
        icon="el-icon-circle-close"
        @click="cancel"
        >Từ chối</el-button
      >
      <el-button
        size="small"
        type="success"
        icon="el-icon-circle-check"
        @click="approve"
        >Phê duyệt</el-button
      >
    </div>
  </div>
</template>

<script>
import { ApproveRecruitment } from "@/api/work-dtp/recruitment";
export default {
  data() {
    return {
      txtNote: ""
    };
  },
  props: {
    row: Object
  },
  methods: {
    approve() {
      const req = {
        DocumentID: this.row.DocumentID,
        Status: 3
      };
      ApproveRecruitment(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Phê duyệt bài tuyển dụng thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("approveOK");
        }
      });
    },
    cancel() {
      const req = {
        DocumentID: this.row.DocumentID,
        Status: 100
      };
      ApproveRecruitment(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Từ chối bài tuyển dụng thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("approveOK");
        }
      });
    }
  },
  created() {
    console.log(this.row);
  }
};
</script>

<style lang="scss" scoped>
.container-approve {
  width: 100%;
  .btn {
    margin: 10px;
    text-align: center;
  }
}
</style>
