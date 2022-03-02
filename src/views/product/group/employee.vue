<template>
  <div class="app-container">
    <div class="header-table">
      <div class="inline-block">
        <el-input
          size="small"
          v-model="search"
          placeholder="Tên sản phẩm | Kênh bán..."
        ></el-input>
      </div>
      <div class="inline-block">
        <el-button
          class="t-button"
          size="small"
          icon="el-icon-search"
          @click="fetchData"
          circle
        ></el-button>
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-button
            class="t-button"
            type="primary"
            size="small"
            @click="create"
            ><i class="fas fa-plus-circle"></i> Thêm mới</el-button
          >
        </div>
        <!-- <div class="inline-block">
          <el-button
            class="t-button"
            type="success"
            size="small"
            @click="exportExcel"
            v-loading="downloading"
            ><i class="fas fa-file-excel"></i
          ></el-button>
        </div> -->
      </div>
    </div>
    <el-table
      v-loading="loadingTable"
      :data="
        currentTable.filter(
          data =>
            !search ||
            data.ProductName.toLowerCase().includes(search.toLowerCase()) ||
            data.TypeSale.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width:100%"
      border
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Sửa" placement="top"
              ><el-button @click="edit(scope.row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="del(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
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
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <modal-info
        :row="rowData"
        :mode="modeView"
        :typeSales="typeSales"
        :emails="emails"
        :items="items"
        @createOK="createOK"
      ></modal-info>
    </el-dialog>
  </div>
</template>

<script>
import ModalInfo from "./component/modal-info";
import { GetSaleType } from "@/api/default";
import { GetItemFast, GetProductEm, DelProductEm } from "@/api/product";
import { GetEmailLst } from "@/api/mission";

export default {
  components: {
    ModalInfo
  },
  data() {
    return {
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      modeView: 0,
      titleDialog: "",
      search: "",
      rowData: "",
      typeSales: [],
      items: [],
      emails: [],
      dialogFormCreate: false,
      loadingTable: false,
      downloading: false,
      tableData: [],
      currentTable: []
    };
  },
  filters: {},
  methods: {
    create() {
      this.dialogFormCreate = true;
      this.rowData = "";
      this.titleDialog = "Tạo phiếu";
      this.modeView = 1;
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    edit(val) {
      this.dialogFormCreate = true;
      this.rowData = val;
      this.titleDialog = "Chỉnh sửa phiếu";
      this.modeView = 2;
    },
    del(row) {
      this.$confirm(
        "Xóa sản phẩm " + row.ProductName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID
          };
          DelProductEm(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.tableData = [];
      this.loadingTable = true;
      GetProductEm().then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ProductEmLst;
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
    fetchSaleType() {
      GetSaleType().then(res => {
        if (res.RespCode == 0) {
          this.typeSales = res.SaleTypeLst;
        }
      });
    },

    fetchEmail() {
      GetEmailLst().then(res => {
        this.emails = res.Data;
      });
    },
    fetchItem() {
      GetItemFast().then(res => {
        if (res.RespCode == 0) {
          this.items = res.ItemLst;
        }
      });
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = ["MNV", "Tên nhân viên", "SĐT", "Nhóm sản phẩm"];
      const filterHeader = [
        "EmployeeCode",
        "NameEmployee",
        "EmployeeID",
        "ProductGroup"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách phân bổ sản phẩm theo nhân viên", //Optional
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
            return this.$options.filters.missionVacationStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.fetchData();
    this.fetchSaleType();
    this.fetchEmail();
    this.fetchItem();
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
