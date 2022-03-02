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
              clearable
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
      <!-- <el-form-item
        label="Kế hoạch"
        v-if="detectProblem && offerIdea"
        prop="Plan"
      >
        <el-input
          class="selectIDGroup"
          v-model="Offer.Plan"
          style="width:100%"
          placeholder="Nhập kế hoạch..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item> -->
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Dự trù kinh phí"
            v-if="detectProblem && offerIdea"
            prop="Budget"
          >
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
          <el-form-item
            label="Thời gian hoàn thành"
            v-if="detectProblem && offerIdea"
            prop="TimeComplete"
          >
            <el-date-picker
              v-model="Offer.TimeComplete"
              type="date"
              placeholder="Chọn ngày"
              style="width:100%"
              class="selectIDGroup"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-form-item label="File đề xuất" v-if="detectProblem && offerIdea">
        <el-upload
          ref="uploadFile"
          :http-request="uploadFirebase"
          class="upload-demo"
          action=""
          :auto-upload="false"
          :limit="1"
        >
          <el-button size="small" type="info" icon="el-icon-document">
            Chọn file</el-button
          >
        </el-upload>
        <el-input
          v-if="detectProblem && offerIdea"
          class="selectIDGroup"
          style="width:100%"
          placeholder="Chọn file ý tưởng (nếu có)..."
          type="textarea"
          autosize
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Nhóm" prop="IDGroup">
            <el-select
              clearable
              v-model="Offer.IDGroup"
              placeholder="Chọn nhóm"
              class="selectIDGroup"
              style="width:100%"
              @change="fetchEmployee"
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
        <el-col :xs="24" :sm="12" :lg="12">
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
    <div slot="footer" style="text-align:center;">
      <el-button
        style="background-color:#d9534f;color:white;"
        icon="el-icon-circle-close"
        @click="cancelup"
        >HỦY</el-button
      >
      <el-button
        v-if="offer == null"
        icon="el-icon-check"
        style="background-color:#02bc77;color:white;"
        @click="addOffer"
        >XÁC NHẬN</el-button
      >
      <el-button
        v-else
        icon="el-icon-edit"
        style="background-color:#02bc77;color:white;"
        @click="editOffer"
        >CHỈNH SỬA</el-button
      >
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { CreateOfferIdea } from "@/api/offerIT";
import { db, storage } from "../firebase";
import { GetGroupEmployee, getEmployeesByIdGroup } from "@/api/groups";
export default {
  props: ["offer"],
  components: {},
  computed: {},
  data() {
    return {
      fileList: [],
      groupList: [],
      emLst: [],
      TeammateLst: [],
      detectProblem: true,
      offerIdea: true,
      performIdea: true,
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
        CreaterName: "",
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
        IDGroup: [
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
        // ReferenceCode: [
        //   {
        //     required: true,
        //     message: "Hãy nhập mã tham chiếu",
        //     trigger: "change"
        //   }
        // ],
        Budget: [
          {
            required: true,
            message: "Hãy nhập chi phí",
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
        Plan: [
          {
            required: true,
            message: "Hãy nhập kế hoạch",
            trigger: "change"
          }
        ],
        TimeComplete: [
          {
            required: true,
            message: "Hãy chọn thời gian hoàn thành",
            trigger: "change"
          }
        ]
      },
      TimeLst: [
        {
          value: "1 tuần"
        },
        {
          value: "2 tuần"
        },
        {
          value: "3 tuần"
        },
        {
          value: "4 tuần"
        },
        {
          value: "2 tháng"
        },
        {
          value: "3 tháng"
        },
        {
          value: "4 tháng"
        },
        {
          value: "5 tháng"
        },
        {
          value: "6 tháng"
        }
      ],
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
            UserName: Cookies.get("idEmployee"),
            OfferIdeaInfo: this.Offer
          };
          CreateOfferIdea(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Đề xuất thành công",
                type: "success"
              });
            } else {
              this.$message({
                message: res.RespText,
                type: "error"
              });
            }
          });
          //     let date = new Date();
          //     let v =
          //       Math.random()
          //         .toString(36)
          //         .substring(2) + Date.now().toString(36);
          //     if (this.Offer.Plan) {
          //       this.$refs.uploadFile.submit();
          //     }
          //     if (this.TeammateLst) {
          //       let _this = this;
          //       this.TeammateLst.forEach(function(item, index, arr) {
          //         if (index == 0) {
          //           _this.Offer.Teammate += item;
          //         } else {
          //           _this.Offer.Teammate += ";" + item;
          //         }
          //       });
          //     }
          //     db.ref("/OfferList/" + v.toString(16)).set(
          //       {
          //         OfferID: v,
          //         NameOffer: this.Offer.NameOffer,
          //         TypeOffer: this.Offer.TypeOffer,
          //         IDGroup: this.Offer.IDGroup,
          //         MoreInfo: this.Offer.MoreInfo,
          //         Reason: this.Offer.Reason.toString(),
          //         Budget: this.Offer.Budget,
          //         Suggestion: this.Offer.Suggestion,
          //         Creator: this.UserName,
          //         CreatorID: this.UserID,
          //         TimeCreate: date.toLocaleString(),
          //         Status: 1,
          //         Plan: this.Offer.Plan,
          //         TimeComplete: this.Offer.TimeComplete.toLocaleString(),
          //         FileOffer: this.Offer.FileOffer,
          //         Teammate: this.Offer.Teammate
          //       },
          //       function(error) {
          //         if (error) {
          //           console.log(error);
          //         } else {
          //         }
          //       }
          //     );
          //     this.$message({
          //       message: "Đề xuất thành công",
          //       type: "success"
          //     });

          //     this.$emit("OfferAdded");
          //   } else {
          //     return false;
        }
      });
    },
    editOffer() {
      let date = new Date();
      if (this.TeammateLst) {
        this.$refs.uploadFile.submit();
        let _this = this;
        this.TeammateLst.forEach(function(item, index, arr) {
          if (index == 0) {
            _this.Offer.Teammate += item;
          } else {
            _this.Offer.Teammate += ";" + item;
          }
        });
      }
      db.ref("/OfferList/" + this.Offer.OfferID).update(
        {
          OfferID: this.Offer.OfferID,
          NameOffer: this.Offer.NameOffer,
          TypeOffer: this.Offer.TypeOffer,
          IDGroup: this.Offer.IDGroup,
          MoreInfo: this.Offer.MoreInfo,
          Reason: this.Offer.Reason.toString(),
          Budget: this.Offer.Budget,
          Suggestion: this.Offer.Suggestion,
          Creator: this.Offer.Creator,
          TimeCreate: this.Offer.TimeCreate,
          Updater: this.UserName,
          UpdaterID: this.UserID,
          TimeUpdate: date.toLocaleString(),
          Status: 2,
          Plan: this.Offer.Plan,
          TimeComplete: this.Offer.TimeComplete,
          FileOffer: this.Offer.FileOffer,
          Teammate: this.Offer.Teammate
        },
        function(error) {
          if (error) {
            console.log(error);
          } else {
          }
        }
      );
      this.$message({
        message: "Chỉnh sửa thành công",
        type: "success"
      });

      this.$emit("OfferUpdated");
    },
    uploadFirebase(file, fileList) {
      if (this.Offer.NameOffer) {
        this.Offer.FileOffer = file.file.name;
        var uploadTask = storage
          .ref()
          .child("FileOffer/" + file.file.name)
          .put(file.file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
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
      }
    },
    fetchGroup() {
      var req = {
        idEmployee: this.UserName,
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
      });
    },
    fetchEmployee(group) {
      getEmployeesByIdGroup({
        idGroup: group,
        token: Cookies.get("token")
      }).then(res => {
        this.emLst = res.Data;
      });
    },
    initForm() {
      if (this.offer) {
        if (this.offer.Teammate) {
          this.TeammateLst = this.offer.Teammate.split(";", 100);
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
        this.TeammateLst = [];
      }
    },
    cancelup() {
      this.$emit("cancel");
    },
    changeType(type) {
      switch (type) {
        case "Phát hiện vấn đề":
          this.detectProblem = false;
          this.offerIdea = true;
          this.performIdea = true;
          break;
        case "Đề xuất ý tưởng":
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
  mounted() {
    // console.log(db);
    // db.ref("/Reports/email").set(
    //   {
    //     username: "name",
    //     email: "email",
    //     profile_picture: "imageUrl"
    //   },
    //   function(error) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("ok");
    //     }
    //   }
    // );
  },
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
