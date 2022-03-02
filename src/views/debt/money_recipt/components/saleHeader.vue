<template>
  <div>
    <el-tooltip
      v-if="reciptCoupon.status == 1 || reciptCoupon.status == 4"
      content="Thêm hóa đơn trong phiếu"
      placement="top"
    >
      <el-button
        @click="openModal"
        style="position:absolute;left:0; color: red;
    padding: 16px 18px;"
        ><i class="fas fa-plus"></i
      ></el-button>
    </el-tooltip>
    <el-table
      :header-row-style="{ color: '#273c75' }"
      :data="tableData"
      v-loading="isLoading"
      fit
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <sale-line
            :saleHeader="scope.row"
            :reciptCoupon="reciptCoupon"
          ></sale-line>
        </template>
      </el-table-column>
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope"
          >{{ scope.$index + 1 }}
          <el-tooltip
            v-if="reciptCoupon.status == 1 || reciptCoupon.status == 4"
            content="Xóa hóa đơn trong phiếu"
            placement="top"
          >
            <el-button
              style="color:#c0392b"
              type="text"
              size="medium"
              icon="el-icon-delete"
              @click="deleteHeader(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="No_"
        width="145"
        label="Số chứng từ"
      ></el-table-column>
      <el-table-column
        prop="External Document No_"
        width="140"
        label="Chứng từ ngoại"
      ></el-table-column>
      <el-table-column width="125" label="Ngày chứng từ">
        <template slot-scope="{ row }">
          {{ row["Posting Date"].substring(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Tiền hàng">
        <template slot-scope="{ row }">
          {{ row.SumAmount | toVND }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Đã TT (BFO)">
        <template slot-scope="{ row }">
          {{ row.SumRecipt | toVND }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Đã áp">
        <template slot-scope="{ row }">
          {{ row.SumApply | toVND }}
        </template>
      </el-table-column>
      <el-table-column
        prop="Sell-to Customer No_"
        label="Mã KH"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="Sell-to Customer Name"
        label="Tên KH"
        min-width="400"
      ></el-table-column>
    </el-table>
    <sale-header-modal
      @invoiceAdded="onInvoiceAdded"
      :modalId="saleHeaderModalRef"
      :reciptCoupon="reciptCoupon"
    ></sale-header-modal>
  </div>
</template>
<script>
import {
  GetSaleHeaderOfMoneyRecipt,
  GetSaleHeaderOfMoneyReciptF,
  AddSaleHeaderLstToMoneyRecipt,
  AddNewMoneyReciptHeaderSaleHeader,
  DeleteSaleHeader
} from "@/api/debt";
import SaleLine from "./saleLine";
import SaleHeaderModal from "./saleHeaderModal";
export default {
  components: {
    SaleLine,
    SaleHeaderModal
  },
  props: {
    reciptCoupon: Object
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      saleHeaderModalRef: "sale-header-modal" + this.reciptCoupon.rowID
    };
  },
  methods: {
    openModal() {
      VoerroModal.show(this.saleHeaderModalRef);
    },
    deleteHeader(row) {
      this.$confirm("Bạn có muốn xóa hóa đơn này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          DeleteSaleHeader({
            no: row.rowID
          }).then(res => {
            var idx = this.tableData.indexOf(row);
            this.tableData.splice(idx, 1);
          });
        })
        .catch(() => {});
    },
    onInvoiceAdded(invoices) {
      if (this.reciptCoupon.fast_sales == 1) {
        const req = {
          HeaderID: this.reciptCoupon.rowID,
          InvoiceNoLst: ""
        };
        invoices.forEach((e, index) => {
          if (index == 0) req.InvoiceNoLst += e["No_"];
          else req.InvoiceNoLst += "," + e["No_"];
        });
        AddNewMoneyReciptHeaderSaleHeader(req).then(res => {
          if (res.RespCode == 0) {
            this.fetchData();
          }
        });
      } else {
        var req = [];
        invoices.forEach(e => {
          req.push({
            headerId: this.reciptCoupon.rowID,
            no: e["No_"]
          });
        });
        AddSaleHeaderLstToMoneyRecipt({ data: req }).then(res => {
          //console.log(res);
          res.Data.forEach(e => {
            invoices.forEach(o => {
              if (e.No_ == o.No_) {
                e.SumAmount = o.SumAmount;
                e.SumRecipt = o.SumRecipt;
              }
            });
            this.tableData.push(e);
          });
        });
      }
    },
    fetchData() {
      //if(this.reciptCoupon.saleHeaders==null){
      //console.log(this.reciptCoupon);
      this.isLoading = true;
      //Đơn hàng bên FAST thì dùng API của a Thặng
      if (this.reciptCoupon.fast_sales == 1) {
        let arrTB = [];
        GetSaleHeaderOfMoneyReciptF({
          HeaderID: this.reciptCoupon.rowID
        }).then(res => {
          this.isLoading = false;
          res.SalesHeaderLst.forEach(function(e) {
            let obj = {
              "External Document No_": e.InvoiceNo,
              No_: e.InvoiceNo,
              "Posting Date": e.PostingDate,
              "Sell-to Customer Name": e.CustomerName,
              "Sell-to Customer No_": e.CustomerID,
              SumAmount: e.SumAmount,
              SumApply: e.SumApply,
              SumRecipt: e.SumRecipt,
              headerID: e.HeaderID,
              rowID: e.RowID
            };
            arrTB.push(obj);
          });
          this.reciptCoupon.saleHeaders = arrTB;
          this.tableData = arrTB;
        });
      }
      //Còn lại dùng API của a ĐẠT
      else {
        GetSaleHeaderOfMoneyRecipt({
          no: this.reciptCoupon.rowID
        }).then(res => {
          this.isLoading = false;
          res.Data.forEach(e => {
            e.saleLines = null;
          });
          this.reciptCoupon.saleHeaders = res.Data;
          this.tableData = res.Data;
        });
      }
    }
  },

  mounted() {
    this.fetchData();

    //}
  }
};
</script>
<style scoped>
.el-table__expanded-cell {
  padding: 0px;
}
</style>
