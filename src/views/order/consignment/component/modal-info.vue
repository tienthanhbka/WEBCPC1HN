<template>
  <div slot="body" v-loading="loadingForm">
    <el-form
      ref="form"
      label-position="top"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="130px"
      size="mini"
    >
      <el-form-item label="Nhóm" prop="GroupID">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.GroupID"
          placeholder="Chọn nhóm"
          style="width:100%"
        >
          <el-option
            v-for="item in groups"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20" v-if="mode > 2">
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
      <el-form-item label="Thời gian" prop="DateEnd">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-date-picker
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.DateStart"
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
            >
            </el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-date-picker
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.DateEnd"
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Danh sách sản phẩm">
        <div v-show="mode != 3 && mode != 4">
          <div class="inline-block" style="padding-left: 0;">
            <el-select
              style="width:100%"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="productN"
              filterable
              @change="changePro"
              clearable
              placeholder="Chọn sản phẩm..."
            >
              <el-option
                v-for="(item, index) in items"
                :key="index"
                :label="item.ProductName"
                :value="item"
              >
                <span style="float: left">{{ item.ProductName }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{
                  item.ProductID
                }}</span>
              </el-option>
            </el-select>
          </div>
          <div class="inline-block">
            <el-button type="primary" size="mini" @click="addPro">
              Thêm</el-button
            >
          </div>
        </div>
        <el-table
          :data="form.ConsignmentLineLst"
          size="small"
          border
          style="width: 100%"
        >
          <el-table-column align="center" label="STT" width="95">
            <template slot-scope="props">
              {{ props.$index + 1 }}
              <el-tooltip content="Xóa" placement="top" v-show="mode < 3"
                ><el-button @click="delItem(props.$index)" type="text">
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="Mã" align="center" width="100">
            <template slot-scope="props">
              {{ props.row.ProductID }}
            </template>
          </el-table-column>
          <el-table-column label="Tên sản phẩm" min-width="160">
            <template slot-scope="props">
              {{ props.row.ProductName }}
            </template>
          </el-table-column>
          <el-table-column label="Số lượng" width="160" align="center">
            <template slot-scope="props">
              <el-input-number
                v-model="props.row.Quantity"
                v-if="mode != 3 && mode != 4"
                size="small"
              ></el-input-number>
              <span v-else>{{ props.row.Quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ĐVT" width="80" align="center">
            <template slot-scope="props">
              {{ props.row.Unit }}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="Gửi mail đến" prop="MailSent">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.MailSent"
          multiple
          style="width:100%"
          filterable
          allow-create
          default-first-option
          placeholder="Nhập email người nhận"
        >
          <el-option
            v-for="item in emailLst"
            :key="item.EmailCompany"
            :label="item.EmailCompany"
            :value="item.EmailCompany"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="Note">
        <el-input
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Note"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập ghi chú..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Trạng thái" prop="Status" v-if="mode > 2">
        <el-tag
          :type="form.Status | oceStatusColor"
          style="width:120px;text-align:center;"
          effect="plain"
          >{{ form.Status | oceStatusText }}</el-tag
        >
      </el-form-item>
      <el-row :gutter="20" v-if="mode > 2 && form.AcceptID">
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
      </el-row>
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
import {
  CreateConsignment,
  UpdateConsignment,
  AcceptConsignment
} from "@/api/order";

export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    places: Array,
    mode: Number,
    groups: Array,
    emailLst: Array,
    items: Array
  },
  components: {},
  data() {
    return {
      isDisable: true,
      loadingForm: false,
      form: {
        RowID: "",
        HeaderID: "",
        GroupID: "",
        PlaceID: "",
        PlaceName: "",
        DateStart: "",
        DateEnd: "",
        Note: "",
        Creater: "",
        EmployeeName: "",
        TimeCreate: "",
        Status: "",
        AcceptID: "",
        AcceptName: "",
        TimeAccept: "",
        MailSent: [],
        ConsignmentLineLst: []
      },
      productN: "",
      productI: "",
      productU: "",
      //products: [],
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
        GroupID: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        MailSent: [
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
          if (this.form.ConsignmentLineLst.length < 1) {
            this.$notify({
              title: "Xảy ra lỗi",
              message: "Bạn chưa chọn sản phẩm",
              type: "error"
            });
            return;
          }
          this.form.MailSent = this.form.MailSent
            ? this.form.MailSent.join(";")
            : this.form.MailSent;
          this.form.DateStart = Date.parse(this.form.DateStart).toString(
            "yyyy-MM-dd HH:mm:ss"
          );
          this.form.DateEnd = Date.parse(this.form.DateEnd).toString(
            "yyyy-MM-dd HH:mm:ss"
          );
          if (this.mode == 1) {
            CreateConsignment({
              ConsignmentInfo: this.form
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
            UpdateConsignment({
              ConsignmentInfo: this.form
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
            AcceptConsignment({
              HeaderID: this.form.HeaderID,
              Status: 3
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
      this.form.PlaceID = cus.PlaceId;
      this.form.PlaceName = cus.PlaceName;
      this.products = [];
    },
    changePro(pro) {
      this.productN = pro.ProductName;
      this.productI = pro.ProductID;
      this.productU = pro.UnitOfMeasure;
      this.addPro();
    },
    addPro() {
      var obj = {
        ProductID: this.productI,
        ProductName: this.productN,
        Quantity: 0,
        Unit: this.productU,
        HeaderID: this.form.HeaderID
      };
      this.form.ConsignmentLineLst.push(obj);
      this.productN = "";
      this.productI = "";
      this.productU = "";
    },
    delItem(index) {
      this.form.ConsignmentLineLst.splice(index, 1);
    },
    checkDate() {
      if (this.form.DateStart && this.form.DateEnd) {
        let checkTime =
          Date.parse(this.form.DateEnd) - Date.parse(this.form.DateStart);
        if (checkTime <= 0) {
          this.$notify({
            title: "Xảy ra lỗi",
            message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
            type: "error"
          });
          this.form.DateEnd = "";
        }
      }
    },
    close() {
      this.$emit("closeOK");
    },
    // fetchItem() {
    //   if (this.products.length < 1) {
    //     this.loadingForm = true;
    //     const req = {
    //       no: this.form.PlaceID,
    //       PageNumber: 1,
    //       RowspPage: 30,
    //       search: "",
    //       start: this.form.DateStart,
    //       end: this.form.DateEnd
    //     };
    //     GetBFOItemByCus(req).then(res => {
    //       if (res.ResCode == 0) {
    //         this.products = res.Data;
    //         this.loadingForm = false;
    //       }
    //     });
    //   }
    // },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.GroupID = this.row.GroupID;
        this.form.HeaderID = this.row.HeaderID;
        this.form.PlaceID = this.row.PlaceID;
        this.form.PlaceName = this.row.PlaceName;
        this.form.DateStart = Date.parse(this.row.DateStart).toString(
          "yyyy-MM-dd"
        );
        this.form.DateEnd = Date.parse(this.row.DateEnd).toString("yyyy-MM-dd");
        this.form.Note = this.row.Note;
        this.form.EmployeeName = this.row.EmployeeName;
        this.form.Creater = this.row.Creater;
        this.form.TimeCreate = this.row.TimeCreate;
        this.form.TimeAccept = this.row.TimeAccept;
        this.form.AcceptID = this.row.AcceptID;
        this.form.AcceptName = this.row.AcceptName;
        this.form.ConsignmentLineLst = this.row.ConsignmentLineLst;
        this.form.Status = this.row.Status;
        this.form.MailSent = this.row.MailSent
          ? this.row.MailSent.split(";")
          : [];
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.HeaderID = "";
      this.form.GroupID = "";
      this.form.PlaceID = "";
      this.form.PlaceName = "";
      this.form.DateStart = "";
      this.form.DateEnd = "";
      this.form.Note = "";
      this.form.EmployeeName = "";
      this.form.Creater = "";
      this.form.TimeCreate = "";
      this.form.TimeAccpet = "";
      this.form.AcceptID = "";
      this.form.AcceptName = "";
      this.form.Status = "";
      this.form.MailSent = [];
      this.form.ConsignmentLineLst = [];
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    },
    "form.DateStart"() {
      this.checkDate();
      this.products = [];
    },
    "form.DateEnd"() {
      this.checkDate();
      this.products = [];
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
</style>
