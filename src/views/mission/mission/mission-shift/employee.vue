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
          @click="createHeader"
        >
          Tạo mới</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-date-picker
            v-model="dateStart"
            size="small"
            type="date"
            placeholder="Từ ngày"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="dateEnd"
            size="small"
            type="date"
            placeholder="Đến ngày"
          >
          </el-date-picker>
        </div>
        <!-- <div class="inline-block">
          <el-button
            @click="exportExcel"
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
      @expand-change="expandRow"
    >
      <el-table-column type="expand" width="70">
        <template slot-scope="scope">
          <el-row>
            <el-table
              :data="scope.row.lines"
              v-loading="lineLoading"
              border
              show-summary
              style="width: 100%"
            >
              <el-table-column align="center" label="STT" width="95">
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                  <el-tooltip content="Chỉnh sửa" placement="top">
                    <el-button
                      @click="editLine(scope.row, props.row)"
                      type="text"
                    >
                      <i class="fas fa-edit"></i> </el-button
                  ></el-tooltip>
                  <el-tooltip content="Xóa" placement="top">
                    <el-button
                      @click="delLine(scope.row, props.row)"
                      type="text"
                    >
                      <i
                        style="color: red"
                        class="fas fa-trash-alt"
                      ></i> </el-button
                  ></el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="Công việc" min-width="280">
                <template slot-scope="props">
                  {{ props.row.Work }}
                </template>
              </el-table-column>
              <el-table-column label="Mô tả" min-width="180">
                <template slot-scope="props">
                  {{ props.row.Description }}
                </template>
              </el-table-column>
              <el-table-column label="Thời gian" width="120" align="center">
                <template slot-scope="props">
                  {{ Date.parse(props.row.TimeStart).toString("HH:mm") }} -
                  {{ Date.parse(props.row.TimeEnd).toString("HH:mm") }}
                </template>
              </el-table-column>

              <el-table-column
                label="Số giờ"
                width="120"
                align="center"
                prop="Hour"
              >
                <template slot-scope="props">
                  {{ props.row.Hour }}
                </template>
              </el-table-column>
            </el-table>
            <el-tooltip content="Báo cáo" placement="top"
              ><el-button @click="createLine(scope.row)" type="text">
                <i style="color: red" class="fas fa-plus"></i></el-button
            ></el-tooltip>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="70">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px;" label="Nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.GroupID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px;" label="TG đăng kí">
        <template slot-scope="scope">
          <div class="dat-cell" label="TG đăng kí">
            {{ Date.parse(scope.row.TimeStart).toString("HH:mm") }} -
            {{ Date.parse(scope.row.TimeEnd).toString("HH:mm") }}
            {{ Date.parse(scope.row.TimeEnd).toString(" dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80px;" label="Số giờ" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số giờ">
            {{ scope.row.Hour }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80px;" label="Ca">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ca">
            {{ scope.row.Shift }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px;" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="90px;" label="Ngày tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="110px" label="Người duyệt">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người duyệt">
            {{ scope.row.ApproveID }}
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
              :type="scope.row.Status | shiftStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | shiftStatusText }}</el-tag
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
                  @click="viewHeader(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  @click="editHeader(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="delHeader(scope.row)"
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
    <el-dialog :visible.sync="dialogFormHeader" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <modal-info-header
        @createOK="createHeaderOK"
        :row="rowHeader"
        :mode="modeViewHeader"
        :groupLst="groupLst"
      ></modal-info-header>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormLine" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <modal-info-line
        @createOK="createLineOK"
        :row="rowLine"
        :header="rowHeader"
        :mode="modeViewLine"
      ></modal-info-line>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetShift,
  DelShift,
  GetShiftLine,
  DelShiftLine
} from "@/api/missionVacation";
import { GetGroupEmployee } from "@/api/groups";
import { getStartDate, getEndDate } from "@/api/index";
import ModalInfoHeader from "./component/modal-info-header";
import ModalInfoLine from "./component/modal-info-line";

export default {
  components: { ModalInfoHeader, ModalInfoLine },
  props: {},
  data() {
    return {
      tableData: [],
      groupLst: [],
      loadingTableData: false,
      dialogFormHeader: false,
      dialogFormLine: false,
      downloading: false,
      lineLoading: false,
      titleDialog: "",
      rowHeader: "",
      rowLine: "",
      search: "",
      modeViewHeader: 0,
      modeViewLine: 0,

      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      dateStart: getStartDate(),
      dateEnd: getEndDate()
    };
  },
  methods: {
    createHeader() {
      this.dialogFormHeader = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeViewHeader = 1; //tạo mới
      this.rowHeader = null;
    },
    editHeader(row) {
      this.dialogFormHeader = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeViewHeader = 2; //cập nhật
      this.rowHeader = row;
    },
    viewHeader(row) {
      this.dialogFormHeader = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeViewHeader = 3; //Xem chi tiết
      this.rowHeader = row;
    },
    createHeaderOK() {
      this.dialogFormHeader = false;
      this.fetchData();
    },
    createLine(header) {
      this.dialogFormLine = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeViewLine = 1; //tạo mới
      this.rowLine = null;
      this.rowHeader = header;
    },
    editLine(header, row) {
      this.dialogFormLine = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeViewLine = 2; //cập nhật
      this.rowLine = row;
      this.rowHeader = header;
    },
    viewLine(header, row) {
      this.dialogFormLine = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeViewLine = 3; //Xem chi tiết
      this.rowLine = row;
      this.rowHeader = header;
    },
    createLineOK() {
      this.dialogFormLine = false;
      this.expandRow(this.rowHeader);
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd,
        Search: this.search
      };
      GetShift(req).then(res => {
        this.tableData = res.ShiftLst;
        this.loadingTableData = false;
      });
    },
    delHeader(row) {
      this.$confirm(
        "Xóa phiếu đăng kí ca " + row.TimeStart + ". Continue?",
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
          DelShift(req).then(res => {
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
    delLine(header, row) {
      this.$confirm(
        "Xóa phiếu báo cáo " + row.Work + ". Continue?",
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
          DelShiftLine(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.expandRow(header);
            }
          });
        })
        .catch(() => {});
    },
    expandRow(row, expandedRows) {
      this.lineLoading = true;
      GetShiftLine({ HeaderID: row.RowID }).then(res => {
        if (res.RespCode == 0) {
          row.lines = res.ShiftLineLst;
          this.lineLoading = false;
        }
      });
    },
    fetchGroup() {
      GetGroupEmployee().then(res => {
        this.groupLst = res.Data;
      });
    }
  },
  computed: {},
  created() {
    this.fetchData();
    this.fetchGroup();
  },
  watch: {
    dateStart() {
      this.fetchData();
    },
    dateEnd() {
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
