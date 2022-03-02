<template>
  <div class="post">
    <el-form
      v-loading="isLoading"
      :model="form"
      :rules="ruleForm"
      ref="form"
      class="demo-form-inline"
    >
      <el-form-item label="Vị trí tuyển dụng" prop="title">
        <el-input
          v-model="form.title"
          placeholder="Vị trí tuyển dụng"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="Số lượng cần tuyển" prop="quantityCandidate">
            <el-input
              v-model="form.quantityCandidate"
              placeholder="Nhập số lượng cần tuyển"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          :xs="24"
          class="workPosition"
          style="padding: 0 20px;"
        >
          <el-form-item label="Cấp bậc">
            <el-select
              style="width:100%"
              v-model="form.workPosition"
              placeholder="Chọn cấp bậc"
            >
              <el-option
                v-for="item in workPositions"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="Loại hình làm việc" prop="workType">
            <el-select
              style="width:100%"
              v-model="form.workType"
              placeholder="Chọn loại hình"
            >
              <el-option
                v-for="item in workTypes"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.AType" placeholder="Loại hoạt động"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :xs="24">
          <el-form-item label="Bằng cấp">
            <el-select
              style="width:100%"
              v-model="form.degreeRequire"
              placeholder="Chọn bằng cấp"
            >
              <el-option
                v-for="item in degreeRequires"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.AType" placeholder="Loại hoạt động"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24" class="language" style="padding-left:20px;">
          <el-form-item label="Ngoại ngữ">
            <el-select
              v-model="form.language"
              style="width:100%"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="Chọn ngoại ngữ "
            >
              <el-option
                v-for="item in languages"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="Kinh nghiệm làm việc">
            <el-select
              style="width:100%"
              v-model="form.workExperience"
              placeholder="Chọn kinh nghiệm"
            >
              <el-option
                v-for="item in workExperiences"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.AType" placeholder="Loại hoạt động"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" class="amountType" style="padding: 0 20px;">
          <el-form-item label="Mức lương" prop="amountType">
            <el-select
              style="width:100%"
              v-model="form.amountType"
              placeholder="Chọn mức lương"
            >
              <el-option
                v-for="item in salarys"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.AType" placeholder="Loại hoạt động"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="Giới tính">
            <el-select
              style="width:100%"
              v-model="form.sex"
              placeholder="Chọn giới tính"
            >
              <el-option
                v-for="item in sexs"
                :key="item.DefaultValue"
                :label="item.DefaultValue"
                :value="item.DefaultValue"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.AType" placeholder="Loại hoạt động"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Nơi làm việc">
        <el-select
          v-model="form.workAddress"
          style="width:100%"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Nơi làm việc"
        >
          <el-option
            v-for="item in citys"
            :key="item.DefaultValue"
            :label="item.DefaultValue"
            :value="item.DefaultValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Chuyên ngành yêu cầu">
        <el-select
          v-model="form.careerRequire"
          style="width:100%"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Chọn chuyên ngành"
        >
          <el-option
            v-for="item in careers"
            :key="item.DefaultValue"
            :label="item.DefaultValue"
            :value="item.DefaultValue"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Kỹ năng bắt buộc">
        <el-select
          v-model="form.skillCompulsory"
          multiple
          filterable
          allow-create
          default-first-option
          style="width:100%"
          placeholder="Chọn kỹ năng "
        >
          <el-option
            v-for="item in skills"
            :key="item.DefaultValue"
            :label="item.DefaultValue"
            :value="item.DefaultValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hạn đăng ký">
        <el-date-picker
          v-model="form.deadline"
          type="datetime"
          style="width:100%"
          format="dd-MM-yyyy HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="Chọn hạn đăng ký"
        ></el-date-picker>
      </el-form-item>
      <label class="label">Mô tả công việc</label>
      <br />
      <el-form-item>
        <!-- <el-input type="textarea" v-model="form.workDescription"></el-input> -->
        <tiny-mce v-model="form.workDescription"></tiny-mce>
      </el-form-item>

      <label class="label">Quyền lợi được hưởng</label>
      <br />
      <el-form-item>
        <!-- <el-input type="textarea" v-model="form.benefit"></el-input> -->
        <tiny-mce v-model="form.benefit"></tiny-mce>
      </el-form-item>

      <label class="label">Yêu cầu công việc</label>
      <br />
      <el-form-item>
        <!-- <el-input type="textarea" v-model="form.workRequire"></el-input> -->

        <tiny-mce v-model="form.workRequire"></tiny-mce>
      </el-form-item>

      <label class="label">Yêu cầu hồ sơ</label>
      <br />
      <el-form-item>
        <!-- <el-input type="textarea" v-model="form.resumeRequire"></el-input> -->

        <tiny-mce v-model="form.resumeRequire"></tiny-mce>
      </el-form-item>

      <el-form-item label="Tên người liên hệ">
        <el-input
          v-model="form.contactName"
          placeholder="Tên người liên hệ"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email liên hệ">
        <el-input
          v-model="form.contactEmail"
          placeholder="Email liên hệ"
        ></el-input>
      </el-form-item>
      <el-form-item label="SDT liên hệ">
        <el-input
          v-model="form.contactPhone"
          placeholder="SDT liên hệ"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button size="small" type="primary" @click="submit('form')"
          >Xác nhận</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TinyMce from "@/components/Tinymce";
