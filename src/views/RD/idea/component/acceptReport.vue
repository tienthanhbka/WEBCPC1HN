<template>
  <div class="container">
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
      <el-table-column align="center" width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-tooltip content="Phê duyệt">
              <el-button @click="acceptReport(scope.row)" type="text"
                ><i class="el-icon-check"></i></el-button
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
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  GetReportMarketByIdea,
  RemoveReportMarket,
  ApproveReportMarket
} from "@/api/reportRD";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      ReportMarketLst: [],
      listLoading: false,
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    acceptReport(row) {
      this.$prompt("Ghi chú", "Phê duyệt báo cáo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          var req = {
            Token: this.Token,
            UserName: this.UserName,
            ReportId: row.ReportId,
            Status: 3,
            Comment: value
          };
          ApproveReportMarket(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                type: "success",
                message: "Phê duyệt thành công"
              });
            } else {
              this.$message({
                type: "warning",
                message: res.RespText
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
        if(res.RespCode == 0){
          this.ReportMarketLst = res.ReportMarketLst;
        }
        else{
          this.$message({
            message: res.RespText,
            type: 'warning'
          })
        }
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
