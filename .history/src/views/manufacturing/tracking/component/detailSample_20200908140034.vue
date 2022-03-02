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
        <el-col :xs="24" :sm="7" :lg="7">
          <qrcode-vue
            id="qrcodeID"
            class="qrcode"
            style="padding:15px;"
            :value="Sample.SampleName"
            :size="150"
            level="H"
          ></qrcode-vue>
        </el-col>
        <el-col :xs="24" :sm="17" :lg="17">
          <el-form-item label="Mã mẫu" prop="SampleName">
            <el-input
              v-model="Sample.SampleName"
              class="selectIDGroup"
              placeholder="Tên mẫu..."
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-input
              v-model="Sample.ProductName"
              class="selectIDGroup"
              placeholder="Sản phẩm..."
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
          <el-form-item label="Lệnh sản xuất" prop="ProductName">
            <el-input
              v-model="Sample.ProductOrder"
              class="selectIDGroup"
              placeholder="Lệnh sản xuất..."
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ngày sản xuất" prop="ProductDate">
            <el-input
              v-model="Sample.ProductDate"
              class="selectIDGroup"
              placeholder="Ngày sản xuất..."
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Lô sản xuất" prop="Batch">
            <el-input
              v-model="Sample.Batch"
              class="selectIDGroup"
              placeholder="Nhập lô sản xuất..."
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Trạng thái ban đầu" prop="Original">
            <el-input
              v-model="Sample.Original"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập trạng thái..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Điều kiện bảo quản" prop="Condition">
            <el-input
              v-model="Sample.Condition"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập điều kiện bảo quản..."
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian theo dõi">
            <!-- <el-button size="mini" type="info" @click="uploadFile">Chọn file</el-button>
          <el-button size="mini" type="info" @click="uploadFile2">Chọn file</el-button> -->
            <el-input
              v-model="Sample.Time"
              class="selectIDGroup"
              placeholder="Thời gian theo dõi..."
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ảnh mẫu">
            <!-- <el-button size="mini" type="info" @click="uploadFile">Chọn file</el-button>
          <el-button size="mini" type="info" @click="uploadFile2">Chọn file</el-button> -->
            <!-- <el-input
              v-model="Sample.SampleImg"
              class="selectIDGroup"
              placeholder="Ảnh mẫu..."
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input> -->
            <el-link type="primary" :href="sample.UrlImg" target="_blank">{{
              Sample.SampleImg
            }}</el-link>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ghi chú" prop="Note">
            <el-input
              v-model="Sample.Note"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập ghi chú..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="padding:5px;text-align:center;">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >Đóng</el-button
          >
          <!-- <el-button type="danger" @click="getdata" icon="el-icon-circle-close"
            >test</el-button
          >
          <a class="btn btn-primary" @click="print()">
            download
          </a> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import axios from "axios";
export default {
  props: ["sample"],
  components: { QrcodeVue },
  computed: {},
  data() {
    return {
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
        ]
      },
      Sample: {
        SampleID: "",
        SampleName: "",
        ProductName: "",
        ProductID: "",
        Batch: "",
        ProductOrder: "",
        Time: "",
        ProductDate: "",
        Condition: "",
        Original: "",
        Creator: "",
        TimeCreate: "",
        Status: "",
        SampleImg: "",
        Note: ""
      }
    };
  },
  methods: {
    print() {
      // const canvas = document.getElementById("qrcodeID");
      // // console.log(canvas);
      // const pngUrl = canvas
      //   .toDataURL("image/png")
      //   .replace("image/png", "image/octet-stream");
      // console.log("pngUrl", pngUrl);
      // let downloadLink = document.createElement("a");
      // downloadLink.href = pngUrl;
      // downloadLink.download = "qr-code.png";
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
      const canvas = document
        .getElementById("qrcodeID")
        .getElementsByTagName("canvas");
      console.log(canvas);
      const pngUrl = canvas[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    initForm() {
      console.log(this.sample);
      if (this.sample) {
        (this.Sample.SampleID = this.sample.SampleID),
          (this.Sample.ProductID = this.sample.ProductID),
          (this.Sample.ProductDate = this.sample.ProductDate),
          (this.Sample.Batch = this.sample.Batch),
          (this.Sample.ProductOrder = this.sample.ProductOrder),
          (this.Sample.Time = this.sample.Time),
          (this.Sample.SampleName = this.sample.SampleName),
          (this.Sample.ProductName = this.sample.ProductName),
          (this.Sample.Creator = this.sample.Creator),
          (this.Sample.TimeCreate = this.sample.TimeCreate),
          (this.Sample.Note = this.sample.Note),
          (this.Sample.Condition = this.sample.Condition),
          (this.Sample.Original = this.sample.Original),
          (this.Sample.SampleImg = this.sample.SampleImg);
      } else {
        this.Sample = {
          SampleID: "",
          SampleName: "",
          ProductName: "",
          ProductID: "",
          Batch: "",
          ProductOrder: "",
          Time: "",
          ProductDate: "",
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
    this.initForm();
    this.getdata();
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
