<template>
  <div class="group-block">
    <div class="header-block">
      <div class="inline-block">
        <el-select
          size="small"
          v-model="groups"
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
      <div class="inline-block">
        <span class="demonstration">Chọn tháng</span>
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
          size="small"
          type="primary"
          :loading="listLoading"
          @click="openModal"
          ><i class="fas fa-plus-circle"></i> Thêm chỉ tiêu</el-button
        >
      </div>
    </div>
    <div>
      <modal
        :id="id"
        :groupList="groupList"
        :employee="options"
        @click-something="addOK"
      ></modal>
      <confirm :row="rowSelect" @click-something="confirmOK"></confirm>
      <createKPIcs
        :listAction="listAction"
        :row="rowTarget"
        @click-something="createKPIcsOK"
      ></createKPIcs>
      <deleteTarget :row="rowSelect" @click-something="deleteOK"></deleteTarget>
      <confirmTargetAction
        :row="rowActionSelect"
        @click-something="confirmActionOK"
      ></confirmTargetAction>
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
                KPI đích: {{ props.row.kpi }} --- KPI tối đa :
                {{ props.row.kpimax }}
                <el-button
                  size="mini"
                  style="margin-bottom: 5px; margin-left: 10px;"
                  type="success"
                  @click="tabletoExcel('tblData', 'OKR')"
                >
                  <i class="fas fa-file-excel"></i> Export</el-button
                >
              </div>
              <div style="float: right">
                <el-button
                  type="warning"
                  size="small"
                  @click="getGroup(props.row)"
                  >Lấy chỉ tiêu của nhóm</el-button
                >
              </div>
              <div style="clear: both;"></div>
            </template>
            <el-table
              v-loading="listLoading"
              id="tblData"
              :data="props.row.lines"
              @expand-change="expand"
              element-loading-text="Loading"
              style="width:100%"
              size="small"
              border
              fit
              highlight-current-row
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    v-loading="listLoading"
                    :data="props.row.lines"
                    v-model="obj"
                    size="mini"
                    element-loading-text="Loading"
                    style="width:100%"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column
                      align="center"
                      prop="No_"
                      label="STT"
                      width="95"
                    >
                      <template slot-scope="scope"
                        >{{ scope.$index + 1 }}
                        <el-tooltip content="Duyệt" placement="top"
                          ><el-button
                            @click="openModalConfirmTargetAction(scope.row)"
                            type="text"
                          >
                            <i class="fas fa-edit"></i></el-button
                        ></el-tooltip>
                      </template>
                    </el-table-column>

                    <el-table-column label="Loại việc" width="150">
                      <template slot-scope="scope">{{
                        scope.row.Name
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      class-name="status-col"
                      label="Ngày tạo"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.TimeCreate | toDate
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      class-name="status-col"
                      label="KPI đích"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.Target
                      }}</template>
                    </el-table-column>

                    <el-table-column
                      class-name="status-col"
                      label="Khối lượng"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.Amount
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      class-name="status-col"
                      label="Đơn vị tính"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.Unit
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      class-name="status-col"
                      label="KPIcs"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.KPIcs
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="Note"
                      label="Ghi chú"
                      min-width="200"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.Note }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class-name="status-col"
                      label="Trạng thái"
                      width="150"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-tag :type="scope.row.Status | TargetStatusColor">{{
                          scope.row.Status | TargetStatusText
                        }}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-tooltip content="Tạo KPIcs" placement="top"
                    ><el-button @click="openModalCreateKPIcs" type="text">
                      <i style="color: red" class="fas fa-plus"></i></el-button
                  ></el-tooltip>
                </template>
              </el-table-column>

              <el-table-column align="center" label="STT" width="120">
                <template slot-scope="scope"
                  >{{ scope.$index + 1 }}
                  <el-tooltip content="Duyệt" placement="top"
                    ><el-button
                      @click="openModalConfirmTarget(props.row, scope.row)"
                      type="text"
                    >
                      <i class="fas fa-edit"></i></el-button
                  ></el-tooltip>
                  <el-tooltip content="Xóa" placement="top"
                    ><el-button
                      @click="openModalDeleteTarget(props.row, scope.row)"
                      type="text"
                    >
                      <i
                        style="color: red"
                        class="fas fa-trash-alt"
                      ></i></el-button
                  ></el-tooltip>
                </template>
              </el-table-column>

              <el-table-column label="Chỉ tiêu" min-width="180">
                <template slot-scope="scope">{{ scope.row.Service }}</template>
              </el-table-column>

              <el-table-column
                class-name="status-col"
                label="Ngày tạo"
                align="center"
                width="100"
              >
                <template slot-scope="scope">{{
                  scope.row.TimeCreate | toDate
                }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="KPI đích"
                align="center"
                width="100"
              >
                <template slot-scope="scope">{{ scope.row.target }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="KPI tối đa"
                align="center"
                width="100"
              >
                <template slot-scope="scope">{{ scope.row.KPImax }}</template>
              </el-table-column>

              <el-table-column
                class-name="status-col"
                label="Ghi chú"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">{{ scope.row.note }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Trạng thái"
                width="150"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status | TargetStatusColor">{{
                    scope.row.status | TargetStatusText
                  }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="No_" label="STT" width="95">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * 10 }}
            <!-- <el-tooltip content="Duyệt" placement="top"><el-button @click="openModalConfirmTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>

        <el-table-column label="Nhân viên">
          <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      style="padding:5px;background-color:#fff;margin:0 1px"
      :total="total"
      :page-size.sync="page_row"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import Modal from "@/views/KPI/target/component/createTargetGroup";
