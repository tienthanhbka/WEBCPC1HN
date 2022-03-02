<template>
  <div class="order-mail">
    <div class="block">
      <p>Đơn hàng</p>
      <el-select
        v-model="documentID"
        clearable
        filterable
        placeholder="Chọn đơn hàng..."
        style="width:100%"
      >
        <el-option
          v-for="item in invoiceList"
          :key="item.No_"
          :label="item.BillAddress"
          :value="item.No_"
        >
          <span style="float: left">{{ item.BillAddress }}</span>
          <span style="float: right; color: #8492a6; font-size: 10px">{{
            item.BillToName
          }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <p>Gửi mail đến</p>
      <el-select
        v-model="email"
        multiple
        filterable
        clearable
        allow-create
        style="width:100%"
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
    </div>
    <div class="block">
      <el-button icon="fas fa-paper-plane" type="primary" @click="sendMail">
        Gửi mail</el-button
      >
    </div>
  </div>
</template>

<script>
import { getInvoice, SendMailOrder } from "@/api/invoice";
import { getStartDate, getEndDate } from "@/api/index";
import { GetEmailLst } from "@/api/mission";
export default {
  data() {
    return {
      emailLst: [],
      invoiceList: [],
      documentID: "",
      email: ""
    };
  },
  methods: {
    fetchData() {
      var req = {
        startDate: getStartDate(),
        endDate: getEndDate(),
        id: this.$route.params.username,
        token: this.$route.params.token,
        page: 1,
        page_row: 200
      };
      this.listLoading = true;

      getInvoice(req).then(response => {
        this.invoiceList = response.Data;
        this.listLoading = false;
      });
    },
    fetchEmail() {
      const req = {
        token: this.$route.params.token
      };
      GetEmailLst(req).then(res => {
        this.emailLst = res.Data;
      });
    },
    sendMail() {
      if (!this.documentID || !this.email) {
        this.$notify({
          title: "Lỗi",
          message: "Vui lòng cập nhật đầy đủ thông tin",
          type: "error",
          position: "top-left"
        });
        return;
      }
      this.email = this.email ? this.email.join(";") : this.email;
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token,
        DocumentID: this.documentID,
        MailSent: this.email
      };
      SendMailOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Gửi mail đơn hàng thành công",
            type: "success",
            position: "top-left"
          });
          this.clearData();
        }
      });
    },
    clearData() {
      this.documentID = "";
      this.email = "";
    }
  },
  created() {
    this.fetchData();
    this.fetchEmail();
  }
};
</script>

<style lang="scss" scoped>
.block {
  display: block;
  padding: 10px;
  text-align: center;
  p {
    text-align: left;
    margin: 3px;
    font-size: 10pt;
    font-weight: 600;
    color: #615959;
  }
}
</style>
