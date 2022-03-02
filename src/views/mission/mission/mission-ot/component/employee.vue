<template>
  <div class="block" style="padding:20px">
    <div class="block-top">
      <el-select
        v-if="modeAdmin"
        size="small"
        style="float:left"
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
      <el-button
        v-if="!modeAdmin"
        class="t-button"
        style="float:left"
        type="primary"
        @click="CreateOT"
        size="small"
        ><i class="fas fa-plus-circle"></i> Tạo mới</el-button
      >
      <el-button
        class="t-button"
        style="float:right"
        type="success"
        @click="ExportExcel"
        :loading="downloading"
        size="small"
        ><i class="fas fa-file-excel"></i> xuất Excel</el-button
      >
      <div style="float:right">
        <el-date-picker
          v-model="DateBegin"
          size="small"
          type="date"
          placeholder="Từ ngày"
        >
        </el-date-picker>
        <el-date-picker
          v-model="DateEnd"
          size="small"
          type="date"
          placeholder="Đến ngày"
        >
        </el-date-picker>
      </div>
      <div style="clear: both;"></div>
    </div>

    <el-table
      class="el-mobile-table"
      :data="tableData"
      size="small"
      v-loading="loadingTableData"
      border=""
      show-header
    >
      <el-table-column width="160px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chi tiết" placement="top"
              ><el-button @click="viewOT(scope.row)" type="text">
                <i style="font-size:12pt;" class="fas fa-eye"></i></el-button
            ></el-tooltip>

            <el-tooltip content="Phê duyệt" placement="top" v-if="modeAdmin"
              ><el-button @click="approveOT(scope.row)" type="text">
                <i
                  style="font-size:12pt;color:#388e3c"
                  class="fas fa-check-double"
                ></i></el-button
            ></el-tooltip>
            <el-tooltip content="Sửa" placement="top" v-if="!modeAdmin"
              ><el-button @click="updateOT(scope.row)" type="text">
                <i
                  style="font-size:12pt;color:#E6A23C;"
                  class="fas fa-file-signature"
                ></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top" v-if="!modeAdmin"
              ><el-button @click="deleteOT(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nhân viên" width="220">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            [{{ scope.row.EmployeeCode }}] {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nhóm" width="210">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.GroupID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lý do">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lý do">
            {{ scope.row.Reason }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tạo lúc" width="150" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tạo lúc">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:mm dd/MM/yyyy") }}
          </div></template
        >
      </el-table-column>

      <el-table-column label="Trạng thái" width="150" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | OTStatusColor">{{
              scope.row.Status | OTStatusText
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogFormCreate"
      custom-class="default-modal"
      :close-on-click-modal="false"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i> {{ titleDialog }}
      </h3>
      <create
        :row="rowData"
        @addOK="addOK"
        @closeDialog="closeDialog"
        :mode="modeDialog"
      ></create>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormDetail"
      custom-class="default-modal"
      :close-on-click-modal="false"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-file-signature"></i> {{ titleDialog }}
      </h3>
      <detail
        :row="rowData"
        @approveOK="approveOK"
        @closeDialogDetail="closeDialogDetail"
        :mode="modeDialog"
      ></detail>
    </el-dialog>
    <el-pagination
      class="pagination"
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import Create from "./component/create";
import Detail from "./component/detail";
import {
  GetDocOverTimeByID,
  GetDocOverTimeByGroupID,
  GetDocOverTimeByEm,
  DelDocOverTime
} from "@/api/mission";
import { getStartDate, getEndDate } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";
export default {
  components: {
    Create,
    Detail
  },
  filters: {
    OTStatusText(val) {
      if (val == 0) {
        return "Đã hủy";
      }
      if (val == 1) {
        return "Mới tạo";
      }
      if (val == 2) {
        return "Không duyệt";
      }
      if (val == 3) {
        return "Đã duyệt";
      }
    },
    OTStatusColor(val) {
      if (val == 0) {
        return "danger";
      }
      if (val == 1) {
        return "primary";
      }
      if (val == 2) {
        return "info";
      }
      if (val == 3) {
        return "success";
      }
    }
  },
  data() {
    return {
      tableData: [],
      groupLst: [],
      DateBegin: getStartDate(),
      DateEnd: getEndDate(),
      titleDialog: "",
      rowData: "",
      groupID: "",
      modeDialog: 0,
      loadingTableData: false,
      dialogFormCreate: false,
      dialogFormDetail: false,
      downloading: false,
      modeAdmin: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    CreateOT() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo phiếu tăng ca";
      this.rowData = "";
      this.modeDialog = 0;
    },
    updateOT(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Chỉnh sửa phiếu tăng ca";
      this.fetchDataByID(row.DocumentID);
      this.modeDialog = 2;
    },
    viewOT(row) {
      this.dialogFormDetail = true;
      this.titleDialog = "Chi tiết phiếu tăng ca";
      this.fetchDataByID(row.DocumentID);
      this.modeDialog = 1;
    },
    approveOT(row) {
      this.dialogFormDetail = true;
      this.titleDialog = "Duyệt phiếu tăng ca";
      this.fetchDataByID(row.DocumentID);
      this.modeDialog = 3;
    },
    deleteOT(row) {
      this.$confirm(" Hủy phiếu tăng ca. Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            DocumentID: row.DocumentID
          };
          DelDocOverTime(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Hủy phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        TimeStart: this.DateBegin,
        TimeEnd: this.DateEnd
      };
      GetDocOverTimeByEm(req).then(res => {
        this.tableData = res.OverTimeHeaderLst;
        this.loadingTableData = false;
      });
    },
    fetchGroup() {
      GetGroupEmployee().then(res => {
        this.groupLst = res.Data;
        this.groupID = this.groupLst[0].idGroup;
      });
    },
    fetchDataGroup() {
      this.tableData = [];
      this.loadingTableData = true;
      const req = {
        TimeStart: this.DateBegin,
        TimeEnd: this.DateEnd,
        GroupID: this.groupID
      };
      GetDocOverTimeByGroupID(req).then(res => {
        this.tableData = res.OverTimeHeaderLst;
        this.loadingTableData = false;
      });
    },
    fetchDataByID(id) {
      GetDocOverTimeByID({ DocumentID: id }).then(res => {
        if (res.RespCode === 0) {
          this.rowData = res.OverTimeHeaderInfo;
        }
      });
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    closeDialog() {
      this.dialogFormCreate = false;
    },
    approveOK() {
      this.dialogFormDetail = false;
      this.fetchDataGroup();
    },
    closeDialogDetail() {
      this.dialogFormDetail = false;
    },
    ExportExcel() {
      const dataExport = this.tableData.map(item => {
        const QuantityHour = item.OverTimeLineLst.reduce(
          (acc, cur) => acc + cur.QuantityHour,
          0
        );
        return {
          ...item,
          QuantityHour: QuantityHour
        };
      });
      this.downloading = true;
      const tHeader = [
        "Nhân viên",
        "Mã nhân viên",
        "Số điện thoại",
        "Nhóm",
        "Chức danh",
        "Lý do",
        "Ghi chú",
        "Số giờ đăng kí",
        "Thời gian tạo",
        "Thời gian xác nhận",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeName",
        "EmployeeCode",
        "EmployeeID",
        "GroupID",
        "Position",
        "Reason",
        "Note",
        "QuantityHour",
        "TimeCreate",
        "TimeAccept",
        "Status"
      ];
      var data = dataExport;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            "Danh sách đăng kí tăng ca từ " +
            Date.parse(this.DateBegin).toString("dd/MM/yyyy") +
            " đến " +
            Date.parse(this.DateEnd).toString("dd/MM/yyyy"), //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.OTStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  watch: {
    DateBegin() {
      if (this.modeAdmin) {
        this.fetchDataGroup();
      } else {
        this.fetchData();
      }
    },
    DateEnd() {
      if (this.modeAdmin) {
        this.fetchDataGroup();
      } else {
        this.fetchData();
      }
    },
    groupID() {
      this.fetchDataGroup();
    }
  },
  created() {
    if (this.$route.path.includes("groups")) {
      this.modeAdmin = true;
      this.fetchGroup();
      this.fetchDataGroup();
    } else {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  background-color: #f0f2f5;
  .block-top {
    width: 100%;
    background-color: #fff;
    margin-left: 1px;
    border-right: 2px solid rgb(236, 240, 241);
    padding: 10px;
  }
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
}
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}
</style>
