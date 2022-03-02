<template>
  <div>
    <el-form
      ref="form"
      label-position="left"
      class="form-custom"
      label-width="90px"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Tên KH">
            <el-select
              class="selectIDGroup"
              clearable
              filterable
              @change="changeCustomer"
              v-model="form.PeopleName"
              placeholder="Chọn KH"
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in customerLst"
                :key="index"
                :label="item.CustomerName"
                :value="item"
              >
                <span style="float: left">{{ item.CustomerName }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{
                  item.Job
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Chức vụ">
            <el-input
              class="selectIDGroup"
              v-model="form.Position"
              placeholder="Nhập chức vụ..."
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="SĐT">
            <el-input
              class="selectIDGroup"
              v-model="form.PhoneNumber"
              placeholder="Nhập số điện thoại KH..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Email">
            <el-input
              class="selectIDGroup"
              v-model="form.Email"
              placeholder="Nhập Email..."
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Hình thức">
          <el-radio-group v-model="form.TypePay" @change="changeTypePay">
            <el-radio label="TM">TM</el-radio>
            <el-radio label="CK">CK</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row :gutter="20" v-if="form.TypePay == 'CK'">
        <el-col :xs="24" :lg="12">
          <el-form-item label="STK">
            <el-input
              class="selectIDGroup"
              v-model="form.AccountBank"
              placeholder="Nhập số tk..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Ngân hàng">
            <el-input
              class="selectIDGroup"
              v-model="form.BankName"
              placeholder="Nhập tên ngân hàng..."
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Chọn mô">
          <el-radio-group v-model="form.TypeCharge">
            <el-radio label="SYT" v-if="row.SYT">SYT</el-radio>
            <el-radio label="BH" v-if="row.BH">BH</el-radio>
            <el-radio label="BS" v-if="row.BS">BS</el-radio>
            <el-radio label="GH" v-if="row.GH">GH</el-radio>
            <el-radio label="NT" v-if="row.NT">NT</el-radio>
            <el-radio label="GD" v-if="row.GD">GD</el-radio>
            <el-radio label="MKT" v-if="row.MKT">MKT</el-radio>
            <el-radio label="KT" v-if="row.KT">KT</el-radio>
            <el-radio label="CTV" v-if="row.CTV">CTV</el-radio>
            <el-radio label="TD" v-if="row.TD">TD</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Chi trả">
            <cleave
              v-model="form.Charge"
              :options="{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }"
              class="el-input__inner"
            ></cleave>
            <div
              style="line-height: 22px;font-size:10pt;word-break: break-word;font-style: italic;color: #2980b9;"
            >
              {{ form.Charge | toText }} đồng
            </div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="TG chi trả">
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.TimeCharge"
              type="date"
              placeholder="Thời gian chi trả..."
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <div style="text-align:center;" v-if="mode !== 2">
      <el-button type="primary" size="small" icon="fas fa-plus" @click="create">
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateReportCharge, UpdateReportCharge } from "@/api/reportCharge";
import { GetCustomerByPId } from "@/api/KDCustomer";
import { NumberToText } from "@/utils/index";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    line: {
      type: Object,
      require: true
    },
    mode: Number
  },
  components: {},
  filters: {
    toText: function(num) {
      return NumberToText(Number(num));
    }
  },
  data() {
    return {
      form: {
        RowID: "",
        DocumentID: "", //ID header
        PeopleID: "", //ID KH
        PeopleName: "", //Tên khách hàng
        Position: "", //chức vụ
        Email: "", //Email KH
        TypeCharge: "", //Mô chi trả
        Charge: "", //Số tiền chi trả
        PhoneNumber: "", //Số điện thoại khách hàng
        BankName: "", //Tên ngân hàng
        AccountBank: "", //Số tk ngân hàng
        TimeCharge: "", //Thời gian chi trả
        TypePay: "", //Hình thức tt
        CreaterID: "",
        TimeCreate: "",
        Status: ""
      },
      customerLst: []
    };
  },

  methods: {
    create() {
      if (!this.form.PeopleID || !this.form.Charge || !this.form.TypePay) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Vui lòng điền đầy đủ thông tin KH",
          type: "error",
          position: "top-left"
        });
      } else {
        if (this.mode == 1) {
          this.form.DocumentID = this.row.DocumentID;
          CreateReportCharge({ LineInfo: this.form }).then(response => {
            if (response.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Tạo báo cáo thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("createOK");
              this.initData();
            }
          });
        } else if (this.mode == 3) {
          UpdateReportCharge({ LineInfo: this.form }).then(response => {
            if (response.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Cập nhật số đăng ký thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("createOK");
              this.initData();
            }
          });
        }
      }
    },
    fetchKH() {
      if (this.row) {
        var req = {
          PlaceId: this.row.CustomerID
        };
        GetCustomerByPId(req).then(res => {
          if (res.RespCode == 0) {
            this.customerLst = res.CustomerLst;
          }
        });
      }
    },
    initData() {
      if (this.line) {
        this.form.RowID = this.line.RowID;
        this.form.DocumentID = this.line.DocumentID; //ID header
        this.form.PeopleID = this.line.PeopleID; //ID KH
        this.form.PeopleName = this.line.PeopleName; //Tên khách hàng
        this.form.Position = this.line.Position; //chức vụ
        this.form.Email = this.line.Email; //Email KH
        this.form.TypeCharge = this.line.TypeCharge; //Mô chi trả
        this.form.Charge = this.line.Charge; //Số tiền chi trả
        this.form.PhoneNumber = this.line.PhoneNumber; //Số điện thoại khách hàng
        this.form.BankName = this.line.BankName; //Tên ngân hàng
        this.form.AccountBank = this.line.AccountBank; //Số tk ngân hàng
        this.form.CreaterID = this.line.CreaterID;
        this.form.TimeCharge = this.line.TimeCharge;
        this.form.TimeCreate = this.line.TimeCreate;
        this.form.Status = this.line.Status;
        this.form.TypePay = this.line.TypePay;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.DocumentID = ""; //ID header
      this.form.PeopleID = ""; //ID KH
      this.form.PeopleName = ""; //Tên khách hàng
      this.form.Position = ""; //chức vụ
      this.form.Email = ""; //Email KH
      this.form.TypeCharge = ""; //Mô chi trả
      this.form.Charge = ""; //Số tiền chi trả
      this.form.PhoneNumber = ""; //Số điện thoại khách hàng
      this.form.BankName = ""; //Tên ngân hàng
      this.form.AccountBank = ""; //Số tk ngân hàng
      this.form.CreaterID = "";
      this.form.TimeCreate = "";
      this.form.Status = "";
      this.form.TimeCharge = "";
      this.form.TypePay = "";
      this.customerLst = [];
    },
    changeCustomer(val) {
      this.form.PeopleID = val.CustomerId;
      this.form.PeopleName = val.CustomerName;
      this.form.Position = val.Degree;
      this.form.PhoneNumber = val.Phone;
      this.form.AccountBank = val.BankCode;
      this.form.BankName = val.BankName;
    },
    changeTypePay(val) {
      if (val != "CK") {
        this.form.BankName = "";
        this.form.AccountBank = "";
      }
    }
  },
  created() {
    this.initData();
    this.fetchKH();
  },
  watch: {
    row() {
      this.fetchKH();
    },
    line() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
