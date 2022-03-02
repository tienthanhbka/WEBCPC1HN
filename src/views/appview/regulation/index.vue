<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-input
        style="width:100%;margin:5px 0;"
        class="el-select-months"
        prefix-icon="el-icon-search"
        v-model="TextSearch"
        size="mini"
        placeholder="Tìm kiếm theo nội dung..."
      />
    </div>
    <div v-if="tableData.length > 0">
      <el-table
        class="el-mobile-table"
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
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="Content"
          label="Nội dung văn bản"
          min-width="180px"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Nội dung văn bản">
              {{ scope.row.Content }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="Number" label="Số văn bản" width="180px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số văn bản">
              {{ scope.row.Number }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày văn bản" width="120px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày văn bản">
              <span>{{ scope.row.TimeCreate | toDate }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeEnd" label="Hiệu lực" width="100px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hiệu lực">
              <span>{{ scope.row.TimeCreate | toDate }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Các BP liên quan"
          min-width="250px"
          header-align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Các BP liên quan">
              {{ scope.row.Office.replace(/;;/g, ",") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Xem quy định"
          min-width="250px"
          header-align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Xem quy định">
              <el-button
                type="text"
                style="color:#CAC531"
                @click="ViewRegu(scope.row)"
                >Chi tiết</el-button
              >
            </div>
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
    <div class="blank-table" v-else>Không có dữ liệu</div>
    <el-dialog :visible.sync="dialogDetail" custom-class="small-modal">
      <!-- <span slot="title" class="title-dialog">{{ dialogTitle }}</span> -->
      <view-regu :lines="lineData"></view-regu>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import { GetReguDefine, GetGroupEmployee } from "@/api/appview";
import { getStartDate, getEndDate } from "@/api/index";
import ViewRegu from "./component/viewRegu.vue";

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
  components: { ViewRegu },
  data() {
    return {
      tableData: [],
      options: [{}],
      Token: "",
      UserName: "",
      ReportID: 0,
      groupList: [{}],
      codeWork: "",
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      dialogDetail: false,
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
      lineData: ""
    };
  },
  methods: {
    // fetchGroup() {
    //   var req = {
    //     idEmployee: Cookies.get("idEmployee"),
    //     token: Cookies.get("token")
    //   };
    //   GetGroupEmployee(req).then(response => {
    //     this.groupList = response.Data;
    //     this.groups = response.Data[0].idGroup;
    //   });
    // },
    ViewRegu(row) {
      this.dialogDetail = true;
      this.lineData = row;
    },

    create() {
      this.dialogFormCreate = true;
    },

    fetchData() {
      this.loadingTableData = true;
      var req = {
        token: this.Token,
        pageSize: this.pageSize,
        page: this.currentPage
      };
      GetReguDefine(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data;
          this.tableData.forEach(myFunction);
          function myFunction(item, index, arr) {
            if (item.File != "") {
              item.File = item.File.split(";;", 100);
            }
          }
          this.loadingTableData = false;
        }
      });
    }
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    }
    // groups: function() {
    //   this.fetchData();
    // }
  },
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
      //this.fetchGroup();
      this.fetchData();
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-mission-container {
  padding: 5px 8px;
}

.el-pagination {
  margin-top: 10px;
}
.overview-item {
  height: auto;
  background: #fff;
  margin-bottom: 5px !important;
  //background-image: linear-gradient(45deg, #ed213a, #cb2e49);
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  .image {
    margin-right: 20px;
  }
  .content {
    .title {
      font-size: 16px;
    }

    .inline-block {
      font-size: 10pt;
      margin-top: 5px;
    }
  }
}
.inline-block {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
