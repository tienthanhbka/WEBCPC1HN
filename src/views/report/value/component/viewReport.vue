<template>
  <div  shadow="always" style="margin: auto; width: 700px; position: relative; padding-bottom: 100px;">
    <div>
        <el-card >
            <div style="font-weight: bold; font-size: 30px; color: #777777;">
                 {{ this.lines[0].Title }}
            </div>
            <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
                <span style="font-weight: bold;">Nhân viên:</span> {{ this.lines[0].nameEmployee }}
            </div>
            <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
                <span style="font-weight: bold;">Nhóm:</span> {{ this.lines[0].idGroup }}
            </div>
            <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
                <span style="font-weight: bold;">Thời gian báo cáo:</span> {{ this.lines[0].TimeCreate }}
            </div>

             <div style=" font-size: 15px; margin-top: 10px; color: #777777;float: left;">
                <span style="font-weight: bold;float: left;margin-top: 8px;">Điểm KPI :</span><el-input style="width: 200px; float: left;" placeholder="Điểm KPI" v-model="MaxKPI"></el-input>
            </div>
     
      <!-- <el-input placeholder="Nhập tiêu đề"  v-model="title"></el-input> -->
        </el-card>
    </div>
    <div :key="acc">
    <div  v-for="(line, index) in lines" :key="index" class="row">
      <div >
          <el-card >
        <el-row style="margin-bottom: 20px;">
           <el-col :span="1">
            <div class="grid-content bg-purple-light" style=" margin-left: 3px;">
              <!-- <i class="far fa-question-circle"></i> -->
              <span style="font-weight: bold;"> {{ index + 1 }}. </span>
            </div>
          </el-col>
          <el-col :span="14">
                <span style="font-weight: bold;"> {{line.Parameter}} </span>
          </el-col>
        </el-row>
                <div v-if="line.Type == 1" class="grid-content bg-purple-light">
                    <div> - {{ line.Answer }}</div>
                <!-- <el-input placeholder="Nhập câu trả lời" v-model="line.answer"></el-input> -->
                </div>
               <div v-if="line.Type == 2" class="">
                    <div> - {{ line.Answer }}</div>
                   <!-- <el-radio-group v-model="line.Answer"  v-for="(select, index) in line.select" :key="index">
                       <div style="width: 500px;">
                           <el-radio :label="select.ans">{{ select.ans }}</el-radio>
                       </div>
                </el-radio-group> -->

            </div>
             <div v-if="line.Type == 3"  class="grid-content bg-purple-light">
                  <div v-for="(ans,index) in line.ans" :key="index"> - {{ ans.ans }}</div>
                   <!-- <el-checkbox-group v-model="line.Answer"  >
                    <el-checkbox style="width: 500px;" v-for="(select,index) in line.select" :key="index" :label="select.ans" ></el-checkbox>
                </el-checkbox-group> -->
            </div>
              <div v-if="line.Type == 5"  class="grid-content bg-purple-light">
                  <div v-for="(ans,index) in line.ans" :key="index"> - {{ ans.ans }}</div>
                   <!-- <el-checkbox-group v-model="line.Answer"  >
                    <el-checkbox style="width: 500px;" v-for="(select,index) in line.select" :key="index" :label="select.ans" ></el-checkbox>
                </el-checkbox-group> -->
            </div>

               <div v-if="line.Type == 4"  class="grid-content bg-purple-light">

                      <div class="demo-image__preview" v-for="(ans,index) in line.ans" :key="index">
                          <a :href="'https://icpc1hn.work/api/'+'File/GetFileReport/'+ans.ans+'?token='+token">
                        <el-image 
  
                            style="width: 100px; height: 100px; float: left;"
                            :src="'https://icpc1hn.work/api/'+'File/GetFileReport/'+ans.ans+'?token='+token"
                            :preview-src-list="line.ans">
                        </el-image>
                        </a>
                        
                    </div>
            </div>
        
         </el-card>
      </div>
    </div>
  </div>
   <div style="position:fixed; bottom: 50px;right: 140px;z-index: 1000"><el-button type="warning"  @click="sendMail" ><i class="fas fa-reply"></i> Gửi mail</el-button> </div>
   <div style="position:fixed; bottom: 50px;right: 40px;z-index: 1000"><el-button type="primary"  @click="Confirm" ><i class="fas fa-spell-check"></i> Duyệt</el-button> </div>
    <el-dialog title="Gửi mail"  :visible.sync="dialogFormMail">
        <sendMail :id="ReportValueID" ></sendMail>
        
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> -->
  </span>
</el-dialog>
  </div>
 
</template>

<script>
import Question1 from "@/views/report/define/component/question1/index"
import Question2 from "@/views/report/define/component/question2/index"
import Question3 from "@/views/report/define/component/question3/index"
import SendMail from "@/views/report/value/component/sendMail"
import Cookies from 'js-cookie'
import { StartReport,WorkReport,GetReportValue,ConfirmReport,SendMailReport } from '@/api/report'

export default {
  name: '',
   components: {
       SendMail
  },
  props:[''],

  data () {
    return {
      lines: [],
      id: 0,
       files: [],
      info: '',
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: Cookies.get('token'),
      select1: [],
       fileList: [],
        dialogImageUrl: '',
        dialogFormMail: false,
        disabled: false
    }
  },
  watch: {
      '$route': 'fetchData'
    },
  methods: {
      uploadOk(res,file,fileList) {
         // alert(res)
        //    this.$refs.upload.submit().then(response =>{
        //        console.log(response)
        //         alert('ok')
        //    });
        //console.log(this.lines)
         this.lines.forEach(fun)
                         function fun(item, index, arr){
                             if(item.ParameterID == res.Data.paraID){
                                // console.log(item)
                                 item.answer.push(res.Data.fileName)
                             }
                          
                        }
           //console.log(this.lines)
        },
     
    Confirm(){
       var req = {
           KPI : this.MaxKPI,
           ReportValueID: this.ReportValueID
       }
       ConfirmReport(req).then(response => {
           if(response.ResCode == 0){
               this.$notify({
                   title: 'Thành công',
                   message: 'Duyệt báo cáo thành công',
                   type: 'success',
                   position: 'top-left'
               })
           }
       })

    },
    sendMail(){
        this.dialogFormMail = true
    },
    
    fetchData(){
      //this.coin = list_coins[this.$route.params.id]
     var req = {
         RowID: this.$route.params.id
     }
     GetReportValue(req).then(response =>{
         if(response.ResCode == 0){
             this.lines = response.Data;

            var a=''
              this.lines.forEach(myFunction)

                function myFunction(item, index, arr) {
                    if (item.Answer != ''){
                          var a = item.Answer.split(";;", 100);
                        a.forEach(fun)
                         function fun(item2, index, arr){
                            var b = { ans : "" }
                            b.ans = item2
                            item.ans.push(b)
                        }
                    }
                }
                
              this.MaxKPI = this.lines[0].MaxKPI;
              this.ReportValueID = this.lines[0].RowID;
         }
     })
    },

  },
  mounted () {
    //this.addLine()
  },
  created(){
      this.fetchData();
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
