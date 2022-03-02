el-time-select<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="Công việc" prop="Work">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Work"
          placeholder="Công việc thực hiện..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Mô tả" prop="Note">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Description"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập mô tả..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Thời gian">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-time-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              class="selectIDGroup"
              v-model="timeStart"
              size="small"
              style="width:90%"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="Giờ bắt đầu"
            >
            </el-time-select>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-time-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              class="selectIDGroup"
              size="small"
              v-model="timeEnd"
              style="width:90%"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="Giờ kết thúc"
            >
            </el-time-select>
          </el-col>
        </el-row>
        <span style="font-size:10pt;color:#29d;font-style:italic"
          >Số giờ đăng kí: {{ form.Hour }} giờ</span
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
      <el-row :gutter="20" v-if="mode > 2 && form.ApproveID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Người duyệt">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.ApproveID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeApprove"
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
      <el-button
        v-if="mode == 4"
        type="info"
        size="small"
        icon="el-icon-circle-close"
        @click="accept(5)"
      >
        Từ chối
      </el-button>
      <el-button
        v-if="mode == 4"
        type="success"
        size="small"
        icon="el-icon-check"
        @click="accept(3)"
      >
        Phê duyệt
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateShiftLine, UpdateShiftLine } from "@/api/missionVacation";

export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    header: Object,
    mode: Number
  },
  components: {},
  data() {
    return {
      isDisable: true,
      dateSelect: "",
      timeStart: "",
      timeEnd: "",
      form: {
        RowID: "",
        HeaderID: "",
        EmployeeID: "",
        Work: "",
        Description: "",
        ManagerID: "",
        TimeApprove: "",
        TimeStart: "",
        TimeEnd: "",
        Hour: 0,
        TimeCreate: "",
        Status: ""
      },
      rules: {
        Work: [
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
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let checkTime =
            Date.parse(this.form.TimeEnd) - Date.parse(this.form.TimeStart);
          if (checkTime <= 0) {
            this.$notify({
              title: "Xảy ra lỗi",
              message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
              type: "error"
            });
            return;
          }
          let checkTimeT =
            Date.parse(this.form.TimeStart) - Date.parse(this.header.TimeStart);
          let checkTimeS =
            Date.parse(this.header.TimeEnd) - Date.parse(this.form.TimeEnd);
          if (checkTimeT < 0 || checkTimeS < 0) {
            this.$notify({
              title: "Xảy ra lỗi",
              message: "Thời gian báo cáo không nằm trong ca đăng kí",
              type: "error"
            });
            return;
          }
          if (this.mode == 1) {
            CreateShiftLine({
              ShiftLineInfo: this.form
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Thêm phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.clearData();
              }
            });
          } else if (this.mode == 2) {
            UpdateShiftLine({
              ShiftLineInfo: this.form
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
    calHour() {
      this.form.TimeStart =
        Date.parse(this.header.TimeStart).toString("yyyy-MM-dd") +
        " " +
        this.timeStart +
        ":00";
      this.form.TimeEnd =
        Date.parse(this.header.TimeStart).toString("yyyy-MM-dd") +
        " " +
        this.timeEnd +
        ":00";
      let hours =
        Math.abs(
          Date.parse(this.form.TimeStart) - Date.parse(this.form.TimeEnd)
        ) / 36e5;
      this.form.Hour = parseFloat(hours.toFixed(3));
    },
    accept(val) {
      AcceptShift({ RowID: this.form.RowID, Status: val }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xác nhận phiếu thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("acceptOK");
        }
      });
    },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.HeaderID = this.row.HeaderID;
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.Work = this.row.Work;
        this.form.Description = this.row.Description;
        this.form.TimeStart = this.row.TimeStart;
        this.form.TimeEnd = this.row.TimeEnd;
        this.form.Hour = this.row.Hour;
        this.form.ManagerID = this.row.ManagerID;
        this.form.TimeApprove = this.row.TimeApprove;
        this.form.Status = this.row.Status;
        this.form.TimeCreate = this.row.TimeCreate;
        this.timeStart = this.row.TimeStart
          ? Date.parse(this.row.TimeStart).toString("HH:mm")
          : "";
        this.timeEnd = this.row.TimeEnd
          ? Date.parse(this.row.TimeEnd).toString("HH:mm")
          : "";
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.HeaderID = this.header.RowID;
      this.form.EmployeeID = "";
      this.form.Work = "";
      this.form.Description = "";
      this.form.TimeStart = "";
      this.form.TimeEnd = "";
      this.form.Hour = 0;
      this.form.ManagerID = "";
      this.form.TimeApprove = "";
      this.form.Status = "";
      this.form.Note = "";
      this.form.TimeCreate = "";
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    },
    timeStart() {
      this.calHour();
    },
    timeEnd() {
      this.calHour();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
