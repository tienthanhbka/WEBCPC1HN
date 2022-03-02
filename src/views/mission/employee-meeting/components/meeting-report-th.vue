<template>
    <div>
        <div style="font-weight: bold;
    margin-bottom: 10px;">
            Từ: {{Date.parse(option.start).toString('dd/MM/yyyy')}} Đến: {{Date.parse(option.end).toString('dd/MM/yyyy')}}, 
            <span v-if="option.notCt">Không tính tại công ty,</span>
            <span v-if="option.twicePDay">Chỉ tính tối đa 2 call 1 ngày</span>
        </div>
         <el-table
         v-loading="isLoading"
    :data="tableData"
    border
    size="small"
    style="width: 100%">
    <el-table-column
      prop="IdASM"
      label="SDT ASM"
      min-width="180">
    </el-table-column>
     <el-table-column
      prop="ASMCode"
      label="Mã ASM"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="ASMName"
      label="Tên ASM"
      min-width="180">
    </el-table-column>
     <el-table-column
      prop="ECode"
      label="Mã NV"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="EName"
      label=" Tên NV"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="IdGroup"
      label="Bộ phận"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="Num"
      label="SL Call"
      width="100">
    </el-table-column>
  </el-table>
  <div style="height:50px">
      <el-button v-if="!isLoading" style="margin-top:10px;float:right" type="success" @click="exportExl()">Xuất Excel</el-button>
  </div>
  
    </div>
</template>
<script>
import {MeetingFullReport } from "@/api/mission";
export default {
    props:{
        option:{
            type:Object,
            default:{}
        },
        visible:{
            type:Boolean
        }
    
    },
    data() {
        return {
            tableData:[],
            isLoading:false,
        }
    },
    methods:{
        exportExl(){
             var tHeader = [];
      var filterVal = [];
     
        tHeader = [
           "SDT ASM",
          "Mã ASM",
          "Tên ASM",
           "Mã NV",
          "Tên NV",
          "Bộ phận",
          "SL Call"
        ]
        filterVal = [
       
         
          "IdASM",
           "ASMCode",
          "ASMName",
             "ECode",
          "EName",
           "IdGroup",
          "Num",
        ]
      

      var data2 = this.formatJson(filterVal, this.tableData);

      var self = this;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename: "CoachingCall"+this.option.start+"-"+this.option.end, //Optional
          autoWidth: true, //Optional
          bookType: "xlsx" //Optional
        });
      });
        },
        formatJson(filterVal, jsonData) {
      
        return jsonData.map(v =>
          filterVal.map(j => {
            
              return v[j];
            
          })
        );
      
    },
        fetchData(){
            this.isLoading = true;
            MeetingFullReport({
                 fullReport:false,
        em:this.option.em,
        start:this.option.start,
        end:this.option.end,
        notCt:this.option.notCt,
        twicePDay:this.option.twicePDay,
            }).then(res=>{
                this.isLoading = false;
                this.tableData = res.Data;
            })
        }
    },
    created(){
        this.fetchData();
    },
    watch:{
        visible(){
            if(this.visible){
                this.fetchData();
            }
        }
    }
}
</script>