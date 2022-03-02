<template>
  <div>
    <div>
      <el-button size="mini" type="primary" @click="fetchData">
        <i class="fas fa-sync-alt"></i>
      </el-button>
      <el-input style="width: calc(100% - 48px);" v-model="search" size="mini"></el-input>
    </div>

    <el-table
      style="margin-top:5px"
      ref="cusCnTable"
      size="mini"
      v-loading="isLoading"
      border
      fit
      :data="tableData"
      @row-click="rowclick"
      @selection-change="rowchange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="Khách hàng CN" min-width="150">
        <template slot-scope="scope">{{scope.row.nameCustomer}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="getData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
    <div style="text-align:right;margin-top:10px">
        <el-button type="success" @click="btnOKClick">Chọn</el-button>
    </div>
  </div>
</template>
<script>
import { GetCusCNOfCusTC } from "@/api/customer";
export default {
  props: {
    cusNo: String
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total:0,
      selecteds: [],
      tableData: [],
      isLoading: false,
      search: "",
      allData: []
    };
  },
  watch: {
    pageSize() {
      this.getData();
    },
    search() {
      this.getData();
    }
  },
  methods: {
    btnOKClick(){
        this.$emit('cusChoosed',this.selecteds);
    },
    getData() {
      var t= this.allData
        .filter(e => {
          return e.nameCustomer.toLowerCase().includes(this.search.toLowerCase());
        });
    this.total = t.length;
        this.tableData = t.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    fetchData() {
        this.isLoading = true;
      GetCusCNOfCusTC({
        no: this.cusNo
      }).then(res => {
          this.isLoading = false,
        this.allData = res.Data;
        this.total = this.allData.length;
        this.getData();
      });
    },
    rowchange(cur) {
      this.selecteds = cur;
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.cusCnTable.toggleRowSelection(row);
      }
    }
  }
};
</script>