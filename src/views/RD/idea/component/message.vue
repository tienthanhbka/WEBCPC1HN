<template>
  <div>
    <modal id="new-message-modal" ref="new-message-modal" v-cloak>
      <template slot="title"
        ><i class="far fa-comment-dots"></i>
        &#32;&#32;Nội dung yêu cầu
      </template>
      <div slot="body">
        <el-divider content-position="left"
          >Thông tin yêu cầu sửa đổi bổ sung</el-divider
        >
        <span style="margin-bottom:10px;font-weight:700;font-size:13.333px;"
          >Bổ sung thông tin</span
        >
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-row-style="{ color: '#1c456f' }"
        >
          <el-table-column prop="date" label="STT" width="80">
          </el-table-column>
          <el-table-column prop="address" label="Loại tệp đính kèm">
          </el-table-column>
        </el-table>
        <div style="padding:10px 0px;font-weight:700;font-size:13.333px;">
          <span>Nội dung</span>
        </div>
        <el-table
          :data="list"
          border
          style="width: 100%"
          :header-row-style="{ color: '#1c456f' }"
        >
          <el-table-column prop="STT" label="STT" width="80"> </el-table-column>
          <el-table-column prop="YC" label="Yêu cầu bổ sung" width="180">
          </el-table-column>
          <el-table-column prop="Name" label="Người yêu cầu" min-width="150">
          </el-table-column>
          <el-table-column prop="Date" label="Ngày yêu cầu" min-width="150">
          </el-table-column>
          <el-table-column prop="V" label="Xem" min-width="80">
          </el-table-column>
        </el-table>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button
          class="pan-btn grey-btn"
          @click="closeModal"
          icon="el-icon-error"
          >Đóng</el-button
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
  GetReferenceCode
} from "@/api/NSCriteriaDefine";
import Cookies from "js-cookie";
export default {
  props: ["critera"],
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
      list: [
        {
          STT: "1",
          YC: "Bổ sung giấy ủy quyền",
          Date: "05/08/2020",
          Name: "Phạm Mạnh Hùng"
        },
        {
          STT: "2",
          YC: "Giải thích rõ hoạt chất",
          Date: "06/08/2020",
          Name: "Nguyễn Tiến Thành"
        },
        {
          STT: "3",
          YC: "TEST",
          Date: "08/08/2020",
          Name: "Nguyễn Tiến Thành"
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
        Quota: [
          {
            required: true,
            message: "Hãy nhập định mức",
            trigger: "change"
          }
        ],
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
        ReferenceCode: [
          {
            required: true,
            message: "Hãy nhập mã tham chiếu",
            trigger: "change"
          }
        ],
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
        ]
      },
      WorkOlds: [
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
      form: {
        CriteriaName: "",
        Quota: "",
        EmType: "",
        EmTypeTxt: "",
        EmLevel: "",
        WorkOld: "",
        EvalueLevel: "",
        EvalueType: "",
        EvalueTypeTxt: "",
        Description: "",
        ReferenceCode: ""
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
      VoerroModal.hide("new-message-modal");
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
    },
    initForm() {
      if (this.critera) {
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
<style scoped>
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 5px;
}
</style>
