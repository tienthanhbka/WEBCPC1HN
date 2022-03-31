<template>
  <div class="ship-box">
    <div class="ship-header">
      <div class="inline-block left">
        <div class="inline-block">
          <el-button
            size="small"
            type="primary"
            :loading="listLoading"
            @click="fetchData"
            >Cập nhật</el-button
          >
        </div>
        <div class="inline-block">
          <el-input size="small" placeholder="Search" v-model="TextSearch">
            <el-select slot="prepend" placeholder="Select">
              <el-option label="Tất cả" value="1"></el-option>
              <el-option label="Tên nhân viên" value="2"></el-option>
              <el-option label="Đơn vị" value="3"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="fetchData"
            ></el-button>
          </el-input>
        </div>
      </div>

      <div class="right inline-block">
        <div class="inline-block">
          <el-date-picker
            size="small"
            v-model="startDate"
            type="date"
            placeholder="Ngày bắt đầu"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            size="small"
            v-model="endDate"
            type="date"
            placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>

        <div class="inline-block ">
          <el-button type="success" size="small">
            <i class="fas fa-file-excel"></i> Export</el-button
          >
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="ship-content">
      <el-table
        v-loading="listLoading"
        :data="shipList"
        size="small"
        element-loading-text="Loading"
        @expand-change="expandRow"
        border
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>Số điện thoại đối tác: {{ props.row.phonePartner }}</p>
            <p>Thành phố: {{ props.row.City }}</p>
            <p>Người nhận: {{ props.row.nameReceiver }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Mã" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.idInvoiceHeader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hạn" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deadline | toDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Địa chỉ" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shipToAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Đối tác" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.namePartner }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Trung tâm" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.Bill_to_Name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Liên lạc" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Trạng thái" align="center" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | shipStatusColor">
              {{ scope.row.status | shipStatusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-pagination
        class="pagination"
        :total="total"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
import { getShip } from "@/api/ship";
import { getInvoiceLine } from "@/api/getInvoiceLine";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    }
  },
  props: {},
  data() {
    return {
      TextSearch: "",
      startDate: "",
      endDate: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      p: 0,
      listLoading: false,
      shipList: []
    };
  },
  methods: {
    fetchData() {
      var req = {
        startDate: this.startDate,
        endDate: this.endDate,

        code: Cookies.get("employeeCode"),
        token: Cookies.get("token")
      };
      this.listLoading = true;
      getShip(req).then(response => {
        console.log(req);
        console.log(response);
        this.shipList = response.Data;
        this.total = response.TotalPage;
        this.listLoading = false;
      });
    }
  },
  computed: {},
  created() {
    this.startDate = getStartDate();
    this.endDate = getEndDate();
    this.p = 1;
    this.fetchData();
  },
  watch: {
    startDate() {
      this.fetchData();
    },
    endDate() {
      this.fetchData();
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
.ship-box {
  background-color: #fff;

  .ship-header {
    .right {
      float: right;
    }
  }
}
</style>
