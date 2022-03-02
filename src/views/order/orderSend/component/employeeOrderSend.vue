<template>
  <div class="my-mission-container">
    <div>
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
        <span></span>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <createOrderSend
        :groups="groups"
        @click-something="CreateOK"
      ></createOrderSend>
      <editOrderSend
        :row="rowData"
        :groups="groups"
        @click-something="editOK"
      ></editOrderSend>
      <deleteOrderSend
        :row="rowData"
        :groups="groups"
        @click-something="deleteOK"
      ></deleteOrderSend>
      <cloneOrderSend :row="rowData" :options="options"> </cloneOrderSend>
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="openModal"
        >Tạo yêu cầu</el-button
      >
    </div>
    <div>
      <el-table
        class="el-mobile-table"
        :data="tableData"
        @expand-change="handleExpandChange"
        @filter-change="filterStatus"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-table
                :data="props.row.lines"
                v-model="obj"
                border
                style="width: 100%"
              >
                <!-- <el-table-column
      width="100"  >
      <template slot-scope="props">
      
        </template> 
    </el-table-column> -->
                <el-table-column
                  prop="IDGroup"
                  label="Nhóm"
                  align="center"
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="Status"
                  label="Trạng thái"
                  align="center"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | orderStatusColor">{{
                      scope.row.Status | orderStatusText
                    }}</el-tag>
                  </template>
                </el-table-column>
                <!-- <el-table-column
      prop="TimeCreate"
      label="Bắt đầu"
      align="center"
      width="80">
      <template slot-scope="{row}">
        {{Number(row['KPI']) }}
      </template>
    </el-table-column> -->
                <el-table-column
                  prop="TimeCreate"
                  label="Gửi"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.TimeCreate | toDate }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Deadline"
                  label="Hạn"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.Deadline | toDate }}
                  </template>
                </el-table-column>
                <el-table-column prop="Note" label="Ghi chú" align="center">
                </el-table-column>
                <el-table-column
                  prop="ReComment"
                  label="Bình luận"
                  align="center"
                >
                </el-table-column>
              </el-table>
              <!-- <el-tooltip content="Tạo loại công việc"  placement="top"><el-button @click="openModalAction" type="text" > <i style="color: red" class="fas fa-plus"></i></el-button></el-tooltip> -->
            </el-row>
          </template>
        </el-table-column>
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <placeTable :tableData="props.row.places" :mission="props.row"></placeTable>
          </template>
        </el-table-column> -->
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
              <el-tooltip content="Sao yêu cầu" placement="top"
                ><el-button type="text" @click="Clone(scope.$index, scope.row)">
                  <i
                    class="el-icon-s-promotion
