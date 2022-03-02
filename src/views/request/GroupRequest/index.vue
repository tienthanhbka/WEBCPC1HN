<template>
<div class="orderhcm-container">
    <div class="orderhcm-header">
        <!-- <el-button class="inline-block" type="primary" :loading="listLoading" @click="fetchData()">Cập nhật</el-button> -->
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
         <div class=" floatright-mb">
            <el-button type="success" @click="exportExcel"> <i class="fas fa-file-excel"></i> Export</el-button>
        </div>
        <div class="inline-block date">
            <span class="demonstration">Từ</span>
            <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="Ngày bắt đầu"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="inline-block date">
            <span class="demonstration">Đến</span>
            <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class=" floatright-pc">
          <el-button type="success" @click="exportExcel"> <i class="fas fa-file-excel"></i> Export</el-button>
            <!-- <el-button type="success" @click="tabletoExcel('tbldata','Báo cáo công việc')"> <i class="fas fa-file-excel"></i> Export</el-button> -->
        </div>
    </div>
      <div v-if="filter != ''" class="inline-block" style=" height:40px; display: flex;align-items: center; color: red; margin-left: 20px;">
            <span style="justify-content: center;" >Tổng điểm KPI: &nbsp; &nbsp;  </span>
           
            <span>{{ SUMKPI }}</span>
        </div>
    <editModal :row="rowSelect"  :Name="Name" :groups="groups" :Action="Action" @click-something="addOK" ></editModal>
     <confirm :row="row" @click-something='ConfirmOK' ></confirm>
    <div class="">
        <el-table v-loading="listLoading" 
        id="tbldata"
        :data="RequestList" 
         @expand-change="expandRow"
        element-loading-text="Loading"
        @filter-change="filterStatus"
        :row-class-name="tableRowClassName"
         border
        highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <div class="col-mb">
                         
                       <div style="margin-top: 10px;color: red; margin-bottom:20px; font-size: 20px;" v-if="props.row.filePath != null"> <a :href="'https://icpc1hn.work/api/'+'Request/OrderEmployee/'+props.row.filePath+'?token='+token"><i class="el-icon-download">Tải file đính kèm</i></a></div>
                        <div class="display-mobile"><b> Công việc: </b> {{ props.row.Content }} </div>
                          <p><b>Người giao:</b> {{ props.row.NameManager }}</p>
                        <p><b> Giao: </b> {{ props.row.Time }} </p>
                         <p><b>Khối lượng đạt:</b> {{props.row.Rate}}</p>
                    <p><b>KPI cơ sở:</b> {{ props.row.KPIBase }} </p>
                   
                  
                    <p><b>Ghi chú:</b> {{ props.row.Note }}</p>
                    <div ><b>Các loại lỗi:</b> {{ props.row.Error }} </div>
                    <div class="display-mobile">
                      <p><b>Hoàn thành:</b> {{ props.row.TimeFinish }} </p>
                      <p><b>Duyệt:</b> {{ props.row.KPITime }} </p>
                      <p><b>Hạn:</b> {{ props.row.Deadline }} </p>
                      <!-- <div class="col-mb">
                        <el-table
                       
                        
    :data="props.row.lines"
    v-model="obj"
    border
    style="width: 100%">
    <el-table-column
      prop="Number"
      label="Số lượng"
     >
    </el-table-column>
    <el-table-column
      prop="LevelError"
      label="Mức lỗi"
      align="center"
      >
    </el-table-column>
  </el-table>
                    </div> -->
                    <div style="clear: both;"></div>
                      <div><b>Điểm trừ:</b> {{ props.row.SubKPI }} </div>
                    </div>
                    <div>
                    <p style="color: red;">KPI: {{ props.row.KPI }}</p>
                    <!-- <p><el-button type="warning" content="Chấm KPI"  @click="openModal(props.$index,props.row)" >Chấm KPI</el-button> </p>  -->
                    <p><el-button type="warning" content="Chấm KPI"  @click="openModalDialog(props.$index,props.row)" >Chấm KPI</el-button> </p> 
                    </div>

    <el-dialog   title="Chấm điểm hoàn thành công việc" :visible.sync="dialogFormVisible">
      <confirmDialog :row="row" :error="error" @click-something="confirmDialogOK"></confirmDialog>
    </el-dialog>
                    </div>
                     <div class="display-pc col-mb" >
                        <!-- <el-table
    :data="props.row.lines"
     
     
    v-model="obj"
    border
    style="width: 100%">
    <el-table-column
      prop="Number"
      label="Số lượng"
      width="180">
    </el-table-column>
    <el-table-column
      prop="LevelError"
      label="Mức lỗi"
      align="center"
      width="180">
    </el-table-column>
  </el-table> -->
                    </div>
                    
                  </el-row>
                  
                </template>
                </el-table-column>
                 <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1)*page_row}}</template>
        </el-table-column>
                  <el-table-column align="center" width="75px" label="">
           <template slot-scope="scope">
        <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditAdminOrderSend(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
      
</template>
        </el-table-column>
            <el-table-column label="Nhân viên" align="center" width="160"
            :filters="filterEmployee" >
                <template slot-scope="scope">
                    <span>{{ scope.row.NameEmployee}}</span>
                </template>
            </el-table-column>
             <el-table-column label="Trạng thái" align="center" width="140"
             :filters="[{text: 'Hoàn thành', value: '10'},{text: 'Đã xong', value: '6'},{text: 'Đang xử lý', value:'3'},{text: 'Đã dừng', value:'2'},{text: 'Mới tạo', value: '1'},{text: 'Đã hủy', value: '0'}]" >
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | orderStatusColor ">
                        {{ scope.row.Status| orderStatusText }}
                    </el-tag>
                </template>
            </el-table-column>
             <el-table-column label="Hoàn thành" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeFinish | toTime }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Tg Duyệt" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.KPITime | toTime }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Nhóm việc" align="center" min-width="100" 
             :filters="filterService" >
                <template slot-scope="scope">
                    <span>{{ scope.row.Service }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Loại việc" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Công việc" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Content }}</span>
                </template>
            </el-table-column>
              <el-table-column label="KPIcs" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.KPIBase | setSize }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Khối lượng" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Rate | toCommas }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Chất lượng" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Quality }}</span>
                </template>
            </el-table-column>
             <el-table-column label="KPI bị trừ" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.SubKPI | setSize }}</span>
                </template>
            </el-table-column>
            
             <el-table-column label="KPI đạt" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.KPI | setSize }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Hạn" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Deadline | toDate}}</span>
                </template>
            </el-table-column>
        </el-table>
     <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="page_row"
        @current-change="fetchData"
       
      ></el-pagination>
  </div>
    </div>
