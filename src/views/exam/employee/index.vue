<template>
  <div class="orderhcm-container">
    <div class="orderhcm-header">
      <div class="inline-block">
        <span class="demonstration">Từ</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="Ngày bắt đầu"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <span class="demonstration">Đến</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="orderhcm-content">
      <el-table
        v-loading="listLoading"
        :data="examList"
        element-loading-text="Loading"
        @expand-change="expandRow"
        border
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <div class="inline-block"><b>Điểm:</b></div>
              <div style="color: red" class="inline-block">
                {{ props.row.point }} / {{ props.row.pointMax }}
              </div>
              <div class="inline-block">
                <b> <i class="el-icon-bottom"></i> </b>
              </div>
              <div class="inline-block"><b> Chi tiết bài thi:</b></div>
            </div>

            <el-table
              :data="props.row.line"
              style="width: 100%;"
              v-model="detailQuestion"
              v-loading="props.row.isLoading"
              element-loading-text="Loading"
            >
              <el-table-column color="red" width="50" label="STT">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="question"
                label="Câu hỏi"
                style="color: bule"
                width="250"
              ></el-table-column>
              <el-table-column label="Phương án lựa chọn">
                <template slot-scope="scope">
                  <span v-if="scope.row.choiceAnswer">{{
                    scope.row.choiceAnswer | jsonParse
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="answer"
                label="Đáp án chọn"
              ></el-table-column>
              <el-table-column
                prop="rightAnswer"
                label="Đáp án đúng"
              ></el-table-column>
              <el-table-column
                prop="point"
                label="Điểm"
                width="70"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="Đề thi" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.infoCompetition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Bắt đầu" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.timeStart }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Kết thúc" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.timeEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Người giao" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.idTeacher }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div :class="{ hidden: hidden }" class="pagination-container"></div>
    </div>
  </div>
</template>

<script>
import { getExam } from "@/api/exam";
import { examDetail } from "@/api/examDetail";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
import { json } from "body-parser";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    jsonParse: function(value) {
      if (value) {
        value = JSON.parse(value);
        return (
          "A: " +
          value.A +
          "; B: " +
          value.B +
          "; C: " +
          value.C +
          "; D: " +
          value.D
        );
      }
    }
  },
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      }
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      TextSearch: "",
      startDate: "",
      endDate: "",
      p: 0,
      listLoading: false,
      examList: [],
      //detail: [],
      detailQuestion: "",
      answer: ""
    };
  },
  methods: {
    fetchData() {
      var req = {
        startDate: this.startDate,
        endDate: this.endDate,
        id: Cookies.get("idEmployee"),
        token: Cookies.get("token"),
        p: this.p
      };
      this.listLoading = true;
      //console.log(req)
      getExam(req).then(response => {
        console.log(response);
        this.examList = response.Data;
        this.total = response.page;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.p = val;
      this.fetchData();
    },
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var idCompetition = row.idCompetition;
        row.isLoading = true;
        examDetail({
          idCompetition: idCompetition,
          id: Cookies.get("idEmployee"),
          token: Cookies.get("token")
        }).then(res => {
          row.lines = res.Data[0];
          row.point = res.Data[0][0].point;
          row.pointMax = res.Data[0][0].pointMax;
          row.line = res.Data[1];

          this.detailQuestion = res.Data[1];
        });
        row.isLoading = false;
      }
    }
  },
  computed: {},
  created() {
    this.startDate = getStartDate();
    this.endDate = getEndDate();
    this.p = 1;
    this.fetchData();
  },
  watch: {
    startDate: function() {
      this.fetchData();
    },
    endDate: function() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.orderhcm-container {
  padding: 20px;
  background-color: $bg;
  min-height: 100vh;

  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
  }

  .table-pagination {
    margin-top: 10px;
  }
}
</style>
