<template>
  <div class="container">
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ReportEditLst"
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
            <el-tooltip content="Phê duyệt">
              <el-button @click="acceptReport(scope.row)" type="text"
                ><i class="el-icon-check"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lần sửa đổi" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lần sửa đổi">
            {{ scope.row.NumberEdit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Link báo cáo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Link báo cáo">
            {{ scope.row.LinkReport }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nội dung sửa đổi" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nội dung sửa đổi">
            {{ scope.row.ContentEdit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lý do" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lý do">{{ scope.row.ReasonEdit }}</div>
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
import { ApproveReportEdit, GetReportEditByResearch } from "@/api/reportRD";
import Cookies from "js-cookie";
export default {
  components: {},
  data() {
    return {
      ReportEditLst: [],
      listLoading: false,
      Commment: "",
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
            ReportUpId: row.ReportUpId,
            Status: 3,
            Commment: value
          };
          ApproveReportEdit(req).then(res => {
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
      // GetReportEditByResearch({
      //   Token: this.Token,
      //   UserName: this.UserName,
      //   ResearchId: this.$route.params.id
      // }).then(res => {
      //   this.ReportEditLst = res.ReportEditLst;
      // });
      var a = [];
      db.ref("ReportRD").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.ResearchId == this.$route.params.id) {
              storage
                .ref()
                .child("/" + element.ResearchId + "/report")
                .getDownloadURL()
                .then(function(url) {
                  var item2 = {
                    ResearchId: element.ResearchId,
                    ContentEdit: element.ContentEdit,
                    ReasonEdit: element.ReasonEdit,
                    Comment: element.Comment,
                    LinkReport: element.LinkReport,
                    CreateId: element.CreateId,
                    TimeCreate: element.TimeCreate,
                    Status: element.Status,
                    LinkUrl: url
                  };
                  a.push(item2);
                  console.log(a);
                });
            }
          });
        }
        this.ReportEditLst = a;
        this.listLoading = false;
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
