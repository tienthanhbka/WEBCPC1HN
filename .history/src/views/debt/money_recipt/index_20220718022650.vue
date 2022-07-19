<template>
  <div class="employee-mission-container">
    <div style="margin-top:3px" id="couponTabHeaderBtn">
      <el-input
        style="width:200px"
        v-model="search"
        type="text"
        placeholder="Mã NV | Tên NV"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="inline-block"
        @click="fetchData"
      ></el-button>
      <el-button
        style="margin-left:0px"
        type="warning"
        icon="el-icon-circle-plus-outline"
        class="inline-block"
        @click="openModal"
        >Phiếu mới</el-button
      >
      <el-badge :value="selectedCoupons.length" type="primary">
        <el-button
          type="success"
          :icon="isExporting ? 'el-icon-loading' : 'el-icon-document'"
          @click="exportCoupon"
          class="inline-block"
          >Báo cáo</el-button
        >
      </el-badge>
      <el-tooltip content="Xem hướng dân">
        <router-link to="/help/phieu-nop-tien">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-question"
            circle=""
          ></el-button>
        </router-link>
      </el-tooltip>

      <!-- <el-button
        icon="el-icon-message"
        type="success"
        @click="sendMail"
        class="inline-block"
      >Gửi mail</el-button> -->
    </div>

    <div>
      <el-table
        :data="tableData"
        v-loading="isLoading"
        :max-height="tableHeight"
        :row-style="checkRow"
        :header-row-style="{ color: '#2f3640' }"
        style="width: 100%"
        @expand-change="expandRow"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <sale-header :reciptCoupon="scope.row"></sale-header>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" width="97px" label="STT">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Sửa phiếu" placement="top">
              <el-button
                style="color:#f1c40f"
                type="text"
                size="medium"
                icon="el-icon-edit"
                @click="editCoupon(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- <el-tooltip content="Xóa phiếu" placement="top">
              <el-button
                style="color:#c0392b"
                type="text"
                size="medium"
                icon="el-icon-delete"
                @click="deleteCoupon(row)"
              ></el-button>
            </el-tooltip> -->
            <el-popover placement="top-start" width="200" trigger="hover">
              <div>
                <!-- <el-button
                  style="color:#16a085"
                  type="text"
                  size="medium"
                  icon="el-icon-check"
                  @click="approveCoupon(scope.row)"
                >Duyệt</el-button> -->
                <el-button
                  style="color:#c0392b"
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  @click="deleteCoupon(scope.row)"
                  >Xóa</el-button
                >
              </div>
              <el-button
                style="color:#2980b9"
                type="text"
                size="medium"
                icon="el-icon-s-operation"
                slot="reference"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="Người nộp"
          width="140"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
        </el-table-column>
        <el-table-column width="170" label="Hình thức">
          <template slot-scope="{ row }">{{
            row.source_money | toSource
          }}</template>
        </el-table-column>
        <el-table-column width="170" label="Số tiền">
          <template slot-scope="{ row }">{{ row.amount | toVND }}</template>
        </el-table-column>
        <el-table-column width="170" label="Đã áp">
          <template slot-scope="{ row }">{{ row.sumApply | toVND }}</template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="200" align="center">
          <template slot-scope="{ row }">
            <el-popover
              v-if="
                row.account_kt1 != null ||
                  row.account_kt2 != null ||
                  row.account_kt3 != null ||
                  row.account_kt != null
              "
              width="300"
              trigger="hover"
            >
              <div>
                <div v-if="row.account_kt1">
                  <div>
                    <b>Xác nhận tiền về</b>
                  </div>
                  <div>
                    • {{ row.nameKt1 }}
                    {{
                      row.time_check1 ? row.time_check1.substring(0, 16) : ""
                    }}
                  </div>
                </div>
                <div v-if="row.account_kt2">
                  <div>
                    <b>Duyệt bản kê</b>
                  </div>
                  <div>
                    • {{ row.nameKt2 }}
                    {{
                      row.time_check2 ? row.time_check2.substring(0, 16) : ""
                    }}
                  </div>
                </div>
                <div v-if="row.account_kt3">
                  <div>
                    <b>Áp thanh toán</b>
                  </div>
                  <div>
                    • {{ row.nameKt3 }}
                    {{
                      row.time_check3 ? row.time_check3.substring(0, 16) : ""
                    }}
                  </div>
                </div>
                <div v-if="row.account_kt">
                  <div><b>Treo bản kê</b></div>
                  <div>
                    • {{ row.nameKt }}
                    {{ row.time_check ? row.time_check.substring(0, 16) : "" }}
                  </div>
                </div>
              </div>
              <el-tag slot="reference" :type="row.status | couponStatusColor"
                ><i class="fas fa-info"></i>
                {{ row.status | couponStatusText }}</el-tag
              >
            </el-popover>
            <el-tag v-else :type="row.status | couponStatusColor"
              >{{ row.status | couponStatusText }}
            </el-tag>
            <el-tooltip
              v-if="row.amount != row.sumApply"
              effect="light"
              :content="rowWarningContent(row)"
            >
              <i class="fas fa-exclamation-triangle c-waring"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column width="150" label="TK nhận">
          <template slot-scope="{ row }">{{ row["account_bank"] }}</template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="Nội dung"
          width="380"
        ></el-table-column>
          <el-table-column
          prop="_kt"
          label="Ghi chú KT"
          width="250"
        ></el-table-column>
        <el-table-column width="150" label="T/g chuyển">
          <template slot-scope="{ row }">{{
            row["time_send_money"]
              ? row["time_send_money"].substring(0, 10)
              : ""
          }}</template>
        </el-table-column>
        <el-table-column width="150" label="T/g dự kiến">
          <template slot-scope="{ row }">{{
            row["time_expected"] ? row["time_expected"].substring(0, 10) : ""
          }}</template>
        </el-table-column>
        <el-table-column width="150" label="T/g lập phiếu">
          <template slot-scope="{ row }">{{
            row["time"] ? row["time"].substring(0, 10) : ""
          }}</template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="dataLength"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
    <coupon-modal
      @new-coupon="onNewCoupon"
      :coupon="currentEditCoupon"
      modalId="new-coupon-modal"
    ></coupon-modal>
  </div>
