<template>
  <div class="container">
    <el-row>
      <div class="inline-block">
        <el-input
          size="small"
          placeholder="Tìm kiếm nhân viên..."
          v-model="search"
        >
        </el-input>
      </div>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="TypeEvaluate"
          placeholder="Chọn loại đánh giá"
          @change="changeType"
          clearable
        >
          <el-option
            v-for="item in TypeLst"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="inline-block" v-if="!isSearch2">
        <el-button
          icon="el-icon-search"
          class="inline-block"
          @click="fetchData"
          circle
        ></el-button>
      </div>
      <div class="inline-block">
        <el-link
          style="font-size:10pt;font-color:#02bc77;font-style:italic"
          type="primary"
          @click="seachAd"
        >
          <i class="el-icon-d-arrow-right"></i>Tìm kiếm nâng cao</el-link
        >
      </div>
      <div v-if="modeAdmin" style="float:right;">
        <div class="inline-block">
          <p style="font-size:10pt;font-weight:600;color:#d80d0d">
            Số lượng: {{ tableData.length }}/{{ EmployeeEvaluedLst.length }}
          </p>
        </div>
        <div class="inline-block">
          <el-button
            size="small"
            :loading="downloading"
            style="background-color:#02bc77;color:white;"
            icon="far fa-file-excel"
            @click="ExportExcel"
          >
            Xuất Excel</el-button
          >
        </div>
        <div class="inline-block">
          <el-button
            size="small"
            :loading="downloading"
            @click="setEvaluate"
            style="background-color:#02bc77;color:white;"
            icon="fas fa-plus"
          >
            Tạo phiếu</el-button
          >
        </div>
      </div>
    </el-row>
    <el-row v-if="isSearch2">
      <div class="inline-block">
        <el-select
          size="small"
          v-model="Branch"
          @change="getOffice"
          placeholder="Chọn chi nhánh"
          clearable
        >
          <el-option
            v-for="(item, index) in branchLst"
            :key="index"
            :label="item.Branch"
            :value="item.Branch"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="Office"
          @change="getPosition"
          placeholder="Chọn bộ phận"
          clearable
        >
          <el-option
            v-for="(item, index) in officeLst"
            :key="index"
            :label="item.Office"
            :value="item.Office"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          size="small"
          v-model="Position"
          placeholder="Chọn chức vụ"
          clearable
        >
          <el-option
            v-for="(item, index) in positionLst"
            :key="index"
            :label="item.Position"
            :value="item.Position"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block" v-if="isSearch2">
        <el-button
          size="small"
          icon="el-icon-search"
          class="inline-block"
          @click="fetchData"
          type="primary"
        >
          Tìm kiếm</el-button
        >
      </div>
    </el-row>

    <!-- <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm nhân viên..."
        v-model="search"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div> -->
    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="
          tableData.filter(
            data =>
              !search ||
              data.EmployeeName.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="listLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        style="width: 100%"
        border
        fit
        highlight-current-row
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column width="100px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip
                v-if="scope.row.Auto == 0 && modeAdmin"
                content="Cập nhật"
                effect="light"
              >
                <el-button @click="updateSet(scope.row)" type="text"
                  ><i class="el-icon-edit"></i></el-button
              ></el-tooltip>

              <el-tooltip
                v-if="scope.row.Auto == 0 && modeAdmin"
                content="Xóa"
                effect="light"
              >
                <el-button
                  @click="delSet(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="el-icon-delete"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="75px" label="Nhân viên">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              <span v-if="scope.row.Auto == 0">
                <el-tooltip content="Phiếu đánh giá đặc biệt" effect="light">
                  <i class="el-icon-warning-outline"></i></el-tooltip
              ></span>
              {{ scope.row.EmployeeName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Chức vụ" prop="Postition">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chức vụ">
              {{ scope.row.Postition }}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="Bộ phận">
          <template slot-scope="scope">
            <div class="dat-cell" label="Bộ phận">
              {{ scope.row.Department }}
            </div>
          </template>
        </el-table-column>

        <el-table-column width="150px" label="Ngày vào làm" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày vào làm">
              {{ Date.parse(scope.row.DateStartWork).toString("dd/MM/yyyy") }}
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
              {{ scope.row.WorkOld.toString().replace(0, "Thử việc") }}
              <span class="st-icon-pandora" v-if="scope.row.WorkOld != 0"
                >tháng</span
              >
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          width="150px"
          label="Ngày bắt đầu kỳ ĐG"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày bắt đầu kỳ ĐG">
              {{ Date.parse(scope.row.DateStartEvalue).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="160px"
          label="Ngày kết thúc kỳ ĐG"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày kết thúc kỳ ĐG">
              {{ Date.parse(scope.row.DateEndEvalue).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column> -->

        <el-table-column width="150px" label="Hạn đánh giá" align="center">
          <template slot-scope="scope">
            <div
              class="dat-cell"
              label="Hạn đánh giá"
              v-if="scope.row.DateEndReport"
            >
              {{ Date.parse(scope.row.DateEndReport).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150px"
          label="Trạng thái đánh giá"
          align="center"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái đánh giá">
              <el-tag
                style="width:120px"
                effect="plain"
                :type="scope.row.Status | toStatusColor"
                >{{ scope.row.Status | toStatusText }}</el-tag
              >

              <p
                style="margin:0;font-size:10pt"
                v-if="scope.row.DetailEvaluate"
              >
                {{ scope.row.DetailEvaluate }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <el-button-group>
                <el-tooltip content="Đánh giá" effect="light">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="rateEmployee(scope.row)"
                    icon="el-icon-edit"
                    >Đánh giá</el-button
                  ></el-tooltip
                >
                <el-tooltip
                  content="Nhắc đánh giá"
                  effect="light"
                  v-if="modeAdmin"
                >
                  <el-button size="mini" type="warning"
                    ><i class="fas fa-bell"></i></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div v-else class="blank-table">Vui lòng chọn loại nhân viên</div> -->
    <el-dialog :visible.sync="dialogFormRate" custom-class="default-modal">
      <create-evaluate
        :employee="rowData"
        @RateOK="RateOK"
        :typeEvaluate="TypeEvaluate"
      ></create-evaluate>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormSet" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <set-evaluate @setOK="SetOK"></set-evaluate>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormUpdateSet" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <update-evaluate
        :row="rowData"
        @updateSetOK="updateSetOK"
      ></update-evaluate>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormView" custom-class="fullscreen-modal">
      <span slot="title" style="font-weight:700;color: #0277bc;font-size: 20pt;"
        >&#32;&#32;Kết quả đánh giá nhân viên&#32;{{ rowData1.EmployeeName }}
      </span>
      <view-evaluate
        :employee="rowData1"
        :typeEvaluate="TypeEvaluate"
        @Approved="Approved"
      ></view-evaluate>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormPrint">
      <print></print>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import print from "../component/print";
import {
  GetEmployeeEvalued,
  DelCriteriaHeaderNoAuto
} from "@/api/NSCriteriaDefine";
import CreateEvaluate from "@/views/evaluateUser/component/createEvaluate";
import ViewEvaluate from "@/views/evaluateUser/component/viewEvaluate";
import setEvaluate from "../component/setEvaluate";
import updateEvaluate from "../component/updateEvaluate";
import { GetCriteriaHeaderByEmId } from "@/api/NSCriteriaEmployee";
import { GetBranch, GetOffice, GetPosition } from "@/api/employeeInfor";
export default {
  components: {
    CreateEvaluate,
    ViewEvaluate,
    print,
    setEvaluate,
    updateEvaluate
  },
  filters: {
    toStatusText(val) {
      if (val == 0) {
        return "Chưa đánh giá";
      } else if (val == 1) {
        return "Chờ đánh giá";
      } else if (val == 3) {
        return "Đã duyệt";
      } else if (val == 2) {
        return "Không đạt";
      } else if (val == 5) {
        return "GĐ duyệt";
      }
    },
    toStatusColor(val) {
      if (val == 0) {
        return "info";
      } else if (val == 1) {
        return "primary";
      } else if (val == 3 || val == 5) {
        return "success";
      } else if (val == 2) {
        return "danger";
      }
    }
  },
  data() {
    return {
      search: "",
      show: "",
      TypeEvaluate: "TV",
      EmployeeEvaluedLst: [],
      branchLst: [],
      officeLst: [],
      positionLst: [],
      tableData: [],
      Branch: "",
      Office: "",
      Position: "",
      titleDialog: "",
      show: false,
      listLoading: false,
      dialogFormRate: false,
      dialogFormView: false,
      dialogFormLst: false,
      downloading: false,
      dialogFormPrint: false,
      watchType: true,
      modeAdmin: false,
      dialogFormSet: false,
      dialogFormUpdateSet: false,
      isSearch2: false,
      rowData: "",
      rowData1: "",
      Office: "",
      Position: "",
      Branch: "",
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      typeOTC: Cookies.get("otc"),
      TypeLst: [
        {
          value: "TV",
          label: "Thử việc"
        },
        {
          value: "CT",
          label: "Định kỳ"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ]
    };
  },
  methods: {
    print() {
      this.dialogFormPrint = true;
    },
    fetchData() {
      if (this.watchType) {
        this.listLoading = true;
        var req = {
          TypeEvaluate: this.TypeEvaluate
        };
        GetEmployeeEvalued(req).then(res => {
          if (res.RespCode == 0) {
            this.EmployeeEvaluedLst = res.EmployeeEvaluedLst;
            this.listLoading = false;
            this.fetchDataTable(this.EmployeeEvaluedLst);
            this.watchType = false;
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
      } else {
        this.fetchDataTable(this.EmployeeEvaluedLst);
      }
    },
    rateEmployee(row) {
      this.dialogFormRate = true;
      this.rowData = row;
    },
    RateOK() {
      this.watchType = true;
      this.dialogFormRate = false;
      this.fetchData();
    },
    viewRate(row) {
      var req = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        EmployeeID: row.EmployeeID,
        WorkOld: row.WorkOld,
        TypeEvaluate: this.TypeEvaluate
      };
      GetCriteriaHeaderByEmId(req).then(res => {
        if (res.RespCode == 0) {
          if (res.CriteriaHeaderInfo.CriteriaLineLst.length > 0) {
            this.dialogFormView = true;
            this.rowData1 = row;
          } else {
            this.$message({
              message: "Nhân viên chưa được đánh giá",
              type: "warning"
            });
          }
        }
      });
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã nhân viên",
        "Tên nhân viên",
        "Điện thoại",
        "Chức vụ",
        "Bộ phận",
        "Ngày vào làm",
        "Tuổi nghề",
        "Ngày bắt đầu đánh giá",
        "Ngày kết thúc đánh giá"
      ];
      const filterHeader = [
        "EmployeeCode",
        "EmployeeName",
        "EmployeeID",
        "Postition",
        "Department",
        "DateStartWork",
        "WorkOld",
        "DateStartEvalue",
        "DateEndEvalue"
      ];
      var data = this.EmployeeEvaluedLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách nhân viên đánh giá", //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    filterHandler(value, row) {
      return row.Department === value;
    },
    Approved() {
      this.dialogFormView = false;
    },
    getOffice() {
      this.Office = null;
      this.Position = null;
      GetOffice({ Branch: this.Branch }).then(res => {
        this.officeLst = res.Data;
      });
    },
    getPosition() {
      this.Position = null;
      GetPosition({ Office: this.Office, Branch: this.Branch }).then(res => {
        this.positionLst = res.Data;
      });
    },
    fetchDataTable(data) {
      this.tableData = [];
      //console.log(data);
      // console.log(this.Branch);
      // console.log(this.Office);
      // console.log(this.Position);
      if (!this.Office && !this.Position) {
        this.tableData = data;
      } else {
        const dataFilter = data.filter(
          p => p.Department == this.Office && p.Postition == this.Position
        );
        //console.log(dataFilter);
        this.tableData = dataFilter;
        this.listLoading = false;
      }
    },
    changeType() {
      //console.log("a");
      this.watchType = true;
    },
    setEvaluate() {
      this.dialogFormSet = true;
      this.titleDialog = "Tạo phiếu đánh giá";
    },
    SetOK() {
      this.dialogFormSet = false;
      this.watchType = true;
      this.fetchData();
    },
    delSet(val) {
      this.$confirm(
        "Xác nhận xóa phiếu đánh giá " + val.EmployeeName + ". Continue?",
        "Xóa phiếu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            DocumentID: val.DocumentID
          };
          DelCriteriaHeaderNoAuto(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
                type: "success"
              });
              this.watchType = true;
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    updateSet(row) {
      this.rowData = row;
      this.dialogFormUpdateSet = true;
      this.titleDialog = "Cập nhật phiếu đánh giá";
    },
    updateSetOK() {
      this.dialogFormUpdateSet = false;
      this.watchType = true;
      this.fetchData();
    },
    seachAd() {
      this.isSearch2 = !this.isSearch2;
      this.Office = "";
      this.Branch = "";
      this.Position = "";
    }
  },
  created() {
    this.fetchData();
    GetBranch().then(res => {
      this.branchLst = res.Data;
    });
    if (this.typeOTC == 10 || this.typeOTC == 28) {
      this.modeAdmin = true;
    }
  },

  watch: {
    // TypeEvaluate() {
    //   this.fetchData();
    // }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
