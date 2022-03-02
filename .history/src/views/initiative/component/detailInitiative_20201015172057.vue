<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="Offer"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tên đề xuất">
            <el-input
              class="selectIDGroup"
              v-model="Offer.OfferName"
              style="width:100%"
              placeholder="Nhập tên đề xuất..."
              type="textarea"
              autosize
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Phân loại">
            <el-select
              v-model="Offer.OfferType"
              placeholder="Phân loại"
              class="selectIDGroup"
              style="width:100%"
              disabled
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

      <el-form-item label="Mô tả hiện trạng">
        <el-input
          class="selectIDGroup"
          v-model="Offer.CurrentStatus"
          style="width:100%"
          placeholder="Nhập mô tả hiện trạng..."
          type="textarea"
          autosize
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Lý do" v-if="Offer.Reason">
        <el-input
          class="selectIDGroup"
          v-model="Offer.Reason"
          style="width:100%"
          placeholder="Nhập lý do..."
          type="textarea"
          autosize
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Mô tả chi tiết cải tiến" v-if="Offer.Improve">
        <el-input
          class="selectIDGroup"
          v-model="Offer.Improve"
          style="width:100%"
          placeholder="Nhập mô tả chi tiết cải tiến..."
          type="textarea"
          autosize
          disabled
        >
        </el-input>
      </el-form-item>

      <el-form-item label="File đề xuất" v-if="Offer.UpFile">
        <el-link type="primary" @click="downloadFile">{{
          Offer.UpFile
        }}</el-link>
      </el-form-item>
      <el-form-item v-if="Offer.Comment">
        <span slot="label" style="color:#02bc77; font-size:10pt;"
          >IT phản hồi</span
        >
        <el-input
          class="selectIDGroup"
          v-model="Offer.Comment"
          style="width:100%;"
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
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
          <el-form-item label="Thời gian tạo">
            <el-input
              class="selectIDGroup"
              v-model="Offer.TimeCreate"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button
        style="background-color:#B5C5C6;color:white;"
        icon="el-icon-circle-close"
        @click="cancel"
        >ĐÓNG</el-button
      >
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db, storage } from "../firebase";
import { GetGroupEmployee, getEmployeesByIdGroup } from "@/api/groups";
export default {
  props: ["offer"],
  components: {},
  computed: {},
  filters: {
    toTypeText(val) {
      if (val == 1) {
        return "Phát hiện vấn đề";
      } else if (val == 2) {
        return "Đề xuất ý tưởng";
      }
    }
  },
  data() {
    return {
      fileList: [],
      ActiveElement: [],
      groupList: [],
      emLst: [],
      TeammateLst: [],
      TypeOfferLst: [
        {
          key: 1,
          value: "Phát hiện vấn đề"
        },
        {
          key: 2,
          value: "Đề xuất ý tưởng"
        }
      ],
      ImgUrl: "",
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
      }
    };
  },
  methods: {
    initForm() {
      if (this.offer) {
        (this.Offer.OfferID = this.offer.OfferID),
          (this.Offer.OfferName = this.offer.OfferName),
          (this.Offer.OfferType = this.offer.OfferType),
          (this.Offer.Reason = this.offer.Reason),
          (this.Offer.UpFile = this.offer.UpFile),
          (this.Offer.CreaterID = this.offer.CreaterID),
          (this.Offer.CreaterName = this.offer.CreaterName),
          (this.Offer.GroupID = this.offer.GroupID),
          (this.Offer.CurrentStatus = this.offer.CurrentStatus),
          (this.Offer.Improve = this.offer.Improve),
          (this.Offer.Comment = this.offer.Comment),
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
    downloadFile() {
      const Link =
        "https://icpc1hn.work/QLTS/File/DownloadOfferIdea?UserName=" +
        Cookies.get("idEmployee") +
        "&Token=" +
        Cookies.get("token") +
        "&OfferID=" +
        this.Offer.OfferID;
      window.open(Link);
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  mounted() {},
  watch: {
    offer() {
      this.initForm();
    }
  },
  created() {
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
