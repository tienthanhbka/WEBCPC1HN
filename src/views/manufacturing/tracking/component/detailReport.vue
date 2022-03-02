<template>
  <div>
    <el-form
      ref="formHeader"
      label-position="top"
      size="small"
      :model="Report"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tên mẫu" prop="SampleName">
            <el-input
              v-model="Report.SampleName"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tên sản phẩm" prop="ProductName">
            <el-input
              v-model="Report.ProductName"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập tên sản phẩm..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Điều kiện bảo quản" prop="Condition">
            <el-input
              v-model="Report.Condition"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập điều kiện bảo quản..."
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian theo dõi" prop="Time">
            <el-input
              v-model="Report.Time"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập Thời gian theo dõi..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người báo cáo">
            <el-input
              v-model="Report.Creator"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian báo cáo">
            <el-input
              v-model="Report.TimeCreate"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú">
        <el-input
          v-model="Report.Note"
          class="selectIDGroup"
          style="width:100%"
          placeholder="Nhập ghi chú..."
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Người duyệt"
            v-if="Report.Approver"
            class="label-item"
          >
            <el-input
              v-model="Report.Approver"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Thời gian duyệt"
            v-if="Report.TimeApprover"
            class="label-item"
          >
            <el-input
              v-model="Report.TimeApprover"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Kết quả" v-if="Report.Result" class="label-item">
            <el-input style="width:100%" v-model="Report.Result" class="result">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Đánh giá"
            v-if="Report.Result"
            class="label-item"
          >
            <el-input
              v-model="Report.Comment"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="report.ValObservedItem">
              <el-table-column label="Chỉ tiêu">
                <template slot-scope="scope">
                  {{ scope.row.TargetName }}
                </template>
              </el-table-column>
              <el-table-column label="Giá trị quan sát">
                <template slot-scope="scope">
                  {{ scope.row.ValObserved }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="padding:5px;text-align:center;">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >ĐÓNG</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db } from "./firebase";
export default {
  props: ["report"],
  components: {},
  computed: {},
  data() {
    return {
      rules: {
        SampleName: [
          {
            required: true,
            message: "Hãy chọn mẫu",
            trigger: "change"
          }
        ],
        ProductName: [
          {
            required: true,
            message: "Hãy nhập sản phẩm",
            trigger: "change"
          }
        ],
        Condition: [
          {
            required: true,
            message: "Hãy nhập điều kiện bảo quản",
            trigger: "change"
          }
        ],
        Time: [
          {
            required: true,
            message: "Hãy chọn thời gian theo dõi",
            trigger: "change"
          }
        ]
      },
      rulesValOb: {
        ValObserved: [
          {
            required: true,
            message: "Hãy nhập giá trị quan sát",
            trigger: "change"
          }
        ],
        Index: [
          {
            required: true,
            message: "Hãy chọn chỉ tiêu"
          }
        ]
      },
      Report: {
        ReportID: "",
        ProductName: "",
        ProductID: "",
        SampleName: "",
        SampleID: "",
        Creator: "",
        TimeCreate: "",
        Result: "",
        Comment: "",
        Approver: "",
        TimeApprover: "",
        Status: "",
        Note: ""
      },
      SampleLst: []
    };
  },
  methods: {
    initForm() {
      if (this.report) {
        if (this.report.Approver) {
          (this.Report.Result = this.report.Result),
            (this.Report.Comment = this.report.Comment),
            (this.Report.Approver = this.report.Approver),
            (this.Report.TimeApprover = this.report.TimeApprover);
        } else {
          (this.Report.Result = null),
            (this.Report.Comment = null),
            (this.Report.Approver = null),
            (this.Report.TimeApprover = null);
        }
        (this.Report.ReportID = this.report.ReportID),
          (this.Report.ProductName = this.report.ProductName),
          (this.Report.ProductID = this.report.ProductID),
          (this.Report.SampleName = this.report.SampleName),
          (this.Report.SampleID = this.report.SampleID),
          (this.Report.Condition = this.report.Condition),
          (this.Report.Time = this.report.Time),
          (this.Report.Creator = this.report.Creator),
          (this.Report.TimeCreate = this.report.TimeCreate),
          (this.Report.Note = this.report.Note);
      } else {
        this.Report = {
          ReportID: "",
          ProductName: "",
          ProductID: "",
          SampleName: "",
          SampleID: "",
          SampleImg: "",
          Condition: "",
          Time: "",
          Result: "",
          Comment: "",
          Approver: "",
          TimeApprover: "",
          Creator: "",
          TimeCreate: "",
          Status: "",
          Note: ""
        };
      }
    },
    cancelup() {
      this.$emit("cancel");
    }
  },
  mounted() {},
  watch: {
    report() {
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
  padding: 0px 10px;
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
.result .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
  background-color: #02bc77;
  color: white;
  font-weight: 700;
}
.label-item .el-form-item__label {
  color: #02bc77;
}
</style>
