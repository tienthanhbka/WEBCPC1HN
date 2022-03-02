<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-input
        style="width:100%;margin:5px 0;"
        class="el-select-months"
        prefix-icon="el-icon-search"
        v-model="TextSearch"
        size="mini"
        placeholder="Tìm kiếm theo sản phẩm..."
      />
    </div>
    <div v-if="tableData.length > 0">
      <el-table
        class="el-mobile-table"
        :data="
          tableData.filter(
            data =>
              !TextSearch ||
              data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        id="tbldata"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="160px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ProductName" label="Tên sản phẩm">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên sản phẩm">
              {{ scope.row.ProductName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="UnitOfMeasure" label="Đơn vị">
          <template slot-scope="scope">
            <div class="dat-cell" label="Đơn vị">
              {{ scope.row.UnitOfMeasure }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số lượng">
              {{ scope.row.Quantity }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Kho" width="150" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Kho">
              {{ scope.row.StoreType }}
            </div></template
          >
        </el-table-column>
      </el-table>
    </div>
    <div v-else class="blank-table">Không có dữ liệu</div>
  </div>
</template>

<script>
import { GetStoreProductByCode, GetStoreNPPByEm } from "@/api/appview";
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      UserName: "",
      Token: "",
      TextSearch: ""
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      var req = {
        UserName: this.UserName,
        Token: this.Token,
        StoreCode: this.data
      };
      GetStoreProductByCode(req).then(res => {
        if (res.RespCode === 0) {
          this.loadingTableData = false;
          this.tableData = res.StoreProductLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    }
  },
  watch: {},
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
      this.UserName = this.$route.params.username;
      this.fetchData();
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-mission-container {
  padding: 5px 8px;
}
</style>
