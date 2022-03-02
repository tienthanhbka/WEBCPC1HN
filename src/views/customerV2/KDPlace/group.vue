<template>
  <div>
    <el-dialog
      title="Lịch  sử tồn kho"
      :visible.sync="inventoryModalVisible"
      custom-class="modal-class"
    >
      <div>adf</div>
    </el-dialog>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-select
          style="width:100%; margin-bottom:10px"
          v-model="currentGroup"
          placeholder="Select"
        >
          <el-option
            v-for="group in groupLst"
            :key="group.idGroup"
            :label="group.idGroup"
            :value="group.idGroup"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="12">
        <el-select
          style="width:100%;margin-bottom:10px"
          v-model="currentEm"
          placeholder="Select"
        >
          <el-option
            v-for="em in emLst"
            :key="em.idEmployee"
            :label="em.nameEmployee"
            :value="em.idEmployee"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      class=""
      :data="tableData"
      v-loading="isLoading"
      border
      show-header
    >
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <inventory-tab
            :customer="row"
            :idEmployee="currentEm"
          ></inventory-tab>
        </template>
      </el-table-column>
      <el-table-column label="Mã khách hàng" width="130">
        <template slot-scope="{ row }">
          <span>{{ row.No_ }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tên khách hàng" min-width="150">
        <template slot-scope="{ row }">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      groupLst: [],
      emLst: [],
      currentGroup: "",
      currentEm: "",
      isGroupPage: false,
      isLoading: false,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      customerNo: "",
      customerName: "",
      typeCus: "",
      tableData: [],
      inventoryModalVisible: false,
      dialogFormUpload: false,
      row: ""
    };
  },

  methods: {
    uploadOK() {
      this.dialogFormUpload = false;
    },
    uploadFile(row) {
      this.row = row;
      this.dialogFormUpload = true;
    },
    fetchData() {}
  },
  created() {
    this.fetchData();
  },
  watch: {
    currentGroup() {},
    currentEm() {}
  }
};
</script>
<style scoped>
.el-table__expanded-cell[class*="cell"] {
  padding: 15px 5px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 5px;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>
