<template>
  <div class="my-mission-container" id='couponTabHeaderBtn'>
    
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

       <div class="inline-block">
        <el-input style="width: 70%; " class="search" placeholder="Tìm kiếm"  v-model="search"></el-input>
         <el-button  class="bt-search" type="infor" @click="Search"> <i class="fas fa-search"></i></el-button>
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
       <el-button type="success" @click="ExportExcel">Xuất Excel</el-button>
    <!-- <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Đăng ký Roleplay</el-button>
    </div> -->
  
    <div>
      
      <el-table
        :data="tableData"
        id="tblData"
         :max-height="tableHeight"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="120px"  label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }} 

             <el-tooltip content="Xem video" placement="top"><el-button @click="view(scope.row)" type="text" >  <i class="fas fa-eye"></i></el-button></el-tooltip>
              <!-- <el-tooltip content="Xếp lịch" placement="top"><el-button @click="addTime(scope.row)" type="text" >  <i class="far fa-clock"></i></el-button></el-tooltip> -->
                <el-tooltip content="Xem báo cáo" placement="top"><el-button @click="viewReport(scope.row)" type="text" > <i class="fas fa-clipboard-list"></i></el-button></el-tooltip> 
             </template> 
        </el-table-column>

         <el-table-column width="120px"  label="Trạng thái">
               <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.Status | roleStatusColor">
                    {{ scope.row.Status | roleStatusText}}
                    </el-tag>
                </template>
          </el-table-column>
        
        
        <el-table-column prop="NameEmployee"  label="Trình dược viên"></el-table-column>
         <el-table-column prop="IDGroup"  label="Nhóm"></el-table-column>
        <el-table-column prop="NameTeacher"  label="Người kiểm tra">
           <template slot-scope="scope">
             <span v-if="scope.row.NameTeacher != null">{{ scope.row.NameTeacher }}</span>
            <!-- <el-tooltip  content="Thêm người kiểm tra" placement="top">
             <el-popover
            
             title="Xếp người kiểm tra"
              placement="top"
              width="300"
              >
              <addTeacher :row="rowData"  :teacher="teacherLst" @click="addOK" ></addTeacher>
              <el-button slot="reference" @click="addUser(scope.row)" type="text" ><i class="fas fa-user-plus"></i></el-button>
            </el-popover>
             
              </el-tooltip> -->
           </template>
        </el-table-column>
        <el-table-column prop="Point"  label="Điểm"></el-table-column>
        <el-table-column prop="NameAccept"  label="Giám sát">
           <template slot-scope="scope">
             <span v-if="scope.row.NameAccept != null">{{ scope.row.NameAccept }}</span>
             <!-- <el-tooltip content="Thêm người người giám sát" placement="top">
                 <el-popover
             title="Xếp người giám sát"
              placement="top"
              width="300"
              >
                <addAccept :row="rowData" :acceptLst="acceptLst"  @click="addAcceptOK"></addAccept>
              <el-button slot="reference" @click="addAccept(scope.row)" type="text" ><i style="color: green;" class="fas fa-user-check"></i></el-button>
            </el-popover>
              <el-button @click="addAccept(scope.row)" type="text" ><i style="color: green;" class="fas fa-user-check"></i></el-button> 
              </el-tooltip> -->
           </template>

        </el-table-column>
            <el-table-column align="center" width="180px;" label="Thời gian">
             <template slot-scope="scope">
                   
                    <span v-if="scope.row.Date != null"> {{ scope.row.TimeStart }} - {{ Date.parse(scope.row.Date).toString('dd/MM/yyyy')  }}</span>
             <!-- <el-tooltip content="Thêm lịch" placement="top">

                  <el-popover
             title="Xếp lịch"
              placement="top"
              width="400"
            
              >
                 <addTime :teacher="teacherLst" :acceptLst="acceptLst" :row="rowData" @click="addTimeOK" ></addTime>
              <el-button slot="reference" @click="addTime(scope.row)" type="text" ><i class="far fa-clock"></i></el-button>
            </el-popover>
             
              </el-tooltip> -->
                </template>
          </el-table-column>

             <!-- <el-table-column width="120px;" label="Thời gian">
             <template slot-scope="scope">
                    <span>{{ scope.row.TimeStart }} - </span>
                     <span>{{ scope.row.TimeEnd }}</span>
                </template>
          </el-table-column> -->
         <!-- <el-table-column  prop="TimeStart" label="Bắt đầu"></el-table-column>
          <el-table-column  prop="TimeEnd" label="Kết thúc"></el-table-column> -->
          <el-table-column  prop="Product" label="Sản phẩm"></el-table-column>
         
      
           <el-table-column  prop="Note" width="100px;" label="Chi tiết">
             <template slot-scope="scope">
            
                 

                  <el-popover
                    placement="top"
                    width="360"
                   >
                    <p> {{ scope.row.Note}}</p>
                  
                    <el-button type="success" slot="reference">Xem</el-button>
                  </el-popover>
             
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
<!-- 
      <el-dialog title="Đăng ký lịch RolePlay" :visible.sync="dialogFormCreate">
        <create></create>
        
  <span slot="footer" class="dialog-footer">
   
  </span>
</el-dialog> -->

 <el-dialog title="Xem báo cáo" :visible.sync="dialogFormViewReport">
        <viewReport :row="rowData"></viewReport> 
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>


 <el-dialog title="Xem video Role" :visible.sync="dialogFormView">
        <viewVideo :row="rowData"  ></viewVideo>
  
