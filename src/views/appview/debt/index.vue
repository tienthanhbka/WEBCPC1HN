<template>
  <div class="appview-container">
    <!-- <div v-if="!dialogMessage">
      <el-alert
        title="error alert"
        type="error"
        description="more text description"
        show-icon
      >
      </el-alert>
    </div> -->
    <div>
      <!-- <header-report :values="headerValues"></header-report> -->
      <table-report
        :isGroupPage="isGroupPage"
        :currentEm="currentEm"
        v-if="!showSaleReturnDetail"
        @dataChanged="reportChanged"
      ></table-report>
      <table-sales-return
        :isGroupPage="isGroupPage"
        :currentEm="currentEm"
        @SaleReturnChanged="headerValues.SumSaleReturn = $event"
        v-else
      ></table-sales-return>
    </div>
  </div>
</template>

<script>
import HeaderReport from "./components/headerReport";
import TableReport from "./components/tableReport";
import TableSalesReturn from "./components/tableSalesReturn";

export default {
  data() {
    return {
      Token: "",
      OTC: "",
      dialogMessage: false,
      isGroupPage: false,
      groupLst: [],
      currentGroup: "",
      emLst: [],
      currentEm: "",
      headerValues: {
        SumSaleReturn: NaN,
        SumRecipt: 0,
        SumAmount: 0,
        SumAmountVAT: 0,
        SumAmountText: "",
        Desc: ""
      },
      showSaleReturnDetail: false
    };
  },
  components: {
    HeaderReport,
    TableReport,
    TableSalesReturn
  },
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  },

  methods: {
    reportChanged(e) {
      var SumSaleReturn = this.headerValues.SumSaleReturn;
      // this.headerValues.SumSaleReturn = e.SumSaleReturn;
      this.headerValues.SumRecipt = e.SumRecipt;
      this.headerValues.SumAmount = e.SumAmount;
      this.headerValues.SumAmountVAT = e.SumAmountVAT;
      this.headerValues.SumAmountText = e.SumAmountText;
      this.headerValues.Desc = e.Desc;
      if (SumSaleReturn) {
        this.headerValues.SumSaleReturn = SumSaleReturn;
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.appview-container {
  padding: 5px 8px;
}
</style>
