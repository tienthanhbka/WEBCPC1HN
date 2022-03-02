<template>
  <div>
    <modal id="new-reportedit-modal" ref="new-reportedit-modal" v-cloak>
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-newspaper"></i>&#32;&#32;Báo cáo tiêu chuẩn
      </span>
      <div slot="body">
        <el-row :gutter="20">
          <el-form
            ref="form"
            label-position="left"
            size="small"
            :model="form"
            :rules="rules"
            label-width="150px"
          >
            <el-col :span="24">
              <el-form-item label="File báo cáo">
                <el-upload
                  class="upload-demo"
                  ref="uploadFile"
                  :http-request="uploadFirebase"
                  :auto-upload="false"
                  :file-list="fileList"
                >
                  <el-button size="small" type="info" plain>Chọn tệp</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="Nội dung sửa đổi">
                <el-input
                  class="selectIDGroup"
                  v-model="form.ContentEdit"
                  style="width:100%"
                  placeholder="Nhập nội dung..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Lý do sửa đổi">
                <el-input
                  class="selectIDGroup"
                  v-model="form.ReasonEdit"
                  style="width:100%"
                  placeholder="Nhập lý do..."
                  type="textarea"
                  autosize
                >
                </el-input>
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
          v-if="this.report == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addReport('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="this.report != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="addReport('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { UpdateReportEdit } from "@/api/reportRD";
import {db, storage} from "@/views/manufacturing/tracking/firebase";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { setTimeout } from "timers";
export default {
  props: ["report", "research"],
  components: {},
  computed: {},
  data() {
    return {
      fileList: [],
      ActiveElement: [],
      rules: {
        LinkReport: [
          {
            required: true,
            message: "Hãy nhập tên ý tưởng",
            trigger: "change"
          }
        ]
      },
      form: {
        ReportUpId: "",
        ResearchId: "",
        NumberEdit: "",
        ContentEdit: "",
        ReasonEdit: "",
        LinkReport: "",
        Comment: ""
      },
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    uploadFirebase(file, fileList) {
      this.form.LinkReport = file.file.name
        var uploadTask = storage
          .ref()
          .child(this.form.ResearchId + "/report")
          .put(file.file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            // switch (snapshot.state) {
            //   case storage.TaskState.PAUSED: // or 'paused'
            //     console.log('Upload is paused');
            //     break;
            //   case storage.TaskState.RUNNING: // or 'running'
            //     console.log('Upload is running');
            //     break;
            // }
          },
          function(error) {},
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
              });
          }
        );
        console.log(this.Image);
      }
    },
    addReport(re) {
      // this.$refs[re].validate(valid => {
      //   if (valid) {
      //     if (this.report == null) {
      //       var rep = {
      //         Token: this.Token,
      //         UserName: this.UserName,
      //         ReportEditInfo: this.form
      //       };
      //       UpdateReportEdit(rep).then(res => {
      //         if (res.RespCode == 0) {
      //           this.$message({
      //             message: "Tạo báo cáo thành công",
      //             type: "success"
      //           });
      //           this.closeModal();
      //           this.$emit("createReportOK");
      //         } else {
      //           this.$message({
      //             message: res.RespCode,
      //             type: "warning"
      //           });
      //         }
      //       });
      //     } else {
      //       var rep = {
      //         Token: this.Token,
      //         UserName: this.UserName,
      //         ReportEditInfo: this.form
      //       };
      //       UpdateReportEdit(rep).then(res => {
      //         if (Res.RespCode == 0) {
      //           this.$message({
      //             message: "Cập nhật báo cáo thành công",
      //             type: "success"
      //           });
      //           this.closeModal();
      //           this.$emit("updateReportOK");
      //         }
      //       });
      //     }
      //   } else {
      //     return false;
      //   }
      // });
      this.$refs.uploadFile.submit()
      let date = new Date();
          let v =
            Math.random()
              .toString(36)
              .substring(2) + Date.now().toString(36);
          db.ref("/ReportRD/" + v.toString(16)).set(
            {
              ReportID: v,
              ResearchId: this.Sample.SampleName,
              ContentEdit: this.Sample.ProductName,
              ReasonEdit: this.Sample.ProductID,
              Comment: this.Sample.Batch,
              LinkReport: this.Sample.SampleCount,
              Creator:
                "[" +
                Cookies.get("employeeCode") +
                "]" +
                "-" +
                Cookies.get("name"),
              TimeCreate: date.toLocaleString(),
              Status: 1
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("tạo mẫu thành công");
              }
            }
          );
          this.$message({
            message: "Tạo mẫu thành công",
            type: "success"
          });
          this.$emit("SampleAdded");
        } else {
          return false;
        }
    },
    closeModal() {
      VoerroModal.hide("new-reportedit-modal");
    },
    initForm() {
      if (this.report) {
        this.form.ReportUpId = this.report.ReportUpId;
        this.form.ResearchId = this.report.ResearchId;
        this.form.ContentEdit = this.report.ContentEdit;
        this.form.ReasonEdit = this.report.ReasonEdit;
        this.form.LinkReport = this.report.LinkReport;
        this.form.Comment = this.report.Comment;
      } else {
        this.form.ReportUpId = null;
        this.form.ResearchId = this.research;
        this.form.ContentEdit = null;
        this.form.ReasonEdit = null;
        this.form.LinkReport = null;
        this.form.Comment = null;
      }
    }
  },
  mounted() {},
  watch: {
    report() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  }
};
</script>
<style>
.modal-box {
  width: 50%;
}
</style>
