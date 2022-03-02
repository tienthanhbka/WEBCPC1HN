<template>
  <div class="takecare-customer">
    <!-- <div style="margin-bottom:5px;float:left" v-if="modeGroup">
      <el-select
        v-model="currentGroup"
        clearable
        size="mini"
        style="width:100%;"
        placeholder="Chọn nhóm"
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
      <el-select
        size="mini"
        v-model="currentEmployee"
        style="width:100%;"
        placeholder="Chọn nhân viên"
        @change="selectEmployee"
      >
        <el-option
          v-for="item in employeeList"
          :key="item.idEmployee"
          :label="item.nameEmployee"
          :value="item.idEmployee"
        >
        </el-option>
      </el-select>
    </div> -->
    <div style="float:right">
      <div>
        <el-input
          size="mini"
          style="width:auto;"
          placeholder="Tìm kiếm theo cá nhân..."
          v-model="TextSearch"
          prefix-icon="el-icon-search"
        >
        </el-input>
        <el-button
          size="mini"
          type="success"
          icon="fas fa-file-excel"
          @click="exportExcel"
          :loading="downloading"
        >
          Xuất Excel
        </el-button>
      </div>
    </div>
    <div style="clear:both;"></div>
    <set-meet
      modalId="new-customer-modal"
      :place="place.PlaceId"
      :customer="customer"
      @meetAdded="meetAdded"
    ></set-meet>
    <div v-loading="loading">
      <el-table
        class="el-mobile-table"
        size="mini"
        :data="
          tableData.filter(
            data =>
              !TextSearch ||
              data.CustomerName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        v-loading="isLoading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" min-width="60px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <!-- <el-tooltip content="Chỉnh sửa">
                <el-button @click="editCustomer(scope.row)" type="text"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  @click="delCustomer(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="el-icon-delete"></i></el-button
              ></el-tooltip> -->
              <el-tooltip content="Đăng kí" effect="light">
                <el-button @click="addMeet(scope.row)" type="text"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="70px" label="Mã khách hàng">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã khách hàng">
              {{ scope.row.CustomerId.substring(0, 6) }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column min-width="120px" label="Tên khách hàng">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên khách hàng">
              {{ scope.row.CustomerName }}
              <span v-if="scope.row.Position"> -{{ scope.row.Position }} </span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="100px" label="Địa chỉ">
          <template slot-scope="scope">
            <div class="dat-cell" label="Địa chỉ">
              {{ scope.row.Address }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column min-width="80px" label="SĐT">
          <template slot-scope="scope">
            <div class="dat-cell" label="SĐT">
              {{ scope.row.Phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="Email">
          <template slot-scope="scope">
            <div class="dat-cell" label="Email">
              {{ scope.row.Email }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="80px" label="Chức vụ">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chức vụ">
              {{ scope.row.Position }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column min-width="100px" label="Tần suất (F)" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tần suất (F)">
              {{ scope.row.QuanityCall }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          label="Số ngày cần gặp"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Số ngày cần gặp">
              {{ scope.row.MeetDay }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.NoteEm }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/appview";
import { getMonth } from "@/api/index";
import Cookies from "js-cookie";
import SetMeet from "../component/setMeetCustomer";
import { GetCustomerByPId } from "@/api/KDCustomer";
export default {
  components: {
    SetMeet
  },
  props: {
    place: {
      type: Object,
      required: true
    },
    employee: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      UserCode: Cookies.get("idEmployee"),
      currentGroup: "",
      Month: "",
      Year: "",
      isLoading: false,
      tableData: [],
      groupList: [],
      currentEmployee: "",
      employeeList: [],
      loading: false,
      dialogDetail: false,
      dialogTitle: "",
      rowData: "",
      modeGroup: false,
      customer: "",
      TextSearch: "",
      downloading: false
    };
  },
  methods: {
    addMeet(row) {
      VoerroModal.show("new-customer-modal");
      this.customer = row;
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã KH",
        "Tên KH",
        "Địa chỉ",
        "SĐT",
        "Email",
        "Chuyên môn",
        "Chức vụ",
        "Số ngày gặp",
        "Số Call cần check",
        "Ghi chú"
      ];
      const filterHeader = [
        "CustomerId",
        "CustomerName",
        "Address",
        "Phone",
        "Email",
        "Job",
        "Position",
        "MeetDay",
        "QuantiyCall",
        "Note"
      ];

      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, this.tableData),
          filename: "VIP - " + this.place.PlaceName,
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
    },
    fetchData() {
      this.isLoading = true;
      var req = {
        Token: this.Token,
        UserName: this.UserName,
        UserCode: this.employee,
        PlaceId: this.place.PlaceId
      };
      GetCustomerByPId(req).then(res => {
        if (res.RespCode == 0) {
          res.CustomerLst.sort((a, b) =>
            a.MeetDay < b.MeetDay ? 1 : b.MeetDay < a.MeetDay ? -1 : 0
          );
          this.tableData = res.CustomerLst;
          this.isLoading = false;
        }
      });
    },
    // fetchGroup() {
    //   const req = {
    //     idEmployee: this.UserName,
    //     token: this.Token
    //   };

    //   GetListGroupAdminByToken(req).then(response => {
    //     if (response.ResCode == 0) {
    //       this.groupList = response.Data;
    //       if (this.groupList.length > 0) {
    //         this.modeGroup = true;
    //       }
    //     }
    //   });
    // },
    // selectGroup(val) {
    //   this.currentEmployee = "";
    //   this.UserCode = this.UserName;
    //   const req = {
    //     idGroup: val,
    //     token: this.Token
    //   };
    //   getEmployeesByIdGroup(req).then(res => {
    //     if (res.ResCode == 0) {
    //       this.employeeList = res.Data;
    //     }
    //   });
    // },
    // selectEmployee(val) {
    //   this.UserCode = val;
    // },
    meetAdded() {
      this.fetchData();
    },
    createMeet() {}
  },
  created() {
    //console.log(this.employee);
    this.fetchData();
    //this.fetchGroup();
  },
  watch: {
    currentEmployee() {
      this.fetchData();
    },
    place() {
      this.fetchData();
    },
    employee() {
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
