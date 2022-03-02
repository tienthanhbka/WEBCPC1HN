<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-date-picker
        class="el-select-months active"
        placeholder="Ngày bắt đầu"
        v-model="DateBegin"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        size="mini"
      ></el-date-picker>
      <el-date-picker
        class="el-select-months active"
        style="margin-left:5px;margin-bottom:5px"
        placeholder="Ngày kết thúc"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        v-model="DateEnd"
        size="mini"
      ></el-date-picker>
    </div>
    <div class="overview-item">
      <div class="image">
        <img
          width="50"
          height="50"
          src="https://www.jing.fm/clipimg/full/274-2744603_calendar-events-icon.png"
          alt="img"
        />
      </div>
      <div class="content">
        <div class="title">Nghỉ - Làm bù</div>

        <div style="margin-top:5px;">
          <span style="font-weight:700;color:#CAC531;font-size:10pt;"
            >Số phép đã nghỉ {{ NumberNP[0] }}/{{ NumberNP[1] }}</span
          >
        </div>
      </div>
    </div>

    <div v-if="tableData.length > 0">
      <el-table
        class="el-mobile-table"
        :data="tableData"
        id="tbldata"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="160px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
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
              {{ scope.row.TimeCreate.substring(0, 10) }}
            </div></template
          >
        </el-table-column>
        <el-table-column prop="TimeStart" label="Bắt đầu">
          <template slot-scope="scope">
            <div class="dat-cell" label="Bắt đầu">
              {{ scope.row.TimeStart }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeEnd" label="Kết thúc">
          <template slot-scope="scope">
            <div class="dat-cell" label="Kết thúc">
              {{ scope.row.TimeEnd }}
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
              <el-tag :type="scope.row.Status | missionStatusColor">{{
                scope.row.Status | missionStatusText
              }}</el-tag>
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
    <div v-else class="blank-table">Không có dữ liệu</div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import {
  GetMissionVacation,
  GetTypeMissionVacation,
  GetNumberMissionNP
} from "@/api/appview";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      rowSelect: "",
      NumberNP: [],
      TextSearch: "",
      typeList: [],
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      UserName: "",
      Token: ""
    };
  },
  methods: {
    createMission() {
      this.fetchType();
      VoerroModal.show("create-mission-vacation");
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
      this.fetchData();
    },
    editOK() {
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
      this.fetchType();
      this.rowSelect = row;
      VoerroModal.show("edit-mission-vacation");
    },
    Upload(row) {
      this.fetchType();
      this.rowSelect = row;
      VoerroModal.show("upload-mission-vacation");
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        token: this.Token,
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd
      };
      GetMissionVacation(req).then(res => {
        this.loadingTableData = false;
        //console.log('ok');
        this.tableData = res.Data;
        //this.total = res.TotalPage * res.RowspPage;
      });
    },
    fetchType() {
      var req = {
        token: this.Token
      };
      GetTypeMissionVacation(req).then(response => {
        this.typeList = response.Data;
      });
    }
  },
  watch: {
    DateBegin: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    }
  },
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
      this.DateBegin = getStartDate();
      this.DateEnd = getEndDate();
      GetNumberMissionNP({
        token: this.Token
      }).then(res => {
        this.NumberNP = res.Data;
      });
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
    //this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.my-mission-container {
  padding: 5px;
}
.el-pagination {
  margin-top: 10px;
}
.overview-item {
  height: auto;
  background: #fff;
  margin-bottom: 5px !important;
  //background-image: linear-gradient(45deg, #ed213a, #cb2e49);
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  .image {
    margin-right: 20px;
  }
  .content {
    .title {
      font-size: 16px;
    }
  }
}
@media only screen and (max-width: 600px) {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.inline-block {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
}
</style>
