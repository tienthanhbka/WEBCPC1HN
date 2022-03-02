<template>
  <div shadow="always" style="margin: auto; width: 100%; position: relative;">
    <div>
      <el-card>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Lệnh sản xuất: </span>
          <span style=" font-size: 13px;">{{
            quota1.ProductionOrderIDBFO
          }}</span>
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Báo cáo:</span>
          <span style=" font-size: 13px;">{{ report.ReportName }}</span>
        </div>
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card v-if="line.Type==7">
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
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>
              <div v-if="line.Type == 2" class="">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>
              <div v-if="line.Type == 3" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>

              <div v-if="line.Type == 4" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>

              <!-- <div v-if="line.Type == 5" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div> -->
              <div v-if="line.Type == 6" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>
              <div v-if="line.Type == 7" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>
              <div v-if="line.Type == 8" class="grid-content bg-purple-light">
                <div
                  v-for="(quota, index) in LineQuotaLst"
                  :key="index"
                  v-if="line.QuestionID == quota.QuestionID"
                >
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min1..."
                      v-model="quota.MinValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị min2..."
                      v-model="quota.Value2"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max1..."
                      v-model="quota.Value3"
                    ></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      class="border"
                      placeholder="Giá trị max2..."
                      v-model="quota.MaxValue"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-select
                      class="border"
                      v-model="quota.Unit"
                      placeholder="Đơn vị..."
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </div>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        type="primary"
        icon="fas fa-plus"
        @click="submit"
        v-if="this.Quota == null"
      >
        Tạo định mức</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-edit-outline"
        @click="submit"
        v-if="this.Quota != null"
      >
        Cập nhật</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {
  GetReportDefine,
  GetReportDefineById
} from "@/api/productionReport"
import {
  QuotaProductionReport,
  UpdateQuotaProductionReport
} from "@/api/productionOrder"
import QRCode from "@/views/manufacturing/reportProduct/component/QRCode"
export default {
  components: {
    QRCode
  },
  props: ["quota1", "report", "Quota"],
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
      lines: [],
      LineQuotaLst: [],
      ReportName: "",
      ReportDefineID: "",
      Email: "",
      files: [],
      ReportType: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: "",
      DateOrder: "",
      ReportDefineLst: [],
      ProductionOrderBFOLst: [],
      fileList: [],
      dialogImageUrl: "",
      dialogFormMail: false,
      dialogFormQRCode: false,
      disabled: false,
      Answer: [],
      quota: "",
      error: "",
      id: "",
      options: [
        {
          value: "1",
          label: "mg"
        },
        {
          value: "2",
          label: "g"
        },
        {
          value: "3",
          label: "%"
        },
        {
          value: "4",
          label: "độ"
        }
      ]
    }
  },
  watch: {
    quota1() {
      this.fetchData()
    },
    report() {
      this.fetchData()
    },
    Quota() {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      var req1 = {
        token: Cookies.get("token"),
        ReportDefineID: this.report.ReportDefineID
      }
      var req = {
        token: Cookies.get("token")
      }
      GetReportDefineById(req1).then(response => {
        if (response.RespCode == 0) {
          this.lines = []
          this.LineQuotaLst = []
          this.ReportName = response.ReportDefineInfo.ReportName
          this.Email = response.ReportDefineInfo.Email
          var _this = this
          response.ReportDefineInfo.ReportLineLst.forEach(myFunction)

          function myFunction(item, index, arr) {
            if (_this.Quota == null) {
              var minValue = ""
              var maxValue = ""
              var value2 = ""
              var value3 = ""
              var unit = ""
              var Comment = {
                Question: item.Question,
                QuestionID: item.QuestionID,
                Require: item.Require,
                Type: item.Type
              }
              var comment = {
                QuestionID: item.QuestionID,
                MinValue: minValue,
                MaxValue: maxValue,
                Value2: value2,
                Value3: value3,
                Unit: unit
              }
              _this.LineQuotaLst.push(comment)
              _this.lines.push(Comment)
            } else {
              _this.Quota.forEach(function(item2, index2, arr2) {
                if (item2.QuestionID == item.QuestionID) {
                  var Comment = {
                    Question: item.Question,
                    QuestionID: item.QuestionID,
                    Require: item.Require,
                    Type: item.Type
                  }
                  var comment = {
                    QuestionID: item.QuestionID,
                    MinValue: item2.MinValue,
                    MaxValue: item2.MaxValue,
                    Value2: item2.Value2,
                    Value3: item2.Value3,
                    Unit: item2.Unit,
                    RowID: item2.RowID
                  }
                  _this.LineQuotaLst.push(comment)
                  _this.lines.push(Comment)
                }
              })
            }
          }
        }
      })
    },
    submit() {
      var req = {
        token: Cookies.get("token"),
        ReportType: this.report.ReportDefineID,
        ProductionOrderID: this.quota1.ProductionOrderID,
        LineQuotaLst: this.LineQuotaLst
      }
      var req1 = {
        token: Cookies.get("token"),
        ReportType: this.report.ReportDefineID,
        QuotaID: "",
        ProductionOrderID: this.quota1.ProductionOrderID,
        LineQuotaLst: this.LineQuotaLst
      }
      if (this.Quota == null) {
        QuotaProductionReport(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Tạo định mức thành công",
              type: "success"
            })
          }
          this.$emit("submitOK")
        })
      } else {
        UpdateQuotaProductionReport(req1).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Cập nhật định mức thành công",
              type: "success"
            })
          }
          this.$emit("UpdateOK");
        })
      }
    },
    initForm() {
      if (this.quota == null) {
        this.LineQuotaLst = []
      } else {
        this.LineQuotaLst = this.quota
      }
    }
  },
  created() {
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
