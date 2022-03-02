<template>
  <div class="appview-container">
    <div
      style="display:flex;border-bottom: 1px solid #eee;
    margin-bottom: 5px;"
    >
      <el-date-picker
        class="el-select-months active"
        v-model="month"
        type="month"
        size="mini"
        value-format="MM-yyyy"
        placeholder="Pick a month"
        value="2019-07"
      >
      </el-date-picker>
      <el-button
        class="el-button-custom active"
        style="margin-left:5px;"
        @click="update"
        >Cập nhật</el-button
      >
    </div>
    <div class="overview-item">
      <div class="image">
        <img
          width="50"
          height="50"
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/kpi-1912108-1617741.png"
          alt="img"
        />
      </div>
      <div class="content">
        <div>
          <div class="title">Kết quả KPI tháng {{ month }}</div>
        </div>
        <div class="result">Tổng điểm: {{ sumKPI }} /1000</div>
      </div>
    </div>
    <div v-if="target.length > 0">
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
      >
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
              {{ scope.row.TimeUpdate.toString(" HH:ss dd/MM/yyyy") }}
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
        <el-table-column label="Chi tiết" width="150" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Chi tiết">
              <el-button
                type="text"
                @click="expandRow(scope.row)"
                style="color:#CAC531"
                >Chi tiết</el-button
              >
            </div></template
          >
        </el-table-column>
      </el-table>
    </div>
    <div v-else class="blank-table">
      Không có dữ liệu
    </div>
    <el-dialog :visible.sync="dialogDetail" custom-class="small-modal">
      <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
      <detail :data="data"></detail>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetResult,
  GetResultEmployee,
  GetSumKPIReport,
  UpdateResultKPIList
} from "@/api/appview";
import { getMonth } from "@/api/index";
import Detail from "./component/detail.vue";

export default {
  components: { Detail },
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    }
  },
  data() {
    return {
      dialogDetail: false,
      dialogTitle: "",
      sumBo: true,
      rowTarget: "",
      sumKPI: 0,
      obj: "",
      UserName: "",
      Token: "",
      data: [],
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
    fetchKPIReport() {
      var req = {
        month: this.month,
        token: this.Token
      };
      GetSumKPIReport(req).then(response => {
        this.kpiReport = response.Data;
        this.rowReport.resultKPI = this.kpiReport;
      });
    },

    fetchData() {
      var req = {
        month: this.month,
        token: this.Token,
        PageNumber: this.currentPage,
        idEmployee: this.UserName
      };
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
        this.rowPhu.targetKPI = 1000 - kpiTarget;
        this.rowPhu.KPImax = 1000 - kpiTarget;
        this.sumKPI = kpi.toFixed(2);

        this.target.push(this.rowReport);
        this.target.push(this.rowPhu);
        this.expandRow(this.rowPhu);
        this.listLoading = false;
        this.total = response.TotalPage * response.RowspPage;
      });
    },
    expandRow(row) {
      this.rowSelect = row;
      var req = {
        token: this.Token,
        month: this.month,
        IDService: row.IDService
      };
      GetResultEmployee(req).then(res => {
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
        } else {
          this.data = res.Data;
          this.dialogTitle = "Nhóm việc: " + row.Service;
          this.dialogDetail = true;
        }
      });
    },
    update() {
      //alert('ok');
      var req = {
        month: this.month,
        token: this.Token
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
    tableRowClassName({ row, rowIndex }) {
      if (parseInt(row.Auto) === 1) {
        return "success-row";
      }

      return "";
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
    if (this.$route.params.username && this.$route.params.token) {
      this.UserName = this.$route.params.username;
      this.Token = this.$route.params.token;
      this.month = getMonth();
      this.fetchKPIReport();
      this.fetchData();
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appview-container {
  padding: 5px 8px;
}
.overview-item {
  height: auto;
  background: #fff;
  margin-bottom: 15px !important;
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
    flex-grow: 1;
    .title {
      font-size: 16px;
    }

    .result {
      display: block;
      font-size: 10pt;
      margin-top: 5px;
      font-weight: 700;
      color: #cac531;
    }
  }
}
.title-dialog {
  font-size: 10pt;
  font-weight: 700;
  color: #0277bc;
}
@media only screen and (max-width: 600px) {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
