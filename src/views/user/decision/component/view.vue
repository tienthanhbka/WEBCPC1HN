<template>
  <div  shadow="always" style="margin: auto; position: relative; padding-bottom: 100px;">
    <div>
        <el-card >
            <div style="font-weight: bold; font-size: 30px; color: #777777;">
                Quyết định: {{ this.lines.DecisionName }}
            </div>
            <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
                <span style="font-weight: bold;">Hiệu lực:</span> {{ this.lines.DateStart }}
            </div>
        </el-card>
    </div>
    <div :key="acc">
    <div  v-for="(line, index) in files" :key="index" class="row">
      <div>
          <el-card>
                <div style="width: 100%; height: 100%;"  class="grid-content bg-purple-light">
                    <object :data="'https://icpc1hn.work/api/'+'File/GetFileEmployeeDecision/'+line+'?token='+token+'&EmployeeID='+lines.EmployeeID" type="application/pdf" width="100%" height="1000px">
                    <p>Your web browser doesn't have a PDF plugin.
                    Instead you can <a :href="'https://icpc1hn.work/api/'+'File/GetFileEmployeeDecision/'+line+'?token='+token+'&EmployeeID='+lines.EmployeeID">click here to
                    download the PDF file.</a></p>
                    </object>
                   
                </div>
         </el-card>
      </div>
    </div>
  </div>
  </div>
 
</template>

<script>

import Cookies from 'js-cookie'
import { GetDecisionByID } from '@/api/employeeInfor'


export default {
  name: '',
   components: {
      
  },
  props:[''],

  data () {
    return {
     lines:'',
     token: Cookies.get('token')
    }
  },
  watch: {
      '$route': 'fetchDataRe'
    },
  methods: {
    
    fetchDataRe(){
      //this.coin = list_coins[this.$route.params.id]
     var req = {
         RowID: this.$route.params.id
     }
     GetDecisionByID(req).then(response =>{
         if(response.ResCode == 0){
             this.lines = response.Data[0];

             if (this.lines.FilePath != ''){
                          this.files = this.lines.FilePath.split(";;", 100);
                    }
         }
     })
    },

  },
  mounted () {
    //this.addLine()
  },
  created(){
      this.fetchDataRe();
  }
}
</script>
<style>
.el-dialog__title {
    line-height: 30px;
    font-size: 18px;
    color: #303133;
    font-weight: bold;
}

@media only screen and (max-width: 600px) {
.el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
}
}
</style>
