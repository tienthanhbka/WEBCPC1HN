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
              placeholder="Nhập tên mẫu..."
            >
            </el-input>
            <!-- <el-autocomplete
              class="selectIDGroup"
              style="width:100%"
              v-model="Report.SampleName"
              :fetch-suggestions="querySearch2"
              placeholder="Chọn mẫu..."
              @select="handleSelect"
            >
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="handleIconClick2"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.SampleName }}</div>
                <span class="link">{{ item.ProductName }}</span>
              </template>
            </el-autocomplete> -->
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
      <el-card>
        <div slot="header" class="clearfix">
          <span style="color:#02bc77;font-size:10pt;font-weight:700;"
            ><i class="fas fa-clipboard-list"></i> Giá trị quan sát</span
          >
        </div>
        <div
          v-for="(item, index) in ValObservedItem"
          :key="index"
          v-if="ValObservedItem"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Chỉ tiêu">
                <el-input
                  v-model="item.TargetName"
                  class="selectIDGroup"
                  style="width:100%"
                  placeholder="Nhập chỉ tiêu..."
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Giá trị quan sát">
                <el-input
                  v-model="item.ValObserved"
                  class="selectIDGroup"
                  style="width:100%"
                  placeholder="Nhập giá trị quan sát..."
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- <el-form
          ref="formIndex"
          label-position="top"
          size="small"
          :model="ValObservedLst"
          :rules="rulesValOb"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Chỉ tiêu" prop="Index">
                <el-select
                  v-model="TargetLis.Index"
                  placeholder="Chọn chỉ tiêu"
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in TargetList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Giá trị quan sát" prop="ValObserved">
                <el-input
                  v-model="ValObservedLst.ValObserved"
                  class="selectIDGroup"
                  style="width:100%"
                  placeholder="Nhập giá trị quan sát..."
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      </el-card>
      <!-- <el-tooltip content="Thêm" effect="light">
        ><el-button
          icon="el-icon-plus"
          style="color:green;"
          @click="addObserverd"
          type="text"
        ></el-button>
      </el-tooltip> -->
      <!-- <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="ValObservedList">
              <el-table-column label="Chỉ tiêu">
                <template slot-scope="scope">
                  {{ scope.row.Index }}
                </template>
              </el-table-column>
              <el-table-column label="Giá trị quan sát">
                <template slot-scope="scope">
                  {{ scope.row.ValObserved }}
                </template>
              </el-table-column>

              <el-table-column width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="del(scope.$index)"
                    type="text"
                    style="color:red;"
                    ><i class="far fa-trash-alt"></i
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row> -->
      <el-form-item label="Ghi chú">
        <el-input
          v-model="Report.Note"
          class="selectIDGroup"
          style="width:100%"
          placeholder="Nhập ghi chú..."
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="Ảnh mẫu" prop="SampleImg">
        <el-upload
          ref="uploadFile"
          action=""
          :http-request="uploadFirebase"
          :auto-upload="false"
          :file-list="fileList"
        >
          <el-button size="mini" type="info">Chọn file</el-button>
        </el-upload>
      </el-form-item> -->
      <div style="padding:5px;text-align:right">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >Hủy</el-button
          >
          <el-button
            v-if="report"
            icon="fas fa-plus"
            style="background-color:#02bc77;color:white;"
            @click="addReport('formHeader')"
            >Tạo mới</el-button
          >
          <!-- <el-button
            v-else
            icon="el-icon-edit"
            style="background-color:#02bc77;color:white;"
            @click="addReport('formHeader')"
            >Chỉnh sửa</el-button
          > -->
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
      fileList: [],
      Image: [],
      ActiveElement: [],
      TargetLst: [],
      TargetList: [
        {
          value: "1",
          label: "Tính chất"
        },
        {
          value: "2",
          label: "Độ trong"
        },
        {
          value: "3",
          label: "Độ đồng nhất"
        },
        {
          value: "4",
          label: "Đồng đều hàm lượng"
        },
        {
          value: "5",
          label: "Thể tích"
        },
        {
          value: "6",
          label: "Đồng đều khối lượng"
        },
        {
          value: "7",
          label: "pH"
        },
        {
          value: "8",
          label: "Giới hạn nhiễm khuẩn"
        },
        {
          value: "9",
          label: "Giới hạn tạp chất"
        },
        {
          value: "10",
          label: "Định tính"
        },
        {
          value: "11",
          label: "Kích thước tiểu phân"
        },
        {
          value: "12",
          label: "Độ rã"
        },
        {
          value: "13",
          label: "Độ hòa tan"
        },
        {
          value: "14",
          label: "Thử vô khuẩn"
        },
        {
          value: "15",
          label: "Độ nhớt"
        },
        {
          value: "16",
          label: "Tỷ trọng"
        },
        {
          value: "17",
          label: "Nội độc tố"
        },
        {
          value: "18",
          label: "Đồng đều phân liều"
        },
        {
          value: "19",
          label: "Áp suất thẩm thấu"
        },
        {
          value: "20",
          label: "Độ ẩm"
        },
        {
          value: "21",
          label: "Độ mịn"
        }
      ],
      ValObservedItem: [],
      ValObservedList: [],
      ValObservedLst: {
        Index: "",
        ValObserved: ""
      },
      show: false,
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
            message: "Hãy điều kiện bảo quản",
            trigger: "change"
          }
        ],
        Time: [
          {
            required: true,
            message: "Hãy chọn thời gian theo dõi"
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
        Condition: "",
        Time: "",
        SampleName: "",
        ValObservedItem: Object,
        SampleID: "",
        Creator: "",
        TimeCreate: "",
        Status: "",
        Note: ""
      },
      SampleLst: []
    };
  },
  methods: {
    addReport(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.report) {
            let date = new Date();
            let v =
              Math.random()
                .toString(36)
                .substring(2) + Date.now().toString(36);
            db.ref("/ReportList/" + v.toString(16)).set(
              {
                ReportID: v,
                ProductName: this.Report.ProductName,
                ProductID: this.Report.ProductID,
                SampleName: this.Report.SampleName,
                Time: this.Report.Time,
                SampleID: this.Report.SampleID,
                Condition: this.Report.Condition,
                ValObservedItem: Object.assign({}, this.ValObservedItem),
                Creator: Cookies.get("name"),
                CreatorID: Cookies.get("idEmployee"),
                TimeCreate: date.toLocaleString(),
                Status: 1,
                Note: this.Report.Note
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
              message: "Tạo báo cáo thành công",
              type: "success"
            });
            this.$emit("ReportAdded");
          }
          // } else {
          //   let date = new Date();
          //   db.ref("/ReportList/" + this.report.ReportID).update(
          //     {
          //       ReportID: this.report.ReportID,
          //       ProductName: this.Report.ProductName,
          //       ProductID: this.Report.ProductID,
          //       SampleName: this.Report.SampleName,
          //       Time: this.Report.Time,
          //       SampleID: this.Report.SampleID,
          //       Condition: this.Report.Condition,
          //       ValObservedItem: Object.assign({}, this.ValObservedItem),
          //       IndexLst: this.Report.IndexLst,
          //       Creator: Cookies.get("name"),
          //       CreatorID: Cookies.get("idEmployee"),
          //       TimeUpdate: date.toLocaleString(),
          //       Status: 2,
          //       Note: this.Report.Note,
          //       TimeCreate: this.Report.TimeCreate
          //     },
          //     function(error) {
          //       if (error) {
          //         console.log(error);
          //       } else {
          //         console.log("tạo mẫu thành công");
          //       }
          //     }
          //   );
          //   this.$message({
          //     message: "Chỉnh sửa báo cáo thành công",
          //     type: "success"
          //   });
          //   this.$emit("ReportAdded");
          // }
        } else {
          return false;
        }
      });
      this.$refs.formHeader.resetFields();
      this.Report = {
        ReportID: "",
        ProductName: "",
        ProductID: "",
        SampleName: "",
        Time: "",
        SampleID: "",
        Creator: "",
        TimeCreate: "",
        Status: "",
        Note: ""
      };
      this.ValObservedItem = [];
    },
    initForm() {
      if (this.report) {
        db.ref("SampleList").on("value", snap => {
          if (snap.val()) {
            Object.values(snap.val()).forEach(element => {
              if (element.SampleName == this.report) {
                (this.Report.ProductName = element.ProductName),
                  (this.Report.ProductID = element.ProductID),
                  (this.Report.SampleName = element.SampleName),
                  (this.Report.Time = element.Time),
                  (this.Report.Condition = element.Condition),
                  (this.Report.SampleID = element.SampleID);
              }
            });
          }
        });
        db.ref("TargetList").on("value", snap => {
          if (snap.val()) {
            Object.values(snap.val()).forEach(element => {
              if (
                element.Time == this.Report.Time &&
                element.ProductName == this.Report.ProductName &&
                element.Condition == this.Report.Condition
              ) {
                this.ValObservedItem = element.IndexLst;
              }
            });
          }
        });
      } else {
        this.Report = {
          ReportID: "",
          ProductName: "",
          ProductID: "",
          SampleName: "",
          Time: "",
          SampleID: "",
          Condition: "",
          Creator: "",
          TimeCreate: "",
          Status: "",
          Note: ""
        };
        this.ValObservedItem = [];
      }
    },
    cancelup() {
      this.$emit("cancel");
    },
    del(index) {
      this.ValObservedList.splice(index, 1);
    }
    // fetchData() {
    //   let a = [];
    //   let b = [];
    //   db.ref("TargetList").on("value", snap => {
    //     if (snap.val()) {
    //       Object.values(snap.val()).forEach(element => {
    //         b.push(element);
    //       });
    //     }
    //   });
    //   this.TargetLst = b;
    //   db.ref("SampleList").on("value", snap => {
    //     if (snap.val()) {
    //       Object.values(snap.val()).forEach(element => {
    //         a.push(element);
    //       });
    //     }
    //     this.SampleLst = a;
    //   });
    // }
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
</style>
