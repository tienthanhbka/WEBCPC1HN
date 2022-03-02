<template>
  <div>
    <div class="inline-block">
      <el-input
        size="small"
        class="input-custom"
        v-model="search"
        placeholder="Nhân viên | Khách hàng..."
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
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          v-model="dateStart"
          size="small"
          type="date"
          placeholder="Từ ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-date-picker
          v-model="dateEnd"
          size="small"
          type="date"
          placeholder="Đến ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="success"
          @click="exportExcel"
          :loading="downloading"
          size="small"
          ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
        >
      </div>
    </div>
    <div style="clear:both"></div>
    <div>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        style="width:100%"
        size="small"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="expand" width="75">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.ConsignmentLineLst"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="STT" width="95">
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="Mã sản phẩm" align="center" width="200">
                <template slot-scope="props">
                  {{ props.row.ProductID }}
                </template>
              </el-table-column>
              <el-table-column label="Tên sản phẩm" min-width="160">
                <template slot-scope="props">
                  {{ props.row.ProductName }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng" width="110" align="center">
                <template slot-scope="props">
                  {{ props.row.Quantity }}
                </template>
              </el-table-column>
              <el-table-column label="ĐTV" width="110" align="center">
                <template slot-scope="props">
                  {{ props.row.Unit }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="STT" width="125">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}

              <el-button-group>
                <el-tooltip content="Chi tiết" placement="top" effect="light">
                  <el-button
                    type="primary"
                    @click="view(scope.row)"
                    icon="el-icon-view"
                    size="mini"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Phê duyệt" placement="top" effect="light">
                  <el-button
                    type="success"
                    icon="fas fa-check"
                    @click="accept(scope.row)"
                    size="mini"
                  ></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhân viên" width="190">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Nhân viên">
              {{ scope.row.EmployeeName }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Nhóm" width="200">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Nhóm">
              {{ scope.row.GroupID }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Khách hàng" min-width="250">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Khách hàng">
              [{{ scope.row.PlaceID }}]-{{ scope.row.PlaceName }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Từ ngày" width="100" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Từ ngày">
              {{ scope.row.DateStart }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Đến ngày" width="100" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Đến ngày">
              {{ scope.row.DateEnd }}
            </div></template
          >
        </el-table-column>

        <el-table-column label="Ghi chú" width="150">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div></template
          >
        </el-table-column>
        <el-table-column width="120px" label="Trạng thái" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                :type="scope.row.Status | oceStatusColor"
                style="width:105px"
                effect="plain"
                >{{ scope.row.Status | oceStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogForm" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span> {{ titleDialog }}</span>
        </h3>
        <modal-info
          @createOK="createOK"
          @closeOK="closeOK"
          :row="rowData"
          :mode="modeView"
        ></modal-info>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetConsignmentByAdmin } from "@/api/order";
import { getStartMonth, getEndMonth } from "@/api/index";
import ModalInfo from "./component/modal-info";

export default {
  components: {
    ModalInfo
  },
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
      dateStart: getStartMonth(),
      dateEnd: getEndMonth(),
      dialogForm: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      modeView: 0
    };
  },
  methods: {
    accept(row) {
      this.dialogForm = true;
      this.titleDialog = "Phê duyệt phiếu";
      this.modeView = 4; //Phê duyệt
      this.rowData = row;
    },
    view(row) {
      this.dialogForm = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeView = 3; //Xem chi tiết
      this.rowData = row;
    },
    createOK() {
      this.dialogForm = false;
      this.fetchData();
    },
    closeOK() {
      this.dialogForm = false;
    },
    fetchData() {
      this.listLoading = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd,
        Search: this.search
      };
      GetConsignmentByAdmin(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ConsignmentLst;
          this.listLoading = false;
        }
      });
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã phiếu",
        "Nhân viên",
        "SĐT",
        "Nhóm",
        "Mã KH",
        "KH",
        "Từ ngày",
        "Đến ngày",
        "Ghi chú",
        "Trạng thái",
        "Thời gian tạo",
        "Người duyệt",
        "Thời gian duyệt"
      ];
      const filterHeader = [
        "HeaderID",
        "EmployeeName",
        "Creater",
        "GroupID",
        "PlaceID",
        "PlaceName",
        "DateStart",
        "DateEnd",
        "Note",
        "Status",
        "TimeCreate",
        "AcceptName",
        "TimeAccept"
      ];
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, this.tableData),
            filename:
              "Danh sách phiếu gửi hàng từ " +
              Date.parse(this.dateStart).toString("dd/MM/yyyy") +
              " đến " +
              Date.parse(this.dateEnd).toString("dd/MM/yyyy"), //Optional
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
            return this.$options.filters.oceStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {},
  mounted() {},
  watch: {
    dateStart() {
      this.fetchData();
    },
    dateEnd() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
