<template>
  <div class="invoice-employee">
    <!-- <div class="employee-header">
      <div>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card>
                <div>
                  <div class="title">Tổng tiền</div>
                  <div class="value">{{ Amount | toVND }}</div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-card>
                <div>
                  <div class="title">Tổng tiền gồm VAT</div>
                  <div class="value">{{ AmountVAT | toVND }}</div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div> -->

    <div class="orderhcm-content">
      <el-table
        v-loading="listLoading"
        :data="invoiceList"
        size="small"
        element-loading-text="Loading"
        @expand-change="expandRow"
        border
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p><b>Chi tiết đặt hàng</b></p>
            <el-table
              :data="props.row.lines"
              size="mini"
              v-model="rowNow"
              style="width: 100%;"
              v-loading="props.row.isLoading"
              element-loading-text="Loading"
              border
              highlight-current-row
            >
              <el-table-column
                prop="Description"
                label="Sản phẩm"
                min-width="220"
              ></el-table-column>
              <el-table-column prop="Quantity" label="Số lượng" width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.Quantity | quantity }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="unitMeasure"
                label="Đơn vị"
                width="130"
              ></el-table-column>
              <el-table-column prop="unitPrice" label="Giá" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.unitPrice | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Tổng giá" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amoutVAT" label="Tổng giá VAT" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.amoutVAT | toVND }}</span>
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

        <el-table-column label="Loại" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.templateCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Khách hàng" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.BillAddress }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Người nhận" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.BillToName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SĐT" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ngày đặt" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderDate | toDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hạn" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ExpriationDate | toDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" align="center" width="130">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | invoiceStatusColor" size="small">
              {{ scope.row.Status | invoiceStatusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="total"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getInvoice, getInvoiceMoney } from "@/api/invoice";
import { getInvoiceLine } from "@/api/getInvoiceLine";
import { Header } from "@/views/invoice/component/header";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  components: {
    Header
  },
  props: ["startDate", "endDate"],
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    quantity(amount) {
      var splitted = parseInt(amount);
      return splitted;
    }
  },
  data() {
    return {
      TextSearch: "",

      currentPage: 1,
      pageSize: 10,
      total: 0,
      listLoading: false,
      rowNow: "",
      Amount: 0,
      AmountVAT: 0,
      values: "abc",
      invoiceList: []
    };
  },
  methods: {
    fetchData() {
      var req = {
        startDate: getStartDate(),
        endDate: getEndDate(),
        id: Cookies.get("idEmployee"),
        token: Cookies.get("token"),
        page: this.currentPage,
        page_row: this.pageSize
      };
      this.listLoading = true;

      getInvoice(req).then(response => {
        this.invoiceList = response.Data;
        this.total = response.TotalPage * response.RowspPage;
        this.listLoading = false;
        this.currentPage = response.PageNumber;
        this.pageSize = response.RowspPage;
      });
    },
    fetchMoney() {
      var req = {
        startDate: this.startDate,
        endDate: this.endDate,
        id: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      this.listLoading = true;

      getInvoiceMoney(req).then(response => {
        //console.log(response);
        this.Amount = response.Data[0].Amount;
        this.AmountVAT = response.Data[0].AmountVAT;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.page_row = val;
      this.fetchData();
    },
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var No_ = row.No_;
        row.isLoading = true;
        getInvoiceLine({
          No_: No_,
          token: Cookies.get("token")
        }).then(res => {
          row.lines = res.Data;
          this.rowNow = res.Data;
        });
        row.isLoading = false;
      }
    }
  },
  computed: {},
  created() {
    this.currentPage = 1;
    this.fetchData();
    this.fetchMoney();
  },
  watch: {
    startDate() {
      this.fetchData();
      this.fetchMoney();
    },
    endDate() {
      this.fetchData();
      this.fetchMoney();
    },
    currentPage() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.invoice-employee {
}
</style>
