<template>
  <div shadow="always" style="margin: auto; position: relative;">
    <div style="font-weight: bold; text-align: center;color: #909399;font-size: large;" >TẠO MẪU BÁO CÁO</div>
      <div style="margin-top: 20px;"></div>
    <div>
      <el-card>
        Tên báo cáo
        <el-input placeholder="Nhập tiêu đề" v-model="title"></el-input>
        <div style="margin-top: 20px;">
          <span class="demonstration">Email</span>
          <el-select
            v-model="Email"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Nhập Email người nhận báo cáo"
            style="width:100%;"
          >
            <el-option
              v-for="item in Email"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <el-col :span="1">
                <el-tooltip v-if="index > 0" content="Up">
                  <el-button type="text" @click="up(index)"
                    ><i class="fas fa-arrow-up"></i
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="index == 0 && lines.length > 1"
                  content="Down"
                >
                  <el-button type="text" @click="dow(index)"
                    ><i class="fas fa-arrow-down"></i
                  ></el-button>
                </el-tooltip>
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 0px; margin-left: 3px;"
                ></div>
              </el-col>
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 10px; margin-left: 3px;"
                >
                  <span> {{ index }}. </span>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <el-input
                    placeholder="Nhập tiêu đề nội dung (VD: Địa chỉ, Họ và tên,...)"
                    v-model="line.Question"
                  ></el-input>
                </div>
              </el-col>
              <el-col style="margin-left: 20px;" :span="6"
                ><div class="grid-content bg-purple">
                  <el-select
                    v-model="line.Type"
                    placeholder="Chọn loại câu hỏi"
                    @change="ChangeQuestion(index)"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <component
              :data="index"
              :is="line.currentComponent"
              :SelectLst="line.SelectAnswer"
              @change="addOK"
            ></component>
            <el-tooltip></el-tooltip>
            <el-switch
              v-model="line.Require"
              style="float: right; margin-top:10px;"
              inactive-text="Bắt buộc"
              active-value="1"
              inactive-value="0"
            ></el-switch>
            <el-tooltip content="Thêm câu hỏi" placement="top"
              ><el-button
                v-if="index + 1 === lines.length"
                @click="addLine"
                type="text"
                ><i class="fas fa-plus"></i></el-button
            ></el-tooltip>
          </el-card>
        </div>
      </div>
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="CopyDefine"
      >
        Xác nhận tạo mẫu báo cáo</el-button
      >
    </div>
  </div>
