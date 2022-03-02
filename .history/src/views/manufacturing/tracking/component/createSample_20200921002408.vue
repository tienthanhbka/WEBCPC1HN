<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="Sample"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Mã mẫu" prop="SampleName">
            <el-input
              v-model="Sample.SampleName"
              class="selectIDGroup"
              placeholder="Nhập mã mẫu..."
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-input
              v-model="Sample.ProductName"
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
          <el-form-item label="Lệnh sản xuất" prop="Batch">
            <el-input
              v-model="Sample.ProductOrder"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Lô sản xuất" prop="Batch">
            <el-input
              v-model="Sample.Batch"
              class="selectIDGroup"
              style="width:100"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Phân loại" prop="TypeSample">
            <el-select
              class="selectIDGroup"
              v-model="Sample.TypeSample"
              placeholder="Chọn phân loại..."
              style="width:100%"
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
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Điều kiện bảo quản" prop="Condition">
            <el-select
              class="selectIDGroup"
              v-model="Sample.Condition"
              placeholder="Chọn điều kiện bảo quản..."
              style="width:100%"
            >
              <el-option
                v-for="item in ConditionLst"
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
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="Ghi chú">
            <el-input
              v-model="Sample.Note"
              class="selectIDGroup"
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              v-model="Sample.Creator"
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
              v-model="Sample.TimeCreate"
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
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >Hủy</el-button
          >
          <el-button
            v-if="sample == null"
            icon="fas fa-plus"
            style="background-color:#02bc77;color:white;"
            @click="addSample('form')"
          >
            Tạo mới</el-button
          >
          <el-button
            v-else
            icon="el-icon-edit"
            style="background-color:#02bc77;color:white;"
            @click="addSample('form')"
          >
            Chỉnh sửa</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db, storage } from "./firebase";
