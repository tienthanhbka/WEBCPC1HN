<template>
  <div class="my-mission-container">
    <el-button
      type="success"
      size="small"
      icon="el-icon-document"
      @click="createMission"
      class="inline-block"
      >Tạo phiếu</el-button
    >
    <div style="float:right;">
      <div class="inline-block">
        <span style="font-weight:600;font-size:10pt;color:red"
          >Số phép còn lại: {{ NumberNP }}</span
        >
      </div>
      <div class="inline-block">
        <el-date-picker
          size="small"
          style="width:140px"
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
          style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibleCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create
        :typeList="typeList"
        @click-something="createOK"
        @cancel="cancelCreate"
      ></create>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleEdit" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <edit
        :typeList="typeList"
        :row="rowSelect"
        @click-something="editOK"
        @cancel="cancelEdit"
      ></edit>
    </el-dialog>

    <upload :typeList="typeList" :row="rowSelect"></upload>
    <delete
      :typeList="typeList"
      :row="rowSelect"
      @click-something="deleteOK"
    ></delete>
    <div>
      <el-table
        class="el-mobile-table"
        :data="tableData"
        id="tbldata"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="140px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <!-- <el-tooltip content="Upload ảnh" placement="top"
                ><el-button @click="Upload(scope.row)" type="text">
                  <i class="fas fa-file-upload"></i></el-button
              ></el-tooltip> -->
              <el-tooltip content="Sửa" placement="top"
                ><el-button @click="Edit(scope.row)" type="text">
                  <i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top"
                ><el-button @click="Delete(scope.row)" type="text">
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Type" label="Loại">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại">
              {{ scope.row.Type }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số buổi nghỉ" width="110" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.Number">
              {{ scope.row.Number }} ngày
            </div></template
          >
        </el-table-column>
        <el-table-column prop="Reason" label="Lý do">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lý do">
              {{ scope.row.Reason }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tạo lúc" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tạo lúc">
              {{ Date.parse(scope.row.TimeCreate).toString("dd-MM-yyyy") }}
            </div></template
          >
        </el-table-column>
        <el-table-column prop="TimeStart" label="Bắt đầu" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Bắt đầu">
              {{ Date.parse(scope.row.TimeStart).toString("dd-MM-yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeEnd" label="Kết thúc" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Kết thúc">
              {{ Date.parse(scope.row.TimeEnd).toString("dd-MM-yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Note" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                style="width:120px"
                :type="scope.row.Status | missionVacationStatusColor"
                >{{ scope.row.Status | missionVacationStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
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
import Create from "@/views/mission/mission/mission-np/component/component/create";
import Edit from "@/views/mission/mission/mission-np/component/component/edit";
import Delete from "@/views/mission/mission/mission-np/component/component/delete";
import Upload from "@/views/mission/mission/mission-np/component/component/upload";
import { GetTypeMissionVacation } from "@/api/mission";
import { GetMissionVacation, GetNumVacation } from "@/api/missionVacation";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: {
    Create,
    Edit,
    Delete,
    Upload
  },
  data() {
    return {
      tableData: [],
      rowSelect: "",
      NumberNP: "",

      TextSearch: "",
      typeList: [],
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisibleCreate: false,
      dialogVisibleEdit: false,
      titleDialog: ""
    };
  },
  methods: {
    createMission() {
      this.dialogVisibleCreate = true;
      this.titleDialog = "Tạo phiếu đăng ký kế hoạch làm việc";
    },
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
    createOK() {
      this.dialogVisibleCreate = false;
      this.fetchData();
    },
    cancelCreate() {
      this.dialogVisibleCreate = false;
    },
    cancelEdit() {
      this.dialogVisibleEdit = false;
    },
    editOK() {
      this.dialogVisibleEdit = false;
      this.fetchData();
    },
    deleteOK() {
      this.fetchData();
    },
    Delete(row) {
      this.rowSelect = row;
      VoerroModal.show("delete-mission-vacation");
    },
    Edit(row) {
      this.rowSelect = row;
      this.dialogVisibleEdit = true;
      this.titleDialog = "Chỉnh sửa phiếu đăng ký";
    },
    // Upload(row) {
    //   this.rowSelect = row;
    //   VoerroModal.show("upload-mission-vacation");
    // },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateStart: this.DateStart,
        DateEnd: this.DateEnd
      };
      GetMissionVacation(req).then(res => {
        this.loadingTableData = false;
        this.tableData = res.MissionVacationLst;
      });
    },
    fetchType() {
      var req = {
        token: Cookies.get("token")
      };
      GetTypeMissionVacation(req).then(response => {
        this.typeList = response.Data;
      });
    }
  },
  watch: {
    DateStart() {
      this.fetchData();
    },
    DateEnd() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
    GetNumVacation().then(res => {
      this.NumberNP = res.NumVacationSys - res.NumVacationUse;
    });
    this.fetchType();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding: 10px;
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
