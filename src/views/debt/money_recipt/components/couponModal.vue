<template>
  <modal :id="modalId" :ref="modalId" v-cloak>
    <template slot="title"
      >Phiếu nộp tiền</template
    >

    <div slot="body">
      <el-form
        aria-orientation="vertical"
        :model="form"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="Số tiền" prop="amount">
          <!-- <el-input type="number" v-model="form.amount" autocomplete="off"></el-input> -->
          <div class="el-input">
            <cleave
              v-model="form.amount"
              :options="{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }"
              class="el-input__inner"
            ></cleave>
          </div>
          <div
            style="line-height: 22px;
    font-style: italic;
    color: #2980b9;"
          >
            {{ form.amount | toText }} đồng
          </div>
        </el-form-item>

        <el-form-item label="Ngày chuyển" prop="note">
          <div class="inline-block">
            <el-date-picker
              style="width:100%"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              v-model="form.timeSendMoney"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="Tài khoản nhận" prop="note">
          <el-select
            style="width:100%"
            v-model="form.account"
            placeholder="Tài khoản nhận"
          >
            <el-option
              v-for="item in accountLst"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Đơn hàng từ" v-if="!this.coupon">
          <el-radio-group v-model="form.fast_sales">
            <el-radio :label="1">FAST</el-radio>
            <el-radio :label="0">BFO</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Nguồn tiền">
          <el-radio-group v-model="form.source_money">
            <el-radio :label="'0'">Thu từ khách hàng</el-radio>
            <el-radio :label="'1'">Tạm ứng công nợ</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Ngày dự kiến trả" v-if="form.source_money == 1">
          <div class="inline-block">
            <el-date-picker
              style="width:100%"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              v-model="form.time_expected"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="Ghi chú" prop="note">
          <el-input
            type="text"
            v-model="form.note"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" @click="addCoupon">{{
        coupon ? "Sửa" : "Thêm"
      }}</el-button>
    </div>
  </modal>
</template>
<script>
import { CreateMoneyReciptCoupon, EditMoneyReciptCoupon } from "@/api/debt";
import { NumberToText } from "@/utils/index";

export default {
  props: {
    modalId: String,
    coupon: Object
  },
  data() {
    return {
      accountLst: [
        "MT/MN - VIB - 003704060211725",
        "Miền Bắc - ACB - 18418457",
        "TIỀN MẶT",
        "KHÁC"
      ],
      form: {
        amount: "",
        note: "",
        timeSendMoney: "",
        account: "",
        fast_sales: 1,
        source_money: "0",
        time_expected: ""
      }
    };
  },
  methods: {
    addCoupon() {
      if (!this.coupon) {
        var data = this.form;
        data.amount = Number(data.amount);
        CreateMoneyReciptCoupon({
          data: data
        }).then(res => {
          if (res.ResCode == 0) {
            res.Data.sumApply = 0;
            this.$notify({
              title: "Thành công",
              message: "Tạo phiếu thành công",
              type: "success"
            });
            this.$emit("new-coupon", res.Data);
            this.closeModal();
          }
        });
      } else {
        var data = this.form;
        data.amount = Number(data.amount);
        if (data.amount < this.coupon.sumApply) {
          this.$message({
            message: "Số tiền đã áp không được lớn hơn số tiền nộp",
            type: "error"
          });
          return;
        }
        data.id = this.coupon.rowID;
        EditMoneyReciptCoupon({ data: data }).then(res => {
          this.coupon.amount = res.Data.amount;
          this.coupon.time_send_money = res.Data.timeSendMoney;
          this.coupon.note = res.Data.note;
          this.coupon.account_bank = res.Data.account;
          this.coupon.fast_sales = res.Data.fast_sales;
          this.coupon.source_money = res.Data.source_money;
          this.coupon.time_expected = res.Data.time_expected;
          this.closeModal();
          this.$message({
            message: "Đã sửa phiếu",
            type: "success"
          });
        });
      }
    },
    closeModal() {
      VoerroModal.hide(this.modalId);
    },
    changeSource() {
      this.form.time_expected = "";
    }
  },
  watch: {
    coupon(val) {
      //console.log(val);

      if (val == null) {
        this.form = {
          amount: "",
          note: "",
          timeSendMoney: "",
          account: "",
          fast_sales: 0,
          source_money: "0",
          time_expected: ""
        };
      } else {
        this.form = {
          amount: Number(val.amount),
          note: val.note,
          timeSendMoney: val.time_send_money
            ? val.time_send_money.substring(0, 10)
            : "",
          account: val.account_bank,
          fast_sales: val.fast_sales,
          source_money: val.source_money,
          time_expected: val.time_expected
        };
      }
    },
    source_money() {
      this.changeSource();
    }
  },
  filters: {
    toText: function(num) {
      return NumberToText(Number(num));
    }
  },
  created() {
    this.form.account = this.accountLst[0];
    //console.log("à");
  }
};
</script>
