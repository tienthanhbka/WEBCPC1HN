<template>
  <modal id="delete-mission-vacation" ref="delete-mission-vacation" v-cloak>
    <template slot="title"
      >Xóa phiếu nghỉ phép/ làm bù</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="130px" size="mini">
        <el-form-item label="Loại giấy">
          <el-input v-model="row.Type"></el-input>
        </el-form-item>
        <el-form-item label="Lý do">
          <el-input v-model="row.Reason"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteMission"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { DelMissionVacation } from "@/api/missionVacation";
export default {
  props: ["row"],
  data() {
    return {};
  },

  methods: {
    closeModal() {
      VoerroModal.hide("delete-mission-vacation");
    },
    deleteMission() {
      DelMissionVacation({ DocumentID: this.row.RowID }).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xóa phiếu thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something");
          VoerroModal.hide("delete-mission-vacation");
          this.listLoading = false;
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style></style>
