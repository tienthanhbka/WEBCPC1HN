<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-checkbox-group
        v-for="item in LstRecord"
        :key="item.Name"
        v-model="listRecord"
      >
        <el-checkbox :label="item.Name"></el-checkbox>
      </el-checkbox-group>
    </el-form>
    <div style="text-align:center;padding:10px">
      <el-button type="primary" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { GetLstRecord_HR, CreateEmployeeRecord_HR } from "@/api/employeeInfor";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
  GetDH,
  GetSpecialized,
  GetDegree,
  GetSpecializedFather
} from "@/api/default";
export default {
  props: ["listRecord", "EmployeeID"],
  data() {
    return {
      LstRecord: [],
      arr: [],
      form: {
        listRecord: "",
        EmployeeID: "",
        Status: 0
      }
    };
  },
  methods: {
    getLst() {
      GetLstRecord_HR().then(res => {
        this.LstRecord = res.Data;
        // console.log(this.LstRecord)
      });
    },
    modalOK() {
      this.form.EmployeeID = this.EmployeeID;
      if (this.listRecord.length == 11) {
        this.form.Status = 1;
      }
      console.log(this.listRecord);
      this.form.listRecord = this.listRecord.join(";;");
      CreateEmployeeRecord_HR(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật thông tin hồ sơ thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("click-something", this.form);
      });
    }
  },
  created() {
    //this.getOffice()
    this.getLst();
    console.log(this.listRecord);
  }
};
</script>
