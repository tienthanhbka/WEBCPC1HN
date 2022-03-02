<template>
  <div class="container1">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="200px"
      size="mini"
      :rules="rules"
    >
      <div class="border-form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="Sản phẩm" prop="ProductName">
              <el-autocomplete
                class="selectIDGroup"
                style="width:100%"
                v-model="form.ProductName"
                :fetch-suggestions="querySearch2"
                placeholder="Chọn sản phẩm..."
                @select="handleSelect"
              >
                <i
                  class="el-icon-search el-input__icon"
                  slot="suffix"
                  @click="handleIconClick2"
                >
                </i>
                <template slot-scope="{ item }">
                  <div class="value">{{ item.ProductionOrderIDBFO }}</div>
                  <span style="float: right;color: #8492a6;font-size:12px;">{{
                    item.ProductID
                  }}</span>
                  <span class="link">{{ item.Product }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="Loại kiện" prop="BoxType">
              <el-radio-group v-model="form.BoxType">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-radio :label="1">Kiện lẻ</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="0">Kiện nguyên</el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-form-item label="Số lượng" prop="BoxQuantity">
              <el-input
                v-model="form.BoxQuantity"
                placeholder="Nhập số lượng..."
                class="selectIDGroup"
              ></el-input>
            </el-form-item>
            <el-form-item label="Cỡ kiện" prop="BoxSize">
              <el-radio-group v-model="form.BoxSize">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-radio label="Nhỏ"></el-radio>
                  </el-col>
                  <el-col :span="8">
                    <el-radio label="Vừa"></el-radio>
                  </el-col>
                  <el-col :span="8">
                    <el-radio label="Lớn"></el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div style="padding:5px;text-align:right">
        <el-form-item size="large">
          <el-button class="pan-btn grey-btn" @click="cancelup">Hủy</el-button>
          <el-button
            icon="fas fa-plus"
            class="pan-btn green-btn"
            @click="onSubmit('form')"
            v-if="this.quota == null"
            >Tạo mới</el-button
          >
          <el-button
            icon="far fa-edit"
            class="pan-btn yellow-btn"
            @click="AcceptUpdate('form')"
            v-if="this.quota != null"
            >Cập nhật</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  GetProductManufacturing,
  CreateQuotaBoxFactory,
  UpdateQuotaBoxFactory
} from "@/api/reportBox";
import {
  GetProductionOrderBFO,
  GetProductionOrder
} from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
import fetch from "node-fetch";
export default {
  props: ["quota", "date"],
  data() {
    return {
      form: {
        ProductName: "",
        ProductID: "",
        BoxQuantity: "",
        BoxType: "",
        BoxSize: "",
        DocumentID: ""
      },
      ProductionOrderBFOLst: [],
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      rules: {
        ProductName: [
          {
            required: true,
            message: "Hãy nhập tên sản phẩm",
            trigger: "change"
          }
        ],
        BoxType: [
          {
            required: true,
            message: "Hãy nhập loại kiện",
            trigger: "change"
          }
        ],
        BoxSize: [
          {
            required: true,
            message: "Hãy chọn kích cỡ",
            trigger: "change"
          }
        ],
        BoxQuantity: [
          {
            required: true,
            message: "Hãy nhập số lượng",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ProductionOrderBFOLst.reverse();
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.ProductName = item.Product;
      this.form.ProductID = item.ProductID;
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.Product.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        var req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          QuotaBoxInfo: this.form
        };
        if (valid) {
          CreateQuotaBoxFactory(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Tạo định mức thành công",
                type: "success"
              });
              this.$emit("quotaAdded", this.form);
            }
            this.closeModal();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    AcceptUpdate(form) {
      this.$refs[form].validate(valid => {
        var req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          QuotaBoxInfo: this.form
        };
        if (valid) {
          UpdateQuotaBoxFactory(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Chỉnh sửa định mức thành công",
                type: "success"
              });
              this.$emit("quotaUpdated", this.form);
            }
            this.closeModal();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelup() {
      this.$emit("Cancel");
    },
    initForm() {
      if (this.quota) {
        this.form.ProductName = this.quota.ProductName;
        this.form.BoxQuantity = this.quota.BoxQuantity;
        this.form.BoxType = this.quota.BoxType;
        this.form.BoxSize = this.quota.BoxSize;
        this.form.ProductID = this.quota.ProductID;
        this.form.DocumentID = this.quota.DocumentID;
      } else {
        this.form.ProductName = null;
        this.form.ProductID = null;
        this.form.BoxQuantity = null;
        this.form.BoxType = null;
        this.form.BoxSize = null;
      }
    },
    fetchProduct() {
      var req = {
        token: Cookies.get("token"),
        DateStart: this.TimeStart,
        DateEnd: this.date,
        Search: ""
      };
      GetProductionOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderBFOLst = res.ProductionOrderLst;
        }
      });
    }
  },
  watch: {
    quota() {
      this.initForm();
    },
    date() {
      this.fetchProduct();
    }
  },
  created() {
    this.initForm();
    this.fetchProduct();
  }
};
</script>

<style>
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
