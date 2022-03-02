<template>
  <div>
    <el-dialog
      :title="type == 'TH' ? 'Phiếu đề xuất Thầu' : 'Phiếu đề xuất Kê đơn'"
      :visible.sync="modalVisible"
      custom-class="modal-class"
    >
      <th-modal
        @newCoupon="onNewCoupon"
        :visible="modalVisible"
        :coupon="currentEditCoupon"
        @closeModal="modalVisible = false"
        :type="type"
      ></th-modal>
    </el-dialog>
    <el-dialog
      title="Dự án"
      :visible.sync="prjectModalVisible"
      custom-class="modal-class"
    >
      <project-modal-content
        @projectAdded="onProjectAdded"
        :coupon="this.curCoupon"
        @closeModal="prjectModalVisible = false"
      ></project-modal-content>
    </el-dialog>
    <el-dialog
      title="Nhập Excel"
      :visible.sync="excelModalVisible"
      custom-class="modal-class-tableview"
    >
      <excel-modal-content :type="type"></excel-modal-content>
    </el-dialog>
    <el-dialog
      title="Bảng phân bổ"
      :visible.sync="tableViewModalVisible"
      custom-class="modal-class-tableview"
    >
      <table-view-modal-content
        :isGroupPage="isGroupPage"
        :idGroup="currentGroup"
        @Updated="OnUpdated"
        :type="type"
        :selectedCoupons="selectedCoupons"
        :tableViewModalVisible="tableViewModalVisible"
      ></table-view-modal-content>
    </el-dialog>
    <el-dialog
      title="Sản phẩm"
      :visible.sync="itemModalVisible"
      custom-class="modal-class"
    >
      <item-modal-content
        :coupon="curCoupon"
        :project="curProject"
        @closeModal="itemModalVisible = false"
      ></item-modal-content>
    </el-dialog>
    <div>
      <el-select
        v-if="isGroupPage"
        v-model="currentGroup"
        placeholder="Chọn nhóm"
      >
        <el-option
          v-for="item in groupLst"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
          <span style="float: left">{{ item.idGroup }}</span>
          <span style="float: right; color: #ff7675; font-size: 13px">{{
            item.numNew
          }}</span></el-option
        >
      </el-select>
      <el-input
        style="width:200px"
        v-model="search"
        type="text"
        placeholder="Mã KH | Tên KH | Tên NV"
      ></el-input>

      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="inline-block"
        @click="fetchData"
      ></el-button>
      <el-button
        style="margin-left:0px"
        @click="OpenTHModal"
        type="warning"
        icon="el-icon-circle-plus-outline"
        class="inline-block"
        >Phiếu mới</el-button
      >
      <el-button
        style="margin-left:0px"
        @click="tableViewModalVisible = true"
        type="primary"
        class="inline-block"
      >
        <i class="fas fa-table"></i> Xem dạng bảng
      </el-button>
      <el-button
        style="margin-left:0px"
        @click="ExportExcel"
        type="success"
        class="inline-block"
      >
        <i class="fas fa-file-download"></i> Xuất Excel
        <i v-if="downloadingFile" class="el-icon-loading"></i>
      </el-button>
      <el-button
        style="margin-left:0px"
        @click="excelModalVisible = true"
        type="success"
        class="inline-block"
      >
        <i class="fas fa-file-upload"></i> Nhập từ excel
      </el-button>
      <el-tooltip content="Xem hướng dân">
        <a
          href="https://docs.google.com/presentation/d/1WfbWdX6OjaZUZsLlm1gkBPvt80z_nkIehx9io9LDW8s/edit#slide=id.g617858ad81_0_10"
          target="_blank"
        >
          <el-button size="small" type="primary" circle=""
            ><i class="fas fa-question"></i
          ></el-button>
        </a>
      </el-tooltip>
    </div>
    <div>
      <el-table
        :data="tableData"
        v-loading="isLoading"
        :max-height="tableHeight"
        fit
        :header-row-style="{ color: '#2f3640' }"
        style="width: 100%"
        @expand-change="expandRow"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <th-projects-c
              :isGroupPage="isGroupPage"
              v-if="scope.row.type == 'TH' || scope.row.type == 'AT'"
              type="TH"
              :phanboCoupon="scope.row"
              @openProjectModal="onOpenProjectModal"
              @openItemModal="onOpenItemModal"
            ></th-projects-c>
            <item
              :type="type"
              :isGroupPage="isGroupPage"
              :phanboCoupon="scope.row"
              @addItemClicked="onOpenItemModal"
              v-else
            ></item>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" width="97px" label="STT">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-popover
              placement="top-start"
              trigger="hover"
              v-if="scope.row.status != 10"
            >
              <div>
                <el-button
                  style="color:#f1c40f"
                  type="text"
                  size="medium"
                  icon="el-icon-edit"
                  @click="editCoupon(scope.row)"
                  >Sửa</el-button
                >

                <el-button
                  v-if="
                    scope.row.status != 10 &&
                      scope.row.status != 1 &&
                      scope.row.group &&
                      scope.row.group.status >= 2
                  "
                  style="color:#e17055"
                  type="text"
                  size="medium"
                  @click="pauseCoupon(scope.row)"
                >
                  <i class="fas fa-pause"></i> Treo
                </el-button>
                <el-button
                  v-if="
                    scope.row.status != 10 &&
                      (scope.row.status == 1 ||
                        (scope.row.status < 7 && scope.row.lv == 2) ||
                        (scope.row.status < 9 && scope.row.lv == 3))
                  "
                  style="color:#c0392b"
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  @click="deleteCoupon(scope.row)"
                  >Xóa</el-button
                >
                <el-button
                  v-if="scope.row.group && scope.row.group.status >= 2"
                  style="color:#00b894"
                  type="text"
                  size="medium"
                  icon="el-icon-check"
                  @click="approveCoupon(scope.row)"
                  >Duyệt phiếu</el-button
                >
              </div>
              <el-button
                style="color:#2980b9"
                type="text"
                size="medium"
                icon="el-icon-s-operation"
                slot="reference"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="KH" label="KH" min-width="140" align="center">
          <template slot-scope="scope">{{ scope.row.idCustomer }}</template>
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="Loại"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="Người tạo"
          width="140"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="Ghi chú"
          min-width="140"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <el-table-column width="110" label="Ngày tạo">
          <template slot-scope="{ row }">{{
            row.CreateDate
              ? Date.parse(row.CreateDate).toString("dd/MM/yyyy")
              : ""
          }}</template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="120" align="center">
          <template slot-scope="{ row }">
            <el-tag slot="reference" :type="row.status | phanBoStatusColor">
              <i class="fas fa-info"></i>
              {{ row.status | phanBoStatusText }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="dataLength"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import ThModal from "./components/th-modal";
import ThProjectsC from "./th-projects-c";
import Item from "./item";
import TypeCus from "./const";
import ProjectModalContent from "./components/project-modal-content";
import ItemModalContent from "./components/item-modal-content";
import ExcelModalContent from "./components/excel-modal-content";
import TableViewModalContent from "./components/tableview-modal-content.vue";

import {
  GetCommissionOrderHeader,
  GetCommissionOrderHeaderByIdGroup,
  GetPhanBoCouponReport,
  ChangeStatusCommissionOrderHeader,
  GetListGroupAdminWithCMHInfo
} from "@/api/debt";
export default {
  components: {
    ThModal,
    ThProjectsC,
    ProjectModalContent,
    ItemModalContent,
    Item,
    ExcelModalContent,
    TableViewModalContent
  },
  data() {
    return {
      excelModalVisible: false,
      type: "",
      modalVisible: false,
      tableViewModalVisible: null,
      prjectModalVisible: false,
      itemModalVisible: false,
      isGroupPage: false,
      cardNumber: "",
      curCoupon: null,
      curCouponP: null,
      curProject: null,
      groupLst: [],
      currentGroup: null,
      search: null,
      tableHeight: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      isLoading: false,
      dataLength: 1,
      isExporting: false,
      selectedCoupons: [],
      currentEditCoupon: null,
      downloadingFile: false
    };
  },
  watch: {
    currentGroup() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  },
  created() {
    this.$store.state.app.sidebar.opened = false;
    if (this.$router.currentRoute.path.includes("/debt/phanbo/duyet")) {
      this.isGroupPage = true;
    }
    if (this.$router.currentRoute.path.includes("thau")) {
      this.type = "TH";
    } else {
      this.type = "KD";
    }
    if (this.isGroupPage) {
      GetListGroupAdminWithCMHInfo({
        type: this.type
      }).then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    }
    this.fetchData();
  },
  mounted() {
    this.tableViewModalVisible = false;
  },
  computed: {
    cols: function() {
      return TypeCus[this.type].map(function(i) {
        return i["col"];
      });
    }
  },

  methods: {
    ExportExcel() {
      var rows = [];
      this.selectedCoupons.forEach(e => {
        rows.push(e.RowID);
      });
      this.downloadingFile = true;
      GetPhanBoCouponReport({
        rows: rows,
        type: this.type
      }).then(res => {
        this.downloadingFile = false;
        this.exportEXL(res.Data);
      });
    },
    exportEXL(data) {
      data.push({
        headerPID: "Hướng dẫn",
        RowID: "Hướng dẫn",
        idCustomer:
          "dữ liệu số chỉ gồm chữ số và dấu chấm '.' để ngăn cách phần thập phân và phần nguyên VD: 0.54, 1.02, 1,.."
      });
      data.push({
        headerPID: "Hướng dẫn",
        RowID: "Hướng dẫn",
        idCustomer:
          "Dữ liệu ngày tháng là text ở dạng yyyy-MM-dd VD: 2019-01-23"
      });
      var tHeader = [];
      var filterVal = [];
      if (this.type == "TH") {
        tHeader = [
          "Chữ ký",
          "Loại",
          "MS",
          "Mã KH",
          "Tên KH",
          "Mã dự án",
          "Tên dự án",
          "Mã SP",
          "Tên SP",
          "DV",
          "Đơn giá"
        ].concat(
          TypeCus.TH.map(function(i) {
            return i["text"];
          })
        );
        filterVal = [
          "signature",
          "type",
          "RowID",
          "idCustomer",
          "CusName",
          "ProjectNo",
          "PName",
          "idProduct",
          "Name",
          "Unit",
          "Unit Price"
        ].concat(
          TypeCus.TH.map(function(i) {
            return i["col"];
          })
        );
      } else {
        tHeader = [
          "Chữ ký",
          "Loại",
          "MS",
          "Mã KH",
          "Tên KH",
          "Mã SP",
          "Tên SP",
          "DV",
          "Đơn giá"
        ].concat(
          TypeCus.KD.map(function(i) {
            return i["text"];
          })
        );
        filterVal = [
          "signature",
          "type",
          "RowID",
          "idCustomer",
          "CusName",
          "idProduct",
          "Name",
          "Unit",
          "Unit Price"
        ].concat(
          TypeCus.KD.map(function(i) {
            return i["col"];
          })
        );
      }

      var data2 = this.formatJson(filterVal, data);

      var self = this;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename: "Đề xuất phân bổ " + self.type, //Optional
          autoWidth: true, //Optional
          bookType: "xlsx" //Optional
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      if (this.type == "TH") {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (this.cols.indexOf(j) > -1) {
              return v[j] == null || Number(v[j]) == 0 ? null : Number(v[j]);
            } else {
              return v[j];
            }
          })
        );
      } else {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j == "DateStart" || j == "DateEnd") {
              if (v[j] != null) return Date.parse(v[j]).toString("yyyy-MM-dd");
            } else if (this.cols.indexOf(j) > -1) {
              return v[j] == null || Number(v[j]) == 0 ? null : Number(v[j]);
            } else {
              return v[j];
            }
          })
        );
      }
    },
    OnUpdated() {
      this.fetchData();
      // this.tableData.forEach(e => {
      //   e.projects = null;
      // });
    },
    onProjectAdded(e) {
      if (this.curCoupon.projects == null) {
        this.curCoupon.projects = [];
      }
      this.curCoupon.projects.unshift(e);
    },
    onOpenProjectModal(p) {
      this.prjectModalVisible = true;
      this.curCoupon = p;
    },
    onOpenItemModal(c, p) {
      this.curProject = p;
      this.curCoupon = c;
      this.itemModalVisible = true;
    },
    OpenTHModal() {
      this.currentEditCoupon = null;
      this.modalVisible = true;
    },
    editCoupon(row) {
      if (true) {
        this.currentEditCoupon = row;
        this.modalVisible = true;
      } else {
        this.$message({
          message: "Không thể sửa phiếu này",
          type: "error"
        });
      }
    },
    deleteCoupon(row) {
      this.$confirm("Bạn có muốn xóa phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        ChangeStatusCommissionOrderHeader({ rowID: row.RowID, status: 0 }).then(
          res => {
            row.status = 0;
          }
        );
      });
    },
    fetchData() {
      var req = { type: this.type, search: this.search };
      req.PageNumber = this.currentPage;
      req.RowspPage = this.pageSize;
      if (this.isGroupPage) {
        if (this.currentGroup != null && this.currentGroup != "") {
          req.idGroup = this.currentGroup;

          this.isLoading = true;
          GetCommissionOrderHeaderByIdGroup(req).then(res => {
            this.isLoading = false;
            this.dataLength = res.TotalRows;
            res.Data.forEach(e => {
              if (e.type == "TH") {
                e.projects = null;
              } else {
                e.items = null;
              }
            });
            this.tableData = res.Data;
          });
        }
      } else {
        this.isLoading = true;
        GetCommissionOrderHeader(req).then(res => {
          this.isLoading = false;
          this.dataLength = res.TotalRows;
          res.Data.forEach(e => {
            if (e.type == "TH") {
              e.projects = null;
            } else {
              e.items = null;
            }
          });
          this.tableData = res.Data;
        });
      }
    },
    onNewCoupon(data) {
      data.items = null;
      data.projects = null;
      this.tableData.unshift(data);
      this.modalVisible = false;
    },
    expandRow() {},
    handleSelectionChange(val) {
      this.selectedCoupons = val;
    }
  }
};
</script>
<style>
.modal-class {
  max-width: 960px;
  width: 98%;
}
.modal-class-xlx {
  max-width: 1280px;
  width: 98%;
  margin-top: 15px !important;
}
.modal-class-tableview {
  width: 98%;
  margin-top: 15px !important;
}

.el-input-number.is-controls-right .el-input__inner {
  padding-left: 0px;
  padding-right: 0px;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  width: 14px;
  font-size: 12px;
}
</style>
