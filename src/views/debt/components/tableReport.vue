<template>
  <div class="debt-table-report">
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :lg="12">
            <h2 style="display:inline">
              Thống kê
              <i v-if="isLoading" class="el-icon-loading"></i>
            </h2>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-radio-group v-model="mode" size="mini" style="float:right">
              <el-radio-button label="viewByMonth"
                >Xem theo tháng</el-radio-button
              >
              <el-radio-button label="viewAll">Xem toàn bộ</el-radio-button>
            </el-radio-group>
            <el-select
              style="width:110px;float:right"
              v-show="mode == 'viewByMonth'"
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
            <el-button
              style=" float:right;background-color:#02bc77;color:#fff;margin-right:10px"
              size="mini"
              icon="fas fa-file-excel"
              @click="ExportExcel"
            >
              Xuất Excel</el-button
            >
          </el-col>
        </el-row>
      </div>

      <el-table
        ref="reportTable"
        :header-cell-style="{ padding: '5px 0px' }"
        :data="tableData"
        v-loading="isLoading"
        element-loading-text="Loading"
        border
        style="width:100%"
        @expand-change="expandRow"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p class="salesline-header">Chi tiết hóa đơn {{ props.row.No }}</p>
            <el-table
              size="mini"
              :data="props.row.lines"
              style="width: 100%"
              v-loading="props.row.isLoading"
              border
              :header-row-style="headerRowStyle"
              element-loading-text="Loading"
            >
              <el-table-column
                prop="No_"
                label="Mã"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="Description"
                label="Tên"
                min-width="180"
              ></el-table-column>
              <el-table-column
                prop="Unit of Measure"
                label="Đơn vị"
                width="70"
              ></el-table-column>
              <el-table-column
                prop="Quantity"
                label="Số lượng"
                :formatter="numberedformat"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="Unit Price"
                label="Đơn giá"
                :formatter="cellformat"
                min-width="110"
              ></el-table-column>

              <el-table-column
                prop="VAT %"
                label="VAT"
                :formatter="numberedformat"
                width="70"
              ></el-table-column>
              <el-table-column
                prop="Amount"
                :formatter="cellformat"
                label="Thành tiền"
                min-width="180"
              ></el-table-column>
              <el-table-column
                prop="Amount Including VAT"
                :formatter="cellformat"
                label="Thành tiền(VAT)"
                min-width="180"
              ></el-table-column>
              <el-table-column
                prop="NameEm"
                label="Người bán"
                min-width="180"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="No"
          label="Mã hồ sơ"
          width="160"
        ></el-table-column>

        <el-table-column
          prop="External Document No_"
          label="Chứng từ ngoại"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="Job No_"
          label="Mã dự án"
          width="160"
        ></el-table-column>
        <el-table-column prop="DateDiff" label="Ngày hóa đơn" width="160">
          <template slot-scope="{ row }">
            {{
              row["Posting Date"].substring(0, 10) + " (" + row.DateDiff + ")"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="Kiểu mua"
          :filters="typeSalesFilterLst"
          :filter-method="filterCol"
          width="100"
        ></el-table-column>
        <el-table-column prop="Cus" label="Khách hàng" min-width="360">
          <template slot="header">
            <el-input
              v-model="cusSearch"
              size="mini"
              placeholder="Khách hàng"
            />
          </template>
          <template slot-scope="{ row }">
            {{ row["Sell-to Customer No_"] }} - {{ row.Cus }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="160"
          prop="SumAmount"
          label="Tổng tiền"
          align="right"
          :formatter="cellformat"
        ></el-table-column>
        <el-table-column
          min-width="160"
          prop="SumAmountVAT"
          label="Tổng tiền(VAT)"
          align="right"
          :formatter="cellformat"
        ></el-table-column>
        <el-table-column
          width="160"
          prop="SumRecipt"
          label="Đã thanh toán"
          align="right"
          :formatter="cellformat"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style scoped>
.salesline-header {
  font-weight: bold;
  color: #0984e3;
}
</style>

<script>
import { getDebt } from "@/api/debt";
import { getSalesLineByDocNo } from "@/api/salesline";

export default {
  props: {
    isGroupPage: Boolean,
    currentEm: String
  },
  data() {
    return {
      cusSearch: "",
      x: 10000,
      debtData: [],
      mode: "viewByMonth",
      months: [],
      time: "",
      isLoading: false,
      typeSalesFilterLst: []
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
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var No = row.No;
        var otc = row.otc;
        row.isLoading = true;
        getSalesLineByDocNo({ No: No, otc: row["otc"] }).then(res => {
          row.isLoading = false;
          row.lines = res.Data;
        });
      }
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
    calSum(dt) {
      console.log(dt.length);

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
      this.$emit("dataChanged", report);
    },
    fetchData(time) {
      this.isLoading = true;
      var req = { month: time };
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
          console.log(e);

          var t = {
            Desc: "Thống kê",
            SumAmount: 0,
            SumAmountVAT: 0,
            SumAmountText: "Tổng hóa đơn có nợ",
            SumRecipt: 0
          };
          this.$emit("dataChanged", t);
        });
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã hồ sơ",
        "Chứng từ ngoại",
        "Ngày hóa đơn",
        "Kiểu mua",
        "Khách hàng",
        "Tổng tiền",
        "Tổng tiền (VAT)",
        "Đã thanh toán"
      ];
      const filterHeader = [
        "No",
        "External Document No_",
        "Posting Date",
        "code",
        "Cus",
        "SumAmount",
        "SumAmountVAT",
        "SumRecipt"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            this.mode === "viewByMonth"
              ? "Danh sách công nợ " + Date.parse(this.time).toString("MM/yyyy")
              : "Danh sách công nợ toàn bộ", //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
<style lang="css" scoped>
.debt-table-report {
  margin-top: 20px;
}
.el-card__body {
    padding: 0px;
}
</style>
