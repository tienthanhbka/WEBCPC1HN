<template>
<div class="orderhcm-container">
    <div class="orderhcm-header">
        <div class="inline-block">
            <span class="demonstration">Từ</span>
            <el-date-picker
            v-model="startDate"
            type="date"
            
            placeholder="Ngày bắt đầu"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="inline-block">
            <span class="demonstration">Đến</span>
            <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <!-- <div class="inline-block">
            <el-input placeholder="Search" v-model="TextSearch" class="input-with-select">
                <el-select slot="prepend" placeholder="Select">
                <el-option label="Tất cả" value="1"></el-option>
                <el-option label="Tên nhân viên" value="2"></el-option>
                <el-option label="Đơn vị" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="fetchData()"></el-button>
            </el-input>
        </div> -->
         <div class="inline-block" style=" height:40px; display: flex;align-items: center; color: red; margin-left: 20px;">
            <span style="justify-content: center;" >Tổng điểm KPI: </span>
           
            <span>{{ SUMKPI }}</span>
        </div>
        <div class="inline-block" style="float:right">
            <el-button type="success" @click="ExportExcel"> <i class="fas fa-file-excel"></i> Export</el-button>
             <el-button type="success" @click="ExportExcelTotal"> <i class="fas fa-file-excel"></i>Tổng hợp</el-button>
        </div>
    </div>
     <deleteModal :row="rowSelect"   @click-something="deleteOK" ></deleteModal>
      <editModal :row="rowSelect"  @click-something="editOK" ></editModal>
    <complete :row="rowData" @click-something="OKComplete"></complete>
     <confirm :row="row" @click-something='ConfirmOK' ></confirm>

     <el-dialog  title="Chấm điểm hoàn thành công việc" :visible.sync="dialogFormVisible">
      <confirmDialog :row="row" :error="error" @click-something="conOK"></confirmDialog>
    </el-dialog>
    <div class="orderhcm-content">
        <el-table v-loading="listLoading"
         :data="RequestList"
          @expand-change="expandRow"
         @filter-change="filterStatus"
          element-loading-text="Loading"
         border
        highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="props">
                   <el-row>
                     <el-col span="6">
                    <p>Người giao việc: {{ props.row.NameManager }}</p>
                    <p>Ghi chú: {{ props.row.Note }}</p>
                    </el-col>
                   
                  </el-row>
                </template>
                </el-table-column>
            <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*page_row }}</template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="">
           <template slot-scope="scope">
        <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditAdminOrderSend(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
         <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteAdminOrderSend(scope.row)" type="text" > <i style="color: red;" class="fas fa-trash-alt"></i></el-button></el-tooltip>
        
</template>
        </el-table-column>
        
         <el-table-column label="Trạng thái" align="center" width="130"
         :filters="[{text: 'Hoàn thành', value: '10'},{text: 'Đã xong', value: '6'}, {text: 'Đang xử lý', value: '3'},{text: 'Đã dừng', value: '2'}, {text: 'Mới tạo', value: '1'},{text: 'Đã hủy', value: '0'}]"  >
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | orderStatusColor ">
                        {{ scope.row.Status| orderStatusText }}
                    </el-tag>
                    <el-button
                    size="mini"
                    type="success"
                   
                    @click="Complete(scope.$index, scope.row)"><i class="el-icon-finished">Báo cáo</i></el-button>
                </template>
                
            </el-table-column>
              <el-table-column label="Nhóm việc" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Service }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Loại việc" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Title }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Nội dung" align="center" min-width="100">
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
                    <span>{{ scope.row.Rate | toCommas}}</span>
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
            <el-table-column label="Giao/Nhận" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.Time | toDate}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hạn chót" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.Deadline | toDate}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hoàn thành" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeFinish | toDate}}</span>
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
    
    import { getRequest,getRequestEx,ErrorDetail } from '@/api/getRequest'
    import Cookies from 'js-cookie'
    import Complete from '@/views/request/component/complete'
    import { getEmployee } from "@/api/order";
    import Confirm from '@/views/request/component/confirm'
      import ConfirmDialog from '@/views/request/component/confirmDialog'
    import { getStartMonth, getEndMonth} from '@/api/index'
    import EditModal from "@/views/order/component/editOrderEmployee";
     import DeleteModal from "@/views/order/component/deleteOrderEmployee";

    export default {
  filters:{
        statusTextFilter(status) {
      return statusMap[status];
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
     Complete,Confirm,EditModal,DeleteModal,ConfirmDialog
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
                error: [],
                startDate:'',
                endDate :'',
                currentPage: 0,
                page_row: 10,
                total: 0,
                rowData: [],
                row:[],
                SUMKPI: '',
                rowSelect: '',
                obj: '',
                listLoading: false,
                RequestList: [
                ]
            };
        },
        methods: {
            ExportExcel(){
              const tHeader = ['Số điện thoại','Tên Nhân viên','Tiêu đề','Nội dung','KPI cơ sở','Số lượng','KPI bị trừ','Tổng điểm KPI','Mức lỗi','Lỗi phạm','Bắt đầu','Hoàn thành','Thời hạn','Quản lý','Trạng thái']
              const filterHeader = ['IDEmployee','NameEmployee','Title','Content','KPIBase','Rate','SubKPI','KPI','LevelError','Error','Time','TimeFinish','Deadline','NameManager','Status']
              getRequest({
                startDate: this.startDate,
                endDate: this.endDate,
                id: Cookies.get('idEmployee'),
                token: Cookies.get('token'),
                page: 1,
                page_row: 1000
              }).then(response => {
                  var data = response.Data[0]
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

            ExportExcelTotal(){
              const tHeader = ['Số điện thoại','Tên Nhân viên','Tiêu đề','Nội dung','KPI cơ sở','Số lượng','KPI bị trừ','Tổng điểm KPI','Mức lỗi','Lỗi phạm','Bắt đầu','Hoàn thành','Thời hạn','Quản lý','Trạng thái']
              const filterHeader = ['IDEmployee','NameEmployee','Title','Content','KPIBase','Rate','SubKPI','KPI','LevelError','Error','Time','TimeFinish','Deadline','NameManager','Status']
              getRequestEx({
                startDate: this.startDate,
                endDate: this.endDate,
                id: Cookies.get('idEmployee'),
                token: Cookies.get('token'),
                page: 1,
                page_row: 1000
              }).then(response => {
                  var data = response.Data[0]
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
            fetchData() {
                
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    token: Cookies.get('token'),
                    page: this.currentPage,
                    page_row: this.page_row
                    
                }
                this.listLoading = true
                //console.log(req);
                getRequest(req).then(response => {
                    //console.log(req);
                    //console.log(response);
                    this.RequestList = response.Data[0]
                    this.SUMKPI = response.Data[1]
                    this.total= response.TotalPage*response.RowspPage
                    this.listLoading = false
                    this.currentPage = response.PageNumber
                    this.page_row= response.RowspPage
                });
            },
            conOK(){
               this.dialogFormVisible = false;
               this.fetchData();
            },
            expandRow(row, expandedRows){
                 if (row.lines == null) {     
                    var id = row.RowID;
                    ErrorDetail({FK_ID : id ,token: Cookies.get('token')}).then(res => {
                    row.lines = res.Data;
                    this.obj= res.Data;
                    this.error = res.Data;
                    
                    //console.log(res.Data);
                    });
                   
                }
            },
            filterStatus(filters){
                //var lenght = filters[Object.keys(filters)[0]].lenght
                //console.log(lenght)
                var sta = filters[Object.keys(filters)[0]]

                var parsedobj = JSON.parse(JSON.stringify(sta))
                var status = parsedobj.toString();
                //console.log(parsedobj)
                //console.log(parsedobj.length)
                  var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    token: Cookies.get('token'),
                    page: this.currentPage,
                    page_row: this.page_row,
                    status: status   
                }
                this.listLoading = true
                //console.log(req);
                getRequest(req).then(response => {
                    //console.log(req);
                    //console.log(response);
                    this.RequestList = response.Data[0];
                    this.SUMKPI = response.Data[1];
                    this.total= response.TotalPage*response.RowspPage
                    this.listLoading = false
                    this.currentPage = response.PageNumber
                    this.page_row= response.RowspPage
                });
            },
           
           
            openModalEditAdminOrderSend(row){
              if(row.Status > 0){
                  this.rowSelect = row;
                //console.log(row);
                VoerroModal.show('edit-request-modal-employee');
              }
              else{
                this.$notify({
                  title: 'Lỗi',
                  message: 'Không thể thao tác với công việc đã hủy',
                  type: 'warning',
                  position: 'top-left'
                })
              }
             

            },
            openModalDeleteAdminOrderSend(row){
              this.rowSelect = row;
                //console.log(row);
                VoerroModal.show('delete-request-modal-employee');
            },
           
            Complete(index,row){
               this.rowData= row;
               //console.log(this.rowData);
                    
                    var id = row.RowID;
                    ErrorDetail({FK_ID : id ,token: Cookies.get('token')}).then(res => {
                    row.lines = res.Data;
                    this.obj= res.Data;
                    this.error = res.Data;
                    
                    //console.log(res.Data);
                    });
                   
                
               if(this.rowData.Status < 10 && this.rowData.Status > 0){
                  VoerroModal.show('complete-modal');
               } 
            },
            OKComplete(row){

              //alert('ok')
              this.row=row
                this.row.KPI= (row.KPIBase)*(row.Rate)
                 this.dialogFormVisible = true
              //VoerroModal.show('confirm-modal');
            },
            ConfirmOK(){
              this.fetchData();
            },
             ConOK(){
              this.fetchData();
            },
            editOK(){
              this.fetchData();
            },
            deleteOK(){
              this.fetchData();
            },

            
        },
        computed: {
  
  },
        created() {
            this.startDate = getStartMonth();
            this.endDate = getEndMonth();

            this.currentPage = 1;
            this.fetchData();
            //this.fetchEmployee();
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
     currentPage: function(){
      this.fetchData();
    },
     page_row: function(){
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

    @media only screen and (max-width: 600px) {
       .inline-block {
        display: block;
        margin-bottom: 5px;
        width: 100%;
        }

        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100%;
        }
    }
</style>