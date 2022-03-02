<template>
  <div class="my-mission-container">
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
      <!-- <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="dateStart"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div> -->
      <!-- <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="dateEnd"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div> -->
       <div class="inline-block">
          <div class="block">
                <span class="demonstration">Tháng</span>
                <el-date-picker
                v-model="month"
                type="month"
                placeholder="Chọn tháng">
                </el-date-picker>
            </div>
        </div>
    <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Đăng ký lịch họp</el-button>
    </div>
  
    <div>
        <!-- <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/view?usp=sharing">  </iframe>

        <iframe src="https://drive.google.com/file/d/1CI7ddj3u5rvS7nVCVCShVZa87ur1tlAd/preview" width="640" height="480"></iframe> -->
      <el-table
        :data="tableData"
       
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="125px"  label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }} 
             <!-- <el-tooltip content="Xem quy định" placement="top">
               <router-link :to="'/quy-dinh/xem-quy-dinh/' + scope.row.RowID">
              <i class="far fa-eye"></i>
      </router-link></el-tooltip> -->
              <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
              <el-tooltip v-if="scope.row.CloseVideo != 1" content="Nộp video" placement="top"><el-button @click="openModalUpload(scope.row)" type="text" >  <i class="fas fa-link"></i></el-button></el-tooltip>
               <el-tooltip content="Xem video" placement="top"><el-button @click="openModalView(scope.row)" type="text" >  <i class="fas fa-film"></i></el-button></el-tooltip>
                <el-tooltip content="Ghi chú" placement="top"><el-button @click="openModalNote(scope.row)" type="text" >  <i class="far fa-comment-dots"></i></el-button></el-tooltip>
                   <el-tooltip v-if="scope.row.Status == 1" content="Chỉnh sửa" placement="top"><el-button @click="openModalEdit(scope.row)" type="text" >  <i style="color: orange;" class="far fa-edit"></i></el-button></el-tooltip>
             </template>
        </el-table-column> 
        
         <el-table-column prop="Title" width="150" label="Tiêu đề">
               
         </el-table-column>
              <el-table-column width="110" label="Ngày đăng ký">
             <template slot-scope="scope">
                    <span>{{ Date.parse(scope.row.TimeCreate).toString('dd-MM-yyyy') }}</span>
                </template>
          </el-table-column>
            <el-table-column width="110" label="Ngày họp">
             <template slot-scope="scope">
                    <span>{{ scope.row.Date }}</span>
                </template>
          </el-table-column>
           <el-table-column width="120" label="Thời gian">
             <template slot-scope="scope">
                    <span>{{ scope.row.TimeStart }} - </span>
                     <span>{{ scope.row.TimeEnd }}</span>
                </template>
          </el-table-column>
          <el-table-column  prop="Content" width="300" label="Nội dung">
              <template slot-scope="scope">
                   <div>{{ scope.row.Content }} </div>
                     <div v-if="scope.row.Product != null"> Sản phẩm: {{ scope.row.Product }}</div>
              </template>

          </el-table-column>
           <el-table-column  prop="Help" label="Hỗ trợ KT"></el-table-column>
             <el-table-column  prop="Note" label="Ghi chú"></el-table-column>
             
          <el-table-column   label="Trạng thái">
               <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.Status | roleStatusColor">
                    {{ scope.row.Status | roleStatusText}}
                    </el-tag>
                </template>
          </el-table-column>
           <el-table-column min-width="100"  label="Link">
                  <template slot-scope="scope">
                    <a :href="scope.row.Link" _blank >Link 1 </a>
                    <a :href="scope.row.Link2" _blank >Link 2 </a>
                </template>
              </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>

     

      <el-dialog title="Đăng ký lịch họp nhóm" :visible.sync="dialogFormCreate">
        <create @click="addOK"></create>
        
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
  </span>
</el-dialog>

   <el-dialog title="Chỉnh sửa lịch họp nhóm" :visible.sync="dialogFormEdit">
        <edit :row="rowData" @click="editOK"></edit>
        
  <span slot="footer" class="dialog-footer">
   
  </span>
