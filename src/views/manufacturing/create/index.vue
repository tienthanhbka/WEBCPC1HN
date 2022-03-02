<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker v-model="DateStart1" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <span class="demonstration">Đến</span>
      <el-date-picker v-model="DateEnd1" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-button @click="create" type="success" icon="fas fa-plus"
        >&#32;Tạo lịch báo cáo</el-button
      >
    </div>
    <div class="inline-block">
      <el-input placeholder="Tìm kiếm.." v-model="search">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="fetchData"
        ></el-button>
      </el-input>
    </div>
    <div class="inline-block">
      <el-button
        type="primary"
        icon="el-icon-refresh"
        @click="fetchData2"
      ></el-button>
    </div>
    <el-table
      class="el-mobile-table"
      :data="ProductionOrderLst"
      v-loading="listLoading"
      style="width: 100%"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="edit(scope.row)" type="text"
                ><i class="far fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button @click="del(scope.row)" type="text" style="color:red"
                ><i class="far fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" min-width="70">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | missionStatusColor">
              {{ scope.row.Status | missionStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="155px" label="Lệnh SX">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lệnh SX">
            {{ scope.row.ProductionOrderIDBFO }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Sản phẩm" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Sản phẩm">{{ scope.row.Product }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Mã sản phẩm" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã sản phẩm">
            {{ scope.row.ProductID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lô sản xuất" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lô sản xuất">
            {{ scope.row.ProductionBatch }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số lượng" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số lượng">{{ scope.row.Quantity }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày bắt đầu" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày bắt đầu">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{
              Date.parse(scope.row.DateStart).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày kết thúc" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày kết thúc">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px;">{{
              Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
              
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog
      title="Tạo (Cập nhật) lịch báo cáo"
      :visible.sync="dialogFormUpdate"
    >
      <create
        @createOK="createOK"
        :productOrder="rowData"
        :bfo="orderBFO"
        @cancelCreOK="cancelCreOK"
        @updateOK="updateOK"
      ></create>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Xóa lệnh SX" :visible.sync="dialogFormDel">
      <delete-s-x
        :productOrder="rowData"
        @delOrderOK="delOrderOK"
        @deletecancelOK="delcancelOK"
      ></delete-s-x>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="formQR">
      <q-r :qr="rowData"></q-r>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import create from "@/views/manufacturing/create/component/create";
import QR from "@/views/manufacturing/create/component/QR";
import deleteSX from "@/views/manufacturing/create/component/deleteSX";
import {
  GetProductionOrder,
  GetProductionOrderBFO
} from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: { create, deleteSX, QR },
  data() {
    return {
      productionOrder: "",
      search: "",
      formQR: false,
      dialogFormUpdate: false,
      dialogFormDel: false,
      dialogFormCReateQuota: false,
      listLoading: false,
      rowData: "",
      listLoading: false,
      DateStart1: getStartDate(),
      DateEnd1: getEndDate(),
      ProductionOrderLst: [],
      No_: "",
      orderBFO: "",
      bfo: "",
      ProductionOrderBFOLst: []
    };
  },
  methods: {
    getQRCode(row) {
      this.rowData = row;
      this.formQR = true;
    },
    create() {
      this.rowData = null;
      this.dialogFormUpdate = true;
    },
    edit(row) {
      (this.rowData = row), (this.dialogFormUpdate = true);
    },
    del(row) {
      this.rowData = row;
      this.dialogFormDel = true;
    },
    createOK() {
      this.dialogFormUpdate = false;
      this.fetchData();
    },
    updateOK() {
      this.dialogFormUpdate = false;
      this.fetchData();
    },
    cancelCreOK() {
      this.dialogFormUpdate = false;
    },
    delOrderOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    CreateQuota(row) {
      this.rowData = row;
      this.dialogFormCReateQuota = true;
      this.$notify({
        title: "Sorry",
        message: "Tính năng này đang được phát triển",
        type: "info",
        position: "top-left"
      });
    },
    delcancelOK() {
      this.dialogFormDel = false;
    },
    fetchData2() {
      this.search = "";
      this.listLoading = true;
      var req = {
        token: Cookies.get("token"),
        DateStart: this.DateStart1,
        DateEnd: this.DateEnd1,
        Search: ""
      };
      GetProductionOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderLst = res.ProductionOrderLst;
          this.listLoading = false;
        }
      });
    },
    fetchData() {
      this.listLoading = true;
      var req = {
        token: Cookies.get("token"),
        DateStart: this.DateStart1,
        DateEnd: this.DateEnd1,
        Search: this.search
      };
      GetProductionOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderLst = res.ProductionOrderLst;
          this.ProductionOrderLst.sort((x, y) =>
            x.TimeCreate < y.TimeCreate
              ? 1
              : y.TimeCreate < x.TimeCreate
              ? -1
              : 0
          );
          //console.log(this.ProductionOrderLst);
          this.listLoading = false;
        }
      });
    }
  },
  created() {
    GetProductionOrderBFO({
      token: Cookies.get("token"),
      Search: ""
    }).then(res => {
      this.ProductionOrderBFOLst = res.ProductionOrderBFOLst;
    });
    this.fetchData();
  },
  watch: {
    DateStart1: function() {
      this.fetchData();
    },
    DateEnd1: function() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
  margin-bottom: 5px;
}
</style>
