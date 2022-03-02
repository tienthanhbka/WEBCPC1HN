<template>
  <div class="app-container">
    <div class="inline-block">
      <el-select v-model="groups" clearable placeholder="Chọn nhóm">
        <el-option
          v-for="item in groupList"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
      <span class="demonstration">Tháng</span>
      <el-date-picker
        v-model="month"
        type="month"
        value-format="MM-yyyy"
        placeholder="Pick a month"
        value="2019-07"
      >
      </el-date-picker>
    </div>
    <div class="filter-container">
      <div class="inline-block"></div>
    </div>
    <div>
      <!-- <confirm :id="id" :groupList="groupList" @click-something="addOK" ></confirm> -->
      <el-table
        v-loading="listLoading"
        :data="target"
        @expand-change="expandRow"
        element-loading-text="Loading"
        style="width:100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <template>
              <div style="color: red; font-size: 20px;">
                KPI đạt/ KPI đích : {{ props.row.result }} /
                {{ props.row.kpi }}
                <el-button
                  size="mini"
                  style="margin-bottom: 5px; margin-left: 10px;"
                  type="success"
                  @click="tabletoExcel('tblData', 'Báo cáo công việc')"
                >
                  <i class="fas fa-file-excel"></i> Export</el-button
                >
                <el-button
                  size="mini"
                  style="margin-bottom: 5px; margin-left: 10px;"
                  type="warning"
                  @click="UpdateKPI(props.row.idEmployee)"
                >
                  <i class="far fa-edit"></i> Cập nhật</el-button
                >
              </div>
            </template>
            <el-table
              id="tblData"
              v-loading="listLoading"
              :data="props.row.lines"
              @expand-change="expandRowDetail"
              element-loading-text="Loading"
              style="width:100%"
              border
              fit
              highlight-current-row
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    :data="props.row.line"
                    v-model="obj"
                    border
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
                    <el-table-column
                      prop="Rate"
                      align="center"
                      label="Khối lượng"
                      width="80"
                    >
                    </el-table-column>

                    <el-table-column
                      prop="KPI"
                      align="center"
                      label="KPI"
                      width="80"
                    >
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
                <template slot-scope="scope"
                  >{{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="Chỉ tiêu" width="150">
                <template slot-scope="scope">{{ scope.row.Service }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="KPI đích"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.targetKPI
                }}</template>
              </el-table-column>

              <el-table-column label="KPI đạt" width="150" align="center">
                <template slot-scope="scope">{{
                  scope.row.resultKPI
                }}</template>
              </el-table-column>
              <el-table-column label="% đạt" width="150" align="center">
                <template slot-scope="scope"
                  >{{
                    Math.round(
                      (scope.row.resultKPI / scope.row.targetKPI) * 100
                    )
                  }}%</template
                >
              </el-table-column>
              <el-table-column label="Cập nhật" width="150" align="center">
                <template slot-scope="scope">{{
                  scope.row.TimeUpdate
                }}</template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="No_" label="STT" width="95">
          <template slot-scope="scope"
            >{{ scope.$index + 1 }}
            <!-- <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        <el-tooltip content="Xóa" placement="top"><el-button  @click="openModalDeleteTarget(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column label="Tên nhân viên">
          <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
        </el-table-column>
        <el-table-column label="KPI đạt">
          <template slot-scope="scope">{{ scope.row.result }}</template>
        </el-table-column>
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
  GetResultGroup,
  GetResultEmployeeByID,
  CreateTarget,
  GetResultEmployeeGroupDetail,
  GetResultEmployeeGroup,
  UpdateResultKPIList
} from "@/api/kpiList";
import Cookies from "js-cookie";
import { GetListGroupAdminByToken } from "@/api/groups";
import { getStartMonth, getMonth } from "@/api/index";

export default {
  components: {},
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
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      }
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
      currentPage: 1,
      totalPage: "",
      total: 0,
      rowTarget: "",
      groups: "",
      obj: "",
      sumBo: true,
      groupList: [{}],
      row: [],
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
      page_row: 10,
      listLoading: false,
      target: [],
      month: "",
      options: [{}],
      value: "",
      id: ""
    };
  },
  methods: {
    UpdateKPI(row) {
      var req = {
        month: this.month,
        idEmployee: row,
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
    openModalEditTarget(row) {
      this.rowTarget = row;
      VoerroModal.show("edit-target-KPI");
    },
    openModalDeleteTarget(row) {
      this.rowTarget = row;
      VoerroModal.show("delete-target-KPI");
    },
    addOK(form) {
      this.target.push(form);
    },
    openModal() {
      VoerroModal.show("new-target-KPI");
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },

    fetchData() {
      if (this.groups != "") {
        var req = {
          month: this.month,
          PageNumber: this.currentPage,
          admin: this.groups,
          RowspPage: this.page_row
        };
        //console.log(req);
        this.listLoading = true;
        GetResultEmployeeGroup(req).then(response => {
          this.target = response.Data;
          //console.log(response.Data);
          this.listLoading = false;
          this.total = response.TotalPage * response.RowspPage;
          //console.log(this.totalPage);
        });
      }
    },
    expandRow(row) {
      var req = {
        month: this.month,
        // PageNumber: this.currentPage,
        idEmployee: row.idEmployee
        //RowspPage: this.page_row
      };

      //console.log(req);
      this.listLoading = true;
      GetResultEmployeeGroupDetail(req).then(response => {
        row.lines = response.Data;
        //console.log(response.Data);

        row.kpi = 0;
        row.result = 0;
        row.lines.forEach(myFunction);
        function myFunction(item, index, arr) {
          row.kpi += parseFloat(item.targetKPI);
          row.result += parseFloat(item.resultKPI);
        }

        var rowP = {
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
        };
        //this.row.push(this.rowPhu)
        //console.log(this.row)
        //rowP = this.rowPhu
        rowP.idEmployee = row.idEmployee;
        rowP.targetKPI = 1000 - row.kpi;

        rowP.KPImax = 1000 - row.kpi;
        //this.sumKPI = kpi;
        row.lines.push(rowP);
        this.listLoading = false;
        this.expandRowDetail(rowP);
      });
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
    expandRowDetail(row) {
      this.rowSelect = row;
      //console.log(row);
      var req = {
        month: this.month,
        IDService: row.IDService,
        idEmployee: row.idEmployee
      };

      GetResultEmployeeByID(req).then(res => {
        row.line = res.Data;
        this.obj = res.Data;
        //console.log(res.Data);

        if (row.IDService == 1) {
          var numbers = res.Data;
          var kpiResult = 0;
          var kpiTarget = 0;
          numbers.forEach(myFunction);

          function myFunction(item, index, arr) {
            kpiResult = parseFloat(item.KPI) + kpiResult;
          }
          if (parseFloat(row.KPImax) < kpiResult) {
            row.resultKPI = row.KPImax;
          } else {
            row.resultKPI = kpiResult;
          }

          //this.expandRow(row)
          if (this.sumBo == true) {
            //var sum = this.sumKPI
            //this.sumKPI = sum + this.rowPhu.resultKPI
            //this.sumBo = false
          }
        }
      });
    }
  },
  computed: {},
  mounted() {},
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    month: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    }
  },
  created() {
    this.month = getMonth();
    this.fetchGroup();
    this.fetchData();
  }
};
</script>
