<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="120px"
      size="mini"
    >
      <el-form-item label="Nhân viên" prop="EmployeeName">
        <el-select
          :disabled="mode > 1 ? isDisable : !isDisable"
          class="selectIDGroup"
          v-model="form.EmployeeName"
          @change="selectEm"
          filterable
          clearable
          placeholder="Chọn nhân viên..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in emLst"
            :key="index"
            :label="item.EmployeeName"
            :value="item"
          >
            <span style="float: left">{{ item.EmployeeName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.EmployeeCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Loại" prop="TypeNote">
        <el-radio-group v-model="form.TypeNote">
          <el-radio :label="1">Tích cực</el-radio>
          <el-radio :label="0">Tiêu cực</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Điểm lưu ý" prop="PointNote">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          class="selectIDGroup"
          style="width:100%"
          v-model="form.PointNote"
          filterable
          clearable
          placeholder="Chọn lưu ý..."
        >
          <el-option
            v-for="(item, index) in pointNotes"
            :key="index"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Khoảng lưu ý" prop="PeriodNote">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          class="selectIDGroup"
          style="width:100%"
          v-model="form.PeriodNote"
          filterable
          clearable
          placeholder="Chọn khoảng lưu ý..."
        >
          <el-option
            v-for="(item, index) in periodNotes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="Description">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Description"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập ghi chú..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Trạng thái" v-if="mode > 2">
        <el-tag
          :type="form.Status | employeeNoteStatusColor"
          style="width:140px;text-align:center"
          effect="plain"
          >{{ form.Status | employeeNoteStatusText }}</el-tag
        >
      </el-form-item>
      <el-row :gutter="20" v-if="mode > 2 && form.CreaterID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.CreaterID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeCreate"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:center;margin:10px 0" v-if="mode != 3">
      <el-button
        v-if="mode < 4"
        type="primary"
        size="small"
        icon="el-icon-check"
        @click="create"
      >
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateEmployeeNote, UpdateEmployeeNote } from "@/api/employeeNote";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    emLst: Array
  },
  components: {},
  data() {
    return {
      isDisable: true,
      form: {
        RowID: "",
        EmployeeID: "",
        EmployeeName: "",
        TypeNote: "",
        PointNote: "",
        PeriodNote: "",
        Description: "",
        CreaterID: "",
        TimeCreate: "",
        Status: ""
      },
      pointNotes: [
        { value: 1, label: "Check call/F" },
        { value: 2, label: "Doanh số" },
        { value: 3, label: "Đao tạo" },
        { value: 4, label: "KPI" },
        { value: 5, label: "Đồng phục" }
      ],
      periodNotes: [
        { value: 1, label: "1 tháng" },
        { value: 2, label: "2 tháng" },
        { value: 3, label: "3 tháng" },
        { value: 6, label: "6 tháng" },
        { value: 12, label: "12 tháng" }
      ],
      rules: {
        EmployeeName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        TypeNote: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        PeriodNote: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        PointNote: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    create(val) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.mode == 1) {
            CreateEmployeeNote({
              EmployeeNoteInfo: this.form
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Thêm phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.initData();
              }
            });
          } else if (this.mode == 2) {
            UpdateEmployeeNote({
              EmployeeNoteInfo: this.form
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Cập nhật phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.clearData();
              }
            });
          }
        }
      });
    },
    selectEm(em) {
      this.form.EmployeeID = em.EmployeeID;
      this.form.EmployeeName = em.EmployeeName;
    },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.EmployeeName = this.row.EmployeeName;
        this.form.TypeNote = this.row.TypeNote;
        this.form.PeriodNote = this.row.PeriodNote;
        this.form.PointNote = this.row.PointNote;
        this.form.Description = this.row.Description;
        this.form.CreaterID = this.row.CreaterID;
        this.form.Status = this.row.Status;
        this.form.TimeCreate = this.row.TimeCreate;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.EmployeeID = "";
      this.form.EmployeeName = "";
      this.form.TypeNote = "";
      this.form.PeriodNote = "";
      this.form.PointNote = "";
      this.form.Description = "";
      this.form.CreaterID = "";
      this.form.Status = "";
      this.form.TimeCreate = "";
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
