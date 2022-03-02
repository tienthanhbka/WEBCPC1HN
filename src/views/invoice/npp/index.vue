<template>
  <div>
    <div class="inline-block">
      <el-input
        size="small"
        v-model="search"
        placeholder="Mã HĐ | Tên KH"
      ></el-input>
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          v-model="startDate"
          type="date"
          size="small"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-date-picker
          v-model="endDate"
          type="date"
          size="small"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="success"
          icon="fas fa-file-excel"
          size="small"
          @click="exportExcel"
          :loading="downloading"
        >
          Xuất Excel</el-button
        >
      </div>
    </div>
    <div style="clear:both;"></div>
    <div class="orderhcm-content">
      <el-table
        v-loading="listLoading"
        :data="
          tableData.filter(
            data =>
              !search ||
              data.IDHeader.toLowerCase().includes(search.toLowerCase()) ||
              data.CustomerName.toLowerCase().includes(search.toLowerCase())
          )
        "
        element-loading-text="Loading"
        @expand-change="expandRow"
        border
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <p><b>Chi tiết đặt hàng</b></p>
            <el-table
              :data="scope.row.lines"
              v-model="rowNow"
              border
              v-loading="scope.row.isLoading"
              element-loading-text="Loading"
            >
              <el-table-column
                prop="ProductID"
                label="Mã"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="ProductName"
                label="Tên"
                width="230"
              ></el-table-column>
              <el-table-column
                prop="Quantity"
                label="Số lượng"
                width="110"
                align="center"
              >
                <template slot-scope="props">
                  <span>{{ props.row.Quantity | quantity }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="UnitOfMeasure"
                label="Đơn vị"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column prop="UnitPrice" label="Giá" width="120">
                <template slot-scope="props">
                  <span>{{ props.row.UnitPrice | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="VAT" label="VAT" width="90" align="center">
                <template slot-scope="props">
                  <span>{{ props.row.VAT }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Amount" label="Thành tiền" width="160">
                <template slot-scope="props">
                  <span>{{ props.row.Amount | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="AmountIncludingVAT"
                label="Thành tiền(VAT)"
                width="180"
              >
                <template slot-scope="props">
                  <span>{{ props.row.AmountIncludingVAT | toVND }}</span>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center">
                <template slot-scope="props">
                  <el-tooltip content="Chuyển sales" effect="light">
                    <el-popover placement="top" width="200" trigger="click">
                      <el-select
                        v-model="emName"
                        @change="selectEm"
                        placeholder="Chọn nhân viên..."
                        filterable
                        clearable
                        size="small"
                        style="width:100%"
                      >
                        <el-option
                          v-for="(item, index) in emLst"
                          :key="index"
                          :label="item.EmployeeName"
                          :value="item"
                        >
                          <span style="float: left">{{
                            item.EmployeeName
                          }}</span>
                          <span
                            style="float: right; color: #8492a6; font-size: 10px"
                            >{{ item.EmployeeCode }}</span
                          >
                        </el-option>
                      </el-select>
                      <div style="text-align:center;padding:5px">
                        <el-button
                          type="success"
                          size="small"
                          @click="submit(scope.row, props.row)"
                          >Xác nhận</el-button
                        >
                      </div>
                      <el-button
                        type="text"
                        icon="fas fa-exchange-alt"
                        slot="reference"
                      ></el-button>
                    </el-popover>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="Mã" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.IDHeader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ngày hóa đơn" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.PostingDate | toDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Kiểu mua" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.SaleType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="KH" min-width="200">
          <template slot-scope="scope">
            <span
              >{{ scope.row.CustomerID }} - {{ scope.row.CustomerName }}</span
            >
          </template>
        </el-table-column>

        <el-table-column label="Người nhận" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.CustomerContact }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Ghi chú" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.Note }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  GetSalesHeaderByEm,
  GetSalesLineByIDHeader,
  TransferSalesLineForEm
} from "@/api/npp";
import { getStartDate, getEndDate } from "@/api/index";
import { GetEmployeeLst } from "@/api/employeeNote";
export default {
  components: {},
  filters: {
    quantity(amount) {
      var splitted = parseInt(amount);
      return splitted;
    }
  },
  data() {
    return {
      search: "",
      startDate: getStartDate(),
      endDate: getEndDate(),
      listLoading: false,
      downloading: false,
      tableData: [],
      emLst: [],
      rowNow: "",
      emID: "",
      emCode: "",
      emName: ""
    };
  },
  methods: {
    fetchData() {
      this.listLoading = true;

      var req = {
        TimeStart: this.startDate,
        TimeEnd: this.endDate
      };

      GetSalesHeaderByEm(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.SalesHeaderLst;
          this.listLoading = false;
        }
      });
    },
    fetchEmLst() {
      GetEmployeeLst().then(response => {
        this.emLst = response.EmployeeLst;
      });
    },
    selectEm(val) {
      this.emName = val.EmployeeName;
      this.emID = val.EmployeeID;
      this.emCode = val.EmployeeCode;
    },
    expandRow(row, isRefresh) {
      if (row.lines == null || isRefresh != 0) {
        row.isLoading = true;
        GetSalesLineByIDHeader({
          IDHeader: row.IDHeader
        }).then(res => {
          if (res.RespCode == 0) {
            row.lines = res.SalesLineLst;
            this.rowNow = res.SalesLineLst;
          }
        });
        row.isLoading = false;
      }
    },
    submit(header, row) {
      this.$confirm(
        "Xác nhận chuyển sales " +
          row.ProductName +
          " thuộc đơn hàng " +
          row.IDHeader +
          " sang " +
          this.emName +
          "-" +
          this.emCode +
          ". Bấm xác nhận để tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      ).then(() => {
        const req = {
          EmployeeID: this.emID,
          ID: row.RowID
        };
        TransferSalesLineForEm(req).then(res => {
          if (res.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Gán Sales thành công",
              type: "success",
              position: "top-left"
            });
            this.emID = "";
            this.emName = "";
            this.emCode = "";
            this.expandRow(header, 1);
          }
        });
      });
    },
    exportExcel() {}
  },
  computed: {},
  created() {
    this.fetchData();
    this.fetchEmLst();
  },
  watch: {
    startDate() {
      this.fetchData();
    },
    endDate() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px 5px 5px 0;
}
</style>
