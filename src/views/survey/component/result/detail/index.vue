<template>
  <div shadow="always" style="margin: auto; width: 700px; position: relative;">
    <div>
      <el-card>
        <span
          style="font-weight:700;color: #02bc77;font-size: 20pt;word-break:break-word;"
          >{{ this.lines[0].Name }}</span
        >
        <!-- <el-input placeholder="Nhập tiêu đề"  v-model="title"></el-input> -->
      </el-card>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="Câu hỏi">
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
                      <span> {{ index + 1 }}. </span>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <span> {{ line.Content }} </span>
                  </el-col>
                </el-row>
                <div
                  v-if="line.TypeQuestion == 1"
                  class="grid-content bg-purple-light"
                >
                  <el-input
                    placeholder="Nhập câu trả lời"
                    v-model="line.answer"
                  ></el-input>
                </div>
                <div v-if="line.TypeQuestion == 2" class="">
                  <el-radio-group
                    style="margin-left:28px;"
                    v-model="line.answer"
                    v-for="(select, index) in line.select"
                    :key="index"
                  >
                    <div style="width: 500px;">
                      <el-radio :label="select.IDSelect">{{
                        select.Name
                      }}</el-radio>
                    </div>
                  </el-radio-group>
                  <!-- 
                    <div v-for="(select, index) in line.select" :key="index">
              <el-radio v-model="radio" label="index">{{ select.Name }}</el-radio>
                </div> -->
                </div>
                <div
                  v-if="line.TypeQuestion == 3"
                  class="grid-content bg-purple-light"
                >
                  <el-checkbox-group
                    v-model="line.answer"
                    style="margin-left:28px;"
                  >
                    <el-checkbox
                      style="width: 500px;"
                      v-for="select in line.select"
                      :label="select.IDSelect"
                      :key="select.IDSelect"
                      >{{ select.Name }}</el-checkbox
                    >
                  </el-checkbox-group>
                  <!-- <div v-for="(select, index) in line.select" :key="index">
              <el-radio v-model="radio" label="1">{{ select.Name }}</el-radio>
                </div> -->
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <!-- <div ><el-button type="primary" icon="fas fa-plus"  @click="addLine" > Tạo phiếu khảo sát</el-button> </div> -->
      </el-tab-pane>
      <el-tab-pane label="Phản hồi">
        <responseResult></responseResult>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Question1 from "@/views/survey/component/question1/index";
import Question2 from "@/views/survey/component/question2/index";
import Question3 from "@/views/survey/component/question3/index";
import ResponseResult from "@/views/survey/component/result/detail/component/index";
import Cookies from "js-cookie";
import {
  GetSurveyByID,
  SubmitSurvey,
  GetResponseSurveyByID,
  GetResult
} from "@/api/survey";

export default {
  name: "PhoneNumberLine",
  components: {
    ResponseResult
  },

  data() {
    return {
      lines: [],
      acc: 0,
      select1: []
    };
  },
  watch: {
    $route: "fetchData"
    // '$route': 'fetchResponse'
  },
  methods: {
    submit() {
      var req = {
        IDEmployee: Cookies.get("idEmployee"),
        lines: this.lines
      };
      SubmitSurvey(req).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Hoàn thành phiếu khảo sát",
            type: "success",
            position: "top-left"
          });
        }
      });
    },
    handleCheckedCitiesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    fetchData() {
      //this.coin = list_coins[this.$route.params.id]
      var req = {
        ID: this.$route.params.id
      };
      GetSurveyByID(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data;
        }
      });
    },
    fetchResponse() {
      //this.coin = list_coins[this.$route.params.id]
      var req = {
        ID: this.$route.params.id
      };
      GetResult(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data;
        }
      });
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    this.fetchData();
    // this.fetchResponse();
  }
};
</script>