"
                  ></i></el-button
              ></el-tooltip>
            </div>
            <!-- <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditOrderSend(props.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        <el-tooltip content="Xóa" placement="top"><el-button  @click="openModalDeleteOrderSend(props.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column align="center" width="100px" label="">
          <template slot-scope="scope">
            <div class="dat-cell">
              <el-tooltip content="Kết thúc yêu cầu" placement="top"
                ><el-button @click="openModalReport(scope.row)" type="text">
                  <i class="fas fa-check-double"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Chỉnh sửa" placement="top"
                ><el-button
                  @click="openModalEditOrderSend(scope.row)"
                  type="text"
                >
                  <i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top"
                ><el-button
                  @click="openModalDeleteOrderSend(scope.row)"
                  type="text"
                >
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          width="150"
          align="center"
          :filters="[
            { text: 'Hoàn thành', value: '10' },
            { text: 'Đã xong', value: '6' },
            { text: 'Đang xử lý', value: '3' },
            { text: 'Mới tạo', value: '1' }
          ]"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.Status | orderStatusColor">{{
                scope.row.Status | orderStatusText
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="Yêu cầu" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Yêu cầu">{{ scope.row.Name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Content" label="Chi tiết" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chí tiết">{{ scope.row.Content }}</div>
          </template></el-table-column
        >
        <el-table-column label="Hạn chót" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hạn chót">
              {{ scope.row.Deadline | toDate }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Thời gian gửi" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian gửi">
              {{ scope.row.TimeCreate | toDate }}
            </div></template
          >
        </el-table-column>

        <el-table-column prop="Product" label="Sản phẩm" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.Product }}
            </div></template
          ></el-table-column
        >
        <el-table-column prop="Note" label="Ghi chú" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div></template
          ></el-table-column
        >
        <el-table-column prop="ReComment" label="Bình luận" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Bình luận">
              {{ scope.row.Comment }}
            </div></template
          ></el-table-column
        >
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
import CreateOrderSend from "@/views/order/component/createOrderSend";
import EditOrderSend from "@/views/order/component/editOrderSend";
import DeleteOrderSend from "@/views/order/component/deleteOrderSend";
import CloneOrderSend from "@/views/order/component/cloneOrderSend";
import { report } from "@/api/getRequest";
import { parseTime } from "@/utils/index";
import {
  getOrderSend,
  createOrderSend,
  getOfficeService,
  getOrderGroup
} from "@/api/order";
import Cookies from "js-cookie";
import { getStartMonth, getEndMonth } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    }
  },
  components: {
    CreateOrderSend,
    CloneOrderSend,
    EditOrderSend,
    DeleteOrderSend
  },
  data() {
    return {
      tableData: [],
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      status: "",
      pageSize: 10,
      rowData: [],
      options: [{}],
      rowData: [],
      obj: "",
      groups: Cookies.get("idGroup"),
      groupList: []
    };
  },
  methods: {
    openModalReport(row) {
      this.rowData = row;
      var rep = {
        IDOrder: row.ID,
        IDGroup: row.IDGroup,
        Status: 10,
        token: Cookies.get("token")
      };
      report(rep).then(response => {
        if (response.ResCode == 0) {
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: "Thành công",
            message: "Yêu cầu đã thực hiện xong",
            type: "success",
            position: "top-left"
          });

          //console.log(response.ResCode);
          this.listLoading = false;
          this.fetchData();
        }
      });
    },
    openModalEditOrderSend(row) {
      this.rowData = row;
      //console.log(this.rowData);
      VoerroModal.show("edit-order-send-modal");
    },
    openModalDeleteOrderSend(row) {
      this.rowData = row;
      //console.log(this.rowData);
      VoerroModal.show("delete-order-send-modal");
    },
    openModal() {
      VoerroModal.show("new-order-send-modal");
    },
    editOK() {
      this.fetchData();
    },
    deleteOK() {
      this.fetchData();
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee")
      };

      GetGroupEmployee(req).then(response => {
        //console.log(response);
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
        //console.log(this.groupList);
      });
    },
    Clone(index, row) {
      // console.log(row);
      this.rowData = row;
      var rep = {
        IDService: this.rowData.IDService
      };

      this.listLoading = true;
      getOfficeService(rep).then(response => {
        //this.options = response.Data;
        this.options = JSON.parse(JSON.stringify(response.Data));

        //console.log(this.options[0]);
        this.listLoading = false;
      });
      VoerroModal.show("clone-order-send-modal");
    },
    handleExpandChange(row) {
      this.rowData = row;
      var req = {
        IDOrder: row.ID
      };
      getOrderGroup(req).then(res => {
        row.lines = res.Data;
        this.obj = res.Data;
      });
    },
    CreateOK() {
      this.fetchData();
    },
    fetchOffice() {},

    fetchData() {
      this.loadingTableData = true;
      var req = {
        startDate: this.DateBegin,
        endDate: this.DateEnd,
        id: Cookies.get("idEmployee"),
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        status: this.status
      };
      //console.log(req);
      getOrderSend(req).then(res => {
        //console.log(res.Data);
        this.loadingTableData = false;
        // for (var i in res.Data) {
        //   res.Data[i].places = null;
        //   res.Data[i].isLoading = false;
        // }
        this.tableData = res.Data;
        this.total = res.TotalPage * res.RowspPage;
      });
    },
    filterStatus(filters) {
      //var lenght = filters[Object.keys(filters)[0]].lenght
      //console.log(lenght)
      var sta = filters[Object.keys(filters)[0]];

      var parsedobj = JSON.parse(JSON.stringify(sta));
      this.status = parsedobj;
      //console.log(parsedobj)
      //console.log(parsedobj.length)
      var req = {
        startDate: this.DateBegin,
        endDate: this.DateEnd,
        id: Cookies.get("idEmployee"),
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        status: this.status
      };
      //console.log(req);
      getOrderSend(req).then(res => {
        //console.log(res.Data);
        this.loadingTableData = false;
        // for (var i in res.Data) {
        //   //res.Data[i].places = null;
        //   res.Data[i].isLoading = false;
        // }
        this.tableData = res.Data;
        this.total = res.TotalPage * res.RowspPage;
      });
    }
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    DateBegin: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
    this.DateBegin = getStartMonth();
    this.DateEnd = getEndMonth();
    this.fetchGroup();
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
.el-table .cell {

    box-sizing: border-box;
    white-space: normal;
   word-break: keep-all !important;
    line-height: 23px;
}
</style>
