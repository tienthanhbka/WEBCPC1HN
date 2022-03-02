<template>
  <div class="filter-body">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-input></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <el-input></el-input>
      </el-col>
      <el-button type="primary"></el-button>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.filter-body {
  background-color: #02bc77;
}
</style>
