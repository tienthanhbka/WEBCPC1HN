<template>
  <div class="app-container">
    <div class="header-table">
      <div style="display:inline-block">
        <el-select
          v-model="currentGroup"
          size="small"
          style="width:100%;"
          placeholder="Chọn nhóm"
          @change="selectGroup"
        >
          <el-option
            v-for="item in groups"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display:inline-block">
        <el-select
          size="small"
          v-model="currentEmployee"
          clearable
          style="width:100%;"
          placeholder="Chọn nhân viên"
        >
          <el-option
            v-for="item in employees"
            :key="item.idEmployee"
            :label="item.nameEmployee"
            :value="item.idEmployee"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-popover
          placement="bottom"
          title="Bộ lọc"
          width="280"
          trigger="click"
        >
          <el-select
            v-model="typeSale"
            size="small"
            filterable
            clearable
            placeholder="Kênh bán..."
            style="width:100%"
          >
            <el-option
              v-for="(item, index) in typeSales"
              :key="index"
              :label="item.SaleName"
              :value="item.SaleId"
            >
            </el-option>
          </el-select>

          <div class="form-footer" style="text-align:center;padding:5px">
            <el-tooltip content="Tìm kiếm" effect="light">
              <el-button
                size="small"
                @click="fetchData"
                icon="el-icon-search"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Làm mới" effect="light">
              <el-button
                size="small"
                @click="refreshData"
                icon="el-icon-refresh"
              ></el-button>
            </el-tooltip>
          </div>
          <el-button
            slot="reference"
            type="primary"
            icon="fas fa-filter"
            size="small"
          >
          </el-button>
        </el-popover>
      </div>
      <div style="float:right">
        <!-- <div class="inline-block">
          <el-button
            class="t-button"
            type="primary"
            size="small"
            @click="create"
            ><i class="fas fa-plus-circle"></i> Thêm mới</el-button
          >
        </div> -->
        <div class="inline-block">
          <el-button
            class="t-button"
            type="success"
            size="small"
            @click="exportExcel"
            v-loading="downloading"
            ><i class="fas fa-file-excel"></i
          ></el-button>
        </div>
        <!-- <div class="inline-block">
          <el-button class="t-button" type="danger" size="small"
            ><i class="fas fa-file-import"></i
          ></el-button>
        </div> -->
      </div>
    </div>
    <el-table
      ref="dataTable"
      v-loading="loadingTable"
      :data="currentTable"
      style="width:100%"
      border
      fit
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
      <el-table-column width="180px" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
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
import { GetSaleType } from "@/api/default";

import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/appview";
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
      typeSale: "",
      loadingTable: false,
      downloading: false,
      tableData: [],
      currentTable: [],
      groups: [],
      employees: [],
      typeSales: [],
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
        this.tableData.forEach(i => {
          if (i.Status != 3) i.check = true;
        });
      } else {
        this.tableData.forEach(i => {
          if (i.Status != 3) i.check = false;
        });
      }
    },
    async fetchGroup() {
      const req = {
        idEmployee: this.UserName,
        token: this.Token
      };
      await GetListGroupAdminByToken(req).then(response => {
        this.groups = response.Data.filter(
          e =>
            e.typeGroup == "0" ||
            e.typeGroup == "1" ||
            e.typeGroup == "15" ||
            e.typeGroup == "16" ||
            e.typeGroup == "52"
        );
        this.currentGroup = this.groups[0].idGroup;
        this.selectGroup(this.currentGroup);
        this.fetchData();
      });
    },
    selectGroup(val) {
      //this.fetchData(val);
      this.currentEmployee = "";
      const req = {
        idGroup: val,
        token: this.Token
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.employees = res.Data.filter(
            e =>
              e.otc == "0" ||
              e.otc == "1" ||
              e.otc == "15" ||
              e.otc == "16" ||
              e.otc == "52"
          );
        }
      });
    },
    fetchData() {
      this.tableData = [];
      this.loadingTable = true;
      const req = {
        GroupID: this.currentGroup,
        EmployeeID: this.currentEmployee,
        TypeSale: this.typeSale
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
      console.log(this.currentTable);
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
    },
    refreshData() {
      this.status = "";
      this.search = "";
      this.fetchData();
    },
    fetchSaleType() {
      GetSaleType().then(res => {
        if (res.RespCode == 0) {
          this.typeSales = res.SaleTypeLst;
        }
      });
    }
  },
  created() {
    this.fetchGroup();
    this.fetchSaleType();
  },
  watch: {
    currentPage() {
      this.fetchTable();
    },
    pageSize() {
      this.fetchTable();
    },
    currentEmployee() {
      this.fetchData();
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
