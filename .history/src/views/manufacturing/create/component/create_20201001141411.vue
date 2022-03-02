<template>
  <div class="container1">
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="150px"
      size="mini"
      :rules="rules"
    >
      <div class="border-form">
        <el-form-item label="Lệnh sản xuất" prop="ProductionOrderIDBFO">
          <el-popover
            placement="bottom"
            width="800"
            trigger="click"
            v-model="Visible"
          >
            <product-order
              :search="Search"
              @itemSelect="itemSelect"
            ></product-order>
            <el-input
              class="selectIDGroup"
              slot="reference"
              style="width:100%"
              v-model="form.ProductionOrderIDBFO"
              placeholder="Tìm kiếm theo sản phẩm..."
              @input="ShowList"
            >
            </el-input>
          </el-popover>
          <!-- <el-autocomplete
            style="width:100%"
            popper-class="my-autocomplete"
            v-model="form.ProductionOrderIDBFO"
            :fetch-suggestions="querySearch2"
            placeholder="Chọn lệnh SX..."
            @select="handleSelect"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="value">
                {{ item.External_Document_No_ }} - {{ item.Location_Code }}
              </div>
              <span style="float: right;color: #8492a6;font-size:12px;">{{
                item.ProductID
              }}</span>
              <span class="link">{{ item.Description }}</span>
            </template>
          </el-autocomplete> -->
        </el-form-item>
        <el-form-item
          label="Sản phẩm"
          prop="Product"
          class="selectIDGroup"
          style="width:100%"
        >
          <el-input v-model="form.Product" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="Số lượng"
          prop="Quantity"
          class="selectIDGroup"
          style="width:100%"
        >
          <el-input v-model="form.Quantity" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="Lô sản xuất"
          prop="ProductionBatch"
          class="selectIDGroup"
          style="width:100%"
        >
          <el-input v-model="form.ProductionBatch"></el-input>
        </el-form-item>
        <el-form-item
          label="Bắt đầu BC"
          prop="DateStart"
          class="selectIDGroup"
          style="width:100%"
        >
          <div class="block-date-picker">
            <el-date-picker
              v-model="form.DateStart"
              type="date"
              placeholder="Từ ngày"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item
          label="Kết thúc BC"
          prop="DateEnd"
          class="selectIDGroup"
          style="width:100%"
        >
          <div class="block-date-picker">
            <el-date-picker
              v-model="form.DateEnd"
              type="date"
              placeholder="Đến ngày"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </div>
      <div style="padding:5px;text-align:right">
        <el-form-item size="large">
          <el-button type="info" @click="cancelup">Hủy</el-button>
          <el-button
            icon="fas fa-plus"
            type="success"
            v-if="this.productOrder == null"
            @click="onSubmit('form')"
            >Tạo mới</el-button
          >
          <el-button
            icon="far fa-edit"
            type="warning"
            v-if="this.productOrder != null"
            @click="onSubmit('form')"
            >Cập nhật</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  CreateProductionOrder,
  UpdateProductionOrder,
  GetProductionOrderBFO
} from "@/api/productionOrder";
import ProductOrder from "./productOrder";
import Cookies from "js-cookie";
export default {
  components: { ProductOrder },
  props: ["productOrder", "bfo"],
  data() {
    return {
      form: {
        ProductionOrderIDBFO: "",
        Product: "",
        Pack: "",
        ProductionOrderBFOLst: [],
        ProductionBatch: "",
        Quantity: "",
        DateStart: "",
        DateEnd: "",
        rowData: "",
        ProductionOrderID: ""
      },
      Search: "",
      Visible: false,

      ProductionOrderBFOLst: [],
      rules: {
        ProductionOrderIDBFO: [
          {
            required: true,
            message: "Hãy nhập lệnh sản phẩm",
            trigger: "change"
          }
        ],
        Product: [
          {
            required: true,
            message: "Hãy nhập tên sản phẩm",
            trigger: "change"
          }
        ],
        ProductionBatch: [
          {
            required: true,
            message: "Hãy nhập lô sản xuất",
            trigger: "change"
          }
        ],
        Quantity: [
          {
            required: true,
            message: "Hãy nhập dạng số lượng",
            trigger: "change"
          }
        ],
        DateStart: [
          {
            required: true,
            message: "Hãy nhập ngày bắt đầu",
            trigger: "change"
          }
        ],
        DateEnd: [
          {
            required: true,
            message: "Hãy nhập ngày kết thúc",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ProductionOrderBFOLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    onFileChange(file, fileList) {
      this.file = file;
    },
    handleEnter() {},
    handleIconClick2(ev) {},
    ShowList(val) {
      this.Visible = true;
      this.Search = val;
    },
    itemSelect(item) {
      console.log(item);
      this.Visible = false;
      this.form.ProductionOrderIDBFO = item.External_Document_No_;
      this.form.Product = item.Description;
      this.form.ProductID = item.ProductID;
      this.form.Quantity = item.Quantity;
      this.form.ProductionBatch = item.Location_Code;
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.External_Document_No_.toLowerCase().indexOf(
            queryString.toLowerCase()
          ) === 0
        );
      };
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.productOrder == null) {
            var req = {
              ProductionOrderIDBFO: this.form.ProductionOrderIDBFO,
              token: Cookies.get("token"),
              Product: this.form.Product,
              ProductID: this.form.ProductID,
              ProductionBatch: this.form.ProductionBatch,
              Quantity: this.form.Quantity,
              DateStart: Date.parse(this.form.DateStart).toString("yyyy-MM-dd"),
              DateEnd: Date.parse(this.form.DateEnd).toString("yyyy-MM-dd")
            };
            CreateProductionOrder(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: "Tạo lịch báo cáo thành công",
                  type: "success"
                });
                this.$emit("createOK");
              }
            });
          } else {
            var req = {
              token: Cookies.get("token"),
              Product: this.form.Product,
              ProductID: this.form.ProductID,
              ProductionBatch: this.form.ProductionBatch,
              Quantity: this.form.Quantity,
              DateStart: Date.parse(this.form.DateStart).toString("yyyy-MM-dd"),
              DateEnd: Date.parse(this.form.DateEnd).toString("yyyy-MM-dd"),
              ProductionOrderID: this.productOrder.ProductionOrderID
            };
            UpdateProductionOrder(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: "Cập nhật thành công",
                  type: "success"
                });
                this.productOrder.Product = this.form.Product;
                this.productOrder.ProductionBatch = this.form.ProductionBatch;
                this.productOrder.Quantity = this.form.Quantity;
                this.productOrder.DateStart = this.form.DateStart;
                this.productOrder.DateEnd = this.form.DateEnd;
                this.$emit("updateOK");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancelup() {
      this.$emit("cancelCreOK");
    },
    initForm() {
      if (this.productOrder == null) {
        this.form.ProductionOrderIDBFO = null;
        this.form.Product = null;
        this.form.ProductID = null;
        this.form.ProductionBatch = null;
        this.form.Quantity = null;
        this.form.DateStart = null;
        this.form.DateEnd = null;
      } else {
        this.form.ProductionOrderIDBFO = this.productOrder.ProductionOrderIDBFO;
        this.form.Product = this.productOrder.Product;
        this.form.ProductID = this.productOrder.ProductID;
        this.form.ProductionBatch = this.productOrder.ProductionBatch;
        this.form.Quantity = this.productOrder.Quantity;
        this.form.DateStart = this.productOrder.DateStart;
        this.form.DateEnd = this.productOrder.DateEnd;
      }
    }
  },
  watch: {
    productOrder() {
      this.initForm();
    },
    bfo() {
      this.initForm();
    }
  },
  created() {
    GetProductionOrderBFO({
      token: Cookies.get("token"),
      Search: ""
    }).then(res => {
      this.ProductionOrderBFOLst = res.ProductionOrderBFOLst;
    });
    this.initForm();
  }
};
</script>

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .link {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
.border-form {
  border-bottom: 2px solid #dcdfe6;
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
