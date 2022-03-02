<template>
  <el-form
    ref="form"
    :model="ReportMarketInfo"
    label-position="top"
    label-width="200px"
    size="mini"
  >
    <!-- <el-form-item label="Tên ý tưởng">
      <el-input
        v-model="IdeaInfo.IdeaName"
        @keyup.native.enter="handleEnter"
      ></el-input>
    </el-form-item>
    
    <el-form-item label="Hoạt chất">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="IdeaInfo.ActiveElement"
        :fetch-suggestions="querySearch2"
        placeholder="Gõ gợi ý và chọn"
        @select="handleSelect"
      >
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick2"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="idGroup">{{ item.ActiveElement }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="Cách bào chế">
      <el-input v-model="IdeaInfo.Preparation"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="Ý tưởng">
      {{report.IdeaName}}
    </el-form-item> -->
    <!-- <el-form-item label="Báo cáo">
      <a href="" target="_blank">{{ ReportMarketInfo.MoreInfo }}</a>
      <el-upload
        class="upload-demo"
        ref="uploadFileidea"
        :action="uploadFile"
        :before-remove="beforeRemove"
        :on-change="onFileChange"
        :auto-upload="false"
        :file-list="fileList"
      >
        <el-button size="small" type="primary" plain
          ><i class="fas fa-cloud-upload-alt">&nbsp;Tải lên</i></el-button>
      </el-upload>
    </el-form-item> -->
    <el-form-item>
     <span style="font-weight: bold;">Ý tưởng:</span> {{report.IdeaName }}
    </el-form-item>
    <el-form-item label="Báo cáo">
      <el-input v-model="ReportMarketInfo.MoreInfo" type="textarea" autosize="">
      </el-input>
    </el-form-item>
    <el-form-item label="Ghi chú">
      <el-input v-model="ReportMarketInfo.Note" type="textarea" autosize="">
      </el-input>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit"
        >Thêm báo cáo</el-button>
      <el-button @click="cancelup">Hủy</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { CreateIdeaInfo, UpdateIdeaInfo } from "@/api/idea"
import { GetReportMarketByIdea , CreateReportMarket} from '@/api/reportRD'
import { uploadFile } from "@/api/file"
import { GetActiveElement } from "@/api/defaultRD"
import Cookies from "js-cookie"
import baseUrl from "@/utils/baseURLRD"
import { setTimeout } from "timers"
export default {
  props: ['report'],
  created() {
    
    GetActiveElement({
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      Search: "a"
    }).then(res => {
      this.ActiveElement = res.ActiveElementLst
    })
  },
  watch: {
    idea() {
      this.initForm()
    }
  },
  data() {
    return {
      ReportMarketInfo: {
          IdeaId:'',
          Note:'',
          MoreInfo:''
      },
      IdeaInfo: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: "",
        DocumentId: null
      },
      fileList: [],
      file: null
    }
  },
  computed: {
    uploadFile() {
      return (
        baseUrl +
        "File/UploadFileIdea" +
        "?DocumentId=" +
        this.IdeaInfo.DocumentId +
        "&Token=" +
        Cookies.get("token") +
        "&UserName=" +
        Cookies.get("idEmployee") +
        "&FileName=" +
        (this.file ? this.file.name : "")
      )
    }
  },
  methods: {
    querySearch2(queryString, cb) {
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
    handleEnter() {
      alert("hello word")
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },
    handleSelect(item) {
      this.IdeaInfo.ActiveElement = item.ActiveElement
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
    cancelup() {
      this.$emit("createcancelOK")
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    onSubmit() {
    //   if (this.idea == null) {
        var rep = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          ReportMarketInfo: this.ReportMarketInfo,
        }
        CreateReportMarket(rep).then(res => {
          this.$notify({
            title: "Thành công",
            message: "Tạo báo cáo thành công",
            type: "success",
            position: "top-left"
          })
          this.$emit("createReportOK", this.ReportMarketInfo)
        })
    //   } else {
        // this.IdeaInfo.DocumentId = this.idea.DocumentId
        // var rep = {
        //   Token: Cookies.get("Token"),
        //   UserName: Cookies.get("UserName"),
        //   IdeaInfo: this.IdeaInfo
        // }
        // UpdateIdeaInfo(rep).then(res => {
        //   this.$refs.uploadFileidea.submit()
        //   this.$notify({
        //     title: "Thành công",
        //     message: "Cập nhật ý tưởng thành công",
        //     type: "success",
        //     position: "top-left"
        //   })
        //   this.idea.IdeaName = this.IdeaInfo.IdeaName
        //   this.idea.IdeaContent = this.IdeaInfo.IdeaContent
        //   this.idea.ActiveElement = this.IdeaInfo.ActiveElement
        //   this.idea.Preparation = this.IdeaInfo.Preparation
        //   this.idea.MoreInfo = this.IdeaInfo.MoreInfo
        //   this.$emit('updateIdeaOK', this.IdeaInfo)
        // })
      }
    },
    initForm() {
      if (this.idea == null) {
        this.IdeaInfo.IdeaName = null
        this.IdeaInfo.IdeaContent = null
        this.IdeaInfo.ActiveElement = null
        this.IdeaInfo.Preparation = null
        this.IdeaInfo.MoreInfo = null
      } else {
        this.IdeaInfo.IdeaName = this.idea.IdeaName
        this.IdeaInfo.IdeaContent = this.idea.IdeaContent
        this.IdeaInfo.ActiveElement = this.idea.ActiveElement
        this.IdeaInfo.Preparation = this.idea.Preparation
        this.IdeaInfo.MoreInfo = this.idea.MoreInfo
      }
    }
  }
//}
</script>
