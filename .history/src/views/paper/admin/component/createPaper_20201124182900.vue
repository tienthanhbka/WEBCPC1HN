<template>
  <div shadow="always" style="margin: auto; width: 700px; position: relative;">
    <div>
      <el-card>
        <div style="font-weight: bold; text-align: center;color: #009999;">
          ĐỊNH NGHĨA THỦ TỤC HÀNH CHÍNH
        </div>
        <div style="margin-top: 20px;">
          <span class="t-form-label">Tên thủ tục hành chính:</span>
          <el-input
            style=""
            placeholder="Tên thủ tục hành chính"
            v-model="title"
          ></el-input>
        </div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <div style="margin-top: 20px;">
              <span class="t-form-label" style="display:block;"
                >Loại thủ tục:</span
              >
              <el-select
                style="width:100%;"
                v-model="TypeService"
                placeholder="Loại thủ tục hành chính"
              >
                <el-option
                  v-for="item in ServiceLst"
                  :key="item.DefaultValue"
                  :label="item.DefaultValue"
                  :value="item.DefaultValue"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div style="margin-top: 20px;">
              <span style="margin-top: 20px;" class="t-form-label"
                >Mã thủ tục:</span
              >
              <el-input
                placeholder="Nhập mã thủ tục hành chính"
                v-model="TypePaper"
              ></el-input>

              <!-- <el-upload
                class="upload-demo"
                :action="
                  'http://ctsv.hust.edu.vn/api-q/File/Upload?TokenCode=' +
                    TokenCode
                "
                :on-change="handleChange"
                :on-remove="remove"
                :on-exceed="handleExceed"
                auto-upload="true"
                limit="1"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">Chọn file</el-button>
              </el-upload> -->
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <div style="margin-top: 20px;">
              <span class="t-form-label">Đơn vị xử lý:</span>
              <el-select
                style="width:100%;"
                v-model="Office"
                placeholder="Chọn đơn vị xử lý"
              >
                <el-option
                  v-for="item in OfficeLst"
                  :key="item.DefaultValue"
                  :label="item.DefaultValue"
                  :value="item.DefaultValue"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <!-- <div style="margin-top: 20px;">
      <span  >Người xử lý:</span>
      <el-input  style="" placeholder="Người xử lý"  v-model="title"></el-input>
         </div> -->
            <div style="margin-top: 20px;">
              <span class="t-form-label">Đối tượng:</span>
              <el-select
                style="width:100%;"
                v-model="TypeUser"
                placeholder="Chọn đối tượng"
              >
                <el-option
                  v-for="item in objectLst"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <div style="margin-top: 20px;">
              <span style="margin-top: 20px;" class="t-form-label"
                >Chọn mẫu:</span
              >

              <el-upload
                class="upload-demo"
                :action="
                  'http://ctsv.hust.edu.vn/api-q/File/Upload?TokenCode=' +
                    TokenCode
                "
                :on-change="handleChange"
                :on-remove="remove"
                :on-exceed="handleExceed"
                auto-upload="true"
                limit="1"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">Chọn file</el-button>
              </el-upload>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div style="margin-top: 20px;">
              <span class="t-form-label">Trả lời tự động:</span>
              <el-switch v-model="Automatic"> </el-switch>
            </div>
          </el-col>
        </el-row>
        <div style="margin-top: 20px;" v-if="Automatic">
          <span class="t-form-label">Câu trả lời tự động:</span>
          <el-input
            placeholder="Nhập câu trả lời tự động"
            v-model="Message"
          ></el-input>
        </div>

        <div style="margin-top: 20px;">
          <span style="margin-top: 20px;" class="t-form-label">Mô tả:</span>
          <!-- <el-input id="mytextarea" type="text-area" placeholder="Ghi chú"  v-model="DescriptionPaper"></el-input> -->
          <!-- <textarea id="mytextarea">Hello, World!</textarea> -->
          <!-- <ckeditor id="editor" :editor="editor" v-model="DescriptionPaper" :config="editorConfig"></ckeditor> -->
          <editor
            api-key="no-api-key"
            v-model="DescriptionPaper"
            :init="{
              menubar: false
            }"
          />
        </div>
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
              <el-col :span="3">
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 10px; margin-left: 3px;"
                >
                  <!-- <i class="far fa-question-circle"></i> -->
                  <span class="t-form-label"> Câu hỏi {{ index + 1 }}. </span>
                </div>
              </el-col>
              <el-col style="margin-left: 20px;" :span="6"
                ><div class="grid-content bg-purple">
                  <el-select
                    v-model="line.TypeQuestion"
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
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <el-input
                    placeholder="Nhập Câu hỏi"
                    v-model="line.Question"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <component
              :data="index"
              :is="line.currentComponent"
              @change="addOK"
            ></component>
            <!-- <question></question> -->
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
      <el-button type="primary" icon="fas fa-plus" @click="createNewPaper">
        Tạo giấy tờ mới</el-button
      >
    </div>
  </div>