</el-dialog>



    </div>
  </div>
</template>

<script>
import ViewReport from "@/views/roleplay/group/component/viewReport";
import ViewVideo from "@/views/roleplay/group/component/viewVideo";

import { parseTime } from "@/utils/index";
import { GetRoleIDGroup,GetTeacherLst,GetAcceptLst } from "@/api/roleplay";
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
    ViewReport,ViewVideo
  },
  data() {
    return {
      tableData: [],
      month:'',
      visible: false,
      search: '',
       options: [{
        }],
        otc: 0,
        token: Cookies.get('token'),
        ReportID:0,
        dialogFormCreate: false,
        dialogFormView: false,
        dialogFormViewReport: false,
       
       
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
      teacherLst:[],
      IDService: 0,
      service: [],
      acceptLst:[],
      reference: 'reference',
      obj:'',
       groups: '',
       serviceCode: Cookies.get('idGroup'),
    };
  },
  methods: {

      ExportExcel(){
                var d = new Date();
                var n = d.getMonth() + 1;
              const tHeader = ['Trạng thái','TDV','Nhóm','Người kiểm tra','Giám sát','Ngày','Thời gian','Sản phẩm', 'Ghi chú' ]
              const filterHeader = ['Status','NameEmployee','IDGroup','NameTeacher','NameAccept','Date','TimeStart','Product', 'Note']
              GetRoleIDGroup({
                token: Cookies.get('token'),
                  dateStart: this.dateStart,
                dateEnd: this.dateEnd,
                groups: this.groups,
                  pageSize: this.pageSize,
                page: this.currentPage
              }).then(response => {
                  var data = response.Data
                  import('@/vendor/Export2Excel').then(excel => {
                excel.export_json_to_excel({
                  header: tHeader, 
                  data: this.formatJson(filterHeader,data), 
                  filename: 'RolePlay tháng' + n, 
                  autoWidth: true, 
                  bookType: 'xlsx' 
                })
              })
                });
            },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
                 if(j==='Status'){
                  return this.$options.filters.roleStatusText(v[j])
                } 
                // else if(j === 'Deadline'){
                //   return this.$options.filters.toDate(v[j])
                // }
                 else {
                  return v[j] 
                }
              }))
            },
//      tabletoExcel(table, name) {
//     var uri = 'data:application/vnd.ms-excel;base64,'
//           , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
//           , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
//           , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
//         if (!table.nodeType) table = document.getElementById(table);
//         var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
//         window.location.href = uri + base64(format(template, ctx));

// },
  
      fetchGroup(){
       var req = {
        //idEmployee: Cookies.get('idEmployee'),
        token: Cookies.get('token')
      };
       GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },
    addUser(row){
      this.visible = true
        this.rowData = row
        //this.fetchTeacher()
        //console.log(row.EmployeeID)

         GetTeacherLst({ idEmployee: row.EmployeeStudentID }).then(response => {
        this.teacherLst = response.Data;
      });
        //this.dialogFormAddTeacher = true
    },

     addAccept(row){
        this.rowData = row
       
        this.dialogFormAddAccept = true
    },
    viewReport(row){
        this.rowData = row
        this.dialogFormViewReport = true
    },
    fetchTeacher(){
       var req = {
        idEmployee: this.rowData.EmployeeID,
        token: Cookies.get('token'),
        
      };
       GetTeacherLst(req).then(response => {
        this.teacherLst = res.Data;
      });
    },
    addTimeOK(){
       this.dialogFormViewReport = false
       this.fetchData()
    },
    view(row){
         this.rowData = row
        this.dialogFormView = true
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
     changeTableHeight(){
      
    
      this.tableHeight=document.body.offsetHeight-document.getElementById('couponTabHeaderBtn').clientHeight
     
    },
    Search(){
      this.fetchData()
    },
  
    fetchData() {
        this.month=Date.parse(this.month).toString('yyyy-MM-dd')
      this.loadingTableData = true
      var req = {
       
        token: Cookies.get('token'),
         month: this.month,
          dateStart: this.dateStart,
          search: this.search,
        dateEnd: this.dateEnd,
        groups: this.groups,
          pageSize: this.pageSize,
        page: this.currentPage
      };
       GetRoleIDGroup(req).then(response => {
         if(response.ResCode == 0){
           this.loadingTableData = false
           this.tableData = response.Data;
        //    this.currentPage= response.PageNumber;
        //    this.pageSize = response.RowspPage
        //    this.total = (response.PageNumber)*(response.RowspPage)
          
         }
      });
    },
   
    
     addOK() {
      
       this.fetchData()
       //this.addUser()
    },
     addAcceptOK() {
       this.dialogFormAddAccept = false
       this.fetchData()
    },
    startReport(row){
      this.ReportID = row.ReportID
      this.dialogFormStart = true
      
    }
  },
  watch: {
  
    month: function() {
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
      this.month = new Date()
    this.fetchGroup();
    this.fetchData();
    this.otc = this.otcList[0].value;

     GetAcceptLst().then(response => {
        this.acceptLst = response.Data;
        //console.log(this.acceptLst)
      });
  },
  mounted(){
    window.addEventListener('resize', this.changeTableHeight);
   
    this.changeTableHeight();
   
  }
  ,
   destroyed(){
    document.removeEventListener("resize", this.changeTableHeight);
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


