<template>
  <div class="app-container">
       <div class="inline-block">
          <div class="inline-block">
       <!-- <el-select v-model="groups" clearable placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup">
          </el-option>
        </el-select> -->
        </div>
    <span class="demonstration">Tháng</span>
    <el-date-picker
      v-model="month"
      type="month"
      value-format="MM-yyyy"
      placeholder="Pick a month"
      value="2019-06">
    </el-date-picker>

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

     <el-button type="primary" :loading="listLoading" @click="openModal"><i class="fas fa-plus-circle"></i> Thêm chỉ tiêu</el-button>
  </div>
    <div class="filter-container">
      
      <div class="inline-block">
      </div>
    </div>
    <div>
    <target :id="id" :groupList="groupList" @click-something="addOK" ></target>
     <editTarget :row="rowTarget" :groupList="groupList" @click-something="editOK" ></editTarget>
      <deleteTarget :row="rowTarget" :groupList="groupList" @click-something="deleteOK" ></deleteTarget>
    <el-table
      v-loading="listLoading"
      :data="target"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
      @current-change="selectionChanged"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>Tên: {{ props.row.nameEmployee }}</p>
        <p>Tháng: {{ props.row.month.substr(0,7) }}</p>
        <p>Ghi chú: {{ props.row.note }}</p>
      </template>
    </el-table-column>
      <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1)+(currentPage - 1)*10 }}
           <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditTarget(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
        <el-tooltip content="Xóa" placement="top"><el-button  @click="openModalDeleteTarget(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip>
        </template>
      </el-table-column>
      <el-table-column  label="Chỉ tiêu" width="150">
        <template slot-scope="scope">{{ scope.row.Service }}</template>
      </el-table-column>
       <!-- <el-table-column  label="Tên nhân viên" width="150">
        <template slot-scope="scope">{{ scope.row.nameEmployee }}</template>
      </el-table-column> -->
      
      
      <el-table-column  class-name="status-col" label="KPI đích"  align="center">
        <template slot-scope="scope">{{ scope.row.target }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="KPI max"  align="center">
        <template slot-scope="scope">{{ scope.row.KPImax }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Khối lượng"  align="center">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="Đơn vị tính"  align="center">
        <template slot-scope="scope">{{ scope.row.unit }}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="Ngày tạo"  align="center">
        <template slot-scope="scope">{{ scope.row.TimeCreate | toDate }}</template>
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

import Target from "@/views/KPI/target/component/createTarget";
import EditTarget from "@/views/KPI/target/component/editTarget";
import DeleteTarget from "@/views/KPI/target/component/deleteTarget";
import { GetTarget,CreateTarget } from "@/api/kpiList";
import { getStartMonth, getMonth,getEndMonth} from '@/api/index'

 import Cookies from 'js-cookie'
 import { GetGroupEmployee } from "@/api/groups";
 

export default {
  components: {
    Target,EditTarget,DeleteTarget
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
      rowTarget: '',
      DateBegin: '',
      DateEnd: '',
      groupList: [{}],
       groups: Cookies.get('idGroup'),
       page_row: 10,
      listLoading: false,
      target: [],
      month: '',
      options: [{
        }],
         value: '',
         id: '',    
    };
  },
  methods: {
      openModalEditTarget(row) {
       this.rowTarget= row;
         VoerroModal.show('edit-target-KPI');
    },
     openModalDeleteTarget(row) {
       this.rowTarget= row;
         VoerroModal.show('delete-target-KPI');
    },
     addOK(form){
          //console.log(form);
         // console.log(this.target);
         //this.target.push(form);
        //  console.log(this.target);
          //alert('OK');
          this.fetchData();
      },
       editOK(form){
          //console.log(form);
         // console.log(this.target);
         //this.target.push(form);
        //  console.log(this.target);
          //alert('OK');
          this.fetchData();
      },
    openModal(){
      VoerroModal.show('new-target-KPI');
    },
    //   fetchGroup(){
    //    var req = {
    //     idEmployee: Cookies.get('idEmployee'),
    //     token: Cookies.get('token')
    //   };
    //    GetGroupEmployee(req).then(response => {
    //     this.groupList = response.Data;
    //   });
    // },
   
    fetchData() {
      var req = {
        month: this.month,
        PageNumber: this.currentPage,
        idEmployee: Cookies.get('idEmployee'),
        RowspPage: this.page_row
      };
      console.log(req);
      this.listLoading = true;
      GetTarget(req).then(response => {
        this.target = response.Data;
        console.log(response);
        this.listLoading = false;
        this.total = response.TotalPage*response.RowspPage;
        console.log(this.totalPage);
      });
    },  
     fetchGroup(){
       var req = {
        idEmployee: Cookies.get('idEmployee'),
      };
      
       GetGroupEmployee(req).then(response => {
         //console.log(response);
        this.groupList = response.Data;
        console.log(this.groupList);
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
    currentPage: function() {
      this.fetchData();
    }
  },
  created() {
    this.month = getMonth();
     this.DateBegin = getStartMonth();
    this.DateEnd = getEndMonth();
   // this.month = new Date().getFullYear + '-' + new Date().getMonth();
    this.fetchData();
    this.fetchGroup();
     
  },
};
</script>