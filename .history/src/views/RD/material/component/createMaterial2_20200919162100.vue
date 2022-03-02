<template>
  <div>
    <modal id="new-material-modal" ref="new-material-modal" v-cloak>
      <span slot="title" style="color: #02bc77;font-size:20pt;font-weight:700;"
        ><i class="el-icon-circle-plus-outline"></i>
        &#32;&#32;Tạo nguyên liệu
      </span>
      <div slot="body">
        <el-form
          ref="form"
          label-position="left"
          size="small"
          :model="form"
          :rules="rules"
          label-width="150px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Tên nguyên liệu" prop="MaterialName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.MaterialName"
                  style="width:100%"
                  placeholder="Nhập tên nguyên liệu..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>

              <el-form-item label="Loại nguyên liệu" prop="TypeMaterial">
                <el-select
                  v-model="form.TypeMaterial"
                  placeholder="Chọn loại nguyên liệu..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in MaterialTypeLst"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Tên thương mại" prop="CommerceName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.CommerceName"
                  style="width:100%"
                  placeholder="Nhập tên thương mại..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Giải thích" prop="DesIdentify">
                <el-input
                  class="selectIDGroup"
                  v-model="form.DesIdentify"
                  style="width:100%"
                  placeholder="Nhập giải thích..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Mã nguyên liệu" prop="MaterialId">
                <el-input
                  class="selectIDGroup"
                  v-model="form.MaterialId"
                  style="width:100%"
                  placeholder="Nhập mã nguyên liệu..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Hoạt chất" prop="ActiveElement">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.ActiveElement"
                  :fetch-suggestions="querySearch2"
                  placeholder="Gõ gợi ý và chọn"
                  @select="handleSelect2"
                >
                  <template slot-scope="{ item }">
                    <div class="idGroup">{{ item.ActiveElement }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Nhà cung cấp" prop="SupplierId">
                <el-select
                  v-model="form.SupplierId"
                  placeholder="Chọn nhà cung cấp..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in SupplierLst"
                    :key="item.SupplierId"
                    :label="item.SupplierName"
                    :value="item.SupplierId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Ghi chú" prop="Note">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Note"
                  style="width:100%"
                  placeholder="Nhập ghi chú..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"> </el-col>
          </el-row>
        </el-form>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addMaterial('form')"
          >Xác nhận</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { CreateMaterial } from "@/api/material";
import { GetSupplierLst } from "@/api/RDSupplier";
import { GetActiveElement } from "@/api/defaultRD";
import Cookies from "js-cookie";
export default {
  components: {},
  data() {
    return {
      EmployeeTypeLst: [],
      rules: {
        MaterialName: [
          {
            required: true,
            message: "Hãy nhập tên nguyên liệu",
            trigger: "change"
          }
        ],
        TypeMaterial: [
          {
            required: true,
            message: "Hãy chọn loại nguyên liệu",
            trigger: "change"
          }
        ],
        ActiveElement: [
          {
            required: true,
            message: "Hãy chọn hoạt chất",
            trigger: "change"
          }
        ],
        SupplierId: [
          {
            required: true,
            message: "Hãy chọn nhà cung cấp",
            trigger: "change"
          }
        ],
        CommerceName: [
          {
            required: true,
            message: "Hãy nhập tên thương mại",
            trigger: "change"
          }
        ],
        MaterialId: [
          {
            required: true,
            message: "Hãy nhập mã nguyên liệu",
            trigger: "change"
          }
        ]
      },
      MaterialTypeLst: [
        {
          value: "1",
          label: "Tá dược"
        },
        {
          value: "0",
          label: "Hoạt chất"
        }
      ],
      SupplierLst: [],
      ActiveElementLst: [],
      form: {
        MaterialId: "",
        MaterialName: "",
        CommerceName: "",
        ActiveElement: "",
        DesIdentify: "",
        SupplierId: "",
        Note: "",
        TypeMaterial: ""
      }
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ActiveElementLst;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect2(item) {
      this.form.ActiveElement = item.ActiveElement;
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.ActiveElement.toLowerCase().includes(
            queryString.toLowerCase()
          ) === 0
        );
      };
    },
    addMaterial(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          var req = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            MaterialInfo: this.form
          };
          CreateMaterial(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: " Tạo nguyên liệu thành công",
                type: "success"
              });
              this.$emit("materialAdded");
              this.closeModal();
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-material-modal");
    },
    changeEvaluate(value) {},
    fetchData() {
      GetActiveElement({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        Search: ""
      }).then(res => {
        if (res.RespCode == 0) {
          this.ActiveElementLst = res.ActiveElementLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
      GetSupplierLst({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        SupplierName: ""
      }).then(res => {
        if (res.RespCode == 0) {
          this.SupplierLst = res.SupplierLst;
        }
      });
    },
    initForm() {
      this.form.MaterialId = null;
      this.form.MaterialName = null;
      this.form.CommerceName = null;
      this.form.ActiveElement = null;
      this.form.DesIdentify = null;
      this.form.SupplierId = null;
      this.form.Note = null;
      this.form.TypeMaterial = null;
    }
  },
  mounted() {},
  watch: {},
  created() {
    this.initForm();
    this.fetchData();
  }
};
</script>
<style>
.selectIDGroup .el-input__inner {
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box {
  width: 50%;
}
</style>
