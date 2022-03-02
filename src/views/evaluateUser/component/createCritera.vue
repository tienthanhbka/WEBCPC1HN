<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Đánh giá ai" prop="EmTypeTxt">
            <el-autocomplete
              class="selectIDGroup"
              style="width:100%"
              v-model="form.EmTypeTxt"
              :fetch-suggestions="querySearch"
              placeholder="Chọn đối tượng..."
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.Description }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Cấp bậc" prop="EmLevel">
            <el-select
              v-model="form.EmLevel"
              filterable
              placeholder="Chọn cấp bậc nhân viên..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in Levels"
                :key="item.Level"
                :label="item.Description"
                :value="item.Level"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Chi nhánh" prop="Branch">
            <el-select
              v-model="form.Branch"
              placeholder="Chọn chi nhánh..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in Branchs"
                :key="index"
                :label="item.Value"
                :value="item.Value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
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
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Loại đánh giá" required>
            <el-select
              class="selectIDGroup"
              style="width:100%"
              v-model="form.TypeEvaluate"
              placeholder="Chọn loại đánh giá"
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
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Loại tiêu chí" prop="CriteriaType">
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
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tiêu chí" label-width="140">
            <el-autocomplete
              class="selectIDGroup"
              style="width:100%"
              v-model="form.ReferenceDes"
              :fetch-suggestions="querySearch5"
              placeholder="Chọn tiêu chí đánh giá..."
              @select="handleSelect5"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.Description }}</div>
              </template>
            </el-autocomplete>
            <!-- <el-select
              filterable
              v-model="form.ReferenceCode"
              @change="changeReference"
              placeholder="Chọn tiêu chí..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in LstCode"
                :key="item.ReferenceCode"
                :label="item.Description"
                :value="item"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-row :gutter="10">
            <el-col :xs="24" :lg="14">
              <el-form-item label="Định mức" label-width="100">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Quota"
                  style="width:100%"
                  placeholder="Nhập định mức..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="10">
              <el-form-item label="Đơn vị tính" prop="Unit" label-width="100">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Unit"
                  style="width:100%"
                  placeholder="Nhập đơn vị tính"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Đánh giá" prop="CriteriaName">
          <el-input
            class="selectIDGroup"
            v-model="form.CriteriaName"
            style="width:100%"
            placeholder="Nhập đánh giá..."
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="Mô tả" prop="Description">
          <el-input
            class="selectIDGroup"
            v-model="form.Description"
            style="width:100%"
            placeholder="Nhập mô tả đánh giá..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ai đánh giá" prop="EvalueTypeTxt">
            <el-autocomplete
              class="selectIDGroup"
              style="width:100%"
              v-model="form.EvalueTypeTxt"
              :fetch-suggestions="querySearch1"
              placeholder="Chọn người đánh giá..."
              @select="handleSelect1"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.Description }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Cấp bậc" prop="EvalueLevel">
            <el-select
              v-model="form.EvalueLevel"
              placeholder="Chọn cấp bậc người đánh giá..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in Levels"
                :key="item.Level"
                :label="item.Description"
                :value="item.Level"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="text-align:center;padding:10px">
      <el-button size="small" type="info" @click="closeModal">Hủy</el-button>
      <el-button
        v-if="this.critera == null"
        icon="el-icon-check"
        size="small"
        type="primary"
        @click="addCritera('form')"
        >Xác nhận</el-button
      >
      <el-button
        v-if="this.critera != null"
        icon="el-icon-edit"
        size="small"
        type="warning"
        @click="addCritera('form')"
        >Chỉnh sửa</el-button
      >
    </div>
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
import { GetEmployeeLevel } from "@/api/employeeAdmin";
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
          label: "Định kỳ"
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
          value: 3,
          label: "3 tháng"
        },
        {
          value: 6,
          label: "6 tháng"
        },
        {
          value: 12,
          label: "1 năm"
        },
        {
          value: 18,
          label: "18 tháng"
        },
        {
          value: 24,
          label: "2 năm"
        },
        {
          value: 36,
          label: "3 năm"
        },
        {
          value: 48,
          label: "4 năm"
        }
      ],
      Levels: [],
      LstCode: [],
      Branchs: [
        { Value: "Chi nhánh Hà Nội" },
        { Value: "Chi nhánh Hồ Chí Minh" },
        { Value: "Chi nhánh Đà Nẵng" },
        { Value: "Trụ sở chính - Nhà máy" }
      ],
      form: {
        CriteriaName: "",
        CriteriaType: "",
        ReferenceDes: "",
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
        TypeEvaluate: "",
        Unit: ""
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
    handleSelect5(item) {
      this.form.ReferenceCode = item.ReferenceCode;
      this.form.Unit = item.Unit;
      this.form.ReferenceDes = item.Description;
    },
    querySearch5(queryString, cb) {
      var links = this.LstCode;
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
      this.$emit("cancel");
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
        Table: "Branch"
      };
      // GetDefaultValue(req2).then(res => {
      //   if (res.RespCode == 0) {
      //     this.Branchs = res.OtherLst;
      //   } else {
      //     this.$message({
      //       message: res.RespText,
      //       type: "warning"
      //     });
      //   }
      // });
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
        this.form.CriteriaType = this.critera.CriteriaType;
        this.form.Unit = this.critera.Unit;
        this.form.ReferenceDes = this.critera.ReferenceDes;
      } else {
        this.form.CriteriaID = null;
        this.form.CriteriaName = null;
        this.form.CriteriaType = null;
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
        this.form.Unit = null;
        this.form.ReferenceDes = "";
      }
    },
    fetchLevel() {
      GetEmployeeLevel().then(res => {
        if (res.RespCode == 0) {
          this.Levels = res.LevelLst;
        }
      });
    },
    changeReference(val) {
      this.form.ReferenceCode = val.ReferenceCode;
      this.form.Unit = val.Unit;
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
    this.fetchLevel();
  }
};
</script>
<style>
.modal-box {
  width: 50%;
}
</style>
