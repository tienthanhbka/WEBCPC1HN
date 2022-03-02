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
              type="textarea"
              autosize
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
      <el-form-item label="Lý do">
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
      <el-form-item label="Mô tả chi tiết cải tiến">
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
      <el-form-item label="Kế hoạch">
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
        <el-col :xs="24" :sm="12" :lg="12">
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
          <el-form-item label="Thời gian hoàn thành">
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
      <el-form-item label="File đề xuất">
        <el-link v-if="ImgUrl" type="primary" :href="ImgUrl" target="_blank">{{
          Offer.FileOffer
        }}</el-link>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="Thành viên cùng thực hiện">
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
    <el-card>
      <div slot="header" class="clearfix">
        <span style="font-size: 10pt;font-weight:700;"
          ><i class="fas fa-medal"></i> Đánh giá</span
        >
      </div>
      <div class="text item">
        <el-input
          v-model="Comment"
          style="width:100%"
          :rows="3"
          placeholder="Nhập đánh giá..."
          type="textarea"
        >
        </el-input>
      </div>
    </el-card>
    <div slot="footer" style="text-align:right; margin-top: 10px;">
      <el-button type="warning" icon="fas fa-medal" @click="EvaluateOffer">
        Đánh giá</el-button
      >
      <el-button type="success" icon="el-icon-finished" @click="ApprovedOffer">
        Phê duyệt</el-button
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
      ImgUrl: "",
      Comment: "",
      UserName: Cookies.get("name"),
      UserID: Cookies.get("idEmployee"),
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
