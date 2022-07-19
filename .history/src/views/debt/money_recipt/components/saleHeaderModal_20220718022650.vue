<template>
  <modal :id="modalId" :ref="modalId" v-cloak>
    <template slot="title"
      >Thêm hóa đơn</template
    >

    <div slot="body">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-autocomplete
            style="width: 100%;"
            class="inline-input"
            size="mini"
            v-model="customerNo"
            :fetch-suggestions="querySearchNo"
            clearable
            placeholder="Mã khách hàng"
          ></el-autocomplete>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-autocomplete
            class="inline-input"
            clearable
            size="mini"
            v-model="customerName"
            :fetch-suggestions="querySearchName"
            placeholder="Tên khách hàng"
          ></el-autocomplete>
        </el-col>

        <el-col :xs="24" :sm="8" :lg="8">
          <el-input
            style="width: calc(100% - 48px);"
            type="text"
            size="mini"
            v-model="documentNo"
            clearable
            placeholder="Mã hồ sơ"
            autocomplete="off"
          ></el-input>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="fetchData"
          ></el-button>
        </el-col>
      </el-row>
      <div style="margin-bottom:10px"></div>

      <el-table
        size="mini"
        v-loading="isLoading"
        border
        ref="saleHeaderTableModal"
        :data="tableData"
        @row-click="rowclick"
        @selection-change="rowchange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="Số chứng từ" width="150">
          <template slot-scope="scope">{{ scope.row.No_ }}</template>
        </el-table-column>
        <el-table-column label="Chứng từ ngoại" width="150">
          <template slot-scope="scope">{{
            scope.row["External Document No_"]
          }}</template>
        </el-table-column>
        <el-table-column label="Khách hàng" width="400">
          <template slot-scope="scope"
            >{{ scope.row["Sell-to Customer No_"] }} -
            {{ scope.row["Sell-to Customer Name"] }}</template
          >
        </el-table-column>
        <el-table-column label="Tổng tiền" width="120">
          <template slot-scope="scope">{{
            scope.row["SumAmount"] | toVND
          }}</template>
        </el-table-column>
        <el-table-column label="Thanh toán" width="120">
          <template slot-scope="scope">{{
            scope.row["SumRecipt"] | toVND
          }}</template>
        </el-table-column>
        <el-table-column label="Ngày" width="120">
          <template slot-scope="scope">{{
            scope.row["Posting Date"].substring(0, 10)
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
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" @click="addInvoice">Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { FindSaleHeaders } from "@/api/saleHeader";
import { FindSalesHeaderF } from "@/api/debt";
import { GetMyPlace } from "@/api/place";
export default {
  props: {
    modalId: String,
    reciptCoupon: Object
  },
  data() {
    return {
      isLoading: false,
      customerNo: "",
      customerName: "",
      documentNo: "",
      tableData: [],
      selectedInvoice: [],
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
      customerNoLst: [],
      customerNameLst: []
    };
  },
  methods: {
    querySearchNo(queryString, cb) {
      var lst = this.customerNoLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    querySearchName(queryString, cb) {
      var lst = this.customerNameLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    createFilter(queryString) {
      return el => {
        return el.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    fetchData() {
      this.isLoading = true;
      const arrTB = [];
      if (this.reciptCoupon.fast_sales == 1) {
        FindSalesHeaderF({
          CustomerID: this.customerNo,
          CustomerName: this.customerName,
          InvoiceNo: this.documentNo,
          PageNumber: this.currentPage,
          NumberRow: this.pageSize
        }).then(res => {
          res.SalesHeaderLst.forEach(function(e) {
            let obj = {
              No_: e.InvoiceNo,
              "External Document No_": e.InvoiceNo,
              "Sell-to Customer No_": e.CustomerID,
              "Sell-to Customer Name": e.CustomerName,
              SumAmount: e.SumAmount,
              SumRecipt: e.SumRecipt,
              "Posting Date": e.PostingDate
            };
            arrTB.push(obj);
          });

          this.dataLength = this.pageSize * res.NumberPage;
          this.tableData = arrTB;
          this.isLoading = false;
        });
      } else {
        FindSaleHeaders({
          customerNo: this.customerNo,
          customerName: this.customerName,
          documentNo: this.documentNo,
          PageNumber: this.currentPage,
          RowspPage: this.pageSize
        }).then(res => {
          //console.log(res);
          res.Data.forEach(e => {
            (e["document_no"] = e["No_"]), (e.saleLines = null);
          });
          this.dataLength = res.TotalRows;
          this.tableData = res.Data;
          this.isLoading = false;
        });
      }
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.saleHeaderTableModal.toggleRowSelection(row);
      }
    },
    rowchange: function(cur) {
      this.selectedInvoice = cur;
    },
    addInvoice() {
      this.$emit("invoiceAdded", this.selectedInvoice);
      this.closeModal();
    },
    closeModal() {
      VoerroModal.hide(this.modalId);
    }
  },

  created() {
    GetMyPlace().then(res => {
      //console.log(res);
      res.Data.forEach(e => {
        this.customerNameLst.push({ value: e.namePlace, attribute: e.idPlace });
        this.customerNoLst.push({ value: e.idPlace, attribute: e.idPlace });
      });
    });
  }
};
</script>
<style scoped>
.inline-input {
  width: 100%;
}
</style>
