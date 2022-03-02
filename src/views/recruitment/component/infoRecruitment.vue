<template>
  <div class="info-container">
    <el-row class="info-company" :gutter="30">
      <el-col :xs="24" :sm="24" :lg="7">
        <div class="info-basic info-box">
          <div class="header">
            <img
              :src="avatarDoc"
              onerror="this.onerror = null; this.src = 'https://cpc1hn.com.vn/wp-content/uploads/%E1%BA%A2nh/ve-chung-toi.jpg';"
              alt="avatar group"
            />
          </div>
          <div class="content">
            <h3 class="group-name">{{ dataDoc.Title }}</h3>
            <el-form
              label-position="left"
              label-width="120px"
              class="form-custom"
              :model="dataDoc"
              size="mini"
            >
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Mức lương:</span>
                <span :class="dataDoc.AmountType ? '' : 'no-data'">{{
                  dataDoc.AmountType
                }}</span>
              </el-form-item>
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Nơi làm việc:</span>
                <span :class="dataDoc.WorkAddress ? '' : 'no-data'">{{
                  dataDoc.WorkAddress
                }}</span>
              </el-form-item>
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Hạn nộp:</span>
                <span
                  v-if="dataDoc.Deadline"
                  :class="dataDoc.Deadline ? '' : 'no-data'"
                  >{{
                    Date.parse(dataDoc.Deadline).toString("dd/MM/yyyy")
                  }}</span
                >
              </el-form-item>
              <el-form-item class="label-custom">
                <span slot="label" class="label"> Số lượng:</span>
                <span :class="dataDoc.QuantityCandidate ? '' : 'no-data'">{{
                  dataDoc.QuantityCandidate
                }}</span>
              </el-form-item>
            </el-form>
          </div>
          <el-upload
            class="image-company"
            ref="uploadFile"
            :action="uploadFile"
            :auto-upload="true"
            :on-success="handleSuccess"
            :limit="1"
          >
            <el-button class="btn-update"
              ><i class="fas fa-image"></i
            ></el-button>
          </el-upload>
        </div>
        <div class="info-contact info-box">
          <h3 class="title-box">Thông tin tuyển dụng:</h3>
          <el-form
            label-position="left"
            label-width="150px"
            class="form-custom"
            :model="dataDoc"
            size="mini"
          >
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Kinh nghiệm:</span>
              <span :class="dataDoc.WorkExperience ? '' : 'no-data'">{{
                dataDoc.WorkExperience
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Bằng cấp:</span>
              <span :class="dataDoc.DegreeRequire ? '' : 'no-data'">{{
                dataDoc.DegreeRequire
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Vị trí:</span>
              <span :class="dataDoc.WorkPosition ? '' : 'no-data'">{{
                dataDoc.WorkPosition
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Chuyên nghành:</span>
              <span :class="dataDoc.CareerRequire ? '' : 'no-data'">{{
                dataDoc.CareerRequire
              }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="info-contact info-box">
          <h3 class="title-box">Thông tin liên hệ:</h3>
          <el-form
            label-position="left"
            label-width="90px"
            class="form-custom"
            :model="dataDoc"
            size="mini"
          >
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Đại diện:</span>
              <span :class="dataDoc.ContactName ? '' : 'no-data'">{{
                dataDoc.ContactName
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Điện thoại:</span>
              <span :class="dataDoc.ContactPhone ? '' : 'no-data'">{{
                dataDoc.ContactPhone
              }}</span>
            </el-form-item>
            <el-form-item class="label-custom">
              <span slot="label" class="label"> Email:</span>
              <span :class="dataDoc.ContactEmail ? '' : 'no-data'">{{
                dataDoc.ContactEmail
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="17">
        <div class="info-introduce info-box">
          <h3 class="title-box">Mô tả công việc:</h3>
          <contenteditable
            style="width:100%;overflow:hidden;"
            class="content-edit"
            tag="div"
            :noHTML="false"
            :contenteditable="false"
            v-model="dataDoc.WorkDescription"
          />
          <hr />
          <h3 class="title-box">Quyền lợi được hưởng:</h3>
          <contenteditable
            style="width:100%;overflow:hidden;"
            class="content-edit"
            tag="div"
            :noHTML="false"
            :contenteditable="false"
            v-model="dataDoc.Benefit"
          />
          <hr />
          <h3 class="title-box">Yêu cầu công việc:</h3>
          <contenteditable
            style="width:100%;overflow:hidden;"
            class="content-edit"
            tag="div"
            :noHTML="false"
            :contenteditable="false"
            v-model="dataDoc.WorkRequire"
          />
          <hr />
          <h3 class="title-box">Yêu cầu hồ sơ:</h3>
          <contenteditable
            style="width:100%;overflow:hidden;"
            class="content-edit"
            tag="div"
            :noHTML="false"
            :contenteditable="false"
            v-model="dataDoc.ResumeRequire"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetRecruitmentInfo } from "@/api/work-dtp/recruitment";
import Cookies from "js-cookie";
import baseURL from "@/utils/workUrl";
export default {
  props: {},
  components: {},
  data() {
    return {
      dataDoc: {},
      employeeLst: [],
      DocumentID: this.$route.params.id,
      dialogFormUpdate: false,
      dialogFormAddEm: false,
      titleDialog: "",
      userName: Cookies.get("idEmployee"),
      token: Cookies.get("token"),
      avatarDoc: ""
    };
  },
  computed: {
    uploadFile: {
      get() {
        return (
          baseURL +
          "/File/UploadImageRecruitment?CompanyID=" +
          this.dataDoc.CompanyID +
          "&DocumentID=" +
          this.dataDoc.DocumentID +
          "&Token=" +
          this.token +
          "&UserName=" +
          this.userName
        );
      },
      set() {}
    }
  },
  methods: {
    fetchData() {
      const req = { DocumentID: this.DocumentID };
      GetRecruitmentInfo(req).then(res => {
        this.dataDoc = res.RecruitmentInfo;
        console.log(this.dataDoc);
      });
    },

    fetchAvatar() {
      this.avatarDoc =
        baseURL +
        "/File/DownloadRecruitmentImage?DocumentID=" +
        this.DocumentID;
    },
    updateCom() {
      this.dialogFormUpdate = true;
      this.titleDialog = "Cập nhật thông tin nhóm";
    },
    updateOK() {
      this.dialogFormUpdate = false;
      this.fetchGroupData();
    },
    handleSuccess(res, file, fileList) {
      if (res.RespCode == 0) {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật ảnh thành công",
          type: "success",
          position: "top-left"
        });
        this.fetchAvatar();
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    }
  },
  created() {
    this.fetchData();
    this.fetchAvatar();
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  padding: 20px 10%;
  background-color: #f0f2f5;
  .info-box {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    .title-box {
      display: inline-block;
      font-size: 12pt;
      border-bottom: 1px solid #0277bc;
      color: #0277bc;
    }
    .no-data:empty:before {
      content: "Không có dữ liệu";
      color: #9197a3;
      text-align: center;
      font-weight: 100;
      font-size: 10pt;
      padding: 3px;
    }
  }
  .info-company {
    .info-basic {
      position: relative;
      .header {
        img {
          width: 100%;
          max-height: 250px;
        }
      }
      .content {
        padding: 10px;
        .group-name {
          font-size: 12pt;
          color: #0277bc;
          margin: 0;
          padding: 5px;
        }
      }
    }
    .info-contact {
      padding: 10px;
      .title {
      }
    }
    .info-introduce {
      padding: 10px;
      min-height: 200px;
      position: relative;
    }
    .info-employee {
      position: relative;
      padding: 10px;
    }
    .btn-update {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 10px 0 10px;
      border: 0;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #0277bc;
      color: #fff;
    }
  }
  .form-custom {
    .label-custom {
      margin: 5px;
      .label {
        font-size: 10pt;
      }
    }
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