import { GetProductionOrder } from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  props: ["sample"],
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
        SampleName: [
          {
            required: true,
            message: "Hãy nhập tên mẫu",
            trigger: "change"
          }
        ],
        ProductName: [
          {
            required: true,
            message: "Hãy nhập tên sản phẩm",
            trigger: "change"
          }
        ],
        Batch: [
          {
            required: true,
            message: "Hãy nhập lô sản xuất",
            trigger: "change"
          }
        ],
        ProductDate: [
          {
            required: true,
            message: "Hãy chọn hoạt chất",
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
        Original: [
          {
            required: true,
            message: "Hãy nhập trạng thái",
            trigger: "change"
          }
        ],
        Time: [
          {
            required: true,
            message: "Hãy chọn thời gian theo dõi",
            trigger: "change"
          }
        ],
        TypeSample: [
          {
            required: true,
            message: "Hãy chọn loại mẫu",
            trigger: "change"
          }
        ],
        SampleCount: [
          {
            required: true,
            message: "Hãy nhập số lượng mẫu lưu",
            trigger: "change"
          }
        ]
      },
      TimeLst: [
        {
          value: "1",
          label: "3 ngày"
        },
        {
          value: "2",
          label: "5 ngày"
        },
        {
          value: "3",
          label: "7 ngày"
        },
        {
          value: "4",
          label: "2 tuần"
        },
        {
          value: "5",
          label: "3 tuần"
        },
        {
          value: "6",
          label: "4 tuần"
        },
        {
          value: "7",
          label: "2 tháng"
        },
        {
          value: "8",
          label: "3 tháng"
        },
        {
          value: "9",
          label: "6 tháng"
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
      Sample: {
        SampleID: "",
        SampleName: "",
        ProductName: "",
        ProductID: "",
        Batch: "",
        ProductOrder: "",
        ProductDate: "",
        Condition: "",
        Original: "",
        SampleCount: "",
        Time: "",
        TypeSample: "",
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: "",
        SampleImg: "",
        Note: ""
      },
      EmployeeTypeLst: [],
      file: "",
      Image: [],
      Token: Cookies.get("token"),
      UserID: Cookies.get("idEmployee"),
      ProductionOrderLst: [],
      DateStart: getStartDate(),
      DateEnd: getEndDate()
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ProductionOrderLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.Sample.ProductName = item.Product;
      this.Sample.ProductID = item.ProductID;
      this.Sample.Batch = item.ProductionBatch;
      this.Sample.ProductDate = item.DateStart;
      this.Sample.ProductOrder = item.ProductionOrderIDBFO;
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.Product.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    toggleUpload(file) {
      console.log(file);
      this.clusterImg = !this.clusterImg;
    },
    change(val) {
      console.log(val);
    },
    uploadFirebase(file, fileList) {
      if (this.Sample.SampleName) {
        this.Image.push(file.file.name);
        var uploadTask = storage
          .ref()
          .child(this.Sample.SampleName + "/imgsample")
          .put(file.file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            // switch (snapshot.state) {
            //   case storage.TaskState.PAUSED: // or 'paused'
            //     console.log('Upload is paused');
            //     break;
            //   case storage.TaskState.RUNNING: // or 'running'
            //     console.log('Upload is running');
            //     break;
            // }
          },
          function(error) {},
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
              });
          }
        );
        console.log(this.Image);
      }
    },
    addSample(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (!this.sample) {
            this.$refs.uploadFile.submit();
            console.log(this.Image);
            if (this.Image) {
              var _this = this;
              _this.Image.forEach(element => {
                _this.Sample.SampleImg += element + ";";
              });
            }
            let date = new Date();
            let v =
              Math.random()
                .toString(36)
                .substring(2) + Date.now().toString(36);
            db.ref("/SampleList/" + v.toString(16)).set(
              {
                SampleID: v,
                SampleName: this.Sample.SampleName,
                ProductName: this.Sample.ProductName,
                ProductID: this.Sample.ProductID,
                Batch: this.Sample.Batch,
                SampleCount: this.SampleCount,
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
          } else {
            let date = new Date();
            db.ref("/SampleList/" + this.Sample.SampleID).update(
              {
                SampleID: this.Sample.SampleID,
                SampleName: this.Sample.SampleName,
                ProductName: this.Sample.ProductName,
                ProductID: this.Sample.ProductID,
                Batch: this.Sample.Batch,
                TypeSample: this.Sample.TypeSample,
                ProductOrder: this.Sample.ProductOrder,
                Time: this.Sample.Time,
                ProductDate: this.Sample.ProductDate.toLocaleString(),
                Condition: this.Sample.Condition,
                Original: this.Sample.Original,
                Creator: this.Sample.Creator,
                Updater: Cookies.get("idEmployee"),
                TimeUpdate: date.toLocaleString(),
                Status: 2,
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
              message: "Chỉnh sửa thành công",
              type: "success"
            });
            this.$emit("SampleUpdated");
          }
        } else {
          return false;
        }
      });
    },
    initForm() {
      if (this.sample) {
        (this.Sample.ProductID = this.sample.ProductID),
          (this.Sample.Batch = this.sample.Location_Code),
          (this.Sample.ProductOrder = this.sample.External_Document_No_),
          (this.Sample.ProductName = this.sample.Description);
      } else {
        this.Sample = {
          SampleID: "",
          SampleName: "",
          ProductName: "",
          ProductID: "",
          Batch: "",
          Time: "",
          TypeSample: "",
          ProductDate: "",
          ProductOrder: "",
          Condition: "",
          Original: "",
          Creator: "",
          TimeCreate: "",
          Status: "",
          SampleImg: "",
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
    sample() {
      this.initForm();
    }
  },
  created() {
    console.log(this.sample);
    this.initForm();
    var req = {
      token: this.Token,
      DateStart: this.DateStart,
      DateEnd: this.DateEnd,
      Search: ""
    };
    GetProductionOrder(req).then(res => {
      if (res.RespCode == 0) {
        this.ProductionOrderLst = res.ProductionOrderLst;
      }
    });
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
