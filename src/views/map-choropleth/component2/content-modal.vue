<template>
  <div class="box-table">
    <el-table
      v-loading="loadingTableData"
      size="small"
      :data="data"
      style="width:100%;margin-top:20px"
      border
      fit
      show-header
    >
      <el-table-column align="center" width="60" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="Đơn vị hành chính">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đơn vị hành chính">
            {{ scope.row.Unit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Khách hàng" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khách hàng">
            {{ scope.row.CountPlace }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetCity } from "@/api/default";
export default {
  data() {
    return {
      tableData: [],
      loadingTableData: false
    };
  },
  props: ["value", "data"],
  methods: {
    // fetchData() {
    //   this.loadingTableData = true;
    //   GetCity().then(res => {
    //     if (res.ResCode == 0) {
    //       this.tableData = res.Data;
    //       this.loadingTableData = false;
    //     }
    //   });
    // }
  },
  created() {
    // this.fetchData();
  },
  watch: {
    dataUnitLst() {}
  }
};
</script>

<style lang="scss" scoped>
.box-table {
  width: 100%;
  padding: 5px;
}
</style>
