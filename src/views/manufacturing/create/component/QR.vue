<template>
<div>
<div style="text-align:center" id='report'>
    <div style="font-size: 15px; color: #777777; margin-top: 10px;">
           <span style="font-weight: bold;">Tên báo cáo:</span>
          <span style=" font-size: 13px;">
            {{this.title }}
          </span>
        </div>
        <div style=" font-size: 15px; color: #777777;margin-top: 10px;">
          <span style="font-weight: bold;">Người tạo:</span>
          <span style=" font-size: 13px;">{{
            this.EmployeeID
          }}</span>
        </div>
        <div style="font-size: 15px; color: #777777;margin: 10px 0px;">
          <span style="font-weight: bold;">Thời gian tạo:</span>
          <span style=" font-size: 13px;">{{ this.Time }}</span>
        </div>
    <qrcode-vue id='report2' :value="String(this.$route.params.id)" :size='300' level="H"></qrcode-vue>
    
</div>
    <div style="padding:5px;text-align:right">
          <el-button
            icon="el-icon-printer"
            type="success"
            @click="printDiv('report2')"
            >In</el-button
          >
      </div>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import {GetReportDefineById } from "@/api/productionReport"
  import Cookies from 'js-cookie'
  export default {
      props:['qr'],
      created(){
      },
    data() {
      return {
        title:'',
        EmployeeID:'',
        Time:''
      }
    },
    methods: {
      fetchData(){
        GetReportDefineById({
          token: Cookies.get('token'),
          ReportDefineID: this.$route.params.id
        }).then(res=>{
          if(res.RespCode==0){
            this.title = res.ReportDefineInfo.ReportName
            this.EmployeeID = res.ReportDefineInfo.EmployeeID
            this.Time = res.ReportDefineInfo.Time
          }
        })
      
      },
    printDiv(report){
		window.print()
		}
    },
    created(){
      this.fetchData()
    },
    components: {
      QrcodeVue
    },
  }
</script> 
<style>
.inline-block {
  max-width: 100vh;
  margin-bottom: 5px;
}
</style>
