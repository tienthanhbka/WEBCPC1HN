<template>
  <div class="my-mission-container">
    <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        size="small"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
        >Thêm quy định</el-button
      >
    </div>
    <div style="float: right;">
      <div class="inline-block">
        <el-input
          size="small"
          prefix-icon="el-icon-search"
          v-model="TextSearch"
          placeholder="Tìm kiếm theo nội dung..."
        />
      </div>
      <div class="inline-block">
        <el-button
          class="t-button"
          type="success"
          :loading="downloading"
          @click="exportExcel"
          size="small"
          ><i class="fas fa-file-excel"></i> xuất Excel</el-button
        >
      </div>
    </div>
    <div>
      <el-table
        :data="
          tableData.filter(
            data =>
              !TextSearch ||
              data.Content.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Xem quy định" placement="top">
              <router-link :to="'/quy-dinh/xem-quy-dinh/' + scope.row.RowID">
                <i class="far fa-eye"></i> </router-link
            ></el-tooltip>
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <!-- <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteDefine(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>

        <el-table-column
          prop="Content"
          label="Nội dung văn bản"
          min-width="180px"
        ></el-table-column>

        <el-table-column
          prop="Number"
          label="Số văn bản"
          width="180px"
        ></el-table-column>
        <el-table-column label="Ngày văn bản" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.TimeCreate | toDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="TimeEnd"
          label="Hiệu lực"
          width="100px"
        ></el-table-column>

        <el-table-column
          label="Các BP liên quan"
          min-width="250px"
          header-align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.Office.replace(/;;/g, ",") }}
          </template>
        </el-table-column>
        <el-table-column width="70px;" label="Action">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">
              <i class="far fa-edit"></i
            ></el-button>
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

      <el-dialog title="Công bố quy định mới" :visible.sync="dialogFormCreate">
        <create @click-something="addOK"></create>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
        </span>
      </el-dialog>

      <el-dialog title="Chỉnh sửa" :visible.sync="dialogFormEdit">
        <edit :row="rowData" @click-something="editOK"></edit>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Create from "@/views/regulations/component/create";
import Edit from "@/views/regulations/component/edit";
import { parseTime } from "@/utils/index";
import { GetReguDefine } from "@/api/regu";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
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
    Edit
  },
  data() {
    return {
      tableData: [],
      options: [{}],
      token: Cookies.get("token"),
      ReportID: 0,
      dialogFormCreate: false,
      dialogFormStart: false,
      dialogFormEdit: false,
      groupList: [{}],
      codeWork: "",
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      downloading: false,
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
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
    },
    editOK() {
      this.dialogFormEdit = false;
      this.fetchData();
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
    create() {
      this.dialogFormCreate = true;
    },

    fetchOffice() {
      this.listLoading = true;
      getOffice().then(response => {
        this.options = response.Data;
        this.listLoading = false;
      });
    },

    fetchData() {
      var req = {
        token: Cookies.get("token"),
        pageSize: this.pageSize,
        page: this.currentPage
      };
      GetReguDefine(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data;
          //    this.currentPage= response.PageNumber;
          //    this.pageSize = response.RowspPage
          //    this.total = (response.PageNumber)*(response.RowspPage)

          this.tableData.forEach(myFunction);
          function myFunction(item, index, arr) {
            if (item.File != "") {
              item.File = item.File.split(";;", 100);
              item.Detail =
                "https://icpc1hn.work/#/quy-dinh/xem-quy-dinh/" + item.RowID;
            }
          }
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
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Nội dung",
        "Số văn bản",
        "Ngày văn bản",
        "Hiệu lực",
        "Các BP liên quan",
        "Chi tiết"
      ];
      const filterHeader = [
        "Content",
        "Number",
        "TimeCreate",
        "TimeEnd",
        "Office",
        "Detail"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách quy định CPC1HN",

            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.handOverStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
    }
  },
  created() {
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
