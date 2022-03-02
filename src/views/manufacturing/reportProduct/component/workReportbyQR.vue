<template>
<div>
<div style="text-align:center" id='report'>
     <div style=" font-size: 15px; color: #777777;margin-top: 20px;">
          <span style="font-weight: bold;">Lệnh sản xuất:</span>
          <span style=" font-size: 13px;">{{
            this.ProductionOrderIDBFO
          }}</span>
        </div>
    <div style="font-size: 15px; color: #777777; margin-top: 10px;">
           <span style="font-weight: bold;">Tên báo cáo:</span>
          <span style=" font-size: 13px;">
            {{this.title }}
          </span>
        </div>
        <div style="margin-top: 20px;">
    <qrcode-vue id='report2' :value="String(this.$route.params.idorder+';'+this.$route.params.idreport)" :size='300' level="H"></qrcode-vue>
    </div>
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
  import {
  GetProductionOrderById
} from "@/api/productionOrder"
  import Cookies from 'js-cookie'
  export default {
      props:['qr'],
      created(){
      },
    data() {
      return {
        title:'',
        ProductionOrderIDBFO:'',
        Time:''
      }
    },
    methods: {
      fetchData(){
        GetReportDefineById({
          token: Cookies.get('token'),
          ReportDefineID: this.$route.params.idreport
        }).then(res=>{
          if(res.RespCode==0){
            this.title = res.ReportDefineInfo.ReportName
          }
        })
        GetProductionOrderById({
            token: Cookies.get('token'),
          ProductionOrderById: this.$route.params.idorder
        }).then(res=>{
          if(res.RespCode==0){
            this.ProductionOrderIDBFO = res.ProductionOrderInfo.ProductionOrderIDBFO
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
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
