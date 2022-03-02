<template>
  <div class="my-mission-container">
    <div>
    
         <!-- <div class="inline-block">
        <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="AddEmployee"
      >Thêm nhân viên</el-button>
       </div> -->

       <el-input style="width: 200px;"   placeholder="tên, mã NV..." v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="Search">Search</el-button>

         <el-button type="success" icon="el-icon-plus" @click="addEmployee">Cập nhật nhân viên từ hệ thống</el-button>
    </div>
    <div style="margin-top: 20px;">
      <el-table
        :data="dataTable"
     
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) }} 
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="">
           <template slot-scope="scope">
            <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEdit(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
                    <!-- <el-tooltip content="Xóa" placement="top"><el-button  @click="DeleteEmployee(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
            </template>
        </el-table-column>
          <el-table-column prop="No_" label="Mã nhân viên" align="center"></el-table-column> 
        <el-table-column prop="NameEmployee" label="Tên nhân viên" align="center"></el-table-column> 
         <el-table-column prop="idGroup" label="Nhóm" align="center"></el-table-column>    
          <el-table-column prop="TypeEmployee" label="Loại NV" align="center"></el-table-column>       
           <el-table-column prop="Level" label="Trình độ" align="center"></el-table-column>  
            <el-table-column prop="Description" label="Nhận xét" align="center"></el-table-column>       
             <el-table-column prop="WorkingDate" label="Ngày bắt đầu làm việc" align="center"></el-table-column>               
      </el-table>
    </div>

    <el-dialog title="Cập nhật hồ sơ" :visible.sync="dialogFormUpdate">
        <update :row="rowData" @click="updateOK"></update>
  
</el-dialog>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Update from "@/views/CV/component/updateInfor";
 import { GetEmployeeLevel, SearchEmployeeLevel,UpdateEmployeeFromTableEmployee } from "@/api/employeeLevel";
export default {
  name: "SplitGroup",
  components: {
    Update
  },
  data() {
    return {
      thisLevel:0,
       groupList: [],
       search:"",
       groups: '',
       rowData: '',
       dataTable: '',
       loadingTableData: false,
       dialogFormUpdate: false,
      props: {
        label: "name",
        children: "zones",
        isLeaft: 'leaft',
      },
      count: 1
    };
  },
  methods: {
    addEmployee(){
      UpdateEmployeeFromTableEmployee().then(res => {
        if(res.ResCode == 0){
          this.$notify({
            title: 'Thành công',
            message:'Cập nhật nhân viên thành công',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    fectchData() {
        this.loadingTableData = true
      var req = {
          //idGroup : this.groups,
          token: Cookies.get('token')
      }
      GetEmployeeLevel(req).then(res => {
          if(res.ResCode == 0){
            this.dataTable = res.Data;
            this.loadingTableData = false
           // console.log(res.Data);
          }
      });
    },

     Search() {
        this.loadingTableData = true
      var req = {
          search : this.search,
          token: Cookies.get('token')
      }
      SearchEmployeeLevel(req).then(res => {
          if(res.ResCode == 0){
            this.dataTable = res.Data;
            this.loadingTableData = false
           // console.log(res.Data);
          }
      });
    },

    updateOK(){
        this.dialogFormUpdate = false
        this.fectchData()
    },
   
    openModalEdit(row){
        this.rowData = row
        this.dialogFormUpdate = true
    }
     
  },
  watch: {
    
  },
  created() {
    //this.fetchGroup();
    this.fectchData();
  }
};
</script>
<style  scoped>
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
</style>
<style lang="css" scoped>
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}