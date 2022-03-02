<template>
  <div>
    <el-form
      ref="form"
      :model="ProductionOrderLst"
      label-position="top"
      label-width="200px"
      size="mini"
    >
      <div style="margin-bottom:20px;">
        <span style="font-weight: bold;">Lệnh SX:</span>
        <span style=" font-size: 13px;">{{
          productOrder.ProductionOrderIDBFO
        }}</span>
      </div>
      <el-form-item size="large">
        <div style="margin-top:10px">
          <el-button
            type="danger"
            v-if="productOrder != null"
            @click="onSubmit"
            icon="el-icon-delete"
            >Xóa lệnh</el-button
          >
          <el-button @click="cancelde" type="info">Hủy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { DelProductionOrder } from "@/api/productionOrder"
import Cookies from "js-cookie"
export default {
  props: ["productOrder"],
  created() {},
  data() {
    return {
      ProductionOrderLst: [],
      IdeaInfor: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: ""
      }
    }
  },
  methods: {
    onSubmit() {
      var rep = {
        token: Cookies.get("token"),
        ProductionOrderID: this.productOrder.ProductionOrderID
      }
      DelProductionOrder(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Xóa lệnh thành công",
            type: "success",
          })
          this.$emit("delOrderOK")
        }
      })
    },
    cancelde() {
      this.$emit("deletecancelOK")
    }
  }
}
</script>
