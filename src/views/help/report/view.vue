<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="nameEmployee" label="Tên nhân viên" width="180"></el-table-column>
        <el-table-column prop="description" label="Mô tả" width="180"></el-table-column>
        <el-table-column prop="numFile" label="Số file" width="180"></el-table-column>
        <el-table-column prop="time" label="Thời gian gửi"></el-table-column>
        

      </el-table>
    </template>
  </div>
</template>
<script>
import { GetReportLst } from "@/api/help";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    GetReportLst().then(res => {
      this.tableData = res.Data;
    });
  }
};
</script>