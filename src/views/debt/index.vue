<template>
  <div class="app-container">
    <el-row v-if="isGroupPage" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-select
          style="width:100%; margin-bottom:10px"
          v-model="currentGroup"
          placeholder="Select"
        >
          <el-option
            v-for="group in groupLst"
            :key="group.idGroup"
            :label="group.idGroup"
            :value="group.idGroup"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="12">
        <el-select
          style="width:100%;margin-bottom:10px"
          v-model="currentEm"
          placeholder="Select"
        >
          <el-option
            v-for="em in emLst"
            :key="em.idEmployee"
            :label="em.nameEmployee"
            :value="em.idEmployee"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-if="isGroupPage" style="margin-bottom:15px"></div>
    <header-report
      :values="headerValues"
      @showSaleReturnDetail="showSaleReturnDetail = $event"
    ></header-report>
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
</template>

<script>
import HeaderReport from "./components/headerReport";
import TableReport from "./components/tableReport";
import TableSalesReturn from "./components/tableSalesReturn";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
import { getMySalesReturn } from "@/api/debt";

export default {
  data() {
    return {
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
    if (this.$router.currentRoute.path == "/debt/all") {
      this.isGroupPage = true;
    }
    if (this.isGroupPage) {
      GetListGroupAdminByToken().then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
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
  watch: {
    currentGroup() {
      if (this.isGroupPage && this.currentGroup != "") {
        getEmployeesByIdGroup({
          idGroup: this.currentGroup
        }).then(res => {
          this.emLst = res.Data;
          this.currentEm = this.emLst[0].idEmployee;
        });
      }
    }
  }
};
</script>
