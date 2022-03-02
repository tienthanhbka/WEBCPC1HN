<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="Time"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Mã mẫu" prop="Batch">
            <el-input
              v-model="Time.SampleName"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-input
              v-model="Time.ProductName"
              class="selectIDGroup"
              style="width:100"
              type="textarea"
              autosize
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời điểm" prop="TimeReport">
            <el-select
              class="selectIDGroup"
              v-model="Time.TimeReport"
              placeholder="--Chọn thời điểm--"
              style="width:100%"
            >
              <el-option
                v-for="item in TimeLst"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Chỉ tiêu" prop="TypeSample">
            <el-select
              class="selectIDGroup"
              v-model="Time.Target"
              placeholder="--Chọn Chỉ tiêu--"
              style="width:100%"
              @change="changeTypeSample"
            >
              <el-option
                v-for="item in TypeLst"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Số lượng" prop="SampleCount">
            <el-input
              v-model="Time.SampleCount"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập số lượng mẫu lưu"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ghi chú">
            <el-input
              v-model="Time.Note"
              placeholder="Nhập ghi chú"
              class="selectIDGroup"
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Số lượng" prop="SampleCount">
            <el-input
              v-model="Sample.SampleCount"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập số lượng mẫu lưu"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian theo dõi" prop="Time">
            <el-date-picker
              style="width:100%;border:0;border-bottom:1px solid #ccc;"
              class="selectIDGroup"
              v-model="Sample.Time"
              type="daterange"
              align="right"
              start-placeholder="Từ ngày"
              end-placeholder="Đến ngày"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              v-model="Time.Creator"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian tạo">
            <el-input
              v-model="Time.TimeCreate"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="padding:5px;text-align:right">
        <el-form-item size="large">
          <el-button
            type="danger"
            @click="cancelup('form')"
            icon="el-icon-circle-close"
            >Hủy</el-button
          >
          <el-button
            icon="fas fa-plus"
            style="background-color:#02bc77;color:white;"
            @click="addSample('form')"
          >
            Tạo mới</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db, storage } from "./firebase";
import { GetProductionOrder } from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  props: ["sample", "index"],
  components: {},
  computed: {},
  data() {
    return {
      disabled: false,
      showUpload: true,
      clusterImg: true,
      dialogVisible: false,
      dialogImageUrl: "",
      fileLst: [],
      ActiveElement: [],
      rules: {
        TimeReport: [
          {
            required: true,
            message: "Hãy nhập thời điểm gửi mẫu",
            trigger: "change"
          }
        ],
        Target: [
          {
            required: true,
            message: "Hãy chọn chỉ tiêu",
            trigger: "change"
          }
        ],
        SampleCount: [
          {
            required: true,
            message: "Hãy nhập số lượng",
            trigger: "change"
          }
        ]
      },
      TimeLst: [
        {
          value: "1",
          label: "1 tuần"
        },
        {
          value: "2",
          label: "2 tuần"
        },
        {
          value: "3",
          label: "3 tuần"
        },
        {
          value: "4",
          label: "4 tuần"
        },
        {
          value: "5",
          label: "5 tuần"
        },
        {
          value: "6",
          label: "6 tuần"
        },
        {
          value: "7",
          label: "7 tuần"
        },
        {
          value: "8",
          label: "8 tuần"
        },
        {
          value: "9",
          label: "9 tuần"
        },
        {
          value: "10",
          label: "10 tuần"
        }
      ],
      TypeLst: [
        {
          value: "1",
          label: "Lưu thường"
        },
        {
          value: "2",
          label: "Lão hóa"
        },
        {
          value: "3",
          label: "Tủ lạnh"
        },
        {
          value: "4",
          label: "Bảng mã theo BB"
        }
      ],
      ConditionLst: [
        {
          value: "1",
          label: "Dưới 30 °C"
        },
        {
          value: "2",
          label: "Dưới 25 °C"
        },
        {
          value: "3",
          label: "Dưới 15 °C"
        },
        {
          value: "4",
          label: "Dưới 8 °C"
        },
        {
          value: "5",
          label: "Bảo quản lạnh"
        },
        {
          value: "6",
          label: "Bảo quản mát"
        }
      ],
      Time: {
        SampleName: "",
        ProductID: "",
        ProductName: "",
        TimeReport: "",
        Target: "",
        SampleCount: "",
        Note: "",
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: ""
      },
      TargetLst: [],
      file: "",
      Image: [],
      Token: Cookies.get("token"),
      UserID: Cookies.get("idEmployee")
    };
  },
  methods: {
    addSample(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          let date = new Date();
          let v =
            Math.random()
              .toString(36)
              .substring(2) + Date.now().toString(36);
          db.ref("/ProductionOrderBFOLst/" + this.index).update(
            {
              StatusSample: 1
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("tạo mẫu thành công");
              }
            }
          );
          db.ref("/SampleList/" + v.toString(16)).set(
            {
              SampleID: v,
              SampleName: this.Sample.SampleName,
              ProductName: this.Sample.ProductName,
              ProductID: this.Sample.ProductID,
              Batch: this.Sample.Batch,
              StartingDate: this.Sample.StartingDate,
              SampleCount: this.Sample.SampleCount,
              TypeSample: this.Sample.TypeSample,
              ProductOrder: this.Sample.ProductOrder,
              Time: this.Sample.Time.toLocaleString(),
              ProductDate: this.Sample.ProductDate.toLocaleString(),
              Condition: this.Sample.Condition,
              Original: this.Sample.Original,
              Creator:
                "[" +
                Cookies.get("employeeCode") +
                "]" +
                "-" +
                Cookies.get("name"),
              TimeCreate: date.toLocaleString(),
              Status: 1,
              SampleImg: this.Sample.SampleImg,
              Note: this.Sample.Note
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
            message: "Tạo mẫu thành công",
            type: "success"
          });
          this.$emit("SampleAdded");
          this.$refs[re].resetFields();
        } else {
          return false;
        }
      });
    },
    initForm() {
      var a = [];
      db.ref("TargetList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.ProductName == this.sample.ProductName) {
              a = elememnt.IndexLst;
            }
          });
          this.TargetLst = a;
        }
      });
      if (this.sample) {
        (this.Time.ProductID = this.sample.ProductID),
          (this.Time.ProductName = this.sample.ProductName);
        this.Time.SampleName = this.sample.SampleName;
      } else {
      }
      console.log(this.TargetLst);
    },
    cancelup(re) {
      this.$refs[re].resetFields();
      this.$emit("cancel");
    }
  },
  mounted() {},
  watch: {
    sample() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
    // var req = {
    //   token: this.Token,
    //   DateStart: this.DateStart,
    //   DateEnd: this.DateEnd,
    //   Search: ""
    // };
    // GetProductionOrder(req).then(res => {
    //   if (res.RespCode == 0) {
    //     this.ProductionOrderLst = res.ProductionOrderLst;
    //   }
    // });
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
.hideUpload > div {
  display: none;
}
</style>
