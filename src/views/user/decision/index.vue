<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button
          @click="addStatus"
          size="small"
          type="primary"
          icon="el-icon-circle-plus-outline"
          >Thêm quyết định</el-button
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

        <el-table-column align="center" width="155px" label="Action">
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
        <el-table-column label="Loại quyết định" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại quyết định">
              <span>{{ scope.row.DecisionName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Số quyết định" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số quyết định">
              <span>{{ scope.row.DecisionNumber }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nội dung">
              <span>{{ scope.row.Content }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Ngày ra quyết định"
          align="center"
          min-width="120"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày ra quyết định">
              <span v-if="scope.row.Date">{{ Date.parse(scope.row.Date).toString("dd/MM/yyyy") }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Ngày có hiệu lực"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày có hiệu lực">
              <span v-if="scope.row.DateStart">{{ Date.parse(scope.row.DateStart).toString("dd/MM/yyyy") }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Chi tiết" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chi tiết">
              <el-tooltip content="Xem chi tiết"
                ><router-link
                  :to="'/chi-tiet-quyet-dinh-nhan-su/' + scope.row.RowID"
                >
                  <el-button size="mini" type="warning"
                    ><i class="far fa-eye"></i></el-button></router-link
              ></el-tooltip>
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
        <edit :row="row" @addOK="editOK"></edit>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormDel" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-trash-alt"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <delete :row="row" @delOK="delOK"></delete>
      </el-dialog>
      <!-- <el-dialog title="Thêm quyết định" :visible.sync="dialogFormUpdate">
      <create @addOK="addOK"></create>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Chỉnh sửa quyết định" :visible.sync="dialogFormEdit">
      <edit :row="row" @addOK="editOK"></edit>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Xóa quyết định" :visible.sync="dialogFormDel">
      <delete :row="row" @addOK="delOK"></delete>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog> -->
    </div>
  </div>
</template>
<script>
import { GetEmployeeDecision } from "@/api/employeeInfor";
import Create from "@/views/user/decision/component/createDecision";
import Edit from "@/views/user/decision/component/editDecision";
import Delete from "@/views/user/decision/component/delDecision";
export default {
  components: { Create, Edit, Delete },
  data() {
    return {
      row: "",
      titleDialog: "",
      listEm: [],
      listLoading: false,
      dialogFormUpdate: false,
      dialogFormEdit: false,
      dialogFormDel: false
    };
  },
  methods: {
    addOK(form) {
      this.dialogFormUpdate = false;
      var sta = {
        BHXH: form.BHXH,
        CodeWork: form.CodeWork,
        DateEnd: form.DateEnd,
        DateStart: form.DateStart,
        EmployeeID: form.EmployeeID,
        RowID: 1,
        Status: 1,
        Type: form.Type,
        nameEmployee: this.listEm[0].nameEmployee
      };
      // sta.EmployeeID = form.EmployeeID
      // sta.DateStart= form.DateStart
      // sta.DateEnd = form.DateEnd
      // sta.Type = form.Type
      // sta.nameEmployee = this.listEm[0].nameEmployee

      this.listEm.push(sta);
    },
    editOK(form) {
      this.dialogFormEdit = false;
      this.fetchData();
    },
    edit(row) {
      this.row = row;
      //console.log(this.row)
      this.dialogFormEdit = true;
      this.titleDialog = "Chỉnh sửa quyết định";
    },
    delOK(form) {
      this.dialogFormDel = false;
      this.fetchData();
    },
    del(row) {
      this.row = row;
      //console.log(this.row)
      this.dialogFormDel = true;
      this.titleDialog = "Xóa quyết định";
    },
    addStatus() {
      this.dialogFormUpdate = true;
      this.titleDialog = "Thêm quyết định";
    },
    fetchData() {
      this.listLoading = true;
      GetEmployeeDecision({ EmployeeID: this.$route.params.id }).then(res => {
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
