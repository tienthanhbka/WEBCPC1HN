<template>
  <div class="employee">
    <el-table
      class="el-mobile-table t-table"
      :data="tableData"
      size="small"
      v-loading="isLoading"
      border
      fit
      highlight-current-row
      empty-text="Chưa có giao kết OKR tháng này, đề nghị nhân viên tạo OKR để có dữ liệu !"
    >
      <el-table-column align="center" width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Tháng" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tháng">
            {{ scope.row.Month }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="Tiêu chí">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tiêu chí">
            {{ scope.row.Name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Doanh số đăng kí">
        <template slot-scope="scope">
          <div class="dat-cell" label="Doanh số đăng kí">
            {{ scope.row.Amount | toVND }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Doanh số đạt">
        <template slot-scope="scope">
          <div class="dat-cell" label="Doanh số đạt">
            {{ scope.row.Quantity | toVND }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Đơn vị" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đơn vị">
            {{ scope.row.Unit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Đạt" align="right">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đạt">
            <span v-if="scope.row.Amount > 0"
              >{{
                ((scope.row.Quantity / scope.row.Amount) * 100).toFixed(0)
              }}
              %</span
            >
            <span v-else>0 %</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetResultEmployee } from "@/api/business";
import { getIdUser } from "@/utils/auth";

export default {
  props: ["employee", "month"],
  data() {
    return {
      idEmployee: getIdUser(),
      tableData: [],
      isLoading: false
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      const req = {
        EmployeeID: this.employee ? this.employee.EmployeeID : this.idEmployee,
        Month: Date.parse(this.month).toString("yyyy-MM-dd")
      };
      console.log(req);
      GetResultEmployee(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.Data;
          this.isLoading = false;
        }
      });
    }
  },
  created() {
    this.fetchData();
    console.log(this.tableData);
  },
  watch: {
    month() {
      this.fetchData();
    }
  }
};
</script>

<style></style>
