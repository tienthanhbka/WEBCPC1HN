<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button @click="addStatus" type="primary" size="small"
          >Thêm tài khoản</el-button
        >
      </div>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số điện thoại" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số điện thoại">
              <span>{{ scope.row.EmployeeID }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số tài khoản" align="right" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số tài khoản">
              <span>{{ scope.row.AccountNumber }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngân hàng" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngân hàng">
              <span>{{ scope.row.Bank }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              <span>{{ scope.row.Note }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormUpdate" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-credit-card"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <create @addOK="addOK" :employee="rowID"></create>
      </el-dialog>
      <!-- <el-dialog :visible.sync="dialogFormEdit" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <edit :row="rowData" @editOK="editOK"></edit>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormDel" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-trash-alt"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <delete :row="rowData" @delOK="delOK"></delete>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import { GetAccountNumberLst } from "@/api/employeeAdmin";
import Create from "@/views/user/accountNumber/component/create";
//import Edit from "@/views/user/accountNumber/component/editBHXH";
//import Delete from "@/views/user/accountNumber/component/delBHXH";
export default {
  components: { Create },
  data() {
    return {
      tableData: [],
      rowData: "",
      titleDialog: "",
      rowID: "",
      listLoading: false,
      dialogFormUpdate: false,
      dialogFormEdit: false,
      dialogFormDel: false
    };
  },
  methods: {
    // del(row) {
    //   this.rowData = row;
    //   this.dialogFormDel = true;
    //   this.titleDialog = "Xóa BHYT";
    // },
    // delOK() {
    //   this.dialogFormDel = false;
    // },
    // edit(row) {
    //   this.rowData = row;
    //   this.dialogFormEdit = true;
    //   this.titleDialog = "Chỉnh sửa BHYT";
    // },
    // editOK() {
    //   this.dialogFormEdit = false;
    // },
    addOK(form) {
      this.dialogFormUpdate = false;
      this.fetchData();
      //   var sta = {
      //     RowID: 0,
      //     EmployeeID: form.EmployeeID,
      //     DateStart: form.DateStart,
      //     DateEnd: form.DateEnd,
      //     nameEmployee: this.listEm[0].nameEmployee,
      //     Money: form.Money,
      //     Reason: form.Reason
      //   };

      //   this.listEm.push(sta);
    },
    addStatus() {
      this.dialogFormUpdate = true;
      this.rowID = this.$route.params.id;
      this.titleDialog = "Thêm tài khoản ngân hàng";
    },
    fetchData() {
      this.listLoading = true;
      GetAccountNumberLst({ EmployeeID: this.$route.params.id }).then(res => {
        this.tableData = res.AccountLst;
        this.listLoading = false;
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .inline-block {
    padding: 5px;
  }
}
</style>
