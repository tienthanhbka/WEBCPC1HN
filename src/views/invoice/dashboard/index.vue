<template>
  <div class="invoice-container">
    <div class="header--title">
      <span class="title" v-if="modeView == 0"
        >Kết quả kinh doanh
        <span v-if="employee"> {{ employee.EmployeeName }}</span>
        <span v-else> {{ employeeName }}</span>
        <span> tháng {{ Date.parse(month).toString("MM") }}</span></span
      >
      <span v-else>Danh sách nhân sự quản lý</span>
      <div class="inline-block right">
        <div class="inline-block">
          <el-date-picker
            v-model="month"
            type="month"
            size="small"
            placeholder="Chọn tháng"
          >
          </el-date-picker>
        </div>
        <div class="inline-block" v-if="tableDataGroup.length > 0">
          <el-radio-group v-model="modeView" size="small">
            <el-radio-button label="0">Cá nhân</el-radio-button>
            <el-radio-button label="1">Nhóm</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline-block">
          <el-tooltip effect="light" content="Ẩn/ hiện thống kê">
            <el-button
              size="small"
              icon="el-icon-view"
              @click="viewChart = !viewChart"
            ></el-button
          ></el-tooltip>
        </div>
        <div class="inline-block">
          <el-tooltip effect="light" content="Theo dõi độ phủ">
            <el-button
              size="small"
              icon="el-icon-s-flag"
              @click="viewMapCover"
            ></el-button
          ></el-tooltip>
        </div>
      </div>
      <div class="clear--both"></div>
    </div>
    <div class="invoice--body">
      <div v-if="modeView == 0" class="invoice--em">
        <div class="invoice--header" v-if="viewChart">
          <card-chart
            :sumAmount="sumAmount"
            :countCus="countCus"
            :countPro="countPro"
            :countTypeSale="countTypeSale"
            :employee="employee"
            :month="month"
          ></card-chart>
          <sale-month-chart
            :employee="employee"
            @getSale="getSale"
            :startDate="startDate"
            :endDate="endDate"
          ></sale-month-chart>
        </div>

        <employee
          :employee="employee"
          :startDate="startDate"
          :endDate="endDate"
          @getValueAmount="getValueAmount"
        ></employee>
      </div>
      <div v-else class="invoice--group">
        <group
          :tableDataGroup="tableDataGroup"
          :startDate="startDate"
          :endDate="endDate"
          :month="month"
          :search="search"
          @viewDetailEm="viewDetailEm"
        ></group>
      </div>
      <!-- <sale-table ></sale-table> -->
    </div>
    <div class="invoice--footer"></div>
  </div>
</template>

<script>
import SaleMonthChart from "./component/sale-month-chart";
import CardChart from "./component/card-chart";
import Employee from "../output/component/employee";
import Group from "../output/component/group";
import { getStartDate, getEndDate } from "@/api/index";
import { GetDetailEmployeeGroup } from "@/api/groups";
import { getName } from "@/utils/auth";

export default {
  components: { SaleMonthChart, Employee, Group, CardChart },
  //props: ["employee"],
  data() {
    return {
      tableData: [],
      tableDataGroup: [],
      sumAmount: 0,
      countCus: 0,
      countPro: 0,
      countTypeSale: 0,
      modeView: 0,
      search: "",
      month: new Date(),
      startDate: "",
      endDate: "",
      employeeName: getName(),
      employee: "",
      viewChart: true
    };
  },
  methods: {
    getSale(sumAmount, countCus, countPro, countTypeSale) {
      //this.countCus = countCus;
      this.countPro = countPro;
    },
    fetchDataGroup() {
      GetDetailEmployeeGroup({ Month: this.startDate }).then(res => {
        if (res.RespCode == 0) {
          let arr = [];
          res.Data.forEach(e => {
            if (
              e.OTC == 0 ||
              e.OTC == 1 ||
              e.OTC == 15 ||
              e.OTC == 16 ||
              e.OTC == 52 ||
              e.OTC == 56
            ) {
              arr.push(e);
            }
          });
          this.tableDataGroup = arr;
        }
      });
    },
    viewDetailEm(row) {
      this.employee = row;
      this.modeView = 0;
    },
    getDate() {
      console.log(this.month);
      const year = Date.parse(this.month).toString("yyyy");
      const month = Date.parse(this.month).toString("MM");
      const lastDay = new Date(
        this.month.getFullYear(),
        this.month.getMonth() + 1,
        0
      );

      this.startDate = year + "-" + month + "-01";
      this.endDate = Date.parse(lastDay).toString("yyyy-MM-dd");
    },
    getValueAmount(amountSale, countTypeSale, countCus) {
      this.sumAmount = amountSale;
      this.countTypeSale = countTypeSale;
      this.countCus = countCus;
    },
    viewMapCover() {
      this.$router.push(`/map-home/place`);
    }
  },
  created() {
    this.getDate();
    this.fetchDataGroup();
  },
  watch: {
    month() {
      this.getDate();
      this.fetchDataGroup();
    }
  }
};
</script>

<style lang="scss" scoped>
.invoice-container {
  background-color: #fff;
  .header--title {
    font-size: 10pt;
    font-weight: 600;
    min-height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border-bottom: 1px dotted #ccc;
    color: #da3912;
    line-height: 50px;
    padding: 0 20px;
    .right {
      float: right;
    }
  }

  .invoice--em {
    padding: 0 150px;
    .invoice--header {
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
  }
  @media all and (max-width: 768px) {
    .invoice--em {
      padding: 0;
    }
    .header--title {
      .title {
        text-align: center;
        display: block;
      }
    }
  }
  .invoice--group {
  }
}
</style>
