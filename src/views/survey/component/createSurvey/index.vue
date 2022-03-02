<template>
  <div shadow="always" style="margin: auto; width: 700px; position: relative;">
    <div>
      <el-card>
        Phiếu khảo sát
        <el-input placeholder="Nhập tiêu đề" v-model="title"></el-input>
        <div style="display: inline-block">
          <div style="display: inline-block; margin-top: 10px;" class="block">
            <span class="demonstration">Bắt đầu</span>
            <el-date-picker
              v-model="TimeStart"
              type="datetime"
              placeholder="Select date and time"
            >
            </el-date-picker>
          </div>
          <div style="display: inline-block" class="block">
            <span class="demonstration">Kết thúc</span>
            <el-date-picker
              v-model="TimeEnd"
              type="datetime"
              placeholder="Select date and time"
            >
            </el-date-picker>
          </div>
        </div>
        <el-switch
          style=" margin-top:10px;"
          inactive-text="Public"
          v-model="Public"
        ></el-switch>
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div>
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <el-col :span="1">
                <el-tooltip v-if="index > 0" content="Up">
                  <el-button type="text" @click="up(index)"
                    ><i class="fas fa-arrow-up"></i
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="index == 0 && lines.length > 1"
                  content="Down"
                >
                  <el-button type="text" @click="dow(index)"
                    ><i class="fas fa-arrow-down"></i
                  ></el-button>
                </el-tooltip>
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 0px; margin-left: 3px;"
                >
                  <!-- <i class="far fa-question-circle"></i> -->
                </div>
              </el-col>
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 10px; margin-left: 3px;"
                >
                  <!-- <i class="far fa-question-circle"></i> -->
                  <span> {{ index }}. </span>
                </div>
              </el-col>

              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <el-input
                    placeholder="Nhập nội dung câu hỏi"
                    v-model="line.question"
                  ></el-input>
                </div>
              </el-col>

              <el-col style="margin-left: 20px;" :span="6"
                ><div class="grid-content bg-purple">
                  <el-select
                    v-model="line.type"
                    placeholder="Chọn loại câu hỏi"
                    @change="ChangeQuestion(index)"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <component
              :data="index"
              :is="line.currentComponent"
              @change="addOK"
            ></component>
            <el-tooltip></el-tooltip>
            <el-switch
              style="float: right; margin-top:10px;"
              inactive-text="Require"
              v-model="line.require"
            ></el-switch>
            <el-tooltip content="Thêm câu hỏi" placement="top"
              ><el-button
                v-if="index + 1 === lines.length"
                @click="addLine"
                type="text"
                ><i class="fas fa-plus"></i></el-button
            ></el-tooltip>
            <!-- <el-button type="primary" icon="fas fa-plus" v-if="index + 1 === lines.length" @click="addLine" ></el-button> -->
          </el-card>
        </div>
      </div>
    </div>
    <!-- <div ><el-button type="primary" icon="fas fa-plus"  @click="addLine" > Tạo phiếu khảo sát</el-button> </div> -->
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button type="primary" icon="fas fa-plus" @click="addSurvey">
        Tạo phiếu khảo sát</el-button
      >
    </div>
  </div>
</template>

<script>
import Question1 from "@/views/survey/component/question1/index";
import Question2 from "@/views/survey/component/question2/index";
import Question3 from "@/views/survey/component/question3/index";
import { createSurvey } from "@/api/survey";
export default {
  name: "PhoneNumberLine",
  components: {
    Question1,
    Question2,
    Question3
  },

  data() {
    return {
      lines: [],
      acc: 0,
      typeQuestion: "",
      TimeStart: "",
      TimeEnd: "",
      Public: true,
      //currentComponent: 'question1',
      title: "",
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: "Home",
          value: "home"
        },
        {
          label: "Work",
          value: "work"
        },
        {
          label: "Mobile",
          value: "mobile"
        },
        {
          label: "Fax",
          value: "fax"
        }
      ],
      countryPhoneCodes: [
        {
          label: "+90",
          value: "+90"
        },
        {
          label: "+1",
          value: "+1"
        }
      ],
      types: [
        {
          label: "Paragraph",
          value: "1"
        },
        {
          label: "Multiple choice",
          value: "2"
        },
        {
          label: "Checkboxes",
          value: "3"
        }
      ]
    };
  },
  watch: {
    lines() {
      this.blockRemoval = this.lines.length <= 1;
    }
  },
  methods: {
    addLine() {
      let checkEmptyLines = this.lines.filter(line => line.question === null);
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      this.lines.push({
        question: null,
        type: null,
        require: true,
        currentComponent: "question1",
        select: []
      });
    },
    addSurvey() {
      function getSelect(item) {
        var stringArray = [item.arr, item.select].join("-");
        return stringArray;
      }

      function getString(item) {
        var stringArray = [item.question, item.type, item.require].join(";");
        var stringSelect = item.select.map(getSelect);
        return stringArray + ";" + stringSelect + "*";
      }
      //  var req = {
      //   question: this.lines.map(getString).toString(),
      //   title: this.title
      // };

      var req = {
        question: this.lines,
        title: this.title,
        Public: this.Public,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      };

      createSurvey(req).then(respon => {
        if (respon.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Tạo phiếu thành công",
            type: "success",
            position: "top-left"
          });
        }
      });
      //var a = this.lines.map(getString).toString()
      // var b = this.lines.select.map(getString).toString()
      //var b = a.replace(new RegExp('-+', 'g'), '*');
      //str.replace(new RegExp(find, 'g'), replace);
      //console.log(a)
      //console.log(req)
    },
    removeLine(lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1);
    },
    ChangeQuestion(index) {
      this.lines[index].currentComponent = "question" + this.lines[index].type;
    },
    addOK(selects) {
      //console.log(this.lines)
      //console.log(selects);
      var parsedobj = JSON.parse(JSON.stringify(selects));
      this.lines[parsedobj[0].arr].select = parsedobj;
      //console.log(parsedobj[0].arr)
      //alert('6454')
    },
    up(index) {
      //alert(index)
      var b = this.lines[index];
      this.lines[index] = this.lines[index - 1];
      this.lines[index - 1] = b;
      this.acc++;
      //console.log(this.lines)
    },
    dow(index) {
      var b = this.lines[index];
      this.lines[index] = this.lines[index + 1];
      this.lines[index + 1] = b;
      this.acc++;
    }
  },
  mounted() {
    this.addLine();
  }
};
</script>
