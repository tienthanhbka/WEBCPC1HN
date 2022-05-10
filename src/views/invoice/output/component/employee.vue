<template>
  <div class="output-employee">
    <el-table
      v-loading="isLoading"
      :data="currentTableData"
      size="small"
      class="el-mobile-table"
      element-loading-text="Loading"
      @expand-change="expandRow"
      border
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p><b>Chi tiết đơn hàng</b></p>
          <el-table
            :data="props.row.lines"
            size="mini"
            v-model="rowNow"
            style="width: 100%"
            v-loading="props.row.isLoading"
            element-loading-text="Loading"
          >
            <el-table-column
              prop="ProductName"
              label="Sản phẩm"
              min-width="220"
            ></el-table-column>
            <el-table-column
              prop="Quantity"
              label="Số lượng"
              width="110"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.Quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="UnitOfMeasure"
              label="Đơn vị"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column prop="UnitPrice" label="Giá" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.UnitPrice | toVND }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Amount" label="Tổng giá" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.Amount | toVND }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AmoutVAT" label="Tổng giá VAT" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.AmountVAT | toVND }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Gift"
              label="Quà"
              width="180"
            ></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" width="60px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mã" align="center" width="130">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã">
            <span>{{ scope.row.HeaderID }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Loại" align="center" width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại">
            <span>{{ scope.row.SaleType }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày xuất" align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày xuất">
            <span>{{ scope.row.PostingDate | toDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Khách hàng" min-width="180">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khách hàng">
            <span>{{ scope.row.CustomerName }} - </span>
            <span>{{ scope.row.CustomerID }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="SL sản phẩm" width="130" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="SL sản phẩm">
            <span>{{ scope.row.QuantityProduct }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Giá trị" width="130">
        <template slot-scope="scope">
          <div class="dat-cell" label="Giá trị">
            <span>{{ scope.row.AmountIncludingVAT | toVND }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="tableData.length"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchTable"
      background
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { GetSaleOutputHeader, GetSaleOutputLine } from "@/api/order";
import { getIdUser } from "@/utils/auth";

export default {
  props: ["startDate", "endDate", "employee"],
  data() {
    return {
      isLoading: false,
      tableData: [],
      currentTableData: [],
      rowNow: "",
      pageSize: 10,
      currentPage: 1,
      amountSale: 0,
      countTypeSale: 0,
      countCus: 0
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      const req = {
        DateStart: this.startDate,
        DateEnd: this.endDate,
        EmployeeID: this.employee ? this.employee.EmployeeID : getIdUser()
      };
      GetSaleOutputHeader(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.Data;
          this.isLoading = false;
          this.amountSale = this.tableData.reduce(
            (a, b) => a + b.AmountIncludingVAT,
            0
          );
          this.countTypeSale = [
            ...new Set(this.tableData.map(item => item.SaleType))
          ].length;
          this.countCus = [
            ...new Set(this.tableData.map(item => item.CustomerID))
          ].length;
          this.fetchTable();
          this.$emit(
            "getValueAmount",
            this.amountSale,
            this.countTypeSale,
            this.countCus
          );
        }
      });
    },
    fetchTable() {
      this.currentTableData = this.tableData
        // .filter(o => {
        //   return o.EmployeeName.toLowerCase().includes(
        //     this.search.toLowerCase()
        //   );
        // })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    expandRow(row) {
      if (row.lines == null) {
        row.isLoading = true;
        GetSaleOutputLine({
          HeaderID: row.HeaderID,
          EmployeeID: this.employee ? this.employee.EmployeeID : getIdUser(),
          TypeSource: row.TypeSource
        }).then(res => {
          row.lines = res.Data;
          this.rowNow = res.Data;
        });
        row.isLoading = false;
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    "employee.EmployeeID"() {
      this.fetchData();
    },
    startDate() {
      this.fetchData();
    },
    currentPage() {
      this.fetchTable();
    },
    pageSize() {
      this.fetchTable();
    }
  }
};
</script>

<style lanng="scss" scoped></style>
