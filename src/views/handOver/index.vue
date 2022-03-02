<template>
  <div class="handover-container">
    <div class="header">
      <div class="inline-block">
        <el-button
          type="primary"
          @click="createHand"
          icon="el-icon-circle-plus-outline"
          >Tạo phiếu bàn giao</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-date-picker
            v-model="startDate"
            size="small"
            type="date"
            placeholder="Từ ngày"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="endDate"
            size="small"
            type="date"
            placeholder="Đến ngày"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <el-dialog :visible.sync="dialogVisibleCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <createHandOver
        :row="rowData"
        :groupList="groupList"
        @createOK="createOK"
      ></createHandOver>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleAccept" custom-class="medium-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <accept-lst :row="rowID"></accept-lst>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDel" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <delHandOver
        :row="row"
        :groupList="groupList"
        @delOK="delOK"
      ></delHandOver>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleView" width="700.44pt">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <viewHandOver
        :row="rowSelect"
        :groupList="groupList"
        @sendAcceptOK="sendAcceptOK"
        @acceptOK="acceptOK"
      ></viewHandOver>
    </el-dialog>
    <div class="orderhcm-content">
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="HandOverList"
        @expand-change="expandRow"
        element-loading-text="Loading"
        border
        size="small"
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
              <el-table-column align="center" prop="No_" label="STT" width="95">
                <template slot-scope="scope"
                  >{{ scope.$index + 1 }}
                  <!-- <el-tooltip content="Duyệt" placement="top"
                    ><el-button @click="AcceptHandOver(scope.row)" type="text">
                      <i class="fas fa-check-double"></i></el-button
                  ></el-tooltip> -->
                </template>
              </el-table-column>

              <el-table-column label="Loại" width="150">
                <template slot-scope="scope">{{ scope.row.NameType }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Danh mục"
                align="center"
              >
                <template slot-scope="scope">{{ scope.row.HandOver }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Số lượng"
                align="center"
              >
                <template slot-scope="scope">{{ scope.row.Number }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Đơn vị"
                align="center"
              >
                <template slot-scope="scope">{{ scope.row.Unit }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Hiện trạng"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.CurrentStatus
                }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Người tiếp nhận"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.EmployeeNameNext
                }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="File"
                align="center"
              >
                <template slot-scope="scope" v-if="scope.row.LinkFile">
                  <el-link
                    :href="scope.row.UrlFile"
                    type="primary"
                    target="_blank"
                    >FILE</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="Trạng thái"
                width="150"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag :type="scope.row.Status | orderStatusColor">{{
                    scope.row.Status | orderStatusColor
                  }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="80px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * page_row }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Nhân viên" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              <span>{{ scope.row.EmployeeName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhóm" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhóm">
              <span>{{ scope.row.IDGroup }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hình thức" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hình thức">
              <span>{{ scope.row.TypeHandOver }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Lý do" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lý do">
              <span>{{ scope.row.Reason }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày xin nghỉ" align="center" width="120">
          <template slot-scope="scope" v-if="scope.row.DateStart">
            <span>{{
              Date.parse(scope.row.DateStart).toString("dd/MM/yyyy")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ngày bàn giao xong" align="center" width="150">
          <template slot-scope="scope" v-if="scope.row.DateEnd">
            <span>{{
              Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Người duyệt" width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người duyệt">
              <span>{{ scope.row.ManagerName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              <span>{{ scope.row.Comment }}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          label="Trạng thái"
          align="center"
          width="160px"
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
              <el-tag
                style="width:130px"
                :type="scope.row.Status | handOverStatusColor"
              >
                {{ scope.row.Status | handOverStatusText }}
              </el-tag>
              <p
                style="margin:0;font-size:10pt"
                v-if="scope.row.DetailEvaluate"
              >
                {{ scope.row.DetailEvaluate }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200px" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="">
              <el-button-group>
                <el-tooltip content="Xem chi tiết" placement="top"
                  ><el-button
                    @click="ViewHandOver(scope.row.RowID)"
                    type="primary"
                    size="mini"
                    icon="el-icon-view"
                  >
                  </el-button
                ></el-tooltip>
                <el-tooltip content="Chỉnh sửa" placement="top"
                  ><el-button
                    @click="EditHandOver(scope.row)"
                    type="warning"
                    size="mini"
                    icon="fas fa-edit"
                  >
                  </el-button
                ></el-tooltip>
                <el-tooltip content="Xác nhận" placement="top"
                  ><el-button
                    @click="AcceptHandOver(scope.row)"
                    size="mini"
                    type="success"
                  >
                    <i class="fas fa-check-double"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa" placement="top"
                  ><el-button
                    @click="DelHandOver(scope.row)"
                    type="danger"
                    size="mini"
                  >
                    <i class="fas fa-trash-alt"></i></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          class="pagination"
          style="padding:0;background-color:#fff;margin:0 1px"
          layout="-> , prev, pager, next"
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
import Cookies from "js-cookie";
import CreateHandOver from "@/views/handOver/component/CreateHandOver";
import AcceptLst from "@/views/handOver/component/acceptLst";
import DelHandOver from "@/views/handOver/component/DelHand";
import SendAccept from "@/views/handOver/component/SendAccept";
import ViewHandOver from "@/views/handOver/component/ViewHandOver";
import { getStartMonth, getEndMonth, getThreeMonth } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";
import { GetHandOver, GetHandOverLineLst } from "@/api/handOver";
import BASEURL from "@/utils/tUrl";
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
    AcceptLst,
    ViewHandOver,
    SendAccept,
    DelHandOver
  },
  data() {
    return {
      dialogVisibleCreate: false,
      dialogFormVisible: false,
      dialogVisibleAccept: false,
      dialogVisibleDel: false,
      dialogVisibleSendAccept: false,
      dialogVisibleView: false,
      titleDialog: "",
      startDate: getThreeMonth(),
      endDate: getEndMonth(),
      rowData: "",
      currentPage: 1,
      page_row: 10,
      total: 0,
      row: [],
      rowID: "",
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
      this.fetchData();
    },
    delOK() {
      this.dialogVisibleDel = false;
      this.fetchData();
    },
    sendAcceptOK() {
      this.dialogVisibleView = false;
      //this.fetchData();
    },
    createOK(val) {
      //console.log(val);
      this.fetchData();
      this.dialogVisibleCreate = false;
      this.ViewHandOver(val);
      //this.$router.push("/work/survey/80");
      //this.fetchData()
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
    createHand() {
      this.rowData = "";
      this.dialogVisibleCreate = true;
      this.titleDialog = "Tạo mới phiếu bàn giao";
    },
    AcceptHandOver(row) {
      this.rowID = row.RowID;
      this.dialogVisibleAccept = true;
      this.titleDialog = "Chi tiết phê duyệt phiếu bàn giao";
    },
    DelHandOver(row) {
      this.row = row;
      this.titleDialog = "Xóa phiếu bàn giao";
      this.dialogVisibleDel = true;
    },
    EditHandOver(row) {
      this.dialogVisibleCreate = true;
      this.titleDialog = "Chỉnh sửa phiếu bàn giao";
      this.rowData = row;
    },
    ViewHandOver(row) {
      this.titleDialog = "Chi tiết phiếu bàn giao";
      this.rowSelect = row;
      this.dialogVisibleView = true;
    },
    fetchData() {
      var req = {
        TimeStart: this.startDate,
        TimeEnd: this.endDate
      };
      this.listLoading = true;
      GetHandOver(req).then(response => {
        this.HandOverList = response.HandOverLst;
        this.listLoading = false;
      });
    },
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        const req = {
          DocumentID: row.RowID
        };
        GetHandOverLineLst(req).then(res => {
          this.obj = res.LineLst;
          row.lines = res.LineLst.map(item => {
            return {
              ...item,
              UrlFile:
                BASEURL +
                "/File/DownloadFileHandOver?LinkFile=" +
                item.LinkFile +
                "&Token=" +
                Cookies.get("token") +
                "&EmployeeID=" +
                Cookies.get("idEmployee")
            };
          });
        });
      }
    }
  },
  computed: {},
  created() {
    this.fetchGroup();
    this.fetchData();
  },
  watch: {
    startDate: function() {
      this.fetchData();
    },
    endDate: function() {
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
.handover-container {
  padding: 20px;
  background-color: $bg;
  min-height: 100vh;
  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
  }
  .header {
    width: 100%;
    background-color: #fff;
    margin-left: 1px;
    border-right: 2px solid rgb(236, 240, 241);
    padding: 10px;
  }
  .table-pagination {
    margin-top: 10px;
  }
}
</style>