</template>

<script>
import {
  DeleteMoneyReciptHeader,
  ExportCoupon,
  ApproveMoneyReciptHeader
} from "@/api/debt";
import CouponModal from "./components/couponModal";
import SaleHeader from "./components/saleHeader";
import { GetMoneyReciptHeader } from "@/api/debt";
import { log } from "util";
export default {
  data() {
    return {
      search: "",
      tableHeight: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      isLoading: false,
      dataLength: 1,
      isExporting: false,
      selectedCoupons: [],
      currentEditCoupon: null
    };
  },
  components: {
    CouponModal,
    SaleHeader
  },
  filters: {
    toSource(val) {
      if (val == 0) {
        return "Thu từ khách hàng";
      } else if (val == 1) {
        return "Tạm ứng công nợ";
      }
    }
  },
  methods: {
    checkRow({ row, rowIndex }) {
      if (row.sumApply == 0 || row.sumApply != row.amount) {
        return { background: "oldlace" };
      }
    },
    rowWarningContent(row) {
      if (row.sumApply == 0) {
        return "Bạn chưa áp thanh toán, hãy mở phiếu -> thêm hóa đơn -> áp thanh toán cho từng dòng hóa đơn";
      } else if (row.sumApply != row.amount) {
        return "Thông thường giá trị phiếu phải bằng số tiền áp (cột 4, cột 5)";
      }
      return "--";
    },
    approveCoupon(row) {
      ApproveMoneyReciptHeader({ no: row.rowID }).then(res => {
        row.status = 2;
      });
    },
    handleSelectionChange(val) {
      this.selectedCoupons = val;
    },
    sendMail() {
      var url =
        "https://mail.google.com/mail/?view=cm&fs=1&su=Phiếu nộp tiền&body=";
      window.open(url);
    },
    exportCoupon() {
      if (this.selectedCoupons.length == 0) {
        this.$message({
          message: "Hãy chọn những hóa đơn cần xuất báo cáo",
          type: "error"
        });
        return;
      }
      this.isExporting = true;
      const tHeader = [
        "Số phiếu",
        "Tên nhân viên",
        "SĐT",
        "Mã nhân viên",
        "Ngày tạo",
        "Ngày chuyển tiền",
        "Số tiền nhận",
        "Tài khoản nhận",
        "Ghi chú",
        "Số chứng từ",
        "Chứng từ ngoại",
        "Mã khách hàng trả tiền",
        "Tên khách hàng",
        "Ngày hóa đơn",
        "Dòng hóa đơn",
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Đơn vị tính",
        "Số lượng",
        "Đơn giá",
        "Chi phí (ĐVT)",
        "Chi phí giữ lại",
        "Số tiền hàng",
        "Số tiền hàng(VAT)",
        "Giữ lại chi phí?",
        "Số tiền phải nộp",
        "Số tiền áp thanh toán"
      ];
      const filterVal = [
        "rowID",
        "nameEmployee",
        "idEmployee",
        "employeeCode",
        "time",
        "time_send_money",
        "amount",
        "account_bank",
        "note",
        "No_",
        "External Document No_",
        "Sell-to Customer No_",
        "Sell-to Customer Name",
        "Posting Date",
        "Line No_",
        "Item No",
        "Description",
        "Unit of Measure",
        "Quantity",
        "Unit Price",
        "%amount",
        "AmountRecv",
        "AmountSL",
        "Amount Including VAT",
        "type",
        "AmountSend",
        "amountApply"
      ];
      var self = this;
      var rows = this.selectedCoupons.map(function(o) {
        return o["rowID"];
      });

      ExportCoupon({ rows: rows }).then(res => {
        this.isExporting = false;
        var data = res.Data;
        //console.log(res.Data); return;

        var data2 = self.formatJson(filterVal, data);

        var merges = this.getMerges(data2);
        //console.log(merges);

        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: data2,
            filename: "Phiếu nộp tiền", //Optional
            merges: merges,
            autoWidth: true, //Optional
            bookType: "xlsx" //Optional
          });
          self.downloading = false;
        });
      });
    },
    newMergeObj(sr, er, c) {
      return { s: { r: sr, c: c }, e: { r: er, c: c } };
    },
    getMerges(arr) {
      var first = arr[0];
      var mergesArr = [];
      //console.log(arr);

      var columnMerge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      var temp = [];
      columnMerge.forEach(e => {
        temp[e] = { j: 0, k: 0 };
      });
      for (var o in arr) {
        var i = Number(o);
        let row1 = arr[i];
        let row2 = arr[Number(i) + 1];
        for (let col in temp) {
          var mer = temp[col];
          col = Number(col);
          if (col == 9 || col == 10 || (col == 11) | (col == 12) || col == 13) {
            if (
              row2 != null &&
              row1[9] == row2[9] &&
              row1[0] == row2[0] &&
              row1[col] == row2[col]
            ) {
              mer.k = i + 1;
            } else {
              mergesArr.push(this.newMergeObj(mer.j + 1, mer.k + 1, col));
              mer.j = i + 1;
              mer.k = mer.j;
            }
          } else {
            if (row2 != null && row1[0] == row2[0]) {
              mer.k = i + 1;
            } else {
              mergesArr.push(this.newMergeObj(mer.j + 1, mer.k + 1, col));
              mer.j = i + 1;
              mer.k = mer.j;
            }
          }
        }
      }
      return mergesArr;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j == "time" || j == "time_send_money" || j == "Posting Date") {
            return v[j] ? v[j].substring(0, 10) : "";
          } else if (
            j == "Unit Price" ||
            j == "Quantity" ||
            j == "AmountSL" ||
            j == "amount" ||
            j == "%amount" ||
            j == "Amount Including VAT" ||
            j == "amountApply" ||
            j == "AmountRecv" ||
            j == "AmountSend"
          ) {
            return Number(v[j]);
          } else if (j == "type") {
            return v[j] == 1 ? "Có" : "Không";
          } else {
            return v[j];
          }
        })
      );
    },
    editCoupon(row) {
      //console.log(row);

      this.currentEditCoupon = row;
      VoerroModal.show("new-coupon-modal");
    },
    deleteCoupon(row) {
      if (row.status != 1) {
        this.$message({
          message: "Phiếu này không được xóa",
          type: "error"
        });
      }
      this.$confirm("Bạn có muốn xóa phiếu chuyển tiền này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          DeleteMoneyReciptHeader({ no: row.rowID }).then(res => {
            row.status = 0;
            // var idx = this.tableData.indexOf(row);
            // if (idx !== -1) {
            //   this.tableData.splice(idx, 1);
            // }
          });
        })
        .catch(() => {});
    },
    changeTableHeight() {
      this.tableHeight =
        document.body.offsetHeight -
        document.getElementById("couponTabHeaderBtn").clientHeight -
        114;
    },
    openModal() {
      this.currentEditCoupon = null;
      VoerroModal.show("new-coupon-modal");
    },
    fetchData() {
      this.isLoading = true;
      GetMoneyReciptHeader({
        search: this.search,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      }).then(res => {
        //console.log(res);
        res.Data.forEach(e => {
          e.saleHeaders = null;
        });
        // this.currentPage = res.PageNumber;
        this.pageSize = res.RowspPage;
        this.dataLength = res.TotalRows;
        this.tableData = res.Data;
        this.isLoading = false;
      });
    },

    onNewCoupon(data) {
      this.tableData.unshift(data);
    },
    expandRow() {}
  },
  watch: {
    pageSize() {
      this.fetchData();
    }
  },
  created() {},
  mounted() {
    this.$store.state.app.sidebar.opened = false;

    //this.tableHeight=document.body.offsetHeight-document.getElementById('couponTabHeaderBtn').clientHeight-114
    window.addEventListener("resize", this.changeTableHeight);
    this.fetchData();
    this.changeTableHeight();
    //console.log(this.tableHeight);
  },
  destroyed() {
    document.removeEventListener("resize", this.changeTableHeight);
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}

.employee-mission-container {
  padding: 5px;
}

.pagination {
  margin-top: 10px;
}
.el-table__expanded-cell {
  padding: 0px;
}
.c-waring {
  color: #d63031;
  cursor: pointer;
}
</style>
