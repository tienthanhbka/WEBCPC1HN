<template>
  <div>
    <div v-for="item in listDate" :key="item">
      <div>
        {{ item.day }}

        <el-radio v-model="item.half" label="1">Sáng</el-radio>
        <el-radio v-model="item.half" label="2">Chiều</el-radio>
        <el-radio v-model="item.half" label="0">Cả ngày</el-radio>
      </div>
    </div>
    <div style="text-align:center;padding:10px;">
      <el-button
        @click="creatrMissionNP"
        type="primary"
        size="small"
        icon="el-icon-check"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateMissionVacation, GetEmailLst } from "@/api/mission";
export default {
  props: ["listDate"],
  data() {
    return {
      form: {
        Reason: "",
        Half: "0",
        Type: "",
        Note: "",
        TimeStart: "",
        TimeEnd: "",
        IDGroup: "",
        Email: []
      }
    };
  },
  methods: {
    creatrMissionNP() {
      this.dialogVisibleDatePick = true;
      //alert('ok')
      this.form.TimeStart.setHours(this.form.TimeStart.getHours() + 7);
      this.form.TimeEnd.setHours(this.form.TimeStart.getHours() + 7);
      CreateMissionVacation(this.form).then(response => {
        if (response.ResCode == 0) {
          //console.log(response.ResCode);
          this.$notify({
            title: "Thành công",
            message: "Tạo phiếu thành công",
            type: "success",
            position: "top-left"
          });

          this.$emit("click-something", "OK");
          VoerroModal.hide("create-mission-vacation");
          this.listLoading = false;
        }
      });
    }
  }
};
</script>
