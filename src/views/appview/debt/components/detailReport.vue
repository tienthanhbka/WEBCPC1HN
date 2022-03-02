<template>
  <div>
    <p class="salesline-header">Chi tiết hóa đơn {{ data.No }}</p>
    <div v-if="dataTable.length>0">
    <el-table
      class="el-mobile-table"
      size="mini"
      :data="dataTable"
      style="width: 100%"
      border
      element-loading-text="Loading"
    >
      <el-table-column prop="No_" label="Mã" width="80"><template slot-scope="scope">
          <div class="dat-cell" label="Mã">
            {{ scope.row.No_ }}
          </div>
        </template></el-table-column>
      <el-table-column prop="Description" label="Tên" min-width="180">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Unit of Measure" label="Đơn vị" width="70">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Đơn vị">
            {{ row["Unit of Measure"] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Quantity" label="Số lượng" min-width="100"
        ><template slot-scope="scope">
          <div class="dat-cell" label="Số lượng">
            {{ Number(scope.row.Quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
          </div>
        </template></el-table-column
      >
      <el-table-column prop="Unit Price" label="Đơn giá" min-width="110"
        ><template slot-scope="{ row }">
          <div class="dat-cell" label="Đơn giá">
             {{
              Number(row["Unit Price"])
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}đ
          </div>
        </template></el-table-column
      >

      <el-table-column prop="VAT %" label="VAT" width="70"
        ><template slot-scope="{ row }">
          <div class="dat-cell" label="VAT">
            {{   Number(row["VAT %"]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}}
          </div>
        </template></el-table-column
      >
      <el-table-column prop="Amount" label="Thành tiền" min-width="180"
        ><template slot-scope="scope">
          <div class="dat-cell" label="Thành tiền">
             {{
              Number(scope.row.Amount)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}đ
          </div>
        </template></el-table-column
      >
      <el-table-column
        prop="Amount Including VAT"
        label="Thành tiền(VAT)"
        min-width="180"
        ><template slot-scope="{ row }">
          <div class="dat-cell" label="Thành tiền(VAT)"> {{
              Number(row["Amount Including VAT"])
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}đ
          </div>
        </template></el-table-column
      >
      <el-table-column prop="NameEm" label="Người bán" min-width="180"
        ><template slot-scope="scope">
          <div class="dat-cell" label="Người bán">
            {{ scope.row.NameEm }}
          </div>
        </template></el-table-column
      >
    </el-table>
    </div>
    <div class="blank-table" v-else>
      Không có dữ liệu
    </div>
  </div>
</template>

<script>
import { getDebt, getSalesLineByDocNo } from "@/api/appview";

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataTable: []
    };
  },
  methods: {
    detailReport() {
      if (this.data) {
        getSalesLineByDocNo({
          No: this.data.No,
          otc: this.data["otc"],
          token: this.$route.params.token
        }).then(res => {
          this.dataTable = res.Data;
        });
      }
    }
  },
  created() {
    this.detailReport();
  },
  watch: {
    data() {
      this.detailReport();
    }
  }
};
</script>

<style lang="scss" scoped>
.salesline-header{
    font-weight: bold;
  color: #0984e3;
}
</style>></style>