</template>

<script>
import Question1 from "../component/Question1";
import Question2 from "../component/Question2";
import Question3 from "../component/Question3";
import Cookies from "js-cookie";
import Editor from "@/components/Tinymce/index";

export default {
  name: "PhoneNumberLine",
  components: {
    Question1,
    Question2,
    Question3,
    Editor
  },

  data() {
    return {
      editorData: "<p>Content of the editor.</p>",
      fileList: [],
      OfficeLst: [],
      ServiceLst: [],
      editorConfig: {
        // The configuration of the editor.
      },
      lines: [],
      Office: "",
      TypeService: "",
      TokenCode: Cookies.get("TokenCode"),
      TypePaper: "",
      dialogImageUrl: "",
      dialogVisible: false,
      acc: 0,
      Message: "",
      TypeUser: "",
      Automatic: false,
      typeQuestion: "",
      TimeStart: "",
      TimeEnd: "",
      Public: true,
      currentComponent: "question1",
      title: "",
      file: "",
      DescriptionPaper: "",
      blockRemoval: true,
      objectLst: [
        {
          label: "Sinh Viên",
          value: 0
        },
        {
          label: "Giảng Viên",
          value: 1
        },
        {
          label: "Doanh nghiệp",
          value: 2
        },
        {
          label: "Cựu sinh viên",
          value: 3
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleChange(file, fileList) {
      this.file = file.name;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 1, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },

    remove(file, fileList) {
      this.file = "";
    },

    addLine() {
      let checkEmptyLines = this.lines.filter(line => line.Question === null);
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      this.lines.push({
        Question: null,
        indexQuestion: "",
        TypeQuestion: null,
        currentComponent: "question1",
        ContentSelectLst: []
      });
    },
    createNewPaper() {
      function getSelect(item) {
        var stringArray = [item.arr, item.select].join("-");
        return stringArray;
      }

      function getString(item) {
        var stringArray = [item.question, item.TypeQuestion, item.require].join(
          ";"
        );
        var stringSelect = item.select.map(getSelect);
        return stringArray + ";" + stringSelect + "*";
      }

      var req = {
        HSPaperQuestionLst: this.lines,
        Description: this.title,
        File: this.file,
        TypeService: this.TypeService,
        DescriptionPaper: this.DescriptionPaper,
        TypePaper: this.TypePaper,
        Office: this.Office,
        TypSerivce: this.TypSerivce,
        Automatic: this.Automatic,
        Message: this.Message,
        TypeUser: this.TypeUser
      };

      CreateNewPaper(req).then(respon => {
        if (respon.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Tạo giấy tờ mới thành công",
            type: "success",
            position: "top-left"
          });
          this.$router.push("/danh-sach");
        }
      });
    },
    removeLine(lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1);
    },
    ChangeQuestion(index) {
      this.lines[index].currentComponent =
        "question" + this.lines[index].TypeQuestion;
    },
    addOK(selects) {
      //console.log(this.lines)
      //console.log(selects);
      var parsedobj = JSON.parse(JSON.stringify(selects));
      this.lines[parsedobj[0].arr].ContentSelectLst = parsedobj;
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
    },
    fetchServiceLst() {
      const req = {
        TokenCode: this.TokenCode,
        DefaultName: "TypeService"
      };
      GetDefaultValueLst(req).then(res => {
        if (res.RespCode == 0) {
          this.ServiceLst = res.DefaultValueLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    },
    fetchOfficeLst() {
      const req = {
        TokenCode: this.TokenCode,
        DefaultName: "Office"
      };
      GetDefaultValueLst(req).then(res => {
        if (res.RespCode == 0) {
          this.OfficeLst = res.DefaultValueLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    }
  },
  mounted() {
    this.addLine();
  },
  created() {
    this.fetchServiceLst();
    this.fetchOfficeLst();
  }
};
</script>
<style scoped>
.t-form-label {
  font-size: 10pt;
  font-weight: 600;
  color: gray;
  line-height: 20px;
}
</style>
