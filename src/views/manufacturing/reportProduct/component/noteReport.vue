<template>
  <div shadow="always">
     <div slot="body">
      <el-form ref="form" label-position="top"  label-width="120px" size="mini"> 
                 <el-form-item label="Ghi chú">
                  <el-input type="textarea" rows="3" v-model="content" ></el-input>
                </el-form-item>
              </el-form>
    </div>
      <div slot="footer" style="float: right;">
      <el-button type="success" icon="el-icon-success" @click="acceptReport" >Xác nhận</el-button>
    </div>
  </div>
</template>

<script>
import {AcceptReport } from "@/api/productionReport"
import Cookies from "js-cookie"
export default {
  name: 'PhoneNumberLine',
  props:['reportID'],
  data () {
    return {
      content:'',
    }
  },
  created(){
  },
  methods: {
   acceptReport(){
        var req={
            token: Cookies.get('token'),
            ReportID:this.reportID,
            Status:3,
            Note:this.content
        }
        AcceptReport(req).then(response => {
           if(response.RespCode == 0){
               this.$message({
                   message: 'Duyệt báo cáo thành công',
                   type: 'success',
               })
           }
       })
   }
   
  },
  watch:{
      reportID(){
          this.acceptReport()
      }
  }
}
</script>