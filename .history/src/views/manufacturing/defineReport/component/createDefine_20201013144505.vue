<template>
  <div shadow="always" style="margin: auto; position: relative;">
    <!-- <div style="font-weight: bold; text-align: center;color: #409EFF;font-size: large;" >
      TẠO MẪU BÁO CÁO</div>
      <div style="margin-top: 20px;"></div> -->
    <div>
      <el-card>
        <span>Tên báo cáo</span>
        <el-input placeholder="Nhập tiêu đề" v-model="title"></el-input>
        <div style="margin-top: 20px;">
          <span class="demonstration">Email</span>
          <el-select
            v-model="Email"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Nhập Email người nhận báo cáo"
            style="width:100%;"
          >
            <el-option
              v-for="item in Email"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </el-card>
    </div>

    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" id="row">
        <div class="element">
          <el-tooltip v-if="index > 0" content="Chuyển mục này lên trên">
            <el-button size="mini" @click="up(index)"
              ><i class="el-icon-caret-top"></i
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="index == 0 && lines.length > 1"
            content="chuyển mục này xuống dưới"
          >
            <el-button size="mini" @click="dow(index)"
              ><i class="el-icon-caret-bottom"></i
            ></el-button>
          </el-tooltip>
          <el-tooltip content="Thêm câu hỏi" placement="top"
            ><el-button
              v-if="index + 1 === lines.length"
              @click="addLine"
              type="success"
              size="mini"
              ><i class="fas fa-plus"></i>Thêm</el-button
            ></el-tooltip
          >
          <el-tooltip content="Xóa câu hỏi" placement="top"
            ><el-button
              v-if="index > 0 || lines.length > 1"
              type="danger"
              @click="deleteLine(index)"
              size="mini"
              ><i class="fas fa-minus"></i>Xóa</el-button
            ></el-tooltip
          >
        </div>
        <div>
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <div
                class="grid-content bg-purple-light"
                style="padding-top: 0px; margin-left: 3px;"
              ></div>
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 10px; margin-left: 3px;"
                >
                  <span> {{ index }}. </span>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <el-input
                    placeholder="Nhập tiêu đề nội dung (VD: Địa chỉ, Họ và tên,...)"
                    v-model="line.Question"
                  ></el-input>
                </div>
              </el-col>
              <el-col style="margin-left: 20px;" :span="6"
                ><div class="grid-content bg-purple">
                  <el-select
                    v-model="line.Type"
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
              :is="line.QuestionID"
              @change="addOK"
            ></component>
            <el-tooltip></el-tooltip>
            <el-switch
              v-model="line.Require"
              style="float: right; margin-top:10px;"
              inactive-text="Bắt buộc"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-card>
        </div>
      </div>
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        type="primary"
        icon="fas fa-plus"
        @click="addDefine"
        v-if="this.report == null"
      >
        Xác nhận tạo báo cáo</el-button
      >
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        type="warning"
        icon="el-icon-edit"
        @click="UpdateDefine"
        v-if="this.report != null"
      >
        Xác nhận chỉnh sửa</el-button
      >
    </div>
  </div>
