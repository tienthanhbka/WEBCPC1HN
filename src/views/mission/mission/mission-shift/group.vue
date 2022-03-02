<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-select
          size="small"
          required=""
          v-model="groupID"
          placeholder="Chọn nhóm"
        >
          <el-option
            v-for="item in groupLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </div>
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
        <div class="inline-block">
          <el-tooltip content="Xuất Excel" placement="top" effect="light">
            <el-button
              @click="exportExcel"
              type="success"
              :loading="downloading"
              size="small"
              icon="fas fa-file-excel"
            >
            </el-button
          ></el-tooltip>
        </div>
        <div class="inline-block">
          <el-tooltip content="Import" placement="top" effect="light">
            <el-button
              icon="fas fa-file-import"
              type="danger"
              size="small"
              @click="create"
            >
            </el-button
          ></el-tooltip>
        </div>
        <div class="inline-block">
          <el-tooltip content="Tải mẫu" placement="top" effect="light">
            <el-button
              icon="fas fa-download"
              type="warning"
              size="small"
              @click="download"
            >
            </el-button
          ></el-tooltip>
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
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="95">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Xác nhận" placement="top" effect="light">
              <el-button
                type="text"
                icon="fas fa-check-double"
                @click="accept(scope.row)"
                size="small"
              ></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="130px;" label="Nhân viên">
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
      <el-table-column width="70px;" label="Ca">
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

      <el-table-column width="120px" label="Người duyệt">
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
      <modal-info-header
        @acceptOK="acceptOK"
        :row="rowData"
        :mode="modeView"
        :groupLst="groupLst"
        @cancelOK="cancelOK"
      ></modal-info-header>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormImport" custom-class="medium-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      />
      <el-table
        v-if="shiftLst.length > 0"
        :data="shiftLst"
        size="small"
        style="width:100%;margin-top:10px"
        border=""
        fit
        show-header
        class="el-mobile-table"
      >
        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="130px;" label="Nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              {{ scope.row.EmployeeID }}
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
        <el-table-column width="60px;" label="Ca" align="center">
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
      </el-table>
      <div style="text-align:center;padding:10px" v-if="shiftLst.length > 0">
        <el-button type="primary" @click="importData" size="small"
          >Xác nhận</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetShiftByAdmin,
  CreateShiftByAdmin,
  GetShiftLine
} from "@/api/missionVacation";
import { GetGroupEmployee } from "@/api/groups";
import { getStartDate, getEndDate } from "@/api/index";
import ModalInfoHeader from "./component/modal-info-header";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

export default {
  components: { ModalInfoHeader, UploadExcelComponent },
  props: {},
  data() {
    return {
      tableData: [],
      groupLst: [],
      loadingTableData: false,
      dialogFormCreate: false,
      dialogFormImport: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      groupID: "",
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      dateStart: getStartDate(),
      dateEnd: getEndDate(),
      shiftLst: [],
      results: [],
      loading: false,
      lineLoading: false
    };
  },
  methods: {
    accept(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Xác nhận phiếu";
      this.modeView = 4; //Xem chi tiết
      this.rowData = row;
    },

    acceptOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd,
        Search: this.search,
        GroupID: this.groupID
      };
      GetShiftByAdmin(req).then(res => {
        this.tableData = res.ShiftLst;
        this.loadingTableData = false;
      });
    },

    fetchGroup() {
      GetGroupEmployee().then(res => {
        this.groupLst = res.Data;
        this.groupID = this.groupLst[0].idGroup;
      });
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Nhân viên",
        "Nhóm",
        "Thời gian bắt đầu",
        "Thời gian kết thúc",
        "Số giờ",
        "Ca đăng kí",
        "Ghi chú",
        "Người tạo",
        "Thời gian",
        "Người duyệt",
        "Thời gian",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeID",
        "EmployeeName",
        "GroupID",
        "TimeStart",
        "TimeEnd",
        "Hour",
        "Shift",
        "Note",
        "CreaterID",
        "TimeCreate",
        "ApproveID",
        "TimeApprove",
        "Status"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách đăng kí ca từ " +
              Date.parse(this.dateStart).toString("dd/MM/yyyy") +
              " đến " +
              Date.parse(this.dateEnd).toString("dd/MM/yyyy"), //Optional
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
            return this.$options.filters.shiftStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    create() {
      this.dialogFormImport = true;
      this.titleDialog = "Nhập danh sách";
    },
    beforeUpload(file) {
      this.loading = true;
      this.shiftLst = [];
      this.results = [];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 2m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.loading = false;
      let arr = [];
      results.forEach(item => {
        let obj = {
          EmployeeID: item.MaNhanVien,
          GroupID: item.Nhom,
          TimeStart: item.ThoiGianBatDau,
          TimeEnd: item.ThoiGianKetThuc,
          Hour: item.SoGio,
          Shift: item.Ca,
          Note: item.GhiChu
        };
        arr.push(obj);
      });
      this.shiftLst = arr;
    },
    importData() {
      this.$confirm(
        "Xác nhận " + this.shiftLst.length + " phiếu đăng kí ca. Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      )
        .then(() => {
          CreateShiftByAdmin({ ShiftLst: this.shiftLst }).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Cập nhật phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.dialogFormImport = false;
              this.fetchData();
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
    download() {
      window.open(
        "https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/DangKiCa.xlsx?alt=media&token=a22826b5-20da-4508-83c6-30a7fdeab85a"
      );
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
    },
    groupID() {
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
