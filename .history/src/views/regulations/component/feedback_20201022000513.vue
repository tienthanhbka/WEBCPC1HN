<template>
  <div>
    <el-form
      ref="formFeedback"
      label-position="top"
      size="small"
      :model="ResponseProductInfo"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-input
              v-model="ResponseProductInfo.ProductName"
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
          <el-form-item label="Loại phản hồi" prop="TypeRes">
            <el-select
              class="selectIDGroup"
              v-model="ResponseProductInfo.TypeRes"
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
              v-model="ResponseProductInfo.Description"
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
                prop="FrequencyError"
                v-if="Role"
              >
                <el-input
                  v-model="ResponseProductInfo.FrequencyError"
                  class="selectIDGroup"
                  style="width:100"
                  placeholder="Nhập tần suất gặp lỗi..."
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hình ảnh lỗi (nếu có)" v-if="Role">
                <el-upload
                  ref="uploadFile1"
                  :action="uploadFile1"
                  :on-change="onFileChange"
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
                prop="LotCode"
                v-if="Role"
              >
                <el-input
                  v-model="ResponseProductInfo.LotCode"
                  class="selectIDGroup"
                  style="width:100"
                  placeholder="Nhập số lô sản phẩm gặp lỗi..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hình ảnh lô SP lỗi (nếu có)" v-if="Role">
                <el-upload
                  ref="uploadFile2"
                  :action="uploadFile2"
                  :on-change="onFileChange"
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
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              v-model="ResponseProductInfo.Creator"
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
              v-model="ResponseProductInfo.TimeCreate"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
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
import { CreateResponseProduct } from "@/api/product";
import { db, storage } from "./firebase";
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
        TypeRes: [
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
        FrequencyError: [
          {
            required: true,
            message: "Hãy nhập tần suất gặp lỗi",
            trigger: "change"
          }
        ],
        LotCode: [
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
      ResponseProductInfo: {
        RowID: "",
        DocumentID: "",
        ProductName: "",
        TypeRes: "",
        Description: "",
        FrequencyError: "",
        Image: "",
        LotCode: "",
        ImageLotCode: "",
        Status: ""
      },
      file: "",
      Token: Cookies.get("token"),
      UserID: Cookies.get("idEmployee"),
      DateStart: getStartDate(),
      DateEnd: getEndDate()
    };
  },
  computed: {
    uploadFile1: {
      get() {
        return (
          "https://icpc1hn.work/QLTS/File/UploadProductError?RowID=" +
          this.ResponseProductInfo.RowID +
          "&Token=" +
          this.Token +
          "&UserName=" +
          this.UserID
        );
      },
      set() {}
    },
    uploadFile2: {
      get() {
        return (
          "https://icpc1hn.work/QLTS/File/UploadLotProductError?RowID=" +
          this.ResponseProductInfo.RowID +
          "&Token=" +
          this.Token +
          "&UserName=" +
          this.UserID
        );
      },
      set() {}
    }
  },

  methods: {
    // uploadFirebase1(file, fileList) {
    //   if (this.ResponseProductInfo.RowID) {
    //     let _this = this;
    //     let v =
    //       Math.random()
    //         .toString(36)
    //         .substring(2) + Date.now().toString(36);
    //     this.ResponseProductInfo.Image = file.file.name;
    //     var uploadTask = storage
    //       .ref()
    //       .child(
    //         "/ResponseProductInfo/" +
    //           this.ResponseProductInfo.RowID +
    //           "/" +
    //           v +
    //           "/Image1"
    //       )
    //       .put(file.file);
    //     uploadTask.on(
    //       "state_changed",
    //       function(snapshot) {
    //         var progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       },
    //       function(error) {},
    //       function() {
    //         uploadTask.snapshot.ref
    //           .getDownloadURL()
    //           .then(function(downloadURL) {
    //             _this.ResponseProductInfo.LinkImage = downloadURL;
    //           });
    //       }
    //     );
    //   }
    // },
    // uploadFirebase2(file, fileList) {
    //   if (this.ResponseProductInfo.RowID) {
    //     let v =
    //       Math.random()
    //         .toString(36)
    //         .substring(2) + Date.now().toString(36);
    //     this.ResponseProductInfo.ImageLotCode = file.file.name;
    //     let _this = this;
    //     var uploadTask = storage
    //       .ref()
    //       .child(
    //         "/ResponseProductInfo/" +
    //           this.ResponseProductInfo.RowID +
    //           "/" +
    //           v +
    //           "/Image2"
    //       )
    //       .put(file.file);
    //     uploadTask.on(
    //       "state_changed",
    //       function(snapshot) {
    //         var progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       },
    //       function(error) {},
    //       function() {
    //         uploadTask.snapshot.ref
    //           .getDownloadURL()
    //           .then(function(downloadURL) {
    //             _this.ResponseProductInfo.LinkImageLotCode = downloadURL;
    //           });
    //       }
    //     );
    //   }
    // },
    Feedback(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          const req = {
            Token: this.Token,
            UserName: this.UserID,
            ResponseProductInfo: this.ResponseProductInfo
          };
          CreateResponseProduct(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Gửi phản hồi thành công",
                type: "success"
              });
              this.$refs.uploadFile1.submit();
              setTimeout(() => {
                this.$refs.uploadFile2.submit();
              }, 500);

              this.$emit("FeedbackAdded");
            } else {
              this.$message({
                message: res.RespText,
                type: "error"
              });
            }
          });
          // let date = new Date();
          // let v =
          //   Math.random()
          //     .toString(36)
          //     .substring(2) + Date.now().toString(36);
          // db.ref("/ResponseProductInfo/" + this.ResponseProductInfo.RowID).set(
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
          // db.ref("/ResponseProductInfo/" + this.ResponseProductInfo.RowID).set(
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
          //     if (this.$refs.uploadFile1) {
          //       this.$refs.uploadFile1.submit();
          //     }
          //     if (this.$refs.uploadFile2) {
          //       this.$refs.uploadFile2.submit();
          //     }
          //     setTimeout(() => {
          //       db.ref(
          //         "/ResponseProductInfo/" + this.ResponseProductInfo.RowID + "/" + v
          //       ).set(
          //         {
          //           RowID: this.ResponseProductInfo.RowID,
          //           ProductName: this.ResponseProductInfo.ProductName,
          //           TypeRes: this.ResponseProductInfo.TypeRes,
          //           Description: this.ResponseProductInfo.Description,
          //           FrequencyError: this.ResponseProductInfo.FrequencyError,
          //           Image: this.ResponseProductInfo.Image,
          //           LinkImage: this.ResponseProductInfo.LinkImage,
          //           LinkImageLotCode: this.ResponseProductInfo.LinkImageLotCode,
          //           LotCode: this.ResponseProductInfo.LotCode,
          //           ImageLotCode: this.ResponseProductInfo.ImageLotCode,
          //           Creator: Cookies.get("name"),
          //           CreaterID: Cookies.get("employeeCode"),
          //           ID: Cookies.get("idEmployee"),
          //           TimeCreate: new Date().toLocaleString(),
          //           Status: 1
          //         },
          //         function(error) {
          //           if (error) {
          //           } else {
          //           }
          //         }
          //       );
          //       this.ResponseProductInfo.LinkImage = "";
          //       this.ResponseProductInfo.LinkImageLotCode = "";
          //       this.$refs[re].resetFields();
          //       this.fileList = [];
          //     }, 5000);

          //     this.$message({
          //       message: "Gửi phản hồi thành công",
          //       type: "success"
          //     });
          //     this.$emit("FeedbackAdded");
          //   } else {
          //     return false;
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
        this.ResponseProductInfo.RowID = this.product.RowID;
        this.ResponseProductInfo.ProductName = this.product.Content;
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
    },
    onFileChange(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("File không được quá 1MB!");
        this.fileList = [];
      } else {
        return isLt1M;
      }
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
