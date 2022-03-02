<template>
  <div class="container">
    <div class="inline-block">
      <el-select
        size="small"
        v-model="Branch"
        placeholder="Chọn chi nhánh"
        clearable
      >
        <el-option
          v-for="(item, index) in branchLst"
          :key="index"
          :label="item.Value"
          :value="item.Value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-select
        size="small"
        v-model="TypeEm"
        @change="changeTypeEm"
        placeholder="Chọn loại nhân viên"
        clearable
      >
        <el-option
          v-for="(item, index) in emTypeLst"
          :key="index"
          :label="item.Description"
          :value="item.TypeCode"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-select
        size="small"
        v-model="EmLevel"
        filterable
        placeholder="Chọn cấp bậc nhân viên..."
        clearable
      >
        <el-option
          v-for="item in Levels"
          :key="item.Level"
          :label="item.Description"
          :value="item.Level"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-select
        size="small"
        v-model="WorkOld"
        placeholder="Chọn tuổi nghề"
        clearable
      >
        <el-option
          v-for="(item, index) in workOldLst"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-select
        size="small"
        clearable
        v-model="TypeEvaluate"
        @change="changeType"
        placeholder="Chọn loại đánh giá"
      >
        <el-option
          v-for="(item, index) in TypeLst"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button
      size="small"
      icon="el-icon-search"
      class="inline-block"
      @click="fetchData"
      circle
    ></el-button>

    <!-- <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo nhân viên..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div> -->
    <div style="float:right;">
      <div class="inline-block" v-if="modeAdmin">
        <el-button
          size="small"
          style="background-color:#02bc77;color:white;"
          @click="createCritera"
          icon="fas fa-plus"
          >&#32;Tạo tiêu chí
        </el-button>
      </div>
      <div class="inline-block" v-if="modeAdmin">
        <el-button
          size="small"
          :loading="downloading"
          style="background-color:#02bc77;color:white;"
          icon="far fa-file-excel"
          @click="ExportExcel"
        ></el-button>
      </div>
    </div>

    <!-- <create-critera
      modalId="new-critera-modal"
      :critera="rowData"
      :typeEvaluate="TypeEvaluate"
      @criteriaAdded="createOK"
      @criteriaUpdated="updateOK"
    ></create-critera> -->
    <el-table
      class="el-mobile-table"
      :data="tableData"
      v-loading="listLoading"
      style="width: 100%"
      border
      fit
      stripe
      highlight-current-row
      :header-row-style="{ color: '#1c456f' }"
      element-loading-text="Vui lòng chờ..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-table-column align="center" width="80px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150px"
        label="Tiêu chí"
        prop="CriteriaName"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Tiêu chí">
            <p style="color: #02bc77;font-weight:700;">
              {{ scope.row.ReferenceDes ? scope.row.ReferenceDes : "Chung" }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="160px" label="Đánh giá">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đánh giá">
            {{ scope.row.CriteriaName }}
            <span style="color:red;" v-if="scope.row.CriteriaType == 1">*</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="250px" label="Mô tả">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mô tả">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="Định mức" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Định mức">
            {{
              scope.row.Quota.toString().replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                "$1,"
              )
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="ĐTV" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="ĐTV">
            {{ scope.row.Unit }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="230px"
        label="Nhân viên"
        prop="EmTypeTxt"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            <p>{{ scope.row.EmTypeTxt }}</p>
            <span
              style="font-size:10pt;font-weight:700;"
              v-if="scope.row.EmLevel"
            >
              Cấp bậc: </span
            ><span>{{ scope.row.EmLevel | PositionStatusText }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        label="Chi nhánh"
        prop="Branch"
        :filters="[
          { text: 'Chi nhánh Hà Nội', value: 'Chi nhánh Hà Nội' },
          { text: 'Chi nhánh Hồ Chí Minh', value: 'Chi nhánh Hồ Chí Minh' },
          { text: 'Chi nhánh Đà Nẵng', value: 'Chi nhánh Đà Nẵng' },
          {
            text: 'Trụ sở chính - Nhà máy',
            value: 'Trụ sở chính - Nhà máy'
          }
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Chi nhánh">
            {{ scope.row.Branch }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="Tuổi nghề" prop="WorkOld" sortable>
        <template slot-scope="scope">
          <div class="dat-cell" label="Tuổi nghề">
            {{ scope.row.WorkOld | WorkOldStatusText }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="220px" label="Người đánh giá">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người đánh giá">
            <p>
              [{{
                scope.row.EvalueTypeTxt.toString()
                  .replace("Nhân viên", "")
                  .trim()
              }}] {{ scope.row.EvalueLevel | PositionStatusText }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="170px"
        label="Actions"
        align="center"
        v-if="modeAdmin"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <el-button-group>
              <el-tooltip content="Chỉnh sửa" effect="light">
                <el-button
                  size="mini"
                  @click="editCriteria(scope.row)"
                  type="warning"
                  ><i class="fas fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" effect="light">
                <el-button
                  size="mini"
                  @click="delCriteria(scope.row)"
                  type="danger"
                  ><i class="el-icon-delete"></i></el-button
              ></el-tooltip>
              <el-tooltip
                :content="scope.row.Status == 1 ? 'Khóa' : 'Kích hoạt'"
                effect="light"
              >
                <el-button
                  size="mini"
                  @click="lockCriteria(scope.row)"
                  :type="scope.row.Status == 1 ? 'success' : 'info'"
                  ><i class="el-icon-lock"></i></el-button
              ></el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Cấp bậc" width="180">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cấp bậc">
            {{ scope.row.EvalueLevel | PositionStatusText }}
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Trạng thái" min-width="100" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | missionStatusColor">
              {{ scope.row.Status | missionStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Trạng thái" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            {{scope.row.TimeCreate}}
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="custom-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create-critera
        :critera="rowData"
        @criteriaAdded="createOK"
        @criteriaUpdated="updateOK"
        @cancel="cancelCreate"
      ></create-critera>
    </el-dialog>
    <el-dialog title="Xóa tiêu chí" :visible.sync="dialogFormDel">
      <delete-critera
        :critera="rowData"
        @delCriteraOK="deleteOK"
        @deletecancelOK="cancel"
      ></delete-critera>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import CreateCritera from "@/views/evaluateUser/component/createCritera";
import DeleteCritera from "@/views/evaluateUser/component/deleteCritera";
import {
  GetCriteriaDefine,
  GetEmployeeDefine,
  LockCriteriaDefine,
  GetReferenceCode
} from "@/api/NSCriteriaDefine";
import { GetEmployeeLevel } from "@/api/employeeAdmin";
export default {
  components: {
    CreateCritera,
    DeleteCritera
  },
  filters: {
    toCriteriaText(val) {
      if (val) {
        let item = LstCode.find(p => p.ReferenceCode === val);
        if (item) {
          return item.Description;
        }
      }
    }
  },
  data() {
    return {
      CriteriaDefineLst: [],
      tableData: [],
      LstCode: [],
      dialogFormDel: false,
      dialogFormCreate: false,
      listLoading: false,
      downloading: false,
      watchType: false,
      modeAdmin: false,
      titleDialog: "",
      Branch: "",
      WorkOld: "",
      TypeEm: "",
      rowData: "",
      show: "",
      EmLevel: "",
      TextSearch: "",
      TypeEvaluate: "",
      emTypeLst: [],
      spanArr: [],
      Levels: [],
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
      ],
      branchLst: [
        { Value: "Chi nhánh Hà Nội" },
        { Value: "Chi nhánh Hồ Chí Minh" },
        { Value: "Chi nhánh Đà Nẵng" },
        { Value: "Trụ sở chính - Nhà máy" }
      ],
      workOldLst: [
        {
          value: 0,
          label: "Thử việc"
        },
        {
          value: 3,
          label: "3 tháng"
        },
        {
          value: 6,
          label: "6 tháng"
        },
        {
          value: 12,
          label: "1 năm"
        },
        {
          value: 18,
          label: "18 tháng"
        },
        {
          value: 24,
          label: "2 năm"
        },
        {
          value: 36,
          label: "3 năm"
        },
        {
          value: 48,
          label: "4 năm"
        }
      ]
    };
  },
  methods: {
    createCritera() {
      //VoerroModal.show("new-critera-modal");
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo tiêu chí đánh giá";
      this.rowData = null;
    },
    createOK() {
      this.watchType = true;
      this.dialogFormCreate = false;
      this.fetchData();
    },
    editCriteria(row) {
      //VoerroModal.show("new-critera-modal");
      this.dialogFormCreate = true;
      this.titleDialog = "Chỉnh sửa tiêu chí đánh giá";
      this.rowData = row;
    },
    updateOK() {
      this.watchType = true;
      this.dialogFormCreate = false;
      this.fetchData();
    },
    delCriteria(row) {
      this.dialogFormDel = true;
      this.rowData = row;
    },
    deleteOK() {
      this.dialogFormDel = false;
      this.watchType = true;
      this.fetchData();
    },
    cancel() {
      this.dialogFormDel = false;
    },
    cancelCreate() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      if (this.watchType) {
        this.listLoading = true;
        GetCriteriaDefine({
          TypeEvaluate: this.TypeEvaluate
        }).then(res => {
          if (res.RespCode == 0) {
            this.CriteriaDefineLst = res.CriteriaDefineLst;
            this.fetchTableData(this.CriteriaDefineLst);
            this.watchType = false;
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
      } else {
        this.fetchTableData(this.CriteriaDefineLst);
      }
    },
    reportOK() {
      VoerroModal.hide("new-critera-modal");
      this.fetchData();
    },
    filterHandler(value, row) {
      return row.Branch === value;
    },
    updateReport(row) {
      VoerroModal.show("new-critera-modal");
      this.rowData = row;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Tên chỉ tiêu",
        "Định mức",
        "Mô tả",
        "Nhân viên",
        "Cấp bậc nhân viên",
        "Chi nhánh",
        "Tuổi nghề",
        "Người đánh giá",
        "Cấp bậc người đánh giá"
      ];
      const filterHeader = [
        "CriteriaName",
        "Quota",
        "Description",
        "EmTypeTxt",
        "EmLevel",
        "Branch",
        "WorkOld",
        "EvalueTypeTxt",
        "EvalueLevel"
      ];
      var data = this.CriteriaDefineLst;

      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách đánh giá nhân viên " + this.TypeEvaluate, //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
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
    fetchTableData(data) {
      this.tableData = [];
      if (this.typeOTC != this.TypeEm && this.modeAdmin === false) {
        this.$message({
          message: "Bạn không có quyền",
          type: "warning"
        });
        return;
      }
      const dataFilter = data.filter(
        p =>
          p.EmType === this.TypeEm &&
          p.Branch === this.Branch &&
          p.WorkOld === this.WorkOld &&
          p.EmLevel === this.EmLevel
      );
      //console.log(dataFilter);
      this.tableData = dataFilter;
      // this.tableData.sort((a, b) =>
      //   a.ReferenceCode > b.ReferenceCode
      //     ? 1
      //     : b.ReferenceCode > a.ReferenceCode
      //     ? -1
      //     : 0
      // );
      // this.getSpanArr(this.tableData);
      this.listLoading = false;
    },
    changeType() {
      //console.log("a");
      this.watchType = true;
    },
    lockCriteria(row) {
      LockCriteriaDefine({ CriteriaID: row.CriteriaID }).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: row.Status == 1 ? "Đã khóa tiêu chí" : "Đã mở tiêu chí",
            type: "success"
          });
        }
        this.watchType = true;
        this.fetchData();
      });
    },
    changeTypeEm(val) {
      GetReferenceCode({
        EmpType: val.TypeCode
      }).then(res => {
        if (res.RespCode == 0) {
          this.LstCode = res.ReferenceCodeLst;
        }
      });
    },
    fetchLevel() {
      GetEmployeeLevel().then(res => {
        if (res.RespCode == 0) {
          this.Levels = res.LevelLst;
        }
      });
    }
    // getSpanArr(data) {
    //   this.spanArr = [];
    //   for (var i = 0; i < data.length; i++) {
    //     if (i === 0) {
    //       this.spanArr.push(1);
    //       this.pos = 0;
    //     } else {
    //       // Determine whether the current element is the same as the previous element
    //       if (data[i].ReferenceCode === data[i - 1].ReferenceCode) {
    //         this.spanArr[this.pos] += 1;
    //         this.spanArr.push(0);
    //       } else {
    //         this.spanArr.push(1);
    //         this.pos = i;
    //       }
    //     }
    //   }
    // },
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 1) {
    //     const _row = this.spanArr[rowIndex];
    //     const _col = _row > 0 ? 1 : 0;
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     };
    //   }
    // }
  },
  created() {
    this.fetchLevel();
    GetEmployeeDefine().then(res => {
      if (res.RespCode == 0) {
        this.emTypeLst = res.EmployeeTypeLst.map(item => {
          item.Description = item.Description.toString()
            .replace("Nhân viên", "")
            .trim();
          return item;
        });
      }
    });
    if (this.typeOTC == 10 || this.typeOTC == 28 || this.typeOTC == 29) {
      this.modeAdmin = true;
    }
  },
  watch: {}
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
<style>
.custom-modal {
  width: 880px !important;
  max-width: 98%;
  margin-top: 5px !important;
}
</style>
