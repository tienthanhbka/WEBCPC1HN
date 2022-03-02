<template>
  <div class="container">
    <div class="inline-block">
      <el-select v-model="TypeEvaluate" placeholder="Chọn loại nhân viên">
        <el-option
          v-for="item in TypeLst"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        style="background-color:#02bc77;color:white;"
        icon="far fa-file-excel"
        @click="ExportExcel"
      >
        Xuất Excel</el-button
      >
    </div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo nhân viên..."
        v-model="TextSearch"
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
    </div>
    <div class="inline-block">
      <el-button
        @click="createCritera"
        icon="fas fa-plus"
        class="pan-btn green-btn"
        >&#32;Tạo tiêu chí
      </el-button>
    </div>
    <create-critera
      modalId="new-critera-modal"
      :critera="rowData"
      :typeEvaluate="TypeEvaluate"
      @criteriaAdded="createOK"
      @criteriaUpdated="updateOK"
    ></create-critera>
    <el-table
      class="el-mobile-table"
      :data="
        CriteriaDefineLst.filter(
          data =>
            !TextSearch ||
            data.EmTypeTxt.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      v-loading="listLoading"
      style="width: 100%"
      border
      fit
      highlight-current-row
      :header-row-style="{ color: '#1c456f' }"
      element-loading-text="Vui lòng chờ..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-table-column align="center" width="100px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="editCriteria(scope.row)" type="text"
                ><i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="delCriteria(scope.row)"
                type="text"
                style="color:red;"
                ><i class="el-icon-delete"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        label="Tiêu chí"
        prop="CriteriaName"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Tiêu chí">
            <p>{{ scope.row.CriteriaName }}</p>
            <span style="font-size:10pt;font-weight:700;">Mô tả:</span>
            <span>{{ scope.row.Description }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100px" label="Mã tham chiếu">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã tham chiếu">
            {{ scope.row.ReferenceCode }}
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column min-width="100px" label="Mô tả">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mô tả">
           
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="100px" label="Định mức">
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

      <el-table-column
        width="140px"
        label="Nhân viên"
        prop="EmTypeTxt"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            {{ scope.row.EmTypeTxt }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="140px"
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
      <el-table-column width="180px" label="Cấp bậc">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cấp bậc">
            {{ scope.row.EmLevel | PositionStatusText }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="Tuổi nghề" prop="WorkOld" sortable>
        <template slot-scope="scope">
          <div class="dat-cell" label="Tuổi nghề">
            {{ scope.row.WorkOld | WorkOldStatusText }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Người đánh giá">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người đánh giá">
            {{ scope.row.EvalueTypeTxt }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Cấp bậc" width="180">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cấp bậc">
            {{ scope.row.EvalueLevel | PositionStatusText }}
          </div>
        </template>
      </el-table-column>
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
import { GetCriteriaDefine } from "@/api/NSCriteriaDefine";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  components: {
    CreateCritera,
    DeleteCritera
  },
  data() {
    return {
      CriteriaDefineLst: [],
      dialogFormDel: false,
      listLoading: false,
      downloading: false,
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      rowData: "",
      show: "",
      TextSearch: "",
      TypeEvaluate: "TV",
      TypeLst: [
        {
          value: "TV",
          label: "Thử việc"
        },
        {
          value: "CT",
          label: "Chính thức"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ]
    };
  },
  methods: {
    createCritera() {
      VoerroModal.show("new-critera-modal");
      this.rowData = null;
    },
    createOK() {
      this.fetchData();
    },
    editCriteria(row) {
      VoerroModal.show("new-critera-modal");
      this.rowData = row;
    },
    updateOK() {
      this.fetchData();
    },
    delCriteria(row) {
      this.dialogFormDel = true;
      this.rowData = row;
    },
    deleteOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    cancel() {
      this.dialogFormDel = false;
    },
    fetchData() {
      this.listLoading = true;
      GetCriteriaDefine({
        Token: this.Token,
        UserName: this.UserName,
        TypeEvaluate: this.TypeEvaluate
      }).then(res => {
        if (res.RespCode == 0) {
          this.CriteriaDefineLst = res.CriteriaDefineLst;
          this.listLoading = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
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
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    TypeEvaluate() {
      this.fetchData();
    }
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
