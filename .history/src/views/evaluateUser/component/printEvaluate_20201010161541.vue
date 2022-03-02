<template>
  <div>
    <el-table
      :data="CriteriaLineLst"
      style="width: 100%;"
      stripe
      border
      :header-row-style="{ color: '#1c456f' }"
      :span-method="objectSpanMethod"
      size="mini"
    >
      <el-table-column label="Tiêu chí" width="280">
        <template slot-scope="scope">
          {{ scope.row.CriteriaName }}
        </template>
      </el-table-column>
      <el-table-column label="Kết quả đạt" width="140">
        <template slot-scope="scope">
          {{
            scope.row.Quantity.toString().replace(
              /(\d)(?=(\d{3})+(?!\d))/g,
              "$1,"
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="Định mức" prop="Quota" width="100">
      </el-table-column>
      <el-table-column
        label="Người đánh giá"
        prop="EmployeeNameRate"
        width="180"
      >
      </el-table-column>
      <el-table-column label="Đánh giá" width="80">
        <template slot-scope="scope">
          {{ scope.row.Rate | toRateText }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Hoạt chất" prop="Description"> </el-table-column>
      <el-table-column label="Hàm lượng" prop="Concentration">
      </el-table-column> -->
      <el-table-column label="Nhận xét" prop="Comment" min-width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { GetCriteriaHeaderByEmId } from "@/api/NSCriteriaEmployee";
export default {
  props: ["card"],
  filters: {
    toRateText(val) {
      if (val > 2) {
        return "ĐẠT";
      } else {
        return "KHÔNG ĐẠT";
      }
    }
  },
  data() {
    return {
      CriteriaLineLst: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token")
    };
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        EmployeeID: this.card.EmployeeID,
        WorkOld: this.card.WorkOld,
        TypeEvaluate: this.card.TypeEvaluate
      };
      GetCriteriaHeaderByEmId(req).then(res => {
        if (res.RespCode == 0) {
          this.CriteriaLineLst = res.CriteriaHeaderInfo.CriteriaLineLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   console.log(row);
      //console.log(columnIndex);
      //   if (row.CriteriaID == row.CriteriaID) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      //   if (columnIndex === 0) {
      //     console.log(column);
      // 	// console.log(rowIndex);
      //     if (rowIndex % 2 === 0) {
      //       return {
      //         rowspan: 2,
      //         colspan: 1
      //       };
      //     } else {
      //       return {
      //         rowspan: 0,
      //         colspan: 0
      //       };
      //     }
      //   }
    }
  },
  watch: {
    card() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
