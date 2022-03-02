<template>
  <div class="my-mission-container">
    <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Định nghĩa báo cáo Roleplay</el-button>
    </div>
  
    <div>
      <el-table
        :data="tableData"
       
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="155px"  label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }} 
          
            
             </template>
        </el-table-column>
        
         <el-table-column prop="Title"  label="Tiêu đề"></el-table-column>
          <el-table-column prop="OTC"  label="Dành cho">
               <template slot-scope="scope">
                    {{ scope.row.OTC | otcFilter}}
                </template>

          </el-table-column>
        
      
            <el-table-column  label="Ngày tạo">
             <template slot-scope="scope">
                    <span>{{ Date.parse(scope.row.TimeCreate).toString("dd-MM-yyyy") }}</span>
                </template>
          </el-table-column>

          <!-- <el-table-column   label="Trạng thái">
               <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.Status | roleStatusColor">
                    {{ scope.row.Status | roleStatusText}}
                    </el-tag>
                </template>
          </el-table-column> -->
      
           <el-table-column  prop="Note" label="Ghi chú"></el-table-column>
          
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>

     

      <el-dialog title="Định nghĩa báo cáo RolePlay" :visible.sync="dialogFormCreate">
        <create @click="addOK"></create>
        
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
  </span>
</el-dialog>


    </div>
  </div>
</template>

<script>
import Cancel from "@/views/roleplay/employee/component/cancel";
import Create from "@/views/roleplay/define/component/createDefine";
import Upload from "@/views/roleplay/employee/component/uploadVideo";
import ViewVideo from "@/views/roleplay/employee/component/viewVideo";
import { parseTime } from "@/utils/index";
import { getReportDefine } from "@/api/reportRole";
import Cookies from 'js-cookie'
import { getStartMonth, getEndMonth} from '@/api/index'
import { GetGroupEmployee } from "@/api/groups";

export default {
     filters:{
        statusTextFilter(status) {
      return statusMap[status];
    },
     otcFilter(otc) {
       if(otc == 0)
      return 'ETC';
      if(otc==1)
      return 'OTC'
       if(otc==16)
      return 'PG'
       if(otc==15)
      return 'PS'
     if(otc==3)
     return 'Người giám sát'
    },
    
   },
  components: {
    Create,Upload,ViewVideo,Cancel
  },
  data() {
    return {
      tableData: [],
       options: [{
        }],
        token: Cookies.get('token'),
        dialogFormUpload:false,
         dialogFormView:false,
         dialogFormCancel: false,
        ReportID:0,
        dialogFormCreate: false,
        dialogFormStart: false,
        groupList: [{}],
        codeWork: '',
      TextSearch: "",
      dateStart: null,
      dateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      rowData: [],
      rowAction:[],
      rowDefine:[],
      IDService: 0,
      service: [],
      obj:'',
       groups: '',
       serviceCode: Cookies.get('idGroup'),
    };
  },
  methods: {
  
      fetchGroup(){
       var req = {
        idEmployee: Cookies.get('idEmployee'),
        token: Cookies.get('token')
      };
       GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },
    openModalView(row){
        this.rowData = row
        this.dialogFormView = true
        //console.log(row)
    },
      openModalCancel(row){
        this.rowData = row
        this.dialogFormCancel = true
        //console.log(row)
    },

    openModalUpload(row){
        this.rowData = row
        this.dialogFormUpload = true
    },
    OK(){
         this.dialogFormUpload = false
    },
    create(){
        this.dialogFormCreate = true
    },

     
    fetchOffice(){
      this.listLoading = true;
      getOffice().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false; 
      });
    },
  
    fetchData() {
      var req = {
       
        token: Cookies.get('token'),
       
      };
       getReportDefine(req).then(response => {
         if(response.ResCode == 0){
           this.tableData = response.Data;
        //    this.currentPage= response.PageNumber;
        //    this.pageSize = response.RowspPage
        //    this.total = (response.PageNumber)*(response.RowspPage)
          
         }
      });
    },
   
    
     addOK() {
       this.dialogFormCreate = false
       this.fetchData()
    },
    startReport(row){
      this.ReportID = row.ReportID
      this.dialogFormStart = true
      
    }
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
     groups: function(){
      this.fetchData();
      
      
    },
      dateStart: function(){
      this.fetchData();
      //this.fetchEmployee();
    },
    dateEnd: function(){
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
        this.dateStart = getStartMonth();
    this.dateEnd = getEndMonth();
    this.fetchGroup();
    this.fetchData();
  }
}
</script>


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
</style>


