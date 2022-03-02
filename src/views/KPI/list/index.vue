<template>
  <div class="app-container">
    <div class="filter-container">
       <el-button type="primary" :loading="listLoading" @click="openModal"><i class="fas fa-plus-circle"></i> Thêm danh mục</el-button>
      <div class="inline-block">
      </div>
    </div>
    <div>
    <createList @click-something="addOK" ></createList>
     <pauseList @click-something="handleOK"  :id="id" ></pauseList>
     <!-- <Pause @click-something="handleOK" ></Pause> -->
    <el-table
      v-loading="listLoading"
      :data="kpiList"
      element-loading-text="Loading"
      style="width:100%"
      border
      fit
      highlight-current-row
     
      @current-change="selectionChanged"
    >
      <el-table-column  align="center" prop="No_" label="STT" width="95">
        <template slot-scope="scope">{{ (scope.$index+1)+(currentPage - 1)*10 }}</template>
      </el-table-column>
       <el-table-column
      label="" width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="pause(scope.$index, scope.row)"><i class="fas fa-ban"> Dừng</i></el-button>
      </template>
    </el-table-column>
      <el-table-column  label="Mã" width="150">
        <template slot-scope="scope">{{ scope.row.KPICode }}</template>
      </el-table-column>

      <el-table-column  label="Loại nhân viên" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.TypeEmployee }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Nhóm chỉ tiêu"  align="center">
        <template slot-scope="scope">{{ scope.row.GroupKPI }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Mô tả"  align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
       <el-table-column  class-name="status-col" label="Điểm tối đa"  align="center">
        <template slot-scope="scope">{{ scope.row.maxScore }}</template>
      </el-table-column>
      <el-table-column  class-name="status-col" label="Trạng thái" width="150" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | KPIStatusColor"
          >{{ scope.row.status|KPIStatusText }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-pagination
      background
      @current-change="fetchData"
      layout="prev, pager, next"
      :total="totalPage*10"
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

import CreateList from "@/views/KPI/list/component/createList";
import PauseList from "@/views/KPI/list/component/pauseList";
import { GetKPIList,CreateKPIList } from "@/api/kpiList";
 import Cookies from 'js-cookie'

export default {
  components: {
    CreateList,PauseList
  },
  filters: {
   statusTextFilter(status) {
      return statusMap[status];
   }
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 250,
      listLoading: false,
      kpiList: [],
      options: [{
        }],
         value: '',
         id: '',
         
    };
  },
  methods: {
     addOK(form){
          console.log(form);
          console.log(this.kpiList);
         this.kpiList.push(form);
          console.log(this.kpiList);
         // this.fetchData();
      },
      handleOK(kpiCode){
          //console.log(kpiCode);
          for(var i=0 ; i< this.kpiList.length ; i++){
            if(this.kpiList[i].KPICode == kpiCode){
              this.kpiList[i].status = 0;
            }
          }
         // this.fetchData();
      },
    openModal(){
      VoerroModal.show('new-list-KPI');
    },
    pause(index,row){
        //console.log(row);
        this.id = row.KPICode;
        VoerroModal.show('pause-KPI');
    },
    fetchData(pageNum) {
      if (pageNum == null) pageNum = 1;
      this.currentPage = pageNum;
      var req = {
      
        PageNumber: pageNum,
        RowspPage: 10
      };
      this.listLoading = true;
      GetKPIList(req).then(response => {
        this.kpiList = response.Data;
        console.log(response.Data);
        this.listLoading = false;
        this.totalPage = response.TotalPage;
      });
    },    
  },
  mounted() {
      this.fetchData();
  },
  watch: {
    expandRow: function(){
      expandRow();
    }
  },
  created() {
    this.fetchData();
  },
};
</script>