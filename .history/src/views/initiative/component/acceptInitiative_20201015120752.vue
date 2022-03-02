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
        <el-link type="primary" @click="downloadFile">{{
          Offer.UpFile
        }}</el-link>
      </el-form-item>
      <el-form-item v-if="Offer.Comment">
        <span slot="label" style="color:#02bc77; font-size:10pt;"
          >Phản hồi</span
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
              @change="changeStatus"
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
              <el-form-item label="Người thực hiện" v-if="Role == 3">
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
            <el-col :xs="24" :sm="12" :lg="12" v-if="Role == 3">
              <el-form-item label="Kế hoạch">
                <el-input
                  class="selectIDGroup"
                  v-model="form.WorkDes"
                  style="width:100%"
                  placeholder="Nhập tên đề xuất..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12" v-if="Role == 3">
              <el-form-item label="Kinh phí dự trù">
                <el-input
                  class="selectIDGroup"
                  v-model="form.formName"
                  style="width:100%"
                  placeholder="Nhập kinh phí..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12" v-if="Role == 3">
              <el-form-item label="Thời gian hoàn thành">
                <el-date-picker
                  v-model="form.TimeComplete"
                  type="date"
                  placeholder="Chọn ngày"
                  style="width:100%"
                  class="selectIDGroup"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="Chuyển nhóm" v-if="Role == 5">
              <el-select
                class="selectIDGroup"
                style="width:100%"
                v-model="TranGroup"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Chọn hoặc nhập thành viên.."
              >
                <el-option
                  v-for="item in lstGroup"
                  :key="item.idGroup"
                  :label="item.idGroup"
                  :value="item.idGroup"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="Ghi chú">
              <el-input
                class="selectIDGroup"
                v-model="form.Comment"
                style="width:100%"
                placeholder="Nhập ghi chú..."
                type="textarea"
                autosize
              >
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div slot="footer" style="text-align:center; margin-top: 10px;">
      <el-button
        style="background-color:#B5C5C6;color:white;"
        icon="el-icon-circle-close"
        @click="cancel"
        >HỦY</el-button
      >
      <el-button
        icon="el-icon-check"
        style="background-color:#19B5FE;color:white;"
        @click="ApproveOffer"
        >XÁC NHẬN</el-button
      >
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db, storage } from "../firebase";
import { GetGroupEmployee, getEmployeesByIdGroup } from "@/api/groups";
import { ApproveIdea, MoveIdeaByGID } from "@/api/offerIT";
import { GetLstGroup } from "@/api/employeeAdmin";
export default {
  props: ["offer"],
  components: {},
  computed: {},
  data() {
    return {
      Role: "",
      fileList: [],
      emLst: [],
      lstGroup: [],
      TeammateLst: [],
      ActiveElement: [],
      groupList: [],
      TranGroup: [],
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
    changeStatus(val) {
      if (val == 2) {
        this.Role = 2;
      } else if (val == 3) {
        this.Role = 3;
      } else if (val == 5) {
        this.Role = 5;
      }
    },
    ApproveOffer() {
      console.log(this.Offer.Status);
      if (this.Offer.Status == 3) {
        const req = {
          UserName: this.UserID,
          OfferID: this.Offer.OfferID,
          Comment: this.form.Comment,
          Status: 3
        };
        ApproveIdea(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Phê duyệt thành công",
              type: "success"
            });
            this.$emit("Evaluated");
          } else {
            this.$message({
              message: res.RespText,
              type: "error"
            });
          }
        });
      } else if (this.Offer.Status == 2) {
        const req = {
          UserName: this.UserID,
          OfferID: this.Offer.OfferID,
          Comment: this.form.Comment,
          Status: 5
        };
        ApproveIdea(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Gửi phản hồi thành công",
              type: "success"
            });
            this.$emit("Evaluated");
          } else {
            this.$message({
              message: res.RespText,
              type: "error"
            });
          }
        });
      } else if (this.Offer.Status == 5) {
        let group = "";
        this.TranGroup.forEach(item => {
          if (group == "") {
            group = item;
          } else {
            group += "," + item;
          }
        });

        const req = {
          UserName: this.UserID,
          OfferID: this.Offer.OfferID,
          GroupID: group
        };
        MoveIdeaByGID(req).then(res => {
          if (res.RespCode == 0) {
            this.$message({
              message: "Chuyển nhóm thành công",
              type: "success"
            });
            this.changeStatusGroup();
            this.$emit("Evaluated");
          } else {
            this.$message({
              message: res.RespText,
              type: "success"
            });
          }
        });
      }
    },
    changeStatusGroup() {
      const req = {
        UserName: this.UserID,
        OfferID: this.Offer.OfferID,
        Comment: this.form.Comment,
        Status: 2
      };
      ApproveIdea(req).then(res => {
        if (res.RespCode == 0) {
        } else {
          this.$message({
            message: res.RespText,
            type: "error"
          });
        }
      });
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
    fetchEmployee(group) {
      getEmployeesByIdGroup({
        idGroup: "CNHBP-IT",
        token: this.Token
      }).then(res => {
        this.emLst = res.Data;
      });
    },
    fetchGroup() {
      GetLstGroup().then(res => {
        if (res.ResCode == 0) {
          this.lstGroup = res.Data;
        } else {
          this.$message({
            message: res.ResMes,
            type: "error"
          });
        }
      });
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
    this.fetchEmployee();
    this.fetchGroup();
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
