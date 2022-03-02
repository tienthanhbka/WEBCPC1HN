<template>
  <div>
    <div class="inline-block">
      <el-select
        v-model="currentGroup"
        clearable
        style="width:100%"
        placeholder="Chọn nhóm"
        size="small"
        @change="selectGroup"
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
      <el-select
        v-model="currentEmployee"
        style="width:100%;"
        placeholder="Chọn nhân viên"
        size="small"
      >
        <el-option
          v-for="item in employeeList"
          :key="item.idEmployee"
          :label="item.nameEmployee"
          :value="item.idEmployee"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-button
        type="danger"
        size="small"
        :loading="downloading"
        icon="el-icon-circle-check"
        @click="acceptAll"
      >
        Duyệt tất cả</el-button
      >
    </div>
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
                border
                size="small"
                show-summary
                style="width: 100%"
              >
                <el-table-column align="center" label="STT" width="95">
                  <template slot-scope="props">
                    {{ props.$index + 1 }}
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
        <el-table-column align="center" label="STT" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip
                :content="scope.row.Status == 3 ? 'Mở chỉnh sửa' : 'Phê duyệt'"
                effect="light"
                placement="top"
                ><el-button
                  @click="accept(scope.row)"
                  plain
                  :type="scope.row.Status == 3 ? 'danger' : 'success'"
                  size="small"
                  icon="el-icon-check"
                >
                  <span v-if="scope.row.Status == 3">Mở phiếu</span>
                  <span v-else>Duyệt</span>
                </el-button></el-tooltip
              >
            </div>
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
      </el-table>
    </div>
  </div>
</template>
<script>
import { GetSaleF, GetCallF, GetSetFDetail, AcceptSaleF } from "@/api/oce";
import { getMonth } from "@/api/index";
import { getIdUser, getToken } from "@/utils/auth";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/appview";
export default {
  components: {},
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
      lines: [],

      groupList: [],
      employeeList: [],

      downloading: false,

      search: "",
      currentEmployee: "",
      currentGroup: "",
      lineLoading: false,
      totalCall: 0,
      month: getMonth(),
      idEmployee: getIdUser(),
      token: getToken()
    };
  },
  methods: {
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
        EmployeeID: this.currentEmployee
          ? this.currentEmployee
          : this.idEmployee,
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

    fetchGroup() {
      const req = {
        idEmployee: getIdUser(),
        token: getToken()
      };
      GetListGroupAdminByToken(req).then(response => {
        if (response.ResCode == 0) {
          this.groupList = response.Data;
        }
      });
    },
    selectGroup(val) {
      this.currentEmployee = "";
      const req = {
        idGroup: val,
        token: getToken()
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.employeeList = res.Data;
          this.currentEmployee = this.employeeList[0].idEmployee;
        }
      });
    },
    fetchDetailF() {
      if (!this.currentEmployee) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Bạn chưa chọn nhân viên",
          type: "error",
          position: "top-left"
        });
      }
      const req = {
        EmployeeID: this.currentEmployee,
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
            filename:
              "Danh sách kế hoạch checkcall " +
              this.currentEmployee +
              " " +
              this.month, //Optional
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
    },
    accept(val) {
      this.$confirm(
        "Xác nhận phê duyệt đăng kí F KH " + val.PlaceName,
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "success"
        }
      )
        .then(() => {
          const req = {
            OCEHeader: val.OCE_Header,
            EmployeeID: this.currentEmployee,
            Status: val.Status == 3 ? 1 : 3
          };
          AcceptSaleF(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xác nhận phiếu thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    acceptAll() {
      if (!this.currentEmployee) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Bạn chưa chọn nhân viên",
          type: "error",
          position: "top-left"
        });
        return;
      }
      if (this.tableData.length < 1) return;
      this.$confirm(
        "Xác nhận phê duyệt đăng kí F của " + this.currentEmployee,
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "success"
        }
      )
        .then(() => {
          this.tableData.forEach(element => {
            const req = {
              OCEHeader: element.OCE_Header,
              EmployeeID: this.currentEmployee,
              Status: 3
            };
            AcceptSaleF(req).then(res => {});
          });
          setTimeout(() => {
            this.fetchData();
          }, 1500);
        })
        .catch(() => {});
    }
  },
  computed: {},
  mounted() {},
  watch: {
    month() {
      this.fetchData();
    },
    currentEmployee() {
      this.fetchData();
    }
  },
  created() {
    this.fetchGroup();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
