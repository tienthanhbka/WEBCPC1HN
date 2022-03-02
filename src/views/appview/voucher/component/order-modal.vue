<template>
  <div class="customer-container">
    <h3 style="font-size:10pt;font-weight:600;color:#0277bc;margin-top: 0;">
      {{ customer.CustomerName }} - {{ customer.CustomerID }}
    </h3>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      size="small"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="90">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px;" label="Mã tham chiếu">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã tham chiếu">
            {{ scope.row.ReferentCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px;" label="Tích lũy">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tích lũy">
            {{ scope.row.Amount | toVND }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px;" label="Ngày voucher" align="center">
        <template slot-scope="scope">
          <div
            class="dat-cell"
            label="Ngày voucher"
            v-if="scope.row.PostingDate"
          >
            {{ Date.parse(scope.row.PostingDate).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px;" label="Ngày hết hạn" align="center">
        <template slot-scope="scope">
          <div
            class="dat-cell"
            label="Ngày hết hạn"
            v-if="scope.row.ExpirationDate"
          >
            {{ Date.parse(scope.row.ExpirationDate).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px;" label="Còn" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Còn">{{ scope.row.DayLeft }} ngày</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetDetailVoucherCus } from "@/api/voucher";

export default {
  props: ["voucher", "customer"],
  components: {},
  data() {
    return {
      userName: "",
      token: "",
      tableData: [],
      loadingTableData: false
    };
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.userName,
        Token: this.token,
        PromoCode: this.voucher.PromoCodeFast,
        CustomerID: this.customer.CustomerID
      };
      this.loadingTableData = true;
      GetDetailVoucherCus(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.Data;
          this.loadingTableData = false;
        }
      });
    }
  },
  created() {
    this.userName = this.$route.params.username;
    this.token = this.$route.params.token;
    this.fetchData();
  },
  watch: {}
};
</script>

<style></style>
