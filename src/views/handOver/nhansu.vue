<template>
  <div class="orderhcm-container">
    <div class="header">
      <div class="inline-block">
        <el-input
          placeholder="Tìm kiếm..."
          class="selectIDGroup"
          v-model="search"
          @keyup.enter.native="fetchData"
        ></el-input>
      </div>
      <div class="inline-block">
        <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="fetchData"
          >Tìm kiếm</el-button
        >
      </div>
      <div style="float:right">
        <el-date-picker
          v-model="startDate"
          size="small"
          type="date"
          placeholder="Từ ngày"
        >
        </el-date-picker>
        <el-date-picker
          v-model="endDate"
          size="small"
          type="date"
          placeholder="Đến ngày"
        >
        </el-date-picker>
        <el-button
          class="t-button"
          style="float:right"
          type="success"
          @click="ExportExcel"
          :loading="downloading"
          size="small"
          ><i class="fas fa-file-excel"></i> xuất Excel</el-button
        >
      </div>
      <div style="clear: both;"></div>
    </div>
    <el-dialog title="Tạo phiếu bàn giao" :visible.sync="dialogVisibleCreate">
      <createHandOver
        :groupList="groupList"
        @createOK="createOK"
      ></createHandOver>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibleAccept" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <acceptHandOver
        :row="row"
        :groupList="groupList"
        @acceptOK="acceptOK"
      ></acceptHandOver>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibleView" width="700.44pt">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <viewHandOver
        :accept="1"
        :row="rowSelect"
        :groupList="groupList"
        @sendAcceptOK="sendAcceptOK"
        @acceptOK="acceptOK"
      ></viewHandOver>
    </el-dialog>

    <div class="orderhcm-content">
      <el-table
        ref="handoverTable"
        class="el-mobile-table"
        v-loading="listLoading"
        :data="HandOverList"
        @expand-change="expandRow"
        element-loading-text="Loading"
        size="small"
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
              size="small"
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
        <el-table-column width="120px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * page_row }}
              <router-link :to="'xac-nhan/' + scope.row.RowID"
                ><el-tooltip content="Xem chi tiết" placement="top">
                  <el-button type="text">
                    <i class="far fa-eye"></i></el-button></el-tooltip
              ></router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhân viên" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              <span
                >{{ scope.row.EmployeeCode }} -
                {{ scope.row.EmployeeName }}</span
              >
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
            <div class="dat-cell" label="Ngày xin nghỉ">
              <span>{{
                Date.parse(scope.row.DateStart).toString("dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày bàn giao xong" align="center" width="150">
          <template slot-scope="scope" v-if="scope.row.DateEnd">
            <div class="dat-cell" label="Ngày bàn giao xong">
              <span>{{
                Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày tạo" align="center" width="150">
          <template slot-scope="scope" v-if="scope.row.Time">
            <div class="dat-cell" label="Ngày tạo">
              <span>{{
                Date.parse(scope.row.Time).toString("dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Người duyệt" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ManagerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.Comment }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="Trạng thái"
          align="center"
          width="150px"
          column-key="Status"
          prop="Status"
          :filters="[
            { text: 'Chờ duyệt', value: 2 },
            { text: 'Đã duyệt', value: 10 },
            { text: 'Không được duyệt', value: 3 },
            { text: 'Đã xong', value: 11 }
          ]"
          :filter-method="filterFire"
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
      </el-table>
      <div :class="{ hidden: hidden }">
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
import ViewHandOver from "@/views/handOver/component/ViewHandOver";
import { getStartMonth, getEndMonth, getThreeMonth } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";
import { GetHandOverNS, GetHandOverLineLst } from "@/api/handOver";
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
    ViewHandOver
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
      dialogVisibleView: false,
      dialogVisibleAccept: false,
      search: "",
      error: [],
      startDate: getThreeMonth(),
      endDate: getEndMonth(),
      currentPage: 1,
      page_row: 10,
      total: 0,
      rowData: [],
      row: [],
      groupList: [{}],

      rowSelect: "",
      obj: "",
      listLoading: false,
      downloading: false,
      HandOverList: [],
      titleDialog: ""
    };
  },
  methods: {
    filterFire(value, row) {
      return row.Status === value;
      // this.queryPara.filter = [];
      // var cols = this.$refs.handoverTable.columns;
      // console.log(cols);
      // var mapF = { Status: "Status" };
      // cols.forEach(e => {
      //   let prop = e["property"];
      //   let vals = e["filteredValue"];
      //   if (prop == "Status") {
      //     if (vals.length > 0) {
      //       console.log(vals);
      //     }
      //   }
      // });
      // this.fetchData();
    },
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
      this.fetchData();
    },
    ViewHandOver(row) {
      this.rowSelect = row;
      this.dialogVisibleView = true;
      this.titleDialog = "Chi tiết phiếu bàn giao";
    },
    createOK() {
      this.fetchData();
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
      this.dialogVisibleCreate = true;
    },
    fetchData() {
      var req = {
        TimeStart: this.startDate,
        TimeEnd: this.endDate,
        Search: this.search
      };
      this.listLoading = true;
      GetHandOverNS(req).then(response => {
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
                item.EmployeeID
            };
          });
          this.obj = res.LineLst;
        });
      }
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Nhân viên",
        "Số điện thoại",
        "Nhóm",
        "Hình thức",
        "Lý do",
        "Ngày xin nghỉ",
        "Ngày bàn giao xong",
        "Ngày tạo bàn giao",
        "Người duyệt",
        "Ghi chú",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "EmployeeID",
        "IDGroup",
        "TypeHandOver",
        "Reason",
        "DateStart",
        "DateEnd",
        "Time",
        "DetailEvaluate",
        "Comment",
        "Status"
      ];
      var data = this.HandOverList;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách bàn giao nghỉ việc từ " +
              Date.parse(this.startDate).toString("dd/MM/yyyy") +
              " đến " +
              Date.parse(this.endDate).toString("dd/MM/yyyy"), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.handOverStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
.orderhcm-container {
  padding: 20px;
  background-color: $bg;
  min-height: 100vh;
  .inline-block {
    display: inline-block;
  }
  .table-pagination {
    margin-top: 10px;
  }
  .header {
    width: 100%;
    background-color: #fff;
    margin-left: 1px;
    border-right: 2px solid rgb(236, 240, 241);
    padding: 10px;
  }
}
@media only screen and (max-width: 600px) {
  .inline-block {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
