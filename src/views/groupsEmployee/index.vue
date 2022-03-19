<template>
  <div class="my-mission-container">
    <div>
      <addEmployeeGroup
        :groups="this.groups"
        @click-something="addOK"
      ></addEmployeeGroup>
      <deleteEmployeeGroup
        :groups="this.groups"
        :row="this.rowData"
        @click-something="deleteOK"
      ></deleteEmployeeGroup>
      <div class="inline-block">
        <el-select
          v-model="groups"
          style="width:100%"
          clearable
          placeholder="Chọn nhóm"
        >
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block" v-if="checkOTC != 'KD'">
        <el-button type="success" icon="el-icon-document" @click="AddEmployee"
          >Thêm nhân viên vào nhóm</el-button
        >
      </div>
    </div>
    <div style="margin-top: 20px;">
      <el-table
        class="el-mobile-table"
        :data="dataTable"
        size="small"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="75px"
          label=""
          v-if="checkOTC != 'KD'"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
              <el-tooltip content="Chỉnh sửa" placement="top"
                ><el-button
                  @click="openModalEditOrderSend(scope.row)"
                  type="text"
                >
                  <i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top"
                ><el-button @click="DeleteEmployee(scope.row)" type="text">
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nameEmployee"
          label="Tên nhân viên"
          width="300px"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên nhân viên">
              {{ scope.row.nameEmployee }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="idEmployee" label="Số điện thoại" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Số điện thoại">
              {{ scope.row.idEmployee }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import AddEmployeeGroup from "@/views/groupsEmployee/component/addEmployee";
import DeleteEmployeeGroup from "@/views/groupsEmployee/component/deleteEmployee";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
export default {
  name: "SplitGroup",
  components: {
    AddEmployeeGroup,
    DeleteEmployeeGroup
  },
  data() {
    return {
      groupList: [],
      groups: "",
      rowData: "",
      dataTable: [],
      checkOTC: "",
      loadingTableData: false
    };
  },
  methods: {
    fectchData() {
      this.loadingTableData = true;
      var req = {
        idGroup: this.groups,
        token: Cookies.get("token")
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.dataTable = res.Data;
          this.loadingTableData = false;
        }
      });
    },
    addOK(groups) {
      this.groups = groups;
      this.fectchData();
    },
    deleteOK() {
      this.fectchData();
    },
    AddEmployee() {
      VoerroModal.show("add-employee");
    },
    DeleteEmployee(row) {
      this.rowData = row;
      VoerroModal.show("delete-employee");
    },
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee")
      };

      GetListGroupAdminByToken(req).then(response => {
        //console.log(response);
        this.groupList = response.Data;
        //console.log(this.groupList);
      });
    }
  },
  watch: {
    groups: function() {
      this.fectchData();
      //this.fetchEmployee();
    }
  },
  created() {
    var otc = Cookies.get("otc");
    var em = Cookies.get("idEmployee");
    if (
      (otc == 0 || otc == 1 || otc == 15 || otc == 16) &&
      em != "0914353556"
    ) {
      this.checkOTC = "KD";
    }
    this.fetchGroup();
  }
};
</script>
<style scoped>
.treenode .group-btn {
  margin-left: 10px;
}
.components-container {
  position: relative;
  height: 100vh;
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
.right-container {
  /* background-color: #fce38a; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
