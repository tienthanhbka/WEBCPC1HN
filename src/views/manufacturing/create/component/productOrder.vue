<template>
  <div>
    <el-table
      :data="ProductionOrderBFOLst"
      style="width: 100%;cursor:pointer;"
      stripe
      height="300"
      @row-click="handleClick"
      :header-row-style="{ color: '#1c456f' }"
    >
      <el-table-column label="Lệnh SX" prop="External_Document_No_">
      </el-table-column>
      <el-table-column label="Sản phẩm" prop="Description"> </el-table-column>
      <el-table-column label="Mã sản phẩm" prop="ProductID"> </el-table-column>
      <el-table-column label="Lô sản xuất" prop="Location_Code">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetProductionOrderBFO } from "@/api/productionOrder";
import Cookies from "js-cookie";
export default {
  props: ["search"],
  data() {
    return {
      ProductionOrderBFOLst: []
    };
  },
  methods: {
    handleClick(row) {
      this.$emit("itemSelect", row);
    },
    fetchData() {
      GetProductionOrderBFO({
        token: Cookies.get("token"),
        Search: this.search
      }).then(res => {
        this.ProductionOrderBFOLst = res.ProductionOrderBFOLst;
      });
    }
  },
  watch: {
    search() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
