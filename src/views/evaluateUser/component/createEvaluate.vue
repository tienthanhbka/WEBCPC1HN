s<template>
  <div style="font-family: arial,sans-serif,tahoma;">
    <div class="box-header">
      <h3 class="title-box text-center">PHIẾU ĐÁNH GIÁ NHÂN SỰ</h3>
      <p class="row-box text-center">
        Loại đánh giá: {{ CriteriaHeaderInfo.TypeEvaluate | typeEval }}
        <span v-if="CriteriaHeaderInfo.TypeEvaluate != 'TV'"
          >- {{ CriteriaHeaderInfo.WorkOld }} tháng</span
        >
      </p>
      <p class="row-box text-center" v-if="CriteriaHeaderInfo.DateEndEvalue">
        Thời điểm đánh giá:
        {{
          Date.parse(CriteriaHeaderInfo.DateEndEvalue).toString("dd/MM/yyyy")
        }}
      </p>
      <div class="info-box">
        <el-row>
          <el-col :xs="24" :lg="6" style="text-align: -webkit-center;">
            <div class="avatar">
              <img :src="linkImg" alt="avatar" />
            </div>
          </el-col>
          <el-col :xs="24" :lg="18" class="info-content">
            <el-row>
              <el-col :xs="24" :lg="12">
                <p class="row-box">
                  Họ tên: {{ CriteriaHeaderInfo.EmployeeName }}
                </p>
                <p class="row-box">
                  Điện thoại:
                  {{ CriteriaHeaderInfo.EmployeeID }}
                </p>
                <p class="row-box">Vị trí: {{ employee.Postition }}</p>
              </el-col>
              <el-col :xs="24" :lg="12">
                <p class="row-box">
                  Mã số: {{ CriteriaHeaderInfo.EmployeeCode }}
                </p>
                <p class="row-box" v-if="employee.DateStartWork">
                  Ngày vào làm:
                  {{
                    Date.parse(employee.DateStartWork).toString("dd/MM/yyyy")
                  }}
                </p>
                <p class="row-box">Phòng ban: {{ employee.Department }}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="logo">
        <img
          src="https://icpc1hn.work/static/img/cpc1hn-logo.3c3ec0d0.png"
          width="33"
          height="28"
          alt="logo"
        />
      </div>
      <div class="barcode">
        <qrcode-vue :value="barCode" :size="60" level="H"></qrcode-vue>
      </div>
    </div>
    <div
      class="box-content"
      v-for="(criteria1, index) in evaluateLst"
      :key="'lines' + index"
    >
      <p class="row-box title-content">
        Tiêu chí:
        {{ criteria1.ReferenceDes }}
      </p>
      <div
        :class="criteria1.value.length > 1 ? 'content' : ''"
        v-for="(item, index2) in criteria1.value"
        :key="index2"
      >
        <p class="row-box text-italic" style="color: #0277bc;">
          {{ item.CriteriaName }}
          <span style="color:red;" v-if="item.CriteriaType == 1">*</span>
        </p>
        <p class="row-box text-italic" v-if="item.Description">
          Mô tả: {{ item.Description }}
        </p>
        <el-row :gutter="20">
          <el-col :xs="24" :lg="8">
            <div
              style="height:200px"
              class="card-chart"
              v-if="item.ResultWorkLst.length > 0"
            >
              <result-chart :chartData="item.ResultWorkLst"></result-chart>
            </div>
          </el-col>
          <el-col
            :xs="24"
            :lg="16"
            :style="item.ResultWorkLst.length > 0 ? '' : 'width: 100%'"
          >
            <p class="row-box">
              Kết quả/ định mức:
              <contenteditable
                tag="span"
                @change="checkInput"
                :contenteditable="
                  !item.EmployeeNameRate ||
                  (item.EmployeeNameRate && item.EmployeeIDRate == UserName)
                    ? isEditable
                    : !isEditable
                "
                v-model="item.Quantity"
                class="t-hover result"
              />/
              <contenteditable
                tag="span"
                :contenteditable="!isEditable"
                v-model="item.Quota"
                class="t-hover result"
              />
              <span style="margin-left:5px" class="row-box" v-if="item.Unit"
                >( {{ item.Unit }} )</span
              >
            </p>
            <div style="display:flex">
              <p class="row-box">
                Đánh giá:
              </p>
              <el-rate
                :disabled="
                  !item.EmployeeNameRate ||
                  (item.EmployeeNameRate && item.EmployeeIDRate == UserName)
                    ? !isEditable
                    : isEditable
                "
                style="margin-top:5px;"
                v-model="item.Rate"
                :texts="['Không đạt', 'Không đạt', 'Đạt', 'Đạt', 'Đạt']"
                show-text
              >
              </el-rate>
            </div>

            <p class="row-box">
              Lý do (chấm đạt hay trượt)
            </p>
            <p class="row-box border-row text-italic">
              <contenteditable
                tag="span"
                spellcheck="false"
                :contenteditable="
                  !item.EmployeeNameRate ||
                  (item.EmployeeNameRate && item.EmployeeIDRate == UserName)
                    ? isEditable
                    : !isEditable
                "
                v-model="item.Comment"
                class="comment"
              />
            </p>
          </el-col>
        </el-row>
        <p
          class="row-box text-right"
          v-if="item.EmployeeNameRate && item.TimeRate"
        >
          <span style="font-weight:600">Người đánh giá: </span>
          <span class="text-italic">
            {{ item.EmployeeNameRate }} - ngày
            {{ Date.parse(item.TimeRate).toString("dd/MM/yyyy") }}</span
          >
        </p>
      </div>
    </div>
    <!-- <div v-for="(criteria, index) in evaluatedLst" :key="'lines1' + index">
      <div class="box-content">
        <p class="row-box title-content">
          Tiêu chí:
          {{ criteria.ReferenceDes }}
        </p>
        <div v-for="(item, index2) in criteria.value" :key="index2">
          <div
            :class="criteria.value.length > 1 ? 'content' : ''"
            v-if="item.EmployeeIDRate == UserName"
          >
            <p class="row-box text-italic" style="color:#0277bc">
              {{ item.CriteriaName }}
              <span style="color:red;" v-if="item.CriteriaType == 1">*</span>
            </p>
            <p class="row-box text-italic" v-if="item.Description">
              Mô tả: {{ item.Description }}
            </p>
            <el-row :gutter="20">
              <el-col :xs="24" :lg="8">
                <div
                  style="height:200px"
                  class="card-chart"
                  v-if="item.ResultWorkLst.length > 0"
                >
                  <result-chart :chartData="item.ResultWorkLst"></result-chart>
                </div>
              </el-col>
              <el-col
                :xs="24"
                :lg="16"
                :style="item.ResultWorkLst.length > 0 ? '' : 'width: 100%'"
              >
                <p class="row-box">
                  Kết quả/ định mức:
                  <contenteditable
                    tag="span"
                    @change="checkInput"
                    :contenteditable="isEditable"
                    v-model="item.Quantity"
                    class="t-hover result"
                  />/
                  <contenteditable
                    tag="span"
                    :contenteditable="!isEditable"
                    v-model="item.Quota"
                    class="t-hover result"
                  />
                  <span style="margin-left:5px" class="row-box" v-if="item.Unit"
                    >( {{ item.Unit }} )</span
                  >
                </p>
                <div style="display:flex">
                  <p class="row-box">
                    Đánh giá:
                  </p>
                  <el-rate
                    style="margin-top:5px;"
                    v-model="item.Rate"
                    :texts="['Không đạt', 'Không đạt', 'Đạt', 'Đạt', 'Đạt']"
                    show-text
                  >
                  </el-rate>
                </div>

                <p class="row-box">
                  Lý do (chấm đạt hay trượt)
                </p>
                <p class="row-box border-row text-italic">
                  <contenteditable
                    tag="span"
                    spellcheck="false"
                    :contenteditable="isEditable"
                    v-model="item.Comment"
                    class="comment"
                  />
                </p>
              </el-col>
            </el-row>
            <p class="row-box text-right">
              <span style="font-weight:600">Người đánh giá: </span>
              <span class="text-italic">
                {{ item.EmployeeNameRate }} - ngày
                {{ Date.parse(item.TimeRate).toString("dd/MM/yyyy") }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div> -->
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        class="pan-btn blue-btn"
        icon="fas fa-user-check"
        @click="addRate"
      >
        Xác nhận đánh giá</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import ResultChart from "@/views/evaluateUser/component/result-chart";
import {
  GetCriteriaByEm,
  GetCriteriaHeaderNoAutoByID,
  UpdateCriteriaEmployeeNoAuto
} from "@/api/NSCriteriaDefine";

import QrcodeVue from "qrcode.vue";
import {
  GetCriteriaHeaderByEmId,
  UpdateCriteriaEmployee
} from "@/api/NSCriteriaEmployee";
import { GetEmployeeInforByID } from "@/api/employeeInfor";
export default {
  components: { ResultChart, QrcodeVue },
  props: ["employee", "typeEvaluate"],
  filters: {
    typeEval(type) {
      // console.log(type);
      if (type == "TV") {
        return "Thử việc";
      } else if (type == "CT") {
        return "Định kỳ";
      } else if (type == "BN") {
        return "Bổ nhiệm";
      }
    }
  },
  data() {
    return {
      UserName: Cookies.get("idEmployee"),
      EmployeeRate: "",
      barCode: "",
      Img: "",
      linkImg: "",
      isEditable: true,
      isEmployee: false,
      lines: [],
      lines1: [],
      evaluatedLst: [],
      evaluateLst: [],
      token: Cookies.get("token"),
      CriteriaHeaderInfo: {
        EmployeeName: "",
        EmployeeCode: "",
        Comment: "",
        DocType: "",
        WorkOld: "",
        CriteriaLineLst: [],
        TypeEvaluate: ""
      },
      resultLst: [
        {
          value: "1",
          label: "ĐẠT"
        },
        {
          value: "0",
          label: "KHÔNG ĐẠT"
        }
      ]
    };
  },
  watch: {
    employee() {
      this.lines = [];
      this.lines1 = [];
      this.evaluatedLst = [];
      this.evaluateLst = [];
      this.fetchData();
    }
  },
  methods: {
    checkInput(val) {
      {
        if (isNaN(val)) {
          this.$message({
            message: "Kết quả đạt phải là dạng số",
            type: "error"
          });
          return false;
        }
      }
    },
    errorHandler() {
      return true;
    },
    fetchData() {
      if (this.employee) {
        let headerInfo = {};
        let defineLst = [];
        if (this.employee.DocumentID > 0) {
          const req = {
            DocumentID: this.employee.DocumentID
          };
          GetCriteriaHeaderNoAutoByID(req).then(res => {
            if (res.RespCode == 0) {
              headerInfo = res.CriteriaHeaderInfo;
              defineLst = res.CriteriaDefineLst;
              this.checkData(headerInfo, defineLst);
            }
          });
        } else {
          var req = {
            EmployeeID: this.employee.EmployeeID,
            WorkOld: this.employee.WorkOld,
            TypeEvaluate: this.typeEvaluate
          };
          GetCriteriaHeaderByEmId(req).then(res => {
            if (res.RespCode == 0) {
              headerInfo = res.CriteriaHeaderInfo;
              defineLst = res.CriteriaDefineLst;
              this.checkData(headerInfo, defineLst);
            }
          });
        }
        this.CriteriaHeaderInfo.EmployeeName = this.employee.EmployeeName;
        this.CriteriaHeaderInfo.TypeEvaluate = this.employee.TypeEvaluate;
        this.CriteriaHeaderInfo.EmployeeID = this.employee.EmployeeID;
        this.CriteriaHeaderInfo.EmployeeCode = this.employee.EmployeeCode;
        this.CriteriaHeaderInfo.DateEndReport = this.employee.DateEndReport;

        this.CriteriaHeaderInfo.WorkOld = this.employee.WorkOld;
      } else {
        this.CriteriaHeaderInfo.EmployeeName = null;
        this.CriteriaHeaderInfo.EmployeeID = null;
      }
    },
    checkData(headerInfo, defineLst) {
      this.CriteriaHeaderInfo.DocType = headerInfo.DocType.replace(
        "0 tháng",
        "thử việc"
      );
      this.CriteriaHeaderInfo.DocumentID = headerInfo.DocumentID;
      this.linkImg =
        "https://icpc1hn.work/CPC1HN-SYS/api/File/GetImageEmployee/" +
        headerInfo.ImageEm +
        "?token=" +
        this.token +
        "&EmployeeID=" +
        this.employee.EmployeeID;
      this.barCode =
        "http://icpc1hn.work/#/danh-gia-nhan-su/" +
        this.CriteriaHeaderInfo.DocumentID;

      if (defineLst.length < 1 && headerInfo.CriteriaLineLst.length < 1) {
        this.$message({
          message: "Không có tiêu chí nào để đánh giá",
          type: "warning"
        });
        return;
      }
      if (defineLst) {
        this.lines = defineLst.concat(headerInfo.CriteriaLineLst);
        this.lines.forEach(function(item, index, arr) {
          let a = 0;
          let quan = { Quantity: item.Quantity ? item.Quantity : 0 };
          let com = { Comment: item.Comment ? item.Comment : "" };
          Object.assign(item, quan, com);
          item.ResultWorkLst.forEach(function(item2, index2, arr2) {
            a += item2.Quantity;
          });
          if (item.ResultWorkLst.length > 0) {
            item.Quantity = Number(a / item.ResultWorkLst.length)
              ? Number(a / item.ResultWorkLst.length)
              : 0;
          }
          item.Quota = item.Quota.toString().replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            "$1,"
          );
          item.Quantity = item.Quantity.toFixed(2)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        });
        this.evaluateLst = this.mergeObj(this.lines).map(item => {
          if (item.value) {
            item.value = item.value.sort((a, b) =>
              a.EvalueLevel > b.EvalueLevel
                ? 1
                : b.EvalueLevel > a.EvalueLevel
                ? -1
                : 0
            );
          }
          return item;
        });
      }
    },
    addRate() {
      let a = [];
      let evalLst = [];
      let evalLsted = [];
      if (this.evaluateLst.length > 0) {
        this.evaluateLst.forEach((item, index) => {
          evalLst.push(...item.value);
        });
      }
      let rate = 0;
      evalLst.forEach(function(item, index, arr) {
        if (
          !item.EmployeeNameRate ||
          (item.EmployeeNameRate &&
            item.EmployeeIDRate == Cookies.get("idEmployee"))
        ) {
          if (
            Number(item.Quantity) >= Number(item.Quota.replace(/[^0-9]/g, ""))
          ) {
            rate = 1;
          } else {
            rate = 0;
          }
          var b = {
            Quantity: Number(item.Quantity),
            Rate: item.Rate,
            RateAuto: rate,
            Comment: item.Comment,
            CriteriaName: item.CriteriaName,
            CriteriaID: item.CriteriaID,
            Quota: Number(item.Quota.replace(/[^0-9]/g, ""))
          };
          if (item.Rate > 0) {
            a.push(b);
          }
        }
      });
      this.CriteriaHeaderInfo.CriteriaLineLst = a;
      this.CriteriaHeaderInfo.TypeEvaluate = this.typeEvaluate;
      var req = {
        UserName: this.UserName,
        Token: this.token,
        CriteriaHeaderInfo: this.CriteriaHeaderInfo
      };
      if (this.employee.DocumentID > 0) {
        UpdateCriteriaEmployeeNoAuto(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Tạo đánh giá thành công",
              type: "success"
            });
            this.$emit("RateOK");
          }
        });
      } else {
        UpdateCriteriaEmployee(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Tạo đánh giá thành công",
              type: "success"
            });
            this.$emit("RateOK");
          }
        });
      }
    },
    mergeObj(orgArray) {
      var newArray = orgArray.reduce(function(acc, curr) {
        //finding Index in the array where the NamaCategory matched
        var findIfNameExist = acc.findIndex(function(item) {
          return item.ReferenceCode === curr.ReferenceCode;
        });
        // if in the new array no such object exist where
        // namecategory matches then create a new object
        if (findIfNameExist === -1) {
          let obj = {
            ReferenceCode: curr.ReferenceCode,
            ReferenceDes: curr.ReferenceDes ? curr.ReferenceDes : "Chung",
            value: [curr]
          };
          acc.push(obj);
        } else {
          // if name category matches , then push the value
          acc[findIfNameExist].value.push(curr);
        }
        return acc;
      }, []);
      return newArray;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
.box-header {
  position: relative;
  padding: 5px 5px 10px 5px;
  //border: 1px solid rgb(102, 98, 98);
  margin-bottom: 10px;
  .title-box {
    font-size: 16pt;
    margin: 10px;
    color: rgb(58, 54, 54);
  }
  .info-box {
    .avatar {
      width: 2.5cm;
      height: 3cm;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
        padding: 1px;
        object-fit: cover;
      }
    }
  }
  .logo {
    position: absolute;
    top: 0;
    left: 42px;
    padding: 13px 20px;
  }
  .barcode {
    position: absolute;
    top: 0;
    right: 30px;
    padding: 13px 10px;
  }
}
.box-content {
  position: relative;
  padding: 5px 5px 10px 5px;
  //border: 1px solid rgb(102, 98, 98);
  border-bottom: 1px dashed #ccc; /*  */
  margin-top: 5px;
  .title-content {
    font-size: 11pt;
    font-weight: 600;
    color: rgb(82, 75, 75);
  }
  .content {
    border-bottom: 1px dashed #ccc;
  }
}
.row-box {
  margin: 8px;
  font-size: 10pt;
  word-break: break-word;
  text-align: justify;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-italic {
  font-style: italic;
}
.border-row {
  padding: 5px;
  border: 1px dashed #ccc;
  color: rgb(60, 140, 231);
}
@media only screen and (max-width: 600px) {
  .title-box {
    margin-top: 80px !important;
  }
  .info-content {
    margin: 5px;
  }
  .logo {
    right: 14px !important;
  }
}
.t-hover:hover {
  outline: 1pt dashed #77a5cc;
}
.t-hover:empty:before {
  //content: attr(t-placeholder);
  color: #9197a3;
  font-weight: 100;
  padding: 3px;
}
.t-hover:focus {
  cursor: text;
  outline: 1pt dashed #77a5cc;
}
.result {
  display: inline-block;
  min-width: 0.5cm;
  padding: 3px;
}
.comment {
  display: inline-block;
  min-height: 1.5cm;
  width: 100%;
  &:focus {
    cursor: text;
    outline: none;
  }
}
</style>
