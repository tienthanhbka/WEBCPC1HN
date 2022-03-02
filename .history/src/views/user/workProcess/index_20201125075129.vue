<template>
  <div>
    <div style="padding: 15px;">
      <el-button @click="addStatus" type="success">Thêm Quá trình</el-button>
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
      <el-table-column label="Quá trình hợp đồng" align="right" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Quá trình hợp đồng">
            <span>{{ scope.row.Type }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số hợp đồng" align="right" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số hợp đồng">
            <span>{{ scope.row.CodeWork }}</span>
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

      <el-table-column label="ML đóng BHXH" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="ML đóng BHXH">
            <span>{{ scope.row.BHXH }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Xem hợp đồng" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Xem hợp đồng">
            <el-tooltip content="Hợp đồng chính thức"
              ><router-link :to="'/chi-tiet-hop-dong/' + scope.row.RowID">
                <el-button size="mini" type="primary"
                  ><i class="far fa-eye"></i></el-button></router-link
            ></el-tooltip>
            <el-tooltip content="Hợp đồng thử việc"
              ><router-link
                :to="'/chi-tiet-hop-dong-thu-viec/' + scope.row.RowID"
              >
                <el-button size="mini" type="success"
                  ><i class="far fa-eye"></i></el-button></router-link
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Cập nhật quá trình" :visible.sync="dialogFormUpdate">
      <create @addOK="addOK"></create>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Chỉnh sửa quá trình" :visible.sync="dialogFormEdit">
      <edit :row="rowData" @editOK="editOK"></edit>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Xóa quá trình" :visible.sync="dialogFormDel">
      <delete :row="rowData" @delOK="delOK"></delete>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import { GetEmployeeProcessWork } from "@/api/employeeInfor";
import Edit from "@/views/user/workProcess/component/editWorkProcess";
import Delete from "@/views/user/workProcess/component/delWorkProcess";
import Create from "@/views/user/workProcess/component/createWorkProcess";
export default {
  components: { Create, Edit, Delete },
  data() {
    return {
      rowData: "",
      listEm: [],
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
    },
    delOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
    },
    editOK() {
      this.dialogFormEdit = false;
    },
    addOK(form) {
      this.fetchData();
      this.dialogFormUpdate = false;
      // var sta = {
      //   BHXH: form.BHXH,
      //   CodeWork: form.CodeWork,
      //   DateEnd: form.DateEnd,
      //   DateStart: form.DateStart,
      //   EmployeeID: form.EmployeeID,
      //   RowID: 1,
      //   Status: 1,
      //   Type: form.Type,
      //   nameEmployee: this.listEm[0].nameEmployee
      // };
      // // sta.EmployeeID = form.EmployeeID
      // // sta.DateStart= form.DateStart
      // // sta.DateEnd = form.DateEnd
      // // sta.Type = form.Type
      // // sta.nameEmployee = this.listEm[0].nameEmployee

      // this.listEm.push(sta);
    },
    addStatus() {
      this.dialogFormUpdate = true;
    },
    fetchData() {
      this.listLoading = true;
      GetEmployeeProcessWork({ EmployeeID: this.$route.params.id }).then(
        res => {
          this.listEm = res.Data;
          this.listLoading = false;
        }
      );
    },
    updateHC() {}
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
