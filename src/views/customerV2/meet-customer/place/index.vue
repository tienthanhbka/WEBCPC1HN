<template>
  <div>
    <div
      class="inline-block"
      style="margin-bottom:5px;float:left"
      v-if="!modeGroup"
    ></div>
    <div
      class="inline-block"
      style="margin-bottom:5px;float:left"
      v-if="modeGroup"
    >
      <el-select
        v-model="currentGroup"
        clearable
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
        v-model="currentEmployee"
        style="width:100%;"
        placeholder="Chọn nhân viên"
        @change="selectEmployee"
      >
        <el-option
          v-for="item in emLst"
          :key="item.idEmployee"
          :label="item.nameEmployee"
          :value="item.idEmployee"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-input
          style="width:auto;"
          placeholder="Tìm kiếm theo tổ chức..."
          v-model="TextSearch"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <div class="inline-block">
        <el-dropdown>
          <el-button type="success" :loading="downloading">
            Xuất Excel<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button
                style="width: 100%;color:#58ACFA;"
                size="mini"
                @click="exportPlace"
                ><i class="fas fa-users"></i>KH tổ chức</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item
              ><el-button
                style="width: 100%;color:#58ACFA;"
                size="mini"
                @click="exportCustomer"
                ><i class="far fa-user"></i>KH cá nhân</el-button
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div style="clear:both;"></div>
    <set-meet
      modalId="new-place-modal"
      :place="rowData"
      @meetAdded="meetAdded"
    ></set-meet>
    <el-table
      class="el-mobile-table"
      :data="
        tableData.filter(
          data =>
            !TextSearch ||
            data.PlaceName.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      v-loading="isLoading"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <!-- <el-tooltip content="Đăng kí" effect="light">
              <el-button @click="createMeet(scope.row)" type="text"
                ><i class="fas fa-edit"></i></el-button
            ></el-tooltip> -->
            <el-tooltip content="KH cá nhân" effect="light">
              <el-button
                type="text"
                style="color:green;margin-left:10px;"
                @click="getCustomer(scope.row)"
                ><i class="fas fa-users"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="Tần suất" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tần suất">
            <span
              v-if="scope.row.Frequency"
              style="font-weight:700;color:rgb(226 12 12);"
              >F{{ scope.row.Frequency }}</span
            >
            <span v-else style="font-weight:700;color:#ccc;"
              >F{{ scope.row.Frequency }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Tên tổ chức">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên tổ chức">
            {{ scope.row.PlaceName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Địa chỉ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa chỉ">
            {{ scope.row.AddrLv3 }}-{{ scope.row.AddrLv2 }}-{{
              scope.row.AddrLv1
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="Loại tổ chức">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại tổ chức">
            {{ scope.row.Type }}
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.NoteEm }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="150px" label="" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="">
            <el-button type="primary" size="mini" @click="updateF(scope.row)"
              >Cập nhật F</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogDetail" custom-class="medium2-modal">
      <span slot="title" class="title-dialog">{{ dialogTitle }} </span>

      <customer :place="rowData" :employee="currentEmployee"></customer>
    </el-dialog>
    <el-dialog :visible.sync="dialogImport" custom-class="medium2-modal">
      <span style="font-weight:700;color:#02bc77" slot="title">{{
        dialogTitle
      }}</span>
      <excel-modal-content :modeImport="modeImport"></excel-modal-content>
    </el-dialog>
  </div>
</template>
<script>
import { GetPlaceByUId, UpdatePlaceByPId } from "@/api/KDPlace";
import { GetCustomerByPId } from "@/api/KDCustomer";

import SetMeet from "../component/setMeetPlace";
import Customer from "../customer/index";
import ExcelModalContent from "../component/excel-modal-content";
import Cookies from "js-cookie";
import {
  GetListGroupAdminByToken,
  getEmployeesByIdGroup,
  GetCustomerByUId
} from "@/api/appview";
export default {
  components: { SetMeet, Customer, ExcelModalContent },
  data() {
    return {
      groupList: [],
      emLst: [],
      token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      isLoading: false,
      tableData: [],
      dialogFormDel: false,
      dialogFormCreatePlace: false,
      dialogFormSys: false,
      dialogFormUpload: false,
      rowData: "",
      row: "",
      file: "",
      TextSearch: "",
      downloading: false,
      currentGroup: "",
      modeGroup: false,
      currentEmployee: "",
      UserCode: Cookies.get("idEmployee"),
      dialogDetail: false,
      dialogTitle: "",
      dialogImport: false,
      waiting: false,
      modeImport: ""
    };
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      var req = {
        Token: this.token,
        UserName: this.UserName,
        UserCode: this.UserCode
      };
      GetPlaceByUId(req).then(res => {
        if (res.RespCode == 0) {
          this.isLoading = false;
          res.PlaceLst.sort((a, b) =>
            a.Frequency < b.Frequency ? 1 : b.Frequency < a.Frequency ? -1 : 0
          );
          this.tableData = res.PlaceLst;
        }
      });
    },
    getCustomer(row) {
      this.dialogDetail = true;
      this.rowData = row;
      this.dialogTitle = row.PlaceName;
    },
    createMeet(row) {
      VoerroModal.show("new-place-modal");
      this.rowData = row;
    },
    meetAdded() {
      this.fetchData();
    },
    exportPlace() {
      //console.log("a");
      this.downloading = true;
      const tHeader = [
        "Mã TC",
        "Tên TC",
        "Loại TC",
        "Vùng",
        "Địa chỉ",
        "Tọa độ",
        "Thời gian tạo",
        "Tần suất viếng thăm",
        "Ghi chú"
      ];
      const filterHeader = [
        "PlaceID",
        "PlaceName",
        "Type",
        "Area",
        "Address",
        "Map",
        "TimeCreate",
        "Frequency",
        "Note"
      ];
      let ArrExport = [];
      this.tableData.forEach(item => {
        let obj = {
          PlaceID: item.PlaceId,
          PlaceName: item.PlaceName,
          Type: item.Type,
          Area: item.Area,
          Address: item.AddrLv3 + "-" + item.AddrLv2 + "-" + item.AddrLv1,
          Map: item.Latitude + "-" + item.Longitude,
          TimeCreate: item.Time,
          Frequency: item.Frequency,
          Note: item.Note
        };
        ArrExport.push(obj);
      });
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, ArrExport),
          filename: "Danh sách KH tổ chức",
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
    exportCustomer() {
      this.downloading = true;
      const tHeader = [
        "Mã TC",
        "Tên tổ chức",
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
        "PlaceId",
        "PlaceName",
        "CustomerId",
        "CustomerName",
        "Address",
        "Phone",
        "Email",
        "Job",
        "Position",
        "MeetDay",
        "QuanityCall",
        "NoteEm"
      ];
      let arrayExport = [];
      const req = {
        UserName: this.UserName,
        Token: this.token
      };
      GetCustomerByUId(req).then(res => {
        if (res.RespCode === 0) {
          arrayExport = res.CustomerLst;
          import("@/vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
              header: tHeader,
              data: this.formatJson(filterHeader, arrayExport),
              filename: "Danh sách khách hàng cá nhân",
              autoWidth: true,
              bookType: "xlsx"
            });
            this.downloading = false;
          });
        }
      });
    },
    fetchGroup() {
      const req = {
        idEmployee: this.UserName,
        token: this.token
      };
      GetListGroupAdminByToken(req).then(response => {
        if (response.ResCode == 0) {
          this.groupList = response.Data;
        }
      });
    },
    selectGroup(val) {
      this.currentEmployee = "";
      this.UserCode = this.UserName;
      const req = {
        idGroup: val,
        token: this.token
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.emLst = res.Data;
        }
      });
    },
    selectEmployee(val) {
      this.UserCode = val;
    },
    importCustomer() {
      this.dialogImport = true;
      this.modeImport = "customer";
      this.dialogTitle = "Nhập Excel khách hàng CÁ NHÂN";
    },
    importPlace() {
      this.dialogImport = true;
      this.modeImport = "place";
      this.dialogTitle = "Nhập Excel khách hàng TỔ CHỨC";
    },
    updateF(row) {
      this.isLoading = true;
      var req = {
        Token: this.token,
        UserName: this.UserName,
        PlaceId: row.PlaceId
      };
      GetCustomerByPId(req).then(res => {
        if (res.RespCode == 0) {
          const max = res.CustomerLst.reduce((prev, current) =>
            prev.MeetDay > current.MeetDay ? prev : current
          );
          let obj = {
            Frequency: max.MeetDay
          };
          var req = {
            Token: this.token,
            UserName: this.UserName,
            PlaceInfo: Object.assign({}, row, obj)
          };
          UpdatePlaceByPId(req).then(res => {
            if (res.RespCode == 0) {
              this.isLoading = false;
              this.fetchData();
              this.$message({
                message: " Thành công",
                type: "success"
              });
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        }
      });
    }
  },
  created() {
    if (this.$router.currentRoute.path.includes("nhom")) {
      this.modeGroup = true;
    }
    if (this.modeGroup) {
      this.fetchGroup();
    }
    this.fetchData();
  },
  watch: {
    currentEmployee() {
      this.fetchData();
    }
  }
};
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 15px 5px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 5px;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>
<style>
.title-dialog {
  font-weight: 700;
  font-size: 10pt;
  color: #02bc77;
}
.employee-dialog {
  font-weight: 700;
  font-size: 10pt;
  color: #d6b317;
}
.medium2-modal {
  width: 1140px !important;
  max-width: 98%;
  margin-top: 5px !important;
}
.medium2-modal .el-dialog__body {
  padding: 10px;
}
</style>
