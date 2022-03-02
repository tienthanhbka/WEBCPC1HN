<template>
  <div shadow="always" style="margin: auto;  position: relative;">
    <div>
        <el-card >
            <div style="font-weight: bold; font-size: 30px;">
                 {{ this.lines[0].Title }}
            </div>
            <div style="margin-top: 20px;" class="inline-block">
                TDV: {{ row.NameEmployee }} -- Nhóm: {{ row.IDGroup}}
             
            </div>
            <div style="margin-top: 20px;" class="inline-block">
                NKT: {{ row.NameTeacher }}
             
            </div>
            <div style="margin-top: 20px;" class="inline-block">
                NGS: {{ row.NameAccept }}
             
            </div>

            <div style="margin-top: 20px;"> Thang điểm đánh giá: 100 điểm (Từ 80 điểm trở lên mới đạt yêu cầu)</div>
     
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
          <el-col :span="22">
                <div style="font-weight: bold;">{{line.Part}}: {{line.Skill}} </div>
                 <div style="">( {{line.Target}} )</div>
                 <div >Đánh giá: {{line.Answer}} </div>
                   <div style="font-weight: bold; color: red;">( Điểm: {{line.Point}} )</div>
          </el-col>
        </el-row>
              
         </el-card>
      </div>
    </div>
  </div>
  </div>
 
</template>

<script>
import Question1 from "@/views/report/define/component/question1/index"
import Question2 from "@/views/report/define/component/question2/index"
import Question3 from "@/views/report/define/component/question3/index"
import Cookies from 'js-cookie'
import { GetAnswer } from '@/api/reportRole'
import { GetGroupEmployee } from "@/api/groups";

export default {
  name: '',
   components: {
  },
  props:['row'],

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
         sum :0
    }
  },
  watch: {
    row(){
      this.sum=0
      this.lines = []
      this.fetchData()
    }
    },
  methods: {
        point(){
          //alert('ok')
          var _this = this
          _this.sum = 0;
          this.lines.forEach(fun)

          function fun(item,index,arr) {
              if(item.point == null){
                  item.point = 0
              }
              _this.sum = parseInt(item.point)  + parseInt(_this.sum)
               // alert(_this.sum)
          }
          //alert(this.sum)
          //parseInt(_this.sum)
      },
     
 
    
    fetchData(){
      //this.coin = list_coins[this.$route.params.id]
     var req = {
         RowIDReport: this.row.IDReportNKT
     }
     GetAnswer(req).then(response =>{
         if(response.ResCode == 0){
             this.lines = response.Data;
         }
     })
    },
  

  },
  mounted () {
    //this.addLine()
  },
  created(){
      this.fetchData();
      //this.fetchGroup()
      //console.log(this.$props.row)
  }
}
</script>