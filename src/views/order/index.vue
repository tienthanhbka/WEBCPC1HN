<template>
  <div class="container">
    <div class="filter-container">
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
      <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="DayBegin"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="DayEnd"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <el-input
          class="search"
          placeholder="Tìm kiếm"
          v-model="search"
        ></el-input>
        <el-button class="bt-search" type="infor" @click="SearchOrder">
          <i class="fas fa-search"></i
        ></el-button>
      </div>

      <div class="inline-block floatright" style="margin-left: 5px;">
        <!-- <el-button type="warning" @click="ExportExcel"> <i class="fas fa-file-excel"></i> Export</el-button> -->
      </div>
      <!-- <div class="inline-block floatright">
        <el-button type="success">
          <i class="fas fa-file-excel"></i> Export
        </el-button>
      </div> -->
    </div>
    <div>
      <deleteModal
        :row="rowSelect"
        :Name="Name"
        :groups="groups"
        :Action="Action"
        @click-something="deleteOK"
      ></deleteModal>
      <modal
        :row="rowSelect"
        :employee="options"
        :Name="Name"
        :groups="groups"
        :Action="Action"
        @click-something="addOK"
      ></modal>
      <editModal
        :row="rowSelect"
        :employee="options"
        :Name="Name"
        :groups="groups"
        :Action="Action"
        @click-something="editOK"
      ></editModal>
      <receive :row="rowSelect"></receive>
      <report :row="rowData" @click-something="reportOK"></report>
      <el-table
      class="el-mobile-table"
        v-loading="listLoading"
        :data="orderList"
        element-loading-text="Loading"
        style="width:100%"
        border
        fit
        highlight-current-row
        @expand-change="expandRow"
        @filter-change="filterStatus"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="6">
                <!-- <p>Đơn vị nhận: {{ props.row.SendToOffice }}</p>
          <p>Mô tả thêm: {{ props.row.content }}</p> -->
                <div
                  style="margin-top: 10px; margin-bottom:20px; font-size: 20px;"
                  v-if="props.row.filePath != null"
                >
                  <a
                    :href="
                      'https://icpc1hn.work/api/' +
                        'FileOrderSend/' +
                        props.row.filePath +
                        '?token=' +
                        token
                    "
                    ><i class="el-icon-download">Tải file đính kèm</i></a
                  >
                </div>
                <span v-if="props.row.Product != null"
                  >Sản phẩm: {{ props.row.Product }}</span
                >
                <span v-if="props.row.Partner != null"
                  >Đối tác: {{ props.row.Partner }}</span
                >
                <p v-if="props.row.Comment != null">
                  Nhận xét: {{ props.row.Comment }}
                </p>

                <el-button @click="openModal(props.row)" type="primary"
                  ><i class="el-icon-s-promotion"></i> Giao - Nhận
                  việc</el-button
                >

                <!-- <el-button type="warning" icon="el-icon-bottom" @click="openReceive" circle></el-button> -->
              </el-col>
              <el-col>
                <el-table
                  :data="props.row.lines"
                  v-model="obj"
                  border
                  style="width: 100%"
                >
                  <el-table-column align="center" width="75px" label="">
                    <template slot-scope="scope">
                      <el-tooltip content="Chỉnh sửa" placement="top"
                        ><el-button
                          @click="openModalEditAdminOrderSend(scope.row)"
                          type="text"
                        >
                          <i class="fas fa-edit"></i></el-button
                      ></el-tooltip>
                      <el-tooltip content="Xóa" placement="top"
                        ><el-button
                          @click="openModalDeleteAdminOrderSend(scope.row)"
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
                    prop="NameEmployee"
                    label="Nhân viên"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column label="Trạng thái">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.Status | statusClassFilter">{{
                        scope.row.Status | statusTextFilter
                      }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="Title"
                    label="Loại việc"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="Content"
                    label="Chi tiết"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="KPIcs" width="80">
                    <template slot-scope="{ row }">
                      {{ Number(row["KPIBase"]) }}
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="Rate"
                    align="center"
                    label="Khối lượng"
                    width="80"
                  >
                  </el-table-column>
                  <!-- <el-table-column
      prop="KPI"
      label="KPI"
      width="80">
    </el-table-column> -->
                  <el-table-column align="center" label="Giao việc">
                    <template slot-scope="scope">{{
                      scope.row.Time | toDate
                    }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="Hạn chót">
                    <template slot-scope="scope">{{
                      scope.row.Deadline | toDate
                    }}</template>
                  </el-table-column>
                  <el-table-column label="Hoàn thành" align="center">
                    <template style="text-align: center;" slot-scope="scope">{{
                      scope.row.TimeFinish | toDate
                    }}</template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <template> </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="No_" label="STT" width="95">
          <template slot-scope="scope">{{
            scope.$index + 1 + (currentPage - 1) * 10
          }}</template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="Trạng thái"
          align="center"
          :filters="[
            { text: 'Hoàn thành', value: '10' },
            { text: 'Đã xong', value: '6' },
            { text: 'Đang xử lý', value: '3' },
            { text: 'Đã dừng', value: '2' },
            { text: 'Mới tạo', value: '1' },
            { text: 'Đã hủy', value: '0' }
          ]"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | statusClassFilter">{{
              scope.row.Status | statusTextFilter
            }}</el-tag>
            <el-button
              size="mini"
              type="success"
              @click="Report(scope.$index, scope.row)"
              ><i class="el-icon-finished">Báo cáo</i></el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Nhóm việc">
          <template slot-scope="scope">{{ scope.row.Service }}</template>
        </el-table-column>
        <el-table-column label="Yêu cầu">
          <template slot-scope="scope">{{ scope.row.Name }}</template>
        </el-table-column>

        <el-table-column label="Chi tiết">
          <template slot-scope="scope">{{ scope.row.Content }}</template>
        </el-table-column>

        <el-table-column label="Ghi chú">
          <template slot-scope="scope">{{ scope.row.Note }}</template>
        </el-table-column>

        <el-table-column label="Người đề nghị" align="center">
          <template slot-scope="scope">{{ scope.row.NameEmployee }}</template>
        </el-table-column>
        <el-table-column label="SĐT" align="center">
          <template slot-scope="scope">{{ scope.row.IDEmployee }}</template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Đơn vị" align="center">
          <template slot-scope="scope">{{ scope.row.idGroup }}</template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="Thời hạn"
          width="110"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.Deadline | toDate
          }}</template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @current-change="fetchData"
      :page-size.sync="RowspPage"
      layout="prev, pager, next"
      :total="totalPage * 10"
    ></el-pagination>
  </div>
