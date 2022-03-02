<template>
  <div shadow="always">
    <div>
      <span class="t-form-label">Tiêu đề:</span>
      <el-input
        style=""
        placeholder="Tiêu đề bài đăng"
        v-model="PostInfo.Title"
      ></el-input>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 20px;">
          <span class="t-form-label" style="display:block;">Phân loại:</span>

          <el-select
            style="width:100%"
            v-model="PostInfo.TypeDoc"
            placeholder="Chọn phân loại bài đăng"
          >
            <el-option
              v-for="item in typeDocs"
              :key="item.DefaultValue"
              :label="item.DefaultValue"
              :value="item.DefaultValue"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 20px;">
          <span class="t-form-label" style="display:block;">Trạng thái:</span>
          <el-select
            style="width:100%;"
            v-model="PostInfo.Status"
            placeholder="Trạng thái bài đăng"
          >
            <el-option
              v-for="item in StatusLst"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;">
      <span style="margin-top: 20px;" class="t-form-label">Ảnh đại diện:</span>
      <div style="display: flex">
        <img
          v-if="mode !== 1"
          :src="linkImage"
          @click="dialogFormView = true"
          width="100px"
          height="100px"
          style="object-fit:cover; margin-right:20px;border: 1px solid #ccc;padding:2px"
          alt="Ảnh bài đăng"
          onerror="this.onerror = null; this.src = 'https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png';"
        />

        <el-upload
          ref="uploadFile2"
          class="upload-demo"
          :action="uploadFile"
          :auto-upload="false"
          :on-change="onFileChange"
          :file-list="fileList"
          :limit="1"
        >
          <el-button
            v-if="mode !== 2"
            class="t-button"
            size="small"
            type="primary"
            >Chọn file</el-button
          >
        </el-upload>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <span style="margin-top: 20px;" class="t-form-label">Mô tả:</span>
      <editor
        api-key="no-api-key"
        v-model="PostInfo.Description"
        :init="{
          menubar: false
        }"
      />
    </div>
    <div style="padding:10px;text-align:center">
      <el-button size="small" type="info" @click="cancel"> Đóng</el-button>
      <el-button
        v-if="mode !== 2"
        size="small"
        type="primary"
        icon="fas fa-check"
        @click="submit"
      >
        Xác nhận</el-button
      >
    </div>
    <el-dialog :visible.sync="dialogFormView" append-to-body>
      <img
        :src="linkImage"
        alt="avatar"
        style="width:100%;height:100%;"
        onerror="this.onerror = null; this.src = 'https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png';"
      />
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Editor from "@/components/Tinymce/index";
import { CreatePost, UpdatePost } from "@/api/work-dtp/post";
import { GetDefaultValue } from "@/api/work-dtp/defaultValue";
import baseURL from "@/utils/workUrl";
export default {
  components: {
    Editor
  },
  props: {
    row: Object,
    mode: Number
  },
  computed: {
    uploadFile: {
      get() {
        return (
          baseURL +
          "/File/UploadPostImage?DocumentID=" +
          this.PostInfo.DocumentID +
          "&Token=" +
          this.TokenCode +
          "&UserName=" +
          this.UserName
        );
      },
      set() {}
    }
  },

  data() {
    return {
      editorData: "<p>Content of the editor.</p>",
      UserName: Cookies.get("idEmployee"),
      TokenCode: Cookies.get("token"),
      lines: [],
      fileList: [],
      typeDocs: [],
      DocumentID: "",
      linkImage: "",
      checkFile: false,
      dialogFormView: false,
      PostInfo: {
        DocumentID: "",
        Title: "",
        TypeDoc: "",
        Description: "",
        Status: "",
        Image: ""
      },
      StatusLst: [
        {
          label: "Hiển thị",
          value: 1
        },
        {
          label: "Không hiển thị",
          value: 0
        }
      ]
    };
  },
  watch: {},
  methods: {
    onFileChange(file) {
      this.PostInfo.Image = file.name;
      this.checkFile = true;
    },
    submit() {
      var req = {
        PostInfo: this.PostInfo
      };
      if (this.mode === 1) {
        CreatePost(req).then(respon => {
          if (respon.RespCode == 0) {
            this.PostInfo.DocumentID = respon.DocumentID;
            this.$notify({
              title: "Thành công",
              message: "Tạo bài đăng thành công",
              type: "success",
              position: "top-left"
            });

            setTimeout(() => {
              if (this.checkFile) {
                this.$refs.uploadFile2.submit();
                this.$refs.uploadFile2.clearFiles();
                this.clearData();
              }
            }, 0);
            this.$emit("addOK");
          }
        });
      } else if (this.mode === 3) {
        UpdatePost(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật bài đăng thành công",
              type: "success",
              position: "top-left"
            });
            setTimeout(() => {
              if (this.checkFile) {
                this.$refs.uploadFile2.submit();
                this.$refs.uploadFile2.clearFiles();
                this.clearData();
              }
            }, 0);
            this.$emit("addOK");
          }
        });
      }
    },
    cancel() {
      this.$emit("cancelOK");
    },
    initData() {
      if (this.row) {
        this.PostInfo.DocumentID = this.row.DocumentID;
        this.PostInfo.Title = this.row.Title;
        this.PostInfo.TypeDoc = this.row.TypeDoc;
        this.PostInfo.Description = this.row.Description;
        this.PostInfo.Status = this.row.Status;
        this.PostInfo.Image = this.row.Image;
        this.linkImage =
          baseURL + "/File/DownloadPostImage?DocumentID=" + this.row.DocumentID;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.PostInfo.DocumentID = "";
      this.PostInfo.Title = "";
      this.PostInfo.TypeDoc = "";
      this.PostInfo.Description = "";
      this.PostInfo.Status = "";
      this.PostInfo.Image = "";
    }
  },
  mounted() {},
  created() {
    this.initData();
    GetDefaultValue({ TableName: "TypeDoc" }).then(res => {
      this.typeDocs = res.DefaultValueLst;
    });
  },
  watch: {
    row() {
      this.initData();
    }
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
