<template>
  <div shadow="always" style="margin: auto;  position: relative;">
    <div>
      <el-card>
        <div
          style="font-weight: bold; font-size: 30px;"
          v-if="this.lines[1].Title"
        >
          {{ this.lines[1].Title }}
        </div>
        <div style="margin-top: 20px;" class="inline-block">
          TDV: {{ row.NameEmployee }} -- Nhóm: {{ row.IDGroup }}
        </div>
        <div style="margin-top: 20px;" class="inline-block">
          NKT: {{ row.NameTeacher }}
        </div>
        <div style="margin-top: 20px;" class="inline-block">
          NGS: {{ row.NameAccept }}
        </div>

        <div style="margin-top: 20px;">
          Thang điểm đánh giá: 100 điểm (Từ 80 điểm trở lên mới đạt yêu cầu)
        </div>

        <!-- <el-input placeholder="Nhập tiêu đề"  v-model="title"></el-input> -->
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style=" margin-left: 3px;"
                >
                  <!-- <i class="far fa-question-circle"></i> -->
                  <span style="font-weight: bold;"> {{ index + 1 }}. </span>
                </div>
              </el-col>
              <el-col :span="22">
                <div style="font-weight: bold;">
                  {{ line.Part }}: {{ line.Skill }}
                </div>
                <div style="" v-if="line.Target && line.OTC != 3">
                  ( {{ line.Target }} )
                </div>
                <div
                  style="font-weight: bold; color: red;"
                  v-if="line.OTC != 3"
                >
                  ( Điểm tối đa: {{ line.Point }} )
                </div>
              </el-col>
            </el-row>
            <div class="grid-content bg-purple-light" style="margin-left:30px">
              <el-radio-group
                v-if="line.OTC == 3"
                style="margin-bottom:10px"
                v-model="line.valSelect"
                @change="changeSelect(line)"
              >
                <el-radio :label="1">Đạt</el-radio>
                <el-radio :label="0">Không đạt</el-radio>
              </el-radio-group>
              <el-input
                placeholder="Nhập đánh giá"
                v-model="line.answer"
              ></el-input>
              <div v-if="line.OTC != 3">
                Điểm:
                <el-input
                  style="width: 150px;"
                  placeholder="Nhập điểm"
                  type="number"
                  v-model="line.point"
                ></el-input>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div>
        <el-button type="primary" icon="fas fa-plus" @click="point"
          >Tính điểm</el-button
        >
      </div>
      <div>Tổng điểm : {{ sum }}</div>
    </div>

    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button type="primary" icon="fas fa-plus" @click="submit">
        Xác nhận đánh giá</el-button
      >
    </div>
  </div>
</template>

<script>
import Question1 from "@/views/report/define/component/question1/index";
import Question2 from "@/views/report/define/component/question2/index";
import Question3 from "@/views/report/define/component/question3/index";
import Cookies from "js-cookie";
import { StartReport, WorkReport } from "@/api/reportRole";
import { GetGroupEmployee } from "@/api/groups";

export default {
  name: "",
  components: {},
  props: ["row"],

  data() {
    return {
      lines: [],
      files: [],
      info: "",
      acc: 0,
      token: Cookies.get("token"),
      select1: [],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      groups: "",
      sum: 0
    };
  },
  watch: {
    row() {
      this.sum = 0;
      this.lines = [];
      this.fetchData();
    }
  },
  methods: {
    point() {
      //alert('ok')
      var _this = this;
      _this.sum = 0;
      this.lines.forEach(fun);

      function fun(item, index, arr) {
        if (item.point == null) {
          item.point = 0;
        }
        _this.sum = parseInt(item.point) + parseInt(_this.sum);
        // alert(_this.sum)
      }
      //alert(this.sum)
      //parseInt(_this.sum)
    },

    submit() {
      var req = {
        point: this.sum,
        lines: this.lines,
        idRole: this.$props.row.RowID
      };
      WorkReport(req).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Hoàn thành phiếu đánh giá",
            type: "success",
            position: "top-left"
          });

          this.$emit("reportOK", "OK");

          // this.$router.push('/hanh-chinh/bao-cao/dinh-nghia');
        }
      });
    },

    fetchData() {
      //this.coin = list_coins[this.$route.params.id]
      var req = {
        idAccept: this.row.EmployeeAcceptID,
        idTeacher: this.row.EmployeeTeacherID,
        idStudent: this.row.EmployeeStudentID
      };
      StartReport(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data.map(item => {
            return {
              ...item,
              valSelect: 3
            };
          });
        }
      });
    },
    changeSelect(val) {
      if (val.OTC == 3) {
        if (val.valSelect === 1) {
          val.point = val.Point;
          if (val.answer.length == 0) {
            val.answer = "Đạt";
          }
        } else {
          val.point = 0;
          if (val.answer.length == 0) {
            val.answer = "Không đạt";
          }
        }
      }
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    this.fetchData();
    //this.fetchGroup()
    //console.log(this.$props.row);
  }
};
</script>
