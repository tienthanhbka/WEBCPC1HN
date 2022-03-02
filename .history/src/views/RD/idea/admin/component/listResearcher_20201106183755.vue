<template>
  <div>
    <div class="inline-block">
      <el-button
        type="primary"
        icon="fas fa-plus"
        size="small"
        style="margin:5px;background-color:#02bc77;color:#fff;float:right;"
        @click="addUser"
      >
        Thêm NCV
      </el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        class="el-mobile-table"
        :data="tableData"
        v-loading="loadingTableData"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="100px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="Nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              {{ scope.row.EmployeeId }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="100px" label="SĐT">
          <template slot-scope="scope">
            <div class="dat-cell" label="SĐT">
              {{ scope.row.UserCode }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column width="100px" align="center">
          <template slot-scope="scope">
            <div class="dat-cell">
              <el-tooltip content="Xóa NCV" effect="light">
                <el-button
                  icon="el-icon-delete"
                  style="color:red;"
                  type="text"
                  @click="delUser(scope.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;display: table;border-bottom:1px solid #ccc;"
      >
        <el-button @click="cancelUser" type="info">Hủy</el-button>
        <el-button type="primary" @click="onSubmit" icon="fas fa-user-plus">
          Thêm</el-button
        >
      </div> -->
    </div>
    <el-dialog :visible.sync="dialogFormAddUser" append-to-body>
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-user-plus"></i>&#32;&#32;Thêm NCV tưởng
      </span>
      <add-user
        :idea="rowData"
        @addUserOK="addUserOK"
        @cancelUser="canceladdUserOK"
      ></add-user>
    </el-dialog>
  </div>
</template>

<script>
import AddUser from "./addUser";
import {
  AddEmployeeIntoIdea,
  GetEmployeeRD,
  GetEmployeeViewIdea,
  RemoveEmployeeIntoIdea
} from "@/api/idea";
import Cookies from "js-cookie";
export default {
  components: { AddUser },
  props: ["idea"],
  created() {
    this.fetchData();
  },
  mounted() {
    this.fetchData2();
  },
  watch: {
    idea() {
      this.fetchData();
    }
  },
  data() {
    return {
      listEm: [],
      loadingTableData: false,
      dialogFormAddUser: false,
      tableData: [],
      rowData: "",
      multipleSelection: [],
      UserCode: "",
      TextSearch: "",
      UserIdeaLst: []
    };
  },
  methods: {
    // onSubmit() {
    //   var a = [];
    //   this.multipleSelection.forEach(function(item, index, arr) {
    //     let obj = {
    //       UserCode: item.UserCode,
    //       FullName: item.FullName
    //     };
    //     a.push(obj);
    //   });
    //   var rep = {
    //     Token: Cookies.get("token"),
    //     UserName: Cookies.get("idEmployee"),
    //     IdeaId: this.idea.DocumentId,
    //     EmployeeLst: a
    //   };
    //   AddEmployeeIntoIdea(rep).then(res => {
    //     this.$notify({
    //       title: "Thành công",
    //       message: "Thêm nhân viên thành công",
    //       type: "success",
    //       position: "top-left"
    //     });
    //     this.$emit("addUserOK", "OK");
    //   });
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    cancelUser() {
      this.$emit("cancelUser");
    },
    addUser() {
      this.dialogFormAddUser = true;
      this.rowData = this.idea;
    },
    fetchData() {
      this.loadingTableData = true;
      //   var req = {
      //     Token: Cookies.get("token"),
      //     UserName: Cookies.get("idEmployee")
      //   };
      //   GetEmployeeRD(req).then(res => {
      //     if (res.RespCode == 0) {
      //       this.tableData = res.EmployeeLst;
      //     }
      //   });
      var req2 = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        DocumentId: this.idea.DocumentId
      };
      GetEmployeeViewIdea(req2).then(res2 => {
        if (res2.RespCode == 0) {
          this.tableData = res2.UserIdeaLst;
        }
      });
      this.loadingTableData = false;
    },
    addUserOK() {
      this.dialogFormAddUser = false;
      this.fetchData();
    },
    delUser(row) {
      this.$confirm(
        "Xác nhận xóa " + row.EmployeeId + ". Continue?",
        "Xóa NCV",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      )
        .then(() => {
          var rep = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            IdeaId: this.idea.DocumentId,
            UserCode: row.EmployeeId
          };
          RemoveEmployeeIntoIdea(rep).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                type: "success",
                message: "Xóa thành công"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "warning",
                message: res.RespText
              });
            }
          });
        })
        .catch(() => {});
    },
    canceladdUserOK() {
      this.dialogFormAddUser = false;
    },
    fetchData2() {
      this.$refs.multipleTable.clearSelection();
      if (this.UserIdeaLst) {
        var _this = this;
        setTimeout(function() {
          _this.UserIdeaLst.forEach(row => {
            var _this2 = _this;
            _this.listEm.forEach(function(item, index, arr) {
              if (item.UserCode == row.EmployeeId) {
                _this2.$refs.multipleTable.toggleRowSelection(
                  _this2.listEm[index],
                  true
                );
              }
            });
          });
        }, 1000);
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>
