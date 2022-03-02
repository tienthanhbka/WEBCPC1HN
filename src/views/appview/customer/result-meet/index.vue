<template>
  <div class="takecare-customer">
    <div class="inline-block" style="margin-bottom:5px;">
      <el-row>
        <el-col :xs="16" :sm="16" :lg="16">
          <el-select
            class="el-select-months"
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
          </el-select> </el-col
        ><el-col :xs="8" :sm="8" :lg="8">
          <el-date-picker
            class="el-select-months"
            style="width:100%"
            v-model="dateTime"
            type="month"
            size="mini"
            value-format="MM-yyyy"
            placeholder="Pick a month"
            value="2021-01"
          >
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom:5px;">
      <el-select
        v-if="currentGroup"
        class="el-select-months"
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
    <div v-loading="loading">
      <!-- <el-row :gutter="10">
          <el-col :span="6">
            <p class="customer--text">
              <span style="font-weight:700;font-size:16px">{{
                NumberCall
              }}</span>
              Call
            </p>
          </el-col>
          <el-col :span="18">
            <p class="customer--text">
              Tổ chức (đạt/giao kết):
              <span style="font-weight:700;font-size:16px"
                >{{ NumberPlaceCheck }} / {{ NumberPlace }}</span
              >
            </p>
            <p class="customer--text">
              Khách hàng (đạt/giao kết):
              <span style="font-weight:700;font-size:16px">
                {{ NumberCustomerCheck }} /
                {{ ResultMeetCustomerLst.length }}</span
              >
            </p>
            <p class="customer--text">
              Đơn hàng:
              <span style="font-weight:700;font-size:16px">
                {{ NumberOrder }}</span
              >
            </p>
          </el-col>
        </el-row> -->
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
      <div v-if="ResultMeetCustomerLst.length > 0">
        <div v-for="(item, index) in ResultMeetCustomerLst" :key="index">
          <div
            class="customer"
            v-if="
              !(item.QuantityCallResult == 0 && item.QuantityCallTarget == 0)
            "
          >
            <div class="customer-top">
              <img
                v-if="
                  item.QuantityCallResult == 0 && item.QuantityCallTarget > 0
                "
                src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/lg.png?alt=media&token=1800d2af-2a60-43a6-9d4f-1c3f6eb9bfe0"
                alt="customer"
                class="image danger"
              />
              <img
                v-else-if="
                  item.QuantityCallResult > 0 &&
                    item.QuantityCallTarget > 0 &&
                    item.QuantityCallResult >= item.QuantityCallTarget
                "
                src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/lg.png?alt=media&token=1800d2af-2a60-43a6-9d4f-1c3f6eb9bfe0"
                alt="customer"
                class="image success"
              />
              <img
                v-else-if="
                  item.QuantityCallResult > 0 && item.QuantityCallTarget == 0
                "
                src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/lg.png?alt=media&token=1800d2af-2a60-43a6-9d4f-1c3f6eb9bfe0"
                alt="customer"
                class="image empty"
              />
              <img
                v-else-if="item.QuantityCallResult < item.QuantityCallTarget"
                src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/lg.png?alt=media&token=1800d2af-2a60-43a6-9d4f-1c3f6eb9bfe0"
                alt="customer"
                class="image primary"
              />
              <div class="detail">
                <p class="customer--name">
                  {{ item.PlaceName }}
                </p>
                <p class="customer--text">
                  Khách hàng: {{ item.CustomerName }}
                  <span v-if="item.Job">-</span> {{ item.Job }}
                </p>
                <p class="customer--text">
                  Call (đã/cần check):
                  {{ item.QuantityCallResult }} / {{ item.QuantityCallTarget }}
                </p>
                <p class="customer--text">
                  Ngày (đã/cần đến):
                  {{ item.MeetDayResult }} / {{ item.MeetDayTarget }}
                </p>
                <p class="customer--text">
                  Doanh số / đơn hàng:
                  {{
                    item.Amount.toString().replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      "$1,"
                    )
                  }}đ / {{ item.QuantityInvoice }}
                </p>
              </div>
              <div style="clear:both;"></div>
            </div>
            <div class="label-add" @click="viewTimeLine(item)">Timeline</div>
          </div>
        </div>
      </div>
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
import SingleTimeline from "../component/singleTimeline.vue";
export default {
  components: { SingleTimeline },
  props: {},
  data() {
    return {
      Token: "",
      UserName: "",
      UserCode: "",
      currentGroup: "",
      Month: "",
      Year: "",
      dateTime: getMonth(),
      loadingTable: false,
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
      imageClass: ""
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

      // let x = document.getElementById("image");
      // console.log(x);
      // this.ResultMeetCustomerLst.forEach(item => {
      //   if (item.QuantityCallResult > item.QuantityCallTarget) {
      //     console.log("a");
      //     x.style.borderColor = "#02bc77";
      //   }
      //   if (item.QuantityCallResult < item.QuantityCallTarget) {
      //     console.log("b");
      //     x.style.borderColor = "red";
      //   }
      // });
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
    }
  },
  created() {
    this.UserName = this.$route.params.username;
    this.Token = this.$route.params.token;
    this.UserCode = this.$route.params.username;
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
