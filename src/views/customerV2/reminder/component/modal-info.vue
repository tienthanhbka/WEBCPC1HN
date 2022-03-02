<template>
  <div slot="body" v-loading="loadingForm">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="120px"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Nhóm" prop="GroupID">
            <el-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.GroupID"
              placeholder="Chọn nhóm"
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in groups"
                :key="index"
                :label="item.idGroup"
                :value="item.idGroup"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Địa bàn" prop="City">
            <el-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.City"
              filterable
              @change="changeCity"
              clearable
              placeholder="Chọn địa bàn..."
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in citys"
                :key="index"
                :label="item.city"
                :value="item.city"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Khách hàng" prop="PlaceName">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.PlaceName"
          filterable
          @change="changeCus"
          clearable
          placeholder="Chọn khách hàng..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in places"
            :key="index"
            :label="item.PlaceName"
            :value="item"
          >
            <span style="float: left">{{ item.PlaceName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.PlaceId
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Loại" prop="TypeNote">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.TypeNote"
          placeholder="Chọn loại..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Lời nhắc" prop="Note">
        <contenteditable
          tag="p"
          :contenteditable="mode < 2 ? isDisable : !isDisable"
          v-model="form.Note"
          class="t-hover"
          t-placeholder="Nhập ghi chú..."
        />
      </el-form-item>
      <el-form-item label="Thời hạn" prop="DateEnd">
        <div class="inline-block">
          <el-date-picker
            :disabled="mode > 2 ? isDisable : !isDisable"
            v-model="form.DateStart"
            type="date"
            placeholder="Từ ngày"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            :disabled="mode > 2 ? isDisable : !isDisable"
            v-model="form.DateEnd"
            type="date"
            placeholder="Đến ngày"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <!-- <el-row :gutter="20" v-if="mode > 2">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Nhân viên">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="SĐT">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.Creater"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-form-item label="Trạng thái" prop="Status" v-if="mode > 2">
        <el-tag
          :type="form.Status | reminderStatusColor"
          style="width:120px;text-align:center;"
          effect="plain"
          >{{ form.Status | reminderStatusText }}</el-tag
        >
      </el-form-item>
      <!-- <el-row :gutter="20" v-if="mode > 2 && form.AcceptID">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người duyệt" prop="AccpetID">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.AcceptName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian duyệt" prop="TimeAccept">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeAccept"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
    <div style="text-align:center;margin:10px 0">
      <el-button type="info" size="small" @click="close">
        Đóng
      </el-button>
      <el-button
        v-if="mode != 3"
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
import { CreateReminder, UpdateReminder } from "@/api/reminder";
import { GetPlaceByCity } from "@/api/KDPlace";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    groups: Array,
    types: Array,
    citys: Array
  },
  components: {},
  data() {
    return {
      isDisable: true,
      loadingForm: false,
      places: [],
      form: {
        RowID: "",
        PlaceID: "",
        PlaceName: "",
        City: "",
        GroupID: "",
        DateStart: "",
        DateEnd: "",
        Note: "",
        Creater: "",
        TypeNote: "",
        TimeCreate: "",
        Status: "",
        ModifyID: "",
        TimeUpdate: "",
        TimeAccept: ""
      },
      rules: {
        PlaceName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        DateStart: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        DateEnd: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        Note: [
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
        GroupID: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        City: [
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
          this.form.DateStart = Date.parse(this.form.DateStart).toString(
            "yyyy-MM-dd"
          );
          this.form.DateEnd = Date.parse(this.form.DateEnd).toString(
            "yyyy-MM-dd"
          );
          if (this.mode == 1) {
            CreateReminder({
              ReminderInfo: this.form
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
            UpdateReminder({
              ReminderInfo: this.form
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
    changeCus(cus) {
      this.form.PlaceID = cus.PlaceId;
      this.form.PlaceName = cus.PlaceName;
    },
    changeCity(val) {
      this.form.PlaceID = "";
      this.form.PlaceName = "";
      const req = {
        CityName: val,
        Search: "",
        PType: "",
        NumberRow: null,
        PageNumber: null
      };
      GetPlaceByCity(req).then(res => {
        if (res.RespCode == 0) {
          this.places = res.PlaceLst;
        }
      });
    },
    close() {
      this.$emit("closeOK");
    },

    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.GroupID = this.row.GroupID;
        this.form.PlaceID = this.row.PlaceID;
        this.form.City = this.row.City;
        this.form.PlaceName = this.row.PlaceName;
        this.form.DateStart = Date.parse(this.row.DateStart).toString(
          "yyyy-MM-dd"
        );
        this.form.DateEnd = Date.parse(this.row.DateEnd).toString("yyyy-MM-dd");
        this.form.Note = this.row.Note;
        this.form.Creater = this.row.Creater;
        this.form.TimeCreate = this.row.TimeCreate;
        this.form.TimeUpdate = this.row.TimeUpdate;
        this.form.ModifyID = this.row.ModifyID;
        this.form.TypeNote = this.row.TypeNote;
        this.form.Status = this.row.Status;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.GroupID = "";
      this.form.PlaceID = "";
      this.form.City = "";
      this.form.PlaceName = "";
      this.form.DateStart = "";
      this.form.DateEnd = "";
      this.form.Note = "";
      this.form.Creater = "";
      this.form.TimeCreate = "";
      this.form.TimeModify = "";
      this.form.UpdateID = "";
      this.form.TypeNote = "";
      this.form.Status = "";
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

<style lang="scss">
.inline-block {
  display: inline-block;
  padding: 5px;
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff !important;
  border-color: #e4e7ed;
  color: #232425 !important;
  cursor: not-allowed;
}
.t-hover:hover {
  outline: 1pt dashed #77a5cc;
  cursor: text;
}
.t-hover:empty:before {
  content: attr(t-placeholder);
  color: #9197a3;
  font-weight: 100;
  padding: 3px;
}
.t-hover {
  border: 1px dashed #ccc;
}
.t-hover:focus {
  cursor: text;
  outline: 1pt dashed #77a5cc;
}
</style>
