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
                  v-model.number="ResponseProductInfo.FrequencyError"
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
                  :on-change="onFileChange1"
                  :auto-upload="false"
                  :file-list="fileList1"
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
                  :on-change="onFileChange2"
                  :auto-upload="false"
                  :file-list="fileList2"
                  :limit="1"
                >
                  <el-button size="small" type="info" plain>Chọn tệp</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </transition>
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
      fileList1: [],
      fileList2: [],
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
          },
          { type: "number", message: "Tần suất phải là dạng số" }
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
      DateEnd: getEndDate(),
      RowID: ""
    };
  },
  computed: {
    uploadFile1: {
      get() {
        return (
          "https://icpc1hn.work/QLTS/File/UploadProductError?RowID=" +
          this.RowID +
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
          this.RowID +
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
              this.RowID = res.RowID;
              this.$message({
                message: "Gửi phản hồi thành công",
                type: "success"
              });
              if (this.$refs.uploadFile1) {
                setTimeout(() => {
                  this.$refs.uploadFile1.submit();
                }, 0);
              }
              if (this.$refs.uploadFile2) {
                setTimeout(() => {
                  this.$refs.uploadFile2.submit();
                }, 500);
              }
              setTimeout(() => {
                this.$refs[re].resetFields();
                this.fileList1 = [];
                this.fileList2 = [];
              }, 1000);
              this.$emit("FeedbackAdded");
            } else {
              this.$message({
                message: res.RespText,
                type: "error"
              });
            }
          });
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
    onFileChange1(file) {
      this.ResponseProductInfo.Image = file.name;
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("File không được quá 1MB!");
        this.fileList1 = [];
      } else {
        return isLt1M;
      }
    },
    onFileChange2(file) {
      this.ResponseProductInfo.ImageLotCode = file.name;

      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("File không được quá 1MB!");
        this.fileList2 = [];
      } else {
        return isLt2M;
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
