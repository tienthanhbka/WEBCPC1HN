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
      <el-form-item label="Mô tả chi tiết cải tiến" v-if="Offer.Improve">
        <el-input
          class="selectIDGroup"
          v-model="Offer.Improve"
          style="width:100%"
          placeholder="Nhập mô tả chi tiết cải tiến..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>

      <el-form-item label="File đề xuất" v-if="Offer.UpFile">
        <el-link v-if="ImgUrl" type="primary" :href="ImgUrl" target="_blank">{{
          Offer.UpFile
        }}</el-link>
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
          <el-form-item label="Nhóm">
            <el-input
              class="selectIDGroup"
              v-model="Offer.GroupID"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row :gutter="20">
          <el-col :xs="6" :sm="6" :lg="6">
            <span style="font-size: 10pt;font-weight:700;">
              Chọn hành động:
            </span></el-col
          >
          <el-col :xs="8" :sm="8" :lg="8">
            <el-select
              v-model="Offer.Status"
              placeholder="-- Chọn --"
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in StatusLst"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="text item">
        <el-form
          ref="formLine"
          label-position="top"
          size="small"
          :model="form"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Người thực hiện">
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
              <el-form-item label="Kế hoạch">
                <el-select
                  v-model="Offer.OfferType"
                  placeholder="Phân loại"
                  class="selectIDGroup"
                  style="width:100%"
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

          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Kinh phí dự trù">
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
              <el-form-item label="Thời gian hoàn thành">
                <el-select
                  v-model="Offer.OfferType"
                  placeholder="Phân loại"
                  class="selectIDGroup"
                  style="width:100%"
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
        </el-form>
      </div>
    </el-card>
    <div slot="footer" style="text-align:right; margin-top: 10px;">
      <el-button
        style="background-color:#B5C5C6;color:white;"
        icon="el-icon-circle-close"
        >HỦY</el-button
      >
      <el-button
        icon="el-icon-check"
        style="background-color:#19B5FE;color:white;"
        >XÁC NHẬN</el-button
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
      Role: false,
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
      StatusLst: [
        {
          key: 2,
          value: "Phản hồi"
        },
        {
          key: 3,
          value: "Phê duyệt"
        },
        {
          key: 5,
          value: "Chuyển nhóm"
        }
      ],
      ImgUrl: "",
      Comment: "",
      UserName: Cookies.get("name"),
      UserID: Cookies.get("idEmployee"),
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
      form: {
        EmployeeName: "",
        EmployeeID: "",
        WorkDes: "",
        TimeEnd: "",
        Comment: ""
      }
    };
  },
  methods: {
    EvaluateOffer() {
      if (this.Role) {
        let date = new Date();
        db.ref("/OfferList/" + this.offer.OfferID).update(
          {
            Approver: this.UserName,
            ApproverID: this.UserID,
            TimeApprove: date.toLocaleString(),
            Status: 5,
            Comment: this.Comment
          },
          function(error) {
            if (error) {
            } else {
            }
          }
        );
        this.$message({
          message: "Đánh giá thành công",
          type: "success"
        });

        this.$emit("Evaluated");
      } else {
        this.$message({
          message: "Bạn không có quyền làm điều này",
          type: "error"
        });
      }
    },
    ApprovedOffer() {
      if (this.Role) {
        let date = new Date();
        db.ref("/OfferList/" + this.offer.OfferID).update(
          {
            Approver: this.UserName,
            ApproverID: this.UserID,
            TimeApprove: date.toLocaleString(),
            Status: 3,
            Comment: this.Comment
          },
          function(error) {
            if (error) {
              console.log(error);
            } else {
            }
          }
        );
        this.$message({
          message: "Phê duyệt thành công",
          type: "success"
        });

        this.$emit("Approved");
      } else {
        this.$message({
          message: "Bạn không có quyền làm điều này",
          type: "error"
        });
      }
    },
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
    cancel() {
      this.$emit("cancel");
    },
    fetchData() {
      var a = [];
      try {
        db.ref("Role").on("value", snap => {
          Object.values(snap.val()).forEach(element => {
            if (this.UserID == element) {
              this.Role = true;
            }
          });
        });
      } catch {}
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
    this.fetchData();
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
