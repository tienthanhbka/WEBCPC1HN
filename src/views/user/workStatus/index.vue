<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button @click="addStatus" size="small" type="primary"
          >Thêm trạng thái làm việc</el-button
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
        <el-table-column label="Trạng thái" align="right" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <span>{{ scope.row.Type }}</span>
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
      <!-- <el-dialog title="Cập nhật trạng thái" :visible.sync="dialogFormUpdate">
        <create @addOK="addOK"></create>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog> -->

      <!-- <el-dialog title="Chỉnh sửa trạng thái" :visible.sync="dialogFormEdit">
        <edit :row="rowData" @editOK="editOK"></edit>
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog> -->

      <!-- <el-dialog title="Xóa trạng thái" :visible.sync="dialogFormDel">
        <delete :row="rowData" @delOK="delOK"></delete>
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import { GetEmployeeStatusWork } from "@/api/employeeInfor";
import Create from "@/views/user/workStatus/component/createWorkStatus";
import Edit from "@/views/user/workStatus/component/editWorkStatus";
import Delete from "@/views/user/workStatus/component/delWorkStatus";
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
      this.titleDialog = "Xóa trạng thái";
    },
    delOK() {
      this.dialogFormDel = false;
    },
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
      this.titleDialog = "Chỉnh sửa trạng thái";
    },
    editOK() {
      this.dialogFormEdit = false;
    },
    addOK(form) {
      this.dialogFormUpdate = false;
      var sta = {
        RowID: 0,
        EmployeeID: "",
        Status: 1,
        DateStart: "",
        DateEnd: "",
        SalaryBH: null,
        Type: "",
        nameEmployee: ""
      };
      sta.EmployeeID = form.EmployeeID;
      sta.DateStart = form.DateStart;
      sta.DateEnd = form.DateEnd;
      sta.Type = form.Type;
      sta.nameEmployee = this.listEm[0].nameEmployee;

      this.listEm.push(sta);
    },
    addStatus() {
      this.dialogFormUpdate = true;
      this.titleDialog = "Cập nhật trạng thái";
    },
    fetchData() {
      this.listLoading = true;
      GetEmployeeStatusWork({ EmployeeID: this.$route.params.id }).then(res => {
        this.listEm = res.Data;
        this.listLoading = false;
      });
    },
    updateHC() {}
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
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
  .inline-block {
    display: inline-block;
    padding: 5px 0;
  }
}
</style>