</template>

<style scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
.search {
  width: 120px;
}
.el-header {
  padding-top: 15px;
  height: 55px;
}
.floatright {
  float: right;
}
.el-pagination {
  float: right;
  margin-top: 15px;
}

@media only screen and (max-width: 600px) {
  .inline-block {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .search {
    width: 80%;
  }
}
</style>

<script>
import { getOrder, getAction, getOrderSearch } from "@/api/order"
import { getEmployee } from "@/api/order"
import { getOrderTable } from "@/api/order"
import { setOrder } from "@/api/order"
import { GetGroupEmployee } from "@/api/groups"
import Modal from "@/views/order/component/modal"
import EditModal from "@/views/order/component/editAdminOrderEmployee"
import Receive from "@/views/order/component/receive"
import Report from "@/views/order/component/reportOrder"
import DeleteModal from "@/views/order/component/deleteOrderEmployee"
import Cookies from "js-cookie"
import { getStartMonth, getEndMonth } from "@/api/index"

export default {
  components: {
    Modal,
    Receive,
    Report,
    EditModal,
    DeleteModal
  },
  filters: {
    statusClassFilter(status) {
      const statusMap = {
        0: "danger",
        1: "",
        2: "danger",
        3: "warning",
        4: "",
        5: "warning",
        6: "",
        7: "gray",
        8: "success",
        10: "success"
      };
      return statusMap[status];
    },
    statusTextFilter(status) {
      const statusMap = {
        0: "Đã hủy",
        1: "Mới tạo",
        2: "Đang xử lý",
        3: "Đang xử lý",
        4: "",
        5: "Đã xong",
        6: "Đã xong",

        10: "Đã hoàn thành"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      currentPage: 1,
      search: "",
      fileList: [],
      totalPage: 1,
      RowspPage: 10,
      TextSearch: "",
      DayBegin: "",
      DayEnd: "",
      listLoading: false,
      orderList: [],
      rowSelect: [],
      groupList: [],
      Name: "",
      status: "",
      IDService: "",
      token: Cookies.get("token"),
      options: [{}],
      rowData: "",
      Action: [],
      value: "",
      id: "",
      obj: "",
      groups: Cookies.get("idGroup")
    };
  },
  methods: {
    openModal(row) {
      if (row.Status < 10) {
        VoerroModal.show("new-request-modal");
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Yêu cầu đã hoàn thành, không thể nhận việc",
          type: "warning",
          position: "top-left"
        });
      }

      //console.log(this.rowSelect);
    },
    openModalEditAdminOrderSend(row) {
      this.rowSelect = row;
      //console.log(row);
      VoerroModal.show("edit-request-modal");
    },
    openModalDeleteAdminOrderSend(row) {
      this.rowSelect = row;
      //console.log(row);
      VoerroModal.show("delete-request-modal-employee");
    },
    SearchOrder() {
      //alert('OK')
      this.fetchData();
      // var req = {
      //   admin: this.groups,
      //   search: this.search
      // };
      // this.listLoading = true;
      // getOrderSearch(req).then(response => {
      //   this.orderList = response.Data;
      //    this.listLoading = false;
      // });
    },
    addOK(form) {
      this.obj.push(form);
    },
    editOK(form) {
      //this.obj.push(form);
    },
    deleteOK(form) {
      for (var i = 0; i < this.obj.length; i++) {
        if (this.obj[i].RowID === form.RowID) {
          this.obj.splice(i, 1);
          break;
        }
      }

      //this.obj.push(form);
    },
    openReceive() {
      VoerroModal.show("new-receive-modal");
    },
    create() {},
    reportOK() {
      this.fetchData();
    },
    Report(index, row) {
      this.rowData = row;
      //console.log(this.rowData);
      if (this.rowData.Status < 10) {
        VoerroModal.show("report-order-modal");
      }
    },
    fetchAction() {
      //alert('OK')
      var req = {
        IDService: this.IDService
      };
      //this.listLoading = true;
      getAction(req).then(response => {
        this.Action = response.Data;
        //console.log(this.Action);
        //this.listLoading = false;
      });
    },
    filterStatus(filters) {
      var lenght = filters[Object.keys(filters)[0]].lenght;
      //console.log(lenght)
      var sta = filters[Object.keys(filters)[0]];
      var parsedobj = JSON.parse(JSON.stringify(sta));
      var status = parsedobj.toString();
      this.status = status;

      //this.currentPage = pageNum;
      var req = {
        DayBegin: this.DayBegin,
        DayEnd: this.DayEnd,
        PageNumber: this.currentPage,
        admin: this.groups,
        RowspPage: 10,
        status: status,
        search: this.search
      };
      this.listLoading = true;
      getOrder(req).then(response => {
        this.orderList = response.Data;
        //console.log(response.Data);
        this.listLoading = false;
        this.totalPage = response.TotalPage;
      });
    },
    fetchData(pageNum) {
      if (pageNum == null) pageNum = 1;
      this.currentPage = pageNum;
      var req = {
        DayBegin: this.DayBegin,
        DayEnd: this.DayEnd,
        PageNumber: pageNum,
        admin: this.groups,
        RowspPage: this.RowspPage,
        search: this.search,
        status: this.status
      };
      this.listLoading = true;
      getOrder(req).then(response => {
        this.orderList = response.Data;
        //console.log(response);
        this.listLoading = false;
        this.totalPage = response.TotalPage;
        this.RowspPage = response.RowspPage;
      });
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;
        this.fetchEmployee();
      });
    },
    fetchEmployee() {
      var req = {
        admin: this.groups
        //idEmployee: Cookies.get('idEmployee'),
      };
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    expandRow(row) {
      // if (row.lines == null) {
      this.rowSelect = row;
      var ID = row.IDOrder;
      this.id = row.ID;
      this.IDService = row.IDService;
      this.Name = "[" + row.Name + "] " + row.Content;
      //row.listLoading=true;
      getOrderTable({
        ID: ID
      }).then(res => {
        row.lines = res.Data;
        this.obj = res.Data;
        //console.log(res.Data);
      });
      //   getAction({IDService: row.IDService}).then(response => {
      //   this.Action = response.Data;
      //   console.log(response);
      //   //this.listLoading = false;
      //   //alert('OK');
      // });
      //this.fetchAction(row.IDService);
    }
  },
  mounted() {},
  watch: {
    IDService: function() {
      this.fetchAction();
    },
    groups: function() {
      this.fetchData();
      this.fetchEmployee();
    },
    DayBegin: function() {
      this.fetchData();
      //this.fetchEmployee();
    },
    DayEnd: function() {
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
    this.DayBegin = getStartMonth();
    this.DayEnd = getEndMonth();
    this.fetchData();
    // this.fetchEmployee();
    this.fetchGroup();
  }
};
</script>
<style scoped>
.container{
  padding: 5px;
  min-height: 100vh;
}
</style>