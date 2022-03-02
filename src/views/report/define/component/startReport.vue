<template>
  <div shadow="always" style="margin: auto; width: 700px; position: relative;">
    <div>
        <el-card >
            <div style="font-weight: bold; font-size: 30px;">
              {{ this.lines[0].Title }}
            </div>
            <div style="margin-top: 20px;" class="inline-block">
                Nhóm: 
              <el-select v-model="groups" clearable placeholder="Chọn nhóm">
                <el-option
                  v-for="item in groupList"
                  :key="item.idGroup"
                  :label="item.idGroup"
                  :value="item.idGroup">
                </el-option>
              </el-select>
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
                <span v-if="line.Require==1" style="font-weight: bold;"> * </span>
          </el-col>
        </el-row>
                <div v-if="line.Type == 1" class="grid-content bg-purple-light">
                <el-input placeholder="Nhập câu trả lời" v-model="line.answer"></el-input>
                </div>
               <div v-if="line.Type == 2" class="">
                   <el-radio-group v-model="line.answer"  v-for="(select, index) in line.select" :key="index">
                       <div style="width: 500px;">
                           <el-radio :label="select.ans">{{ select.ans }}</el-radio>
                       </div>
                </el-radio-group>

            </div>
             <div v-if="line.Type == 3"  class="grid-content bg-purple-light">
                   <el-checkbox-group v-model="line.answer"  >
                    <el-checkbox style="width: 500px;" v-for="(select,index) in line.select" :key="index" :label="select.ans" ></el-checkbox>
                </el-checkbox-group>
            </div>

              <div v-if="line.Type == 5"  class="grid-content bg-purple-light">
                   <el-checkbox-group v-model="line.answer"  >
                    <el-checkbox style="width: 500px;" v-for="(select,index) in line.select" :key="index" :label="select.ans" ></el-checkbox>
                </el-checkbox-group>
            </div>

               <div v-if="line.Type == 4"  class="grid-content bg-purple-light">

      <el-upload
  action="https://icpc1hn.work/api/File/UploadFileReport"
  list-type="picture-card"
   :data="line"
   v-model="line.answer"
   :on-success="uploadOk"
           ref="upload"
     :auto-upload="true"
          >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
    </div>
</el-upload>
            </div>
        
         </el-card>
      </div>
    </div>
  </div>
  
   <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000"><el-button type="primary" icon="fas fa-plus"  @click="submit" > Submit</el-button> </div>
  </div>
 
</template>

<script>
import Question1 from "@/views/report/define/component/question1/index"
import Question2 from "@/views/report/define/component/question2/index"
import Question3 from "@/views/report/define/component/question3/index"
import Cookies from 'js-cookie'
import { StartReport,WorkReport } from '@/api/report'
import { GetGroupEmployee } from "@/api/groups";

export default {
  name: '',
   components: {
  },
  props:[''],

  data () {
    return {
      lines: [],
       files: [],
      info: '',
      acc: 0,
      token: Cookies.get('token'),
      select1: [],
       fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
         groups: '',
    }
  },
  watch: {
      '$route': 'fetchData'
    },
  methods: {
      uploadOk(res,file,fileList) {
      
         this.lines.forEach(fun)
                         function fun(item, index, arr){
                             if(item.ParameterID == res.Data.paraID){
                                // console.log(item)
                                 item.answer.push(res.Data.fileName)
                             }
                          
                        }
           //console.log(this.lines)
        },
     
    submit(){
       var req = {
           IDEmployee : Cookies.get('idEmployee'),
           lines: this.lines,
           idGroup: this.groups
       }
       WorkReport(req).then(response => {
           if(response.ResCode == 0){
               this.$notify({
                   title: 'Thành công',
                   message: 'Hoàn thành báo cáo',
                   type: 'success',
                   position: 'top-left'
               })
                
               this.$router.push('/hanh-chinh/bao-cao/dinh-nghia');
           }
       })

    },
    
    fetchData(){
      //this.coin = list_coins[this.$route.params.id]
     var req = {
         ReportID: this.$route.params.id
     }
    StartReport(req).then(response =>{
      if(response.ResCode == 0){
        this.lines = response.Data;

        this.lines.forEach(myFunction)

          function myFunction(item, index, arr) {
              if (item.OptionAnswer != ''){
                var a = item.OptionAnswer.split(";;", 100);
                a.forEach(fun)
                function fun(item2, index, arr){
                  var b = { ans : "" }
                  b.ans = item2
                  item.select.push(b)
              }
              }
          }
        console.log(this.lines)
      }
     })
    },
     fetchGroup(){
       var req = {
        idEmployee: Cookies.get('idEmployee'),
        token: Cookies.get('token')
      };
       GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },

  },
  mounted () {
    //this.addLine()
  },
  created(){
      this.fetchData();
      this.fetchGroup()
  }
}
</script>