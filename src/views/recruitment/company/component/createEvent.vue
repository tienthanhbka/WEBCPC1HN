<template>
  <div shadow="always">
    <div>
      <span class="t-form-label">Tên sự kiện:</span>
      <el-input
        style=""
        placeholder="Tên sự kiện"
        v-model="EventInfo.EventName"
      ></el-input>
    </div>
    <div style="margin-top: 20px;">
      <span class="t-form-label">Địa điểm:</span>
      <el-input
        style=""
        placeholder="Địa điểm diễn ra sự kiện"
        v-model="EventInfo.EventPlace"
      ></el-input>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 20px;">
          <span class="t-form-label" style="display:block;"
            >Thời gian bắt đầu:</span
          >

          <el-date-picker
            style="width:100%"
            v-model="EventInfo.StartTime"
            type="datetime"
            placeholder="Chọn thời gian bắt đầu"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 20px;">
          <span class="t-form-label" style="display:block;"
            >Thời gian kết thúc:</span
          >
          <el-date-picker
            style="width:100%"
            v-model="EventInfo.EndTime"
            type="datetime"
            placeholder="Chọn thời gian kết thúc"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;">
      <span class="t-form-label">Đơn vị tổ chức:</span>
      <el-input
        style=""
        placeholder="Đon vị tổ chức sự kiện"
        v-model="EventInfo.Organizing"
      ></el-input>
    </div>
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
        v-model="EventInfo.Description"
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
import { CreateEvent, UpdateEvent } from "@/api/work-dtp/event";
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
          "/File/UploadEventImage?DocumentID=" +
          this.EventInfo.DocumentID +
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
      EventInfo: {
        DocumentID: "",
        EventName: "",
        EventPlace: "",
        Description: "",
        Status: "",
        LinkImage: "",
        StartTime: "",
        EndTime: "",
        Organizing: ""
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
      this.EventInfo.LinkImage = file.name;
      this.checkFile = true;
    },
    submit() {
      this.EventInfo.StartTime = Date.parse(this.EventInfo.StartTime).toString(
        "yyyy-MM-dd HH:mm:ss"
      );
      this.EventInfo.EndTime = Date.parse(this.EventInfo.EndTime).toString(
        "yyyy-MM-dd HH:mm:ss"
      );
      var req = {
        EventInfo: this.EventInfo
      };
      if (this.mode === 1) {
        CreateEvent(req).then(respon => {
          if (respon.RespCode == 0) {
            this.EventInfo.DocumentID = respon.DocumentID;
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
        UpdateEvent(req).then(respon => {
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
        this.EventInfo.DocumentID = this.row.DocumentID.trim();
        this.EventInfo.EventName = this.row.EventName;
        this.EventInfo.EventPlace = this.row.EventPlace;
        this.EventInfo.Description = this.row.Description;
        this.EventInfo.Status = this.row.Status;
        this.EventInfo.LinkImage = this.row.LinkImage;
        this.EventInfo.StartTime = this.row.StartTime;
        this.EventInfo.EndTime = this.row.EndTime;
        this.EventInfo.Organizing = this.row.Organizing;
        this.linkImage =
          baseURL +
          "/File/DownloadEventImage?DocumentID=" +
          this.row.DocumentID;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.EventInfo.DocumentID = "";
      this.EventInfo.EventName = "";
      this.EventInfo.EventPlace = "";
      this.EventInfo.Description = "";
      this.EventInfo.Status = "";
      this.EventInfo.LinkImage = "";
      this.EventInfo.StartTime = "";
      this.EventInfo.EndTime = "";
      this.EventInfo.Organizing = "";
    }
  },
  mounted() {},
  created() {
    this.initData();
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
