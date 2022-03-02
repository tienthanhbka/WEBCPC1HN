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
                :value="item.value"
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
      <transition name="el-zoom-in-center">
        <div v-show="Role">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item
                label="Tần suất gặp lỗi"
                prop="Frequency"
                v-if="Role"
              >
                <el-input
                  v-model="FeedbackProduct.Frequency"
                  class="selectIDGroup"
                  style="width:100"
                  placeholder="Nhập tần suất gặp lỗi..."
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hình ảnh lỗi" v-if="Role">
                <el-upload
                  ref="uploadFile1"
                  action=""
                  :http-request="uploadFirebase1"
                  :auto-upload="false"
                  :file-list="fileList"
                  :limit="1"
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
                v-if="Role"
              >
                <el-input
                  v-model="FeedbackProduct.BatchError"
                  class="selectIDGroup"
                  style="width:100"
                  placeholder="Nhập số lô sản phẩm gặp lỗi..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hình ảnh lô SP lỗi" v-if="Role">
                <el-upload
                  ref="uploadFile2"
                  action=""
                  :http-request="uploadFirebase2"
                  :auto-upload="false"
                  :file-list="fileList"
                  :limit="1"
                >
                  <el-button size="small" type="info" plain>Chọn tệp</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </transition>
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
      <div style="padding:5px;text-align:center;">
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
import { setTimeout } from "timers";
export default {
  props: ["product", "index"],
  components: {},
  computed: {},
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      Role: true,
      LinkImage: "",
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
        BatchError: [
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
        BatchError: "",
        BatchImage: "",
        Creator: Cookies.get("name"),
        CreaterID: Cookies.get("employeeCode"),
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
    uploadFirebase1(file, fileList) {
      if (this.FeedbackProduct.RowID) {
        this.FeedbackProduct.ImageErr = file.file.name;
        var uploadTask = storage
          .ref()
          .child("/FeedbackProduct/" + this.FeedbackProduct.RowID + "/Image1")
          .put(file.file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          function(error) {},
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                this.LinkImage = downloadURL;
              });
          }
        );
      }
    },
    uploadFirebase2(file, fileList) {
      if (this.FeedbackProduct.RowID) {
        this.FeedbackProduct.BatchImage = file.file.name;
        var uploadTask = storage
          .ref()
          .child("/FeedbackProduct/" + this.FeedbackProduct.RowID + "/Image2")
          .put(file.file);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          function(error) {},
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {});
          }
        );
      }
    },
    Feedback(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          let date = new Date();
          let v =
            Math.random()
              .toString(36)
              .substring(2) + Date.now().toString(36);
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
          if (this.$refs.uploadFile1) {
            this.$refs.uploadFile1.submit();
          }
          if (this.$refs.uploadFile2) {
            this.$refs.uploadFile2.submit();
          }
          setTimeout(() => {
            console.log(this.LinkImage);
          }, 1000);
          setTimeout(() => {
            db.ref(
              "/FeedbackProduct/" + this.FeedbackProduct.RowID + "/" + v
            ).set(
              {
                RowID: this.FeedbackProduct.RowID,
                ProductName: this.FeedbackProduct.ProductName,
                FeedbackType: this.FeedbackProduct.FeedbackType,
                Description: this.FeedbackProduct.Description,
                Frequency: this.FeedbackProduct.Frequency,
                ImageErr: this.FeedbackProduct.ImageErr,
                BatchError: this.FeedbackProduct.BatchError,
                BatchImage: this.FeedbackProduct.BatchImage,
                Creator: Cookies.get("name"),
                CreaterID: Cookies.get("employeeCode"),
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
          }, 1000);

          this.$message({
            message: "Gửi phản hồi thành công",
            type: "success"
          });

          this.$emit("FeedbackAdded");
          this.$refs[re].resetFields();
          this.fileList = [];
        } else {
          return false;
        }
      });
    },
    changeFeedbackType(val) {
      if (val == 1) {
        this.Role = false;
      } else if (val == 0) {
        this.Role = true;
      }
    },
    initForm() {
      if (this.product) {
        this.FeedbackProduct.RowID = this.product.RowID;
        this.FeedbackProduct.ProductName = this.product.Content;
        this.fileList = [];
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
