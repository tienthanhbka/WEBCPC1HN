<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="130px"
      size="mini"
    >
      <el-row :gutter="20" v-if="mode > 3">
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
      <el-form-item label="Tổ chức">
        <el-input
          class="selectIDGroup"
          :disabled="isDisable"
          v-model="headerF.PlaceName"
        ></el-input>
      </el-form-item>
      <el-form-item label="Khách hàng" prop="CustomerName">
        <el-select
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.CustomerName"
          filterable
          @change="changeCus"
          clearable
          placeholder="Chọn khách hàng..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in customers"
            :key="index"
            :label="item.CustomerName"
            :value="item"
          >
            <span style="float: left">{{ item.CustomerName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.Position
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Số call thực hiện" prop="QuantityCall">
        <el-input
          class="selectIDGroup"
          type="number"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.QuantityCall"
          placeholder="Nhập số call dự kiến"
        ></el-input>
        <span style="font-size:10pt;color:#29d;font-style:italic"
          >Tối đa: {{ numCall }}</span
        >
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
import { CreateCallF, UpdateCallF } from "@/api/oce";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    headerF: Object,
    mode: Number,
    customers: Array,
    totalCall: Number
  },
  components: {},
  data() {
    return {
      isDisable: true,
      form: {
        RowID: "",
        OCE_Header: "",
        PlaceID: "",
        PlaceName: "",
        CustomerName: "",
        CustomerID: "",
        QuantityCall: "",
        Month: "",
        Year: "",
        Note: "",
        EmployeeID: "",
        TimeCreate: "",
        TimeUpdate: "",
        ManagerID: "",
        TimeApprove: "",
        Status: "",
        numCall: 0
      },

      rules: {
        PlaceName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        QuantityCall: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        CustomerName: [
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
            if (Math.abs(this.numCall) - this.form.QuantityCall < 0) {
              this.$notify({
                title: "Xảy ra lỗi",
                message: "Đăng kí vượt quá số call tối đa",
                type: "warning",
                position: "top-left"
              });
              return;
            }
            this.form.PlaceID = this.headerF.PlaceID;
            this.form.OCE_Header = this.headerF.OCE_Header;
            CreateCallF({
              CallFInfo: this.form
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
            if (Math.abs(this.numCall) - this.form.QuantityCall < 0) {
              this.$notify({
                title: "Xảy ra lỗi",
                message: "Đăng kí vượt quá số call tối đa",
                type: "warning",
                position: "top-left"
              });
              return;
            }
            UpdateCallF({
              CallFInfo: this.form
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
          } else if (this.mode == 4) {
            AcceptCallF({
              DocumentID: this.form.DocumentID,
              Type: val,
              NoteCN: this.form.NoteCN
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Xác nhận phiếu thành công",
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
      this.form.CustomerID = cus.CustomerId;
      this.form.CustomerName = cus.CustomerName;
    },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.OCE_Header = this.row.OCE_Header;
        this.form.PlaceID = this.row.PlaceID;
        this.form.PlaceName = this.row.PlaceName;
        this.form.Month = this.row.Month;
        this.form.Year = this.row.Year;
        this.form.Note = this.row.Note;
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.TimeCreate = this.row.TimeCreate;
        this.form.TimeUpdate = this.row.TimeUpdate;
        this.form.ManagerID = this.row.ManagerID;
        this.form.TimeApprove = this.row.TimeApprove;
        this.form.Status = this.row.Status;
        this.form.CustomerName = this.row.CustomerName;
        this.form.CustomerID = this.row.CustomerID;
        this.form.QuantityCall = this.row.QuantityCall;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.OCE_Header = "";
      this.form.PlaceID = "";
      this.form.PlaceName = "";
      this.form.Month = "";
      this.form.Year = "";
      this.form.Note = "";
      this.form.EmployeeID = "";
      this.form.TimeCreate = "";
      this.form.TimeUpdate = "";
      this.form.ManagerID = "";
      this.form.TimeApprove = "";
      this.form.Status = "";
      this.form.CustomerName = "";
      this.form.CustomerID = "";
      this.form.QuantityCall = "";
    },
    getNumCal() {
      if (this.mode == 2) {
        this.numCall = this.totalCall + this.form.QuantityCall;
      } else {
        this.numCall = this.totalCall;
      }
    }
  },
  created() {
    this.initData();
    this.getNumCal();
  },
  watch: {
    row() {
      this.initData();
      this.getNumCal();
    },
    headerF() {
      this.getNumCal();
    },
    mode() {
      this.getNumCal();
    },
    totalCall() {
      this.getNumCal();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
