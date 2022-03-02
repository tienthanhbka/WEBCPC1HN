<template>
  <div class="app-container">
    <div class="inline-block">
      <span class="demonstration">Tháng</span>
      <el-date-picker
        v-model="month"
        type="month"
        value-format="MM-yyyy"
        placeholder="Pick a month"
        value="2019-07"
      >
      </el-date-picker>

      <el-button @click="update">Cập nhật</el-button>
      <el-button type="success" @click="tabletoExcel('tblData', 'KPI')"
        >Xuất Excel</el-button
      >

      <span class="score"
        >Tổng điểm KPI tháng {{ month }} : {{ sumKPI }} /1000
      </span>
    </div>
    <div class="filter-container">
      <div class="inline-block"></div>
    </div>
    <div>
      <!-- <confirm :id="id" :groupList="groupList" @click-something="addOK" ></confirm> -->
      <!-- <deleteResult :row="rowTarget" :groupList="groupList" @click-something="deleteOK" ></deleteResult> -->
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="target"
        id="tblData"
        element-loading-text="Loading"
        style="width:100%"
        border
        fit
        highlight-current-row
        @expand-change="expanRow"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.lines"
              v-model="obj"
              border
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column
                prop="Title"
                label="Loại việc"
                align="center"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="Content"
                label="Chi tiết"
                align="center"
                width="180"
              >
              </el-table-column>
              <!-- <el-table-column
     align="center"
      label="KPIcs"
      width="80">
      <template slot-scope="{row}">
         {{Number(row['KPIBase']) }}
      </template>
    </el-table-column> -->

              <el-table-column
                prop="Rate"
                align="center"
                label="Khối lượng"
                width="80"
              >
              </el-table-column>

              <el-table-column prop="KPI" align="center" label="KPI" width="80">
              </el-table-column>

              <el-table-column align="center" label="Giao việc">
                <template slot-scope="scope">{{
                  scope.row.Time | toDate
                }}</template>
              </el-table-column>

              <el-table-column label="Hoàn thành" align="center">
                <template style="text-align: center;" slot-scope="scope">{{
                  scope.row.TimeFinish | toDate
                }}</template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="No_" label="STT" width="95">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Nhóm việc">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Nhóm việc">
              {{ scope.row.Service }}
            </div></template
          >
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="KPI đích"
          width="150"
          align="center"
        >
          <template slot-scope="scope"
            ><div class="dat-cell" label="KPI đích">
              {{ scope.row.targetKPI }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="KPI tối đa" width="150" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="KPI tối đa">
              {{ scope.row.KPImax }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="KPI đạt" width="150" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="KPI đạt">
              {{ scope.row.resultKPI }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Cập nhật gần nhất" width="150" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Cập nhật gần nhất">
              {{ scope.row.TimeUpdate | toDate }}
            </div></template
          >
        </el-table-column>

        <el-table-column label="% đạt" width="150" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="% đạt">
              {{
                Math.round((scope.row.resultKPI / scope.row.targetKPI) * 100)
              }}%
            </div></template
          >
        </el-table-column>
        <!-- <el-table-column  class-name="status-col" label="Ghi chú"  align="center">
        <template slot-scope="scope">{{ scope.row.note }}</template>
      </el-table-column> -->
        <!-- <el-table-column  class-name="status-col" label="Trạng thái" width="150" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | TargetStatusColor"
          >{{ scope.row.status|TargetStatusText }}</el-tag>
        </template>
      </el-table-column> -->

        <!-- <el-table-column  label="Người duyệt" width="150">
        <template slot-scope="scope">{{ scope.row.nameManager }}</template>
      </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
.el-header {
  padding-top: 15px;
  height: 55px;
}
.floatright {
  float: right;
}
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>

<script>
import {
  GetResult,
  GetResultEmployee,
  CreateTarget,
  UpdateResultKPIList
} from "@/api/kpiList";
import Cookies from "js-cookie";
import { GetGroupEmployee } from "@/api/groups";
import { GetSumKPIReport } from "@/api/report";
import { getStartMonth, getMonth } from "@/api/index";
import DeleteResult from "@/views/KPI/result/component/deleteResult";

export default {
  components: {
    DeleteResult
  },
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    }
  },
  props: {
    limit: {
      type: Number,
      default: 20
    },

    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sumBo: true,
      rowTarget: "",
      sumKPI: 0,
      obj: "",
      rowPhu: {
        IDService: "1",
        IdRowTarget: "1",
        KPICode: "1",
        KPImax: "0",
        Service: "Công việc phụ",
        TimeUpdate: "",
        idEmployee: "",
        idRow: "000",
        month: "2019-11-01",
        note: "abc",
        resultKPI: "0",
        targetKPI: "100"
      },

      rowReport: {
        IDService: "1",
        IdRowTarget: "1",
        KPICode: "1",
        KPImax: "0",
        Service: "Báo cáo",
        TimeUpdate: "",
        idEmployee: "",
        idRow: "000",
        month: "2019-11-01",
        note: "abc",
        resultKPI: "0",
        targetKPI: "0"
      },
      groupList: [{}],
      kpiReport: 0,

      listLoading: false,
      target: [],
      rowSelect: "",
      month: "",
      options: [{}],
      value: "",
      id: ""
    };
  },
  methods: {
    openModalEditTarget(row) {
      this.rowTarget = row;
      VoerroModal.show("edit-target-KPI");
    },
    deleteResult(row) {
      this.rowTarget = row;
      VoerroModal.show("delete-result-KPI");
    },
    addOK(form) {
      this.target.push(form);
    },
    update() {
      //alert('ok');
      var req = {
        month: this.month,
        token: Cookies.get("token")
      };
      UpdateResultKPIList(req).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật thành công",
            type: "success",
            position: "top-left"
          });
          this.fetchData();
        }
      });
    },
    openModal() {
      VoerroModal.show("new-target-KPI");
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
    fetchKPIReport() {
      var req = {
        month: this.month,
        token: Cookies.get("token")
      };
      GetSumKPIReport(req).then(response => {
        this.kpiReport = response.Data;
        this.rowReport.resultKPI = this.kpiReport;
      });
    },

    fetchData() {
      var req = {
        month: this.month,
        PageNumber: this.currentPage,
        idEmployee: Cookies.get("idEmployee")
      };
      // console.log(req);
      this.listLoading = true;
      GetResult(req).then(response => {
        this.target = response.Data;
        var numbers = response.Data;
        var kpi = this.rowReport.resultKPI;
        var kpiTarget = 0;
        numbers.forEach(myFunction);

        function myFunction(item, index, arr) {
          kpi = parseFloat(item.resultKPI) + kpi;
          kpiTarget = parseFloat(item.targetKPI) + kpiTarget;
        }
        //console.log(kpi);
        this.rowPhu.targetKPI = 1000 - kpiTarget;
        this.rowPhu.KPImax = 1000 - kpiTarget;
        this.sumKPI = kpi ? kpi.toFixed(2) : 0;

        this.target.push(this.rowReport);
        this.target.push(this.rowPhu);
        this.expanRow(this.rowPhu);
        this.listLoading = false;
        this.total = response.TotalPage * response.RowspPage;
      });
    },
    expanRow(row) {
      this.rowSelect = row;
      var req = {
        month: this.month,
        IDService: row.IDService
      };
      GetResultEmployee(req).then(res => {
        row.lines = res.Data;
        this.obj = res.Data;

        if (row.IDService == 1) {
          var numbers = res.Data;
          var kpiResult = 0;
          var kpiTarget = 0;
          numbers.forEach(myFunction);

          function myFunction(item, index, arr) {
            kpiResult = parseFloat(item.KPI) + kpiResult;
          }
          if (
            parseFloat(this.rowPhu.KPImax) < kpiResult &&
            this.rowPhu.KPImax > 0
          ) {
            this.rowPhu.resultKPI = this.rowPhu.KPImax;
          } else {
            this.rowPhu.resultKPI = kpiResult;
          }
          if (this.sumBo == true) {
            var sum = this.sumKPI;
            this.sumKPI = sum + this.rowPhu.resultKPI;
            this.sumBo = false;
          }
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (parseInt(row.Auto) === 1) {
        return "success-row";
      }

      return "";
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
    }
  },
  computed: {},
  mounted() {},
  watch: {
    month: function() {
      this.fetchData();
      this.fetchKPIReport();
    }
  },
  created() {
    this.month = getMonth();
    this.fetchKPIReport();
    this.fetchData();
    this.fetchGroup();
  }
};
</script>

<style lang="scss" scoped>
.score {
  margin-left: 100px;
  color: red;
}

@media only screen and (max-width: 600px) {
  .el-button:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
    width: 100%;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .score {
    margin-left: 0px;
    color: red;
  }
}
</style>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #a9bcf5;
}
</style>
