<template>
  <div class="my-mission-container">
    <!-- <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="dateStart"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div> -->
    <!-- <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="dateEnd"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div> -->
    <div class="inline-block">
      <div class="block">
        <span class="demonstration">Tháng</span>
        <el-date-picker v-model="month" type="month" placeholder="Chọn tháng">
        </el-date-picker>
      </div>
    </div>
    <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
        >Đăng ký Roleplay</el-button
      >
    </div>

    <div>
      <!-- <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/view?usp=sharing">  </iframe>

        <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/preview" width="640" height="480"></iframe> -->
      <el-table
        :data="tableData"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="155px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <!-- <el-tooltip content="Xem quy định" placement="top">
               <router-link :to="'/quy-dinh/xem-quy-dinh/' + scope.row.RowID">
              <i class="far fa-eye"></i>
      </router-link></el-tooltip> -->
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <el-tooltip
              v-if="scope.row.Status > 1"
              content="Phiếu đánh giá"
              placement="top"
              ><el-button @click="openModalNKT(scope.row)" type="text">
                <i class="fas fa-user-check"></i></el-button
            ></el-tooltip>
            <el-tooltip
              v-if="scope.row.Status > 1 && scope.row.CloseVideo != 1"
              content="Nộp video"
              placement="top"
              ><el-button @click="openModalUpload(scope.row)" type="text">
                <i class="fas fa-link"></i></el-button
            ></el-tooltip>
            <el-tooltip
              v-if="scope.row.Status > 3"
              content="Xem video"
              placement="top"
              ><el-button @click="openModalView(scope.row)" type="text">
                <i class="fas fa-film"></i></el-button
            ></el-tooltip>
            <el-tooltip
              v-if="scope.row.Status == 1"
              content="Chỉnh sửa"
              placement="top"
              ><el-button @click="openModalEdit(scope.row)" type="text">
                <i style="color: orange;" class="far fa-edit"></i></el-button
            ></el-tooltip>

            <el-tooltip
              v-if="
                scope.row.EmployeeStudentID != '' &&
                  scope.row.EmployeeTeacherID != null &&
                  scope.row.Status < 3
              "
              content="Hủy lịch"
              placement="top"
              ><el-button @click="openModalCancel(scope.row)" type="text">
                <i
                  style="color: red;"
                  class="far fa-window-close"
                ></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="Title" label="Tiêu đề"></el-table-column>

        <el-table-column
          prop="NameEmployee"
          label="Trình dược viên"
        ></el-table-column>
        <el-table-column
          prop="NameTeacher"
          label="Người kiểm tra"
        ></el-table-column>
        <el-table-column prop="Point" label="Điểm NKT"></el-table-column>
        <el-table-column prop="NameAccept" label="Giám sát"></el-table-column>
        <el-table-column prop="PointAccept" label="Điểm NGS"></el-table-column>
        <el-table-column label="Ngày">
          <template slot-scope="scope">
            <span>{{ scope.row.Date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian">
          <template slot-scope="scope">
            <span>{{ scope.row.TimeStart }} - </span>
            <span>{{ scope.row.TimeEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Product" label="Sản phẩm"></el-table-column>

        <el-table-column label="Trạng thái">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | roleStatusColor">
              {{ scope.row.Status | roleStatusText }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="Note" width="100px;" label="Chi tiết">
          <template slot-scope="scope">
            <el-popover placement="top" width="360">
              <p>{{ scope.row.Note }}</p>
              <el-button type="success" slot="reference">Xem</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="Link">
          <template slot-scope="scope">
            <a :href="scope.row.Link" _blank>Link 1 </a>
            <a :href="scope.row.Link2" _blank>Link 2 </a>
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

      <el-dialog title="Đăng ký lịch RolePlay" :visible.sync="dialogFormCreate">
        <create @click="addOK"></create>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
        </span>
      </el-dialog>

      <el-dialog title="Chỉnh sửa lịch RolePlay" :visible.sync="dialogFormEdit">
        <edit :meetingHeader="rowData" @click="editOK"></edit>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>

      <el-dialog title="Upload video RolePlay" :visible.sync="dialogFormUpload">
        <upload :row="rowData" @click="OK"></upload>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
        </span>
      </el-dialog>

      <el-dialog title="Phiếu đánh giá" :visible.sync="dialogFormNKT">
        <nkt :row="rowData" @reportOK="reportOK"></nkt>
      </el-dialog>

      <el-dialog title="Xem video" :visible.sync="dialogFormView">
        <viewVideo :row="rowData"></viewVideo>
      </el-dialog>

      <el-dialog title="Hủy lịch" :visible.sync="dialogFormCancel">
        <cancel :row="rowData" @click="CancelOK"></cancel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Nkt from "@/views/roleplay/employee/component/nkt";
import Cancel from "@/views/roleplay/employee/component/cancel";
import Create from "@/views/roleplay/employee/component/schedule-modal";
import Edit from "@/views/roleplay/employee/component/edit";
import Upload from "@/views/roleplay/employee/component/uploadVideo";
//import Upload from "@/views/roleplay/employee/component/uploadFileNode";
import ViewVideo from "@/views/roleplay/employee/component/viewVideo";
import { parseTime } from "@/utils/index";
import { GetRoleEmployee } from "@/api/roleplay";
import Cookies from "js-cookie";
import { getStartMonth, getEndMonth } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";

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
    }
  },
  components: {
    Create,
    Upload,
    ViewVideo,
    Cancel,
    Nkt,
    Edit
  },
  data() {
    return {
      tableData: [],
      month: "",
      options: [{}],
      token: Cookies.get("token"),
      dialogFormUpload: false,
      dialogFormNKT: false,
      dialogFormView: false,
      dialogFormCancel: false,
      ReportID: 0,
      dialogFormCreate: false,
      dialogFormEdit: false,
      dialogFormStart: false,
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
      service: [],
      obj: "",
      groups: "",
      serviceCode: Cookies.get("idGroup")
    };
  },
  methods: {
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
    CancelOK() {
      this.dialogFormCancel = false;
      this.fetchData();
    },
    editOK() {
      this.dialogFormEdit = false;
      this.fetchData();
    },
    openModalView(row) {
      this.rowData = row;
      this.dialogFormView = true;
      //console.log(row)
    },
    openModalCancel(row) {
      this.rowData = row;
      this.dialogFormCancel = true;
      //console.log(row)
    },
    openModalEdit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
      //console.log(row)
    },

    openModalUpload(row) {
      this.rowData = row;
      this.dialogFormUpload = true;
    },
    openModalNKT(row) {
      this.rowData = row;
      this.dialogFormNKT = true;
    },
    OK() {
      this.dialogFormUpload = false;
      this.fetchData();
    },
    reportOK() {
      this.dialogFormNKT = false;
      this.fetchData();
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
      this.loadingTableData = true;
      this.month = Date.parse(this.month).toString("yyyy-MM-dd");
      var req = {
        token: Cookies.get("token"),
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        month: this.month,
        pageSize: this.pageSize,
        page: this.currentPage
      };
      GetRoleEmployee(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data;
          this.loadingTableData = false;
          //    this.currentPage= response.PageNumber;
          //    this.pageSize = response.RowspPage
          //    this.total = (response.PageNumber)*(response.RowspPage)
        }
      });
    },

    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    startReport(row) {
      this.ReportID = row.ReportID;
      this.dialogFormStart = true;
    }
  },
  watch: {
    dateStart: function() {
      this.fetchData();
      //this.fetchEmployee();
    },
    dateEnd: function() {
      this.fetchData();
      //this.fetchEmployee();
    },
    month: function() {
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
    this.dateStart = getStartMonth();
    this.dateEnd = getEndMonth();

    this.month = new Date();
    this.fetchGroup();
    this.fetchData();
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
