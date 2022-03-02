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
      <el-form-item label="Trạng thái" prop="Type">
        <el-select
          class="selectIDGroup"
          v-model="form.Type"
          placeholder="Chọn"
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
              class="selectIDGroup"
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateStart"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Ngày kết thúc" prop="date">
            <el-date-picker
              class="selectIDGroup"
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
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { DelEmployeeStatusWork } from "@/api/employeeInfor";

export default {
  props: ["row"],
  data() {
    return {
      form: {
        Type: "",
        DateStart: "",
        DateEnd: "",
        EmployeeID: "",
        RowID: 0
      },
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
    modalOK() {
      this.form.EmployeeID = this.$route.params.id;
      DelEmployeeStatusWork(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.row.DateStart = "";
        this.row.DateEnd = "";
        this.row.Type = "";
        this.$emit("delOK", this.form);
        //this.initForm()
      });
    },
    initForm() {
      this.form.DateStart = this.row.DateStart;
      this.form.DateEnd = this.row.DateEnd;
      this.form.Type = this.row.Type;
      this.form.EmployeeID = this.row.EmployeeID;
      this.form.RowID = this.row.RowID;
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
  },
  watch: {
    row() {
      this.initForm();
    }
  }
};
</script>
