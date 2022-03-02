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
          <el-form-item label="Mã mẫu">
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
          <el-form-item label="Sản phẩm">
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
          <el-form-item label="Chỉ tiêu" prop="Target">
            <el-select
              class="selectIDGroup"
              v-model="Time.Target"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="--Chọn Chỉ tiêu--"
              style="width:100%"
            >
              <el-option
                v-for="item in TargetLst"
                :key="item.TargetName"
                :label="item.TargetName"
                :value="item.TargetName"
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
              placeholder="Nhập số lượng mẫu gửi"
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
      <div style="text-align:center;">
        <el-button
          icon="el-icon-plus"
          @click="addTime"
          size="mini"
          style="background-color:#02bc77;color:#fff;"
          >THÊM</el-button
        >
      </div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="TargetTime">
              <el-table-column label="Thời điểm">
                <template slot-scope="scope">
                  {{ scope.row.TimeReport }}
                </template>
              </el-table-column>
              <el-table-column label="Chỉ tiêu" width="180">
                <template slot-scope="scope">
                  {{ scope.row.Target }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng" width="100">
                <template slot-scope="scope">
                  {{ scope.row.SampleCount }}
                </template>
              </el-table-column>
              <el-table-column label="Ghi chú" width="100">
                <template slot-scope="scope">
                  {{ scope.row.Note }}
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
      <!-- <el-row :gutter="20">
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
      </el-row> -->
      <div style="padding:5px;text-align:center">
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
export default {
  props: ["sample"],
  components: {},
  computed: {},
  data() {
    return {
      TargetTime: [],
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
      Time: {
        SampleName: "",
        ProductID: "",
        ProductName: "",
        TimeReport: "",
        Target: [],
        SampleCount: "",
        Note: "",
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: ""
      },
      TargetLst: [],
      Token: Cookies.get("token")
    };
  },
  methods: {
    addSample() {
      let date = new Date();
      let v =
        Math.random()
          .toString(36)
          .substring(2) + Date.now().toString(36);

      db.ref("/TimeList/" + v.toString(16)).set(
        {
          TimeID: v,
          SampleName: this.Time.SampleName,
          TargetLst: this.TargetTime,
          Creator: this.Time.Creator,
          TimeCreate: this.Time.TimeCreate,
          Status: 1
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
        message: "Tạo chỉ tiêu thành công",
        type: "success"
      });
      this.$emit("TargetAdded");
      this.TargetTime = [];
    },
    del(index) {
      this.TargetTime.splice(index);
    },
    addTime() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let a = "";
          this.Time.Target.forEach(function(item, index, arr) {
            if (index == 0) {
              a += item;
            } else {
              a += "," + item;
            }
          });
          this.TargetTime.push({
            SampleName: this.Time.SampleName,
            ProductName: this.Time.ProductName,
            ProductID: this.Time.ProductID,
            Target: a,
            SampleCount: this.Time.SampleCount,
            TimeReport: this.Time.TimeReport,
            Creator: this.Time.Creator,
            TimeCreate: this.Time.TimeCreate,
            Status: 1,
            Note: this.Time.Note
          });
          this.$refs.form.resetFields();
        }
      });
    },
    initForm() {
      var a = [];
      db.ref("TargetList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.ProductName == this.sample.ProductName) {
              a = element.IndexLst;
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
    console.log(this.sample);
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
