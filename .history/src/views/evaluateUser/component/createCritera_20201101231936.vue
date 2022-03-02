<template>
  <div>
    <modal id="new-critera-modal" ref="new-critera-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-user-check"></i>
        &#32;&#32;Tạo tiêu chí đánh giá
      </template>
      <div slot="body">
        <el-row :gutter="20" style="height:455px">
          <el-form
            ref="form"
            label-position="top"
            size="small"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Loại nhân viên" required>
                <el-select
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.TypeEvaluate"
                  placeholder="Chọn loại nhân viên"
                >
                  <el-option
                    v-for="item in TypeLst"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Tiêu chí" prop="CriteriaName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.CriteriaName"
                  style="width:100%"
                  placeholder="Nhập tiêu chí..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Nhân viên" prop="EmTypeTxt">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.EmTypeTxt"
                  :fetch-suggestions="querySearch"
                  placeholder="Chọn đối tượng..."
                  @select="handleSelect"
                >
                  <i class="el-icon-user-solid" slot="prefix"> </i>
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.Description }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Cấp bậc" prop="EmLevel">
                <el-select
                  v-model="form.EmLevel"
                  placeholder="Chọn cấp bậc nhân viên..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in Levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Tuổi nghề" prop="WorkOld">
                <el-select
                  v-model="form.WorkOld"
                  placeholder="Nhập tuổi nghề nhân viên..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in WorkOlds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Chi nhánh" prop="Branch">
                <el-select
                  v-model="form.Branch"
                  placeholder="Chọn chi nhánh..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in Branchs"
                    :key="item.DefaultValue"
                    :label="item.DefaultValue"
                    :value="item.DefaultValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Mã tham chiếu (Khối lượng công việc)">
                <el-select
                  v-model="form.ReferenceCode"
                  placeholder="Chọn mã tham chiếu..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in LstCode"
                    :key="item.ReferenceCode"
                    :label="item.Description"
                    :value="item.ReferenceCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Loại tiêu chí">
                <el-select
                  v-model="form.CriteriaType"
                  placeholder="Loại tiêu chí..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in LstType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.Value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Người đánh giá" prop="EvalueTypeTxt">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.EvalueTypeTxt"
                  :fetch-suggestions="querySearch1"
                  placeholder="Chọn đối tượng đánh giá..."
                  @select="handleSelect1"
                >
                  <i class="fas fa-user-check" slot="prefix"> </i>
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.Description }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Cấp bậc" prop="EvalueLevel">
                <el-select
                  v-model="form.EvalueLevel"
                  placeholder="Chọn cấp bậc người đánh giá..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in Levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Định mức">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Quota"
                  style="width:100%"
                  placeholder="Nhập định mức..."
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Mô tả" prop="Description">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Description"
                  style="width:100%"
                  placeholder="Nhập mô tả..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24"> </el-col>
          </el-form>
        </el-row>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          v-if="this.critera == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addCritera('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="this.critera != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="addCritera('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import {
  CreateCriteriaDefine,
  UpdateCriteriaDefine,
  GetEmployeeDefine,
  GetReferenceCode,
  GetDefaultValue
} from "@/api/NSCriteriaDefine";
import Cookies from "js-cookie";
export default {
  props: ["critera", "typeEvaluate"],
  components: {},
  data() {
    var validateDeadline = (rule, value, callback) => {
      if (value < new Date().toISOString().slice(0, 10)) {
        callback(new Error("Hãy chọn ngày trong tương lai"));
      } else {
        callback();
      }
    };
    return {
      EmployeeTypeLst: [],
      LstType: [
        {
          value: 0,
          label: "Không bắt buộc"
        },
        {
          value: 1,
          label: "Bắt buộc"
        }
      ],
      TypeLst: [
        {
          value: "TV",
          label: "Thử việc"
        },
        {
          value: "CT",
          label: "Chính thức"
        },
        {
          value: "BN",
          label: "Bổ nhiệm"
        }
      ],
      rules: {
        CriteriaName: [
          {
            required: true,
            message: "Hãy nhập tiêu chí",
            trigger: "change"
          }
        ],
        // Quota: [
        //   {
        //     required: true,
        //     message: "Hãy nhập định mức",
        //     trigger: "change"
        //   }
        // ],
        WorkOld: [
          {
            required: true,
            message: "Hãy nhập tuổi nghề",
            trigger: "change"
          }
        ],
        EmTypeTxt: [
          {
            required: true,
            message: "Hãy chọn nhân viên",
            trigger: "change"
          }
        ],
        EvalueTypeTxt: [
          {
            required: true,
            message: "Hãy nhập người đánh giá",
            trigger: "change"
          }
        ],
        CriteriaType: [
          {
            required: true,
            message: "Hãy chọn loại tiêu chí",
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
        EvalueLevel: [
          {
            required: true,
            message: "Hãy nhập cấp bậc người đánh giá",
            trigger: "change"
          }
        ],
        EmLevel: [
          {
            required: true,
            message: "Hãy nhập cấp bậc nhân viên",
            trigger: "change"
          }
        ],
        Branch: [
          {
            required: true,
            message: "Hãy chọn chi nhánh",
            trigger: "change"
          }
        ]
      },
      WorkOlds: [
        {
          value: 0,
          label: "Thử việc"
        },
        {
          value: "3",
          label: "3 tháng"
        },
        {
          value: "6",
          label: "6 tháng"
        },
        {
          value: "10",
          label: "1 năm"
        },
        {
          value: "20",
          label: "2 năm"
        },
        {
          value: "30",
          label: "3 năm"
        },
        {
          value: "40",
          label: "4 năm"
        }
      ],
      Levels: [
        {
          value: "1",
          label: "Nhân viên"
        },
        {
          value: "2",
          label: "Trưởng nhóm SS-ASM"
        },
        {
          value: "3",
          label: "Trưởng phòng"
        },
        {
          value: "4",
          label: "Giám đốc chi nhánh"
        },
        {
          value: "5",
          label: "Tổng giám đốc"
        }
      ],
      LstCode: [],
      Branchs: [],
      form: {
        CriteriaName: "",
        CriteriaType: "",
        Quota: "",
        EmType: "",
        EmTypeTxt: "",
        EmLevel: "",
        WorkOld: "",
        EvalueLevel: "",
        EvalueType: "",
        EvalueTypeTxt: "",
        Description: "",
        ReferenceCode: "",
        Branch: "",
        TypeEvaluate: ""
      }
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.EmployeeTypeLst;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.EmTypeTxt = item.Description;
      this.form.EmType = item.TypeCode;
      GetReferenceCode({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        EmpType: item.TypeCode
      }).then(res => {
        if (res.RespCode == 0) {
          this.LstCode = res.ReferenceCodeLst;
        }
      });
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.Description.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect1(item) {
      this.form.EvalueTypeTxt = item.Description;
      this.form.EvalueType = item.TypeCode;
    },
    querySearch1(queryString, cb) {
      var links = this.EmployeeTypeLst;
      var results = queryString
        ? links.filter(this.createFilter1(queryString))
        : links;
      cb(results);
    },
    createFilter1(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.Description.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    addCritera(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.critera == null) {
            var req = {
              Token: Cookies.get("token"),
              UserName: Cookies.get("idEmployee"),
              CriteriaDefineInfo: this.form
            };
            CreateCriteriaDefine(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Tạo tiêu chí thành công",
                  type: "success"
                });
                this.$emit("criteriaAdded", this.form);
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          } else {
            var req = {
              Token: Cookies.get("token"),
              UserName: Cookies.get("idEmployee"),
              CriteriaDefineInfo: this.form
            };
            UpdateCriteriaDefine(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Chỉnh sửa tiêu chí thành công",
                  type: "success"
                });
                this.$emit("criteriaUpdated", this.form);
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-critera-modal");
    },
    changeEvaluate(value) {},
    fetchData() {
      var req = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token")
      };
      GetEmployeeDefine(req).then(res => {
        if (res.RespCode == 0) {
          this.EmployeeTypeLst = res.EmployeeTypeLst;
        }
      });
      var req2 = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token"),
        TableName: "Branch"
      };
      GetDefaultValue(req2).then(res => {
        if (res.RespCode == 0) {
          this.Branchs = res.DefaultValueLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    initForm() {
      if (this.critera) {
        this.form.TypeEvaluate = this.critera.TypeEvaluate;
        this.form.CriteriaID = this.critera.CriteriaID;
        this.form.CriteriaName = this.critera.CriteriaName;
        this.form.Quota = this.critera.Quota;
        this.form.EmType = this.critera.EmType;
        this.form.EmTypeTxt = this.critera.EmTypeTxt;
        this.form.EmLevel = this.critera.EmLevel;
        this.form.WorkOld = this.critera.WorkOld;
        this.form.EvalueLevel = this.critera.EvalueLevel;
        this.form.EvalueType = this.critera.EvalueType;
        this.form.EvalueTypeTxt = this.critera.EvalueTypeTxt;
        this.form.Description = this.critera.Description;
        this.form.ReferenceCode = this.critera.ReferenceCode;
        this.form.Branch = this.critera.Branch;
      } else {
        this.form.CriteriaID = null;
        this.form.CriteriaName = null;
        this.form.Quota = null;
        this.form.EmType = null;
        this.form.EmTypeTxt = null;
        this.form.EmLevel = null;
        this.form.WorkOld = null;
        this.form.EvalueLevel = null;
        this.form.EvalueType = null;
        this.form.EvalueTypeTxt = null;
        this.form.Description = null;
        this.form.ReferenceCode = null;
        this.form.Branch = null;
        this.form.TypeEvaluate = this.typeEvaluate;
      }
    }
  },
  mounted() {},
  watch: {
    critera() {
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
.modal-box {
  width: 50%;
}
</style>
