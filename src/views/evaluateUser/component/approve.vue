s<template>
  <div style="font-family: arial,sans-serif,tahoma;">
    <!-- <div>
      <el-card class="box-card-item">
        <div slot="header" class="clearfix" style="text-align: center;">
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
    </div> -->
    <!-- <div
      shadow="always"
      style="margin: auto; position: relative;"
      v-for="(criteria, index) in lines1"
      :key="index"
    >
      <div>
        <el-card class="box-card-list-item">
          <div slot="header" class="clearfix">
            <span style="color:#000000;font-size: 13.333px;font-weight: 700;"
              >Tiêu chí:</span
            >
            <span style="color:#0e2452;font-weight: bold;">{{
              criteria.CriteriaName
            }}</span>
            <span
              style="color:#0e2452;display: block;margin-top:5px;word-break: break-word;"
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
                  v-if="criteria.ResultWorkLst.length > 0"
                  >TB đạt:</span
                >
                <el-input
                  v-if="criteria.ResultWorkLst.length > 0"
                  class="selectIDGroup"
                  placeholder="Kết quả trung bình"
                  suffix-icon="el-icon-edit"
                  v-model="criteria.Quantity"
                  style="margin-bottom:20px;margin-top:10px;"
                  disabled
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
                  <span style="color:#0e2452;font-weight: bold;"
                    >{{ criteria.EmployeeNameRate }} đánh giá :</span
                  >
                </el-col>
                <el-col :xs="24" :sm="12" :lg="12">
                  <el-rate
                    disabled
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
                  <span>- {{ criteria.Comment }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </div>
    </div> -->
    <div class="title-class">
      <span
        >Danh sách kết quả đánh giá {{ CriteriaHeaderInfo.EmployeeName }}
      </span>
    </div>
    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="lines1"
        v-loading="listLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        style="width: 100%"
        border
        fit
        stripe
        size="mini"
        highlight-current-row
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column width="50px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <!-- <el-tooltip content="Đánh giá">
                <el-button type="text" @click="rateEmployee(scope.row)"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Chi tiết">
                <el-button
                  @click="viewRate(scope.row)"
                  type="text"
                  style="color:#c2e7b0;"
                  ><i class="far fa-eye"></i></el-button
              ></el-tooltip> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="75px" label="Tiêu chí">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tiêu chí">
              {{ scope.row.CriteriaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="Định mức">
          <template slot-scope="scope">
            <div class="dat-cell" label="Định mức">
              {{ scope.row.Quota }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          min-width="100px"
          label="Bộ phận"
          :filters="[
            { text: 'Nghiên cứu Phát triển', value: 'Nghiên cứu Phát triển' },
            { text: 'Kinh doanh PS', value: 'Kinh doanh PS' },
            { text: 'Kinh doanh ETC Hà Nội', value: 'Kinh doanh ETC Hà Nội' },
            { text: 'Kinh doanh Đà Nẵng', value: 'Kinh doanh Đà Nẵng' },
            { text: 'Xưởng sinh phẩm', value: 'Xưởng sinh phẩm' },
            { text: 'Kinh doanh GP', value: 'Kinh doanh GP' },
            {
              text: 'Kinh doanh OTC Miền Bắc',
              value: 'Kinh doanh OTC Miền Bắc'
            },
            { text: 'Kinh doanh Hồ Chí Minh', value: 'Kinh doanh Hồ Chí Minh' },
            { text: 'Kế hoạch', value: 'Kế hoạch' },
            { text: 'IT', value: 'IT' },
            {
              text: 'Truyền thông - Marketing',
              value: 'Truyền thông - Marketing'
            },
            { text: 'Kế toán - CN Hà Nội', value: 'Kế toán - CN Hà Nội' }
          ]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Bộ phận">
              {{ scope.row.Department }}
            </div>
          </template>
        </el-table-column> -->

        <el-table-column width="120px" label="KQ đạt">
          <template slot-scope="scope">
            <div class="dat-cell" label="KQ đạt">
              {{ scope.row.Quantity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180px" label="Người đánh giá">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người đánh giá">
              {{ scope.row.EmployeeNameRate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="Đánh giá" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Đánh giá">
              <el-tag
                :type="scope.row.Rate | toRateColor"
                style="width:100px"
                effect="plain"
                >{{ scope.row.Rate | toRateText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" label="Nhận xét">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhận xét">
              {{ scope.row.Comment }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          width="150px"
          label="Tuổi nghề"
          prop="WorkOld"
          sortable
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Tuổi nghề">
              {{ scope.row.WorkOld }} <span class="st-icon-pandora">tháng</span>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div>
      <el-card class="box-card-list-item">
        <div slot="header" class="clearfix">
          <span style="color:#0e2452;font-size: 13.333px;font-weight: 700;"
            ><i class="far fa-clipboard"></i> Phê duyệt:</span
          >

          <el-select
            v-model="Qualified"
            style="float: right;"
            class="selectIDGroup"
            placeholder="Chọn kết quả"
            size="mini"
          >
            <el-option
              v-for="item in resultLst"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span
            style="color:#0e2452;font-size: 13.333px;font-weight: 700;float: right;"
            >Kết quả:&nbsp;&nbsp;
          </span>
        </div>

        <el-row style="color:#0e2452;font-size: 13.333px;">
          <el-col :xs="24" :sm="24" :lg="24">
            <el-input
              class="selectIDGroup"
              placeholder="Nhận xét tổng quan..."
              v-model="Comment"
              type="textarea"
              :rows="4"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-card>
      <!-- <router-link :to="'/danh-gia/in-phieu/' + CriteriaHeaderInfo.DocumentID">
        <el-button icon="fas fa-print"> In phiếu</el-button></router-link
      > -->
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        class="pan-btn blue-btn"
        icon="fas fa-clipboard-check"
        @click="addRate"
      >
        Phê duyệt</el-button
      >
    </div>
  </div>
</template>

<script>
import ResultChart from "@/views/evaluateUser/component/result-chart";
import Cookies from "js-cookie";
import { GetCriteriaByEm } from "@/api/NSCriteriaDefine";
import {
  GetCriteriaHeaderByEmId,
  UpdateCriteriaEmployee,
  ApproveCriteriaEmployee
} from "@/api/NSCriteriaEmployee";
import { GetEmployeeInforByID } from "@/api/employeeInfor";
export default {
  components: { ResultChart },
  props: ["employee","typeEvaluate"],
  filters: {
    toRateText(val) {
      if (val > 2) {
        return "ĐẠT";
      } else {
        return "KHÔNG ĐẠT";
      }
    },
    toRateColor(val) {
      if (val > 2) {
        return "success";
      } else {
        return "danger";
      }
    }
  },
  data() {
    return {
      UserName: Cookies.get("idEmployee"),
      EmployeeRate: "",
      Img: "",
      linkImg: "",
      lines: [],
      lines1: [],
      token: Cookies.get("token"),
      Qualified: "",
      Comment: "",
      listLoading: false,
      CriteriaHeaderInfo: {
        DocumentID: "",
        EmployeeName: "",
        EmployeeCode: "",
        Comment: "",
        DocType: "",
        WorkOld: "",
        CriteriaLineLst: []
      },
      resultLst: [
        {
          value: true,
          label: "ĐẠT"
        },
        {
          value: false,
          label: "KHÔNG ĐẠT"
        }
      ]
    };
  },
  watch: {
    employee() {
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
        this.listLoading = true;
        var req = {
          Token: Cookies.get("token"),
          UserName: this.UserName,
          EmployeeID: this.employee.EmployeeID,
          WorkOld: this.employee.WorkOld,
          TypeEvaluate = this.typeEvaluate
        };
        GetCriteriaHeaderByEmId(req).then(res => {
          if (res.RespCode == 0) {
            this.CriteriaHeaderInfo.DocType = res.CriteriaHeaderInfo.DocType;
            this.CriteriaHeaderInfo.DocumentID =
              res.CriteriaHeaderInfo.DocumentID;
            this.linkImg =
              "https://icpc1hn.work/CPC1HN-SYS/api/File/GetImageEmployee/" +
              res.CriteriaHeaderInfo.ImageEm +
              "?token=" +
              this.token +
              "&EmployeeID=" +
              this.employee.EmployeeID;

            if (res.CriteriaHeaderInfo.CriteriaLineLst) {
              this.lines1 = res.CriteriaHeaderInfo.CriteriaLineLst;
              this.lines1.forEach(function(item, index, arr) {
                // var a=0
                // item.ResultWorkLst.forEach(function(item2,index2,arr2){
                //     a += item2.Quantity
                // })
                item.Quantity = item.Quantity.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );

                item.Quota = item.Quota.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );
              });
            }
          }
        });
        this.CriteriaHeaderInfo.EmployeeName = this.employee.EmployeeName;
        this.CriteriaHeaderInfo.EmployeeID = this.employee.EmployeeID;
        this.CriteriaHeaderInfo.EmployeeCode = this.employee.EmployeeCode;
        this.CriteriaHeaderInfo.WorkOld = this.employee.WorkOld;
        this.listLoading = false;
      } else {
        this.CriteriaHeaderInfo.EmployeeName = null;
        this.CriteriaHeaderInfo.EmployeeID = null;
      }
    },
    addRate() {
      const req = {
        Token: Cookies.get("token"),
        UserName: this.UserName,
        EmployeeID: this.employee.EmployeeID,
        DocumentID: this.CriteriaHeaderInfo.DocumentID,
        Comment: this.Comment,
        Qualified: this.Qualified
      };
      ApproveCriteriaEmployee(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Phê duyệt thành công",
            type: "success"
          });
          this.$emit("Approved");
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
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

<style lang="scss" scope>
.title-class {
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 11pt;
  font-weight: 700;
  color: #0277bc;
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
