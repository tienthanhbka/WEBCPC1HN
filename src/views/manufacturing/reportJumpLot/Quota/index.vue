<template>
  <div>
    <div class="container">
      <div class="inline-block">
        <span></span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateStart"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          @click="createQuota"
          class="pan-btn yellow-btn"
          icon="fas fa-plus"
          >&#32;Tạo định mức
        </el-button>
      </div>
      <el-table
        class="el-mobile-table"
        :data="QuotaBoxLst"
        v-loading="listLoading"
        style="width: 100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Chỉnh sửa">
                <el-button @click="updateQuota(scope.row)" type="text"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Lệnh Sản xuất" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lệnh Sản xuất">{{ scope.row.ProductionOrderID }}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="Sản phẩm" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.ProductName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Mã sản phẩm" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã sản phẩm">
              <i>{{ scope.row.ProductID }}</i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Loại kiện" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại kiện">
              {{ scope.row.BoxType | BoxType }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Cỡ" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Cỡ">
              {{ scope.row.BoxSize }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số lượng">
              {{ scope.row.BoxQuantity }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="Tạo/Chỉnh sửa định mức cho báo cáo"
        :visible.sync="dialogFormCreateQuota"
      >
        <create-quota
          @quotaAdded="quotaOK"
          :quota="rowData"
          @quotaUpdated="updateOK"
          @Cancel="cancelOK"
          :date="dateEnd"
        ></create-quota>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import createQuota from "@/views/manufacturing/reportJumpLot/Quota/component/createQuota";
import { GetQuotaBoxFactory } from "@/api/reportBox";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  components: { createQuota },
  data() {
    return {
      dialogFormCreateQuota: false,
      QuotaBoxLst: [],
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      rowData: "",
      value: "",
      dateEnd: ""
    };
  },
  methods: {
    quotaOK() {
      this.dialogFormCreateQuota = false;
      this.fetchData();
    },
    updateOK() {
      this.dialogFormCreateQuota = false;
      this.fetchData();
    },
    createQuota() {
      this.dialogFormCreateQuota = true;
      this.rowData = null;
      this.dateEnd = this.DateEnd;
    },
    updateQuota(row) {
      this.dialogFormCreateQuota = true;
      this.rowData = row;
    },
    fetchData() {
      this.listLoading = true;
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee")
      };
      GetQuotaBoxFactory(req).then(res => {
        if (res.RespCode == 0) {
          this.QuotaBoxLst = res.QuotaBoxLst;
        }
        this.listLoading = false;
      });
    },
    cancelOK() {
      this.dialogFormCreateQuota = false;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    DateStart: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    }
  }
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
  .table-pagination {
    margin-top: 10px;
  }
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
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
