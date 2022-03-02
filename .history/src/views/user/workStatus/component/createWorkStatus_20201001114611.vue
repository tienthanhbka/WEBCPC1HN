<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <div></div>
      <!-- <el-form-item label="Người thân" prop="RelativePosition">
        <el-select v-model="form.RelativePosition" placeholder="Chọn"  style="width:100%">
          <el-option
            v-for="item in RelativePosition"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="Trạng thái" prop="Type">
        <el-select
          v-model="form.Type"
          placeholder="Chọn"
          @change="changType"
          style="width:100%"
        >
          <el-option
            v-for="item in Type"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Ngày bắt đầu" prop="date">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateStart"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="display" :xs="24" :lg="12">
          <el-form-item label="Ngày kết thúc" prop="date">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateEnd"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Lý do">
        <el-input v-model="form.Reason"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import {
  CreateEmployeeStatusWork,
  GetEmployeeInforByID
} from "@/api/employeeInfor";

export default {
  props: [""],
  data() {
    return {
      form: {
        Type: "Đang làm việc",
        DateStart: "",
        DateEnd: null,
        EmployeeID: "",
        Reason: ""
      },
      display: false,
      Type: [
        {
          value: "Đang làm việc"
        },
        {
          value: "Nghỉ thai sản"
        },
        {
          value: "Nghỉ không lương"
        },
        {
          value: "Đã nghỉ việc"
        }
      ]
    };
  },
  methods: {
    changType() {
      if (
        this.form.Type == "Nghỉ thai sản" ||
        this.form.Type == "Nghỉ thai sản"
      ) {
        this.display = true;
      }
    },

    modalOK() {
      if (
        this.form.Type == "Nghỉ thai sản" ||
        this.form.Type == "Nghỉ thai sản"
      ) {
        if (this.form.DateEnd == null) {
          this.$notify({
            title: "Lỗi",
            message: "Vui lòng điền ngày kết thúc",
            type: "warning",
            position: "top-left"
          });
        } else {
          this.form.EmployeeID = this.$route.params.id;
          CreateEmployeeStatusWork(this.form).then(res => {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thông tin thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("addOK", this.form);
            this.initForm();
          });
        }
      }
    },
    initForm() {
      //this.form.DateStart = null
      this.form.DateEnd = null;
      //this.form.Type = null
      this.form.EmployeeID = null;
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
    GetEmployeeInforByID({ EmployeeID: this.$route.params.id }).then(res => {
      this.form.DateStart = res.Data[0].DateStartWork;
    });
  }
};
</script>
