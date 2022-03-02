<template>
  <div class="alalytic-container">
   
    <div class="form-date">
        <monthreport style="margin-bottom:20px"></monthreport>
      <div class="inline-block">
        <span>Thống kê từ ngày</span>
        <el-date-picker v-model="startDate" type="date" placeholder="Ngày bắt đầu"></el-date-picker>
      </div>
      <div class="inline-block">
        <span>Đến ngày</span>
        <el-date-picker v-model="endDate" type="date" placeholder="Ngày kết thúc"></el-date-picker>
      </div>
    </div>
    <overview
      :numberOfMission="numberOfMission"
      :numberOfCall="numberOfCall"
      :amountSales="amountSales"
      :amountDebt="amountDebt"
    ></overview>
    <div>
      <!-- <template v-for=" day in 31">
            <el-tag :key="day" v-if="day.date.substring(8,10)==" style="margin:5px">{{day.date.substring(8,10)}} - {{day.numCall}}</el-tag>
      </template>-->
    </div>
    <call
      :startDate="formatStartDate"
      :endDate="formatEndDate"
      v-on:exportNumberOfCall="exportNumberOfCall"
    ></call>

    <mission
      :startDate="formatStartDate"
      :endDate="formatEndDate"
      v-on:exportNumberOfMission="exportNumberOfMission"
    ></mission>

    <sale
      :startDate="formatStartDate"
      :endDate="formatEndDate"
      v-on:exportAmountSales="exportAmountSales"
    ></sale>

    <debit :startDate="startDate" :endDate="endDate"></debit>
  </div>
</template>

<script>
import Overview from "./components/Overview";
import Call from "./components/call/index";
import Mission from "./components/Mission";
import Sale from "./components/Sale";
import Debit from "./components/Debit";
import MonthReport from "./components/MonthReport";
import { parseTime } from "@/utils/index";
import { getIdUser } from "@/utils/auth";


export default {
  components: {
    overview: Overview,
    call: Call,
    mission: Mission,
    sale: Sale,
    debit: Debit,
    monthreport:MonthReport
  },
  data() {
    return {

      startDate: "",
      endDate: "",
      value1: "",
      startDateFormet: "",
      endDateFormat: "",
      numberOfMission: 0,
      numberOfCall: 0,
      amountSales: 0,
      amountDebt: 0
    };
  },
  computed: {
    formatStartDate() {
      return parseTime(this.startDate, "{y}-{m}-{d}");
    },
    formatEndDate() {
      return parseTime(this.endDate, "{y}-{m}-{d}");
    }
  },
  created() {
    
    let date = new Date();
    this.endDate = date;
    this.startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 10
    );
  },
  methods: {
    exportNumberOfMission(numberOfMission) {
      this.numberOfMission = numberOfMission;
    },
    exportNumberOfCall(numberOfCall) {
      this.numberOfCall = numberOfCall;
    },
    exportAmountSales(amountSales) {
      this.amountSales = amountSales;
    },
  }
}

</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.alalytic-container {
  background-color: $bg;
  min-height: 100vh;
  padding: 20px;
}

.form-date {
  margin-bottom: 15px;
}

.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
</style>