</template>
<script>
import Question1 from "@/views/manufacturing/defineReport/component/question1/index";
import Question2 from "@/views/manufacturing/defineReport/component/question2/index";
import Question3 from "@/views/manufacturing/defineReport/component/question3/index";
import Question4 from "@/views/manufacturing/defineReport/component/question4/index";
import Question5 from "@/views/manufacturing/defineReport/component/question5/index";
import Question6 from "@/views/manufacturing/defineReport/component/question6/index";
import Question7 from "@/views/manufacturing/defineReport/component/question7/index";
import Question8 from "@/views/manufacturing/defineReport/component/question8/index";
import { createReportDefine } from "@/api/productionReport";
import Cookies from "js-cookie";
export default {
  components: {
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
    Question7,
    Question8
  },
  props: ["report"],
  data() {
    return {
      lines: [],
      acc: 0,
      typeQuestion: "",
      TimeStart: "",
      TimeEnd: "",
      title: "",
      blockRemoval: true,
      Email: [],
      types: [
        {
          label: "Đoạn văn",
          value: "1"
        },
        {
          label: "Trắc nghiệm",
          value: "2"
        },
        {
          label: "Hộp kiểm",
          value: "3"
        },
        {
          label: "Tải ảnh",
          value: "4"
        },
        {
          label: "Email",
          value: "5"
        },
        {
          label: "Ngày",
          value: "6"
        },
        {
          label: "Số",
          value: "7"
        },
        {
          label: "Quét QR",
          value: "8"
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
      let checkEmptyLines = this.lines.filter(line => line.Question === null);
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      this.lines.push({
        Question: null,
        Type: null,
        QuestionID: "question1",
        SelectAnswer: "",
        Require: 1
      });
    },
    deleteLine(index) {
      this.lines.splice(index, 1);
    },
    addDefine() {
      var parsedobj = JSON.parse(JSON.stringify(this.Email));
      var selectAn = "";
      parsedobj.forEach(function(item, index, arr) {
        if (index == 0) {
          selectAn += item;
        } else {
          selectAn += ";" + item;
        }
      });
      function getSelect(item) {
        var stringArray = [item.arr, item.select].join("-");
        return stringArray;
      }
      function getString(item) {
        var stringArray = [item.Question, item.Type, item.Require].join(";");
        var stringSelect = item.SelectAnswer.map(getSelect);
        return stringArray + ";" + stringSelect + "*";
      }
      var req = {
        token: Cookies.get("token"),
        ReportLineLst: this.lines,
        ReportName: this.title,
        Email: selectAn
      };
      // var ok = false
      // this.lines.forEach(fun)
      // function fun(item, index, arr) {
      //   if (item.Type == 5) {
      //     ok = true
      //   }
      // }
      if (this.title == "" || this.Email == "") {
        this.$message.error("Vui lòng điền đầy đủ thông tin");
      } else {
        createReportDefine(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$message({
              message: "Tạo định nghĩa thành công",
              type: "success"
            });
            this.$emit("click", "a");
          }
        });
      }
    },
    UpdateDefine() {
      this.$notify({
        title: "Sorry",
        message: "Tính năng này đang được phát triển",
        type: "info",
        position: "top-left"
      });
    },
    removeLine(lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1);
    },
    ChangeQuestion(index) {
      this.lines[index].QuestionID = "question" + this.lines[index].Type;
    },
    addOK(selects) {
      var parsedobj = JSON.parse(JSON.stringify(selects));
      var selectAn = "";
      parsedobj.forEach(function(item, index, arr) {
        if (index == 0) {
          selectAn = item.select;
        } else {
          selectAn += ";" + item.select;
        }
      });
      this.lines[parsedobj[0].arr].SelectAnswer = selectAn;
    },
    up(index) {
      var b = this.lines[index];
      this.lines[index] = this.lines[index - 1];
      this.lines[index - 1] = b;
      this.acc++;
    },
    dow(index) {
      var b = this.lines[index];
      this.lines[index] = this.lines[index + 1];
      this.lines[index + 1] = b;
      this.acc++;
    }
    // initForm() {
    //   if (this.report == null) {
    //     this.title = null
    //     this.Email = []
    //     this.lines = []
    //   } else {
    //     this.title = this.report.ReportName
    //     this.Email = this.report.Email
    //     //this.report.ReportLineLst.SelectAnswer=this.report.ReportLineLst.SelectAnswer.split(';',100)
    //     this.lines = this.report.ReportLineLst
    //   }
    // }
  },
  mounted() {
    this.addLine();
  }
};
</script>
<style>
.element {
  display: none;
  padding: 3px;
}
#row:hover {
  border: 1.2px solid #ccc;
  border-radius: 5px;
}
#row:hover .element {
  display: block;
  background-color: #eee;
  transition: 0.5;
}
</style>
