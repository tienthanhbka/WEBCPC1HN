<template>
  <div>
    <div class="inline-block">
      <el-input
        size="small"
        v-model="search"
        placeholder="Tên nhân viên | MNV"
      ></el-input>
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          v-model="date"
          size="small"
          type="month"
          value-format="MM-yyyy"
          placeholder="Pick a month"
          value="2019-07"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="success"
          icon="fas fa-file-excel"
          size="small"
          @click="exportExcel"
          :loading="downloading"
        >
          Xuất Excel</el-button
        >
      </div>
    </div>
    <div style="clear:both;"></div>
    <el-table
      v-loading="listLoading"
      :data="currentTableData"
      size="small"
      element-loading-text="Loading"
      border
      show-summary
      highlight-current-row
    >
      <el-table-column label="STT" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (currentPage - 1) * pageSize }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MNV" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.EmployeeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Họ và tên" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.EmployeeName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Chức danh" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.Position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Khách hàng" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.PlaceName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Thứ hạng đơn trong ngày"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.OrderNumberInDay }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Mã đơn" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.DocumentNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Giá trị" min-width="100" prop="AmountSum">
        <template slot-scope="scope">
          <span>{{ scope.row.AmountSum | toVND }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày đặt" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{
            Date.parse(scope.row.OrderDate).toString("dd//MM/yyyy")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.StatusInv }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination footer-table"
      :total="tableData.length"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchTable"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { GetBranchSaleByAdmin } from "@/api/saleHeader";
export default {
  components: {},
  filters: {},
  data() {
    return {
      search: "",
      listLoading: false,
      downloading: false,
      tableData: [],
      currentTableData: [],
      date: new Date(),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      var req = {
        Month: Date.parse(this.date).toString("yyyy-MM-dd HH:mm:ss")
      };
      GetBranchSaleByAdmin(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.Data;
          this.fetchTable();
          this.listLoading = false;
        }
      });
    },
    fetchTable() {
      this.currentTableData = this.tableData
        .filter(o => {
          return (
            !this.search ||
            o.EmployeeCode.toLowerCase().includes(this.search.toLowerCase()) ||
            o.EmployeeName.toLowerCase().includes(this.search.toLowerCase())
          );
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "MNV",
        "Họ và tên",
        "Chức danh",
        "Khách hàng",
        "Thứ hạng đơn trong ngày",
        "Mã đơn",
        "Giá tri",
        "Ngày đặt",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Position",
        "PlaceName",
        "OrderNumberInDay",
        "DocumentNo",
        "AmountSum",
        "OrderDate",
        "StatusInv"
      ];

      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, this.tableData),
          filename:
            "Danh sách nhân viên có cơ hội nhận thưởng CTDB2022 " +
            Date.parse(this.date).toString("MM/yyyy"),
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
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
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchTable();
    },
    pageSize() {
      this.fetchTable();
    },
    date() {
      this.fetchData();
    },
    search() {
      this.fetchTable();
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px 5px 5px 0;
}
</style>
