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
      <div style="float:right">
        <div class="inline-block">
          <el-button
            @click="exportExcel"
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
          >
            Xuất Excel</el-button
          >
        </div>
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
      <el-table-column align="center" width="90">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px;" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            [{{ scope.row.EmployeeCode }}]-{{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px;" label="Loại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại">
            {{ scope.row.TypeNote | toType }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220px;" label="Lưu ý">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lưu ý">
            {{ scope.row.PointNote }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px;" label="Khoảng lưu ý">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khoảng lưu ý">
            {{ scope.row.PeriodNote }}
            <span v-if="scope.row.PeriodNote > 0"> tháng</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="Người tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Status"
        width="120px"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | employeeNoteStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | employeeNoteStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="Actions" align="center">
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
                  v-if="scope.row.CreaterID == userName"
                  type="warning"
                  icon="el-icon-edit"
                  @click="edit(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  v-if="scope.row.CreaterID == userName"
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
        :emLst="emList"
        @cancelOK="cancelOK"
      ></modal-info>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetEmployeeNote,
  GetEmployeeLst,
  DelEmployeeNote
} from "@/api/employeeNote";
import { getIdUser } from "@/utils/auth";
import ModalInfo from "./component/modal-info";
export default {
  filters: {
    toType(val) {
      if (val == 0) {
        return "Tiêu cực";
      } else if (val == 1) {
        return "Tích cực";
      }
    }
  },
  components: { ModalInfo },
  props: {},
  data() {
    return {
      tableData: [],
      emList: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      userName: getIdUser()
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
        Search: this.search
      };
      GetEmployeeNote(req).then(res => {
        this.tableData = res.EmployeeNoteLst;
        this.loadingTableData = false;
      });
    },
    del(row) {
      this.$confirm(
        "Xóa phiếu lưu ý " + row.EmployeeName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID
          };
          DelEmployeeNote(req).then(res => {
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
    fetchEmLst() {
      GetEmployeeLst().then(response => {
        this.emList = response.EmployeeLst;
      });
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Nhân viên",
        "SĐT",
        "Loại",
        "Lưu ý",
        "Khoảng lưu ý",
        "Ghi chú",
        "Người tạo",
        "Thời gian"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "EmployeeID",
        "TypeNote",
        "PointNote",
        "PeriodNote",
        "Description",
        "CreaterID",
        "TimeCreate"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách phiếu lưu ý nhân sự", //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "TypeNote") {
            return this.$options.filters.toType(v[j]);
          }
          if (j === "Status") {
            return this.$options.filters.employeeNoteStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {},
  created() {
    this.fetchData();
    this.fetchEmLst();
  },
  watch: {}
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
