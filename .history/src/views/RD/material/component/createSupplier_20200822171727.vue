<template>
  <div>
    <modal id="new-supplier-modal" ref="new-supplier-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-warehouse"></i>
        &#32;&#32;Tạo nhà cung cấp
      </template>
      <div slot="body">
        <el-form
          ref="form"
          label-position="top"
          size="small"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-form-item label="Tên nhà cung cấp" prop="SupplierName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.SupplierName"
                  style="width:100%"
                  placeholder="Nhập tên nhà cung cấp..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Địa chỉ" prop="Address">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Address"
                  style="width:100%"
                  placeholder="Nhập địa chỉ..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Website" prop="Website">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Website"
                  style="width:100%"
                  placeholder="Nhập địa chỉ website..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Ghi chú">
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
        </el-form>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          v-if="supplier == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addSupplier('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="supplier != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="addSupplier('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { CreateSupplier, UpdateSupplier } from "@/api/RDSupplier";
import Cookies from "js-cookie";
export default {
  props: ["supplier"],
  data() {
    return {
      rules: {
        SupplierName: [
          {
            required: true,
            message: "Hãy nhập tên nhà cung cấp",
            trigger: "change"
          }
        ],
        Address: [
          {
            required: true,
            message: "Hãy nhập địa chỉ",
            trigger: "change"
          }
        ],
        Website: [
          {
            required: true,
            message: "Hãy nhập website",
            trigger: "change"
          }
        ]
      },

      form: {
        SupplierId: "",
        SupplierName: "",
        Address: "",
        Website: "",
        Note: ""
      }
    };
  },
  methods: {
    addSupplier(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          var req = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            SupplierInfo: this.form
          };
          if (this.supplier == null) {
            CreateSupplier(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Tạo nhà cung cấp thành công",
                  type: "success"
                });
                this.$emit("supplierAdded");
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          } else {
            UpdateSupplier(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " cập nhật thành công",
                  type: "success"
                });
                this.$emit("supplierUpdated");
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-supplier-modal");
    },
    initForm() {
      if (this.supplier) {
        this.form.SupplierId = this.supplier.SupplierId;
        this.form.SupplierName = this.supplier.SupplierName;
        this.form.Address = this.supplier.Address;
        this.form.Website = this.supplier.Website;
        this.form.Note = this.supplier.Note;
      } else {
        this.form.SupplierId = null;
        this.form.SupplierName = null;
        this.form.Address = null;
        this.form.Website = null;
        this.form.Note = null;
      }
    }
  },
  mounted() {},
  watch: {
    supplier() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
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
