<template>
  <div class="takecare-customer">
    <div class="inline-block" style="margin-bottom:5px;">
      <div class="inline" style="float:left">
        <el-select
          v-if="groupList.length > 0"
          v-model="currentGroup"
          clearable
          style="width:100%"
          placeholder="Chọn nhóm"
          size="mini"
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
      <div style="float:left">
        <el-select
          v-if="currentGroup"
          v-model="currentEmployee"
          style="width:100%;"
          placeholder="Chọn nhân viên"
          @change="selectEmployee"
          size="mini"
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
      <div style="float: right">
        <el-button
          :loading="downloading"
          size="mini"
          style="background-color:#02bc77;color:white;"
          icon="far fa-file-excel"
          @click="ExportExcel"
        >
          Xuất Excel</el-button
        >
      </div>
      <div style="float: right">
        <el-date-picker
          style="width:100%;"
          v-model="dateTime"
          type="month"
          size="mini"
          value-format="MM-yyyy"
          placeholder="Pick a month"
          value="2021-01"
        >
        </el-date-picker>
      </div>

      <div style="clear:both"></div>
    </div>

    <div v-loading="loading">
      <table
        class="analysic-table"
        cellpadding="0"
        cellspacing="0"
        style="width:100%"
      >
        <tbody>
          <tr>
            <td class="col-cal" rowspan="9">
              <p class="customer--text">
                <span style="font-weight:700;font-size:16px"
                  >{{ NumberCall }}
                </span>
                <span style="font-weight:700;font-size:16px;display:block"
                  >CALL
                </span>
              </p>
            </td>
            <td>
              <p class="customer--text">
                Tổ chức (đạt/giao kết):
                <span style="font-weight:700;font-size:16px"
                  >{{ NumberPlaceCheck }} / {{ NumberPlace }}</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="customer--text">
                Khách hàng (đạt/giao kết):
                <span style="font-weight:700;font-size:16px">
                  {{ NumberCustomerCheck }} /
                  {{ ResultMeetCustomerLst.length }}</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="customer--text">
                Doanh số / Đơn hàng:
                <span style="font-weight:700;font-size:16px">
                  {{
                    Amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  }}đ / {{ NumberInvoice }}</span
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <el-table
        v-if="ResultMeetCustomerLst.length > 0"
        class="el-mobile-table"
        :data="ResultMeetCustomerLst"
        v-loading="loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" width="100px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" label="Tổ chức">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tổ chức">
              {{ scope.row.PlaceName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="KH cá nhân">
          <template slot-scope="scope">
            <div class="dat-cell" label="KH cá nhân">
              {{ scope.row.CustomerName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100px"
          label="Call đã/cần check"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Call đã/cần check">
              {{ scope.row.QuantityCallResult }} /
              {{ scope.row.QuantityCallTarget }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="80px"
          label="Ngày đã/cần đến"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày đã/cần đến">
              {{ scope.row.MeetDayResult }} / {{ scope.row.MeetDayTarget }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="Đơn hàng" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Đơn hàng">
              {{ scope.row.QuantityInvoice }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="80px" label="Doanh số" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Doanh số">
              {{
                scope.row.Amount.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                )
              }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="blank-table" v-else>Không có dữ liệu</div>
      <el-dialog :visible.sync="dialogDetail" custom-class="small--modal">
        <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
        <single-timeline :data="rowData"></single-timeline>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  GetResultMeetCustomerByEm,
  GetListGroupAdminByToken,
  getEmployeesByIdGroup
} from "@/api/appview";
import { getMonth } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: {},
  props: {},
  data() {
    return {
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      UserCode: "",
      currentGroup: "",
      Month: "",
      Year: "",
      dateTime: getMonth(),
      ResultMeetCustomerLst: [],
      groupList: [],
      NumberPlace: 0,
      NumberPlaceCheck: 0,
      NumberCustomerCheck: 0,
      NumberCustomer: 0,
      NumberOrder: 0,
      NumberCall: 0,
      NumberInvoice: 0,
      Amount: 0,
      currentEmployee: "",
      employeeList: [],
      loading: false,
      dialogDetail: false,
      dialogTitle: "",
      rowData: "",
      imageClass: "",
      downloading: false
    };
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        UserCode: this.UserCode,
        Month: this.Month,
        Year: this.Year
      };
      this.loading = true;
      GetResultMeetCustomerByEm(req).then(res => {
        if (res.RespCode === 0) {
          this.ResultMeetCustomerLst = res.ResultMeetCustomerLst;
          let countPlace = 0;
          let newArray = this.compressArray(res.ResultMeetCustomerLst);
          let _this = this;
          newArray.forEach(item => {
            if (item.check > 0) {
              _this.NumberPlaceCheck++;
            }
          });
          this.NumberPlace = newArray.length;
          this.loading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    },
    compressArray(original) {
      var compressed = [];
      // make a copy of the input array
      var copy = original.slice(0);
      let _this = this;
      original.forEach(element => {
        if (element.QuantityCallResult > element.QuantityCallTarget) {
          _this.imageClass = "success";
        }
        if (element.QuantityCallResult < element.QuantityCallTarget) {
          _this.imageClass = "danger";
        }
        var myCount = 0;
        var countCheck = element.QuantityCallResult;
        if (element.QuantityCallResult > 0) {
          _this.NumberCustomerCheck++;
          _this.NumberCall += element.QuantityCallResult;
        }
        _this.NumberInvoice += element.QuantityInvoice;
        _this.Amount += element.Amount;
        copy.forEach((item, index) => {
          if (element.PlaceID === item.PlaceID) {
            myCount++;
            countCheck += item.QuantityCallResult;
            // sets item to undefined
            delete copy[index];
          }
        });
        if (myCount > 0) {
          let a = new Object();
          a.value = element.PlaceID;
          a.count = myCount;
          a.check = countCheck;
          compressed.push(a);
        }
      });

      return compressed;
    },
    fetchGroup() {
      const req = {
        idEmployee: this.UserName,
        token: this.Token
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
      });
    },
    fetchDate() {
      this.Month = this.dateTime.split("-")[0];
      this.Year = this.dateTime.split("-")[1];
    },
    selectGroup(val) {
      this.currentEmployee = "";
      this.UserCode = this.UserName;
      const req = {
        idGroup: val,
        token: this.Token
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.employeeList = res.Data;
        }
      });
    },
    selectEmployee(val) {
      this.UserCode = val;
    },
    addCustomer(val) {},
    initData() {
      this.NumberPlace = 0;
      this.NumberPlaceCheck = 0;
      this.NumberCustomerCheck = 0;
      this.NumberCustomer = 0;
      this.NumberOrder = 0;
      this.NumberCall = 0;
      this.NumberInvoice = 0;
      this.Amount = 0;
    },
    viewTimeLine(row) {
      this.dialogDetail = true;
      this.dialogTitle = row.PlaceName;
      this.rowData = row;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Tổ chức",
        "KH cá nhân",
        "Số Call đã check",
        "Số Call cần check",
        "Số ngày đã đến",
        "Số ngày cần đến",
        "Đơn hàng",
        "Doanh số"
      ];
      const filterHeader = [
        "PlaceName",
        "CustomerName",
        "QuantityCallResult",
        "QuantityCallTarget",
        "MeetDayResult",
        "MeetDayTarget",
        "QuantityInvoice",
        "Amount"
      ];
      var data = this.ResultMeetCustomerLst;
      var employee = this.currentGroup ? " - " + this.currentEmployee : "";
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Kết quả F tháng " + this.dateTime + employee, //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.UserCode = this.UserName;
    this.fetchDate();
    this.fetchData();
    this.fetchGroup();
  },
  mounted() {},
  watch: {
    dateTime() {
      this.initData();
      this.fetchDate();
      this.fetchData();
    },
    currentEmployee() {
      this.initData();
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.takecare-customer {
  width: 100%;
  padding: 5px 8px;
  background-color: #fff;
  .customer {
    position: relative;
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    &-top {
      border-bottom: 1px solid #eee;
      margin-bottom: 5px;
      padding: 5px 0px;
      cursor: pointer;
      .image {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        //border: 3px solid transparent;
        padding: 5px;
        border-radius: 50%;
      }
      .danger {
        background-color: #dc143c;
      }
      .success {
        background-color: #02bc77;
      }
      .empty {
        background-color: #ccc;
      }
      .primary {
        background-color: #ffcc66;
      }
      .detail {
        margin-left: 60px;
        .customer--name {
          margin: 0 0 5px 0;
          word-break: break-word;
          font-size: 14px;
          color: #0b0c0cad;
        }
        .customer--text {
          margin: 0 0 5px 0;
          font-size: 10pt;
          color: #0202027e;
        }
      }
    }
    .quantity {
      display: inline-block;
      font-size: 10pt;
    }
    .label-add {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #0277bc8f;
      border-radius: 0 10px 0 10px;
      color: #fff;
      font-size: 10pt;
      padding: 5px 8px;
    }
  }
}
.inline-block {
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.title-dialog {
  font-size: 10pt;
  font-weight: 700;
  color: #02bc77;
}
.analysic-table {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #aaa;
  .col-cal {
    text-align: center;
    border-right: 1px solid #02bc77;
  }
  .customer--text {
    font-size: 14px;
    color: #02bc77;
    margin: 5px;
    padding: 0;
    text-align: center;
  }
}
</style>
<style lang="scss">
.small--modal {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 0;
  }
}
</style>