</template>
<script>
import Question1 from "@/views/manufacturing/defineReport/component/question1/index"
import Question2 from "@/views/manufacturing/defineReport/component/question2/index"
import Question3 from "@/views/manufacturing/defineReport/component/question3/index"
import Question4 from "@/views/manufacturing/defineReport/component/question4/index"
import Question5 from "@/views/manufacturing/defineReport/component/question5/index"
import Question6 from "@/views/manufacturing/defineReport/component/question6/index"
import Question7 from "@/views/manufacturing/defineReport/component/question7/index"
import Question8 from "@/views/manufacturing/defineReport/component/question8/index"
import { createReportDefine,GetReportDefineById,UpdateReportLineDefine,UpdateReportDefineHeader } from "@/api/productionReport"
import Cookies from "js-cookie"
export default {
  name: 'PhoneNumberLine',
  components: {
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
    Question7,
    Question8
  },
  props: ["report"],
  data() {
    return {
      lines: [],
      acc: 0,
      title: "",
      EmployeeID:'',
      currentComponent: 'question1',
      blockRemoval: true,
      Email: [],

      types: [
        {
          label: "Đoạn văn",
          value: "1"
        },
        {
          label: "Trắc nghiệm",
          value: "2"
        },
        {
          label: "Hộp kiểm",
          value: "3"
        },
        {
          label: "Tải ảnh",
          value: "4"
        },
        {
          label: "Email",
          value: "5"
        },
        {
          label: "Ngày",
          value: "6"
        },
        {
          label: "Số",
          value: "7"
        },
        {
          label: "Quét QR",
          value: "8"
        }
      ]
    }
  },
  watch: {
    lines() {
      this.blockRemoval = this.lines.length <= 1
    },
    report(){
      this.resetForm()
      this.initForm()
    }
  },
  created(){
    this.initForm()
  },
  methods: {
    resetForm(){
          this.lines= []
       this.Email= []
      this.currentComponent= 'question1'
      this.title= ''
    },
    addLine() {
      let checkEmptyLines = this.lines.filter(line => line.Question === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
      this.lines.push({
        Question: null,
        Type: null,
        currentComponent: 'question1',
        SelectAnswer: [],
        Require: 1
      })
    },
    CopyDefine() {
      console.log(this.lines)
      var parsedobj = JSON.parse(JSON.stringify(this.Email))
      var selectAn = ""
      parsedobj.forEach(function(item, index, arr) {
        if (index == 0) {
          selectAn += item
        } else {
          selectAn += ";" + item
        }
      })
      this.lines.forEach(function(item,index,arr){
        var selectAn1 = ""
        console.log(item.SelectAnswer)
        if(item.SelectAnswer!=''){
        var parsedobj2 = JSON.parse(JSON.stringify(item.SelectAnswer))
      //selectAn1 = item.SelectAnswer
      parsedobj2.forEach(function(item2, index2, arr2) {
        if (index2 == 0) {
          selectAn1 += item2.select
        } else {
          selectAn1  += ";" + item2.select
        }
      })
         }
         else{
          selectAn1 =''
        }
        item.SelectAnswer=selectAn1
      })
        
        // var req2={
        //   token: Cookies.get("token"),
        //   Type:item.Type,
        //   Question:item.Question,
        //   SelectAnswer: selectAn1,
        //   Require: item.Require,
        //   QuestionID: item.QuestionID
        // }
        //UpdateReportLineDefine(req2).then(res=>{
        //   this.$message({
        //   message: "Cập nhật thành công",
        //   type: "success"
        // })
        //})
      //})
    //   var req1 = {
    //     token: Cookies.get("token"),
    //     ReportName: this.title,
    //     EmployeeID: this.EmployeeID,
    //     Email: selectAn,
    //     ReportDefineID: this.report
    //   }
    //   UpdateReportDefineHeader(req1).then(res => {
    //     this.$message({
    //       message: "Cập nhật thành công",
    //       type: "success"
    //     })
    //     this.$emit("updateOK", this.ReportDefineLst)
    //   })
      // var ok = false
      // this.lines.forEach(fun)
      // function fun(item, index, arr) {
      //   if (item.Type == 5) {
      //     ok = true
      //   }
      // }
      // if (this.title == ''||this.Email=='') {
      //   this.$message.error("Vui lòng điền đầy đủ thông tin");
      //  } else {
      //   createReportDefine(req).then(respon => {
      //     if (respon.RespCode == 0) {
      //       this.$message({
      //         message: "Tạo định nghĩa thành công",
      //         type: "success"
      //       })
      //       this.$emit("click", "a")
      //     }
      //   })
      // }
       var req = {
        token: Cookies.get("token"),
        ReportLineLst: this.lines,
        ReportName: this.title,
        Email: selectAn
      }
      // var ok = false
      // this.lines.forEach(fun)
      // function fun(item, index, arr) {
      //   if (item.Type == 5) {
      //     ok = true
      //   }
      // }
      if (this.title == ''||this.Email=='') {
        this.$message.error("Vui lòng điền đầy đủ thông tin");
       } else {
        createReportDefine(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$message({
              message: "Tạo báo cáo thành công",
              type: "success"
            })
            this.$emit("copyOK", "a")
          }
        })
      }
    },
    // UpdateDefine() {
    //   this.$notify({
    //     title: "Sorry",
    //     message: "Tính năng này đang được phát triển",
    //     type: "info",
    //     position: "top-left"
    //   })
    // },
    removeLine(lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1)
    },
    ChangeQuestion(index) {
      this.lines[index].currentComponent = "question" + this.lines[index].Type
    },
    addOK(selects) {
      // console.log(selects)
      // var parsedobj = JSON.parse(JSON.stringify(selects))
      //  var selectAn = []
      // parsedobj.forEach(function(item, index, arr) {
      //   if (index == 0) {
      //     selectAn = item.select
      //  } else {
      //     selectAn.push(item.select)
      //   }
      // })
      // this.lines[selects[0].arr].SelectAnswer = selectAn
      var parsedobj = JSON.parse(JSON.stringify(selects))
      this.lines[parsedobj[0].arr].SelectAnswer = parsedobj
    //  var parsedobj = JSON.parse(JSON.stringify(selects))
    //   var selectAn = ""
    //   parsedobj.forEach(function(item, index, arr) {
    //     if (index == 0) {
    //       selectAn = item.select
    //     } else {
    //       selectAn += ";" + item.select
    //     }
    //   })
    //   this.lines[parsedobj[0].arr].SelectAnswer = selectAn
    },
    up(index) {
      var b = this.lines[index]
      this.lines[index] = this.lines[index - 1]
      this.lines[index - 1] = b
      this.acc++
    },
    dow(index) {
      var b = this.lines[index]
      this.lines[index] = this.lines[index + 1]
      this.lines[index + 1] = b
      this.acc++
    },
    initForm() {
      if (this.report == null) {
        this.title = null
        this.Email = []
        this.lines = []
      } else {
        GetReportDefineById({
          token: Cookies.get('token'),
          ReportDefineID: this.report
        }).then(res=>{
          if(res.RespCode==0){
            this.title = res.ReportDefineInfo.ReportName
            this.EmployeeID = res.ReportDefineInfo.EmployeeID
            this.Email = res.ReportDefineInfo.Email.split(';',100)
            var _this = this
            //this.report.ReportLineLst.SelectAnswer=this.report.ReportLineLst.SelectAnswer.split(';',100)
            res.ReportDefineInfo.ReportLineLst.forEach(function(item,index,arr){
              
              var a ={
               Question: "",
                QuestionID: "",
                Type: 1,
                Require:1,
                currentComponent: "question1",
                SelectAnswer: [],
              }
              a.Question = item.Question
              a.QuestionID=item.QuestionID
              a.Type=item.Type
              a.Require = item.Require
              a.SelectAnswer = item.SelectAnswer.split(';',100)
              if(item.Type==2){
                a.currentComponent = 'question2'
              }
              if(item.Type==3){
                a.currentComponent = 'question3'
              }
              if(item.Type==4){
                a.currentComponent = 'question4'
              }
              if(item.Type==5){
                a.currentComponent = 'question5'
              }
              if(item.Type==6){
                a.currentComponent = 'question6'
              }
              if(item.Type==7){
                a.currentComponent = 'question7'
              }
              if(item.Type==8){
                a.currentComponent = 'question8'
              }
              _this.lines.push(a)
            })
          }
        })
        
      }
    }
  },
  mounted() {
    //this.addLine()
  }
}
</script>
<style scoped>
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
