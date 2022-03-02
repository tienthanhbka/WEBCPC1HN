<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-date-picker
          size="small"
          v-model="month"
          type="month"
          value-format="MM-yyyy"
          placeholder="Pick a month"
          value="2019-06"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="primary"
          size="small"
          :loading="listLoading"
          @click="createTarget"
          ><i class="fas fa-plus-circle"></i> Thêm chỉ tiêu</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-dropdown size="small" split-button type="danger">
            Lấy tự động
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  style="width: 100%;color:#58ACFA;"
                  size="mini"
                  @click="getGroup"
                  >Chỉ tiêu nhóm</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  style="width: 100%;color: #67A23C;"
                  size="mini"
                  @click="getLastMonth"
                  >Chỉ tiêu tháng trước</el-button
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="inline-block">
          <el-button
            size="small"
            type="success"
            :loading="listLoading"
            @click="tabletoExcel('tblData', 'OKR')"
            ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>

    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      id="tblData"
      :data="target"
      size="small"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
      @expand-change="expand"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>
            Giao kết KPIcs của các loại việc
            <span style="font-size:10pt;font-weight:700;color:red">
              {{ scope.row.Service }}</span
            >
          </p>
          <el-row>
            <el-table
              :data="scope.row.lines"
              v-model="obj"
              border
              style="width: 100%"
            >
              <el-table-column width="100">
                <template slot-scope="props">
                  <el-tooltip content="Chỉnh sửa" placement="top"
                    ><el-button
                      @click="openModalEditTargetAction(scope.row, props.row)"
                      type="text"
                    >
                      <i class="fas fa-edit"></i></el-button
                  ></el-tooltip>

                  <el-tooltip content="Xóa" placement="top"
                    ><el-button
                      @click="openModalDelTargetAction(scope.row, props.row)"
                      type="text"
                    >
                      <i
                        style="color: red"
                        class="fas fa-trash-alt"
                      ></i></el-button
                  ></el-tooltip>
                </template>
              </el-table-column>

              <el-table-column
                prop="Name"
                label="Loại công việc"
                min-width="200"
              >
                <template slot-scope="props">
                  {{ props.row.Name }}
                </template>
              </el-table-column>
              <el-table-column
                prop="Amount"
                label="Khối lượng"
                align="center"
                width="100"
              >
                <template slot-scope="props">
                  {{ props.row.Amount }}
                </template>
              </el-table-column>
              <el-table-column
                prop="Unit"
                label="Đơn vị"
                align="center"
                width="100"
              >
                <template slot-scope="props">
                  {{ props.row.Unit }}
                </template>
              </el-table-column>
              <el-table-column
                prop="Target"
                label="KPI"
                align="center"
                width="100"
              >
                <template slot-scope="props">
                  {{ props.row.Target }}
                </template>
              </el-table-column>
              <el-table-column
                prop="KPIcs"
                label="KPIcs"
                align="center"
                width="120"
              >
                <template slot-scope="props">
                  {{ Number(props.row.KPIcs).toFixed(3) }}
                </template>
              </el-table-column>
              <el-table-column prop="Note" label="Ghi chú" min-width="200">
                <template slot-scope="props">
                  {{ props.row.Note }}
                </template>
              </el-table-column>
            </el-table>
            <el-tooltip content="Tạo KPIcs" placement="top"
              ><el-button @click="openModalCreateKPIcs(scope.row)" type="text">
                <i style="color: red" class="fas fa-plus"></i></el-button
            ></el-tooltip>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="No_" label="STT" width="95">
        <template slot-scope="props">
          <div class="dat-cell" label="STT">
            {{ props.$index + 1 }}
            <el-tooltip content="Chỉnh sửa" placement="top"
              ><el-button @click="openModalEditTarget(props.row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="openModalDeleteTarget(props.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Chỉ tiêu" width="150">
        <template slot-scope="props">
          <div class="dat-cell" label="Chỉ tiêu">
            {{ props.row.Service }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="KPI đích" align="center" width="100">
        <template slot-scope="props">
          <div class="dat-cell" label="KPI đích">
            {{ props.row.target }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="KPI max" align="center" width="100">
        <template slot-scope="props">
          <div class="dat-cell" label="KPI max">
            {{ props.row.KPImax }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" align="center" width="100">
        <template slot-scope="props">
          <div class="dat-cell" label="Ngày tạo">
            {{ props.row.TimeCreate | toDate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày duyệt" align="center" width="100"
        ><template slot-scope="props">
          <div class="dat-cell" label="Ngày duyệt">
            {{ props.row.TimeAccept | toDate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú" align="center">
        <template slot-scope="props">
          <div class="dat-cell" label="Ghi chú">
            {{ props.row.note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="120" align="center">
        <template slot-scope="props">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="props.row.status | TargetStatusColor">{{
              props.row.status | TargetStatusText
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:5px;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="page_row"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
    <el-dialog
      :visible.sync="dialogFormCreateTarget"
      custom-class="default-modal"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <target :id="id" :groupList="groupList" @click-something="addOK"></target>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormEditTarget"
      custom-class="default-modal"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
        <span style="font-size:10pt;font-weight:700;color:red">{{
          rowTarget.Service
        }}</span>
      </h3>

      <editTarget
        :row="rowTarget"
        :groupList="groupList"
        @click-something="editOK"
      ></editTarget>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormEditTargetAction"
      custom-class="default-modal"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>

      <editTargetAction
        :row="rowTargetAction"
        @click-something="editActionOK"
      ></editTargetAction>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormCreateTargetAction"
      custom-class="default-modal"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <createKPIcs
        :listAction="listAction"
        :row="rowTarget"
        @click-something="createKPIcsOK"
      ></createKPIcs>
    </el-dialog>
  </div>
</template>
<script>
import Target from "@/views/KPI/target/component/createTarget";
import CreateKPIcs from "@/views/KPI/target/component/createKPIcs";
import EditTarget from "@/views/KPI/target/component/editTarget";
import EditTargetAction from "@/views/KPI/target/component/editTargetAction";
import {
  GetTarget,
  GetTargetAction,
  UpdateTargetGroupForEm,
  UpdateTargetLastMonthForEm,
  DelTargetAction,
  DeleteTarget
} from "@/api/kpiList";
import { getMonth } from "@/api/index";
import { getAction } from "@/api/order";
import Cookies from "js-cookie";
import { GetGroupEmployee } from "@/api/groups";

export default {
  components: {
    Target,
    EditTarget,
    CreateKPIcs,
    EditTargetAction
  },
  props: {},
  data() {
    return {
      currentPage: 1,
      rowTargetAction: "",
      obj: "",
      rowTarget: "",
      listAction: "",
      targetAction: "",
      groupList: [{}],
      groups: Cookies.get("idGroup"),
      page_row: 10,
      dataLength: 0,
      listLoading: false,
      target: [],
      month: "",
      options: [{}],
      value: "",
      id: "",
      dialogFormCreateTarget: false,
      dialogFormEditTarget: false,
      dialogFormEditTargetAction: false,
      dialogFormCreateTargetAction: false,
      titleDialog: ""
    };
  },
  methods: {
    openModalEditTarget(row) {
      this.rowTarget = row;
      this.titleDialog = "Chỉnh sửa tiêu chí";
      this.dialogFormEditTarget = true;
      //VoerroModal.show("edit-target-KPI");
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
    openModalEditTargetAction(row, line) {
      this.rowTarget = row;
      this.rowTargetAction = line;
      this.titleDialog = "Chỉnh sửa KPI cơ sở (KPIcs)";
      this.dialogFormEditTargetAction = true;
    },
    openModalDelTargetAction(row, line) {
      // //alert('OK')
      // this.rowTargetAction = row;
      // VoerroModal.show("del-target-KPIcs");
      this.$confirm(
        "Xóa công việc " + line.Name + ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      ).then(() => {
        this.listLoading = true;
        DelTargetAction({ RowID: line.RowID }).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Xóa thành công",
              type: "success",
              position: "top-left"
            });
            this.listLoading = false;
            this.expand(row);
          }
        });
      });
    },
    openModalDeleteTarget(row) {
      this.$confirm(
        "Xóa tiêu chí " + row.Service + ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      ).then(() => {
        DeleteTarget(row).then(res => {
          if (res.ResCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Xóa tiêu chí thành công",
              type: "success",
              position: "top-left"
            });
            this.fetchData();
          }
        });
      });
    },
    openModalCreateKPIcs(row) {
      this.rowTarget = row;
      this.dialogFormCreateTargetAction = true;
      this.titleDialog = "Tạo KPIcs";
    },
    createKPIcsOK() {
      this.dialogFormCreateTargetAction = false;
      this.expand(this.rowTarget);
    },
    addOK(form) {
      this.dialogFormCreateTarget = false;
      this.fetchData();
    },
    expand(row) {
      this.rowTarget = row;
      var req = {
        TargetRowID: row.RowID
      };
      GetTargetAction(req).then(response => {
        row.lines = response.Data;
        this.obj = response.Data;
      });
      this.getAction(row);
    },
    getAction(row) {
      var req = {
        IDService: row.KPICode
      };
      getAction(req).then(response => {
        this.listAction = response.Data;
      });
    },
    editOK() {
      this.dialogFormEditTarget = false;
    },
    editActionOK() {
      this.dialogFormEditTargetAction = false;
      this.expand(this.rowTarget);
    },
    createTarget() {
      this.dialogFormCreateTarget = true;
      this.titleDialog = "Tạo tiêu chí";
    },
    fetchData() {
      var req = {
        month: this.month,
        PageNumber: this.currentPage,
        idEmployee: Cookies.get("idEmployee"),
        RowspPage: this.page_row
      };
      this.listLoading = true;
      GetTarget(req).then(response => {
        this.target = response.Data;
        this.listLoading = false;
      });
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
      });
    },
    // Lấy tiêu chí tự động theo nhóm của nhân viên
    getGroup() {
      this.$confirm(
        "Hệ thống sẽ xóa các chỉ tiêu hiện tại và thực hiện cập nhật tháng " +
          this.month +
          ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      ).then(() => {
        this.listLoading = true;
        UpdateTargetGroupForEm({
          Month: this.month,
          EmployeeID: Cookies.get("idEmployee")
        }).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.listLoading = false;
            this.fetchData();
          }
        });
      });
    },
    // Lấy tiêu chí tháng trước của nhân viên
    getLastMonth() {
      this.$confirm(
        "Hệ thống sẽ xóa các chỉ tiêu hiện tại và thực hiện cập nhật tháng " +
          this.month +
          ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      ).then(() => {
        this.listLoading = true;
        UpdateTargetLastMonthForEm({ Month: this.month }).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.listLoading = false;
            this.fetchData();
          }
        });
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
    }
  },
  created() {
    this.month = getMonth();
    // this.month = new Date().getFullYear + '-' + new Date().getMonth();
    this.fetchData();
    this.fetchGroup();
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
