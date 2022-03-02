<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-input
          size="small"
          class="input-custom"
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
      <!-- <div style="float:right">
        <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
          >
            Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear:both;"></div> -->
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
      <el-table-column align="center" width="90">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.GroupID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="160px;" label="Khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khách hàng">
            {{ scope.row.PlaceName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="110px;" label="SL đặt hàng" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="SL đặt hàng">
            {{ scope.row.QuantityOrder }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200px;" label="Lý do">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lý do">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="140px" label="Quản lý">
        <template slot-scope="scope">
          <div class="dat-cell" label="Quản lý">
            {{ scope.row.ManagerID }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="140px" label="Xác nhận">
        <template slot-scope="scope">
          <div class="dat-cell" label="Xác nhận">
            {{ scope.row.AcceptID }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="200px;" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.NoteCN }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="Status"
        width="160px"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | DebtExtentionStatusColor"
              style="width:140px"
              effect="plain"
              >{{ scope.row.Status | DebtExtentionStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Actions" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <el-button-group>
              <el-tooltip content="Chi tiết" placement="top" effect="light">
                <el-button
                  type="primary"
                  @click="view(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  @click="edit(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
            </el-button-group>
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
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <modal-info
        @createOK="createOK"
        :row="rowData"
        :mode="modeView"
        :groups="groupList"
        :places="placeList"
        :emails="emailLst"
        @cancelOK="cancelOK"
      ></modal-info>
    </el-dialog>
  </div>
</template>

<script>
import { GetDebtExtensionByEm, DelDebtExtension } from "@/api/debt";
import { GetGroupEmployee } from "@/api/groups";
import { GetPlaceByUId } from "@/api/KDPlace";
import { GetEmailLst } from "@/api/mission";
import ModalInfo from "./component/modal-info";
import Cookies from "js-cookie";
export default {
  filters: {},
  components: { ModalInfo },
  props: {},
  data() {
    return {
      tableData: [],
      groupList: [],
      placeList: [],
      emailLst: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    create() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeView = 1; //tạo mới
      this.rowData = null;
    },
    edit(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeView = 2; //cập nhật
      this.rowData = row;
    },
    view(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeView = 3; //Xem chi tiết
      this.rowData = row;
    },
    createOK() {
      this.dialogFormCreate = false;
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
      GetDebtExtensionByEm(req).then(res => {
        this.tableData = res.DebtExtensionLst;
        this.dataLength = res.TotalRows;
        this.loadingTableData = false;
      });
    },
    del(row) {
      this.$confirm("Xóa phiếu " + row.PlaceName + ". Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            DocumentID: row.DocumentID
          };
          DelDebtExtension(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
      });
    },
    fetchKH() {
      GetPlaceByUId().then(res => {
        if (res.RespCode == 0) {
          this.placeList = res.PlaceLst;
        }
      });
    }
  },
  computed: {},
  created() {
    this.fetchData();
    this.fetchGroup();
    this.fetchKH();
    GetEmailLst().then(res => {
      this.emailLst = res.Data;
    });
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
