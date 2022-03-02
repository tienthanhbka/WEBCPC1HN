<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        type="danger"
        size="small"
        icon="fas fa-plus"
        @click="createPolicy"
      >
        Tạo mới</el-button
      >
    </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      style="width: 100%"
      border
      fit
      highlight-current-row
      :header-row-style="{ color: '#1c456f' }"
    >
      <el-table-column width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="75px" label="MCS">
        <template slot-scope="scope">
          <div class="dat-cell" label="MCS"></div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="SP" prop="Postition">
        <template slot-scope="scope">
          <div class="dat-cell" label="SP"></div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="Loại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại"></div>
        </template>
      </el-table-column>

      <el-table-column width="150px" label="KH" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="KH"></div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Mô" prop="WorkOld">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mô"></div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="HL" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="HL"></div>
        </template>
      </el-table-column>
      <el-table-column width="160px" label="NV" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="NV"></div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Ngày tạo" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo"></div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái"></div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal2">
      <span
        slot="title"
        style="font-weight:700;font-size:12pt;color:#f56c6c;"
        >{{ dialogTitle }}</span
      >
      <create-policy @closeDialog="closeDialog"></create-policy>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import CreatePolicy from "../component/createPolicy.vue";
export default {
  components: { CreatePolicy },
  data() {
    return {
      dialogTitle: "",
      dialogFormCreate: false,
      listLoading: false
    };
  },
  methods: {
    createPolicy() {
      this.dialogFormCreate = true;
      this.dialogTitle = "Thêm mới chính sách";
    },
    closeDialog() {
      this.dialogFormCreate = false;
    }
  },
  created() {},
  watch: {}
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
  }
}
</style>
<style lang="scss">
.default-modal2 {
  width: 680px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
