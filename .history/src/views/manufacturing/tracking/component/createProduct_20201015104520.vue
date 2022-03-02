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
      <el-form-item label="Sản phẩm">
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
      <el-form-item label="Hạn dùng">
        <el-input
          v-model="Product.Expired"
          class="selectIDGroup"
          style="width:100"
          placeholder="Nhập hạn dùng..."
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
      <el-card>
        <div slot="header" class="clearfix">
          <span style="color:#02bc77;font-size:10pt;font-weight:700;"
            ><i class="fas fa-clipboard-list"></i> Danh sách chỉ tiêu</span
          >
        </div>
        <el-form
          ref="form2"
          label-position="left"
          size="small"
          :model="form2"
          :rules="rulesForm2"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Điều kiện lưu" prop="condition">
                <el-select
                  class="selectIDGroup"
                  v-model="form2.Condition"
                  placeholder="--Chọn điều kiện lưu--"
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
              <el-form-item label="Số lượng" prop="Quantity">
                <el-input
                  v-model="form2.Quantity"
                  style="width:100%"
                  class="selectIDGroup"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="NCV phụ trách">
            <el-select
              v-model="Researcher"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="-- NCV phụ trách --"
              class="selectIDGroup"
              style="width:100%;"
            >
              <el-option
                v-for="item in ResearcherLst"
                :key="item.idEmployee"
                :label="item.nameEmployee"
                :value="item.nameEmployee"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:center;">
          <el-button
            icon="el-icon-plus"
            @click="addIndex"
            size="mini"
            style="background-color:#02bc77;color:#fff;"
            >THÊM</el-button
          >
        </div>
      </el-card>
      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="form2Lst">
              <el-table-column label="Điều kiện lưu" width="180">
                <template slot-scope="scope">
                  {{ scope.row.Condition }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng" width="100">
                <template slot-scope="scope">
                  {{ scope.row.Quantity }}
                </template>
              </el-table-column>
              <el-table-column label="NCV">
                <template slot-scope="scope">
                  {{ scope.row.Researcher }}
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
      <!-- <el-row :gutter="20">
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
      </el-row> -->
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
      lines: [],
      Researcher: [],
      ResearcherLst: [],
      ActiveElement: [],
      form2: {
        Condition: "",
        Quantity: "",
        Researcher: ""
      },
      form2Lst: [],
      rulesForm2: {
        Condition: [
          {
            required: true,
            message: "Hãy chọn điều kiện lưu",
            trigger: "change"
          }
        ],
        Quantity: [
          {
            required: true,
            message: "Hãy nhập số lượng",
            trigger: "change"
          }
        ],
        Researcher: [
          {
            required: true,
            message: "Hãy chọn NCV phụ trách",
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
        ProductName: "",
        Expired: "",
        LinkInfo: "",
        ProductLineLst: [],
        Creator: Cookies.get("name"),
        TimeCreate: new Date().toLocaleString(),
        Status: "",
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
    addIndex() {
      this.Researcher.forEach(item => {
        if (this.form2.Researcher == "") {
          this.form2.Researcher = item;
        } else {
          this.form2.Researcher += "," + item;
        }
      });
      this.$refs.form2.validate(valid => {
        if (valid) {
          this.form2Lst.push({
            Condition: this.form2.Condition,
            Quantity: this.form2.Quantity,
            Researcher: this.form2.Researcher
          });
          this.$refs.form2.resetFields();
          this.Researcher = [];
        }
      });
    },
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
          db.ref("ProductInfoList/" + this.Product.ProductName).set(
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

          db.ref("/ProductInfoList/" + v.toString(16)).set(
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
      // let a = Math.floor(Math.random() * 10001);
      // if (val == "Lưu thường") {
      //   this.Product.ProductName = "SXT" + a;
      // } else if (val == "Lão hóa") {
      //   this.Product.ProductName = "SXL" + a;
      // } else if (val == "Tủ lạnh") {
      //   this.Product.ProductName = "SXTL" + a;
      // } else {
      //   this.Product.ProductName = "SXBB" + a;
      // }
    },
    fetchNCV() {
      this.loading = true;
      let a = [];
      db.ref("NCV/Data").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.loading = false;
      this.ResearcherLst = a;
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
    this.fetchNCV();
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
