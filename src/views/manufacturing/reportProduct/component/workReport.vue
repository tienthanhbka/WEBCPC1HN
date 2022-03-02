<template>
  <div shadow="always" style="margin: auto; width: 100%; position: relative;">
    <div>
      <el-card>
        <div style="font-weight: bold; font-size: 30px;">
          {{ this.ReportName }}
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Lệnh sản xuất: </span>
          {{ this.ProductionOrderIDBFO }}
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold; margin-bottom: 10px;"
            >Email người nhận:</span
          >
          <span v-for="(email, index) in Email" :key="index">
            <br />
           <i class="far fa-envelope">{{ email }}</i>
          </span>
        </div>
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
            <el-row >
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
            </div>
            <div v-if="line.Type == 1" class="grid-content bg-purple-light">
              <el-input
                placeholder="Nhập câu trả lời"
                v-model="line.Answer"
              ></el-input>
            </div>
            <div v-if="line.Type == 2" class="">
              <el-radio-group
                v-model="line.Answer"
                v-for="(select, index) in line.SelectAnswer"
                :key="index"
              >
                <div style="width: 500px;">
                  <el-radio :label="select">{{ select }}</el-radio>
                </div>
              </el-radio-group>
            </div>
            <div v-if="line.Type == 3" class="grid-content bg-purple-light">
              <el-checkbox-group v-model="line.Answer">
                <el-checkbox
                  style="width: 500px;"
                  v-for="(select, index) in line.SelectAnswer"
                  :key="index"
                  :label="select"
                  >{{ select }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div v-if="line.Type == 5" class="grid-content bg-purple-light">
              <el-checkbox-group v-model="line.Answer">
                <el-checkbox
                  style="width: 500px;"
                  v-for="(select, index) in line.SelectAnswer"
                  :key="index"
                  :label="select"
                  >{{ select }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div v-if="line.Type == 4" class="grid-content bg-purple-light">
              <el-upload
                v-model="line.Answer"
                :action="
                  'http://1.53.252.137:8080/WEBICPC1HN/FileSX/Upload?token=' +
                    token +
                    '&id=' +
                    line.QuestionID
                "
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="uploadOk"
                :auto-upload="true"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
            <div v-if="line.Type == 6" class="grid-content bg-purple-light">
              <el-date-picker
                v-model="line.Answer"
                type="date"
                placeholder="Pick a date"
                default-value="2010-10-01"
              >
              </el-date-picker>
            </div>
            <div v-if="line.Type == 7" class="grid-content bg-purple-light">
              <el-input-number v-model.number="line.Answer"></el-input-number>
            </div>
            <div v-if="line.Type == 8" class="grid-content bg-purple-light">
              <el-tooltip content="Quét QR">
                <el-button
                  type="info"
                  size="mini"
                  @click="qrCode(line.QuestionID)"
                  ><i class="fas fa-qrcode"></i
                ></el-button>
              </el-tooltip>
              <span>{{ stringQR }}</span>
            </div>
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
import { GetReportDefineById, WorkReport } from "@/api/productionReport"
import {
  GetProductionOrderById
} from "@/api/productionOrder"
import QRCode from "@/views/manufacturing/reportProduct/component/QRCode"
export default {
  components: {
    QRCode
  },
  props: ["Rtype", "order", "quotaLst"],
  computed: {},
  data() {
    return {
      lines: [],
      dialogImageUrl: "",
      dialogVisible: false,
      ans: [],
      destroy: "",
      id: 0,
      ReportName: "",
      Email: [],
      files: [],
      info: "",
      MaxKPI: 0,
      ReportValueID: 0,
      ProductionOrderIDBFO:'',
      stringQR: "",
      acc: 0,
      token: "",
      select1: [],
      fileName: "",
      fileList: [],
      dialogImageUrl: "",
      dialogFormMail: false,
      dialogFormQRCode: false,
      disabled: false,
      Answer: [],
      id: ""
    }
  },
  watch: {
    Rtype() {
      this.fetchData()
    },
    order(){
      this.fetchData()
    }
  },
  methods: {
    uploadOk(res, file, fileList) {
      this.fileName = res.FileName.split("(")[1]
      var Qid = this.fileName.split(")")[0]
      this.lines.forEach(fun)
      function fun(item, index, arr) {
        if (item.QuestionID == Qid) {
          item.Answer.push(res.FileName)
        }
      }
    },
    handleRemove(file, fileList) {
    },
    qrCode(id) {
      this.id = id
      this.dialogFormQRCode = true
    },
    QRCodeOK(string) {
      this.stringQR = string.Ans
      this.lines.forEach(function(item3, index3, arr3) {
        if (item3.QuestionID == string.QuestionID) {
          item3.Answer = string.Ans
        }
      })
      this.dialogFormQRCode = false
    },
    fetchData() {
      var req = {
        token: Cookies.get("token"),
        ReportDefineID: this.Rtype
      }
      GetReportDefineById(req).then(response => {
        if (response.RespCode == 0) {
          this.lines = []
          this.ReportName = response.ReportDefineInfo.ReportName
          this.Email = response.ReportDefineInfo.Email.split(";", 100)
          var _this = this
          response.ReportDefineInfo.ReportLineLst.forEach(myFunction)

          function myFunction(item, index, arr) {
            if (item.SelectAnswer != "") {
              item.SelectAnswer = item.SelectAnswer.split(";", 100)
            }
            if (item.Type == 6) {
              var a = ""
              var Comment = {
                Answer: a,
                Question: item.Question,
                QuestionID: item.QuestionID,
                Require: item.Require,
                SelectAnswer: item.SelectAnswer,
                Type: item.Type
              }
            } else {
              var a = []
              var Comment = {
                Answer: a,
                Question: item.Question,
                QuestionID: item.QuestionID,
                Require: item.Require,
                SelectAnswer: item.SelectAnswer,
                Type: item.Type
              }
            }

            _this.lines.push(Comment)
          }
        }
      }),
       GetProductionOrderById({
            token: Cookies.get('token'),
          ProductionOrderById: this.order
        }).then(res=>{
          if(res.RespCode==0){
            this.ProductionOrderIDBFO = res.ProductionOrderInfo.ProductionOrderIDBFO
          }
        })
    },
    submit() {
      var parsedobj = JSON.parse(JSON.stringify(this.lines))
      var selectAn = ""
      var b = []
      var _this = this
      parsedobj.forEach(function(item, index, arr) {
        if (Array.isArray(item.Answer)) {
          var a = ""
          item.Answer.forEach(function(item2, index2, arr2) {
            if (index2 == 0) {
              a += item2
            } else {
              a += "," + item2
            }
          })
          item.Answer = a
        }
        _this.quotaLst.forEach(function(item2, index2, arr2) {
          if (item2.QuestionID == item.QuestionID) {
            var comment = {
              Answer: item.Answer,
              Question: item.Question,
              QuestionID: item.QuestionID,
              MaxValue: item2.MaxValue,
              MinValue: item2.MinValue,
              Unit: item2.Unit,
              Value2: item2.Value2,
              Value3: item2.Value3,
              RowID: item2.RowID,
              ProductionOrderID: _this.order.ProductionOrderID
            }
            b.push(comment)
          }
        })
      });
      var req = {
        token: Cookies.get("token"),
        ReportType: this.Rtype,
        ProductionOrderID: this.order,
        ProductionOrderIDBFO: this.ProductionOrderIDBFO,
        LineAnswerLst: b
      }
      WorkReport(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Báo cáo thành công",
            type: "success"
          })
          this.$emit("submitOK");
        }
      })
    }
  },
  created() {
    this.stringQR = ""
    this.token = Cookies.get("token")
    this.fetchData()
  }
}
</script>
<style >
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
