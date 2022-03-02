<template>
  <div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column min-width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Xem">
              <el-button
                @click="viewRate(scope.row)"
                type="text"
                style="color:red;"
                ><i class="el-icon-view"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên phiếu" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên phiếu">{{ scope.row.DocType }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Nhân viên" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Điện thoại" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Điện thoại">
            {{ scope.row.EmployeeID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | missionStatusColor">
              {{ scope.row.Status | missionStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetCriteriaHeader } from "@/api/NSCriteriaEmployee";
import Cookies from "js-cookie";
export default {
  props: ["typeEvaluate"],
  data() {
    return {
      tableData: [],
      data1: "",
      data2: "",
      data: "",
      rowData: "",
      value: ""
    };
  },
  methods: {
    viewReport(row) {
      this.data = row;
      this.dialogFormViewReport = true;
    },
    addReportOK() {
      this.dialogFormAddReport = false;
    },
    updateOK() {
      this.dialogFormWorkReport = false;
    },
    fetchData() {
      this.listLoading = true;
      var req2 = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TypeEvaluate: this.typeEvaluate
      };
      GetCriteriaHeader(req2).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.CriteriaHeaderLst;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    viewRate() {
      this.$message({
        message: "Tính năng đang được phát triển",
        type: "info"
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;

  .header-container {
    display: inline-block;
    margin-bottom: 5px;
  }
  .el-table .cell {
    text-align: left;
  }
  .table-pagination {
    margin-top: 10px;
  }
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
.border .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
  width: 90%;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
