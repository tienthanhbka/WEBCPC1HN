<template>
  <div class="container">
    <div class="inline-block">
      <el-select clearable v-model="GroupID" placeholder="-- Chọn nhóm --">
        <el-option
          v-for="item in groupList"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
    </div>
    <div v-show="show" class="inline-block">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo nhân viên..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        @click="ExportExcel"
        :loading="downloading"
        class="inline-block"
        plain
        ><i class="fas fa-file-excel"></i
      ></el-button>
    </div>
    <!-- <div class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo ý tưởng..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div> -->
    <div class="body" style="background-color:#fff;">
      <el-table
        class="el-mobile-table"
        :data="
          OfferList.filter(
            data =>
              !TextSearch ||
              data.CreaterName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        border
        stripe
        fit
      >
        <el-table-column width="80px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Đánh giá">
                <el-button
                  @click="EvaluateOffer(scope.row)"
                  type="text"
                  style="color:#409eff;margin-left:15px;"
                  ><i class="fas fa-medal"></i></el-button
              ></el-tooltip>
              <!-- <el-tooltip content="Xóa">
                <el-button
                  @click="delOffer(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tên ý tưởng" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên ý tưởng">
              <el-button type="text" @click="viewInitiative(scope.row)">
                <el-link>{{ scope.row.OfferName }}</el-link></el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tài liệu" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tài liệu">
              <el-link v-if="scope.row.Upfile">FILE</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Phân loại"
          width="150"
          :filters="[
            { text: 'Phát hiện vấn đề', value: 'Phát hiện vấn đề' },
            { text: 'Đề xuất ý tưởng', value: 'Đề xuất ý tưởng' }
          ]"
          :filter-method="filterType"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Phân loại">
              {{ scope.row.OfferType | toTypeText }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người đề xuất" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người đề xuất">
              {{ scope.row.CreaterName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhóm" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhóm">
              {{ scope.row.GroupID }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Thời gian đề xuất"
          prop="date"
          width="160"
          sortable
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian đề xuất">
              {{
                Date.parse(scope.row.TimeCreate).toString("HH:mm dd/MM/yyyy")
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          width="100"
          align="center"
          :filter-method="filterStatus"
          :filters="[
            { text: 'Mới tạo', value: 1 },
            { text: 'Đã duyệt', value: 3 },
            { text: 'Đã hủy', value: 0 },
            { text: 'Đã đánh giá', value: 5 }
          ]"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                style="width: 80px;"
                effect="plain"
                :type="scope.row.Status | ideaStatusColor"
              >
                {{ scope.row.Status | ideaStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :page-size="10"
        :total="30"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
    <div class="container-footer">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-card>
            <chart :chartData="chartData"></chart>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-card>
            <chart :chartData="chartData"></chart>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogFormAccept" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #19B5FE;font-size: 20pt;"
        ><i class="fas fa-medal"></i> &#32;&#32;Đánh giá đề xuất
      </span>
      <accept
        :offer="rowData"
        @cancel="cancelOK"
        @Approved="Approved"
        @Evaluated="Evaluated"
      ></accept>
      <span slot="footer"></span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-lightbulb"></i> &#32;&#32;Chi tiết
      </span>
      <detail :offer="rowData" @cancel="cancelView"></detail>
      <span slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { db, storage } from "../firebase";
import Cookies from "js-cookie";
import {
  GetOfferIdeaByUser,
  GetOfferIdeaByID,
  GetOfferIdeaByGID,
  DelOfferIdea
} from "@/api/offerIT";
import { getStartDate, getEndDate } from "@/api/index";
import { GetGroupEmployee, getEmployeesByIdGroup } from "@/api/groups";
import Accept from "../component/acceptInitiative";
import Detail from "../component/detailInitiative";
import Chart from "../component/chart";
export default {
  components: {
    Accept,
    Detail,
    Chart
  },
  data() {
    return {
      OfferList: [],
      show: false,
      GroupID: "",
      rowData: "",
      chartData: [],
      groupList: [],
      NumNew: 0,
      NumAppr: 0,
      NumDel: 0,
      NumEval: 0,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      TextSearch: "",
      downloading: false,
      dialogFormAccept: false,
      dialogFormDetail: false,
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token")
    };
  },
  methods: {
    EvaluateOffer(row) {
      this.rowData = row;
      this.dialogFormAccept = true;
    },
    Approved() {
      this.dialogFormAccept = false;
      this.fetchData();
    },
    Evaluated() {
      this.dialogFormAccept = false;
      this.fetchData();
    },
    viewInitiative(row) {
      this.rowData = row;
      this.dialogFormDetail = true;
    },
    cancelView() {
      this.dialogFormDetail = false;
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    delOffer(row) {
      this.$confirm(
        "Xác nhận xóa đề xuất " + row.NameOffer + ". Continue?",
        "Xóa mẫu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          db.ref("/OfferList/" + row.OfferID).remove();
          this.$message({
            message: "Xóa thành công ",
            type: "success"
          });
          this.fetchData();
        })
        .catch(() => {});
    },
    fetchGroup() {
      var req = {
        idEmployee: this.UserName,
        token: this.Token
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.GroupID = response.Data[0].idGroup;
      });
    },
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd,
        GroupID: this.GroupID
      };
      GetOfferIdeaByGID(req).then(res => {
        if (res.RespCode == 0) {
          this.OfferList = res.OfferIdeaLst;
          let b = [];
          var _this = this;
          _this.OfferList.forEach(item => {
            switch (item.Status) {
              case 1:
                _this.NumNew++;
                break;
              case 0:
                _this.NumDel++;
                break;
              case 3:
                _this.NumAppr++;
                break;
              case 5:
                _this.NumEval++;
                break;
            }
          });
          b.push(
            { value: this.NumNew, name: "Mới tạo" },
            { value: this.NumAppr, name: "Đã duyệt" },
            { value: this.NumEval, name: "Đã đánh giá" },
            { value: this.NumDel, name: "Đã hủy" }
          );
          this.chartData = b;
        } else {
          this.$message({
            message: res.RespText,
            type: "error"
          });
        }
      });
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Tên đề xuất",
        "Phân loại",
        "Mô tả hiện trạng",
        "Lý do",
        "Mô tả đề xuất",
        "Kế hoạch",
        "Kinh phí dự trù",
        "Thời gian hoàn thành",
        "Thành viên cùng thực hiện",
        "Người tạo",
        "Thời gian tạo",
        "Trạng thái"
      ];
      const filterHeader = [
        "NameOffer",
        "TypeOffer",
        "MoreInfo",
        "Reason",
        "Suggestion",
        "Plan",
        "Budget",
        "TimeComplete",
        "Teammate",
        "Creator",
        "TimeCreate",
        "Status"
      ];
      var data = this.OfferList;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách đề xuất cải tiến", //Optional
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
            return this.$options.filters.ideaStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    filterType(value, row) {
      return row.TypeOffer === value;
    },
    filterStatus(value, row) {
      return row.Status === value;
    }
  },
  created() {
    this.fetchData();
    this.fetchGroup();
  },
  watch: {
    GroupID() {
      this.fetchData();
    }
  },
  filters: {
    toTypeText(val) {
      if (val == 2) {
        return "Đề xuất cải tiến";
      } else if (val == 1) {
        return "Phát hiện vấn đề";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 20px;
  background-color: $bg;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  padding: 10px;
}
.container-footer {
  padding: 10px 0px;
}
</style>
