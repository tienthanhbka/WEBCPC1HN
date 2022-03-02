<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Lịch sử tồn kho">
      <history :idEmployee="idEmployee" :customer="customer"></history>
    </el-tab-pane>
    <el-tab-pane label="Tốc độ đẩy hàng">
      <month :customer="customer"></month>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import History from './tab/history'
import Month from './tab/month'
export default {
  props: {
    customer: Object,
    idEmployee:String
  },
  components: {
    History,
    Month
  }
}
</script>
