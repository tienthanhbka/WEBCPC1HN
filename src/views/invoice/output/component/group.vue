<template>
  <div class="group">
    <el-table
      class="el-mobile-table"
      ref="tblData"
      :data="tableData"
      size="small"
      border
      fit
      highlight-current-row
      @expand-change="expanRow"
    >
      <el-table-column type="expand" width="60px">
        <template slot-scope="scope">
          <!-- <el-table
            class="el-mobile-table"
            :data="scope.row.lines"
            size="small"
            v-if="modeView == 0"
            v-loading="scope.row.loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" width="100px" label="STT">
              <template slot-scope="props">
                <div class="dat-cell" label="STT">
                  {{ props.$index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="180px" label="Tiêu chí">
              <template slot-scope="props">
                <div class="dat-cell" label="Tiêu chí">
                  {{ props.row.Name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="140px" label="Doanh số đăng kí">
              <template slot-scope="props">
                <div class="dat-cell" label="Doanh số đăng kí">
                  {{ props.row.Amount | toVND }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="140px" label="Doanh số đạt">
              <template slot-scope="props">
                <div class="dat-cell" label="Doanh số đạt">
                  {{ props.row.Quantity | toVND }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="220px" label="Đơn vị">
              <template slot-scope="props">
                <div class="dat-cell" label="Đơn vị">
                  {{ props.row.Unit }}
                </div>
              </template>
            </el-table-column>
          </el-table> -->
          <employee
            :employee="scope.row"
            :startDate="startDate"
            :endDate="endDate"
          >
          </employee>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="220px" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            {{ scope.row.EmployeeName }}
            <span v-if="scope.row.EmployeeCode">
              - {{ scope.row.EmployeeCode }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="SĐT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SĐT">
            {{ scope.row.EmployeeID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="220px" label="Phòng ban">
        <template slot-scope="scope">
          <div class="dat-cell" label="Phòng ban">
            {{ scope.row.Office }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Vị trí">
        <template slot-scope="scope">
          <div class="dat-cell" label="Vị trí">
            {{ scope.row.Position }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px" label="Loại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px" label="Doanh số">
        <template slot-scope="scope">
          <div class="dat-cell" label="Doanh số">
            {{ scope.row.AmountSale | toVND }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="Báo cáo" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Báo cáo">
            <el-button type="text" @click="viewDetailEm(scope.row)"
              >Chi tiết</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="tableDataGroup.length"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchTable"
      background
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import Employee from "./employee";
// import { GetResultEmployee } from "@/api/business";

export default {
  props: ["tableDataGroup", "startDate", "endDate", "search"],
  components: { Employee },
  data() {
    return {
      tableData: [],
      pageSize: 30,
      currentPage: 1
    };
  },
  methods: {
    expanRow(row) {
      row.loading = true;
      //   const req = {
      //     EmployeeID: row.EmployeeID,
      //     Month: Date.parse(this.month).toString("yyyy-MM-dd")
      //   };
      //   GetResultEmployee(req).then(res => {
      //     if (res.RespCode == 0) {
      //       row.lines = res.Data;
      //       row.loading = false;
      //     }
      //   });
    },
    expand(row) {
      this.$refs.tblData.toggleRowExpansion(row);
    },
    fetchTable() {
      this.tableData = this.tableDataGroup
        .filter(o => {
          return (
            o.EmployeeName.toLowerCase().includes(this.search.toLowerCase()) ||
            o.EmployeeID.toLowerCase().includes(this.search.toLowerCase())
          );
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    viewDetailEm(row) {
      this.$emit("viewDetailEm", row);
    }
  },
  created() {
    this.fetchTable();
  },
  watch: {
    search() {
      this.fetchTable();
    }
  }
};
</script>

<style></style>
