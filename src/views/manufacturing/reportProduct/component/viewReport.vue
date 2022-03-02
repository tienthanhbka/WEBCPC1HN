<template>
  <div
    shadow="always"
    style="margin: auto; width: 100%; position: relative; padding-bottom: 100px;"
  >
    <div>
      <el-card>
        <div style="font-weight: bold; font-size: 30px; color: #777777;">
          {{ Quota.ReportName }}
        </div>
        <div style=" font-size: 15px; color: #777777;margin-top: 10px;">
          <span style="font-weight: bold;">Lệnh sản xuất:</span>
          <span style=" font-size: 13px;">{{
            Quota.OrderProductionIdBFO
          }}</span>
        </div>
        <!-- <div style="font-size: 15px; color: #777777;margin-top: 10px;">
          <span style="font-weight: bold;">Sản phẩm:</span>
          <span style=" font-size: 13px;">{{ Rtype.Product }}</span>
        </div> -->
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Nhân viên:</span>
          <span style=" font-size: 13px;">{{Quota.EmployeeName}}</span>
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Thời gian báo cáo:</span>
          <span style=" font-size: 13px;">{{ Quota.Time }}</span>
        </div>
      </el-card>
    </div>
    <div :key="acc">
      <div
        v-for="(line, index) in lines.LineAnswerLst"
        :key="index"
        class="row"
      >
        <div>
          <el-card>
            <div slot="header">
            <el-row>
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style=" margin-left: 3px;"
                >
                  <!-- <i class="far fa-question-circle"></i> -->
                  <span style="font-weight: bold;"> {{ index + 1 }}. </span>
                </div>
              </el-col>
              <el-col :span="14">
                <span style="font-weight: bold;"> {{ line.Question }} </span>
              </el-col>
            </el-row>
            </div>
            <div class="grid-content bg-purple-light">
              <div
                v-for="(select, index) in line.Answer"
                :key="index"
                v-if="
                  line.Type == 1 ||
                    line.Type == 2 ||
                    line.Type == 3 ||
                    line.Type == 6 ||
                    line.Type == 5 ||
                    line.Type == 8
                "
              >
                - {{ select }}
              </div>
            </div>
             <div class="grid-content bg-purple-light" v-if="line.Type == 7">
              <div
                v-for="(select, index) in line.Answer"
                :key="index"
              >
                - {{ select }}
                </div>
                <span class="st-icon-pandora" style="color:red;">&#32;&#32;&#32;&#32;&#32;Định mức </span>
                ({{line.MinValue}},{{line.Value2}},{{line.Value3}},{{line.MaxValue}})
            </div>
            <div class="grid-content bg-purple-light">
              <div
                class="demo-image__preview"
                v-for="(select, index) in line.Answer"
                :key="index"
                v-if="line.Type == 4"
              >
                <a
                  :href="
                    'http://1.53.252.137:8080/WEBICPC1HN/File/Download?FileName=' +
                      select +
                      '&token=' +
                      token
                  "
                >
                  <el-image
                    style="width: 100px; height: 100px; float: left;"
                    :src="
                      'http://1.53.252.137:8080/WEBICPC1HN/File/Download?FileName=' +
                        select +
                        '&token=' +
                        token
                    "
                    :preview-src-list="line.Answer"
                  >
                  </el-image>
                </a>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div style="position:fixed; bottom: 50px;right: 40px;z-index: 1000">
      <el-button type="primary" @click="Confirm"
        ><i class="fas fa-spell-check"></i> Duyệt</el-button
      >
    </div>
    <el-dialog title="Duyệt báo cáo" :visible.sync="dialogFormAcceptReport">
      <note-report :reportID='value'></note-report>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NoteReport from "@/views/manufacturing/reportProduct/component/noteReport"
import Cookies from "js-cookie"
import { GetReportById,AcceptReport } from "@/api/productionReport"
export default {
  props: ["Rtype", "Quota"],
  components: {
    NoteReport
  },
  data() {
    return {
      lines: [],
      id: 0,
      files: [],
      info: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      value:'',
      token: Cookies.get("token"),
      select1: [],
      fileList: [],
      dialogImageUrl: "",
      dialogFormAcceptReport: false,
      disabled: false
    }
  },
  watch: {
    Quota() {
      this.fetchData()
    }
  },
  methods: {
    uploadOk(res, file, fileList) {
      this.lines.forEach(fun)
      function fun(item, index, arr) {
        if (item.ParameterID == res.Data.paraID) {
          item.answer.push(res.Data.fileName)
        }
      }
    },
    Confirm() {
        var req={
            token: Cookies.get('token'),
            ReportID:this.Quota.LineAnswerLst[0].ReportID,
            Status:3,
            Note:''
        }
        AcceptReport(req).then(response => {
           if(response.RespCode == 0){
               this.$message({
                   message: 'Duyệt báo cáo thành công',
                   type: 'success',
               })
           }
       })
       this.$emit('acceptOK')
    },
    fetchData() {
      this.lines = this.Quota
      var a = ""
      this.lines.LineAnswerLst.forEach(myFunction)

      function myFunction(item, index, arr) {
        if (item.Answer != "") {
          item.Answer = item.Answer.split(",", 100)
          if (item.Type == 4) {
            item.Answer.forEach(fun2)
            function fun2(item2, index, arr) {
              item2 = item2.split("(")[0]
              item.Answer.push(item2)
            }
          }
        }
      }
    }
  },
  created(){
      this.fetchData()
    }

}
</script>
<style scoped>
.el-dialog__title {
  line-height: 30px;
  font-size: 18px;
  font-weight: 700;
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
