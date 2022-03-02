<template>
  <div>
    <div class="overview-container">
      <div slot="header" class="card-header">
        <div
          class="item-header"
          :class="mode === 'viewAll' ? 'active' : ''"
          v-if="!search"
          @click="selectAll"
        >
          Toàn bộ
        </div>
        <div class="select-months" v-if="!search">
          <el-select
            @change="selectMonth"
            class="el-select-months"
            :class="mode === 'viewByMonth' ? 'active' : ''"
            style="width:100%"
            v-model="time"
            size="mini"
            placeholder="Select"
          >
            <el-option
              v-for="(item, index) in months"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="box-search" v-if="search">
          <el-input
            class="el-select-months"
            v-model="cusSearch"
            size="mini"
            placeholder="Tìm khách hàng"
          />
        </div>
        <div class="item-search">
          <el-button
            type="text"
            circle
            size="mini"
            class="el-button-search"
            @click="search = !search"
            ><i class="el-icon-search" v-if="!search"></i
            ><i class="el-icon-close" v-if="search"></i
          ></el-button>
        </div>
      </div>
      <div class="overview-item">
        <div class="image">
          <img
            width="50"
            height="50"
            src="data:image/png;base64,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"
            alt="img"
          />
        </div>
        <div class="content">
          <div class="title">{{ headerValues.SumAmountText }}</div>
          <div class="value">
            Trước VAT: {{ headerValues.SumAmount | toVND }}
          </div>
          <div class="value">
            Sau VAT: {{ headerValues.SumAmountVAT | toVND }}
          </div>
        </div>
      </div>
      <div class="overview-item">
        <div class="image">
          <img
            width="50"
            height="50"
            src="https://images-na.ssl-images-amazon.com/images/I/412naGdtScL.png"
            alt="img"
          />
        </div>
        <div class="content">
          <div class="title">Thanh Toán</div>
          <div class="value">Đã trả: {{ headerValues.SumRecipt | toVND }}</div>
          <div class="value">
            Còn nợ:
            {{
              headerValues.Desc == "Thống kê tất cả"
                ? headerValues.SumAmount -
                  (headerValues.SumSaleReturn
                    ? headerValues.SumSaleReturn
                    : 0) -
                  headerValues.SumRecipt
                : (headerValues.SumAmount - headerValues.SumRecipt) | toVND
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="debt-table-report">
      <div v-if="tableData.length > 0">
        <el-table
          ref="reportTable"
          class="el-mobile-table color-table"
          :header-cell-style="{ padding: '5px 0px' }"
          :data="tableData"
          v-loading="isLoading"
          element-loading-text="Loading"
          border
          style="width:100%"
        >
          <el-table-column prop="Cus" label="KH" min-width="360">
            <template slot-scope="props">
              <div class="dat-cell" label="KH">
                {{ props.row.Cus }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="No" label="Hóa đơn" width="160">
            <template slot-scope="props">
              <div class="dat-cell" label="Hóa đơn">
                {{ props.row.No }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="External Document No_"
            label="Mã hóa đơn ĐT"
            width="160"
          >
            <template slot-scope="{ row }">
              <div class="dat-cell" label="Mã hóa đơn ĐT">
                {{ row["External Document No_"] }}
              </div>
            </template></el-table-column
          >
          <el-table-column prop="DateDiff" label="Ngày xuất" width="160">
            <template slot-scope="{ row }">
              <div class="dat-cell" label="Ngày xuất">
                {{
                  row["Posting Date"].substring(0, 10) +
                    " (" +
                    row.DateDiff +
                    ")"
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="Kiểu mua"
            :filters="typeSalesFilterLst"
            :filter-method="filterCol"
            width="100"
          >
            <template slot-scope="props">
              <div class="dat-cell" label="Kiểu mua">
                {{ props.row.code }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            min-width="160"
            prop="SumAmount"
            label="Tổng tiền"
            align="right"
            :formatter="cellformat"
          >
            <template slot-scope="props">
              <div class="dat-cell" label="Tổng tiền">
                {{
                  Number(props.row.SumAmount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }}đ
              </div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="160"
            prop="SumAmountVAT"
            label="Tổng tiền(VAT)"
            align="right"
            :formatter="cellformat"
          >
            <template slot-scope="props">
              <div class="dat-cell" label="Tổng tiền(VAT)">
                {{
                  Number(props.row.SumAmountVAT)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }}đ
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            prop="SumRecipt"
            label="Đã thanh toán"
            align="right"
            :formatter="cellformat"
          >
            <template slot-scope="props">
              <div class="dat-cell" label="Đã thanh toán">
                {{
                  Number(props.row.SumRecipt)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }}đ
              </div>
            </template>
          </el-table-column>
          <el-table-column width="160" label="Chi tiết" align="right">
            <template slot-scope="props">
              <div class="dat-cell">
                <el-button
                  type="text"
                  style="color:#CAC531"
                  @click="expandRow(props.row)"
                  >Chi tiết</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="blank-table" v-else>Không có dữ liệu</div>
      <el-dialog :visible.sync="dialogDetail" custom-class="small-modal">
        <detail-report :data="rowData" :token="Token"></detail-report>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
.salesline-header {
  font-weight: bold;
  color: #0984e3;
}
</style>

<script>
import { getDebt, getSalesLineByDocNo } from "@/api/appview";
import DetailReport from "./detailReport.vue";

export default {
  components: { DetailReport },
  props: {
    isGroupPage: Boolean,
    currentEm: String
  },
  data() {
    return {
      cusSearch: "",
      x: 10000,
      debtData: [],
      rowData: "",
      mode: "viewByMonth",
      months: [],
      time: "",
      isLoading: false,
      typeSalesFilterLst: [],
      dialogDetail: false,
      TitleDialog: "",
      Token: "",
      OTC: "",
      search: false,
      months: [],
      headerValues: {
        SumSaleReturn: NaN,
        SumRecipt: 0,
        SumAmount: 0,
        SumAmountVAT: 0,
        SumAmountText: "",
        Desc: ""
      }
    };
  },
  computed: {
    tableData() {
      return this.debtData.filter(
        data =>
          !this.cusSearch ||
          data["Sell-to Customer No_"]
            .toLowerCase()
            .includes(this.cusSearch.toLowerCase()) ||
          data.Cus.toLowerCase().includes(this.cusSearch.toLowerCase())
      );
    },
    filteredData() {
      if (this.$refs.reportTable != null) {
        return this.$refs.reportTable.tableData;
      }
      return this.debtData;
    }
  },
  methods: {
    headerRowStyle(row, rowIndex) {
      return { color: "#e17055" };
    },
    expandRow(row) {
      this.rowData = row;

      this.dialogDetail = true;
    },
    filterCol(val, row, col) {
      const property = col["property"];
      return row[property] === val;
    },
    cellformat(row, column, cellval) {
      return this.$options.filters.toVND(cellval);
    },
    numberedformat(row, column, cellval) {
      return this.$options.filters.numbered(cellval);
    },
    selectAll() {
      this.mode = "viewAll";
      this.disableSelect = true;
    },
    selectMonth() {
      this.mode = "viewByMonth";
    },
    calSum(dt) {
      var report = {};

      let SumAmount = 0;
      let SumRecipt = 0;
      let SumAmountVAT = 0;
      for (let i = 0; i < dt.length; i++) {
        SumAmount += Number(dt[i].SumAmount);
        SumAmountVAT += Number(dt[i].SumAmountVAT);
        SumRecipt += Number(dt[i].SumRecipt);
      }

      report.SumAmount = SumAmount;
      report.SumRecipt = SumRecipt;
      report.SumAmountVAT = SumAmountVAT;
      if (this.mode == "viewAll") {
        report.SumAmountText = "Tổng nợ";
        report.Desc = "Thống kê tất cả";
      } else {
        report.SumAmountText = "Doanh số";
        report.Desc = "Thống kê trong tháng " + this.time;
      }
      this.headerValues = report;
      //this.$emit("dataChanged", report);
    },
    fetchData(time) {
      this.isLoading = true;
      var req = { month: time, token: this.Token };
      if (this.isGroupPage && this.currentEm == "") {
        return;
      } else if (this.isGroupPage && this.currentEm != "") {
        req.idEmployee = this.currentEm;
      }

      getDebt(req)
        .then(response => {
          this.isLoading = false;
          var dt = response.Data;

          this.typeSalesFilterLst = [];

          var unqTypeSale = {};
          //this.calSum();
          for (let i = 0; i < dt.length; i++) {
            dt[i].lines = null;
            unqTypeSale[dt[i].code] = dt[i].code;
          }
          this.debtData = dt;
          for (var code in unqTypeSale) {
            this.typeSalesFilterLst.push({ text: code, value: code });
          }
        })
        .catch(e => {
          var t = {
            Desc: "Thống kê",
            SumAmount: 0,
            SumAmountVAT: 0,
            SumAmountText: "Tổng hóa đơn có nợ",
            SumRecipt: 0
          };
          this.headerValues = t;
        });
    }
  },
  created() {
    var d = new Date();
    for (let i = 0; i <= 12; i++) {
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var lbl = (month < 10 ? "0" + month : month) + " - " + year;
      var val = year + "-" + (month < 10 ? "0" + month : month);
      this.months.push({ value: val, label: lbl });
      d.setMonth(d.getMonth() - 1);
    }
    this.time = this.months[0].value;
    this.Token = this.$route.params.token;
  },
  watch: {
    filteredData() {
      this.calSum(this.filteredData);
    },
    mode: function(newMode) {
      if (newMode == "viewByMonth") {
        this.fetchData(this.time);
      } else {
        this.fetchData();
      }
    },
    time: function(newTime) {
      this.fetchData(newTime);
    },
    currentEm() {
      if (this.isGroupPage && this.currentEm != "") {
        if (this.mode == "viewByMonth") {
          this.fetchData(this.time);
        } else {
          this.fetchData();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-header {
  padding: 5px 0;

  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  .item-header {
    border-radius: 40px;
    background-color: #eee;
    padding: 8px;
    font-size: 10pt;
    margin: 0 3px;
    cursor: pointer;
  }
  .select-months {
    text-align: center;
    flex-grow: 1;
  }
  .box-search {
    text-align: center;
    flex-grow: 1;
  }
  .item-header.active {
    background-color: rgba(253, 1, 1, 0.226);
    color: rgb(218, 18, 18);
  }
}
.debt-table-report {
  margin-top: 10px;
  .card-header {
    text-align: center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border: 1px solid #eee;
    padding: 10px;
    //background-image: linear-gradient(45deg, #ed213a, #93291e);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    h2 {
      font-size: 18px;
    }
  }
}
.el-card__body {
  padding: 0px;
}
.overview-container {
  &:after {
    clear: both;
    content: "";
  }
  .overview-item {
    height: auto;
    background: #fff;
    margin-bottom: 5px !important;
    //background-image: linear-gradient(45deg, #ed213a, #cb2e49);
    display: flex;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; //color: #fff;
    .image {
      margin-right: 20px;
    }
    .content {
      .title {
        font-size: 16px;
      }

      .value {
        font-size: 10pt;
        margin-top: 5px;
        color: rgba(0, 0, 0, 0.5);
        font-style: bold;
      }
    }
  }
}
</style>
