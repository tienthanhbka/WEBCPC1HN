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
        <el-popover
          placement="bottom"
          title="Bộ lọc"
          width="280"
          trigger="click"
        >
          <el-select
            v-model="status"
            size="small"
            filterable
            clearable
            placeholder="Trạng thái..."
            style="width:100%"
          >
            <el-option
              v-for="(item, index) in statusLst"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <div class="form-footer" style="text-align:center;padding:5px">
            <el-tooltip content="Tìm kiếm" effect="light">
              <el-button
                size="small"
                @click="fetchData"
                icon="el-icon-search"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Làm mới" effect="light">
              <el-button
                size="small"
                @click="refreshData"
                icon="el-icon-refresh"
              ></el-button>
            </el-tooltip>
          </div>
          <el-button
            slot="reference"
            type="primary"
            icon="fas fa-filter"
            size="small"
          >
          </el-button>
        </el-popover>
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            @click="ExportExcel"
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
            <el-tooltip content="Xác nhận" effect="light">
              <el-button
                size="mini"
                @click="accept(scope.row)"
                type="text"
                style="font-size: 20px;"
                ><i class="el-icon-s-claim"></i></el-button
            ></el-tooltip>
            <el-tooltip
              content="Tiền về"
              effect="light"
              v-if="scope.row.Status == 5"
            >
              <el-button
                size="mini"
                @click="approve(scope.row)"
                type="text"
                style="font-size: 20px;color:#02bc77"
                ><i class="el-icon-s-check"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.GroupID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="160px;" label="Khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khách hàng">
            {{ scope.row.PlaceID }} - {{ scope.row.PlaceName }}
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
      <el-table-column min-width="230px;" label="Lý do">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lý do">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Thời gian tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:mm dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="90px" label="Xác nhận">
        <template slot-scope="scope">
          <div class="dat-cell" label="Xác nhận">
            {{ scope.row.AcceptID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px;" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.NoteCN }}
          </div>
        </template>
      </el-table-column>
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
      <!-- <el-table-column width="200px" label="Actions" align="center">
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
      </el-table-column> -->
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
      ></modal-info>
    </el-dialog>
  </div>
</template>

<script>
import { GetDebtExtensionByAdmin, ApproveDebtExtension } from "@/api/debt";
import ModalInfo from "./component/modal-info";
export default {
  filters: {},
  components: { ModalInfo },
  props: {},
  data() {
    return {
      tableData: [],
      groupList: [],
      placeList: [],
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
      status: "",
      statusLst: [
        {
          label: "Không được duyệt",
          value: "-1"
        },
        {
          label: "Mới tạo",
          value: 1
        },
        {
          label: "Quản lý duyệt",
          value: 3
        },
        {
          label: "Đã duyệt",
          value: 5
        },
        {
          label: "Hoàn thành",
          value: 10
        }
      ]
    };
  },
  methods: {
    accept(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Xác nhận phiếu";
      this.modeView = 4; //tạo mới
      this.rowData = row;
    },
    approve(row) {
      this.$confirm(
        "Xác nhận tiền về KH " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "info"
        }
      )
        .then(() => {
          ApproveDebtExtension({ DocumentID: row.DocumentID }).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xác nhận thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: this.search,
        Status: this.status
      };
      GetDebtExtensionByAdmin(req).then(res => {
        this.tableData = res.DebtExtensionLst;
        this.dataLength = res.TotalRows;
        this.loadingTableData = false;
      });
    },
    refreshData() {
      this.status = "";
      this.search = "";
      this.fetchData();
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Nhân viên",
        "Khách hàng",
        "Mã khách hàng",
        "Số lượng đặt hàng",
        "Lý do",
        "Thời gian tạo",
        "Quản lý duyệt",
        "Thời gian",
        "Công nợ duyệt",
        "Thời gian",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeID",
        "EmployeeName",
        "PlaceName",
        "PlaceID",
        "QuantityOrder",
        "Note",
        "TimeCreate",
        "ManagerID",
        "TimeManager",
        "AcceptID",
        "TimeAccept",
        "Status"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách phiếu gia hạn công nợ", //Optional
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
          if (j === "Status") {
            return this.$options.filters.DebtExtentionStatusText(v[j]);
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
