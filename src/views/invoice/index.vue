<template>
  <div class="orderhcm-container">
    <div class="orderhcm-header">
      <el-button
        class="inline-block"
        type="primary"
        :loading="listLoading"
        @click="fetchData()"
        >Cập nhật</el-button
      >
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
      <div class="inline-block floatright">
        <el-button type="success">
          <i class="fas fa-file-excel"></i> Export</el-button
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
              style="width: 100%"
              v-loading="props.row.isLoading"
              element-loading-text="Loading"
            >
              <el-table-column
                prop="Description"
                label="Sản phẩm"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="Quantity"
                label="Số lượng"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="unitMeasure"
                label="Đơn vị"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="unitPrice"
                label="Giá"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="amount"
                label="Tổng giá"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="amoutVAT"
                label="Tổng giá VAT"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="Gift"
                label="Quà"
                width="180"
              ></el-table-column>
            </el-table>
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

        <el-table-column label="Trạng thái" align="center" min-width="50">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | invoiceStatusColor">
              {{ scope.row.Status | invoiceStatusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" align="center" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
          background
          current-change="fetchData()"
          layout="prev, pager, next"
          :total="1000"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getInvoice } from "@/api/invoice";
import { getInvoiceLine } from "@/api/getInvoiceLine";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
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
      TextSearch: "",
      startDate: "",
      endDate: "",
      p: 0,
      listLoading: false,
      invoiceList: []
    };
  },
  methods: {
    fetchData() {
      var req = {
        startDate: this.startDate,
        endDate: this.endDate,
        id: Cookies.get("idEmployee"),
        token: Cookies.get("token"),
        p: this.p
      };
      this.listLoading = true;
      getInvoice(req).then(response => {
        console.log(response);
        this.invoiceList = response.Data;
        this.total = response.page;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.p = val;
      this.fetchData();
    },
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var No_ = row.No_;
        row.isLoading = true;
        getInvoiceLine({ No_: No_, token: Cookies.get("token") }).then(res => {
          row.lines = res.Data;
        });
        row.isLoading = false;
      }
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
        return this.limit;
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
  },
  watch: {
    startDate: function() {
      this.fetchData();
    },
    endDate: function() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
