<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-select v-model="groups" clearable placeholder="Chọn nhóm">
        <el-option
          v-for="item in groupList"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block" style="margin-left: 5px;">
      <createDefine
        @click-something="createOK"
        :groups="groups"
        :serviceCode="serviceCode"
        :options="options"
      ></createDefine>
      <getDefine
        :service="service"
        :groups="groups"
        :options="options"
        @click-something="getDefineOK"
      ></getDefine>
      <editDefine
        :row="rowDefine"
        :options="options"
        @click-something="editDefineOK"
      ></editDefine>
      <deleteDefine
        :row="rowDefine"
        :options="options"
        @click-something="deleteDefineOK"
      ></deleteDefine>
      <createAction
        :row="rowData"
        :groups="groups"
        :codeWork="codeWork"
        :options="options"
        @click-something="addOK"
      ></createAction>
      <editAction
        :row="rowAction"
        :options="options"
        :codeWork="codeWork"
        @click-something="editActionOK"
      ></editAction>
      <deleteAction
        :row="rowAction"
        :options="options"
        @click-something="deleteOK"
      ></deleteAction>
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="openModal"
        >Thêm định nghĩa</el-button
      >
    </div>
    <div class="inline-block floatright" style="margin-left: 5px;">
      <el-button type="warning" @click="ExportExcel">
        <i class="fas fa-file-excel"></i> Export</el-button
      >
    </div>

    <div class="inline-block floatright" style="margin-left: 5px;">
      <el-button type="danger" @click="GetService">
        <i class="fas fa-plus-square"></i> Lấy công việc có sẵn</el-button
      >
    </div>
    <div>
      <el-table
        :data="tableData"
        @expand-change="expandRow"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row>
              <el-table
                :data="scope.row.lines"
                v-model="obj"
                size="small"
                border
                style="width: 100%"
              >
                <el-table-column width="70">
                  <template slot-scope="props">
                    <el-tooltip content="Chỉnh sửa" placement="top"
                      ><el-button
                        @click="openModalEditAction(scope.row, props.row)"
                        type="text"
                      >
                        <i class="fas fa-edit"></i></el-button
                    ></el-tooltip>
                    <el-tooltip content="Xóa" placement="top"
                      ><el-button
                        @click="openModalDeleteAction(scope.row, props.row)"
                        type="text"
                      >
                        <i
                          style="color: red"
                          class="fas fa-trash-alt"
                        ></i></el-button
                    ></el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="CodeAction"
                  label="Mã CV"
                  align="center"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="Loại công việc"
                  align="center"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="KPI"
                  label="KPIcs"
                  align="center"
                  width="70"
                >
                  <template slot-scope="{ row }">
                    {{ Number(row["KPI"]) }}
                  </template>
                </el-table-column>

                <el-table-column
                  label="Thời gian xl"
                  width="100"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    {{ row["Deadline"] + row["Unit"] }}
                  </template>
                </el-table-column>
                <el-table-column prop="Note" label="Ghi chú" align="center">
                </el-table-column>
                <el-table-column prop="Error" label="Lỗi" align="center">
                </el-table-column>
                <el-table-column
                  prop="LevelError"
                  label="Mức lỗi"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="PenatyScore"
                  label="Phạt KPIcs"
                  width="100"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    {{ Number(row["PenatyScore"]) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Auto"
                  label="Tự động"
                  width="100"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    {{ row["Auto"] | autoTextFilter }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="KPIsChoice"
                  label="Sửa khi giao kết"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    {{ row["KPIsChoice"] | KPIsChoiceFilter }}
                  </template>
                </el-table-column>
              </el-table>
              <el-tooltip content="Tạo loại công việc" placement="top"
                ><el-button @click="openModalAction(scope.row)" type="text">
                  <i style="color: red" class="fas fa-plus"></i></el-button
              ></el-tooltip>
            </el-row>
            <template> </template>
          </template>
        </el-table-column>
        <el-table-column align="center" width="125px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Chỉnh sửa" placement="top"
              ><el-button @click="openModalEditDefine(scope.row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="openModalDeleteDefine(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="nameEmployee"
          width="150"
          label="Người tạo"
        ></el-table-column>
        <el-table-column
          prop="ServiceCode"
          width="100"
          label="Mã"
        ></el-table-column>
        <el-table-column prop="Service" label="Dịch vụ"></el-table-column>
        <el-table-column align="center" width="100" label="Phân loại">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Public | publicColorFilter">
              {{ scope.row.Public | publicTextFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="IDGroup"
          width="100"
          label="Nhóm"
        ></el-table-column>
        <el-table-column
          width="100"
          prop="KPI"
          label="Chỉ tiêu KPI"
        ></el-table-column>
        <el-table-column prop="Note" label="Ghi chú"></el-table-column>
        <el-table-column align="center" width="100" label="Trạng thái">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | ServiceStatusColor">
              {{ scope.row.Status | ServiceStatusText }}
            </el-tag>
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
    </div>
  </div>
</template>

<script>
import CreateDefine from "@/views/order/orderDefine/component/createDefine";
import GetDefine from "@/views/order/orderDefine/component/getDefine";
import EditDefine from "@/views/order/orderDefine/component/editDefine";
import DeleteDefine from "@/views/order/orderDefine/component/deleteDefine";
import CreateAction from "@/views/order/orderDefine/component/createAction";
import EditAction from "@/views/order/orderDefine/component/editAction";
import DeleteAction from "@/views/order/orderDefine/component/deleteAction";

import { parseTime } from "@/utils/index";
import {
  getOrderSend,
  createOrderSend,
  getService,
  getAction,
  getCodeWork,
  getOffice,
  getServiceAction,
  getServicePublic
} from "@/api/order";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    publicTextFilter(Public) {
      if (Public == 1) return "Dịch vụ";
      else return "Nội bộ";
    },
    publicColorFilter(Public) {
      if (Public == 1) return "success";
      else return "danger";
    },
    autoTextFilter(auto) {
      if (auto == 1) return "Tự động";
      else return "";
    },
    KPIsChoiceFilter(auto) {
      if (auto == 1) return "Cho phép";
      else return "";
    }
  },
  components: {
    CreateDefine,
    CreateAction,
    EditAction,
    DeleteAction,
    EditDefine,
    GetDefine,
    DeleteDefine
  },
  data() {
    return {
      tableData: [],
      options: [{}],
      groupList: [{}],
      codeWork: "",
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      rowData: [],
      rowAction: [],
      rowDefine: [],
      IDService: 0,
      service: [],
      obj: "",
      groups: "",
      serviceCode: Cookies.get("idGroup")
    };
  },
  methods: {
    ExportExcel() {
      const tHeader = [
        "Nhóm",
        "Mã CV/ lỗi",
        "Công việc",
        "Phân loại nhóm CV",
        "Chỉ tiêu tháng",
        "Điểm",
        "Đơn vị tính",
        "Số phút xử lý",
        "Lỗi",
        "Mức lỗi",
        "Điểm trừ",
        "Trạng thái"
      ];
      const filterHeader = [
        "IDGroup",
        "CodeAction",
        "nameAction",
        "Service",
        "KPI",
        "kpiAction",
        "Note",
        "Deadline",
        "Error",
        "LevelError",
        "PenatyScore",
        "Status"
      ];
      getServiceAction({
        idGroup: this.groups,
        token: Cookies.get("token")
      }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Báo cáo",
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
            return this.$options.filters.ServiceStatusText(v[j]);
          }
          // else if(j === 'Deadline'){
          //   return this.$options.filters.toDate(v[j])
          // }
          else {
            return v[j];
          }
        })
      );
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },

    fetchCodeWork() {
      var req = {
        IDGroup: this.groups
      };
      //console.log(req)
      getCodeWork(req).then(response => {
        this.codeWork = response.Data;
        //console.log(this.codeWork)
      });
    },
    fetchOffice() {
      this.listLoading = true;
      getOffice().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    openModal() {
      this.serviceCode = this.groups;
      VoerroModal.show("new-define-modal");
    },
    openModalEditDefine(row) {
      this.rowDefine = row;
      VoerroModal.show("edit-define-modal");
    },
    openModalDeleteDefine(row) {
      this.rowDefine = row;
      VoerroModal.show("delete-define-modal");
    },
    openModalAction(row) {
      this.rowDefine = row;
      VoerroModal.show("new-action-modal");
    },
    openModalEditAction(row, line) {
      this.rowDefine = row;
      this.rowAction = line;
      //console.log(row);
      //  if(row.Status == 10){
      //    this.$notify({
      //      title: 'Không thể chỉnh sửa',
      //      message: 'Nhóm việc đã ở trạng thái chốt',
      //      type: 'warning',
      //      position: 'top-left'
      //    })
      //  }else if(row.Status < 10){
      VoerroModal.show("edit-action-modal");
      //}
    },
    openModalDeleteAction(row, line) {
      //console.log(row);
      this.rowDefine = row;
      this.rowAction = line;
      //alert(row.IDAction);
      //this.IDService= rowData.IDService;
      if (row.Status == 10) {
        this.$notify({
          title: "Không thể xóa",
          message: "Nhóm việc đã ở trạng thái chốt",
          type: "warning",
          position: "top-left"
        });
      } else if (row.Status < 10) {
        VoerroModal.show("delete-action-modal");
      }
    },

    fetchData() {
      this.loadingTableData = true;
      var req = {
        //startDate: this.DateBegin,
        //endDate: this.DateEnd,
        idGroup: this.groups,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      };
      //console.log(req);
      getService(req).then(res => {
        //console.log(res.Data);
        this.loadingTableData = false;
        this.tableData = res.Data;
        // console.log(this.tableData);
        this.total = res.TotalPage * res.RowspPage;
      });
    },
    fetchService() {
      var req = {
        idGroup: this.groups
      };
      //console.log(req);
      //alert('ok')
      getServicePublic(req).then(res => {
        //console.log(res);
        this.loadingTableData = false;
        this.service = JSON.parse(JSON.stringify(res.Data));
        //console.log(res.Data);
      });
    },
    GetService() {
      //this.service = this.groups;
      //alert('ok');
      VoerroModal.show("get-define-modal");
    },
    getDefineOK() {
      this.fetchData();
    },
    expandRow(row) {
      this.rowData = row;
      //console.log(row);
      var req = {
        IDService: row.IDService
      };
      getAction(req).then(res => {
        row.lines = res.Data;
        this.obj = res.Data;
      });
    },
    addOK(form) {
      //form = JSON.parse(JSON.stringify(form));
      //console.log(form);
      //this.obj.push(form[0]);
      //console.log(this.obj);
      //this.fetchData();
      this.expandRow(this.rowDefine);
    },
    editDefineOK(form) {},
    deleteDefineOK(form) {
      this.fetchData();
    },
    editActionOK(form) {
      //this.fetchData();
      this.expandRow(this.rowDefine);
    },
    deleteOK(form) {
      // console.log(form);
      //this.obj.remove(form);
      //this.fetchData();
      this.expandRow(this.rowDefine);
    },
    createOK(form) {
      this.tableData.push(form);

      this.fetchData();
      this.fetchGroup();
    }
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
      //this.fetchEmployee();
      this.fetchService();
      this.fetchCodeWork();
    }
  },
  created() {
    //this.DateBegin = getStartDate();
    //this.DateEnd = getEndDate();
    this.fetchOffice();
    this.fetchData();
    this.fetchGroup();
    this.fetchService();
    this.fetchCodeWork();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}
</style>
