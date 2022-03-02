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
    <div class="inline-block">
                <span class="demonstration">Tháng</span>
                <el-date-picker
                v-model="value"
                type="month"
                placeholder="Pick a month">
                </el-date-picker>
            </div>
 
   
  </div>
  
    <div>
    
    <el-table
      v-loading="listLoading"
      :data="options"
        @expand-change="expandRow"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
     
    >
    <el-table-column type="expand">
      <template slot-scope="props">
      
        <el-table
      v-loading="listLoading"
      :data="props.row.lines"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
      
    >
      <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1) }}
        </template>
      </el-table-column>
   
     <el-table-column min-width="300" class-name="status-col" label="Công việc"  >
        <template slot-scope="scope">{{ scope.row.Description }}</template>
      </el-table-column>
      <el-table-column width="150" class-name="status-col" label="Khối lượng"  align="right">
        <template slot-scope="scope">{{ scope.row.Quantity | setSize | toCommas}}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="Đơn vị tính"  align="center">
        <template slot-scope="scope">{{ scope.row.Unit }}</template>
      </el-table-column>
     
        <el-table-column  class-name="status-col" label="Ngày tạo"  align="center">
        <template slot-scope="scope">{{ scope.row.TimeUpdate | toDate }}</template>
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
    </div>
    <el-pagination
      background
      layout="prev, pager, next,sizes"
     

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
    import { getWork,GetWorkGroup } from '@/api/work'
import { GetListGroupAdminByToken } from "@/api/groups";
import { getEmployee } from "@/api/order";
  import { getMonth} from '@/api/index'
 import Cookies from 'js-cookie'

export default {
  components: {
    
  },
  filters: {
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
      currentPage: 1,
      totalPage: '',
      total: 0,
       value: '',
      groups: '',
      groupList: [],
       page_row: 10,
      listLoading: false,
      target: [],
      listEmployee: '',
      rowSelect: '',
      month: '',
      year: '',
      options: [{
        }],
        
         id: '',
    };
  },
  methods: {
       fetchEmployee() {
      var req = {
        admin: this.groups,
      };
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.options = response.Data;
        this.listLoading = false; 
      });
    },
  
    expandRow(row){
         var req = {
          month: this.month,
        year: this.year,
        idEmployee: row.idEmployee,
      };
     
      this.listLoading = true;
      GetWorkGroup(req).then(response => {
        row.lines = response.Data;
      
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
        this.groups = response.Data[0].idGroup
        this.fetchEmployee();
        //console.log(this.groupList)
      });
    },
   
  },
   computed: {
  
   
  },
  mounted() {},
  created() {
        this.value = new Date()
        this.month = this.value.getMonth()
        this.year = this.value.getFullYear()
         this.fetchGroup();
         
        },
         watch: {
        value: function(){
       this.month = this.value.getMonth() + 1
        this.year = this.value.getFullYear()
        //this.fetchData();
    },
    groups: function(){
        this.fetchEmployee()
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