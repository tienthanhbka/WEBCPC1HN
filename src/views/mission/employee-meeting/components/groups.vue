<template>
  <div class="employee-mission-container">
     
    <div>


          <div class="inline-block">
       <el-select v-model="groups" clearable placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup">
          </el-option>
        </el-select>
        </div>

      <!-- <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button> -->

    </div>

    <div>
         <el-table
      v-loading="isLoading"
      :data="options"
        @expand-change="expandRowEm"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
     
    >
    <el-table-column type="expand">
      <template slot-scope="scope">
      <el-table ref="myCallTable"
        :data="scope.row.lines"
        v-loading="isLoading"
        fit
        style="width: 100%"
        @expand-change="expandRow"
     
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <result :meetingHeader="scope.row"></result>
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1)*pageSize}}
            <el-popover placement="top-start" trigger="hover" v-if="scope.row.Status==1">
              <div>
                <el-button
                  style="color:#f1c40f"
                  type="text"
                  size="medium"
                  icon="el-icon-edit"
                  @click="editMeetingHeader(scope.row)"
                >Sửa</el-button>

                
                <el-button
                  style="color:#c0392b"
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  @click="deleteMeetingHeader(scope.row)"
                >Hủy</el-button>
              </div>
              <el-button
                style="color:#2980b9"
                type="text"
                size="medium"
                icon="el-icon-s-operation"
                slot="reference"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
          <el-table-column prop="Status" width="120" label="Trạng thái">
          <template slot-scope="{row}">
            <el-tag slot="reference" :type="row.Status|meetingHeaderStatusColor ">
              <i class="fas fa-info"></i>
              {{ row.Status|meetingHeaderStatusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" width="150" label="Loại">
          <template slot-scope="{row}">
            {{row.Type}}
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" min-width="300" label="Nội dung">
          <template slot-scope="{row}">
            {{row.Content}}
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" min-width="300" label="Khách hàng tổ chức">
          <template slot-scope="{row}">
            {{row.namePlace}}
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" width="240" label="Thời gian">
          <template slot-scope="{row}">
            {{Date.parse(row.TimeStart).toString('dd/MM/yyyy')}} {{Date.parse(row.TimeStart).toString('HH:mm')}} - {{Date.parse(row.TimeEnd).toString('HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" width="300" label="Ghi chú">
          <template slot-scope="{row}">
            {{row.Note}}
          </template>
        </el-table-column>
      
      </el-table>

       </template>
    </el-table-column>
     <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1) }}
           <!-- <el-tooltip content="Duyệt" placement="top"><el-button @click="openModalConfirmTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
        </template>
      </el-table-column>
   
      <el-table-column  label="Nhân viên" >
        <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
      </el-table-column>

     </el-table>

      <!-- <el-pagination
        class="pagination"
        :total="dataLength"
        
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
 import { GetListGroupAdminByToken } from "@/api/groups";
 import { getEmployee } from "@/api/order";
import MeetingScheduleModal from '@/views/mission/employee-meeting/components/meeting-schedule-modal';
import {GetGroupMeetingOfMe,DeleteMeetingHeader} from '@/api/mission'
import Result from '@/views/mission/employee-meeting/components/result'
export default {
  components: {
    MeetingScheduleModal,
    Result
  },
  data() {
    return {
      currentMeetingHeader:null,
      placeModalVisibel:false,
        meetingScheduleVisible :false,
      downloading:false,
      isLoading: false,
      count: 100,
      groupList: [],
      groups:'',
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
      tableData: [],
      options: []
      
    };
  },
  mounted(){
    //this.fetchData();
  },
  methods: {
        fetchGroup(){
       var req = {
        
      };
       GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;

        this.fetchEmployee()
      });
    },
    addNewMeeting(){
      this.currentMeetingHeader = null,
      this.openModal();
    },
    editMeetingHeader(row){
      this.currentMeetingHeader = row;
      this.openModal();
    },
    deleteMeetingHeader(row){
       this.$confirm("Bạn có muốn dòng này phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        DeleteMeetingHeader({
          id:row.RowID
        }).then(res=>{
          row.Status = 0
        })
      });
    },
    onMeetingAdded(e){
      console.log(e);
      
      this.tableData.unshift(e);
    },
    expandRow(){

    },
     expandRowEm(row){
         this.isLoading = true
          GetGroupMeetingOfMe({
       PageNumber:this.currentPage,
       RowspPage:this.pageSize,
       idEmployee: row.idEmployee
     }).then(res=>{
    //    this.dataLength = res.TotalRows
    //    res.Data.forEach(e=>{
    //      e.line = null
    //    })
    console.log(res.Data)
       this.isLoading = false;
       row.lines = res.Data;
     })
    },
   openModal(){
       this.meetingScheduleVisible =true;
   },
//    fetchData(){
//      this.isLoading = true;
//      GetMeetingOfMe({
//        PageNumber:this.currentPage,
//        RowspPage:this.pageSize
//      }).then(res=>{
//        this.dataLength = res.TotalRows
//        res.Data.forEach(e=>{
//          e.line = null
//        })
//        this.isLoading = false;
//        this.tableData = res.Data;
//      })
//    },
    fetchEmployee() {
      var req = {
        admin: this.groups,
      };
      this.isLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
        this.isLoading = false; 
      });
    }, 
  },
  computed:{
    
  },
  created() {
        this.fetchGroup();
  },
  watch:{
   groups: function (params) {
       this.fetchEmployee()
   }

  }
};
</script>

<style>
.modal-class {
  max-width: 960px;
  width: 98%;
  margin-top: 5px !important;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}

.employee-mission-container {
  padding: 5px;
}

.pagination {
  margin-top: 10px;
}
</style>

