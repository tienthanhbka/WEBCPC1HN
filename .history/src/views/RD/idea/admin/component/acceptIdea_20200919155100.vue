<template>
  <div>
    <modal id="new-idea2-modal" ref="new-idea2-modal" v-cloak>
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="el-icon-s-claim"></i>&#32;&#32;Phê duyệt ý tưởng
      </span>
      <div slot="body" class="border-form">
        <el-form
          ref="form"
          label-position="left"
          size="small"
          :model="form"
          label-width="180px"
        >
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
          <el-form-item label="Hoạt chất" prop="ActiveElement">
            <el-input
              class="selectIDGroup"
              v-model="form.ActiveElement"
              style="width:100%"
              placeholder="Nhập hoạt chất..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Tài liệu đính kèm" prop="MoreInfo">
            <el-link href="" target="_blank" v-if="idea == null"></el-link>
            <el-link href="" target="_blank" v-if="idea != null">{{
              form.MoreInfo
            }}</el-link>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button
          class="pan-btn blue-btn"
          v-if="idea != null"
          @click="onSubmit"
          >Phê duyệt ý tưởng</el-button
        >
        <el-button
          class="pan-btn yellow-btn"
          v-if="idea != null"
          @click="onSubmit2"
          >Treo ý tưởng</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { AppvoveIdea } from "@/api/idea";
import { GetActiveElement } from "@/api/defaultRD";
import baseUrl from "@/utils/baseURLRD";
import Cookies from "js-cookie";
export default {
  props: ["idea"],
  created() {
    this.initForm();
  },
  watch: {
    idea() {
      this.initForm();
    }
  },
  data() {
    return {
      ActiveElement: [],
      form: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: "",
        DocumentId: ""
      }
    };
  },
  methods: {
    downloadMoreInfo(row) {
      let url =
        baseUrl +
        "File/DownloadFileIdea" +
        "?UserName=" +
        Cookies.get("idEmployee") +
        "&Token=" +
        Cookies.get("token") +
        "&DocumentId=" +
        row;
      // window.open(url);
      console.log(url);
      return url;
    },
    onSubmit() {
      this.form.DocumentId = this.idea.DocumentId;
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        DocumentId: this.idea.DocumentId,
        Status: 3
      };
      AppvoveIdea(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Phê duyệt ý tưởng thành công",
            type: "success"
          });
          this.$emit("acceptOK");
        }
      });
    },
    onSubmit2() {
      this.form.DocumentId = this.idea.DocumentId;
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        DocumentId: this.idea.DocumentId,
        Status: 2
      };
      AppvoveIdea(rep).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Treo ý tưởng thành công",
            type: "success"
          });
          this.$emit("acceptOK");
        }
      });
    },
    initForm() {
      if (this.idea) {
        this.form.IdeaName = this.idea.IdeaName;
        this.form.IdeaContent = this.idea.IdeaContent;
        this.form.ActiveElement = this.idea.ActiveElement;
        this.form.Preparation = this.idea.Preparation;
        this.form.MoreInfo = this.idea.MoreInfo;
        this.form.DocumentId = this.idea.DocumentId;
      } else {
        this.form.IdeaName = null;
        this.form.IdeaContent = null;
        this.form.ActiveElement = null;
        this.form.Preparation = null;
        this.form.MoreInfo = null;
      }
    }
  }
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
</style>