</div>
    
</template>

<script>
    
    import { getRequestGroup,ErrorDetail } from '@/api/getRequest'
    import Cookies from 'js-cookie'
    import { getEmployee } from "@/api/order";
    import { GetServiceFilter } from "@/api/order";
     import Confirm from '@/views/request/component/confirm'
       import ConfirmDialog from '@/views/request/component/confirmDialog'
      import { getStartMonth, getEndMonth} from '@/api/index'
      import { GetListGroupAdminByToken } from "@/api/groups";
    import EditModal from "@/views/order/component/editOrderEmployeeGroup";
    
    export default {
      
   filters:{
        statusTextFilter(status) {
      return statusMap[status];
    },
     toTime: function (value) {
    if (value != null) return value.substring(0,16)
    else
    return ''
  },
   setSize: function (value) {
    if (!value) return ''
    var a = parseFloat(value) 
    return a.toFixed(1)
  },
   toCommas: function(value) {
       if(value != null){
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }
    
  }
   },
    components:{
     Confirm,EditModal,ConfirmDialog
   },
  props: {
   
   
    limit: {
      type: Number,
      default: 20,
    },
   
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
        data() {
            return {
                dialogFormVisible: false,
                TextSearch:'',
                startDate:'',
                endDate :'',
                display: [],
                currentPage: 1,
                pageSize: 10,
                a: 0,
                page_row: 10,
                total: 0,
                 SUMKPI: '',
                 Name: '',
                 Action: '',
                 token: Cookies.get('token'),
                options: '',
                rowSelect: '',
                row: '',
                obj: '',
                error: [],
                filterEmployee: [],
                 filterService: [],
                 groupList: [],
                 status: '',
                 filter: '',
                  filterSer: '',
                listLoading: false,
                RequestList: [
                ],
                 groups: '',
            };
        },
        methods: {
          exportExcel(){
              const tHeader = ['Hạn','Tên nhân viên','Tiêu đề','Nội dung','KPI cơ sở','Số lượng','KPI bị trừ','Tổng điểm KPI','Mức lỗi','Lỗi phạm','Bắt đầu','Hoàn thành','Thời hạn','Quản lý','Trạng thái']
              const filterHeader = ['Deadline','NameEmployee','Title','Content','KPIBase','Rate','SubKPI','KPI','LevelError','Error','Time','TimeFinish','Deadline','NameManager','Status']
              getRequestGroup({
                startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    admin: this.groups,
                    token: Cookies.get('token'),
                    page: 1,
                    status: this.status,
                    page_row: 10000,
                    filter: this.filter,
              }).then(response => {

                     if (this.filter != ''){
                      var data = response.Data[0]
                    }else{
                       var data = response.Data
                    }
                  //var data = response.Data[0]
                  import('@/vendor/Export2Excel').then(excel => {
                excel.export_json_to_excel({
                  header: tHeader, 
                  data: this.formatJson(filterHeader,data), 
                  filename: 'Báo cáo', 
                  autoWidth: true, 
                  bookType: 'xlsx' 
                })
              })
                });
            },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
                 if(j==='Status'){
                  return this.$options.filters.orderStatusText(v[j])
                   //return 'ok'
                } else if(j === 'Deadline'){
                  return this.$options.filters.toDate(v[j])
                }
                 else if(j === 'KPI' | j==='SubKPI' | j==='Rate'){
                  return parseFloat(v[j])
                }
                 else {
                  return v[j]
                }
              }))
            },

             tabletoExcel(table, name) {
    var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        window.location.href = uri + base64(format(template, ctx));

},

          ConfirmOK(kpi){
            //alert(kpi)
            this.row.KPI = kpi
          },
           confirmDialogOK(kpi){
             this.dialogFormVisible=false
           
            this.fetchData();
          },
         
           openModalEditAdminOrderSend(row){
               this.rowSelect = row;
                console.log(row);
                VoerroModal.show('edit-request-modal-group');
            },
           expandRow(row, index){
                  row.display =  false
                  //console.log(row.display)
                 if (row.lines == null) {     
                    var id = row.RowID;
                    ErrorDetail({FK_ID : id ,token: Cookies.get('token')}).then(res => {
                    if (typeof res.Data[0] !== 'undefined') {
                      row.lines = res.Data;

                      this.error = res.Data
                      row.display= true
                      console.log(this.error)
                      //row.lines = res.Data;
                     // this.a++
                    }
                    //this.a++
                    });
                }
            },
           fetchGroup(){
       var req = {
        token: Cookies.get('token'),
      };
       GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;
        this.fetchEmployee()
      });
    },
    addOK(){
      this.fetchData();
    },
            openModal(index,row){
                    this.row=row;
                    this.row.KPI= (row.KPIBase)*(row.Rate)
                VoerroModal.show('confirm-modal');
               
            },
             openModalDialog(index,row){
                this.row=row;
                    this.row.KPI= (row.KPIBase)*(row.Rate)
                    this.dialogFormVisible = true
                   
               
            },
            filterStatus(filters){
                 var sta = filters[Object.keys(filters)[0]]
                var parsedobj = JSON.parse(JSON.stringify(sta))
                 var str = new String(sta[0]);
                //console.log(str)
                var tontai = str.indexOf('0');
                //console.log(tontai)
                // if(str.length > 5){
                //   this.filter = parsedobj.toString();
                // }
                // else{
                //    this.status = parsedobj.toString();
                // }

                if(tontai == 0){
                  this.filter = parsedobj.toString();
                }
                else if(parseInt(str) < 11){
                  this.status = parsedobj.toString();
                }else if(parseInt(str) > 10){
                  this.filterSer = parsedobj.toString();
                  //console.log(this.filterSer)
                }
               
                 this.fetchData();
            },
             tableRowClassName({row, rowIndex}) {
               var value = new Date()
                //alert('ok')
               var someDate = new Date();
              var numberOfDaysToAdd = 3;
              someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
      //console.log(row.Deadline)
      //console.log(row.Status)
      //console.log(value)
      //console.log(someDate)

      var a = new Date(row.Deadline)
     
        if (a < value && row.Status < 6) {
          //alert('ok')
          return 'warning-row';
          //alert('ok')
        }
        else if( a < someDate   && row.Status < 6){
          //alert('ok')
          return 'success-row';
        }
      
        return '';
      },
             fetchEmployee() {
      var req = {
        admin: this.groups,
        idEmployee: Cookies.get('idEmployee'),
      };
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
         var lst = [];
          response.Data.forEach(element => {
            lst.push({ text: element.nameEmployee, value: element.idEmployee });
          });
          this.filterEmployee = lst;
        this.listLoading = false; 
      });
      this.fetchData();
    },
     fetchService() {
      var req = {
        idGroup: this.groups,
      
      };
      this.listLoading = true;
      GetServiceFilter(req).then(response => {
        //this.options = response.Data;
        //console.log(response.Data)
         var lst = [];
          response.Data.forEach(element => {
            lst.push({ text: element.Service, value: element.IDService });
          });
          this.filterService = lst;
        this.listLoading = false; 
      });
      this.fetchData();
    },
            fetchData() {
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    admin: this.groups,
                    token: Cookies.get('token'),
                    page: this.currentPage,
                    page_row: this.page_row,
                    status: this.status,
                    filter: this.filter,
                     filterSer: this.filterSer,
                }
                this.listLoading = true
                //console.log(req);
                getRequestGroup(req).then(response => {
                    if (this.filter != ''){
                       this.RequestList = response.Data[0]
                    this.SUMKPI = response.Data[1]
                    }else{
                       this.RequestList = response.Data
                    }
                   
                    this.total= response.TotalPage*response.RowspPage
                    this.listLoading = false
                    this.currentPage = response.PageNumber
                    this.page_row= response.RowspPage
                });
            },
        },
        computed: {
  },
        created() {
            this.startDate = getStartMonth();
            this.endDate = getEndMonth();
            this.currentPage = 1;
            // this.fetchEmployee();
            this.fetchGroup();
            this.fetchService()
        },
         watch: {
    startDate: function(){
       this.startDate = Date.parse(this.startDate).toString('yyyy-MM-dd')
      this.fetchData();
    },
     endDate: function(){
       this.endDate = Date.parse(this.endDate).toString('yyyy-MM-dd')
      this.fetchData();
    },
     groups: function(){
      this.status='';
      this.filter='';
      this.fetchService()
      this.fetchEmployee();
    },
     currentPage: function() {
      
        this.fetchData();
      
    },
    page_row: function() {
      
        this.fetchData();
      
    }
  },
    };
</script>

<style lang="scss" scoped>
    $bg: rgba(49, 49, 49, 0.05);
    .orderhcm-container {
        padding: 20px;
        background-color: $bg;
        min-height: 100vh;

        .inline-block {
        display: inline-block;
        margin-bottom: 5px;
        }

        .table-pagination {
            margin-top: 10px
        }     
    }
    .floatright-mb{
        display: none;
      }

      .floatright-pc{
        display: block;
      }
       .col-mb{
        width: 50%;
        float: left;
      }
      .display-mobile{
        display: none;
      }

  //      .el-table .success-row {
  //   background: #A9BCF5;
    
  // }

  // .el-table .warning-row {
  //   background: red;
    
  // }

    @media only screen and (max-width: 600px) {
      .date {
        width: 50%;
        float: left;
      }
      .display-pc{
        display: none
      }
      .floatright-mb{
        display: block;
        float: right;
        
      }
      .floatright-pc{
        display: none;
        
      }
      .display-mobile{
        display: block;
      }
     
}  

</style>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #A9BCF5;
    
  }
</style>