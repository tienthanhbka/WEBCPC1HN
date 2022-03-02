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
    <!-- <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Thêm định nghĩa</el-button>
    </div> -->
    <!-- <div class="inline-block floatright" style="margin-left: 5px;">
            <el-button type="warning" @click="ExportExcel"> <i class="fas fa-file-excel"></i> Export</el-button>
        </div> -->

       <!-- <div class="inline-block floatright" style="margin-left: 5px;">
            <el-button type="danger" @click="GetService"> <i class="fas fa-plus-square"></i> Lấy công việc có sẵn</el-button>
        </div> -->
    <div>
      <el-table
        :data="tableData"
        @expand-change="expandRow"
        v-loading="loadingTableData"
        border=""
        show-header
      >
     <el-table-column type="expand">
        <template slot-scope="props">
        <el-row>  
          
  <el-table
    :data="props.row.lines"
    v-model="obj"
    border
    style="width: 100%">
     <!-- <el-table-column
      width="100"  >
      <template slot-scope="props">
       <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditAction(props.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        <el-tooltip content="Xóa" placement="top"><el-button  @click="openModalDeleteAction(props.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip>
        </template> 
    </el-table-column> -->
     <!-- <el-table-column
      prop="ParameterID"
      label="Mã"
      align="center"
      width="110">
    </el-table-column> -->
    <el-table-column
      prop="Parameter"
      label="Câu hỏi"
      align="center"
      >
    </el-table-column>
    
     <el-table-column
      prop="Type"
      label="Loại"
      align="center"
      >
        <template slot-scope="props" > 
            <el-tag
            :type="props.row.Type | TypeQuestionStatusColor">
              {{ props.row.Type | TypeQuestionStatusText}}
            </el-tag>
             </template>
    </el-table-column>
       <el-table-column
      prop="OptionAnswer"
      label="Phương án"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="OptionAnswer"
      label="Bắt buộc"
      align="center"
      >

      <template slot-scope="props" > 
            <el-tag
            :type="props.Require | requireColorFilter">
              {{ props.Require | requireTextFilter}}
            </el-tag>
             </template>
    </el-table-column>
  </el-table>
        </el-row>
          <template>
  
</template>
        </template>
      </el-table-column>
        <el-table-column align="center"  label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }} 
            
                 <el-tooltip content="Xem báo cáo" placement="top">
               <router-link :to="'/hanh-chinh/bao-cao/xem-bao-cao/' + scope.row.RowID">
              <i class="far fa-eye"></i>
      </router-link></el-tooltip>
           
             </template>
           
        </el-table-column>
         <el-table-column prop="Title"  label="Tên báo cáo"></el-table-column>
         <!-- <el-table-column prop="nameEmployee"  label="Người tạo"></el-table-column> -->
        
          <!-- <el-table-column prop="ReportType" label="Loại báo cáo"></el-table-column>
          <template slot-scope="scope" > 
            <el-tag
            :type="scope.row.Public | publicColorFilter">
              {{ scope.row.Public | publicTextFilter}}
            </el-tag>
             </template>
        </el-table-column> -->
        <!-- <el-table-column prop="GroupID" width="100" label="Nhóm"></el-table-column>
         <el-table-column width="100" prop="KPI" label="KPI"></el-table-column> -->
          <el-table-column  label="Thời gian tạo">
             <template slot-scope="scope">
                    <span>{{ scope.row.TimeCreate | toDate}}</span>
                </template>
          </el-table-column>
            <el-table-column align="center" width="100" label="Trạng thái"> 
          <template slot-scope="scope" > 
            <el-tag
            :type="scope.row.Status | ReportStatusColor">
              {{ scope.row.Status | ReportStatusText}}
            </el-tag>
             </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
         @current-change="fetchData"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
     

  <!-- <el-dialog title="Xem báo cáo" :visible.sync="dialogFormView">
        <viewReport></viewReport>
        
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog> -->
    </div>
  </div>
</template>

<script>
//import CreateDefine from "@/views/report/define/component/createDefine";
//import ViewReport from "@/views/report/value/component/viewReport";

import { parseTime } from "@/utils/index";
import { GetReportHeaderValue,GetReportValue } from "@/api/report";
import Cookies from 'js-cookie'
import { getStartDate, getEndDate} from '@/api/index'
import { GetGroupEmployee } from "@/api/groups";

export default {
     filters:{
        statusTextFilter(status) {
      return statusMap[status];
    },
     publicTextFilter(Public) {
       if(Public == 1)
      return 'Dịch vụ';
      else
      return 'Nội bộ'
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
    
  },
  data() {
    return {
      tableData: [],
       options: [{
        }],
        dialogFormCreate: false,
        dialogFormView: false,
        groupList: [{}],
        codeWork: '',
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
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
    create(){
        this.dialogFormCreate = true
    },
    openModalView(){
      this.dialogFormView = true;
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
        idGroup: this.groups,
        token: Cookies.get('token'),
        pageSize: this.pageSize,
        page: this.currentPage
      };
       GetReportHeaderValue(req).then(response => {
         if(response.ResCode == 0){
           this.tableData = response.Data;
           this.currentPage= response.PageNumber;
           this.pageSize = response.RowspPage
           this.total = (response.PageNumber)*(response.RowspPage)
         }
        
        
      });
    },
    expandRow(row){
       var req = {
        RowID: row.RowID,
        token: Cookies.get('token')
      };
       GetReportValue(req).then(response => {
        row.lines = response.Data;
        this.obj = response.Data;
        
      });
    },
     fetchService() {
      var req = {
          idGroup: this.groups,
      };
    
      getServicePublic(req).then(res => {
        
        this.loadingTableData = false;
        this.service = JSON.parse(JSON.stringify(res.Data))
        //console.log(res.Data);
      });
    },
     createOK(form) {
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
      
      
    }
  },
  created() {
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


