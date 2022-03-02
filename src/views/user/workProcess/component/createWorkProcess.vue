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
      <el-form-item label="Quá trình hợp đồng" label-width="150px" prop="Type">
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
              @change="changeType"
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
              @change="changeType"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Mức lương đóng BHXH" label-width="180px">
            <el-select
              class="selectIDGroup"
              v-model="form.BHXH"
              filterable
              allow-create
              default-first-option
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
import { CreateEmployeeProcessWork } from "@/api/employeeInfor";
import { getStartMonth, getEndMonth } from "@/api/index";

export default {
  props: [""],
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
    changeType(val) {
      val = Date.parse(val.toString("yyyy-MM-dd"));
      if (this.form.Type == "Hợp đồng có xác định thời hạn (06 tháng)") {
        var a = new Date(val);
        a.setMonth(val.getMonth() + 6);
        this.form.DateEnd = a;
      }

      if (this.form.Type == "Hợp đồng có xác định thời hạn (01 năm)") {
        var a = new Date(val);
        a.setFullYear(val.getFullYear() + 1);
        this.form.DateEnd = a;
      }

      if (this.form.Type == "Hợp đồng có xác định thời hạn (03 năm)") {
        var a = new Date(val);
        a.setFullYear(val.getFullYear() + 3);
        this.form.DateEnd = a;
      }
    },
    modalOK() {
      var req = {
        Type: this.form.Type,
        DateStart: this.form.DateStart,
        DateEnd: this.form.DateEnd,
        EmployeeID: this.$route.params.id,
        BHXH: this.form.BHXH,
        DateSign: this.form.DateSign,
        CodeWork: this.form.CodeWork
      };
      CreateEmployeeProcessWork(req).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("addOK", this.form);
        this.initForm();
      });
    },
    initForm() {
      this.form.EmployeeID = this.$route.params.id;
      this.form.DateStart = null;
      this.form.DateEnd = null;
      this.form.Type = null;
      this.form.EmployeeID = null;
      this.form.DateSign = null;
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
  }
};
</script>
