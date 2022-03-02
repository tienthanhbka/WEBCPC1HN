<template>
  <div class="app-container">
       <div class="inline-block">

         <el-select v-model="groups" clearable placeholder="Chọn nhóm">
    <el-option
      v-for="item in groupList"
      :key="item.idGroup"
      :label="item.idGroup"
      :value="item.idGroup">
    </el-option>
  </el-select>

    <span class="demonstration">Chọn tháng</span>
    <el-date-picker
      v-model="month"
      type="month"
      value-format="MM-yyyy"
      placeholder="Pick a month"
      value="2019-06">
    </el-date-picker>
     <el-button type="primary" :loading="listLoading" @click="openModal"><i class="fas fa-plus-circle"></i> Thêm chỉ tiêu</el-button>
  </div>
    <div class="filter-container">
      
      <div class="inline-block">
      </div>
    </div>
    <div>
      <modal :id="id" :groupList="groupList"  :employee="options" @click-something="addOK" ></modal>
    <confirm :row="rowSelect" @click-something="confirmOK" ></confirm>
    <el-table
      v-loading="listLoading"
      :data="target"
        @expand-change="expandRow"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
      @current-change="selectionChanged"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <template> <div style="color: red; font-size: 20px;"> KPI đích/ KPI tối đa :  {{props.row.kpi}} / {{props.row.kpimax}}  </div> </template>
        <el-table
      v-loading="listLoading"
      :data="props.row.lines"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
      @current-change="selectionChanged"
    >
      <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1)+(currentPage - 1)*10 }}
           <el-tooltip content="Duyệt" placement="top"><el-button @click="openModalConfirmTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        </template>
      </el-table-column>
   
      <el-table-column  label="Chỉ tiêu" width="150">
        <template slot-scope="scope">{{ scope.row.Service }}</template>
      </el-table-column>
      
      
        <el-table-column  class-name="status-col" label="Ngày tạo"  align="center">
        <template slot-scope="scope">{{ scope.row.TimeCreate | toDate }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="KPI đích"  align="center">
        <template slot-scope="scope">{{ scope.row.target }}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="KPI tối đa"  align="center">
        <template slot-scope="scope">{{ scope.row.KPImax }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Khối lượng"  align="center">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="Đơn vị tính"  align="center">
        <template slot-scope="scope">{{ scope.row.unit }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Ghi chú"  align="center">
        <template slot-scope="scope">{{ scope.row.note }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Trạng thái" width="150" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | TargetStatusColor"
          >{{ scope.row.status|TargetStatusText }}</el-tag>
        </template>
      </el-table-column>

       <!-- <el-table-column  label="Người duyệt" width="150">
        <template slot-scope="scope">{{ scope.row.nameManager }}</template>
      </el-table-column> -->
  
    </el-table>
      </template>
    </el-table-column>
      <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1)+(currentPage - 1)*10 }}
           <!-- <el-tooltip content="Duyệt" placement="top"><el-button @click="openModalConfirmTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
        </template>
      </el-table-column>
   
      <el-table-column  label="Nhân viên" >
        <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
      </el-table-column>

       <!-- <el-table-column  v-if="scope.row.kpi" label="Tổng KPI đích" >
        <template slot-scope="scope">{{ scope.row.kpi }}</template>
      </el-table-column>

       <el-table-column v-if="scope.row.maxkpi" label="Tổng KPI max" >
        <template slot-scope="scope">{{ scope.row.maxkpi }}</template>
      </el-table-column> -->
     
  
    </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next,sizes"
      :total="total"
        :current-page="currentPage"
        :page-size.sync="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"

    ></el-pagination>
  </div>
</template>

<style scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
.el-header {
  padding-top: 15px;
  height: 55px;
}
.floatright {
  float: right;
}
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>

<script>

import Modal from "@/views/KPI/target/component/createTargetGroup";
import Confirm from "@/views/KPI/target/group/component/confirm";
import EditTarget from "@/views/KPI/target/component/editTarget";
import { GetTargetGroup,CreateTarget,ConfirmTarget,GetTargetEmployeeGroup,GetTargetEmployeeGroupDetail } from "@/api/kpiList";
import { GetListGroupAdminByToken } from "@/api/groups";
import { getStartMonth, getMonth} from '@/api/index';
import { getEmployee } from "@/api/order";
 import Cookies from 'js-cookie'

export default {
  components: {
    Confirm,Modal
  },
  filters: {
   statusTextFilter(status) {
      return statusMap[status];
   }
  },
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      },
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
      currentPage: 1,
      totalPage: '',
      total: 0,
      groups: '',
      groupList: [],
       page_row: 10,
      listLoading: false,
      target: [],
      rowSelect: '',
      month: '',
      options: [{
        }],
         value: '',
         id: '',
    };
  },
  methods: {
    //  handleEdit(index, row) {
    //    if(row.status >=2){
    //       this.$notify({
    //       title: 'Không thể cập nhật',
    //       message: 'Tiêu chí đã ở trạng thái duyệt',
    //       type: 'warning',
    //       position: 'top-left'
    //     });
    //    }
    //    else{
    //       //console.log(row);
    //     this.rowSelect=row;
    //     VoerroModal.show('edit-target-KPI');
    //    }
       
    //   },
      // handleConfirm(index, row) {
      //   console.log(row);
      // },
      openModalConfirmTarget(row){
         this.rowSelect=row;
        VoerroModal.show('confirm-target-KPI');
      },
       fetchEmployee() {
      var req = {
        admin: this.groups,
        //idEmployee: Cookies.get('idEmployee'),
      };
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
        console.log(this.options);
        this.listLoading = false; 
      });
    },
     addOK(form){
          //console.log(form);
         // console.log(this.target);
         //this.target.push(form);
          //console.log(this.target);
          //alert('OK');
          this.fetchData();
      },
      confirmOK(){
         this.fetchData();
      },
    openModal(){
      VoerroModal.show('new-target-KPI-group');
    },
    fetchData() {
      //if (pageNum == null) pageNum = 1;
      //this.currentPage = page_row;
      var req = {
        month: this.month,
        PageNumber: this.currentPage,
        admin: this.groups,
        RowspPage: this.page_row
      };
      console.log(req);
      this.listLoading = true;
      GetTargetEmployeeGroup(req).then(response => {
        this.target = response.Data;
        console.log(response);
        this.listLoading = false;
        this.total = response.TotalPage*response.RowspPage;
        console.log(this.totalPage);
      });
    },  
    expandRow(row){
         var req = {
        month: this.month,
       // PageNumber: this.currentPage,
        idEmployee: row.idEmployee,
        //RowspPage: this.page_row
      };
      console.log(req);
      this.listLoading = true;
      GetTargetEmployeeGroupDetail(req).then(response => {
        row.lines = response.Data;
        console.log(response);
        
        row.kpi = 0;
        row.kpimax = 0;
        
        row.lines.forEach(myFunction)

        function myFunction(item, index, arr) {
           row.kpi += parseInt(item.target) ;
          row.kpimax += parseInt(item.KPImax) ;
        }
        this.listLoading = false;
        //this.total = response.TotalPage*response.RowspPage;
        //console.log(this.totalPage);
      });

    },
  
    fetchGroup(){
       var req = {
        idEmployee: Cookies.get('idEmployee'),
      };
       GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
      });
    },
     handleCurrentChange(val) {
                this.currentPage = val
                this.fetchData();
            },
            handleSizeChange(val){
                this.page_row = val
                this.fetchData();
            },  
  },
   computed: {
   currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      },
    },
    pageSize: {
      get() {
        return this.TotalPage;
      },
      set(val) {
        this.$emit('update:limit', val);
      },
    },
  },
  mounted() {},
 watch: {
    pageSize: function() {
      this.fetchData();
    },
    month: function() {
      this.fetchData();
    },
     groups: function() {
      this.fetchData();
      this.fetchEmployee();
    },
    currentPage: function() {
      this.fetchData();
    }
  },
  created() {
    this.month = getMonth();
    this.fetchData();
    this.fetchGroup();
     
  },
};
</script>