import Confirm from "@/views/KPI/target/group/component/confirm";
import CreateKPIcs from "@/views/KPI/target/component/createKPIcsGroup";
import DeleteTarget from "@/views/KPI/target/component/deleteTarget";
import ConfirmTargetAction from "@/views/KPI/target/group/component/confirmTargetAction";
import EditTarget from "@/views/KPI/target/component/editTarget";
import {
  GetTargetGroup,
  CreateTarget,
  ConfirmTarget,
  GetTargetEmployeeGroup,
  GetTargetEmployeeGroupDetail,
  GetTargetAction,
  UpdateTargetGroupForEm
} from "@/api/kpiList";
import { GetListGroupAdminByToken } from "@/api/groups";
import { getStartMonth, getMonth } from "@/api/index";
import { getAction } from "@/api/order";
import { getEmployee } from "@/api/order";
import Cookies from "js-cookie";

export default {
  components: {
    Confirm,
    Modal,
    ConfirmTargetAction,
    DeleteTarget,
    CreateKPIcs
  },
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    }
  },
  props: {
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
      groups: "",
      obj: "",
      groupList: [],
      page_row: 10,
      rowTarget: "",
      listLoading: false,
      target: [],
      listAction: "",
      rowSelect: "",
      rowActionSelect: "",
      rowHeader: "",
      month: "",
      options: [{}],
      value: "",
      id: ""
    };
  },
  methods: {
    openModalConfirmTarget(row, line) {
      this.rowHeader = row;
      this.rowSelect = line;
      VoerroModal.show("confirm-target-KPI");
    },
    createKPIcsOK(form) {
      this.obj.push(form);
    },
    openModalCreateKPIcs() {
      VoerroModal.show("new-target-KPIcs");
    },
    openModalDeleteTarget(row, line) {
      this.rowHeader = row;
      this.rowSelect = line;
      VoerroModal.show("delete-target-KPI");
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
    openModalConfirmTargetAction(row) {
      this.rowActionSelect = row;
      VoerroModal.show("confirm-target-KPIcs");
    },
    fetchEmployee() {
      var req = {
        admin: this.groups
      };
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
        this.listLoading = false;
      });
    },
    addOK(form) {
      this.fetchData();
    },
    getAction(row) {
      var req = {
        IDService: row.KPICode
      };
      getAction(req).then(response => {
        this.listAction = response.Data;
      });
    },
    confirmOK() {
      this.expandRow(this.rowHeader);
    },
    deleteOK() {
      this.expandRow(this.rowHeader);
    },
    confirmActionOK() {},
    openModal() {
      VoerroModal.show("new-target-KPI-group");
    },
    fetchData() {
      var req = {
        month: this.month,
        PageNumber: this.currentPage,
        admin: this.groups,
        RowspPage: this.page_row
      };
      this.listLoading = true;
      GetTargetEmployeeGroup(req).then(response => {
        this.target = response.Data;
        this.listLoading = false;
        this.total = response.TotalPage * response.RowspPage;
      });
    },
    expandRow(row) {
      var req = {
        month: this.month,
        idEmployee: row.idEmployee
      };
      this.listLoading = true;
      GetTargetEmployeeGroupDetail(req).then(response => {
        row.lines = response.Data;
        row.kpi = 0;
        row.kpimax = 0;
        row.lines.forEach(myFunction);
        function myFunction(item, index, arr) {
          row.kpi += parseInt(item.target);
          row.kpimax += parseInt(item.KPImax);
        }
        this.listLoading = false;
      });
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

    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee")
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.page_row = val;
      this.fetchData();
    },
    // Hàm lấy chỉ tiêu tự động của nhóm: áp dụng cho quản lý
    getGroup(row) {
      //console.log(row);

      this.rowHeader = row;
      this.$confirm(
        "Hệ thống sẽ xóa các chỉ tiêu hiện tại của " +
          row.nameEmployee +
          " và thực hiện cập nhật tháng " +
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
        const req = {
          EmployeeID: row.idEmployee,
          Month: this.month
        };
        UpdateTargetGroupForEm(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.listLoading = false;
            this.expandRow(this.rowHeader);
          }
        });
      });
    }
  },
  computed: {},
  mounted() {},
  watch: {
    month: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
      this.fetchEmployee();
    }
  },
  created() {
    this.month = getMonth();
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
