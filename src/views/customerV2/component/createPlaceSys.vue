<template>
  <div style="height: 100%;">
    <div class="inline-block">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div>
      <el-table
        class="el-mobile-table"
        :data="tableData"
        v-loading="loadingTableData"
        border
        fit
        show-header
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column min-width="120px" label="Tên tổ chức">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên tổ chức">
              {{ scope.row.PlaceName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Loại tổ chức">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại tổ chức">
              {{ scope.row.Type }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="Địa chỉ">
          <template slot-scope="scope">
            <div class="dat-cell" label="Địa chỉ">
              {{ scope.row.AddrLv3 }}-{{ scope.row.AddrLv2 }}-{{
                scope.row.AddrLv1
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="Vùng" sortable>
          <template slot-scope="scope">
            <div class="dat-cell" label="Vùng">
              {{ scope.row.Area }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="100px" label="Vị trí">
        <template slot-scope="scope">
          <div class="dat-cell" label="Vị trí" style="display:grid;">
            <span>Vĩ độ: {{ scope.row.Latitude }}</span>
            <span>Kinh độ: {{ scope.row.Longitude }}</span>
            <span>Phạm vi: {{ scope.row.Range }}</span>
          </div>
        </template>
      </el-table-column> -->
        <el-table-column min-width="80px" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;display: table;border-bottom:1px solid #ccc;"
      >
        <el-button @click="cancelde" type="info">Hủy</el-button>
        <el-button type="primary" @click="onSubmit" icon="el-icon-check">
          Thêm tổ chức</el-button
        >
      </div>
      <el-pagination
        class="pagination"
        background
        :total="dataLength"
        layout="total,-> , prev, pager, next, sizes"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { AddPlaceFromSystem, GetPlaceByEmType } from "@/api/KDPlace";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      ReportID: 0,
      dialogFormCreate: false,
      dialogFormStart: false,
      TextSearch: "",
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      PlaceId: "",
      dataLength: 0
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      var req = {
        token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        NumberRow: this.pageSize,
        PageNumber: this.currentPage,
        Search: this.TextSearch
      };
      GetPlaceByEmType(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.PlaceLst;
          this.dataLength = res.NumberPage;
        }
      });
      this.loadingTableData = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "Vui lòng chỉ chọn một !",
          type: "warning"
        });
      } else {
        this.PlaceId = this.multipleSelection[0].PlaceId;
      }
    },
    onSubmit() {
      if (this.multipleSelection[0]) {
        var rep = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          PlaceId: this.PlaceId
        };
        AddPlaceFromSystem(rep).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Thêm tổ chức thành công",
              type: "success"
            });
            this.$emit("AddSysOK");
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          message: "Bạn chưa chọn !",
          type: "warning"
        });
      }
    },
    cancelde() {
      this.$emit("deletecancelOK");
    }
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    TextSearch() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="css" scoped></style>
