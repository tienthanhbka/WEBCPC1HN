<template>
<div>
<el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{date, data}">
          <div >
<div>{{ data.day.substring(8,10)}} <i  class="fas fa-times" v-if="numCall(data.day)==0&&(data.day.substring(0,7)==currentDate.toISOString().slice(0,7))" style="float:right;color:#d63031"></i> </div>
        <div style="margin-top:10px">
            <span v-if="numCall(data.day)!=0" class="call-tag">{{numCall(data.day)}} call</span>
        </div>
          </div>
        
        
      </template>
    </el-calendar>
    <div style="background:white;padding:20px;margin-top:-35px;" >
        Số ngày đi làm: {{dateReport.length}}
    </div>
</div>
     
</template>
<script>
import { GetMyWorkDay } from "@/api/user";
export default {
    data() {
        return {
            currentDate:null,
            dateReport:[]
        }
    },
    methods: {
        numCall:function(day){
          var workD = this.dateReport;
          for(var i in workD){
              if(workD[i].date==day){
                  return workD[i].numCall;
              }
          }
        
          return '0';
        },
        fetchData(){
            var month = this.currentDate.toISOString().slice(0,7);
            GetMyWorkDay({month:month}).then(res=>{
                this.dateReport = res.Data;
            });
            
        }
    },
    mounted(){
        this.currentDate = new Date();
        this.fetchData();
    },
    watch: {
        currentDate(newVal,oldVal){
            if(oldVal&&newVal){
                if(newVal.toISOString().slice(0,7)!=oldVal.toISOString().slice(0,7)){
                    this.fetchData()
                }
            }
        }
    },
}
</script>
<style scoped>
.call-tag{
    color:#16a085; padding:3px;
    border-radius: 10px;
}
.el-calendar-day{
    padding: 0px !important;
}
</style>