import {
  CreateRecruitment,
  UpdateRecruitment
} from "@/api/work-dtp/recruitment";
import { GetDefaultValue } from "@/api/work-dtp/defaultValue";
export default {
  components: {
    TinyMce
  },
  methods: {
    submit(nameForm) {
      var RecruitmentInfo = {
        Title: this.form.title,
        DocumentID: this.form.documentID,
        CompanyID: this.form.companyID,
        DocumentID: this.form.documentID,
        WorkPosition: this.form.workPosition, // cấp bậc
        WorkType: this.form.workType, // loại hình làm việc
        AmountType: this.form.amountType, // Lương
        WorkExperience: this.form.workExperience, // kinh nghiệm làm việc
        // Số lượng
        DegreeRequire: this.form.degreeRequire, // bằng cấp
        CareerRequire: this.form.careerRequire.join(), //Ngành nghề
        WorkAddress: this.form.workAddress.join(), // nơi làm việc
        SexRequire: this.form.sex, // giới tính
        SkillCompulsory: this.form.skillCompulsory.join(),
        WorkDescription: this.form.workDescription,
        Benefit: this.form.benefit,
        WorkRequire: this.form.workRequire, // yêu cầu công việc
        ResumeRequire: this.form.resumeRequire, // yêu cầu hồ sơ
        Deadline: this.form.deadline,
        Language: this.form.language.join(),
        ContactPhone: this.form.contactPhone,
        ContactName: this.form.contactName,
        ContactEmail: this.form.contactEmail,
        QuantityCandidate: this.form.quantityCandidate
      };
      //   this.isLoading = true;
      if (this.row) {
        UpdateRecruitment({ RecruitmentInfo: RecruitmentInfo }).then(res => {
          this.isLoading = false;
          if (res.RespCode === 0) {
            this.$notify({
              message: "Cập nhật bài đăng tuyển dụng thành công",
              title: "Thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("updateOK");
          }
        });
      } else {
        this.$refs[nameForm].validate(valid => {
          if (valid) {
            this.isLoading = true;
            const req = {
              CompanyID: this.company,
              RecruitmentInfo: RecruitmentInfo
            };
            CreateRecruitment(req).then(res => {
              this.isLoading = false;
              if (res.RespCode === 0) {
                this.$notify({
                  message: "Tạo bài đăng tuyển dụng thành công",
                  title: "Thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("updateOK");
              }
            });
          }
        });
      }
    },
    initForm() {
      if (this.row == null) {
        this.form.title = null;
        this.form.companyID = null;
        this.form.workPosition = null; // cấp bậc
        this.form.workType = null; // loại hình làm việc
        this.form.amountType = null;
        this.form.workExperience = null; // kinh nghiệm làm việc
        // Lương
        this.form.degreeRequire = null; // bằng cấp
        this.form.careerRequire = null; //Ngành nghề
        this.form.workAddress = null; // nơi làm việc
        this.form.sex = null; // giới tính
        this.form.skillCompulsory = null;
        this.form.workDescription = null;
        this.form.benefit = null;
        this.form.workRequire = null; // yêu cầu công việc
        this.form.resumeRequire = null; // yêu cầu hồ sơ
        this.form.deadline = null;
        this.form.language = null;
        this.form.contactPhone = null;
        this.form.contactName = null;
        this.form.contactEmail = null;
        this.form.quantityCandidate = null;
      } else {
        this.form.companyID = this.row.CompanyID;
        this.form.documentID = this.row.DocumentID;
        this.form.title = this.row.Title;
        this.form.workPosition = this.row.workPosition; // cấp bậc
        this.form.workType = this.row.WorkType; // loại hình làm việc
        this.form.amountType = this.row.AmountType;
        this.form.workExperience = this.row.WorkExperience; // kinh nghiệm làm việc
        // Lương
        this.form.degreeRequire = this.row.DegreeRequire; // bằng cấp
        this.form.careerRequire = this.row.CareerRequire
          ? this.row.CareerRequire.split(",")
          : ""; //Ngành nghề
        this.form.workAddress = this.row.WorkAddress
          ? this.row.WorkAddress.split(",")
          : ""; // nơi làm việc
        this.form.sex = this.row.SexRequire; // giới tính
        this.form.skillCompulsory = this.row.SkillCompulsory
          ? this.row.SkillCompulsory.split(",")
          : "";
        this.form.workDescription = this.row.WorkDescription;
        this.form.benefit = this.row.Benefit;
        this.form.workRequire = this.row.WorkRequire; // yêu cầu công việc
        this.form.resumeRequire = this.row.ResumeRequire; // yêu cầu hồ sơ
        this.form.deadline = this.row.Deadline;
        this.form.language = this.row.Language
          ? this.row.Language.split(",")
          : "";
        this.form.contactPhone = this.row.ContactPhone;
        this.form.contactName = this.row.ContactName;
        this.form.contactEmail = this.row.ContactEmail;
        this.form.quantityCandidate = this.row.QuantityCandidate;
      }
    }
  },
  data() {
    return {
      degreeRequires: [],
      workPositions: [],
      sexs: [],
      salarys: [],
      careers: [],
      workExperiences: [],
      workTypes: [],
      citys: [],
      skills: [],
      languages: [],
      form: {
        documentID: "",
        companyID: "",
        title: "",
        workPosition: "",
        workType: "",
        amountType: "",
        degreeRequire: "",
        careerRequire: "",
        skillCompulsory: "",
        workDescription: "",
        benefit: "",
        resumeRequire: "",
        deadline: "",
        language: "",
        contactPhone: "",
        contactName: "",
        contactEmail: "",
        sex: "",
        workAddress: "",
        workRequire: "",
        workExperience: "",
        salary: "",
        quantityCandidate: 0
      },
      ruleForm: {
        title: [{ required: true, message: "Hãy nhập tiêu đề" }],
        quantityCandidate: [{ required: true, message: "Hãy nhập số lượng" }],
        workType: [{ required: true, message: "Hãy chọn loại hình làm việc" }],
        amountType: [{ required: true, message: "Hãy chọn mức lương" }],
        skillCompulsory: [{ required: true, message: "Hãy chọn kỹ năng" }]
      },
      Levels: [
        {
          value: "Thực tập sinh"
        },
        {
          value: "Nhân viên"
        },
        {
          value: "Trưởng nhóm"
        },
        {
          value: "Trưởng phòng"
        },
        {
          value: "Phó giám đốc"
        },
        {
          value: "Giám đốc"
        },
        {
          value: "Tổng giám đốc điều hành"
        }
      ],
      isLoading: false
    };
  },
  props: {
    row: Object,
    company: String
  },
  mounted() {},
  watch: {
    row() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
    console.log(this.row);
    GetDefaultValue({ TableName: "Degree" }).then(res => {
      this.degreeRequires = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "WorkPostion" }).then(res => {
      this.workPositions = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Sex" }).then(res => {
      this.sexs = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Salary" }).then(res => {
      this.salarys = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Career" }).then(res => {
      this.careers = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Experience" }).then(res => {
      this.workExperiences = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "WorkType" }).then(res => {
      this.workTypes = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "City" }).then(res => {
      this.citys = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Skill" }).then(res => {
      this.skills = res.DefaultValueLst;
    });
    GetDefaultValue({ TableName: "Language" }).then(res => {
      this.languages = res.DefaultValueLst;
    });
  }
};
</script>
<style lang="css">
.el-form-item {
  margin-bottom: 10px;
}
.el-textarea__inner {
  min-height: 100px !important;
}
</style>
<style lang="scss" scoped>
.label {
  color: #606266;
  font-size: 14px;
}

@media screen and (max-width: 767px) {
  .amountType,
  .language,
  .workPosition {
    padding: 0 !important;
  }
}
.post {
  width: 100%;
  height: auto;
}
</style>
