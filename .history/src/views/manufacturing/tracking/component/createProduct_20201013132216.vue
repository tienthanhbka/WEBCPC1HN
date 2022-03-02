<template>
  <div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="Product"
      :rules="rules"
      label-width="160px"
    >
      <el-form-item label="Sản phẩm" prop="ProductName">
        <el-select
          class="selectIDGroup"
          v-model="Product.ProductName"
          placeholder="--Chọn sản phẩm--"
          style="width:100%"
          @change="changeTypeProduct"
        >
          <el-option
            v-for="item in ProductLst"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hạn dùng" prop="ProductName">
        <el-input
          v-model="Product.Expired"
          class="selectIDGroup"
          style="width:100"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Thông tin sản phẩm">
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

      <el-row :gutter="20">
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
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              v-model="Product.Creator"
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
              v-model="Product.TimeCreate"
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
            @click="addProduct('form')"
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
import line from "./line";
import { db, storage } from "./firebase";
import { GetProductionOrder } from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  props: ["Product", "index"],
  components: { line },
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
        ProductName: [
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
        TypeProduct: [
          {
            required: true,
            message: "Hãy chọn loại mẫu",
            trigger: "change"
          }
        ],
        ProductCount: [
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
      ProductLst: [
        {
          value: "1",
          label: "Fogyma - H20"
        },
        {
          value: "2",
          label: "Bixazol - 4 vỉ x 5 ống 10ml"
        },
        {
          value: "3",
          label: "Golistin-enema "
        },
        {
          value: "4",
          label: "Dexamoxi - Hộp 4 vỉ x 5 ống 0,4ml"
        },
        {
          value: "5",
          label: "Viên đặt pH.Balance - Hộp 1 vỉ 7 viên "
        },
        {
          value: "6",
          label: "Novosmart drops - Hộp 1 lọ 20ml "
        },
        {
          value: "7",
          label: "Dexibufen softcap - Hộp 2 vỉ x 15 viên "
        },
        {
          value: "8",
          label: "Beejuvit ăn ngon - Hộp 4 vỉ x 5 ống 10ml"
        },
        {
          value: "9",
          label: "Nguyên liệu lỏng Bacillus Subtilis (Cô Đặc)"
        },
        {
          value: "10",
          label: "Trinolon - Hộp 1 tuýp 10g "
        },
        {
          value: "11",
          label: "Duvita 8ml "
        },
        {
          value: "12",
          label: "Ulcogen 800mg "
        },
        {
          value: "13",
          label: "Gel VNP nhiệt miệng - Hộp 1 tuýp 10g "
        },
        {
          value: "14",
          label: "Sleepy - Hộp 2 vỉ x 5 ống 5ml (Cambodia) "
        },
        {
          value: "15",
          label: "SIX.am - 4 vỉ x 5 ống 5ml "
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
      Product: {
        ProductID: "",
        ProductName: "",
        ProductName: "",
        ProductID: "",
        Batch: "",
        StartingDate: "",
        ProductOrder: "",
        ProductDate: "",
        Condition: "",
        Original: "",
        ProductCount: "",
        Time: "",
        TypeProduct: "",
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: "",
        ProductImg: "",
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
      this.Product.ProductName = item.Product;
      this.Product.ProductID = item.ProductID;
      this.Product.Batch = item.ProductionBatch;
      this.Product.ProductDate = item.DateStart;
      this.Product.ProductOrder = item.ProductionOrderIDBFO;
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
    handleRemove(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    toggleUpload(file) {
      this.clusterImg = !this.clusterImg;
    },
    change(val) {},
    // uploadFirebase(file, fileList) {
    //   if (this.Product.ProductName) {
    //     this.Image.push(file.file.name);
    //     var uploadTask = storage
    //       .ref()
    //       .child(this.Product.ProductName + "/imgProduct")
    //       .put(file.file);
    //     uploadTask.on(
    //       "state_changed",
    //       function(snapshot) {
    //         var progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         // switch (snapshot.state) {
    //         //   case storage.TaskState.PAUSED: // or 'paused'
    //         //     console.log('Upload is paused');
    //         //     break;
    //         //   case storage.TaskState.RUNNING: // or 'running'
    //         //     console.log('Upload is running');
    //         //     break;
    //         // }
    //       },
    //       function(error) {},
    //       function() {
    //         uploadTask.snapshot.ref
    //           .getDownloadURL()
    //           .then(function(downloadURL) {
    //             console.log("File available at", downloadURL);
    //           });
    //       }
    //     );
    //     console.log(this.Image);
    //   }
    // },
    addProduct(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          let date = new Date();
          let v =
            Math.random()
              .toString(36)
              .substring(2) + Date.now().toString(36);
          db.ref("/ProductionOrderBFOLst/" + this.index).update(
            {
              StatusProduct: 1
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("tạo mẫu thành công");
              }
            }
          );
          db.ref("ProductList/" + this.Product.ProductName).set(
            {
              ProductName: this.Product.ProductName,
              Status: 1
            },
            function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("oke");
              }
            }
          );

          db.ref("/ProductList/" + v.toString(16)).set(
            {
              ProductID: v,
              ProductName: this.Product.ProductName,
              ProductName: this.Product.ProductName,
              ProductID: this.Product.ProductID,
              Batch: this.Product.Batch,
              StartingDate: this.Product.StartingDate,
              ProductCount: this.Product.ProductCount,
              TypeProduct: this.Product.TypeProduct,
              ProductOrder: this.Product.ProductOrder,
              Time: this.Product.Time.toLocaleString(),
              ProductDate: this.Product.ProductDate.toLocaleString(),
              Condition: this.Product.Condition,
              Original: this.Product.Original,
              Creator:
                "[" +
                Cookies.get("employeeCode") +
                "]" +
                "-" +
                Cookies.get("name"),
              TimeCreate: date.toLocaleString(),
              Status: 1,
              ProductImg: this.Product.ProductImg,
              Note: this.Product.Note
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
          this.$emit("ProductAdded");
          this.$refs[re].resetFields();
        } else {
          return false;
        }
      });
    },
    changeTypeProduct(val) {
      let a = Math.floor(Math.random() * 10001);
      if (val == "Lưu thường") {
        this.Product.ProductName = "SXT" + a;
      } else if (val == "Lão hóa") {
        this.Product.ProductName = "SXL" + a;
      } else if (val == "Tủ lạnh") {
        this.Product.ProductName = "SXTL" + a;
      } else {
        this.Product.ProductName = "SXBB" + a;
      }
    },
    initForm() {
      if (this.Product) {
        (this.Product.ProductID = this.Product.ProductID),
          (this.Product.Batch = this.Product.Location_Code),
          (this.Product.ProductOrder = this.Product.External_Document_No_),
          (this.Product.ProductName = this.Product.Description);
        this.Product.StartingDate = this.Product.StartingDate;
      } else {
        this.Product = {
          ProductID: "",
          ProductName: "",
          ProductName: "",
          ProductID: "",
          Batch: "",
          Time: "",
          TypeProduct: "",
          ProductDate: "",
          ProductOrder: "",
          Condition: "",
          Original: "",
          Creator: "",
          TimeCreate: "",
          Status: "",
          ProductImg: "",
          Note: ""
        };
      }
    },
    cancelup(re) {
      this.$refs[re].resetFields();
      this.$emit("cancel");
    }
  },
  mounted() {},
  watch: {
    Product() {
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
