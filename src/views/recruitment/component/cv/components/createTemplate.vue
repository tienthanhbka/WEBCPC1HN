<template>
  <div>
    <div style="margin-top: 10px;">
      <span class="t-form-label">Tiêu đề:</span>
      <el-input
        style=""
        placeholder="Tiêu đề bài đăng"
        v-model="SampleCVInfo.Title"
      ></el-input>
    </div>
    <div style="margin-top: 10px;">
      <span class="t-form-label">Mô tả:</span>
      <el-input
        style=""
        placeholder="Mô tả bài đăng"
        v-model="SampleCVInfo.Description"
      ></el-input>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span class="t-form-label" style="display:block;">Ngôn ngữ:</span>
          <el-input
            style=""
            placeholder="Chọn ngôn ngữ"
            v-model="SampleCVInfo.Language"
          ></el-input>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span style="margin-top: 10px;" class="t-form-label">Màu sắc:</span>
          <el-input
            style=""
            placeholder="Chọn màu sắc"
            v-model="SampleCVInfo.Color"
          ></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span class="t-form-label" style="display:block;">Trạng thái:</span>
          <el-select
            style="width:100%;"
            v-model="SampleCVInfo.Status"
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
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span style="margin-top: 10px;" class="t-form-label"
            >Ảnh đại diện:</span
          >
          <div style="display:flex">
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
              ref="uploadFile"
              class="upload-demo"
              :action="uploadFile"
              :auto-upload="false"
              :on-change="onFileChange"
              :on-success="handleSuccess"
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
      </el-col>
    </el-row>

    <div style="margin-top: 20px;text-align:center">
      <el-button type="info" @click="cancel" size="small"> Đóng</el-button>
      <el-button
        v-if="mode !== 2"
        type="primary"
        size="small"
        icon="fas fa-check-double"
        @click="submit"
      >
        Xác nhận</el-button
      >
    </div>
  </div>
</template>

<script>
import baseURL from "@/utils/workUrl";
import { CreateSampleCV, UpdateSampleCV } from "@/api/work-dtp/cv";
import Cookies from "js-cookie";
import { setTimeout } from "timers";
export default {
  name: "",
  components: {},
  props: {
    row: {
      type: Object,
      required: true
    },
    mode: Number
  },
  computed: {
    uploadFile: {
      get() {
        return (
          baseURL +
          "/File/UploadImageSampleCV?DocumentID=" +
          this.SampleCVInfo.DocumentID +
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
      UserName: Cookies.get("idEmployee"),
      TokenCode: Cookies.get("token"),
      linkImage: "",
      DocumentID: "",
      checkFile: false,
      SampleCVInfo: {
        DocumentID: "",
        Title: "",
        Description: "",
        Status: "",
        Color: "",
        Language: ""
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
      this.checkFile = true;
    },
    submit() {
      var req = {
        SampleCVInfo: this.SampleCVInfo
      };
      if (this.mode === 3) {
        UpdateSampleCV(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật mẫu cv thành công",
              type: "success",
              position: "top-left"
            });
            setTimeout(() => {
              if (this.checkFile) {
                this.$refs.uploadFile.submit();
                this.$refs.uploadFile.clearFiles();
                this.clear();
              }
            }, 0);
            this.$emit("AddOK");
          }
        });
      } else {
        CreateSampleCV(req).then(respon => {
          if (respon.RespCode == 0) {
            this.SampleCVInfo.DocumentID = respon.DocumentID;
            this.$notify({
              title: "Thành công",
              message: "Tạo mẫu cv thành công",
              type: "success",
              position: "top-left"
            });
            setTimeout(() => {
              if (this.checkFile) {
                this.$refs.uploadFile.submit();
                this.$refs.uploadFile.clearFiles();
                this.clear();
              }
            }, 0);
            this.$emit("AddOK");
          }
        });
      }
    },
    handleSuccess(res) {
      console.log(res);
    },
    cancel() {
      this.$emit("cancelOK");
    },
    initData() {
      if (this.row) {
        (this.SampleCVInfo.DocumentID = this.row.DocumentID),
          (this.SampleCVInfo.Title = this.row.Title),
          (this.SampleCVInfo.Description = this.row.Description),
          (this.SampleCVInfo.Color = this.row.Color),
          (this.SampleCVInfo.Status = this.row.Status),
          (this.SampleCVInfo.Language = this.row.Language);
        this.linkImage =
          baseURL +
          "/File/DownloadSampleCVImage?UserName=" +
          this.UserName +
          "&TokenCode=" +
          this.TokenCode +
          "&DocumentID=" +
          this.row.DocumentID;
      } else {
        this.clear();
      }
    },
    clear() {
      (this.SampleCVInfo.DocumentID = ""),
        (this.SampleCVInfo.Title = ""),
        (this.SampleCVInfo.Description = ""),
        (this.SampleCVInfo.Color = ""),
        (this.SampleCVInfo.Status = ""),
        (this.SampleCVInfo.Language = ""),
        (this.linkImage = "");
    }
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  created() {}
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
