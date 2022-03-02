s<template>
  <div style="font-family: arial,sans-serif,tahoma;">
    <div>
      <el-card class="box-card-item">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span
            style="text-transform: uppercase;word-break: break-word;font-size: 20px;"
            >{{ CriteriaHeaderInfo.DocType }}</span
          >
        </div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="demo-type" style="float: right;">
              <el-avatar :size="120" :src="linkImg" @error="errorHandler">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="16">
            <span
              style="color:#0e2452; display: block; word-break: break-word; font-weight: bold; font-size: 24pt; line-height: 24pt;margin-bottom: 10px;"
              >{{ CriteriaHeaderInfo.EmployeeName }}</span
            >
            <el-row :gutter="10">
              <el-col :xs="9" :sm="8" :lg="8">
                <div>
                  <span class="el-item-info">ID:</span>
                  <span class="el-item-info">Điện thoại:</span>
                  <span class="el-item-info">Chức vụ:</span>
                  <span class="el-item-info">Bộ phận:</span>
                  <span class="el-item-info">Ngày vào làm:</span>
                </div>
              </el-col>
              <el-col :xs="15" :sm="16" :lg="16">
                <div>
                  <span class="el-item-infom">{{
                    CriteriaHeaderInfo.EmployeeCode
                  }}</span>
                  <span class="el-item-infom">{{
                    CriteriaHeaderInfo.EmployeeID
                  }}</span>
                  <span class="el-item-infom">{{ employee.Postition }}</span>
                  <span class="el-item-infom">{{ employee.Department }}</span>
                  <span class="el-item-infom">{{
                    Date.parse(employee.DateStartWork).toString("dd/MM/yyyy")
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div
      shadow="always"
      style="margin: auto; position: relative;"
      v-for="(criteria1, index) in lines"
      :key="'lines' + index"
    >
      <el-card class="box-card-list-item">
        <div slot="header" class="clearfix">
          <span style="color:#000000;font-size: 13.333px;font-weight: 700;"
            >Tiêu chí:</span
          >
          <span style="color:#0e2452;font-weight: bold;">{{
            criteria1.CriteriaName
          }}</span>
          <span
            style="color:#0e2452;display: block;margin-top:5px;word-break: break-word;font-style:italic"
            v-if="criteria1.Description"
            ><span style="color:#000000;font-size: 13.333px;font-weight: 700;"
              >Mô tả: </span
            >{{ criteria1.Description }}</span
          >
        </div>
        <div class="text item">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="12">
              <div
                style="height:200px"
                class="card-chart"
                v-if="criteria1.ResultWorkLst.length > 0"
              >
                <result-chart
                  :chartData="criteria1.ResultWorkLst"
                ></result-chart>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12">
              <span style="color:#0e2452;font-size: 13.333px;font-weight: 700;"
                >Kết quả đạt:</span
              >
              <el-input
                class="selectIDGroup"
                placeholder="Kết quả đạt"
                suffix-icon="el-icon-edit"
                v-model="criteria1.Quantity"
                style="margin-bottom:20px;margin-top:10px;"
              >
              </el-input>
              <span
                style="color:#0e2452;font-size: 13.333px;font-weight: 700;"
                v-if="criteria1.Quota != 0"
                >Định mức:</span
              >
              <el-input
                style="margin-top:10px;"
                v-if="criteria1.Quota != 0"
                class="selectIDGroup"
                placeholder="Định mức"
                suffix-icon="fas fa-medal"
                v-model="criteria1.Quota"
                disabled
              >
              </el-input>
            </el-col>
          </el-row>
          <div style="margin-top:20px;">
            <el-row>
              <el-col :xs="24" :sm="12" :lg="12">
                <el-rate
                  v-model="criteria1.Rate"
                  :texts="['Không đạt', 'Không đạt', 'Đạt', 'Đạt', 'Đạt']"
                  show-text
                >
                </el-rate>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <el-input
                style="margin-top:10px;"
                placeholder="Nhập nhận xét"
                v-model="criteria1.Comment"
                type="textarea"
                :rows="4"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div
      shadow="always"
      style="margin: auto; position: relative;"
      v-for="(criteria, index) in lines1"
      :key="'lines1' + index"
    >
      <div v-if="criteria.EmployeeIDRate == UserName">
        <el-card class="box-card-list-item">
          <div slot="header" class="clearfix">
            <span style="color:#000000;font-size: 13.333px;font-weight: 700;"
              >Tiêu chí:</span
            >
            <span style="color:#0e2452;font-weight: bold;">{{
              criteria.CriteriaName
            }}</span>
            <span
              style="color:#0e2452;display: block;margin-top:5px;word-break: break-word;font-style:italic"
              v-if="criteria.Description"
              ><span style="color:#000000;font-size: 13.333px;font-weight: 700;"
                >Mô tả: </span
              >{{ criteria.Description }}</span
            >
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :lg="12">
                <div
                  style="height:200px"
                  class="card-chart"
                  v-if="criteria.ResultWorkLst.length > 0"
                >
                  <result-chart
                    :chartData="criteria.ResultWorkLst"
                  ></result-chart>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="12">
                <span
                  style="color:#0e2452;font-size: 13.333px;font-weight: 700;"
                  >Kết quả đạt:</span
                >
                <el-input
                  class="selectIDGroup"
                  placeholder="Kết quả đạt"
                  suffix-icon="el-icon-edit"
                  v-model="criteria.Quantity"
                  style="margin-bottom:20px;margin-top:10px;"
                >
                </el-input>
                <span
                  v-if="criteria.Quota != 0"
                  style="color:#0e2452;font-size: 13.333px;font-weight: 700;"
                  >Định mức:</span
                >
                <el-input
                  v-if="criteria.Quota != 0"
                  style="margin-top:10px;"
                  class="selectIDGroup"
                  placeholder="Định mức"
                  suffix-icon="fas fa-medal"
                  v-model="criteria.Quota"
                  disabled
                >
                </el-input>
              </el-col>
            </el-row>
            <div style="margin-top:20px;">
              <el-row>
                <el-col :xs="24" :sm="12" :lg="12">
                  <span
                    style="color:#0e2452;font-weight: bold;"
                    v-if="criteria.Rate > 0"
                    >{{ criteria.EmployeeNameRate }} đánh giá :</span
                  >
                </el-col>
                <el-col :xs="24" :sm="12" :lg="12">
                  <el-rate
                    v-model="criteria.Rate"
                    :texts="['Không đạt', 'Không đạt', 'Đạt', 'Đạt', 'Đạt']"
                    show-text
                  >
                  </el-rate>
                </el-col>
              </el-row>
              <el-row
                style="border-bottom: 1px solid #ccc; padding: 10px;color:#0e2452;font-size: 13.333px;"
              >
                <el-col :xs="24" :sm="24" :lg="24">
                  <el-input
                    class="selectIDGroup"
                    placeholder="Nhập nhận xét"
                    suffix-icon="el-icon-edit"
                    v-model="criteria.Comment"
                    style="margin-bottom:20px;"
                  >
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </div>
    </div>
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
import { GetCriteriaByEm } from "@/api/NSCriteriaDefine";
import {
  GetCriteriaHeaderByEmId,
  UpdateCriteriaEmployee
} from "@/api/NSCriteriaEmployee";
import { GetEmployeeInforByID } from "@/api/employeeInfor";
export default {
  components: { ResultChart },
  props: ["employee", "typeEvaluate"],
  data() {
    return {
      UserName: Cookies.get("idEmployee"),
      EmployeeRate: "",
      Img: "",
      linkImg: "",
      lines: [],
      lines1: [],
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
      this.fetchData();
    }
  },
  methods: {
    errorHandler() {
      return true;
    },
    fetchData() {
      if (this.employee) {
        var req = {
          Token: Cookies.get("token"),
          UserName: this.UserName,
          EmployeeID: this.employee.EmployeeID,
          WorkOld: this.employee.WorkOld,
          TypeEvaluate: this.typeEvaluate
        };
        GetCriteriaHeaderByEmId(req).then(res => {
          if (res.RespCode == 0) {
            this.CriteriaHeaderInfo.DocType = res.CriteriaHeaderInfo.DocType.replace(
              "0 tháng",
              "thử việc"
            );
            this.CriteriaHeaderInfo.DocumentID =
              res.CriteriaHeaderInfo.DocumentID;
            this.linkImg =
              "https://icpc1hn.work/CPC1HN-SYS/api/File/GetImageEmployee/" +
              res.CriteriaHeaderInfo.ImageEm +
              "?token=" +
              this.token +
              "&EmployeeID=" +
              this.employee.EmployeeID;
            if (res.CriteriaDefineLst) {
              this.lines = res.CriteriaDefineLst;
              this.lines.forEach(function(item, index, arr) {
                var a = 0;
                item.ResultWorkLst.forEach(function(item2, index2, arr2) {
                  a += item2.Quantity;
                });
                if (item.ResultWorkLst.length > 0) {
                  item.Quantity = Number(a / item.ResultWorkLst.length)
                    ? Number(a / item.ResultWorkLst.length)
                    : 0;
                }
                // {{criteria.Quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}}
                item.Quota = item.Quota.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );
              });
            }
            if (res.CriteriaHeaderInfo.CriteriaLineLst) {
              this.lines1 = res.CriteriaHeaderInfo.CriteriaLineLst;
              this.lines1.forEach(function(item, index, arr) {
                var a = 0;
                // item.ResultWorkLst.forEach(function(item2, index2, arr2) {
                //   a += item2.Quantity;
                // });
                // item.Quantity =
                //   a / item.ResultWorkLst.length
                //     ? a / item.ResultWorkLst.length
                //     : 0;

                item.Quota = item.Quota.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );
              });
            }
            if (
              res.CriteriaDefineLst.length < 1 &&
              res.CriteriaHeaderInfo.CriteriaLineLst.length < 1
            ) {
              this.$message({
                message: "Không có tiêu chí nào để đánh giá",
                type: "warning"
              });
            }
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
        this.CriteriaHeaderInfo.EmployeeName = this.employee.EmployeeName;
        this.CriteriaHeaderInfo.EmployeeID = this.employee.EmployeeID;
        this.CriteriaHeaderInfo.EmployeeCode = this.employee.EmployeeCode;
        this.CriteriaHeaderInfo.WorkOld = this.employee.WorkOld;
      } else {
        this.CriteriaHeaderInfo.EmployeeName = null;
        this.CriteriaHeaderInfo.EmployeeID = null;
      }
    },
    addRate() {
      let a = [];
      let rate = 0;
      this.lines.forEach(function(item, index, arr) {
        console.log(item);
        console.log(
          Number(item.Quantity) >= Number(item.Quota.replace(/[^0-9]/g, ""))
        );
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
      });
      var _this = this;
      _this.lines1.forEach(function(item1, index1, arr1) {
        var c = {
          Quantity: Number(item1.Quantity),
          Rate: item1.Rate,
          Comment: item1.Comment,
          CriteriaName: item1.CriteriaName,
          CriteriaID: item1.CriteriaID,
          Quota: Number(item1.Quota.replace(/[^0-9]/g, ""))
        };
        if (item1.Rate > 0 && item1.EmployeeIDRate == _this.UserName) {
          a.push(c);
        }
      });
      this.CriteriaHeaderInfo.CriteriaLineLst = a;
      this.CriteriaHeaderInfo.TypeEvaluate = this.typeEvaluate;
      var req = {
        UserName: this.UserName,
        Token: this.token,
        CriteriaHeaderInfo: this.CriteriaHeaderInfo
      };
      UpdateCriteriaEmployee(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Tạo đánh giá thành công",
            type: "success"
          });
          this.$emit("RateOK");
        } else {
          this.$message({
            message: res.RespText,
            type: "error"
          });
        }
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
.box-card-item {
  border-radius: 5px;
  border: 1px solid #337ab7;
}
.box-card-item .el-card__header {
  background-color: #337ab7;
  color: #fff;
}
.box-card-list-item {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.el-item-info {
  display: block;
  font-weight: 700;
  padding: 0.1cm;
  font-size: 13.333px;
}
.el-item-infom {
  display: block;
  padding: 0.1cm;
  font-size: 13.333px;
}
.demo-type:hover {
  transform: scale(1.5);
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
