<template>
  <div class="orderhcm-container">
    <div class="orderhcm-header">
      <div class="inline-block">
        <el-select v-model="groups" clearable placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <el-button class="inline-block" type="primary" :loading="listLoading" @click="fetchData()">Cập nhật</el-button> -->
      <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-input
          placeholder="Search"
          v-model="TextSearch"
          class="input-with-select"
        >
          <el-select slot="prepend" placeholder="Select">
            <el-option label="Tất cả" value="1"></el-option>
            <el-option label="Tên nhân viên" value="2"></el-option>
            <el-option label="Đơn vị" value="3"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="fetchData()"
          ></el-button>
        </el-input>
      </div>
      <div class="inline-block" style="float:right">
        <el-button type="success" v-loading="downloading" @click="exportExcel">
          <i class="fas fa-file-excel"></i> Xuất Excel</el-button
        >
      </div>
    </div>
    <div class="orderhcm-content">
      <el-table
        v-loading="listLoading"
        :data="invoiceList"
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
              v-model="rowNow"
              style="width: 100%"
              v-loading="props.row.isLoading"
              element-loading-text="Loading"
            >
              <el-table-column
                prop="Description"
                label="Sản phẩm"
                width="180"
              ></el-table-column>
              <el-table-column prop="Quantity" label="Số lượng" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.Quantity | quantity }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="unitMeasure"
                label="Đơn vị"
                width="180"
              ></el-table-column>
              <el-table-column prop="unitPrice" label="Giá" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.unitPrice | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Tổng giá" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amoutVAT" label="Tổng giá VAT" width="180">
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
        <el-table-column label="Nhân viên" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.nameEmployee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hạn" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ExpriationDate | toDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Đơn vị" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.BillAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Loại" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.templateCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Người nhận" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.BillToName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số điện thoại" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="Trạng thái" align="center" min-width="50">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | invoiceStatusColor ">
                        {{ scope.row.Status|invoiceStatusText }}
                    </el-tag>
                </template>
            </el-table-column> -->
        <el-table-column label="Ghi chú" align="center" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
          class="pagination"
          background
          layout="total,-> , prev, pager, next, sizes"
          :total="total"
          :current-page="currentPage"
          :page-size.sync="pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getInvoice, getInvoiceGroup } from "@/api/invoice";
import { getInvoiceLine } from "@/api/getInvoiceLine";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
import { GetListGroupAdminByToken } from "@/api/groups";
import { GetSalesGroup } from "@/api/saleHeader";
export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    quantity(amount) {
      var splitted = parseInt(amount);
      return splitted;
    }
  },
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      }
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      downloading: false,
      TextSearch: "",
      startDate: "",
      endDate: "",
      currentPage: 0,
      page_row: 10,
      total: 0,
      rowNow: "",
      groupList: "",
      groups: "",
      listLoading: false,
      invoiceList: []
    };
  },
  methods: {
    fetchData() {
      if (this.groups == "") {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Bạn không phải là trưởng nhóm",
          type: "warning",
          position: "top-left"
        });
      } else {
        var req = {
          startDate: this.startDate,
          endDate: this.endDate,
          id: Cookies.get("idEmployee"),
          token: Cookies.get("token"),
          admin: this.groups,
          page: this.currentPage,
          page_row: this.page_row
        };
        this.listLoading = true;
        getInvoiceGroup(req).then(response => {
          this.invoiceList = response.Data;
          this.total = response.TotalPage;
          this.listLoading = false;
          this.currentPage = response.PageNumber;
          this.page_row = response.RowspPage;
        });
      }
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
    },
    fetchGroup() {
      var req = {
        token: Cookies.get("token")
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;
      });
    },
    exportExcel() {
      this.downloading = true;
      const req = {
        DateStart: this.startDate,
        DateEnd: this.endDate,
        GroupID: this.groups
      };
      GetSalesGroup(req).then(res => {
        if (res.RespCode == 0) {
          this.ExportExcel(res.SalesLst);
        }
      });
    },
    ExportExcel(data) {
      const tHeader = [
        "Mã nhân viên",
        "Tên nhân viên",
        "Hạn",
        "Đơn vị",
        "Loại",
        "Người nhận",
        "Số điện thoại",
        "Ghi chú",
        "Sản phẩm",
        "Số lượng",
        "Đơn vị",
        "Giá",
        "Tổng giá",
        "Tổng giá VAT",
        "Quà"
      ];
      const filterHeader = [
        "IDEmployee",
        "NameEmployee",
        "ExpriationDate",
        "BillAddress",
        "TemplateCode",
        "BillToName",
        "Contact",
        "Note",
        "Description",
        "Quantity",
        "UnitMeasure",
        "UnitPrice",
        "Amount",
        "AmountVAT",
        "Gift"
      ];
      var data = data;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            "Danh sách đơn hàng nhóm " +
            this.groups +
            " từ " +
            Date.parse(this.startDate).toString("dd/MM/yyyy") +
            " đến " +
            Date.parse(this.endDate).toString("dd/MM/yyyy"), //Optional
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
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.TotalPage;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  created() {
    this.startDate = getStartDate();
    this.endDate = getEndDate();

    this.p = 1;
    this.fetchData();
    this.fetchGroup();
  },

  watch: {
    startDate: function() {
      this.fetchData();
    },
    endDate: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
      //this.fetchEmployee();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.orderhcm-container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;

  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
  }

  .table-pagination {
    margin-top: 10px;
  }
}
</style>
