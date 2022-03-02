<template>
  <div shadow="always" style="margin: auto; width: 100%; position: relative;">
    <div>
      <el-card>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Lệnh sản xuất:{{quota1.ProductionOrderIDBFO}} </span>
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Báo cáo:{{report.ReportName}}</span> 
          <!-- <el-select v-model="ReportType" placeholder="Chọn báo cáo..." @change="showReportDefine()">
            <el-option
            v-for="item in ReportDefineLst"
            :key="item.ReportDefineID"
            :label="item.ReportName"
            :value="item.ReportDefineID">
            </el-option>
        </el-select> -->
        </div>
        <!-- <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Email:</span> {{ this.Email }}
        </div> -->
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style=" margin-left: 3px;"
                >
                  <span style="font-weight: bold;"> {{ index + 1 }}. </span>
                </div>
              </el-col>
              <el-col :span="14">
                <span style="font-weight: bold;"> {{ line.Question }} </span>
                <span v-if="line.Require == 1" style="font-weight: bold;">
                  *
                </span>
              </el-col>
            </el-row>
            <el-row>
              
            <div v-if="line.Type == 1" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
            <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
              </div>
            </div>
            <div v-if="line.Type == 2" class="">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
            </div>
            </div>
            <div v-if="line.Type == 3" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
            </div>
            </div>

            <div v-if="line.Type == 5" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
             <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
            </div>
            </div>

            <div v-if="line.Type == 4" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
            </div>
            </div>
            <div v-if="line.Type == 6" class="grid-content bg-purple-light" >
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
            </div>
            </div>
            <div v-if="line.Type == 7" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
             <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
              </div>
            </div>
            <div v-if="line.Type == 8" class="grid-content bg-purple-light">
              <div v-for="(quota, index) in LineQuotaLst" :key="index" v-if="line.QuestionID==quota.QuestionID">
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị max..."
                v-model="quota.MaxValue"
              ></el-input>
              </el-col>
              <el-col :span="9">
              <el-input
              class="border"
                placeholder="Giá trị min..."
                v-model="quota.MinValue"
              ></el-input>
              </el-col>
              <el-col :span="6">
              <el-select class="border" v-model="quota.Unit" placeholder="Đơn vị...">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
              </el-col>
              </div>
            </div>
            </el-row>
          </el-card>
        </div>
      </div>
      <el-dialog title="Quét mã QR" :visible.sync="dialogFormQRCode">
        <q-r-code :id="id" @answer="QRCodeOK"></q-r-code>
      </el-dialog>
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button type="primary" icon="fas fa-plus" @click="submit">
        Submit</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import { GetReportDefine, WorkReport,GetReportDefineById } from "@/api/productionReport"
