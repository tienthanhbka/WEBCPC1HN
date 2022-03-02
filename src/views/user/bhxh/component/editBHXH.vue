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
      <el-form-item label="Mức đóng" prop="Money">
        <el-select
          class="selectIDGroup"
          v-model="form.Money"
          placeholder="Chọn"
          style="width:100%"
        >
          <el-option
            v-for="item in Money"
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
      <el-form-item label="Lý do biến động">
        <el-select
          class="selectIDGroup"
          v-model="form.Reason"
          placeholder="Chọn"
          style="width:100%"
        >
          <el-option
            v-for="item in Reason"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div style="text-align:center">
      <el-button type="primary" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { EditEmployeeBHXH } from "@/api/employeeInfor";

export default {
  props: ["row"],
  data() {
    return {
      form: {
        Money: "",
        DateStart: "",
        DateEnd: "",
        EmployeeID: "",
        Reason: "",
        RowID: 0
      },
      Money: [
        {
          value: "0"
        },
        {
          value: "4.800.000"
        },
        {
          value: "5.100.000"
        },
        {
          value: "6.000.000"
        },
        {
          value: "6.500.000"
        },
        {
          value: "7.000.000"
        },
        {
          value: "9.000.000"
        },
        {
          value: "10.000.000"
        },
        {
          value: "11.000.000"
        }
      ],
      Reason: [
        {
          value: "Tăng mới"
        },
        {
          value: "Tăng mức đóng"
        },
        {
          value: "Nghỉ không lương đi làm lại"
        },
        {
          value: "Nghỉ ốm đi làm lại"
        },
        {
          value: "Nghỉ thai sản đi làm lại"
        },
        {
          value: "Giảm hẳn"
        },
        {
          value: "Giảm ốm đau"
        },
        {
          value: "Giảm thai sản"
        }
      ]
    };
  },
  methods: {
    modalOK() {
      this.form.EmployeeID = this.$route.params.id;
      EditEmployeeBHXH(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật thông tin thành công",
          type: "success",
          position: "top-left"
        });

        this.row.DateStart = this.form.DateStart;
        this.row.DateEnd = this.form.DateEnd;
        this.row.Money = this.form.Money;

        this.row.Reason = this.form.Reason;

        this.$emit("editOK", this.form);
        this.initForm();
      });
    },
    initForm() {
      this.form.DateStart = this.row.DateStart;
      this.form.DateEnd = this.row.DateEnd;
      this.form.Money = this.row.Money;
      this.form.EmployeeID = this.row.EmployeeID;
      this.form.Reason = this.row.Reason;
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
