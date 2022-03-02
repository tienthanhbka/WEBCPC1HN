<template>
  <div class="orderhcm-container">
    <div class="orderhcm-header">
      <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>

      <div class="inline-block">
        <el-button type="primary" @click="createHand"
          >Tạo phiếu bàn giao</el-button
        >
      </div>
      <!-- <div class="inline-block">
            <el-input placeholder="Search" v-model="TextSearch" class="input-with-select">
                <el-select slot="prepend" placeholder="Select">
                <el-option label="Tất cả" value="1"></el-option>
                <el-option label="Tên nhân viên" value="2"></el-option>
                <el-option label="Đơn vị" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="fetchData()"></el-button>
            </el-input>
        </div> -->
    </div>
    <el-dialog title="Tạo phiếu bàn giao" :visible.sync="dialogVisibleCreate">
      <createHandOver
        :groupList="groupList"
        @createOK="createOK"
      ></createHandOver>
    </el-dialog>

    <el-dialog title="Duyệt phiếu bàn giao" :visible.sync="dialogVisibleAccept">
      <acceptHandOver
        :row="row"
        :groupList="groupList"
        @acceptOK="acceptOK"
      ></acceptHandOver>
    </el-dialog>

    <el-dialog title="Xóa phiếu bàn giao" :visible.sync="dialogVisibleDel">
      <delHandOver
        :row="row"
        :groupList="groupList"
        @delOK="delOK"
      ></delHandOver>
    </el-dialog>

    <el-dialog
      title="Chi tiết phiếu bàn giao"
      :visible.sync="dialogVisibleView"
      width="700.44pt"
    >
      <viewHandOver
        :row="rowSelect"
        :groupList="groupList"
        @sendAcceptOK="sendAcceptOK"
        @acceptOK="acceptOK"
      ></viewHandOver>
    </el-dialog>

    <div class="orderhcm-content">
      <el-table
        v-loading="listLoading"
        :data="HandOverList"
        class="el-mobile-table"
        @expand-change="expandRow"
        @filter-change="filterStatus"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              v-loading="listLoading"
              :data="props.row.lines"
              v-model="obj"
              element-loading-text="Loading"
              style="width:100%"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" prop="No_" label="STT" width="95">
                <template slot-scope="scope">
                  <div class="dat-cell" label="STT">
                    {{ scope.$index + 1 }}
                    <el-tooltip content="Duyệt" placement="top"
                      ><el-button
                        @click="AcceptHandOver(scope.row)"
                        type="text"
                      >
                        <i class="fas fa-check-double"></i></el-button
                    ></el-tooltip>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="Loại" width="150">
                <div class="dat-cell" label="Loại">
                  <template slot-scope="scope">{{
                    scope.row.NameType
                  }}</template>
                </div>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Danh mục"
                align="center"
              >
                <div class="dat-cell" label="Danh mục">
                  <template slot-scope="scope">{{
                    scope.row.HandOver
                  }}</template>
                </div>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Số lượng"
                align="center"
              >
                <div class="dat-cell" label="Số lượng">
                  <template slot-scope="scope">{{ scope.row.Number }}</template>
                </div>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Đơn vị"
                align="center"
              >
                <div class="dat-cell" label="Đơn vị">
                  <template slot-scope="scope">{{ scope.row.Unit }}</template>
                </div>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Hiện trạng"
                align="center"
              >
                <div class="dat-cell" label="Hiện trạng">
                  <template slot-scope="scope">{{
                    scope.row.CurrentStatus
                  }}</template>
                </div>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Người tiếp nhận"
                align="center"
              >
                <div class="dat-cell" label="Người tiếp nhận">
                  <template slot-scope="scope">{{
                    scope.row.EmployeeNameNext
                  }}</template>
                </div>
              </el-table-column>

              <el-table-column
                class-name="status-col"
                label="Trạng thái"
                width="150"
                align="center"
              >
                <div class="dat-cell" label="Trạng thái">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | orderStatusColor">{{
                      scope.row.Status | orderStatusColor
                    }}</el-tag>
                  </template>
                </div>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * page_row }}
            </div></template
          >
        </el-table-column>
        <el-table-column align="center" width="175px" label="">
          <template slot-scope="scope">
            <div class="dat-cell" label="">
              <el-tooltip content="Xem chi tiết" placement="top"
                ><el-button @click="ViewHandOver(scope.row)" type="text">
                  <i class="far fa-eye"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Duyệt" placement="top"
                ><el-button @click="AcceptHandOver(scope.row)" type="text">
                  <i class="fas fa-check-double"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top"
                ><el-button @click="DelHandOver(scope.row)" type="text">
                  <i
                    style="color: red;"
                    class="fas fa-trash-alt"
                  ></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Trạng thái"
          align="center"
          width="130"
          :filters="[
            { text: 'Hoàn thành', value: '10' },
            { text: 'Đã xong', value: '6' },
            { text: 'Đang xử lý', value: '3' },
            { text: 'Đã dừng', value: '2' },
            { text: 'Mới tạo', value: '1' },
            { text: 'Đã hủy', value: '0' }
          ]"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.Status | orderStatusColor">
                {{ scope.row.Status | orderStatusText }}
              </el-tag>
              <!-- <el-button
                    size="mini"
                    type="success"
                   
                    @click="Complete(scope.$index, scope.row)"><i class="el-icon-finished">Báo cáo</i></el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhân viên" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân sự">
              <span>{{ scope.row.EmployeeName }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Mã nhân viên" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.EmployeeCode }}</span>
                </template>
            </el-table-column> -->
        <el-table-column label="Nhóm" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhóm">
              <span>{{ scope.row.IDGroup }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Lý do" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lý do">
              <span>{{ scope.row.Reason }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Ngày xin nghỉ" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày xin nghỉ">
              <span>{{ scope.row.DateStart }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Ngày bàn giao xong"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày bàn giao xong">
              <span>{{ scope.row.DateEnd }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
          class="pagination"
          background
          layout="total,-> , prev, pager, next, sizes"
          :total="total"
          :current-page.sync="currentPage"
          :page-size.sync="page_row"
          @current-change="fetchData"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, getRequestEx, ErrorDetail } from "@/api/getRequest";
import Cookies from "js-cookie";
import CreateHandOver from "@/views/handOver/component/CreateHandOver2";
import AcceptHandOver from "@/views/handOver/component/AcceptHandOver";
import DelHandOver from "@/views/handOver/component/DelHand";
import SendAccept from "@/views/handOver/component/SendAccept";
import ViewHandOver from "@/views/handOver/component/ViewHandOver";
import { getStartMonth, getEndMonth } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";
import { GetHandOver, GetHandOverLine } from "@/api/handOver";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    setSize: function(value) {
      if (!value) return "";
      var a = parseFloat(value);
      return a.toFixed(1);
    },
    toCommas: function(value) {
      if (value != null) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  },
  components: {
    CreateHandOver,
    AcceptHandOver,
    ViewHandOver,
    SendAccept,
    DelHandOver
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
      dialogVisibleCreate: false,
      dialogFormVisible: false,
      dialogVisibleAccept: false,
      dialogVisibleDel: false,
      dialogVisibleSendAccept: false,
      dialogVisibleView: false,
      TextSearch: "",
      error: [],
      startDate: "",
      endDate: "",
      currentPage: 0,
      page_row: 10,
      total: 0,
      rowData: [],
      row: [],
      groupList: [{}],
      row: "",
      rowSelect: "",
      obj: "",
      listLoading: false,
      HandOverList: []
    };
  },
  methods: {
    acceptOK() {
      this.dialogVisibleAccept = false;
    },
    delOK() {
      this.dialogVisibleDel = false;
      this.fetchData();
    },
    sendAcceptOK() {
      this.dialogVisibleView = false;
    },
    createOK() {
      this.dialogVisibleCreate = false;
      this.fetchData();
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        //this.groups = response.Data[0].idGroup;
      });
    },
    createHand() {
      this.dialogVisibleCreate = true;
    },

    AcceptHandOver(row) {
      this.row = row;
      this.dialogVisibleAccept = true;
    },
    DelHandOver(row) {
      this.row = row;
      this.dialogVisibleDel = true;
    },
    ViewHandOver(row) {
      console.log(row);
      this.rowSelect = row;
      console.log(this.rowSelect);
      this.dialogVisibleView = true;
    },
    fetchData() {
      var req = {
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.listLoading = true;
      //console.log(req);
      GetHandOver(req).then(response => {
        //console.log(req);
        //console.log(response);
        this.HandOverList = response.Data;
        this.listLoading = false;
      });
    },
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var id = row.RowID;
        GetHandOverLine({ RowID: id, token: Cookies.get("token") }).then(
          res => {
            row.lines = res.Data;
            this.obj = res.Data;
            this.error = res.Data;

            //console.log(res.Data);
          }
        );
      }
    },
    filterStatus(filters) {
      //var lenght = filters[Object.keys(filters)[0]].lenght
      //console.log(lenght)
      var sta = filters[Object.keys(filters)[0]];

      var parsedobj = JSON.parse(JSON.stringify(sta));
      var status = parsedobj.toString();
      //console.log(parsedobj)
      //console.log(parsedobj.length)
      var req = {
        startDate: this.startDate,
        endDate: this.endDate,
        id: Cookies.get("idEmployee"),
        token: Cookies.get("token"),
        page: this.currentPage,
        page_row: this.page_row,
        status: status
      };
      this.listLoading = true;
      //console.log(req);
      getRequest(req).then(response => {
        //console.log(req);
        //console.log(response);
        this.RequestList = response.Data[0];
        this.SUMKPI = response.Data[1];
        this.total = response.TotalPage * response.RowspPage;
        this.listLoading = false;
        this.currentPage = response.PageNumber;
        this.page_row = response.RowspPage;
      });
    },
    OKComplete(row) {
      this.row = row;
      this.row.KPI = row.KPIBase * row.Rate;
      this.dialogFormVisible = true;
    }
  },
  computed: {},
  created() {
    this.startDate = getStartMonth();
    this.endDate = getEndMonth();
    this.fetchGroup();
    this.currentPage = 1;
    this.fetchData();
    //this.fetchEmployee();
  },
  watch: {
    startDate: function() {
      this.startDate = Date.parse(this.startDate).toString("yyyy-MM-dd");
      this.fetchData();
    },
    endDate: function() {
      this.endDate = Date.parse(this.endDate).toString("yyyy-MM-dd");
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    page_row: function() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.orderhcm-container {
  padding: 20px;
  background-color: $bg;
  min-height: 100vh;

  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
  }

  .table-pagination {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 700px) {
  .inline-block {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
