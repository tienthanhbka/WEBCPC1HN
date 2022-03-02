<template>
  <div>
    <div class="inline-block">
      <el-input
        size="small"
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
        @click="createSale"
      >
        Tạo mới</el-button
      >
    </div>
    <el-button
      type="danger"
      size="small"
      :loading="downloading"
      icon="el-icon-tickets"
      @click="getLastMonth"
    >
      Lấy tháng trước</el-button
    >
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          v-model="month"
          type="month"
          value-format="MM-yyyy"
          placeholder="Pick a month"
          value="2021-07"
          size="small"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="success"
          size="small"
          :loading="downloading"
          icon="fas fa-file-excel"
          @click="fetchDetailF"
        >
          Xuất Excel</el-button
        >
      </div>
    </div>
    <div style="clear:both;"></div>
    <div>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        style="width:100%"
        border
        show-summary
        fit
        highlight-current-row
        @expand-change="expanRow"
      >
        <el-table-column type="expand" width="75">
          <template slot-scope="scope">
            <el-row>
              <el-table
                :data="scope.row.lines"
                v-loading="lineLoading"
                size="small"
                border
                show-summary
                style="width: 100%"
              >
                <el-table-column align="center" label="STT" width="95">
                  <template slot-scope="props">
                    {{ props.$index + 1 }}
                    <el-tooltip content="Chỉnh sửa" placement="top">
                      <el-button
                        @click="editCall(scope.row, props.row)"
                        type="text"
                      >
                        <i class="fas fa-edit"></i> </el-button
                    ></el-tooltip>
                    <el-tooltip content="Xóa" placement="top">
                      <el-button
                        @click="delCall(scope.row, props.row)"
                        type="text"
                      >
                        <i
                          style="color: red"
                          class="fas fa-trash-alt"
                        ></i> </el-button
                    ></el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="KHCN" align="center" width="200">
                  <template slot-scope="props">
                    {{ props.row.CustomerName }}
                  </template>
                </el-table-column>
                <el-table-column label="SĐT" align="center" width="160">
                  <template slot-scope="props">
                    {{ props.row.PhoneNumber }}
                  </template>
                </el-table-column>
                <el-table-column label="Email" width="250">
                  <template slot-scope="props">
                    {{ props.row.Email }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="Tần suất (F)"
                  prop="QuantityCall"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="Ghi chú" min-width="200">
                  <template slot-scope="props">
                    {{ props.row.Note }}
                  </template>
                </el-table-column>
              </el-table>
              <el-tooltip content="Đăng kí KHCN" placement="top"
                ><el-button @click="createCall(scope.row)" type="text">
                  <i style="color: red" class="fas fa-plus"></i></el-button
              ></el-tooltip>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" label="STT" width="85">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Khách hàng" min-width="250">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Khách hàng">
              [{{ scope.row.PlaceID }}]-{{ scope.row.PlaceName }}
            </div></template
          >
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="Tần suất"
          width="100"
          prop="Frequency"
          align="center"
        >
          <template slot-scope="scope"
            ><div class="dat-cell" label="Tần suất">
              {{ scope.row.Frequency }}
            </div></template
          >
        </el-table-column>
        <el-table-column
          label="Doanh số dự kiến"
          width="150"
          align="center"
          prop="Sales"
        >
          <template slot-scope="scope"
            ><div class="dat-cell" label="Doanh số dự kiến">
              {{ scope.row.Sales | toVND }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Ghi chú" min-width="150">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div></template
          >
        </el-table-column>
        <el-table-column width="140px" label="Trạng thái" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                :type="scope.row.Status | oceStatusColor"
                style="width:120px"
                effect="plain"
                >{{ scope.row.Status | oceStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column width="170px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <el-button-group>
                <el-tooltip content="Chi tiết" placement="top" effect="light">
                  <el-button
                    type="primary"
                    @click="viewSale(scope.row)"
                    icon="el-icon-view"
                    size="small"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                  <el-button
                    type="warning"
                    icon="el-icon-edit"
                    @click="editSale(scope.row)"
                    size="small"
                  ></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa" placement="top" effect="light">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="delSale(scope.row)"
                    size="small"
                  ></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormSale" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span> {{ titleDialog }}</span>
        </h3>
        <modal-info-sale
          @createOK="createSaleOK"
          :row="rowSale"
          :places="places"
          :mode="modeViewSale"
          :month="month"
        ></modal-info-sale>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormCall" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span> {{ titleDialog }}</span>
        </h3>
        <modal-info-call
          @createOK="createCallOK"
          :row="rowCall"
          :headerF="rowSale"
          :customers="customers"
          :mode="modeViewCall"
          :totalCall="totalCall"
        ></modal-info-call>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  GetSaleF,
  GetCallF,
  DelSaleF,
  DelCallF,
  GetSetFDetail,
  GetSetFLastMonth
} from "@/api/oce";
import { getMonth } from "@/api/index";
import ModalInfoSale from "./component/modal-info-sale";
import ModalInfoCall from "./component/modal-info-call";
import { GetPlaceByUId } from "@/api/KDPlace";
import { TGetCustomerByPId } from "@/api/KDCustomer";
import { getIdUser, getToken } from "@/utils/auth";
export default {
  components: {
    ModalInfoSale,
    ModalInfoCall
  },
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
      lines: [],
      places: [],
      customers: [],
      dialogFormSale: false,
      dialogFormCall: false,
      downloading: false,
      titleDialog: "",
      rowSale: "",
      rowCall: "",
      search: "",
      obj: "",
      modeViewSale: 0,
      modeViewCall: 0,
      lineLoading: false,
      totalCall: 0,
      month: getMonth(),
      idEmployee: getIdUser(),
      token: getToken()
    };
  },
  methods: {
    createSale() {
      this.dialogFormSale = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeViewSale = 1; //tạo mới
      this.rowSale = null;
    },
    editSale(row) {
      this.dialogFormSale = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeViewSale = 2; //cập nhật
      this.rowSale = row;
    },
    viewSale(row) {
      this.dialogFormSale = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeViewSale = 3; //Xem chi tiết
      this.rowSale = row;
    },
    createCall(header) {
      this.dialogFormCall = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeViewCall = 1; //tạo mới
      this.rowSale = header;
      this.rowCall = null;
    },
    editCall(header, row) {
      this.dialogFormCall = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeViewCall = 2; //cập nhật
      this.rowCall = row;
      this.rowSale = header;
    },
    viewCall(header, row) {
      this.dialogFormCall = true;
      this.titleDialog = "Chi tiết phiếu";
      this.modeViewCall = 3; //Xem chi tiết
      this.rowCall = row;
      this.rowSale = header;
    },
    delSale(row) {
      this.$confirm(
        "Xóa phiếu đăng kí F " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            OCEHeader: row.OCE_Header
          };
          DelSaleF(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    delCall(header, row) {
      this.$confirm(
        "Xóa phiếu đăng kí F " + row.CustomerName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID
          };
          DelCallF(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.expanRow(header);
            }
          });
        })
        .catch(() => {});
    },
    expanRow(row, expandedRows) {
      this.lineLoading = true;
      GetCallF({ OCEHeader: row.OCE_Header }).then(res => {
        if (res.RespCode == 0) {
          row.lines = res.CallFLst;
          this.lineLoading = false;
          let total = 0;
          if (res.CallFLst.length == 1) {
            total = res.CallFLst[0].QuantityCall;
          }
          if (res.CallFLst.length > 1) {
            res.CallFLst.forEach(element => {
              total += element.QuantityCall;
            });
          }
          this.totalCall = row.Frequency - total;
        }
      });
      this.fetchCustomer(row.PlaceID);
    },
    fetchData() {
      this.listLoading = true;
      const req = {
        EmployeeID: this.idEmployee,
        Month: Date.parse(this.month).toString("MM"),
        Year: Date.parse(this.month).toString("yyyy"),
        Search: this.search
      };
      GetSaleF(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.SaleFLst;
          this.listLoading = false;
        }
      });
    },
    fetchPlace() {
      const req = {
        Token: this.token,
        UserName: this.idEmployee
      };
      GetPlaceByUId(req).then(res => {
        if (res.RespCode == 0) {
          this.places = res.PlaceLst;
        }
      });
    },
    fetchCustomer(place) {
      TGetCustomerByPId({ PlaceId: place }).then(res => {
        if (res.RespCode == 0) {
          let arr = [];
          res.CustomerLst.forEach(element => {
            if (element.CreatorId == getIdUser()) {
              arr.push(element);
            }
          });
          this.customers = arr;
        }
      });
    },
    createSaleOK() {
      this.dialogFormSale = false;
      this.fetchData();
    },
    createCallOK() {
      this.dialogFormCall = false;
      this.expanRow(this.rowSale);
    },
    getLastMonth() {
      this.$confirm(
        "Hệ thống sẽ xóa đăng kí hiện tại và thực hiện cập nhật tháng " +
          this.month +
          ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      ).then(() => {
        this.downloading = true;
        GetSetFLastMonth().then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
              position: "top-left"
            });
            this.downloading = false;
            this.fetchData();
          }
        });
      });
    },
    fetchDetailF() {
      const req = {
        EmployeeID: this.idEmployee,
        Month: Date.parse(this.month).toString("MM"),
        Year: Date.parse(this.month).toString("yyyy")
      };
      GetSetFDetail(req).then(res => {
        if (res.RespCode == 0) {
          this.exportExcel(res.DetailLst);
        }
      });
    },
    exportExcel(data) {
      this.downloading = true;
      const tHeader = [
        "Mã phiếu",
        "Mã KHTC",
        "KHTC",
        "Địa bàn",
        "Tần suất",
        "Doanh số dự kiến",
        "Ghi chú TC",
        "Mã KHCN",
        "Khách hàng",
        "SĐT",
        "Email",
        "Tần suất",
        "Ghi chú CN"
      ];
      const filterHeader = [
        "OCE_Header",
        "PlaceID",
        "PlaceName",
        "AddrLv1",
        "Frequency",
        "Sales",
        "NoteTC",
        "CustomerID",
        "CustomerName",
        "PhoneNumber",
        "Email",
        "QuantityCall",
        "NoteCN"
      ];
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách kế hoạch checkcall " + this.month, //Optional
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
    month() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
    this.fetchPlace();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
