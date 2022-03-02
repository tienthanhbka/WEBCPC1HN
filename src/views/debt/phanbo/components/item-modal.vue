<template>
  <modal :id="modalId" :ref="modalId" v-cloak>
    <template slot="title">Sản phẩm</template>
    <div slot="body">
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="Mã sản phẩm" width="150">
          <template slot-scope="scope">{{scope.row.No_}}</template>
        </el-table-column>
        <el-table-column label="Tên sản phẩm" min-width="350">
          <template slot-scope="scope">{{scope.row.Name}}</template>
        </el-table-column>
        <el-table-column label="Đơn vị" min-width="350">
          <template slot-scope="scope">{{scope.row['Base Unit of Measure']}}</template>
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
  </modal>
</template>
<script>
import { GetBFOItem } from "@/api/item";

export default {
  props: {
    modalId: String
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
    ItemAdd() {
      //generateUUID
      var newIs = [];
      this.selectedItemInPage.forEach(e => {
        newIs.push({
          "Base Unit of Measure": e["Base Unit of Measure"],
          Name: e.Name,
          No_: e.No_,
          TotalRows: e.TotalRows,
          "Unit Cost": e["Unit Cost"]
        });
      });
      this.$emit("itemAdded", newIs);
      VoerroModal.hide(this.modalId);
    },
    fetchData() {
      this.isLoading = true;
      GetBFOItem({
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
    }
  }
};
</script>