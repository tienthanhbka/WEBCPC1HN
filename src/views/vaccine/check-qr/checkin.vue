<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-input
          class="input-custom"
          v-model="input"
          placeholder="Nhập thông tin..."
          @input="checkInput"
          @keyup.enter.native="scanOK(input)"
        ></el-input>
      </div>
      <div class="inline-block" style="margin-right:5px">
        <el-button icon="el-icon-search" @click="scanOK(input)" type="primary"
          >Xác nhận</el-button
        >
      </div>
      <div class="inline-block qrcode">
        <el-button type="danger" icon="fas fa-qrcode" @click="scanQR">
          Quét QR</el-button
        >
      </div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      size="small"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Thời gian">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian">
            {{ scope.row.Time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Line">
        <template slot-scope="scope">
          <div class="dat-cell" label="Line">
            {{ scope.row.Line }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.TypeGroup }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="MNV">
        <template slot-scope="scope">
          <div class="dat-cell" label="MNV">
            {{ scope.row.EmployeeCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Họ tên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Họ tên">
            {{ scope.row.FullName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Đơn vị công tác">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đơn vị công tác">
            {{ scope.row.Work }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="SĐT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SĐT">
            {{ scope.row.PhoneNumber }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:5px;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormScan" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <scan-q-r @answer="scanOK"></scan-q-r>
    </el-dialog>
  </div>
</template>

<script>
import { GetUserCheckSK, CheckSKUser } from "@/api/vaccine";
import scanQR from "./component/scanQR";
export default {
  filters: {},
  components: { scanQR },
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      dialogFormScan: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      input: "",
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      const req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: this.search
      };
      GetUserCheckSK(req).then(res => {
        this.tableData = res.VaccineInfoLst;
        this.dataLength = res.TotalRows;
        this.loadingTableData = false;
      });
    },

    scanQR() {
      this.dialogFormScan = true;
      this.titleDialog = "Quét QR";
    },
    scanOK(val) {
      //this.dialogFormScan = false;
      //console.log(val);
      CheckSKUser({ UID: val }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Check thành công",
            type: "success"
          });
        }
        this.fetchData();
        this.input = "";
      });
    },
    checkInput(val) {
      if (val.length > 8) {
        this.scanOK(val);
      }
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    pageSize() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  padding: 20px;
  .header-block {
    width: 100%;
    background-color: #fff;
    margin-left: 1px;
    border-right: 2px solid #ecf0f1;
    padding: 10px;
  }
  .inline-block {
    display: inline-block;
  }
}
</style>
<style>
@media screen and (max-width: 600px) {
  .qrcode {
    display: block !important;
    text-align: center;
    padding: 10px;
  }
}
</style>
