<template>
  <div class="orderhcm-container">
    <div class="orderhcm-content" v-if="WarningLst.length > 0">
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="WarningLst"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Lý do" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lý do">
              <span>{{ scope.row.Reason }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian" align="right" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian">
              <span>{{
                Date.parse(scope.row.TimeWarning).toString(" HH:ss dd/MM/yyyy")
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Ghi chú" align="center" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              <span style="word-break:break-word">{{ scope.row.Note }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="blank-table" v-else>Không có dữ liệu</div>
  </div>
</template>

<script>
import { GetWarningEmployee } from "@/api/KDCustomer";

export default {
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      startDate: "",
      endDate: "",
      value: "",
      listLoading: false,
      month: "",
      year: "",
      WarningLst: [],
      Token: "",
      UserName: ""
    };
  },
  methods: {
    fetchData() {
      var req = {
        UserName: this.UserName,
        Token: this.Token
      };
      this.listLoading = true;

      GetWarningEmployee(req).then(response => {
        if (response.RespCode == 0) {
          this.WarningLst = response.WarningEmployeeLst;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    }
  },
  computed: {},
  created() {
    this.Token = this.$route.params.token;
    this.UserName = this.$route.params.username;
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.orderhcm-container {
  padding: 5px 8px;
  min-height: 100vh;

  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }

  .table-pagination {
    margin-top: 10px;
  }
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
}
</style>
