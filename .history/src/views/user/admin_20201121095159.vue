<template>
  <div>
    <div style="padding: 10px;" class="inline-block">
      <el-input
        size="medium"
        style="width: 150px; "
        class="search"
        v-on:keyup.enter="Search"
        placeholder="Tìm kiếm"
        v-model="search"
      ></el-input>
      <el-button size="medium" class="bt-search" type="infor" @click="Search">
        <i class="fas fa-search"></i
      ></el-button>
      <span
        v-if="Admin == 1 || Admin == 10"
        style="margin-left:20px;"
        class="el-item-report"
        >Báo cáo:
      </span>
      <el-select
        v-if="Admin == 1 || Admin == 10"
        size="medium"
        style="width: 200px;"
        v-model="report"
        placeholder="Select"
      >
        <el-option
          v-for="item in litsReport"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span v-if="displayMonth">
        <span class="demonstration">Tháng</span>
        <el-date-picker
          v-model="month"
          size="medium"
          type="month"
          placeholder="Chọn tháng"
        >
        </el-date-picker>
      </span>
      <span v-if="displayDStart">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </span>
      <span v-if="displayDEnd">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </span>
      <el-button
        v-if="Admin == 1 || Admin == 10"
        size="medium"
        type="success"
        @click="ExportExcel"
        >Xuất Excel</el-button
      >
      <el-button
        style="float: right;"
        v-if="Admin == 1 || Admin == 10"
        size="medium"
        type="danger"
        @click="viewExcel"
        >View Excel</el-button
      >

      <el-button
        class="el-create-acc"
        style="float: right;"
        v-if="Admin == 1 || Admin == 10"
        size="medium"
        type="danger"
        @click="createUser"
        >Tạo tài khoản</el-button
      >
    </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="listEm"
      element-loading-text="Loading"
      border
      highlight-current-row
      :header-row-style="{ color: '#1c456f' }"
    >
      <!-- <el-table-column type="expand">
                <template slot-scope="props">
                   <el-row>
                     <el-col span="6">
                    <p>Người giao việc: {{ props.row.NameManager }}</p>
                    <p>Ghi chú: {{ props.row.Note }}</p>
                    </el-col>
                  </el-row>
                </template>
                </el-table-column> -->
      <el-table-column width="50px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-dropdown size="small" split-button type="primary">
              Chọn
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="Admin == 1 || Admin == 10">
                  <el-button
                    style="width: 100%;"
                    @click="acceptInfor(scope.row)"
                    size="mini"
                    ><i class="fas fa-check-double"></i>Phê duyệt</el-button
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10">
                  <router-link
                    :to="'/thong-tin-gia-dinh/' + scope.row.EmployeeID"
                  >
                    <el-button style="width: 100%;" size="mini"
                      ><i class="fas fa-baby"></i>Gia đình</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item>
                  <router-link
                    :to="'/thong-tin-nhan-vien/' + scope.row.EmployeeID"
                  >
                    <el-button style="width: 100%;" size="mini"
                      ><i class="far fa-eye"></i>Xem thông tin</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10"
                  ><router-link
                    :to="'/hop-dong-lao-dong/' + scope.row.EmployeeID"
                  >
                    <el-button style="width: 100%;" size="mini"
                      ><i class="fas fa-copy"></i>Hợp đồng LĐ</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10"
                  ><router-link :to="'/BHXH/' + scope.row.EmployeeID">
                    <el-button style="width: 100%;" size="mini"
                      ><i class="fas fa-money-check-alt"></i>BHXH</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10"
                  ><router-link
                    :to="'/trang-thai-lam-viec/' + scope.row.EmployeeID"
                  >
                    <el-button style="width: 100%;" size="mini"
                      ><i class="fas fa-eye-dropper"></i>TT làm việc</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10"
                  ><router-link
                    :to="'/quyet-dinh-nhan-su/' + scope.row.EmployeeID"
                  >
                    <el-button style="width: 100%;" size="mini"
                      ><i class="fas fa-user-edit"></i>Quyết định NS</el-button
                    ></router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 1 || Admin == 10"
                  ><el-button
                    style="width: 100%;"
                    @click="recordHR(scope.row)"
                    size="mini"
                    ><i class="fas fa-clipboard"></i>Hồ sơ NS</el-button
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 2 || Admin == 10"
                  ><el-button
                    style="width: 100%;"
                    @click="viewDetail(scope.row)"
                    size="mini"
                    ><i class="fas fa-users-cog"></i>Quản lý nhóm</el-button
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 2 || Admin == 10"
                  ><el-button
                    style="width: 100%;"
                    @click="setOTC(scope.row)"
                    size="mini"
                    ><i class="fas fa-font"></i>Loại NV</el-button
                  ></el-dropdown-item
                >
                <el-dropdown-item v-if="Admin == 2 || Admin == 10 || Admin == 3"
                  ><el-button
                    style="width: 100%;"
                    @click="setKH(scope.row)"
                    size="mini"
                    ><i class="fas fa-user-md"></i>Lấy KH</el-button
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <el-button-group>
                 <el-tooltip v-if="Admin ==1" content="Phê duyệt thông tin"> <el-button @click="acceptInfor(scope.row)" size="mini" type="success" ><i class="fas fa-check-double"></i></el-button></el-tooltip>
                 <el-tooltip v-if="Admin ==1" content="Thông tin gia đình"> <router-link :to="'thong-tin-gia-dinh/'+ scope.row.EmployeeID"> <el-button size="mini" type="danger" ><i class="fas fa-baby"></i></el-button></router-link></el-tooltip>
                 <el-tooltip content="Xem chi tiết"><router-link :to="'thong-tin-nhan-vien/'+ scope.row.EmployeeID"> <el-button size="mini" type="primary" ><i class="far fa-eye"></i></el-button></router-link></el-tooltip>
               <el-tooltip v-if="Admin ==1" content="Hợp đồng LĐ"><router-link :to="'hop-dong-lao-dong/'+ scope.row.EmployeeID"> <el-button size="mini" type="infor" ><i class="fas fa-copy"></i></el-button></router-link></el-tooltip>
               <el-tooltip v-if="Admin ==1" content="BHXH"><router-link :to="'BHXH/'+ scope.row.EmployeeID"> <el-button size="mini" type="infor" ><i class="fas fa-money-check-alt"></i></el-button></router-link></el-tooltip>
                <el-tooltip v-if="Admin ==1" content="Trạng thái làm việc"><router-link :to="'trang-thai-lam-viec/'+ scope.row.EmployeeID"> <el-button size="mini" type="danger" ><i class="fas fa-eye-dropper"></i></el-button></router-link></el-tooltip>
                <el-tooltip v-if="Admin ==1" content="Quyết định nhân sự"><router-link :to="'quyet-dinh-nhan-su/'+ scope.row.EmployeeID"> <el-button size="mini" type="warning" ><i  class="fas fa-user-edit"></i></el-button></router-link></el-tooltip>
                 <el-tooltip v-if="Admin ==1" content="Hồ sơ nhân sự"> <el-button @click="recordHR(scope.row)" size="mini" type="success" ><i class="fas fa-clipboard"></i></el-button></el-tooltip>
            </el-button-group> -->
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" min-width="100" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | inforStatusColor">
              {{ scope.row.Status | inforStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Họ và tên" min-width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="Họ và tên">
            <span>{{ scope.row.EmployeeName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số điện thoại" min-width="110">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số điện thoại">
            <span>{{ scope.row.Phone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Phòng ban" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Phòng ban">
            <span>{{ scope.row.Office }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Chức danh" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chức danh">
            <span>{{ scope.row.Position }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Số ngày làm" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số ngày làm">
            <span>{{ scope.row.DateStartWork | parseNumberDate }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Cập nhật gần nhất" min-width="140">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cập nhật gần nhất">
            <span v-if="scope.row.Time != null">{{
              Date.parse(scope.row.Time).toString("dd-MM-yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thông tin cập nhật" min-width="190">
        <template slot-scope="scope">
          <div class="dat-cell" label="TT cập nhật">
            <span>{{ scope.row.Note }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Số DT" v-if="Admin ==2 || Admin==10"  min-width="100">
                <template slot-scope="scope">
                  <div class="dat-cell"  label="DT">{{ scope.row.idEmployee}}</div>
                </template>
            </el-table-column> -->
      <el-table-column
        label="Loại NV"
        v-if="Admin == 2 || Admin == 10"
        min-width="100"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại NV">
            {{ scope.row.TypeEmployee }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Mã"
        v-if="Admin == 2 || Admin == 10"
        min-width="100"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã">{{ scope.row.password }}</div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="total,-> , prev, pager, next, sizes"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
    ></el-pagination>

    <el-dialog title="Phê duyệt thông tin" :visible.sync="dialogFormAccept">
      <acceptInfor
        :user="user"
        @click-something="acceptOK"
        @cancel="cancelInfo"
      ></acceptInfor>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog
      title="Xem báo cáo"
      :visible.sync="dialogFormViewExcel"
      custom-class="modal-class"
    >
      <viewEx :report="Value"></viewEx>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog
      title="Tạo tài khoản nhân viên"
      :visible.sync="dialogFormCreateUser"
    >
      <createUser @click-something="createUserOK"></createUser>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog
      title="Yêu cầu cập nhật lại thông tin"
      :visible.sync="dialogFormNoAccept"
    >
      <cancel
        :row="user"
        @noacceptOK="noacceptOK"
        @cancel="cancelInfo"
      ></cancel>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Hồ sơ nhân sự" :visible.sync="dialogFormRecordHR">
      <checkList
        :listRecord="listRecord"
        :EmployeeID="EmployeeID"
        @click-something="recordOK"
      ></checkList>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Quản lý nhóm" :visible.sync="dialogForm">
      <detail :user="userofIT"></detail>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Loại nhân viên" :visible.sync="dialogFormOTC">
      <setOTC :user="userofIT" @click-something="setOTCOK"></setOTC>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Lấy khách hàng" :visible.sync="dialogFormKH">
      <getKH :user="userofIT" @click-something="setKHOK"></getKH>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetListEmployee,
  GetListEmployee2,
  GetListChildren,
  GetListDecision,
  GetListEmployeeWorkProcess,
  GetListEmployeeWorkProcess2,
  GetListEmployeeBHXH,
  GetListEmployeeBirthDayByMonth,
  GetListEmployeeDateEndByMonth,
  GetListEmployeeDateStartByMonth,
  GetEmployeeRecord_HR,
  GetEmployeeStatusCount
} from "@/api/employeeInfor";
import AcceptInfor from "@/views/user/components/AcceptInfor";
import CreateUser from "@/views/user/components/createUser";
import CheckList from "@/views/user/components/checkListRecord";
import Cancel from "@/views/user/components/cancelInfor";
import ViewEx from "@/views/user/components/viewExcel";
import Detail from "@/views/admin/component/detail";
import SetOTC from "@/views/admin/component/setOTC";
import GetKH from "@/views/admin/component/getKH";

import Cookies from "js-cookie";
export default {
  components: {
    AcceptInfor,
    Cancel,
    CheckList,
    CreateUser,
    ViewEx,
    Detail,
    SetOTC,
    GetKH
  },
  filters: {
    parseNumberDate: function(value) {
      if (value != null) {
        var startDate = new Date(value);
        // Do your operations
        var endDate = new Date();
        var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
        return parseInt(seconds);
      } else {
        return "Chưa cập nhật";
      }

      // if(value !=null){

      //           var startDate = new Date(value);
      //           // Do your operations
      //           var endDate   = new Date();
      //           var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
      //           var year = parseInt(seconds/365)
      //           var month = parseInt((seconds-year*365)/30)
      //           var date = parseInt(seconds-year*365-month*30)
      //           return year + '-năm ' + month + '-tháng ' + date +'-ngày';
      //       }
      //       else{
      //           return 'Chưa cập nhật'
      //       }
    }
  },
  data() {
    return {
      displayMonth: false,
      displayDStart: false,
      displayDEnd: false,
      danglam: 0,
      nghiviec: 0,
      nghide: 0,
      nghikoluong: 0,
      month: "",
      Admin: 0,
      startDate: "",
      endDate: "",
      litsReport: [
        {
          label: "DS nhân sự",
          value: 1
        },
        {
          label: "BC nhân sự tăng",
          value: 2
        },
        {
          label: "BC nhân sự giảm",
          value: 3
        },
        {
          label: "Thâm niên công tác",
          value: 4
        },
        {
          label: "DS bảo hiểm",
          value: 5
        },
        {
          label: "DS loại HĐLĐ",
          value: 6
        },
        {
          label: "Tổng hợp trình độ chuyên môn",
          value: 7
        },
        {
          label: "DS Quyết định NS",
          value: 8
        },
        {
          label: "DS sinh nhật tháng",
          value: 9
        },
        {
          label: "DS con nhân viên",
          value: 10
        },
        {
          label: "DS thông tin tổng hợp",
          value: 11
        },
        {
          label: "DS chi phí BHXH tháng",
          value: 12
        }
      ],
      report: 1,
      total: 0,
      currentPage: 1,
      listRecord: [],
      pageSize: 10,
      listEm: [],
      search: "",
      Value: "",
      EmployeeID: "",
      user: [],
      userofIT: [],
      listLoading: false,
      dialogFormAccept: false,
      dialogFormNoAccept: false,
      dialogFormRecordHR: false,
      dialogFormCreateUser: false,
      dialogFormViewExcel: false,
      dialogForm: false,
      dialogFormOTC: false,
      dialogFormKH: false
    };
  },
  methods: {
    recordHR(row) {
      this.EmployeeID = row.EmployeeID;
      this.getLstRecord(row.EmployeeID);
      this.dialogFormRecordHR = true;
    },
    recordOK() {
      this.dialogFormRecordHR = false;
    },
    getLstRecord(id) {
      GetEmployeeRecord_HR({ EmployeeID: id }).then(res => {
        this.listRecord = res.Data[0].Name.split(";;");
      });
    },
    noacceptOK() {
      this.dialogFormNoAccept = false;
    },
    cancelInfo() {
      this.dialogFormAccept = false;
      this.dialogFormNoAccept = true;
    },
    viewExcel() {
      this.dialogFormViewExcel = true;
      this.Value = this.report;
    },
    createUser() {
      this.dialogFormCreateUser = true;
    },
    createUserOK() {
      this.dialogFormCreateUser = false;
    },

    ExportExcel() {
      switch (this.report) {
        case 1:
          this.Export1();
          break;
        case 2:
          this.Export2();
          break;
        case 3:
          this.Export3();
          break;
        case 4:
          this.Export4();
          break;
        case 5:
          this.Export5();
          break;
        case 6:
          this.Export6();
          break;
        case 7:
          this.Export7();
          break;
        case 8:
          this.Export8();
          break;
        case 9:
          this.Export9();
          break;

        case 10:
          this.Export10();
          break;

        case 11:
          this.Export11();
          break;

        case 12:
          this.Export12();
          break;
      }
    },
    Export1() {
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Ngày sinh",
        "Hộ khẩu thường trú",
        "Địa chỉ hiện tại",
        "Chuyên ngành đào tạo",
        "Trình độ chuyên môn",
        "Ngày vào công ty",
        "Loại hợp đồng"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "BirthDay",
        "AddressOften",
        "AddressNow",
        "Specialized",
        "Degree",
        "DateStartWork",
        "WorkProcess"
      ];
      GetListEmployee2({ search: this.search, pageSize: 100000, page: 1 }).then(
        response => {
          var data = response.Data;
          import("@/vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
              header: tHeader,
              data: this.formatJson(filterHeader, data),
              filename: "Danh sách nhân sự tổng hợp",
              autoWidth: true,
              bookType: "xlsx"
            });
          });
        }
      );
    },
    Export2() {
      // var n = Date.parse(this.month).toString("MM-yyyy");
      // this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Ngày vào",
        "Ghi chú"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "DateStartWork",
        "Note"
      ];
      GetListEmployeeDateStartByMonth({
        startDate: this.startDate,
        endDate: this.endDate
      }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách nhân sự tăng từ " +
              Date.parse(this.startDate).toString("MM-yyyy") +
              "đến " +
              Date.parse(this.endDate).toString("MM-yyyy"),
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },

    Export3() {
      // var n = Date.parse(this.month).toString("MM-yyyy");
      // this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Ngày vào",
        "Ngày nghỉ",
        "Ghi chú"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "DateStartWork",
        "DateEndWork",
        "Note"
      ];
      GetListEmployeeDateEndByMonth({
        startDate: this.startDate,
        endDate: this.endDate
      }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách nhân sự giảm từ " +
              Date.parse(this.startDate).toString("MM-yyyy") +
              "đến " +
              Date.parse(this.endDate).toString("MM-yyyy"),
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export4() {
      //var n = Date.parse(this.month).toString('MM-yyyy')
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Ngày vào",
        "Số ngày làm việc"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "DateStartWork",
        "NumberWork"
      ];
      GetListEmployee2({ search: this.search, pageSize: 100000, page: 1 }).then(
        response => {
          var data = response.Data;
          import("@/vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
              header: tHeader,
              data: this.formatJson(filterHeader, data),
              filename: "Thâm niên công tác nhân sự",
              autoWidth: true,
              bookType: "xlsx"
            });
          });
        }
      );
    },
    Export5() {
      //var n = Date.parse(this.month).toString('MM-yyyy')
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Mã số BHXH",
        "Thời gian đóng",
        "Mức đóng"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "BHXH",
        "DateStart",
        "Money"
      ];
      GetListEmployeeBHXH().then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách nhân sự tham gia bảo hiểm",
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export6() {
      // var n = Date.parse(this.month).toString('MM-yyyy')
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "HĐ thử việc",
        "Số hợp đồng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Link HĐ thử việc",
        "HĐ 6 tháng",
        "Số hợp đồng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Link HĐ",
        "HĐ 1 năm",
        "Số hợp đồng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Link HĐ",
        "HĐ 3 năm",
        "Số hợp đồng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Link HĐ",
        "HĐ không thời hạn",
        "Số hợp đồng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Link HĐ"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "Type1",
        "CodeWork1",
        "DateStart1",
        "DateEnd1",
        "RowID12",
        "Type2",
        "CodeWork2",
        "DateStart2",
        "DateEnd2",
        "RowID21",
        "Type3",
        "CodeWork3",
        "DateStart3",
        "DateEnd3",
        "RowID31",
        "Type4",
        "CodeWork4",
        "DateStart4",
        "DateEnd4",
        "RowID41",
        "Type5",
        "CodeWork5",
        "DateStart5",
        "DateEnd5",
        "RowID51"
      ];
      GetListEmployeeWorkProcess().then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách loại HĐLĐ",
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export7() {
      // var n = Date.parse(this.month).toString('MM-yyyy')
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Khối ngành",
        "Trình độ học vấn",
        "Chuyên ngành",
        "Nơi đào tạo",
        "Thời gian đào tạo",
        "Xếp loại bằng cấp"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "SpecializedFather",
        "Degree",
        "Specialized",
        "TrainingPlaces",
        "TranningTime",
        "DegreeLevel"
      ];
      GetListEmployee2({ search: this.search, pageSize: 100000, page: 1 }).then(
        response => {
          var data = response.Data;
          import("@/vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
              header: tHeader,
              data: this.formatJson(filterHeader, data),
              filename: "Tổng hợp trình độ chuyên môn ",
              autoWidth: true,
              bookType: "xlsx"
            });
          });
        }
      );
    },
    Export8() {
      var n = Date.parse(this.month).toString("MM-yyyy");
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      const tHeader = [
        "Nhân viên",
        "Loại quyết định",
        "Số quyết định",
        "Ngày quyết định",
        "Ngày có hiệu lực",
        "Nội dung"
      ];
      const filterHeader = [
        "EmployeeName",
        "DecisionName",
        "DecisionNumber",
        "Date",
        "DateStart",
        "Content"
      ];
      GetListDecision({ month: this.month }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách quyết định NS tháng " + n,
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export9() {
      var n = Date.parse(this.month).toString("MM-yyyy");
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Ngày sinh"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "BirthDay"
      ];
      GetListEmployeeBirthDayByMonth({ month: this.month }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách sinh nhật tháng " + n,
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export10() {
      // var n = Date.parse(this.month).toString('MM-yyyy')
      const tHeader = [
        "Mã NV",
        "Họ tên bố/mẹ",
        "Phòng ban",
        "Chức danh",
        "Họ tên con",
        "Giới tính",
        "Ngày sinh"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "RelativeName",
        "RelativeSex",
        "RelativeBirth"
      ];
      GetListChildren().then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách con nhân viên ",
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    Export11() {
      const tHeader = [
        "Trạng thái",
        "Mã NV",
        "Họ tên",
        "Chinh nhánh",
        "Phòng ban",
        "Địa bàn",
        "Chức danh",
        "Ngày sinh",
        "Nơi sinh",
        "Giới tính",
        "Dân tộc",
        "Tôn giáo",
        "Địa chỉ",
        "Hộ khẩu thường trú",
        "Địa chỉ hiện tại",
        "Số điện thoại",
        "Số CMND/CCCD",
        "Ngày cấp",
        "Nơi cấp",
        "Email",
        "Link facebook",
        "Tình trạng hôn nhân",
        "Tình trạng sức khỏe",
        "Chuyên ngành đào tạo",
        "Trình độ chuyên môn",
        "Thời gian đào tạo",
        "Nơi đào tạo",
        "Năng khiếu",
        "Ngày vào công ty",
        "Loại hợp đồng",
        "MST",
        "BHXH",
        "Email công ty",
        "Trạng thái làm việc",
        "Lần cập nhật gần nhất",
        "Người duyệt",
        "Thời gian duyệt",
        "Ghi chú"
      ];
      const filterHeader = [
        "Status",
        "EmployeeCode",
        "EmployeeName",
        "Branch",
        "Office",
        "Place",
        "Position",
        "BirthDay",
        "BirthAddress",
        "Sex",
        "Folk",
        "Religion",
        "Address",
        "AddressOften",
        "AddressNow",
        "Phone",
        "CMND",
        "DateCMND",
        "PlaceCMND",
        "Email",
        "LinkFace",
        "Matrimony",
        "Health",
        "Specialized",
        "Degree",
        "TranningTime",
        "TrainingPlaces",
        "Gifted",
        "DateStartWork",
        "WorkProcess",
        "MST",
        "BHXH",
        "EmailCompany",
        "StatusWork",
        "Time",
        "ManagerName",
        "TimeAccept",
        "Note"
      ];
      GetListEmployee({ search: this.search, pageSize: 100000, page: 1 }).then(
        response => {
          var data = response.Data;
          import("@/vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
              header: tHeader,
              data: this.formatJson(filterHeader, data),
              filename: "Danh sách nhân sự tổng hợp",
              autoWidth: true,
              bookType: "xlsx"
            });
          });
        }
      );
    },
    Export12() {
      // var n = Date.parse(this.month).toString('MM-yyyy')
      var n = Date.parse(this.month).toString("MM-yyyy");
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      const tHeader = [
        "Mã NV",
        "Họ tên",
        "Phòng ban",
        "Chức danh",
        "Mã số BHXH",
        "Mức đóng",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Chi phí doanh nghiệp",
        "Kinh phí công đoàn",
        "NLĐ đóng",
        "Chi phí BH dự kiến"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "Office",
        "Position",
        "BHXH",
        "BH1",
        "DateStart",
        "DateEnd",
        "BH2",
        "BH3",
        "BH4",
        "BH5"
      ];
      GetListEmployeeWorkProcess2({ month: this.month }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Chi phí BHXH tháng" + n,
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.inforStatusText(v[j]);
          } else if (j === "RowID12" && v[j] != null) {
            return "https://icpc1hn.work/#/chi-tiet-hop-dong-thu-viec/" + v[j];
          } else if (
            (j === "RowID21" ||
              j === "RowID31" ||
              j === "RowID41" ||
              j === "RowID51") &&
            v[j] != null
          ) {
            return "https://icpc1hn.work/#/chi-tiet-hop-dong/" + v[j];
          } else if (j === "BH2") {
            var a = v[j].replace(",", "");
            return parseInt(a) * 215;
          } else if (j === "BH3") {
            var a = v[j].replace(",", "");
            return parseInt(a) * 20;
          } else if (j === "BH4") {
            var a = v[j].replace(",", "");

            return parseInt(a) * 105;
          } else if (j === "BH5") {
            var a = v[j].replace(",", "");
            return parseInt(a) * 320;
          } else if (j === "NumberWork") {
            if (v[j] != null) {
              var startDate = new Date(v[j]);
              // Do your operations
              var endDate = new Date();
              var seconds =
                (endDate.getTime() - startDate.getTime()) / 86400000;
              return parseInt(seconds);
            } else {
              return "Chưa cập nhật";
            }
          }
          // else if (j === "NumberWork") {
          //   if (v[j] != null) {
          //     var startDate = new Date(v[j]);
          //     // Do your operations
          //     var endDate = new Date();
          //     var seconds =
          //       (endDate.getTime() - startDate.getTime()) / 86400000;
          //     var year = parseInt(seconds / 365);
          //     var month = parseInt((seconds - year * 365) / 30);
          //     var date = seconds - year * 365 - month * 30;
          //     return year + "-năm " + month + "-tháng " + date + "-ngày";
          //   } else {
          //     return "Chưa cập nhật";
          //   }
          // }
          else if (j === "DateStartWork") {
            if (v[j] != null) {
              var startDate = new Date(v[j]);

              return Date.parse(startDate).toString("dd/MM/yyyy");
            } else {
              return "Chưa cập nhật";
            }
          } else if (j === "DateEndWork") {
            if (v[j] != null) {
              var startDate = new Date(v[j]);

              return Date.parse(startDate).toString("dd/MM/yyyy");
            } else {
              return "Chưa cập nhật";
            }
          } else if (j === "BirthDay") {
            if (v[j] != null) {
              var startDate = new Date(v[j]);

              return Date.parse(startDate).toString("dd/MM/yyyy");
            } else {
              return "Chưa cập nhật";
            }
          } else {
            return v[j];
          }
        })
      );
    },

    viewDetail(row) {
      this.userofIT = row;
      this.dialogForm = true;
    },
    setKH(row) {
      this.userofIT = row;
      this.dialogFormKH = true;
    },
    setKHOK() {
      this.dialogFormKH = false;
      this.fetchData();
    },
    setOTC(row) {
      this.userofIT = row;
      this.dialogFormOTC = true;
    },
    setOTCOK() {
      this.dialogFormOTC = false;
      this.fetchData();
    },

    acceptInfor(row) {
      this.user = [];
      this.user.push(row);
      //console.log(this.user)
      this.dialogFormAccept = true;
    },
    acceptOK() {
      this.dialogFormAccept = false;
      this.fetchData();
    },
    Search() {
      Cookies.set("search", this.search);
      Cookies.set("page", this.currentPage);
      Cookies.set("pageSize", this.pageSize);
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      GetListEmployee({
        search: this.search,
        pageSize: this.pageSize,
        page: this.currentPage
      }).then(res => {
        this.listEm = res.Data;
        this.Admin = res.Admin;
        this.currentPage = res.PageNumber;
        this.pageSize = res.RowspPage;
        this.total = res.TotalPage * res.RowspPage;
        this.listLoading = false;
      });
    },
    updateHC() {}
  },
  created() {
    GetEmployeeStatusCount().then(res => {
      console.log(res.Data[0]);
      this.danglam = res.Data[0];
      this.nghiviec = res.Data[3];
      this.nghide = res.Data[1];
      this.nghikoluong = res.Data[2];
    });
    if (Cookies.get("search")) {
      this.search = Cookies.get("search");
    }

    if (Cookies.get("page")) {
      this.currentPage = Cookies.get("page");
    }

    if (Cookies.get("pageSize")) {
      this.pageSize = Cookies.get("pageSize");
    }
    this.fetchData();
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    report: function() {
      if (this.report == 9 || this.report == 8 || this.report == 12) {
        this.displayMonth = true;
      } else {
        this.displayMonth = false;
      }

      if (this.report == 2 || this.report == 3) {
        this.displayDStart = true;
        this.displayDEnd = true;
      } else {
        this.displayDStart = false;
        this.displayDEnd = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-range-editor.el-input__inner {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 3px 10px;
  width: 100%;
}

.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}

.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-peoples {
        background: #40c9c6;
      }

      .icon-baby {
        background: #f5dab1;
      }

      .icon-workout {
        background: #f4516c;
      }

      .icon-nomoney {
        background: #909399;
      }
    }

    .icon-peoples {
      color: #40c9c6;
    }

    .icon-baby {
      color: #f5dab1;
    }

    .icon-workout {
      color: #f4516c;
    }

    .icon-nomoney {
      color: #909399;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  //  .card-panel-description {
  //     font-weight: bold;
  //     margin: 26px;
  //     margin-left: 0px;

  //     .card-panel-text {
  //       line-height: 18px;
  //       color: rgba(0, 0, 0, 0.45);
  //       font-size: 16px;
  //       margin-bottom: 12px;
  //     }

  //     .card-panel-num {
  //       font-size: 20px;
  //     }
  //   }
  // .card-panel-icon-wrapper {
  //   float: none !important;
  //   width: 20%;
  //   height: 100%;
  //   margin: 0 !important;

  //   .svg-icon {
  //     display: block;
  //     margin: 14px auto !important;
  //     float: left !important;
  //   }
  // }
  .el-item-report {
    display: none;
  }
}
</style>
