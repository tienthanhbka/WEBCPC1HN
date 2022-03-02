<template>
  <div shadow="always" style="margin: auto; width: 100%; position: relative;">
    <div>
      <el-card>
        <div style="font-weight: bold; font-size: 30px;">
          {{ this.ReportName }}
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
                :action="uploadImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="uploadOk"
                ref="uploadFile"
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
              <el-input-number v-model="line.Answer"></el-input-number>
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
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie"
export default {
  props: ["report"],
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
      lines: [],
      dialogImageUrl: "",
      dialogVisible: false,
      ans: [],
      id: 0,
      ReportName: "",
      Email: [],
      files: [],
      info: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: "",
      select1: [],
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
    report() {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.lines = []
      this.ReportName = this.report.ReportName
      this.Email = this.report.Email
      var _this = this
      this.report.ReportLineLst.forEach(myFunction)
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
  },
  created() {
    this.fetchData();
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
