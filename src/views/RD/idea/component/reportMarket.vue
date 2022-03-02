<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createReport"
        type="primary"
        plain
        icon="far fa-newspaper"
      >
        Thêm báo cáo</el-button
      >
    </div>
    <create-report
      modal="new-reportmarket-modal"
      :report="rowData"
      :idea="rowData2"
      @createReportOK="createReportOK"
      @updateReportOK="updateReportOK"
    ></create-report>
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
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="editReport(scope.row)" type="text"
                ><i class="far fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="delReport(scope.row)"
                type="text"
                style="color:red;"
                ><i class="far fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Link báo cáo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Link báo cáo">
            <el-link
              :href="scope.row.MoreInfo"
              type="primary"
              target="_blank"
              >{{ scope.row.MoreInfo }}</el-link
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">{{ scope.row.Note }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thời gian tạo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            {{ scope.row.TimeCreate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="right" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | ideaStatusColor"
              v-if="scope.row.Status != 3"
            >
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>

            <el-badge
              :value="1"
              class="item"
              type="danger"
              v-if="scope.row.Status == 3"
            >
              <el-popover placement="top-start" width="200" trigger="click">
                <span>
                  <i class="el-icon-chat-dot-square"></i>
                  {{ scope.row.Comment }}</span
                >
                <el-button slot="reference" size="small" type="success" plain>{{
                  scope.row.Status | ideaStatusText
                }}</el-button>
              </el-popover>
            </el-badge>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetReportMarketByIdea, RemoveReportMarket } from "@/api/reportRD";
import CreateReport from "../component/createReportMarket";
import { getStartDate, getEndDate, getStartMonth } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: { CreateReport },
  data() {
    return {
      ReportMarketLst: [],
      rowData: "",
      rowData2: "",
      listLoading: false,
      data: "",
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    createReport() {
      VoerroModal.show("new-reportmarket-modal");
      this.rowData = null;
      this.rowData2 = this.$route.params.id;
    },
    createReportOK() {
      this.fetchData();
    },
    updateReportOK() {
      this.fetchData();
    },
    editReport(row) {
      VoerroModal.show("new-reportmarket-modal");
      this.rowData = row;
      this.rowData2 = this.$route.params.id;
    },
    delReport(row) {
      this.$confirm(
        "Xác nhận xóa báo cáo " + row.MoreInfo + ". Continue?",
        "Xóa báo cáo",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          var rep = {
            Token: this.Token,
            UserName: this.UserName,
            ReportId: row.ReportId
          };
          RemoveReportMarket(rep).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa báo cáo thành công",
                type: "success"
              });
              this.fetchData();
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.listLoading = true;
      GetReportMarketByIdea({
        Token: this.Token,
        UserName: this.UserName,
        IdeaId: this.$route.params.id
      }).then(res => {
        this.ReportMarketLst = res.ReportMarketLst;
      });
      this.listLoading = false;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
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
