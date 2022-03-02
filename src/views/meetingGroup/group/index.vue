<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-select
        v-model="otc"
        clearable
        placeholder="Chọn nhóm"
        @change="fetchData"
      >
        <el-option
          v-for="item in otcList"
          :key="item.TypeCode"
          :label="item.TypeEmployee"
          :value="item.TypeCode"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <div class="block">
        <span class="demonstration">Tháng</span>
        <el-date-picker v-model="month" type="month" placeholder="Chọn tháng">
        </el-date-picker>
      </div>
    </div>
    <div class="inline-block">
      <el-input
        style="width: 70%; "
        class="search"
        placeholder="Tìm kiếm"
        v-model="search"
      ></el-input>
      <el-button class="bt-search" type="infor" @click="fetchData">
        <i class="fas fa-search"></i
      ></el-button>
    </div>
    <div>
      <el-button type="danger" @click="closeVideo">Khóa nộp video</el-button>
      <el-button type="warning" @click="openVideo">Mở khóa nộp video</el-button>
      <el-button type="success" @click="ExportExcel">Xuất Excel</el-button>

      <el-button type="warning" @click="ExportExcelNOTMeeting"
        >Xuất Excel Chưa Đăng Ký</el-button
      >
    </div>

    <!-- <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="dateStart"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="dateEnd"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div> -->

    <!-- <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Đăng ký lịch họp</el-button>
    </div> -->

    <div>
      <!-- <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/view?usp=sharing">  </iframe>

        <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/preview" width="640" height="480"></iframe> -->
      <el-table
        :data="tableData"
        @filter-change="filterStatus"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <!-- <el-tooltip content="Xem quy định" placement="top">
               <router-link :to="'/quy-dinh/xem-quy-dinh/' + scope.row.RowID">
              <i class="far fa-eye"></i>
      </router-link></el-tooltip> -->
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <el-tooltip content="Duyệt" placement="top"
              ><el-button @click="accept(scope.row)" type="text">
                <i class="fas fa-check-double"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="IDGroup" width="150" label="Nhóm">
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          :filters="[
            { text: 'Đạt', value: '10' },
            { text: 'Không đạt', value: '5' },
            { text: 'Đã nộp video', value: '4' },
            { text: 'Mới tạo', value: '1' },
            { text: 'Hủy', value: '0' }
          ]"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | roleStatusColor">
              {{ scope.row.Status | roleStatusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="NameEmployee" min-width="100" label="Người tạo">
        </el-table-column>
        <el-table-column
          prop="TimeCreate"
          min-width="100"
          label="Thời gian tạo"
        >
        </el-table-column>
        <el-table-column prop="Title" width="150" label="Tiêu đề">
        </el-table-column>

        <el-table-column width="110" label="Ngày đăng kí">
          <template slot-scope="scope">
            <span>{{ scope.row.Date }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="Thời gian">
          <template slot-scope="scope">
            <span>{{ scope.row.TimeStart }} - </span>
            <span>{{ scope.row.TimeEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Content" width="300" label="Nội dung">
          <template slot-scope="scope">
            <div>{{ scope.row.Content }}</div>
            <div v-if="scope.row.Product != null">
              Sản phẩm: {{ scope.row.Product }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="Help" label="Hỗ trợ KT"></el-table-column>
        <el-table-column prop="Note" label="Ghi chú"></el-table-column>
        <el-table-column prop="CheckIn" label="Nhân viên tham gia">
          <template slot-scope="scope">
            <!-- <div>{{ scope.row.CheckIn }} </div> -->
            <el-popover placement="top" width="360">
              <p>{{ scope.row.CheckIn }}</p>

              <el-button type="success" slot="reference">Xem</el-button>
            </el-popover>
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

      <el-dialog title="Đánh giá họp nhóm" :visible.sync="dialogFormAccept">
        <accept :row="rowData" @click="acceptOK"></accept>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Accept from "@/views/meetingGroup/group/component/accept";
import { parseTime } from "@/utils/index";
import {
  GetAll,
  GetEmployeeNOTMeeting,
  OpenVideo,
  CloseVideo
} from "@/api/meetingGroup";
import Cookies from "js-cookie";
import { getStartMonth, getEndMonth } from "@/api/index";
import { GetGroupEmployee, GetEmployeeAll } from "@/api/groups";
import { GetEmployeeDefine } from "@/api/employeeAdmin";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    publicTextFilter(Public) {
      if (Public == 1) return "Toàn bộ";
      else return "Trong nhóm";
    },
    publicColorFilter(Public) {
      if (Public == 1) return "success";
      else return "danger";
    },

    requireTextFilter(Require) {
      if (Require == 1) return "Bắt buộc";
      else return "Không bắt buộc";
    },
    requireColorFilter(Require) {
      if (Require == 1) return "success";
      else return "danger";
    },

    toName(value) {
      var arr = value.split(",");
    }
  },
  components: {
    Accept
  },
  data() {
    return {
      tableData: [],
      month: "",
      status: "",
      options: [{}],
      token: Cookies.get("token"),
      dialogFormUpload: false,
      dialogFormView: false,
      ReportID: 0,
      dialogFormCreate: false,
      dialogFormAccept: false,
      groupList: [{}],
      codeWork: "",
      TextSearch: "",
      dateStart: null,
      dateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      rowData: [],
      rowAction: [],
      rowDefine: [],
      IDService: 0,
      listEm: [],
      service: [],
      obj: "",
      groups: "",

      serviceCode: Cookies.get("idGroup"),
      otc: 1,
      search: "",
      otcList: [
        {
          otc: "ETC",
          value: 0
        },
        {
          otc: "OTC",
          value: 1
        },
        {
          otc: "PS",
          value: 15
        }
      ]
    };
  },
  methods: {
    closeVideo() {
      CloseVideo({ month: this.month }).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Khóa nộp video thành công",
            type: "success",
            position: "top-left"
          });
        }
      });
    },
    openVideo() {
      OpenVideo({ month: this.month }).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Mở khóa nộp video thành công",
            type: "success",
            position: "top-left"
          });
        }
      });
    },
    ExportExcel() {
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      var n = Date.parse(this.month).toString("MM");
      const tHeader = [
        "Trạng thái",
        "Nhóm",
        "Tiêu đề",
        "Ngày",
        "Bắt đầu",
        "Kết thúc",
        "Nội dung",
        "Sản phẩm",
        "Hỗ trợ kỹ thuật",
        "Ghi chú"
      ];
      const filterHeader = [
        "Status",
        "IDGroup",
        "Title",
        "Date",
        "TimeStart",
        "TimeEnd",
        "Content",
        "Product",
        "Help",
        "Note"
      ];
      GetAll({
        token: Cookies.get("token"),
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        month: this.month,
        otc: this.otc,
        pageSize: this.pageSize,
        page: this.currentPage
      }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Họp nhóm tháng" + n,
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
            return this.$options.filters.roleStatusText(v[j]);
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

    ExportExcelNOTMeeting() {
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      var n = Date.parse(this.month).toString("MM");

      const tHeader = ["Nhóm", "Trưởng nhóm", "SDT", "Email"];
      const filterHeader = ["idGroup", "nameEmployee", "idEmployee", "Email"];
      GetEmployeeNOTMeeting({
        token: Cookies.get("token"),
        month: this.month
      }).then(response => {
        var data = response.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Chưa đăng ký họp nhóm tháng" + n,
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      });
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
    fetchEm() {
      GetEmployeeDefine().then(response => {
        this.otcList = response.Data;
        this.otc = response.Data[0].TypeCode;
        this.fetchData();
      });
    },
    filterStatus(filters) {
      //var lenght = filters[Object.keys(filters)[0]].lenght
      //console.log(lenght)
      this.loadingTableData = true;
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      var sta = filters[Object.keys(filters)[0]];
      var parsedobj = JSON.parse(JSON.stringify(sta));
      this.status = parsedobj.join(",");

      var req = {
        otc: this.otc,
        search: this.search,
        dateStart: this.dateStart,
        month: this.month,
        dateEnd: this.dateEnd,
        status: this.status
      };
      GetAll(req).then(res => {
        this.loadingTableData = false;
        this.tableData = res.Data;
      });
    },
    accept(row) {
      this.rowData = row;

      this.dialogFormAccept = true;
    },
    openModalView(row) {
      this.rowData = row;
      this.dialogFormView = true;
      console.log(row);
    },

    openModalUpload(row) {
      this.rowData = row;
      this.dialogFormUpload = true;
    },
    OK() {
      this.dialogFormUpload = false;
    },
    create() {
      this.dialogFormCreate = true;
    },

    fetchOffice() {
      this.listLoading = true;
      getOffice().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },

    fetchData() {
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      this.loadingTableData = true;
      var req = {
        otc: this.otc,
        search: this.search,
        token: Cookies.get("token"),
        dateStart: this.dateStart,
        month: this.month,
        dateEnd: this.dateEnd,
        pageSize: this.pageSize,
        page: this.currentPage
      };
      GetAll(req).then(response => {
        if (response.ResCode == 0) {
          this.loadingTableData = false;
          this.tableData = response.Data;
        }
      });
    },

    acceptOK() {
      this.dialogFormAccept = false;
      this.fetchData();
    },
    startReport(row) {
      this.ReportID = row.ReportID;
      this.dialogFormStart = true;
    }
  },
  watch: {
    month: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    },
    dateStart: function() {
      this.fetchData();
      //this.fetchEmployee();
    },
    dateEnd: function() {
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
    this.month = new Date();
    this.dateStart = getStartMonth();
    this.dateEnd = getEndMonth();
    this.fetchGroup();
    this.fetchEm();

    GetEmployeeAll().then(res => {
      this.listEm = res.Data;
    });
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