import {QuotaProductionReport} from "@/api/productionOrder"
import QRCode from "@/views/manufacturing/reportProduct/component/QRCode"
export default {
  components: {
    QRCode
  },
  props: ['quota1','report'],
  computed: {
    uploadImg() {
      return (
        "http://1.53.252.137:8080/WEBICPC1HN/FileSX/Upload?" +
        "token=" +
        Cookies.get("token")
      )
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ans: [],
      id: 0,
      lines:[],
      LineQuotaLst:[],
      // LineQuotaLst:[{
      //   MaxValue:'',
      //   MinValue:'',
      //   Unit:''
      // }],
      ReportName: "",
      ReportDefineID:'',
      Email: "",
      files: [],
      ReportType:'',
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: "",
      DateOrder:'',
      ReportDefineLst:[],
      ProductionOrderBFOLst: [],
      fileList: [],
      dialogImageUrl: "",
      dialogFormMail: false,
      dialogFormQRCode: false,
      disabled: false,
      Answer: [],
      quota:'',
      error:'',
      id: "",
      options: [{
          value: '1',
          label: 'mg'
        }, {
          value: '2',
          label: 'g'
        }, {
          value: '3',
          label: '%'
        }, {
          value: '4',
          label: 'độ'
        }
        ]
    }
  },
  watch: {
    quota1() {
      this.fetchData()
    },
    report(){
      this.fetchData()
    }
  },
  methods: {
     querySearch2(queryString, cb) {
      var links = this.ProductionOrderBFOLst
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links
      // call callback function to return suggestion objects
      cb(results)
    },
    onFileChange(file, fileList) {
      this.file = file
    },
    handleEnter() {
      alert("hello word")
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },
    handleSelect(item) {
      this.productionOrder = item.No_
      this.orderBFO = item
    },
    createFilter2(queryString) {
      return link => {
        //console.log(link)
        link = JSON.parse(JSON.stringify(link))
        return (
          link.No_.toLowerCase().indexOf(
            queryString.toLowerCase()
          ) === 0
        )
      }
    },
    QRCodeOK(string) {
      this.lines.forEach(function(item3, index3, arr3) {
        if (item3.QuestionID == string.QuestionID) {
          item3.Answer = string.Ans
        }
      })
      this.dialogFormQRCode = false
    },
    showReportDefine(){
      
      if(this.ReportType!='')
      {
      }
    },
    fetchData() {
      var req1 = {
        token: Cookies.get('token'),
        ReportDefineID: this.report.ReportDefineID
        }
        var req = {
        token: Cookies.get("token")
      }
        console.log(req)
        GetReportDefineById(req1).then(response =>{
          if(response.RespCode == 0){
           this.lines = []
          this.LineQuotaLst= []
          this.ReportName = response.ReportDefineInfo.ReportName
          this.Email = response.ReportDefineInfo.Email
          var _this = this
          response.ReportDefineInfo.ReportLineLst.forEach(myFunction)

          function myFunction(item, index, arr) {
          //   if (item.SelectAnswer != "") {
          //     item.SelectAnswer = item.SelectAnswer.split(";", 100)
          //   }
          //   if (item.Type == 6) {
              var minValue=""
              var maxValue=""
              var unit=""
              var Comment = {
                Question: item.Question,
                QuestionID: item.QuestionID,
                Require: item.Require,
                Type: item.Type
              }
              var comment={
                QuestionID: item.QuestionID,
                MinValue: minValue,
                MaxValue:maxValue,
                Unit: unit
              }
              _this.LineQuotaLst.push(comment)
            _this.lines.push(Comment)
            console.log(_this.LineQuotaLst)
            console.log(_this.lines)
          }
          }
         }),
      GetReportDefine(req).then(response => {
        if (response.RespCode == 0) {
            this.ReportDefineLst = response.ReportDefineLst
        //   this.lines = []
        //   this.LineQuotaLst= []
        //   this.ReportName = response.ReportDefineInfo.ReportName
        //   this.Email = response.ReportDefineInfo.Email
        //   var _this = this
        //   response.ReportDefineInfo.ReportLineLst.forEach(myFunction)

        //   function myFunction(item, index, arr) {
        //   //   if (item.SelectAnswer != "") {
        //   //     item.SelectAnswer = item.SelectAnswer.split(";", 100)
        //   //   }
        //   //   if (item.Type == 6) {
        //       var minValue=""
        //       var maxValue=""
        //       var unit=""
        //       var Comment = {
        //         Question: item.Question,
        //         QuestionID: item.QuestionID,
        //         Require: item.Require,
        //         Type: item.Type
        //       }
        //       var comment={
        //         QuestionID: item.QuestionID,
        //         MinValue: minValue,
        //         MaxValue:maxValue,
        //         Unit: unit
        //       }
        //       _this.LineQuotaLst.push(comment)
        //     _this.lines.push(Comment)
        //     console.log(_this.LineQuotaLst)
        //     console.log(_this.lines)
        //   }
      //      _this.lines.forEach(functi)
      //       function functi(item2,index2,arr2){
      //         console.log(item2)
      //         var minValue="1"
      //         var maxValue="1"
      //         var unit="fd"
      //         var Comment1 = {
      //           QuestionID: item2.QuestionID,
      //           MinValue: minValue,
      //           MaxValue:maxValue,
      //           Unit: unit
      //         }
      //         item2.LineQuotaLst.push(Comment1)
      //       }
            
      //       console.log(_this.lines)
        }
       })
    },
    submit() {
      
      //  var parsedobj = JSON.parse(JSON.stringify(this.lines))
      //  console.log(parsedobj)
      // var selectAn = ""
      // parsedobj.forEach(function(item, index, arr) {
      //   if (Array.isArray(item.LineQuotaLst)) {
      //     var a = ""
      //     item.Answer.forEach(function(item2, index2, arr2) {
      //       if (index2 == 0) {
      //         a += item2;
      //       } else {
      //         a += "," + item2
      //       }
      //     })
      //     item.Answer = a
      //   }

      //   // if(index==0){
      //   //   selectAn =  item.Answer
      //   // }else{
      //   //   selectAn += ";" + item.Answer
      //   // }
       //})
      // //this.lines[parsedobj[0]].Answer = selectAn
      var req = {
        token: Cookies.get("token"),
        ReportType: this.report.ReportDefineID,
        ProductionOrderID: this.quota1,
        LineQuotaLst: this.LineQuotaLst
      }
      QuotaProductionReport(req).then(res => {
        if(res.RespCode==0){
          this.$notify({
            title: "Thành công",
            message: "Tạo định mức thành công",
            type: "success",
            position: "top-left"
          })
        }
      //this.DateOrder =  Date.parse(this.quota.DateStart).toString("dd/MM/yyyy")
          //  this.$notify({
          //   title: "Sorry",
          //   message: "Tính năng này đang được phát triển",
          //   type: "info",
          //   position: "top-left"
          // })
           this.$emit("submitOK")
        
      })
    //   this.fetchData()
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    console.log(this.ProductionOrderBFOLst)
    this.fetchData()
  }
}
</script>
<style scoped>
.el-dialog__title {
  line-height: 30px;
  font-size: 18px;
  color: #303133;
  font-weight: bold;
}
</style>
