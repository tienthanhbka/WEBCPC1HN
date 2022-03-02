<template>
  <div class="my-mission-container">
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
      <div class="inline-block">
        <span></span>
        <el-date-picker style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <span>đến</span>
        <el-date-picker style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <!-- <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="openModal"
      >Tạo yêu cầu</el-button> -->
    </div>
    <div>
      <el-table
        :data="tableData"
        @expand-change="handleExpandChange"
        @filter-change="filterStatus"
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
      
        </template> 
    </el-table-column> -->
     <el-table-column
      prop="IDGroup"
      label="Nhóm"
      align="center"
      width="110">
    </el-table-column>
    <el-table-column
      prop="Status"
      label="Trạng thái"
      align="center"
      width="110"
      >
       <template slot-scope="scope">
            <el-tag
              :type="scope.row.Status | orderStatusColor"
            >{{ scope.row.Status | orderStatusText }}</el-tag>
          </template>
    </el-table-column>
     <!-- <el-table-column
      prop="TimeCreate"
      label="Bắt đầu"
      align="center"
      width="80">
      <template slot-scope="{row}">
        {{Number(row['KPI']) }}
      </template>
    </el-table-column> -->
    <el-table-column
      prop="TimeCreate"
      label="Gửi"
       width="120"
       align="center"
      >
       <template slot-scope="scope">
            {{ scope.row.TimeCreate | toDate }}
          </template>
    </el-table-column>
    <el-table-column
      prop="Deadline"
      label="Hạn"
       width="120"
       align="center"
      >
       <template slot-scope="scope">
            {{ scope.row.Deadline | toDate }}
          </template>
    </el-table-column>
     <el-table-column
      prop="Note"
      label="Ghi chú"
      align="center"
     >
    </el-table-column>
   
  </el-table>
  <!-- <el-tooltip content="Tạo loại công việc"  placement="top"><el-button @click="openModalAction" type="text" > <i style="color: red" class="fas fa-plus"></i></el-button></el-tooltip> -->
        </el-row>
          <template>
  
</template>
        </template>
      </el-table-column>
      <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <placeTable :tableData="props.row.places" :mission="props.row"></placeTable>
          </template>
        </el-table-column> -->
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }} 
           
 <!-- <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditOrderSend(props.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        <el-tooltip content="Xóa" placement="top"><el-button  @click="openModalDeleteOrderSend(props.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
</template>
        </el-table-column>
       <el-table-column prop="NameEmployee" label="Tên nhân viên" align="center"></el-table-column>
        <el-table-column prop="Name" label="Yêu cầu" align="center"></el-table-column>
        <el-table-column prop="Content" label="Chi tiết" align="center"></el-table-column>
        <el-table-column label="Hạn chót" align="center">
          <template slot-scope="scope">{{ scope.row.Deadline | toDate}}</template>
        </el-table-column>
        <el-table-column label="Thời gian gửi" align="center">
          <template slot-scope="scope">{{ scope.row.TimeCreate | toDate}}</template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center"
        :filters="[{text: 'Hoàn thành', value: '10'},{text: 'Đã xong', value: '6'}, {text: 'Đang xử lý', value: '3'}, {text: 'Mới tạo', value: '1'}]">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.Status | orderStatusColor"
            >{{ scope.row.Status | orderStatusText }}</el-tag>
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
    </div>
  </div>
</template>

<script>

import { parseTime } from "@/utils/index";
import { getSendOrtherGroup,getOrderGroup } from "@/api/order";
import Cookies from 'js-cookie'
import { getStartMonth, getEndMonth} from '@/api/index'
 import { GetGroupEmployee } from "@/api/groups";

export default {
     filters:{
        statusTextFilter(status) {
      return statusMap[status];
    }
   },
  components: {
    
  },
  data() {
    return {
      tableData: [],
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      status: '',
      pageSize: 10,
      rowData: [],
      options: [{}],
      rowData: [],
      obj: '',
       groups: Cookies.get('idGroup'),
       groupList: []
    };
  },
  methods: {
    openModalEditOrderSend(row){
      this.rowData = row;
       console.log(this.rowData);
      VoerroModal.show('edit-order-send-modal');
    },
    openModalDeleteOrderSend(row){
       this.rowData = row;
       console.log(this.rowData);
      VoerroModal.show('delete-order-send-modal');
    },
    openModal() {
      VoerroModal.show('new-order-send-modal');
      
    },
    editOk(){
      this.fetchData();
    },
     deleteOk(){
      this.fetchData();
    },
        fetchGroup(){
       var req = {
        idEmployee: Cookies.get('idEmployee'),
      };
      
       GetGroupEmployee(req).then(response => {
         //console.log(response);
        this.groupList = response.Data;
        this.groups = this.groupList[0].idGroup;
        console.log(this.groupList);
      });
    },
   
    handleExpandChange(row) {
      this.rowData = row;
      var req = {
        IDOrder: row.ID,
      };
      getOrderGroup(req).then(res => {
        row.lines = res.Data;
        this.obj= res.Data;
      });
     
    },
     fetchOffice() {
     
    },

    fetchData() {
      this.loadingTableData = true;
      var req = {
        startDate: this.DateBegin,
        endDate: this.DateEnd,
        admin: this.groups,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        status: this.status,
      };
      console.log(req);
      getSendOrtherGroup(req).then(res => {
        //  console.log(res.Data);
        this.loadingTableData = false;
        // for (var i in res.Data) {
        //   res.Data[i].places = null;
        //   res.Data[i].isLoading = false;
        // }
        this.tableData = res.Data;
        this.total = res.TotalPage * res.RowspPage;
      });
    },
    filterStatus(filters){
                //var lenght = filters[Object.keys(filters)[0]].lenght
                //console.log(lenght)
                var sta = filters[Object.keys(filters)[0]]

                var parsedobj = JSON.parse(JSON.stringify(sta))
                this.status= parsedobj;
                console.log(parsedobj)
                //console.log(parsedobj.length)
                 var req = {
                startDate: this.DateBegin,
                endDate: this.DateEnd,
                id: Cookies.get('idEmployee'),
                PageNumber: this.currentPage,
                RowspPage: this.pageSize,
                status: this.status,
              };
              console.log(req);
              getOrderSend(req).then(res => {
                  console.log(res.Data);
                this.loadingTableData = false;
                // for (var i in res.Data) {
                //   //res.Data[i].places = null;
                //   res.Data[i].isLoading = false;
                // }
                this.tableData = res.Data;
                this.total = res.TotalPage * res.RowspPage;
              });
            },
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    DateBegin: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
      groups: function(){
      this.fetchData();
      //this.fetchEmployee();
    }
  },
  created() {
     this.DateBegin = getStartMonth();
    this.DateEnd = getEndMonth();
    this.fetchGroup();
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


