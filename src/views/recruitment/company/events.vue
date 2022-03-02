<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button
          icon="fas fa-plus"
          type="primary"
          size="small"
          @click="createEvent"
        >
          Tạo mới</el-button
        >
      </div>
      <div style="float:right;">
        <div class="inline-block">
          <el-input class="selectIDGroup" placeholder="Tìm kiếm..."></el-input>
        </div>
        <div class="inline-block">
          <el-button icon="el-icon-search" type="primary" size="small"
            >Tìm kiếm</el-button
          >
        </div>
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
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Tên sự kiện">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên sự kiện">
            {{ scope.row.EventName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Tổ chức">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tổ chức">
            {{ scope.row.Organizing }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Thời gian bắt đầu">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian bắt đầu">
            {{ scope.row.StartTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Thời gian kết thúc">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian kết thúc">
            {{ scope.row.EndTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Người tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Ngày tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ scope.row.TimeCreate }}
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
              :type="scope.row.Status | WPostStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | WPostStatusText }}</el-tag
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
                  @click="viewEvent(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  @click="editEvent(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="delEvent(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                :content="scope.row.Status === 3 ? 'Private' : 'Public'"
                placement="top"
                effect="light"
              >
                <el-button
                  :type="scope.row.Status === 3 ? 'info' : 'success'"
                  icon="fas fa-dot-circle"
                  @click="approve(scope.row)"
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
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create
        @addOK="addOK"
        :row="rowData"
        :mode="modeView"
        @cancelOK="cancelOK"
      ></create>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { GetEventByUser, DelEvent } from "@/api/work-dtp/event";
import Create from "./component/createEvent";
export default {
  filters: {},
  components: { Create },
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      LinkUrl: "",
      rowData: "",
      modeView: 0,
      UserName: Cookies.get("idEmployee"),
      TokenCode: Cookies.get("token"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    createEvent() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo mới sự kiện";
      this.modeView = 1;
      this.rowData = {};
    },
    editEvent(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật sự kiện";
      this.modeView = 3;
      this.rowData = row;
    },
    viewEvent(row) {
      this.dialogFormCreate = true;

      this.titleDialog = "Chi tiết sự kiện";
      this.modeView = 2;
      this.rowData = row;
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loadingTableData = true;
      GetEventByUser().then(res => {
        this.tableData = res.EventLst;
        this.loadingTableData = false;
      });
    },
    approve(row) {
      this.$confirm(
        row.Status === 3
          ? "Đóng sự kiện: " + row.Title + ". Continue?"
          : "Public sự kiện: " + row.Title + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: row.Status === 3 ? "info" : "success"
        }
      )
        .then(() => {
          const req = {
            DocumentID: row.DocumentID,
            Status: row.Status === 3 ? 4 : 3
          };
          DelEvent(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Public thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    delEvent(row) {
      this.$confirm("Xóa sự kiện. Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            DocumentID: row.DocumentID,
            Status: 0
          };
          DelEvent(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa sự kiện thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
  .inline-block {
    display: inline-block;
  }
}
</style>
