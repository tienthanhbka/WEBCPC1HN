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
      <el-form-item label="Quá trình hợp đồng" prop="Type" label-width="150px">
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
      <el-form-item label="Số hợp đồng">
        <el-input class="selectIDGroup" v-model="form.CodeWork"></el-input>
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
      <el-row>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Ngày ký HĐ" prop="date">
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateSign"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Mức lương đóng BHXH" label-width="180px">
            <el-input class="selectIDGroup" v-model="form.BHXH"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="text-align:center">
      <el-button type="danger" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { DelEmployeeProcessWork } from "@/api/employeeInfor";

export default {
  props: ["row"],
  data() {
    return {
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

      form: {
        Type: "",
        DateStart: "",
        DateEnd: "",
        EmployeeID: "",
        BHXH: "",
        CodeWork: "",
        RowID: "",
        DateSign: ""
      },
      Type: [
        {
          value: "CTV"
        },
        {
          value: "Thời vụ"
        },
        {
          value: "Thử việc"
        },
        { value: "Hợp đồng có xác định thời hạn (06 tháng)" },
        {
          value: "Hợp đồng có xác định thời hạn (01 năm)"
        },
        {
          value: "Hợp đồng có xác định thời hạn (03 năm)"
        },
        {
          value: "Hợp đồng không xác định thời hạn"
        }
      ]
    };
  },
  methods: {
    modalOK() {
      //this.form.EmployeeID = this.$route.params.id
      DelEmployeeProcessWork(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa thông tin thành công",
          type: "success",
          position: "top-left"
        });

        this.row.DateStart = "";
        this.row.DateEnd = "";
        this.row.Type = "";
        this.row.EmployeeID = "";
        this.row.RowID = "";
        this.row.BHXH = "";
        this.row.CodeWork = "";
        this.row.DateSign = "";
        this.$emit("delOK", this.form);
      });
    },
    initForm() {
      this.form.DateStart = this.row.DateStart;
      this.form.DateEnd = this.row.DateEnd;
      this.form.Type = this.row.Type;
      this.form.EmployeeID = this.row.EmployeeID;
      this.form.RowID = this.row.RowID;
      this.form.BHXH = this.row.BHXH;
      this.form.DateSign = this.row.DateSign;
      this.form.CodeWork = this.row.CodeWork;
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
