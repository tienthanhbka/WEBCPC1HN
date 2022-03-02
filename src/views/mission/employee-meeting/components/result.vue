<template>
    <div>
         <el-table 
        :data="tableData"
        v-loading="isLoading"
        fit
        style="width: 100%"
        border
      >

        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column  width="300" label="Nhân viên">
          <template slot-scope="{row}">
            {{row.nameEmployee}}
          </template>
        </el-table-column>
        <el-table-column  min-width="300" label="Kết quả">
          <template slot-scope="{row}">
            <el-tag slot="reference" :type="row.Status|meetingHeaderStatusColor ">
              <i class="fas fa-info"></i>
              {{ row.Status|meetingHeaderStatusText }}
            </el-tag>
            <template v-if="row.Status<100" >
              <span>Không tìm thấy Call</span>
            </template>
            
            <el-popover v-else
  trigger="click">
  <div>
    Call cách nhau: {{row.Distance|numbered}} m, {{Number(row.TimeDiff/1000)}} s
  </div>
  <el-button slot="reference" type="text">Chi tiết</el-button>
</el-popover>
<el-button type="text" style="color:#8e44ad" @click="openDetail(row)">Chi tiết chấm điểm</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import {GetMeetingLineOfHeader} from '@/api/mission'
export default {
    props:{
        meetingHeader:Object
    },
    data() {
        return {
            tableData:[],
            isLoading:false,
        }
    },
    methods: {
      openDetail(row){
        this.$emit('detailClicked',{
          header:this.meetingHeader,
          line:row
        })
        
      }
    },
    created() {
        if(this.meetingHeader.line==null){
            this.isLoading = true;
            GetMeetingLineOfHeader({
                id:this.meetingHeader.RowID
            }).then(res=>{
                this.isLoading = false;
                this.meetingHeader.line = res.Data
                this.tableData = this.meetingHeader.line;
            })
        }else{
            this.tableData = this.meetingHeader.line;
        }
        
    },
    
}
</script>