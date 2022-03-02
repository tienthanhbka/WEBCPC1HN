<template>
  <div>
    <modal id="new-reportmarket-modal" ref="new-reportmarket-modal" v-cloak>
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-newspaper"></i>&#32;&#32;Báo cáo thị trường
      </span>
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
              <el-form-item label="Link báo cáo" prop="MoreInfo">
                <el-input
                  class="selectIDGroup"
                  v-model="form.MoreInfo"
                  style="width:100%"
                  placeholder="Nhập link báo cáo..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Ghi chú">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Note"
                  style="width:100%"
                  placeholder="Nhập ghi chú..."
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
import { CreateReportMarket, UpdateReportMarket } from "@/api/reportRD";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { setTimeout } from "timers";
export default {
  props: ["report", "idea"],
  components: {},
  computed: {},
  data() {
    return {
      fileList: [],
      ActiveElement: [],
      rules: {
        MoreInfo: [
          {
            required: true,
            message: "Hãy nhập tên ý tưởng",
            trigger: "change"
          }
        ]
      },
      form: {
        MoreInfo: "",
        Note: "",
        IdeaId: "",
        ReportId: ""
      },
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    addReport(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.report == null) {
            var rep = {
              Token: this.Token,
              UserName: this.UserName,
              ReportMarketInfo: this.form
            };
            CreateReportMarket(rep).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: "Tạo báo cáo thành công",
                  type: "success"
                });
                this.closeModal();
                this.$emit("createReportOK");
              } else {
                this.$message({
                  message: res.RespCode,
                  type: "warning"
                });
              }
            });
          } else {
            var rep = {
              Token: this.Token,
              UserName: this.UserName,
              ReportMarketInfo: this.form
            };
            UpdateReportMarket(rep).then(res => {
              if (Res.RespCode == 0) {
                this.$message({
                  message: "Cập nhật báo cáo thành công",
                  type: "success"
                });
                this.closeModal();
                this.$emit("updateReportOK");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-reportmarket-modal");
    },
    initForm() {
      if (this.report) {
        (this.form.MoreInfo = this.report.MoreInfo),
          (this.form.Note = this.report.Note),
          (this.form.IdeaId = this.report.IdeaId),
          (this.form.ReportId = this.report.ReportId);
      } else {
        (this.form.MoreInfo = null),
          (this.form.Note = null),
          (this.form.IdeaId = this.idea),
          (this.form.ReportId = null);
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
