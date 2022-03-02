<template>
  <div>
    <div>
      <div style="margin-bottom:10px">
        <el-input
          placeholder="Tên hoặc Mã"
          size="mini"
          v-model="search"
          style="width: calc(100% - 55px);"
        ></el-input>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="fetchData"></el-button>
      </div>
      <el-tag
        :key="c.No_"
        v-for="c in selectedItemInPage"
        closable
        :disable-transitions="false"
        @close="handleClose(c)"
      >{{c.No_}}</el-tag>
      <el-table
        ref="itemBFOModal"
        size="mini"
        v-loading="isLoading"
        border
        fit
        :data="tableData"
        @row-click="rowclick"
        @selection-change="rowchange"
      >
      <el-table-column align="center" width="97px" label="STT">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (currentPage - 1)*pageSize}}
          </template>
      </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="Mã sản phẩm" width="150">
          <template slot-scope="scope">{{scope.row.No_}}</template>
        </el-table-column>
        <el-table-column label="Tên sản phẩm" min-width="150">
          <template slot-scope="scope">{{scope.row.Description}}</template>
        </el-table-column>
        <el-table-column label="Đơn vị" min-width="150">
          <template slot-scope="scope">{{scope.row['Unit of Measure']}}</template>
        </el-table-column>
        <el-table-column label="Giá" min-width="150">
          <template slot-scope="scope">{{scope.row['Unit Price']|toVND}}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :total="dataLength"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :small="true"
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info">Hủy</el-button>
      <el-button type="success" @click="ItemAdd">Thêm</el-button>
    </div>
  </div>
</template>
<script>
import { GetBFOItemByCus } from "@/api/item";
import {generateUUID} from '@/utils';

export default {
  props: {
    customer:Object
  },

  data() {
    return {
      idItemS: "",
      nameItemS: "",
      isLoading: false,
      search: "",
      tableData: [],
      selectedCus: [],
      selectedItemInPage: [],
      currentPage: 1,
      dataLength: 1000,
      pageSize: 10,
      i: 0
    };
  },
  methods: {
     hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
},
    ItemAdd() {
      var newIs = [];
      var itemsLst = [];
      var itemString=[];
      this.selectedItemInPage.forEach(e => {
        itemString.push(e.No_);
        newIs.push({
          "Unit": e["Unit of Measure"],
          Name: e.Description,
          No_: e.No_,
          id:generateUUID()
          
        });
        
      });
      if(this.hasDuplicates(itemString)){
        this.$message({
            message: "Không được chọn 2 mã sản phẩm trùng nhau",
            type: "error"
          });
          return;
      }
      
    this.$emit('ItemChoosed',newIs);
        
     
    },
    fetchData() {
     
        this.isLoading = true;
        GetBFOItemByCus({
          no:this.customer.No_,
          PageNumber: this.currentPage,
          RowspPage: this.pageSize,
          search: this.search
        }).then(res => {
          
          this.tableData = res.Data;
          this.isLoading = false;
          this.dataLength = res.TotalRows;
          //this.selecteRow();
        });
      
    },
    handleClose(c) {
      this.$refs.customerBFOModal.toggleRowSelection(c, false);
    },
    selecteRow() {},
    rowchange(cur) {
      this.selectedItemInPage = cur;
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.itemBFOModal.toggleRowSelection(row);
      }
    }
  },
  created() {
    this.fetchData();
  },
  
  watch: {
    pageSize() {
      this.fetchData();
    },
    project() {
      this.search = '';
      if (this.project != null) {
        this.fetchData();
      }
    },
    coupon() {
      this.search = '';
      if (this.coupon != null) {
        this.fetchData();
      }
    }
  }
};
</script>