<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-select
        v-model="groups"
        size="small"
        clearable
        placeholder="Chọn nhóm"
      >
        <el-option
          v-for="item in groupList"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          size="small"
          placeholder="Ngày bắt đầu"
          v-model="DateStart"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          size="small"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          size="small"
          :loading="downloading"
          style="background-color:#02bc77;color:white;"
          icon="far fa-file-excel"
          @click="ExportExcel"
        >
          Xuất Excel</el-button
        >
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisibleConfirm"
      custom-class="default-modal"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <confirm
        :typeList="typeList"
        :row="rowSelect"
        @click-something="ConfirmOK"
        @cancel="cancelConfirm"
      ></confirm>
    </el-dialog>

    <div>
      <el-table
        :data="tableData"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="80px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 }}
            <el-tooltip content="Duyệt" placement="top"
              ><el-button @click="Confirm(scope.row)" type="text">
                <i class="fas fa-check-double"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag
              style="width:120px"
              :type="scope.row.Status | missionVacationStatusColor"
              >{{ scope.row.Status | missionVacationStatusText }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="EmployeeName"
          label="Nhân viên"
          min-width="90px"
        ></el-table-column>
        <el-table-column
          prop="Type"
          label="Loại"
          min-width="90px"
        ></el-table-column>
        <el-table-column label="Số buổi nghỉ" width="110" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.Number">
              {{ scope.row.Number }} ngày
            </div></template
          >
        </el-table-column>
        <el-table-column
          prop="Reason"
          label="Lý do"
          min-width="90px"
        ></el-table-column>
        <el-table-column label="Tạo lúc" width="110" align="center">
          <template slot-scope="scope">{{
            Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy")
          }}</template>
        </el-table-column>
        <el-table-column prop="TimeStart" label="Bắt đầu" width="110"
          ><template slot-scope="scope">{{
            Date.parse(scope.row.TimeStart).toString("dd/MM/yyyy")
          }}</template></el-table-column
        >
        <el-table-column prop="TimeEnd" label="Kết thúc" width="110"
          ><template slot-scope="scope">{{
            Date.parse(scope.row.TimeEnd).toString("dd/MM/yyyy")
          }}</template></el-table-column
        >
        <el-table-column
          prop="Note"
          label="Ghi chú"
          min-width="90px"
        ></el-table-column>
        <el-table-column prop="TimeAccept" label="Duyệt" width="110"
          ><template
            slot-scope="scope"
            v-if="scope.row.TimeAccept"
            >{{
              Date.parse(scope.row.TimeAccept).toString("dd/MM/yyyy")
            }}</template
          ></el-table-column
        >
        <el-table-column
          prop="NameManager"
          label="Người duyệt"
          width="110px"
        ></el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Confirm from "@/views/mission/mission/mission-np/component/component/confirm";
import { GetGroupMissionVacation } from "@/api/missionVacation";
import { GetListGroupAdminByToken } from "@/api/groups";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: {
    Confirm
  },
  data() {
    return {
      tableData: [],
      rowSelect: "",
      groups: "",
      groupList: [],
      TextSearch: "",
      typeList: [],
      DateStart: null,
      DateEnd: null,
      loadingTableData: false,
      dialogVisibleConfirm: false,
      titleDialog: "",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      downloading: false
    };
  },
  methods: {
    tabletoExcel(table, name) {
      var uri = "data:application/vnd.ms-excel;base64,",
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          });
        };
      if (!table.nodeType) table = document.getElementById(table);
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      window.location.href = uri + base64(format(template, ctx));
    },

    Confirm(row) {
      this.rowSelect = row;
      this.dialogVisibleConfirm = true;
      this.titleDialog = "Duyệt phiếu đăng kí lịch làm việc";
    },
    ConfirmOK() {
      this.dialogVisibleConfirm = false;
      this.fetchData();
    },
    cancelConfirm() {
      this.dialogVisibleConfirm = false;
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        IDGroup: this.groups
      };
      GetGroupMissionVacation(req).then(res => {
        this.loadingTableData = false;
        this.tableData = res.MissionVacationLst;
      });
    },
    fetchGroup() {
      var req = {
        token: Cookies.get("token")
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;
      });
    },
    ExportExcel() {
      this.downloading = true;
      let DateStart = Date.parse(this.DateStart).toString("dd/MM/yyyy");
      let DateEnd = Date.parse(this.DateEnd).toString("dd/MM/yyyy");

      const tHeader = [
        "Nhân viên",
        "Điện thoại",
        "Nhóm",
        "Loại",
        "Số buổi nghỉ",
        "Lý do",
        "Tạo lúc",
        "Bắt đầu",
        "Kết thúc",
        "Ghi chú",
        "Duyệt",
        "Người duyệt",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeName",
        "IDEmployee",
        "IDGroup",
        "Type",
        "Number",
        "Reason",
        "TimeCreate",
        "TimeStart",
        "TimeEnd",
        "Note",
        "TimeAccept",
        "NameManager",
        "Status"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            "Danh sách nghỉ - làm bù từ " +
            DateStart +
            " đến " +
            DateEnd +
            " nhóm " +
            this.groups, //Optional
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
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  watch: {
    DateStart: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    }
  },
  created() {
    this.DateStart = getStartDate();
    this.DateEnd = getEndDate();
    this.fetchGroup();
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding:10px;
  background-color: #f0f2f5;

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
