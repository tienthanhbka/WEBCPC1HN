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
              <el-table-column label="Tiêu chuẩn">
                <template slot-scope="scope">
                  {{ scope.row.Index }}
                </template>
              </el-table-column>
              <el-table-column label="Sai số">
                <template slot-scope="scope">
                  {{ scope.row.Error }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span style="font-size: 10pt;font-weight:700;"
            ><i class="fas fa-medal"></i> Đánh giá</span
          >
        </div>
        <div class="text item">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-select
                placeholder="Kết quả..."
                style="width:100%"
                v-model="Report.Result"
              >
                <el-option
                  v-for="item in ResultLst"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="18">
              <el-input
                style="width:100%"
                v-model="Report.Comment"
                placeholder="Nhập đánh giá..."
                :rows="2"
                type="textarea"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div style="padding:5px;text-align:center;">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >ĐÓNG</el-button
          >
          <el-button
            icon="far fa-paper-plane"
            style="background-color:#02bc77;color:white;"
            @click="EvalReport"
          >
            ĐÁNH GIÁ</el-button
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
      ResultLst: [
        {
          value: "1",
          label: "Tin cậy"
        },
        {
          value: "2",
          label: "Không tin cậy"
        }
      ],
      Report: {
        ReportID: "",
        ProductName: "",
        ProductID: "",
        SampleName: "",
        SampleID: "",
        Creator: "",
        Result: "",
        Comment: "",
        TimeCreate: "",
        Status: "",
        Note: ""
      },
      SampleLst: []
    };
  },
  methods: {
    initForm() {
      if (this.report) {
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
          Creator: "",
          Result: "",
          Comment: "",
          TimeCreate: "",
          Status: "",
          Note: ""
        };
      }
    },
    EvalReport() {
      let date = new Date();
      db.ref("/ReportList/" + this.report.ReportID).update(
        {
          Result: this.Report.Result,
          Comment: this.Report.Comment,
          Status: 3,
          Approver: Cookies.get("idEmployee"),
          TimeApprover: date.toLocaleString()
        },
        function(error) {
          if (error) {
            console.log(error);
          } else {
            console.log("tạo mẫu thành công");
          }
        }
      );
      this.$message({
        message: "Đánh giá thành công",
        type: "success"
      });
      this.$emit("ReportApprovered");
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
    console.log(this.report);
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
</style>
