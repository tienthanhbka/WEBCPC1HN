<template>
  <div>
    <el-table
      v-loading="isLoading"
      size="small"
      :data="tableData"
      :header-row-style="{ color: '#c23616' }"
      fit
      style="width: 100%"
      border
    >
      <el-table-column align="center" width="45" label="STT">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column
        prop="No_"
        align="center"
        width="70"
        label="Mã SP"
      ></el-table-column>
      <el-table-column
        prop="Description"
        align="center"
        width="180"
        label="Tên SP"
      ></el-table-column>
      <el-table-column prop="Quantity" align="center" label="SL" width="50">
        <template slot-scope="{ row }">{{ Number(row["Quantity"]) }}</template>
      </el-table-column>
      <el-table-column
        prop="Unit Price"
        align="center"
        label="ĐG (NoVAT)"
        width="100"
      >
        <template slot-scope="{ row }">{{
          row["Unit Price"] | toVND
        }}</template>
      </el-table-column>
      <el-table-column
        prop="Amount Including VAT"
        align="center"
        label="CP"
        width="120"
      >
        <template slot-scope="{ row }">
          <span v-if="row.typeCP == 2">{{ row["%amount"] | toPercent }}</span>
          <span v-else
            >{{ row["%amount"] | toVND }} / {{ row["Unit of Measure"] }}</span
          >
        </template>
      </el-table-column>
      <!-- <el-table-column prop="Amount Including VAT" align="center" label="Tổng chi phí" width="120">
        <template slot-scope="{row}">{{tongChiPhi(row)|toVND}}</template>
      </el-table-column> -->
      <el-table-column
        prop="Amount Including VAT"
        align="center"
        label="Giữ lại/Chi phí"
        width="200"
      >
        <template slot-scope="{ row }"
          >{{ duocGiuLaiChiPhi(row) | toVND }} /
          {{ tongChiPhi(row) | toVND }}</template
        >
      </el-table-column>
      <el-table-column
        prop="Amount Including VAT"
        align="center"
        label="Tiền hàng (VAT)"
        width="150"
      >
        <template slot-scope="{ row }">{{
          row["Amount Including VAT"] | toVND
        }}</template>
      </el-table-column>
      <el-table-column
        prop="Amount Including VAT"
        align="center"
        label="Giữ lại CP?"
        width="106"
      >
        <template slot-scope="{ row }">
          <el-popover placement="top" width="380" trigger="hover">
            <div>
              <div>Nếu chọn có: bạn sẽ được trừ chi phí</div>
              <div>Nếu không: bạn sẽ nộp toàn bộ giá trị dòng hàng</div>
            </div>
            <div slot="reference">
              <el-switch
                v-model="row.type"
                :active-value="1"
                inactive-color="#2d3436"
                active-color="#13ce66"
                :inactive-value="0"
                v-if="row.edit"
              >
              </el-switch>
              <span v-if="row.type == 0">Không</span>
              <span style="color:#13ce66" v-else>Có</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="Amount Including VAT"
        align="center"
        label="Tiền phải nộp"
        width="150"
      >
        <template slot-scope="{ row }"
          >{{ tienPhaiNop(row) | toVND }}
          <el-tooltip
            v-if="row.edit"
            content="Áp sang số tiền trả"
            placement="bottom"
            effect="light"
          >
            <i
              class="fas fa-arrow-circle-right apply-right"
              @click="row.amount = tienPhaiNop(row)"
            ></i> </el-tooltip
        ></template>
      </el-table-column>
      <el-table-column align="center" width="200" label="Áp số tiền trả">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <!-- <div  class="el-input el-input--small edit-input">
            <cleave
              v-model="row.amount"
              :options="{numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    }"
              class="el-input__inner"
            ></cleave>
          </div> -->
            <el-input
              v-model="row.amount"
              type="Number"
              :readonly="reciptCoupon.ktRole != '1'"
              class="edit-input"
              size="small"
            />
            <el-button
              class="cancel-btn"
              size="small"
              type="danger"
              @click="deleteVal(row)"
              ><i class="fas fa-times"></i
            ></el-button>
          </template>
          <span v-else>{{ row.amount | toVND }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="reciptCoupon.status == 1 || reciptCoupon.status == 4"
        align="center"
        label="Actions"
        width="140"
      >
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button
              v-if="row.edit"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            ></el-button>
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check"
              @click="confirmEdit(row)"
              >Ok</el-button
            >
            <el-button
              v-if="!row.edit"
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editLine(row)"
              >Sửa</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  GetSaleLineOfSaleHeaderMoneyRecipt,
  GetSaleLineOfSaleHeaderMoneyReciptF,
  AddOrUpdateMoneyReciptLine
} from "@/api/debt";
export default {
  props: {
    saleHeader: Object,
    reciptCoupon: Object
  },
  data() {
    return {
      tableData: [],
      isLoading: false
    };
  },
  methods: {
    tienPhaiNop(row) {
      if (row.typeCP == 2) {
        return row.type == 0
          ? Number(row["Amount Including VAT"])
          : Number(row["Amount Including VAT"]) -
              (Number(row["Amount"]) * Number(row["%amount"])) / 100.0;
      } else {
        return row.type == 0
          ? Number(row["Amount Including VAT"])
          : Number(row["Amount Including VAT"]) -
              Number(row["Quantity"]) * Number(row["%amount"]);
      }
    },
    tongChiPhi(row) {
      if (row.typeCP == 2) {
        return (Number(row["%amount"]) * Number(row["Amount"])) / 100.0;
      } else {
        return Number(row["%amount"]) * Number(row["Quantity"]);
      }
    },
    duocGiuLaiChiPhi(row) {
      if (row.type == 0) return 0;

      return (this.tongChiPhi(row) * row["amount"]) / this.tienPhaiNop(row);
    },
    editLine(row) {
      row.edit = !row.edit;
      // if(row.edit){
      //   row.amount = Number(row['Amount Including VAT'])*(1-Number(row['%amount'])/100)
      // }
    },
    cancelEdit(row) {
      row["%amount"] = row["o%amount"];
      row.amount = row.oAmount;
      row.type = row.oType;
      row.edit = false;
    },
    deleteVal(row) {
      row.amount = null;
    },
    confirmEdit(row) {
      if (Number(row["%amount"]) > Number(row["Unit Price"])) {
        this.$message({
          message: "Chiết khấu theo đơn vị tính phải nhỏ hơn đơn giá",
          type: "error"
        });
        return;
      } else if (
        Number(row.amount) >
        (row.type == 0
          ? Number(row["Amount Including VAT"])
          : Number(row["Amount Including VAT"]) -
            Number(row["Quantity"]) * Number(row["%amount"]))
      ) {
        this.$message({
          message: "Số tiền áp không được lớn hơn số tiền phải nộp",
          type: "error"
        });
      } else if (
        Number(row.amount) - Number(row.oAmount) >
        Number(this.reciptCoupon["amount"]) -
          Number(this.reciptCoupon["sumApply"])
      ) {
        this.$message({
          message: "Số tiền vượt quá phiếu nộp tiền",
          type: "error"
        });
      } else if (
        Number(row.amount) != this.tienPhaiNop(row) &&
        row.amount != null &&
        this.reciptCoupon.ktRole != "1"
      ) {
        this.$message({
          message: "Nhập đủ hoặc không nhập dòng hàng",
          type: "error"
        });
      } else {
        row.edit = false;

        AddOrUpdateMoneyReciptLine({
          rowID: row.rowID,
          slNo: row["slNo"],
          amount: Number(row["amount"]),
          amountP: Number(row["%amount"]),
          headerID: this.saleHeader.rowID,
          type: row.type
        }).then(res => {
          //console.log(res);
          this.reciptCoupon["sumApply"] =
            Number(this.reciptCoupon["sumApply"]) -
            Number(row.oAmount) +
            Number(row.amount);
          this.saleHeader["SumApply"] =
            Number(this.saleHeader["SumApply"]) -
            Number(row.oAmount) +
            Number(row.amount);
          row.oAmount = row.amount;
          row["o%amount"] = Number(row["%amount"]);
          this.tableData.forEach(e => {
            if (e.slNo == res.Data.slNo && e.rowID == null) {
              e.rowID = res.Data.rowID;
            }
          });
          this.$message({
            message: "Đã sửa",
            type: "success"
          });
        });
      }
    }
  },
  mounted() {
    //if (this.saleHeader.saleLines == null) {
    this.isLoading = true;
    //Đơn hàng bên FAST thì dùng API của a Thặng
    if (this.reciptCoupon.fast_sales == 1) {
      let arrTB = [];
      GetSaleLineOfSaleHeaderMoneyReciptF({
        RowID: this.saleHeader.headerID,
        HeaderID: this.saleHeader["rowID"]
      }).then(res => {
        this.isLoading = false;
        res.SalesLineLst.forEach(function(e) {
          let obj = {
            edit: false,
            Description: e.ProductName,
            "Amount Including VAT": e.AmountIncludingVat,
            No_: e.ProductID,
            "Unit of Measure": e.UnitOfMeasure,
            "Unit Price": e.UnitPrice,
            Quantity: e.Quantity,
            headerID: e.HeaderID,
            rowID: e.RowID,
            slNo: e.LineID,
            typeCP: e.TypeCP,
            amount: Number(e.AmountDoc),
            type: Number(e.Type),
            oAmount: e.AmountDoc,
            "%amount": Number(e.AmountRatio),
            "o%amount": Number(e.AmountRatio),
            oType: e.Type
          };
          arrTB.push(obj);
          // e.edit = false;
          // e.amount = Number(e.amount);
          // e.type = Number(e.type);
          // e.oAmount = e.amount;
          // e["%amount"] = Number(e["%amount"]);
          // e["o%amount"] = Number(e["%amount"]);
          // e.oType = e.type;
        });
        this.saleHeader.saleLines = arrTB;
        this.tableData = arrTB;
      });
    } else {
      GetSaleLineOfSaleHeaderMoneyRecipt({
        no: this.saleHeader["No_"],
        headerID: this.saleHeader["rowID"]
      }).then(res => {
        this.isLoading = false;
        res.Data.forEach(e => {
          e.edit = false;
          e.amount = Number(e.amount);
          e.type = Number(e.type);
          e.oAmount = e.amount;
          e["%amount"] = Number(e["%amount"]);
          e["o%amount"] = Number(e["%amount"]);
          e.oType = e.type;
        });
        this.saleHeader.saleLines = res.Data;
        this.tableData = res.Data;
      });
    }

    //}
  }
};
</script>
<style scoped>
.edit-input {
  padding-right: 55px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.apply-right {
  color: blueviolet;
  cursor: pointer;
}
</style>
