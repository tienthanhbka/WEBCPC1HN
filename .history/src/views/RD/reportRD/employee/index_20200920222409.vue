<template>
  <div class="blank-table">
    <!-- <div class="inline-block" style="float: right;">
      <el-date-picker v-model="TimeStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>
    <div class="inline-block" style="float: right;">
      <el-date-picker v-model="TimeEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ReportMarketLst"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>

      <el-table-column label="Trạng thái" align="right" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Báo cáo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Báo cáo">{{ scope.row.IdeaName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Nội dung" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nội dung">
            {{ scope.row.IdeaContent }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hoạt chất" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hoạt chất">
            {{ scope.row.ActiveElement }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Cách bào chế" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cách bào chế">
            {{ scope.row.Preparation }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mô tả thêm" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mô tả thêm">
            {{ scope.row.MoreInfo }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Khởi tạo" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khởi tạo">
            {{ scope.row.TimeCreate }}
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-button-group>
              <el-tooltip content="Chỉnh sửa">
                <el-button @click="edit(scope.row)" type="warning"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button @click="del(scope.row)" type="danger"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Thêm/ Chỉnh sửa báo cáo" :visible.sync="dialogFormUpdate">
      <createreport
        :report="data"
        @createcancelOK="CreateCancelOK"
      ></createreport>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Xóa báo cáo" :visible.sync="dialogFormDel">
      <delete-report
        :report="data"
        @delReportOK="delOK"
        @deletecancelOK="delCancelOK"
      ></delete-report>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog> -->
    Không có dữ liệu
  </div>
</template>
<script>
import { GetReportMarketByIdea } from "@/api/reportRD";
import { GetIdeaByUser } from "@/api/idea";
import createreport from "@/views/RD/reportRD/component/createReport";
import deleteReport from "@/views/RD/reportRD/component/delReport";
import { getStartDate, getEndDate, getStartMonth } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: { createreport, deleteReport },
  data() {
    return {
      ReportMarketLst: [],
      rowData: "",
      listLoading: false,
      dialogFormUpdate: false,
      dialogFormDel: false,
      IdeaLst: [],
      admin: "",
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      Idea: [],
      data: ""
    };
  },
  methods: {
    addOK(form) {
      this.dialogFormUpdate = false;
      this.fetchData();
    },
    updateOK() {
      this.dialogFormUpdate = false;
      //this.fetchData()
    },
    create() {
      this.rowData = null;
      this.dialogFormUpdate = true;
    },
    CreateCancelOK() {
      this.dialogFormUpdate = false;
    },
    edit(row) {
      this.rowData = row;
      this.dialogFormUpdate = true;
    },
    del(row) {
      this.data = row;
      this.dialogFormDel = true;
    },
    delOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    delCancelOK() {
      this.dialogFormDel = false;
    },
    createReport(idea) {
      console.log(idea);
      this.data = idea;
      this.dialogFormUpdate = true;
    },
    fetchData() {
      this.listLoading = true;
      GetIdeaByUser({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: getStartDate(),
        TimeEnd: getEndDate()
      }).then(res => {
        this.IdeaLst = res.IdeaLst;
        this.admin = res.Admin;
      });
      GetReportMarketByIdea({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        IdeaId: this.$route.params.id
      }).then(res => {
        this.ReportMarketLst = res.ReportMarketLst;
      });
      this.listLoading = false;
    }
  },
  created() {
    this.TimeStart = getStartDate();
    this.TimeEnd = getEndDate();
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  background-color: #e9ebee;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}
</style>