</el-dialog>

 <el-dialog title="Upload video họp nhóm" :visible.sync="dialogFormUpload">
        <upload :row="rowData" @click="OK"></upload>
        
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
  </span>
</el-dialog>


 <el-dialog title="Xem video" :visible.sync="dialogFormView">
        <viewVideo :row="rowData" ></viewVideo>
  
</el-dialog>


 <el-dialog title="Ghi chú" :visible.sync="dialogFormNote">
        <note :row="rowData" @click="OKNote" ></note>
  
</el-dialog>

    </div>
  </div>
</template>

<script>
import Create from "@/views/meetingGroup/employee/component/schedule";
import Edit from "@/views/meetingGroup/employee/component/edit";
import Upload from "@/views/meetingGroup/employee/component/uploadVideo";
import Note from "@/views/meetingGroup/employee/component/help";
import ViewVideo from "@/views/meetingGroup/employee/component/viewVideo";
import { parseTime } from "@/utils/index";
import { GetMeetingGroup } from "@/api/meetingGroup";
import Cookies from 'js-cookie'
import { getStartMonth, getEndMonth} from '@/api/index'
import { GetGroupEmployee } from "@/api/groups";

export default {
     filters:{
        statusTextFilter(status) {
      return statusMap[status];
    },
     publicTextFilter(Public) {
       if(Public == 1)
      return 'Toàn bộ';
      else
      return 'Trong nhóm'
    },
     publicColorFilter(Public) {
       if(Public == 1)
      return 'success';
      else
      return 'danger'
    },

     requireTextFilter(Require) {
       if(Require == 1)
      return 'Bắt buộc';
      else
      return 'Không bắt buộc'
    },
     requireColorFilter(Require) {
       if(Require == 1)
      return 'success';
      else
      return 'danger'
    },
   },
  components: {
    Create,Upload,ViewVideo,Note,Edit
  },
  data() {
    return {
      tableData: [],
      month:'',
       options: [{
        }],
        token: Cookies.get('token'),
        dialogFormUpload:false,
         dialogFormView:false,
          dialogFormNote:false,
          dialogFormEdit: false,
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
    },

      openModalNote(row){
        this.rowData = row
        this.dialogFormNote = true
    },

    openModalUpload(row){
        this.rowData = row
        this.dialogFormUpload = true
    },
    OK(){
         this.dialogFormUpload = false
    },
     OKNote(){
         this.dialogFormNote = false
    },
    create(){
      if(this.tableData.length < 4 || this.groups == "CNHN-CONGNO"){
        this.dialogFormCreate = true
        this.fetchData()
      }
      else{
        this.$message({
          message: "Bạn đã đăng kí 4 lần trong tháng "+ Date.parse(this.month).toString('MM'),
          type: "warning"
        })
      }
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
        this.loadingTableData = true
         this.month=Date.parse(this.month).toString('yyyy-MM-dd')
      var req = {
         idGroup: this.groups,
        token: Cookies.get('token'),
          dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        month: this.month
        
      };
       GetMeetingGroup(req).then(response => {
         if(response.ResCode == 0){
              this.loadingTableData = false
           this.tableData = response.Data;
        //    this.currentPage= response.PageNumber;
        //    this.pageSize = response.RowspPage
        //    this.total = (response.PageNumber)*(response.RowspPage)
          
         }
      });
    },
    openModalEdit(row){
        this.rowData = row
        this.dialogFormEdit = true
        //console.log(row)
    },
    editOK(){
         this.dialogFormEdit = false
         this.fetchData()
    },
    
     addOK() {
       this.dialogFormCreate = false
       this.fetchData()
    },
   
  },
  watch: {
    // pageSize: function() {
    //   this.fetchData();
    // },
    // currentPage: function() {
    //   this.fetchData();
    // },
     groups: function(){
      this.fetchData();
      
    },
      month: function(){
      this.fetchData();
      //this.fetchEmployee();
    },
    // dateEnd: function(){
    //   this.fetchData();
    //   //this.fetchEmployee();
    // }
  },
  created() {
    this.month = new Date()
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


