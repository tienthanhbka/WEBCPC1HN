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
      <el-form-item label="Nhóm" prop="GroupID">
        <el-select
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.GroupID"
          filterable
          clearable
          placeholder="Chọn nhóm..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20" v-if="mode > 3">
        <el-col :xs="24" :lg="12">
          <el-form-item label="MNV">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Tên NV">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeName"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Khách hàng" prop="PlaceID" v-if="mode < 3">
        <el-select
          class="selectIDGroup"
          v-model="form.PlaceID"
          filterable
          clearable
          placeholder="Chọn khách hàng..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in places"
            :key="index"
            :label="item.PlaceName"
            :value="item.PlaceId"
          >
            <span style="float: left">{{ item.PlaceName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.PlaceId
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Khách hàng" v-if="mode > 2">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.PlaceName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SL đặt hàng" prop="QuantityOrder">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập SP + SL (Sugam-BFS+200,...)"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.QuantityOrder"
        ></el-input>
      </el-form-item>
      <el-form-item label="Lý do" prop="Note">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Note"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập lý do..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Gửi mail đến" prop="Email">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          class="selectIDGroup"
          style="width:100%"
          v-model="form.Email"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Nhập email người nhận"
        >
          <el-option
            v-for="item in emails"
            :key="item.EmailCompany"
            :label="item.EmailCompany"
            :value="item.EmailCompany"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Trạng thái" v-if="mode > 2">
        <el-tag
          :type="form.Status | DebtExtentionStatusColor"
          style="width:140px;text-align:center"
          effect="plain"
          >{{ form.Status | DebtExtentionStatusText }}</el-tag
        >
      </el-form-item>
      <!-- <el-row :gutter="20" v-if="mode > 2 && form.ManagerID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Quản lý duyệt">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.ManagerID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeManager"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="20" v-if="mode > 2 && form.AcceptID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Xác nhận">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.AcceptID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeAccept"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="mode > 2">
        <span slot="label" style="font-size:10pt;color: #02bc77;">
          Ghi chú</span
        >
        <el-input
          class="selectIDGroup"
          :disabled="mode == 4 ? !isDisable : isDisable"
          v-model="form.NoteCN"
          type="textarea"
          rows="2"
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
      <el-button
        v-if="mode == 4"
        type="info"
        size="small"
        icon="el-icon-circle-close"
        @click="create(0)"
      >
        Không mở mã
      </el-button>
      <el-button
        v-if="mode == 4"
        type="success"
        size="small"
        icon="el-icon-check"
        @click="create(1)"
      >
        Mở mã
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  CreateDebtExtension,
  UpdateDebtExtension,
  AcceptDebtExtension
} from "@/api/debt";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    groups: Array,
    places: Array,
    emails: Array
  },
  components: {},
  data() {
    return {
      isDisable: true,
      form: {
        DocumentID: "",
        EmployeeID: "",
        EmployeeName: "",
        PlaceName: "",
        GroupID: "",
        PlaceID: "",
        Note: "",
        NoteCN: "",
        Status: "",
        TimeCreate: "",
        ManagerID: "",
        AcceptID: "",
        TimeManager: "",
        TimeAccept: "",
        Email: "",
        QuantityOrder: ""
      },

      rules: {
        GroupID: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        PlaceID: [
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
        Email: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        QuantityOrder: [
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
          this.form.Email = this.form.Email ? this.form.Email.join(";") : "";
          if (this.mode == 1) {
            CreateDebtExtension({
              DebtExtensionInfo: this.form
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
            UpdateDebtExtension({
              DebtExtensionInfo: this.form
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
            AcceptDebtExtension({
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
    initData() {
      if (this.row) {
        this.form.DocumentID = this.row.DocumentID;
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.EmployeeName = this.row.EmployeeName;
        this.form.PlaceName = this.row.PlaceName;
        this.form.GroupID = this.row.GroupID;
        this.form.PlaceID = this.row.PlaceID;
        this.form.Note = this.row.Note;
        this.form.NoteCN = this.row.NoteCN;
        this.form.Status = this.row.Status;
        this.form.TimeCreate = this.row.TimeCreate;
        this.form.ManagerID = this.row.ManagerID;
        this.form.AcceptID = this.row.AcceptID;
        this.form.TimeManager = this.row.TimeManager;
        this.form.TimeAccept = this.row.TimeAccept;
        this.form.QuantityOrder = this.row.QuantityOrder;
        this.form.Email = this.row.Email ? this.row.Email.split(";") : [];
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.DocumentID = "";
      this.form.EmployeeID = "";
      this.form.EmployeeName = "";
      this.form.PlaceName = "";
      this.form.GroupID = "";
      this.form.PlaceID = "";
      this.form.Note = "";
      this.form.NoteCN = "";
      this.form.Status = "";
      this.form.TimeCreate = "";
      this.form.ManagerID = "";
      this.form.AcceptID = "";
      this.form.TimeManager = "";
      this.form.TimeAccept = "";
      this.form.QuantityOrder = "";
      this.form.Email = [];
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
