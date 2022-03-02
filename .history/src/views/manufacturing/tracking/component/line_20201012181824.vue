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
          <el-form-item label="Điều kiện lưu" prop="ProductName">
            <el-input
              v-model="Report.ProductName"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập tên sản phẩm..."
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Số lượng" prop="ProductName">
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
          <el-form-item label="Đóng gói" prop="Condition">
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
          <el-form-item label="NCV phụ trách" prop="Time">
            <el-input
              v-model="Report.Time"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập thời gian theo dõi..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
        ProductOrder: "",
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
    querySearch2(queryString, cb) {
      var links = this.SampleLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.Report.ProductName = item.ProductName;
      this.Report.ProductID = item.ProductID;
      this.Report.ProductOrder = item.ProductOrder;
      this.Report.SampleName = item.SampleName;
      this.Report.Condition = item.Condition;
      this.Report.Time = item.Time;
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
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.ProductName.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },
    addReport(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.report == null) {
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
                ProductOrder: this.Report.ProductOrder,
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
        } else {
          return false;
        }
      });
      this.$refs.formHeader.resetFields();
      this.Report = {
        ReportID: "",
        ProductName: "",
        ProductID: "",
        ProductOrder: "",
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
                  (this.Report.ProductOrder = element.ProductOrder),
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
          ProductOrder: "",
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
    },
    fetchData() {
      let a = [];
      let b = [];
      db.ref("TargetList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            b.push(element);
          });
        }
      });
      this.TargetLst = b;
      db.ref("SampleList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
        this.SampleLst = a;
      });
    }
  },
  mounted() {},
  watch: {
    report() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
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
