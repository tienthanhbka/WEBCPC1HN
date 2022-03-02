<template>
  <div class="container-voucher">
    <div class="container-header">
      <el-select
        class="el-select-promo"
        v-model="voucher"
        filterable
        clearable
        placeholder="Chọn chương trình..."
        style="width:100%"
      >
        <el-option
          v-for="(item, index) in vouchers"
          :key="index"
          :label="item.PromoName"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div v-if="voucher">
      <transition name="el-zoom-in-top">
        <div v-show="isShow">
          <div class="container-body">
            <voucher :voucher="rowData" />
          </div>
          <h3
            style="font-size:10pt;font-weight:600;color:#0277bc;margin-left: 5px;"
          >
            Khách hàng tham gia
          </h3>
          <div v-if="customers.length > 0">
            <div
              class="cus-list"
              v-for="(item, index) in customers"
              :key="index"
            >
              <customer :voucher="rowData" :customer="item" />
            </div>
          </div>
          <div class="blank-table" v-else>Không có dữ liệu</div>
        </div>
      </transition>
    </div>
    <div class="blank-table" v-else>Không có dữ liệu</div>
  </div>
</template>

<script>
import { GetVoucherList, GetCusByEm } from "@/api/voucher";
import Voucher from "./component/voucher-modal";
import Customer from "./component/customer-modal";
export default {
  components: { Voucher, Customer },
  data() {
    return {
      vouchers: [],
      customers: [],
      voucher: "",
      customer: "",
      isShow: false,
      rowData: ""
    };
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.userName,
        Token: this.token
      };
      GetVoucherList(req).then(res => {
        if (res.RespCode == 0) {
          this.vouchers = res.Data;
        }
      });
    },
    fetchCus() {
      const req = {
        UserName: this.userName,
        Token: this.token,
        PromoCode: this.rowData.PromoCodeFast
      };
      GetCusByEm(req).then(res => {
        if (res.RespCode == 0) {
          this.customers = res.Data;
        }
      });
    }
  },
  created() {
    this.userName = this.$route.params.username;
    this.token = this.$route.params.token;
    this.fetchData();
  },
  watch: {
    voucher() {
      this.isShow = true;
      this.rowData = this.voucher;
      this.fetchCus();
    }
  }
};
</script>

<style lang="scss" scoped>
.container-voucher {
  .container-header {
    margin: 10px 5px 5px 5px;
  }
  .container-body {
    background-color: #dedede;
  }
}
</style>
