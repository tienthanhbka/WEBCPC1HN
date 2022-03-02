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
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="fetchData"
        ></el-button>
      </div>
      <el-tag
        :key="c.No_"
        v-for="c in selectedItemInPage"
        closable
        :disable-transitions="false"
        @close="handleClose(c)"
        >{{ c.No_ }}</el-tag
      >
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
          <template slot-scope="scope">{{ scope.row.No_ }}</template>
        </el-table-column>
        <el-table-column label="Tên sản phẩm" min-width="150">
          <template slot-scope="scope">{{ scope.row.Description }}</template>
        </el-table-column>
        <el-table-column label="Đơn vị" min-width="150">
          <template slot-scope="scope">{{
            scope.row["Unit of Measure"]
          }}</template>
        </el-table-column>
        <el-table-column label="Giá" min-width="150">
          <template slot-scope="scope">{{
            scope.row["Unit Price"] | toVND
          }}</template>
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
import { GetBFOItemByCus, GetByProject } from "@/api/item";
import { AddItemLstToCommissionOrderLine } from "@/api/debt";
import { InitOValue } from "../c-method";
import TypeCus from "../const";
export default {
  props: {
    modalId: String,
    coupon: Object,
    project: Object,
    idCustomer: String,
    info: Object
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
      var itemString = [];
      this.selectedItemInPage.forEach(e => {
        itemString.push(e.No_);
        newIs.push({
          Unit: e["Unit of Measure"],
          Name: e.Description,
          ItemCode: e.ItemCode,
          idProduct: e.No_,
          TotalRows: e.TotalRows,
          "Unit Price": e["Unit Price"],
          DateStart: this.coupon ? this.coupon.BaseDateStart : null,
          isEdit: true
        });
        itemsLst.push({
          Unit: e["Unit of Measure"],
          DateStart: this.coupon ? this.coupon.BaseDateStart : null,
          Name: e.Description,
          ItemCode: e.ItemCode,
          idProduct: e.No_,
          UnitPrice: e["Unit Price"],
          signature: e["signature"]
        });
      });
      if (this.hasDuplicates(itemString)) {
        this.$message({
          message: "Không được chọn 2 mã sản phẩm trùng nhau",
          type: "error"
        });
        return;
      }
      var type = null;
      if (this.project != null) {
        type = "TH";
        if (this.project.items == null) {
          this.project.items = [];
        }
      } else if (this.coupon != null) {
        type = "KD";
      }

      if (type) {
        AddItemLstToCommissionOrderLine({
          items: itemsLst,
          type: type,
          headerID: type == "TH" ? this.project.RowID : this.coupon.RowID,
          DateStart: this.coupon.BaseDateStart
        }).then(res => {
          var it = res.Data;
          var arr = null;
          if (type == "TH") {
            arr = this.project.items;
          } else {
            arr = this.coupon.items;
          }
          it.forEach(e => {
            var alAdd = true;
            arr.forEach(o => {
              if (e.idProduct == o.idProduct) {
                alAdd = false;
              }
            });
            if (alAdd) {
              InitOValue(e, type);
              e.DateStart = null;
              e.isEdit = true;
              arr.push(e);
            }
          });

          this.$emit("closeModal", newIs);
          this.$emit("itemAdded", newIs);
        });
      } else {
        this.$emit("itemAdded", newIs);
      }
    },
    fetchData() {
      if (this.project != null) {
        this.isLoading = true;

        GetByProject({
          PageNumber: this.currentPage,
          RowspPage: this.pageSize,
          th: this.project.No_,
          search: this.search,
          cusNo: this.coupon.idCustomer
        }).then(res => {
          this.tableData = res.Data;
          this.isLoading = false;
          this.dataLength = res.TotalRows;
          //this.selecteRow();
        });
      } else if (this.coupon != null) {
        this.isLoading = true;

        GetBFOItemByCus({
          no: this.coupon.idCustomer,
          PageNumber: this.currentPage,
          RowspPage: this.pageSize,
          search: this.search
        }).then(res => {
          this.tableData = res.Data;
          this.isLoading = false;
          this.dataLength = res.TotalRows;
          //this.selecteRow();
        });
      } else {
        this.isLoading = true;
        GetBFOItemByCus({
          no: this.idCustomer,
          PageNumber: this.currentPage,
          RowspPage: this.pageSize,
          search: this.search,
          start: this.info ? this.info.start : null,
          end: this.info ? this.info.end : null
        }).then(res => {
          this.tableData = res.Data;
          this.isLoading = false;
          this.dataLength = res.TotalRows;
          //this.selecteRow();
        });
      }
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
      this.search = "";
      if (this.project != null) {
        this.fetchData();
      }
    },
    coupon() {
      this.search = "";
      if (this.coupon != null) {
        this.fetchData();
      }
    },
    idCustomer() {
      if (this.idCustomer != null) {
        this.fetchData();
      }
    }
  }
};
</script>
