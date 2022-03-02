<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <div>{{ row.Title }} - {{ row.NameEmployee }}</div>

      <div></div>
      <el-form-item label="Người kiểm tra" prop="idTeacher">
        <el-select
          v-model="form.idTeacher"
          filterable
          placeholder="Chọn người kiểm tra"
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in teacher"
            :key="index"
            :label="item.NameEmployee + ' - ' + item.idGroup"
            :value="item.EmployeeID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Người giám sát" prop="idAccept">
        <el-select
          v-model="form.idAccept"
          placeholder="Chọn người giám sát"
          style="width:100%"
          filterable
        >
          <el-option
            v-for="(item, index) in acceptLst"
            :key="index"
            :label="item.NameEmployee + ' - ' + item.idGroup"
            :value="item.EmployeeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Thời gian" prop="date">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="16">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.date"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-time-picker
              style="width:100%"
              format="HH:mm"
              value-format="HH:mm"
              v-model="form.start"
              placeholder="Bắt đầu"
            ></el-time-picker>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :lg="8">
            <el-time-picker
              style="width:100%"
              format="HH:mm"
              value-format="HH:mm"
              v-model="form.end"
              placeholder="Kết thúc"
            ></el-time-picker>
          </el-col> -->
        </el-row>
      </el-form-item>

      <el-form-item label="Ghi chú">
        <el-input v-model="form.note" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>

    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import { UpdateTime } from "@/api/roleplay";
export default {
  props: ["row", "teacher"],
  components: {},
  created() {
    this.initForm();
  },
  methods: {
    modalOK() {
      this.form.RowID = this.$props.row.RowID;
      UpdateTime(this.form).then(res => {
        if (res.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Thêm lịch thành công",
            position: "top-left",
            type: "success"
          });
          this.$emit("click", "ok");
        }
      });
    },
    initForm() {
      //alert('ok')
      // console.log(this.row);
      if (this.row) {
        this.form.idTeacher = this.row.EmployeeTeacherID;
        this.form.idAccept = this.row.EmployeeAcceptID;
        this.form.date = this.row.Date;
        this.form.start = this.row.TimeStart;
        this.form.note = this.row.Note;
        // console.log(this.form.idTeacher);
      }
    },

    closeModal() {
      this.$emit("closeModal");
    }
  },
  watch: {
    row() {
      this.initForm();
    }
  },
  data() {
    var validateTime = (rule, value, callback) => {
      if (value == null || this.form.start == null) {
        callback(new Error("Hãy chọn đủ ngày"));
      } else {
        callback();
      }
    };
    var validateEmlst = (rule, value, callback) => {
      if (this.form.employees.length <= 0) {
        callback(new Error("Hãy chọn nhân viên gặp"));
      } else {
        callback();
      }
    };
    return {
      placeModalVisible: false,
      groupLst: [],
      proLst: [],
      value: "",
      acceptLst: [
        {
          EmployeeID: "daotao-cpc1hn",
          idGroup: "CNHN-Đào tạo",
          NameEmployee: "BP Đào Tạo"
        }
      ],
      form: {
        idTeacher: "",
        idAccept: "",

        date: null,
        start: null,

        note: "",
        RowID: 0
      },
      rules: {
        date: [
          {
            validator: validateTime,
            trigger: "change"
          }
        ],

        employees: [
          {
            required: true,
            validator: validateEmlst
          }
        ]
      }
    };
  }
};
</script>

<style>
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
