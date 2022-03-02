<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button @click="addStatus" type="primary" size="small"
          >Cập nhật BHXH</el-button
        >
      </div>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="listEm"
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

        <el-table-column align="center" width="225px" label="Action">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
              <el-button-group>
                <el-tooltip content="Thông tin">
                  <router-link
                    :to="'/thong-tin-nhan-vien/' + scope.row.EmployeeID"
                  >
                    <el-button size="mini"><i class="far fa-eye"></i></el-button
                  ></router-link>
                </el-tooltip>
                <el-tooltip content="Chỉnh sửa">
                  <el-button @click="edit(scope.row)" size="mini" type="primary"
                    ><i class="far fa-edit"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa">
                  <el-button @click="del(scope.row)" size="mini" type="danger"
                    ><i class="far fa-trash-alt"></i></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Họ và tên" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Họ và tên">
              <span>{{ scope.row.nameEmployee }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Mức đóng" align="right" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mức đóng">
              <span>{{ scope.row.Money }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày bắt đầu" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày bắt đầu">
              <span>{{ scope.row.DateStart }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày kết thúc" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày kết thúc">
              <span>{{ scope.row.DateEnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Lý do biến động" align="right" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lý do biến động">
              <span>{{ scope.row.Reason }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormUpdate" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <create @addOK="addOK"></create>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormEdit" custom-class="default-modal">
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
      </el-dialog>
      <!-- <el-dialog title="Cập nhật BHXH" :visible.sync="dialogFormUpdate">
      <create @addOK="addOK"></create>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Chỉnh sửa BHXH" :visible.sync="dialogFormEdit">
      <edit :row="rowData" @editOK="editOK"></edit>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Xóa BHXH" :visible.sync="dialogFormDel">
      <delete :row="rowData" @delOK="delOK"></delete>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog> -->
    </div>
  </div>
</template>
<script>
import { GetEmployeeBHXH } from "@/api/employeeInfor";
import Create from "@/views/user/bhxh/component/createBHXH";
import Edit from "@/views/user/bhxh/component/editBHXH";
import Delete from "@/views/user/bhxh/component/delBHXH";
export default {
  components: { Create, Edit, Delete },
  data() {
    return {
      listEm: [],
      rowData: "",
      titleDialog: "",
      listLoading: false,
      dialogFormUpdate: false,
      dialogFormEdit: false,
      dialogFormDel: false
    };
  },
  methods: {
    del(row) {
      this.rowData = row;
      this.dialogFormDel = true;
      this.titleDialog = "Xóa BHYT";
    },
    delOK() {
      this.dialogFormDel = false;
    },
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
      this.titleDialog = "Chỉnh sửa BHYT";
    },
    editOK() {
      this.dialogFormEdit = false;
    },
    addOK(form) {
      this.dialogFormUpdate = false;
      //this.fetchData()
      var sta = {
        RowID: 0,
        EmployeeID: form.EmployeeID,
        DateStart: form.DateStart,
        DateEnd: form.DateEnd,
        nameEmployee: this.listEm[0].nameEmployee,
        Money: form.Money,
        Reason: form.Reason
      };

      this.listEm.push(sta);
    },
    addStatus() {
      this.dialogFormUpdate = true;
      this.titleDialog = "Cập nhật BHYT";
    },
    fetchData() {
      this.listLoading = true;
      GetEmployeeBHXH({ EmployeeID: this.$route.params.id }).then(res => {
        this.listEm = res.Data;
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
