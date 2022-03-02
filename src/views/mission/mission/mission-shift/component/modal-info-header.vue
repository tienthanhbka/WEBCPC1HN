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
      <el-row :gutter="20" v-if="mode > 2 && form.EmployeeID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Nhân viên">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="SĐT">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeID"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Bộ phận" prop="GroupID">
        <el-select
          style="width:100%"
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          filterable
          clearable
          v-model="form.GroupID"
          placeholder="Chọn nhóm"
        >
          <el-option
            v-for="item in groupLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ngày đăng kí">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="8">
            <el-date-picker
              :disabled="mode > 2 ? isDisable : !isDisable"
              class="selectIDGroup"
              v-model="dateSelect"
              size="small"
              style="width:90%"
              format="yyyy-MM-dd"
              type="date"
              placeholder="Chọn ngày"
            >
            </el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="16">
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
                  placeholder="Thời gian bắt đầu"
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
                  placeholder="Thời gian kết thúc"
                >
                </el-time-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <span style="font-size:10pt;color:#29d;font-style:italic"
          >Số giờ đăng kí: {{ form.Hour }} giờ</span
        >
      </el-form-item>
      <el-form-item label="Ca" prop="Shift">
        <el-radio-group v-model="form.Shift">
          <el-radio label="C1">Ca 1</el-radio>
          <el-radio label="C2">Ca 2</el-radio>
          <el-radio label="C3">Ca 3</el-radio>
          <el-radio label="HC">Ca HC</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Ghi chú" prop="Note">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Note"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập ghi chú..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Trạng thái" v-if="mode > 2">
        <el-tag
          :type="form.Status | shiftStatusColor"
          style="width:140px;text-align:center"
          effect="plain"
          >{{ form.Status | shiftStatusText }}</el-tag
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
import { CreateShift, UpdateShift, AcceptShift } from "@/api/missionVacation";

export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    groupLst: Array
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
        EmployeeID: "",
        EmployeeName: "",
        Shift: "",
        Note: "",
        ApproveID: "",
        TimeApprove: "",
        TimeStart: "",
        TimeEnd: "",
        Hour: 0,
        GroupID: "",
        CreaterID: "",
        TimeCreate: "",
        Status: ""
      },
      rules: {
        GroupID: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        Shift: [
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
          if (this.mode == 1) {
            CreateShift({
              ShiftInfo: this.form
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
            UpdateShift({
              ShiftInfo: this.form
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
        Date.parse(this.dateSelect).toString("yyyy-MM-dd") +
        " " +
        this.timeStart +
        ":00";
      this.form.TimeEnd =
        Date.parse(this.dateSelect).toString("yyyy-MM-dd") +
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
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.EmployeeName = this.row.EmployeeName;
        this.form.GroupID = this.row.GroupID;
        this.form.Note = this.row.Note;
        this.form.TimeStart = this.row.TimeStart;
        this.form.TimeEnd = this.row.TimeEnd;
        this.form.Hour = this.row.Hour;

        this.form.Shift = this.row.Shift;
        this.form.ApproveID = this.row.ApproveID;
        this.form.TimeApprove = this.row.TimeApprove;
        this.form.CreaterID = this.row.CreaterID;
        this.form.Status = this.row.Status;
        this.form.TimeCreate = this.row.TimeCreate;
        this.dateSelect = this.row.TimeStart;
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
      this.form.EmployeeID = "";
      this.form.EmployeeName = "";
      this.form.GroupID = "";
      this.form.TimeStart = "";
      this.form.TimeEnd = "";
      this.form.Hour = 0;

      this.form.Shift = "";
      this.form.ApproveID = "";
      this.form.TimeApprove = "";
      this.form.Status = "";
      this.form.Note = "";
      this.form.TimeCreate = "";
      this.form.CreaterID = "";
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
