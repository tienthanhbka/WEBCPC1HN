<template>
  <div>
    <el-form
      ref="formFeedback"
      label-position="top"
      size="small"
      :model="FeedbackProduct"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-input
              v-model="FeedbackProduct.ProductName"
              class="selectIDGroup"
              style="width:100"
              type="textarea"
              autosize
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Loại phản hồi" prop="FeedbackType">
            <el-select
              class="selectIDGroup"
              v-model="FeedbackProduct.FeedbackType"
              placeholder="--Chọn loại phản hồi--"
              style="width:100%"
              @change="changeFeedbackType"
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
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="Mô tả" prop="Description">
            <el-input
              v-model="FeedbackProduct.Description"
              placeholder="Nhập mô tả..."
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
          <el-form-item
            label="Tần suất gặp lỗi"
            prop="Frequency"
            v-if="Role == 0"
          >
            <el-input
              v-model="FeedbackProduct.Frequency"
              class="selectIDGroup"
              style="width:100"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Hình ảnh lỗi" v-if="Role == 0">
            <el-upload
              class="upload-demo"
              ref="uploadFile"
              :http-request="uploadFirebase"
              :auto-upload="false"
              :file-list="fileList"
            >
              <el-button size="small" type="info" plain>Chọn tệp</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item
            label="Số lô sản phẩm lỗi"
            prop="BatchError"
            v-if="Role == 0"
          >
            <el-input
              v-model="FeedbackProduct.BatchError"
              class="selectIDGroup"
              style="width:100"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Hình ảnh lô SP lỗi" v-if="Role == 0">
            <el-upload
              class="upload-demo"
              ref="uploadFile"
              :http-request="uploadFirebase"
              :auto-upload="false"
              :file-list="fileList"
            >
              <el-button size="small" type="info" plain>Chọn tệp</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="Ghi chú">
            <el-input
              v-model="Product.Note"
              placeholder="Nhập ghi chú"
              class="selectIDGroup"
              style="width:100%"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              v-model="FeedbackProduct.Creator"
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
              v-model="FeedbackProduct.TimeCreate"
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
            @click="cancelup('formFeedback')"
            icon="el-icon-circle-close"
            >Hủy</el-button
          >
          <el-button
            icon="fas fa-plus"
            style="background-color:#02bc77;color:white;"
            @click="Feedback('formFeedback')"
          >
            Gửi phản hồi</el-button
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
  props: ["product", "index"],
  components: {},
  computed: {},
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      fileLst: [],
      Role: 1,
      ActiveElement: [],
      rules: {
        ProductName: [
          {
            required: true,
            message: "Bạn chưa chọn sản phẩm",
            trigger: "change"
          }
        ],
        FeedbackType: [
          {
            required: true,
            message: "Hãy chọn loại phản hồi",
            trigger: "change"
          }
        ],
        Description: [
          {
            required: true,
            message: "Hãy nhập mô tả phản hồi",
            trigger: "change"
          }
        ],
        Frequency: [
          {
            required: true,
            message: "Hãy nhập tần suất gặp lỗi",
            trigger: "change"
          }
        ],
        BatchErr: [
          {
            required: true,
            message: "Hãy nhập số lô sản phẩm lỗi",
            trigger: "change"
          }
        ]
      },
      TypeLst: [
        {
          value: 1,
          label: "Tích cực"
        },
        {
          value: 0,
          label: "Báo lỗi"
        }
      ],
      FeedbackProduct: {
        RowID: "",
        ProductName: "",
        FeedbackType: "",
        Description: "",
        Frequency: "",
        ImageErr: "",
        BatchErr: "",
        BatchImage: "",
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: ""
      },
      file: "",
      Token: Cookies.get("token"),
      UserID: Cookies.get("idEmployee"),
      DateStart: getStartDate(),
      DateEnd: getEndDate()
    };
  },
  methods: {
    change(val) {},
    uploadFirebase(file, fileList) {
      if (this.Product.ProductName) {
        this.Image.push(file.file.name);
        var uploadTask = storage
          .ref()
          .child(this.Product.ProductName + "/imgProduct")
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
    Feedback(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          let date = new Date();
          // let v =
          //   Math.random()
          //     .toString(36)
          //     .substring(2) + Date.now().toString(36);
          // db.ref("/FeedbackProduct/" + this.FeedbackProduct.RowID).set(
          //   {
          //     StatusProduct: 1
          //   },
          //   function(error) {
          //     if (error) {
          //       console.log(error);
          //     } else {
          //       console.log("tạo mẫu thành công");
          //     }
          //   }
          // );
          // db.ref("/FeedbackProduct/" + this.FeedbackProduct.RowID).set(
          //   {
          //     ProductName: this.Product.ProductName,
          //     Status: 1
          //   },
          //   function(err) {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log("oke");
          //     }
          //   }
          // );

          db.ref("/FeedbackProduct/" + this.FeedbackProduct.RowID).set(
            {
              RowID: this.FeedbackProduct.RowID,
              ProductName: this.FeedbackProduct.ProductName,
              FeedbackType: this.FeedbackProduct.FeedbackType,
              Description: this.FeedbackProduct.Description,
              Frequency: this.FeedbackProduct.Frequency,
              ImageErr: this.FeedbackProduct.ImageErr,
              BatchErr: this.FeedbackProduct.BatchErr,
              BatchImage: this.FeedbackProduct.BatchImage,
              Creator: Cookies.get("name"),
              TimeCreate: new Date().toLocaleString(),
              Status: 1
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("phản hồi thành công");
              }
            }
          );
          this.$message({
            message: "Tạo mẫu thành công",
            type: "success"
          });
          this.$emit("FeedbackAdded");
          this.$refs[re].resetFields();
        } else {
          return false;
        }
      });
    },
    changeFeedbackType(val) {
      if (val == 1) {
        this.Role = 1;
      } else if (val == 0) {
        this.Role = 0;
      }
    },
    initForm() {
      if (this.product) {
        this.FeedbackProduct.RowID = this.product.RowID;
        this.FeedbackProduct.ProductName = this.product.Content;
      } else {
        this.$message({
          message: "Vui lòng chọn sản phẩm để gửi phản hồi",
          type: "error"
        });
      }
    },
    cancelup(re) {
      this.$refs[re].resetFields();
      this.$emit("cancel");
    }
  },
  mounted() {},
  watch: {
    product() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  }
};
</script>
<style>
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
