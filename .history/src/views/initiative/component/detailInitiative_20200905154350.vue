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
              v-model="Offer.NameOffer"
              style="width:100%"
              placeholder="Nhập tên đề xuất..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Phân loại">
            <el-input
              class="selectIDGroup"
              v-model="Offer.TypeOffer"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Mô tả hiện trạng">
        <el-input
          class="selectIDGroup"
          v-model="Offer.MoreInfo"
          style="width:100%"
          placeholder="Nhập mô tả hiện trạng..."
          type="textarea"
          autosize
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
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Mô tả chi tiết cải tiến" v-if="Offer.Suggestion">
        <el-input
          class="selectIDGroup"
          v-model="Offer.Suggestion"
          style="width:100%"
          placeholder="Nhập mô tả chi tiết cải tiến..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Kế hoạch" v-if="Offer.Plan">
        <el-input
          class="selectIDGroup"
          v-model="Offer.Plan"
          style="width:100%"
          placeholder="Nhập kế hoạch..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12" v-if="Offer.Budget">
          <el-form-item label="Dự trù kinh phí">
            <el-input
              class="selectIDGroup"
              v-model="Offer.Budget"
              style="width:100%"
              placeholder="Nhập kinh phí dự kiến..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian hoàn thành" v-if="Offer.TimeComplete">
            <el-input
              class="selectIDGroup"
              v-model="Offer.TimeComplete"
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="File đề xuất" v-if="Offer.FileOffer">
        <el-link v-if="ImgUrl" type="primary" :href="ImgUrl" target="_blank">{{
          Offer.FileOffer
        }}</el-link>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Nhóm" prop="IDGroup" v-if="Offer.IDGroup">
            <el-input
              class="selectIDGroup"
              v-model="Offer.IDGroup"
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thành viên cùng thực hiện" v-if="Offer.IDGroup">
            <el-select
              class="selectIDGroup"
              style="width:100%"
              v-model="TeammateLst"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="Chọn hoặc nhập thành viên.."
            >
              <el-option
                v-for="item in emLst"
                :key="item.nameEmployee"
                :label="item.nameEmployee"
                :value="item.nameEmployee"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button
        style="background-color:#d9534f;color:white;"
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
  data() {
    return {
      fileList: [],
      ActiveElement: [],
      groupList: [],
      emLst: [],
      TeammateLst: [],
      ImgUrl: "",
      Offer: {
        OfferID: "",
        NameOffer: "",
        TypeOffer: "",
        IDGroup: "",
        MoreInfo: "",
        Reason: "",
        Budget: "",
        Suggestion: "",
        Plan: "",
        TimeComplete: "",
        FileOffer: "",
        Teammate: "",
        Creator: "",
        TimeCreate: "",
        Status: ""
      }
    };
  },
  methods: {
    initForm() {
      if (this.offer) {
        if (this.offer.Teammate) {
          this.TeammateLst = this.offer.Teammate.split(";", 100);
        }
        if (this.offer.FileOffer) {
          var _this = this;
          storage
            .ref()
            .child("/FileOffer/" + this.offer.FileOffer)
            .getDownloadURL()
            .then(function(url) {
              _this.ImgUrl = url;
            });
        }
        (this.Offer.OfferID = this.offer.OfferID),
          (this.Offer.NameOffer = this.offer.NameOffer),
          (this.Offer.TypeOffer = this.offer.TypeOffer),
          (this.Offer.IDGroup = this.offer.IDGroup),
          (this.Offer.MoreInfo = this.offer.MoreInfo),
          (this.Offer.Reason = this.offer.Reason),
          (this.Offer.Budget = this.offer.Budget),
          (this.Offer.Suggestion = this.offer.Suggestion),
          (this.Offer.Plan = this.offer.Plan),
          (this.Offer.TimeComplete = this.offer.TimeComplete),
          (this.Offer.FileOffer = this.offer.FileOffer),
          (this.Offer.Teammate = this.offer.Teammate),
          (this.Offer.Creator = this.offer.Creator),
          (this.Offer.TimeCreate = this.offer.TimeCreate);
      } else {
        this.Offer = {
          OfferID: "",
          NameOffer: "",
          TypeOffer: "",
          IDGroup: "",
          MoreInfo: "",
          Reason: "",
          Budget: "",
          Suggestion: "",
          Plan: "",
          TimeComplete: "",
          FileOffer: "",
          Teammate: "",
          Creator: "",
          TimeCreate: "",
          Status: ""
        };
      }
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
