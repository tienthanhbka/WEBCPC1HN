<template>
  <div class="app-container">
    <el-table
      v-loading="loadingTable"
      :data="currentTable"
      style="width:100%"
      border
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column width="100px" label="STT" align="center">
        <template slot="header">
          <el-tooltip content="Phê duyệt" placement="top">
            <el-button size="mini" @click="acceptAll">
              <i class="fas fa-upload"></i>
            </el-button>
          </el-tooltip>

          <el-checkbox
            style="margin-right:0px"
            @change="checkAll"
            ref="boxCheckAll"
          ></el-checkbox>
        </template>
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-checkbox
              :disabled="scope.row.Status > 2"
              v-model="scope.row.check"
            ></el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="210px" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            <span v-if="scope.row.EmployeeCode"
              >[{{ scope.row.EmployeeCode }}]-</span
            >
            {{ scope.row.NameEmployee }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="Kênh bán">
        <template slot-scope="scope">
          <div class="dat-cell" label="Kênh bán">
            {{ scope.row.TypeSale }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="300px" label="Sản phẩm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Sản phẩm">
            {{ scope.row.ProductName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Mã">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã">
            {{ scope.row.ProductID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="ĐVT">
        <template slot-scope="scope">
          <div class="dat-cell" label="ĐVT">
            {{ scope.row.UnitOfMeasure }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | oceStatusColor"
              style="width:120px"
              effect="plain"
              >{{ scope.row.Status | oceStatusText }}</el-tag
            >
          </div>
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
import { GetProductEmByAdmin, AcceptProductEm } from "@/api/product";
import Cookies from "js-cookie";
export default {
  components: {},
  data() {
    return {
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      currentEmployee: "",
      currentGroup: "",
      loadingTable: false,
      downloading: false,
      tableData: [],
      currentTable: [],
      groups: [],
      employees: [],
      employee: "",
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  filters: {},
  methods: {
    acceptAll() {
      this.listLoading = true;
      const lstAccept = [];
      this.tableData.forEach(val => {
        if (val.check && val.Status < 3) {
          lstAccept.push(val);
        }
      });
      if (lstAccept.length == 0) {
        this.$notify({
          title: "Lỗi",
          message: "Vui lòng 1 chọn để xử lí",
          type: "error",
          position: "top-right"
        });
        return;
      }
      AcceptProductEm({ ProductEmLst: lstAccept }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xác nhận thành công",
            type: "success",
            position: "top-right"
          });
          this.listLoading = false;
          this.fetchData();
        }
      });
    },
    checkAll(e) {
      if (e) {
        this.tableData.forEach(element => {
          if (element.Status < 3 && !element.AcceptID) element.check = true;
        });
      } else {
        this.tableData.forEach(element => {
          if (element.Status < 3 && !element.AcceptID) element.check = false;
        });
      }
    },
    fetchData() {
      this.tableData = [];
      this.employee = this.$route.params.id;

      this.loadingTable = true;
      const req = {
        EmployeeID: this.employee
      };
      GetProductEmByAdmin(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ProductEmLst;
          this.tableData.forEach(p => {
            if (p.Status > 2) {
              p.check = true;
            }
          });
          this.fetchTable();
          this.loadingTable = false;
        }
      });
    },
    fetchTable() {
      this.currentTable = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Nhân viên",
        "MNV",
        "Kênh bán",
        "Sản phẩm",
        "Mã",
        "ĐTV",
        "Ghi chú"
      ];
      const filterHeader = [
        "NameEmployee",
        "EmployeeCode",
        "TypeSale",
        "ProductName",
        "ProductID",
        "UnitOfMeasure",
        "Note"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh mục sản phẩm " +
              this.currentEmployee +
              " " +
              this.currentGroup, //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.oceStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchTable();
    },
    pageSize() {
      this.fetchTable();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #eee;
  .inline-block {
    display: inline-block;
  }
}
</style>
