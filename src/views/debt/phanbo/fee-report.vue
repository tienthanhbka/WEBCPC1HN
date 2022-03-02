<template>
  <div class="group-block">
    <!-- <div class="header-block">
      <div class="inline-block">
        <el-input
          class="input-custom"
          v-model="search"
          placeholder="Tìm kiếm..."
        ></el-input>
      </div>
      <div class="inline-block" style="margin-right:5px">
        <el-button
          icon="el-icon-search"
          @click="fetchData"
          type="primary"
          size="small"
          >Tìm kiếm</el-button
        >
      </div>
      <div class="inline-block">
        <el-button
          icon="fas fa-plus"
          type="primary"
          size="small"
          @click="create"
        >
          Tạo mới</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-date-picker
            v-model="dateStart"
            size="small"
            type="date"
            placeholder="Từ ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="dateEnd"
            size="small"
            type="date"
            placeholder="Đến ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
          >
            Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear:both;"></div>
    </div> -->
    <el-table
      size="small"
      v-loading="loadingTableData"
      :data="tableData"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
      @expand-change="expand"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row>
            <el-tooltip content="Tạo báo cáo" placement="top" effect="light"
              ><el-button @click="create(scope.row)" type="text">
                <i style="color: red" class="fas fa-plus"></i></el-button
            ></el-tooltip>
            <el-table
              :data="scope.row.lines"
              v-loading="loadingTableExpand"
              :header-row-style="{ color: '#16a085' }"
              size="small"
              border
              style="width: 100%"
            >
              <el-table-column prop="PeopleName" label="KH" width="200">
              </el-table-column>
              <el-table-column prop="PhoneNumber" label="SĐT" width="100">
              </el-table-column>
              <el-table-column prop="Email" label="Email" width="150">
              </el-table-column>

              <el-table-column prop="Position" label="Vị trí" width="120">
              </el-table-column>
              <el-table-column prop="TypeCharge" label="Mô" width="100">
              </el-table-column>
              <el-table-column prop="Charge" label="Chi trả" width="130">
                <template slot-scope="{ row }">
                  {{ row.Charge | toVND }}
                </template>
              </el-table-column>
              <el-table-column label="TG chi trả" width="100" align="center">
                <template slot-scope="{ row }">
                  {{ Date.parse(row.TimeCharge).toString("dd/MM/yyyy") }}
                </template>
              </el-table-column>
              <el-table-column prop="TypePay" label="Hình thức" width="100">
              </el-table-column>
              <el-table-column
                prop="AccountBank"
                label="TK"
                align="center"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="BankName"
                label="Ngân hàng"
                align="center"
                width="150"
              >
              </el-table-column>
              <el-table-column width="200px" label="Actions" align="center">
                <template slot-scope="prop">
                  <div class="dat-cell" label="Actions">
                    <el-button-group>
                      <el-tooltip
                        content="Chỉnh sửa"
                        placement="top"
                        effect="light"
                      >
                        <el-button
                          type="warning"
                          icon="el-icon-edit"
                          @click="edit(scope.row, prop.row)"
                          size="small"
                        ></el-button
                      ></el-tooltip>
                      <el-tooltip content="Xóa" placement="top" effect="light">
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          @click="del(scope.row, prop.row)"
                          size="small"
                        ></el-button
                      ></el-tooltip>
                    </el-button-group>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | ReportChargeStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | ReportChargeStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="280px" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="280px" label="Khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khách hàng">
            {{ scope.row.CustomerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Từ ngày">
        <template slot-scope="scope">
          <div class="dat-cell" label="Từ ngày" v-if="scope.row.TimeStart">
            {{ Date.parse(scope.row.TimeStart).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Đến ngày">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đến ngày" v-if="scope.row.TimeEnd">
            {{ Date.parse(scope.row.TimeEnd).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="SYT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SYT" v-if="scope.row.SYT">
            {{ scope.row.SYT }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="BH">
        <template slot-scope="scope">
          <div class="dat-cell" label="BH" v-if="scope.row.BH">
            {{ scope.row.BH }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="BS">
        <template slot-scope="scope">
          <div class="dat-cell" label="BS" v-if="scope.row.BS">
            {{ scope.row.BS }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="GH">
        <template slot-scope="scope">
          <div class="dat-cell" label="GH" v-if="scope.row.GH">
            {{ scope.row.GH }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="NT">
        <template slot-scope="scope">
          <div class="dat-cell" label="NT" v-if="scope.row.NT">
            {{ scope.row.NT }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="GD">
        <template slot-scope="scope">
          <div class="dat-cell" label="GD" v-if="scope.row.GD">
            {{ scope.row.GD }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="MKT">
        <template slot-scope="scope">
          <div class="dat-cell" label="MKT" v-if="scope.row.MKT">
            {{ scope.row.MKT }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="KT">
        <template slot-scope="scope">
          <div class="dat-cell" label="KT" v-if="scope.row.KT">
            {{ scope.row.KT }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="CTV">
        <template slot-scope="scope">
          <div class="dat-cell" label="CTV" v-if="scope.row.CTV">
            {{ scope.row.CTV }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="TD">
        <template slot-scope="scope">
          <div class="dat-cell" label="TD" v-if="scope.row.TD">
            {{ scope.row.TD }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú" v-if="scope.row.Note">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="200px" label="Actions" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <el-button-group>
              <el-tooltip content="Chi tiết" placement="top" effect="light">
                <el-button
                  type="primary"
                  @click="view(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  @click="edit(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span> {{ titleDialog }}</span>
      </h3>
      <fee-report-modal
        :row="rowData"
        :line="row"
        :mode="modeView"
        @createOK="createOK"
      ></fee-report-modal>
    </el-dialog>
  </div>
</template>

<script>
import { getStartMonth, getEndMonth } from "@/api/index";
import {
  GetReportCharge,
  GetReportChargeLine,
  DelReportCharge
} from "@/api/reportCharge";
import FeeReportModal from "./components/fee-report-modal";
export default {
  filters: {},
  components: { FeeReportModal },
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      loadingTableExpand: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      row: "",
      search: "",
      dateStart: getStartMonth(),
      dateEnd: getEndMonth(),
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    create(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo báo cáo chi trả";
      this.modeView = 1; //tạo mới
      this.rowData = row;
      this.row = {};
    },
    edit(row, line) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật báo cáo chi trả";
      this.modeView = 3; //cập nhật
      this.rowData = row;
      this.row = line;
    },
    createOK() {
      this.dialogFormCreate = false;
      this.expand(this.rowData);
      this.rowData.Status = 6;
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loadingTableData = true;
      GetReportCharge().then(res => {
        this.tableData = res.ReportChargeLst;
        this.loadingTableData = false;
      });
    },
    expand(row) {
      this.loadingTableExpand = true;
      GetReportChargeLine({ DocumentID: row.DocumentID }).then(res => {
        row.lines = res.ReportChargeLineLst;
        this.loadingTableExpand = false;
      });
    },
    del(row, line) {
      this.$confirm("Xóa báo cáo chi trả. Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            ID: line.RowID
          };
          DelReportCharge(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa báo cáo thành công",
                type: "success",
                position: "top-left"
              });
              this.expand(row);
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
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
