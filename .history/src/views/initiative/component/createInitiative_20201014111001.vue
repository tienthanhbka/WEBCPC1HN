<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="Offer"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tên đề xuất" prop="OfferName">
            <el-input
              class="selectIDGroup"
              v-model="Offer.OfferName"
              style="width:100%"
              placeholder="Nhập tên đề xuất..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Phân loại" prop="OfferType">
            <el-select
              v-model="Offer.OfferType"
              placeholder="Phân loại"
              class="selectIDGroup"
              style="width:100%"
              @change="changeType"
            >
              <el-option
                v-for="item in TypeOfferLst"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Mô tả hiện trạng" prop="CurrentStatus">
        <el-input
          class="selectIDGroup"
          v-model="Offer.CurrentStatus"
          style="width:100%"
          placeholder="Nhập mô tả hiện trạng..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>
      <transition name="el-zoom-in-center">
        <div v-show="detectProblem">
          <el-form-item label="Nguyên nhân" v-if="detectProblem" prop="Reason">
            <el-input
              class="selectIDGroup"
              v-model="Offer.Reason"
              style="width:100%"
              placeholder="Nhập nguyên nhân..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Mô tả chi tiết đề xuất"
            v-if="detectProblem"
            prop="Improve"
          >
            <el-input
              class="selectIDGroup"
              v-model="Offer.Improve"
              style="width:100%"
              placeholder="Nhập mô tả chi tiết đề xuất..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <el-form-item label="File đề xuất">
            <el-upload
              ref="uploadFile"
              class="upload-demo"
              :action="uploadFile"
              :auto-upload="false"
              :on-change="onFileChange"
              :file-list="fileList"
              :limit="1"
            >
              <el-button size="small" type="info" icon="el-icon-document">
                Chọn file</el-button
              >
            </el-upload>
            <el-input
              class="selectIDGroup"
              style="width:100%"
              v-model="upFile"
              placeholder="Chọn file ý tưởng (nếu có)..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </div>
      </transition>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo" prop="CreaterName">
            <el-input
              class="selectIDGroup"
              style="width:100%"
              v-model="Offer.CreaterName"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Nhóm" prop="GroupID">
            <el-select
              clearable
              v-model="Offer.GroupID"
              placeholder="Chọn nhóm"
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in groupList"
                :key="item.idGroup"
                :label="item.idGroup"
                :value="item.idGroup"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button
        style="background-color:#B5C5C6;color:white;"
        icon="el-icon-circle-close"
        @click="cancelup"
        >HỦY</el-button
      >
      <el-button
        v-if="offer == null"
        icon="el-icon-check"
        style="background-color:#19B5FE;color:white;"
        @click="addOffer"
        >XÁC NHẬN</el-button
      >
      <el-button
        v-else
        icon="el-icon-edit"
        style="background-color:#F3825B;color:white;"
        @click="addOffer"
        >CHỈNH SỬA</el-button
      >
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { CreateOfferIdea, UpdateOfferIdea } from "@/api/offerIT";
import { GetGroupEmployee, getEmployeesByIdGroup } from "@/api/groups";
import { setTimeout } from "timers";
export default {
  props: ["offer"],
  components: {},
  computed: {
    uploadFile: {
      get() {
        return (
          "https://icpc1hn.work/QLTS/File/UploadOfferIdea" +
          "?OfferID=" +
          this.Offer.OfferID +
          "&Token=" +
          this.Token +
          "&UserName=" +
          this.UserID +
          "&FileName=" +
          (this.file ? this.file.name.split(".", 100)[0] : "")
        );
      },
      set() {}
    }
  },
  data() {
    return {
      fileList: [],
      groupList: [],
      TeammateLst: [],
      upFile: "",
      file: "",
      detectProblem: true,
      offerIdea: true,
      performIdea: true,
      UserName: Cookies.get("name"),
      UserID: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      Offer: {
        OfferID: "",
        OfferName: "",
        OfferType: "",
        CurrentStatus: "",
        Reason: "",
        Improve: "",
        GroupID: "",
        Status: "",
        TimeCreate: "",
        CreaterID: "",
        CreaterName: Cookies.get("name"),
        ApproveID: "",
        TimeApprove: "",
        UpFile: "",
        Comment: "",
        OfferIdeaLineLst: []
      },
      rules: {
        OfferName: [
          {
            required: true,
            message: "Hãy nhập đề xuất",
            trigger: "change"
          }
        ],
        GroupID: [
          {
            required: true,
            message: "Hãy chọn nhóm",
            trigger: "change"
          }
        ],
        OfferType: [
          {
            required: true,
            message: "Hãy chọn loại đề xuất",
            trigger: "change"
          }
        ],
        CurrentStatus: [
          {
            required: true,
            message: "Hãy nhập mô tả",
            trigger: "change"
          }
        ],
        Reason: [
          {
            required: true,
            message: "Hãy nhập nguyên nhân",
            trigger: "change"
          }
        ],
        Improve: [
          {
            required: true,
            message: "Hãy nhập đề xuất",
            trigger: "change"
          }
        ],
        CreaterName: [
          {
            required: true,
            message: "chưa có người tạo",
            trigger: "change"
          }
        ]
      },
      TypeOfferLst: [
        {
          key: 1,
          value: "Phát hiện vấn đề"
        },
        {
          key: 2,
          value: "Đề xuất ý tưởng"
        }
      ]
    };
  },
  methods: {
    addOffer() {
      this.$refs.form.validate(val => {
        if (val) {
          const req = {
            UserName: this.UserID,
            OfferIdeaInfo: this.Offer
          };
          if (!this.offer) {
            CreateOfferIdea(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: "Đề xuất thành công",
                  type: "success"
                });
                this.Offer.OfferID = res.OfferIdeaID;
                this.$emit("OfferAdded");
                setTimeout(() => {
                  console.log("sh");
                  this.$refs.uploadFile.submit();
                }, 0);
                this.$refs.form.resetFields();
                //this.fileList = [];
                (this.detectProblem = true), (this.offerIdea = true);
              } else {
                this.$message({
                  message: res.RespText,
                  type: "error"
                });
              }
            });
          } else {
            UpdateOfferIdea(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: "Cập nhật đề xuất thành công",
                  type: "success"
                });
                this.$refs.uploadFile.submit();
                this.$emit("OfferUpdated");
                this.$refs.form.resetFields();
                this.fileList = [];
                (this.detectProblem = true), (this.offerIdea = true);
              } else {
                this.$message({
                  message: res.RespText,
                  type: "error"
                });
              }
            });
          }
        }
      });
    },
    fetchGroup() {
      var req = {
        idEmployee: this.UserID,
        token: this.Token
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
      });
    },
    onFileChange(file) {
      this.file = file;
      this.Offer.UpFile = file.name;
    },
    initForm() {
      if (this.offer) {
        (this.Offer.OfferID = this.offer.OfferIdeaID),
          (this.Offer.OfferName = this.offer.OfferName),
          (this.Offer.OfferType = this.offer.OfferType),
          (this.Offer.Reason = this.offer.Reason),
          (this.Offer.UpFile = this.offer.UpFile),
          (this.Offer.CreaterID = this.offer.CreaterID),
          (this.Offer.CreaterName = this.offer.CreaterName),
          (this.Offer.GroupID = this.offer.GroupID),
          (this.Offer.CurrentStatus = this.offer.CurrentStatus),
          (this.Offer.Improve = this.offer.Improve),
          (this.upFile = this.offer.UpFile),
          (this.Offer.TimeCreate = this.offer.TimeCreate);
        if (this.offer.OfferType == 1) {
          this.detectProblem = false;
          this.offerIdea = true;
          this.performIdea = true;
        } else if (this.offer.OfferType == 2) {
          this.offerIdea = false;
          this.detectProblem = true;
          this.performIdea = true;
        }
      } else {
        this.Offer = {
          OfferID: "",
          OfferName: "",
          OfferType: "",
          CurrentStatus: "",
          Reason: "",
          Improve: "",
          GroupID: "",
          Status: "",
          TimeCreate: "",
          CreaterID: "",
          CreaterName: Cookies.get("name"),
          ApproveID: "",
          TimeApprove: "",
          UpFile: "",
          Comment: "",
          OfferIdeaLineLst: []
        };
      }
    },
    cancelup() {
      this.$emit("cancel");
      this.$refs.form.resetFields();
      this.fileList = [];
    },
    changeType(type) {
      switch (type) {
        case 1:
          this.detectProblem = false;
          this.offerIdea = true;
          this.performIdea = true;
          break;
        case 2:
          this.offerIdea = false;
          this.detectProblem = true;
          this.performIdea = true;
          break;
        default: {
          this.detectProblem = true;
          this.offerIdea = true;
          this.performIdea = true;
        }
      }
    }
  },
  mounted() {},
  watch: {
    offer() {
      this.initForm();
    }
  },
  created() {
    this.fetchGroup();
    this.initForm();
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0px 20px;
}
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
