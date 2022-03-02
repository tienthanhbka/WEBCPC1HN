<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-input
          class="input-custom"
          size="small"
          v-model="search"
          placeholder="Tìm kiếm..."
        ></el-input>
      </div>
      <div class="inline-block" style="margin-right:5px">
        <el-button
          icon="el-icon-search"
          @click="fetchData"
          type="primary"
          size="small"
          >Tìm kiếm</el-button
        >
      </div>
      <div class="inline-block">
        <el-button
          icon="fas fa-plus"
          type="primary"
          size="small"
          @click="create"
        >
          Tạo mới</el-button
        >
      </div>
      <div style="float:right">
        <!-- <div class="inline-block">
          <el-date-picker
            v-model="dateStart"
            size="small"
            type="date"
            placeholder="Từ ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="dateEnd"
            size="small"
            type="date"
            placeholder="Đến ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div> -->
        <div class="inline-block" style="margin-right:5px">
          <el-button
            type="danger"
            size="small"
            icon="fas fa-file-import"
            @click="importExcel"
          >
            Nhập Excel</el-button
          >
        </div>
        <!-- <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
          >
            Xuất Excel</el-button
          >
        </div> -->
      </div>
      <div style="clear:both;"></div>
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
    <el-dialog :visible.sync="dialogFormCreate" custom-class="medium-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <import @createOK="createOK"></import>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormCreate1" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <create @createOK="createOK1"></create>
    </el-dialog>
  </div>
</template>

<script>
import { GetVaccineInfoLst } from "@/api/vaccine";
import Import from "./component/import";
import Create from "./component/modal-info";
export default {
  filters: {},
  components: { Import, Create },
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      dialogFormCreate1: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      // dateStart: getStartMonth(),
      // dateEnd: getEndMonth(),
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    create() {
      this.dialogFormCreate1 = true;
      this.titleDialog = "Thêm phiếu mới";
      this.modeView = 1; //tạo mới
      this.rowData = null;
    },
    edit(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật số đăng kí";
      this.modeView = 3; //cập nhật
      this.rowData = row;
    },
    view(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Chi tiết số đăng kí";
      this.modeView = 2; //Xem chi tiết
      this.rowData = row;
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    createOK1() {
      this.dialogFormCreate1 = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: this.search
      };
      GetVaccineInfoLst(req).then(res => {
        this.tableData = res.VaccineInfoLst;
        this.dataLength = res.TotalRows;
        this.loadingTableData = false;
      });
    },
    importExcel() {
      this.dialogFormCreate = true;
      this.titleDialog = "Thêm thông tin";
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
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
