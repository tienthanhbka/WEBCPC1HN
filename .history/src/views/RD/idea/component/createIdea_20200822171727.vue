<template>
  <div>
    <modal id="new-idea-modal" ref="new-idea-modal" v-cloak>
      <template slot="title"
        ><i class="far fa-lightbulb"></i>
        &#32;&#32;Đề xuất ý tưởng 
      </template>
      <div slot="body">
        <el-row :gutter="20">
          <el-form
            ref="form"
            label-position="top"
            size="small"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
          <el-col :span="24">
              <el-form-item label="Tên ý tưởng" prop="IdeaName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.IdeaName"
                  style="width:100%"
                  placeholder="Nhập tên ý tưởng..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
          </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Nội dung" prop="IdeaContent">
                <el-input
                  class="selectIDGroup"
                  v-model="form.IdeaContent"
                  style="width:100%"
                  placeholder="Nhập nội dung..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Cách bào chế" prop="Preparation">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Preparation"
                  style="width:100%"
                  placeholder="Nhập cách bào chế..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hoạt chất" prop="ActiveElement">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.ActiveElement"
                  :fetch-suggestions="querySearch"
                  placeholder="Chọn hoạt chất..."
                  @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.ActiveElement }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Tài liệu đính kèm" prop="MoreInfo">
                      <a href="" target="_blank" v-if="idea == null"></a>
                <a href="" target="_blank" v-if="idea != null">{{ form.MoreInfo }}</a>
                <el-upload
                    class="upload-demo"
                    ref="uploadFileidea"
                    :action="uploadFile"
                    :before-remove="beforeRemove"
                    :on-change="onFileChange"
                    :auto-upload="false"
                    :file-list="fileList"
                >
                    <el-button size="small" type="info" plain
                    >Chọn tệp</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          v-if="this.idea == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addIdea('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="this.idea != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="addIdea('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { CreateIdeaInfo, UpdateIdeaInfo } from "@/api/idea"
import { uploadFile } from "@/api/file"
import { GetActiveElement } from "@/api/defaultRD"
import Cookies from "js-cookie"
import baseUrl from "@/utils/baseURLRD"
import { setTimeout } from "timers"
export default {
  props: ["idea"],
  components: {},
  computed: {
    uploadFile() {
           return (
        baseUrl +
        "File/UploadFileIdea" +
        "?DocumentId=" +
        this.form.DocumentId +
        "&Token=" +
        Cookies.get("token") +
        "&UserName=" +
        Cookies.get("idEmployee") +
        "&FileName=" +
        (this.file ? this.file.name.split('.',100)[0] : "")
      )
    }
  },
  data() {
    var validateDeadline = (rule, value, callback) => {
      if (value < new Date().toISOString().slice(0, 10)) {
        callback(new Error("Hãy chọn ngày trong tương lai"));
      } else {
        callback();
      }
    };
    return {
      fileList:[],
      ActiveElement: [],
      rules: {
        IdeaName: [
          {
            required: true,
            message: "Hãy nhập tên ý tưởng",
            trigger: "change"
          }
        ],
        IdeaContent: [
          {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ],
        ActiveElement: [
          {
            required: true,
            message: "Hãy chọn hoạt chất",
            trigger: "change"
          }
        ],
        Preparation: [
          {
            required: true,
            message: "Hãy chọn cách bào chế",
            trigger: "change"
          }
        ]
      },
      form: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: "",
        DocumentId: null
      },
      EmployeeTypeLst:[],
      file:''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.ActiveElement
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links
      // call callback function to return suggestion objects
      cb(results)
    },
    onFileChange(file, fileList) {
      this.file = file
    },
    handleSelect(item) {
      this.form.ActiveElement = item.ActiveElement
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link))
        return (
          link.ActiveElement.toLowerCase().indexOf(
            queryString.toLowerCase()
          ) === 0
        )
      }
    },
    addIdea(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.idea == null) {
        var rep = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          IdeaInfo: this.form
        }
        CreateIdeaInfo(rep).then(res => {
          this.form.DocumentId = res.DocumentID
          this.$message({
            message: "Tạo ý tưởng thành công",
            type: "success",
          })
          this.$emit("createIdeaOK", this.IdeaInfo)
          setTimeout(() => {
            this.$refs.uploadFileidea.submit()
          }, 0)
        })
      } else {
        this.form.DocumentId = this.idea.DocumentId
        var rep = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          IdeaInfo: this.form
        }
        UpdateIdeaInfo(rep).then(res => {
          this.$refs.uploadFileidea.submit()
          this.$message({
            message: "Cập nhật ý tưởng thành công",
            type: "success",
          })
          this.$emit('updateIdeaOK')
        })
      }
        } else {
          return false;
        }
      })
    },
    closeModal() {
      VoerroModal.hide("new-idea-modal")
    },
    fetchData() {
      var req = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token")
      };
      GetEmployeeDefine(req).then(res => {
        if (res.RespCode == 0) {
          this.EmployeeTypeLst = res.EmployeeTypeLst
        }
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    initForm(){
      if(this.idea){
        this.form.IdeaName = this.idea.IdeaName,
        this.form.IdeaContent = this.idea.IdeaContent,
        this.form.ActiveElement = this.idea.ActiveElement,
        this.form.Preparation = this.idea.Preparation,
        this.form.MoreInfo = this.idea.MoreInfo,
        this.form.DocumentId = this.idea.DocumentId
      }
      else{
        this.form.IdeaName = null,
        this.form.IdeaContent = null,
        this.form.ActiveElement = null,
        this.form.Preparation = null,
        this.form.MoreInfo = null,
        this.form.DocumentId = null
      }
    }
  },
  mounted() {},
  watch: {
    idea(){
      this.initForm()
    }
  },
  created() {
    console.log(this.idea)
    GetActiveElement({
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      Search: ""
    }).then(res => {
      this.ActiveElement = res.ActiveElementLst
    })
    this.initForm()
  },
};
</script>
<style>
.selectIDGroup .el-input__inner {
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box {
  width: 50%;
}
</style>
