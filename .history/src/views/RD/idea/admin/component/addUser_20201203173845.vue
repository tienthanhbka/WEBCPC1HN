<template>
  <div>
    <div class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
        size="mini"
      >
      </el-input>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column width="100px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" label="Tên nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên nhân viên">
              {{ scope.row.FullName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="SĐT">
          <template slot-scope="scope">
            <div class="dat-cell" label="SĐT">
              {{ scope.row.UserCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Đang theo dõi">
          <template slot-scope="scope">
            <div class="dat-cell" label="Đang theo dõi">
              0
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;display: table;border-bottom:1px solid #ccc;"
      >
        <el-button @click="cancelUser" type="info">Hủy</el-button>
        <el-button type="primary" @click="onSubmit" icon="fas fa-user-plus">
          Thêm</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  AddEmployeeIntoIdea,
  GetEmployeeRD,
  GetEmployeeViewIdea
} from "@/api/idea";
import Cookies from "js-cookie";
export default {
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
      multipleSelection: [],
      UserCode: "",
      TextSearch: "",
      UserIdeaLst: []
    };
  },
  methods: {
    onSubmit() {
      var a = [];
      this.multipleSelection.forEach(function(item, index, arr) {
        let obj = {
          UserCode: item.UserCode,
          FullName: item.FullName
        };
        a.push(obj);
      });
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        IdeaId: this.idea.DocumentId,
        EmployeeLst: a
      };
      AddEmployeeIntoIdea(rep).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Thêm nghiên cứu viên thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("addUserOK", "OK");
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cancelUser() {
      this.$emit("cancelUser");
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee")
      };
      GetEmployeeRD(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.EmployeeLst;
        }
      });
      var req2 = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        DocumentId: this.idea.DocumentId
      };
      GetEmployeeViewIdea(req2).then(res2 => {
        if (res2.RespCode == 0) {
          this.UserIdeaLst = res2.UserIdeaLst;
        }
      });
      this.loadingTableData = false;
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
