<template>
  <div style="margin-top:-35px">
    <el-dialog
      custom-class="modal-class"
      title="Khách hàng"
      :visible.sync="cModalVisible"
      append-to-body
    >
      <cus-modal-content
        @cusAdded="onCusAdded"
        @closeModal="cModalVisible = false"
        type="TH"
      ></cus-modal-content>
    </el-dialog>
    <el-form
      aria-orientation="vertical"
      label-position="top"
      :model="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="type == 'KD' ? 12 : 24"
          :lg="type == 'KD' ? 12 : 24"
        >
          <el-form-item label="Khách hàng" prop="note">
            <el-input
              :disabled="true"
              v-model="form.cusName"
              class="input-with-select"
            >
              <el-button
                v-if="coupon == null"
                @click="openCModal"
                slot="prepend"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="type == 'KD'" :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ngày hiệu lực cơ sở" prop="note">
            <el-date-picker
              style="width:100%"
              v-model="form.baseDateStart"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="note">
        <el-input type="text" v-model="form.note" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div
      class="dialog-footer"
      style="margin-bottom:-15px;margin-top:20px;text-align:right"
    >
      <el-button @click="$emit('closeModal')">Cancel</el-button>
      <el-button type="primary" @click="couponModalOK">{{
        coupon == null ? "Thêm" : "Sửa"
      }}</el-button>
    </div>
  </div>
</template>
<script>
import CusModalContent from "./cus-modal-content";
import {
  AddCommissionOrderHeader,
  EditCommissionOrderHeader
} from "@/api/debt";
export default {
  components: {
    CusModalContent
  },
  props: {
    type: String,
    coupon: Object,
    visible: Boolean
  },
  data() {
    return {
      cModalVisible: false,
      form: {
        cusName: "",
        cusNo: "",
        note: "",
        baseDateStart: "",
        type: ""
      }
    };
  },
  methods: {
    onCusAdded(cus) {
      this.form.cusName = cus.Name;
      this.form.cusNo = cus.No_;
      this.form.type = this.type;
    },
    openCModal() {
      this.cModalVisible = true;
    },
    couponModalOK() {
      if (this.form.cusName == null || this.form.cusName == "") {
        this.$message({
          message: "Hãy chọn khách hàng",
          type: "error"
        });
        return;
      }
      if (this.type == "KD") {
        if (this.form.baseDateStart == null) {
          this.$message({
            message: "Hãy chọn ngày hiệu lực",
            type: "error"
          });
          return;
        }
      }
      if (this.coupon == null) {
        AddCommissionOrderHeader({
          note: this.form.note,
          baseDateStart: this.form.baseDateStart,
          idCustomer: this.form.cusNo,
          type: this.type
        }).then(res => {
          this.$emit("newCoupon", res.Data);
          this.visible = false;
        });
      } else {
        EditCommissionOrderHeader({
          rowID: this.coupon.RowID,
          baseDateStart: this.form.baseDateStart,
          note: this.form.note
        }).then(res => {
          this.$emit("closeModal");
          this.coupon.note = this.form.note;
        });
      }
    }
  },
  created() {
    this.form.baseDateStart = Date.today().toString("yyyy-MM-dd");
    if (this.coupon == null) {
      this.form.cusName = null;
      this.form.note = null;
    } else {
      this.form.cusName = this.coupon.CusName;
      this.form.note = this.coupon.note;
    }
  },
  watch: {
    coupon() {
      if (this.coupon == null) {
        this.form.cusName = null;
        this.form.note = null;
        this.form.cusNo = null;
      } else {
        this.form.cusName = this.coupon.CusName;
        this.form.cusNo = this.coupon.idCustomer;
        this.form.note = this.coupon.note;
      }
    }
  }
};
</script>
<style lang="css">
.el-form-item {
  margin-bottom: 6px;
}
.el-form--label-top .el-form-item__label {
  padding: 0px;
}
.el-input.is-disabled .el-input__inner {
  background-color: white;
  /* border-color: #E4E7ED; */
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
