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

      <el-form-item label="Quá trình hợp đồng" prop="Type">
        <el-select v-model="form.Type" placeholder="Chọn" style="width:100%">
          <el-option
            v-for="item in Type"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Số hợp đồng">
        <el-input v-model="form.CodeWork"></el-input>
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
              @change="changeType"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
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
      <el-form-item label="Mức lương đóng BHXH">
        <el-select
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

        <!-- <el-select
    v-model="form.BHXH"
    filterable
    allow-create
    default-first-option
    placeholder="Choose tags for your article">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
      </el-form-item>
    </el-form>

    <el-button type="success" @click="modalOK">Xác nhận</el-button>
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
        CodeWork: ""
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
      this.form.DateStart = Date.parse(val.toString("yyyy-MM-dd"));
      if (this.form.Type == "Hợp đồng có xác định thời hạn (06 tháng)") {
        var a = new Date(this.form.DateStart);
        a.setMonth(this.form.DateStart.getMonth() + 6);
        this.form.DateEnd = a;
      }

      if (this.form.Type == "Hợp đồng có xác định thời hạn (01 năm)") {
        var a = new Date(this.form.DateStart);
        a.setFullYear(this.form.DateStart.getFullYear() + 1);
        this.form.DateEnd = a;
      }

      if (this.form.Type == "Hợp đồng có xác định thời hạn (03 năm)") {
        var a = new Date(this.form.DateStart);
        a.setFullYear(this.form.DateStart.getFullYear() + 3);
        this.form.DateEnd = a;
      }
    },
    modalOK() {
      // console.log(this.form);

      // console.log(this.form.DateStart);
      // console.log(this.form);
      // this.form.DateStart = Date.parse(
      //   this.form.DateStart.toString("yyyy-MM-dd")
      // );
      var req = {
        Type: this.form.Type,
        DateStart: this.form.DateStart,
        DateEnd: this.form.DateEnd,
        EmployeeID: this.form.EmployeeID,
        BHXH: this.form.BHXH,
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
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
  }
};
</script>
