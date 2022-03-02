<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="100px"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Kênh bán" prop="TypeSale">
            <el-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TypeSale"
              filterable
              clearable
              placeholder="Chọn kênh bán..."
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in typeSales"
                :key="index"
                :label="item.SaleName"
                :value="item.SaleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Sản phẩm" prop="ProductName">
            <el-select
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.ProductName"
              @change="changePro"
              filterable
              clearable
              placeholder="Chọn nhóm sản phẩm..."
              style="width:100%"
            >
              <el-option
                v-for="(item, index) in items"
                :key="index"
                :label="item.ProductName"
                :value="item"
              >
                <span style="float: left">{{ item.ProductName }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{
                  item.ProductID
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Mã" prop="ProductID">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.ProductID"
              placeholder="Mã sản phẩm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="ĐVT" prop="UnitOfMeasure">
            <el-input
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.UnitOfMeasure"
              placeholder="Đơn vị tính"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="Note">
        <el-input
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Note"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập ghi chú..."
        ></el-input>
      </el-form-item>
      <div style="text-align:center;padding:5px" v-if="mode == 1">
        <el-button type="primary" size="small" @click="addPro"> Thêm</el-button>
      </div>
      <el-form-item label="Danh sách" v-if="mode == 1">
        <el-table :data="lineLst" size="small" border style="width: 100%">
          <el-table-column align="center" label="STT" width="75">
            <template slot-scope="props">
              {{ props.$index + 1 }}
              <el-tooltip content="Xóa" placement="top" v-show="mode < 3"
                ><el-button @click="delItem(props.$index)" type="text">
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="Kênh bán" align="center" width="130">
            <template slot-scope="props">
              {{ props.row.TypeSale }}
            </template>
          </el-table-column>
          <el-table-column label="Mã" align="center" width="80">
            <template slot-scope="props">
              {{ props.row.ProductID }}
            </template>
          </el-table-column>
          <el-table-column label="Tên" min-width="140">
            <template slot-scope="props">
              {{ props.row.ProductName }}
            </template>
          </el-table-column>
          <el-table-column label="ĐVT" width="80" align="center">
            <template slot-scope="props">
              {{ props.row.UnitOfMeasure }}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="Gửi mail đến" v-if="mode == 1">
        <el-select
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Email"
          multiple
          style="width:100%"
          filterable
          allow-create
          default-first-option
          placeholder="Nhập email người nhận"
        >
          <el-option
            v-for="item in emails"
            :key="item.EmailCompany"
            :label="item.EmailCompany"
            :value="item.EmailCompany"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align:center;margin:10px 0" v-if="mode != 3">
      <el-button
        v-if="mode < 4"
        type="primary"
        size="small"
        icon="el-icon-check"
        @click="create"
      >
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateProductEm, UpdateProductEm } from "@/api/product";

export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    items: Array,
    typeSales: Array,
    emails: Array
  },
  filters: {},
  components: {},
  data() {
    return {
      isDisable: true,
      lineLst: [],
      form: {
        RowID: "",
        ProductID: "",
        ProductName: "",
        Note: "",
        UnitOfMeasure: "",
        TimeCreate: "",
        EmployeeID: "",
        TypeSale: "",
        Status: "",
        Email: ""
      },
      rules: {
        ProductName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        TypeSale: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        UnitOfMeasure: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        ProductID: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    create(val) {
      if (this.mode == 1 && this.lineLst.length < 1) {
        this.addPro();
        if (this.form.Email.length == 0) {
          this.$notify({
            title: "Lỗi",
            message: "Vui lòng điền mail gửi đến",
            type: "error",
            position: "top-left"
          });
          return;
        }
        this.form.Email = this.form.Email
          ? this.form.Email.join(";")
          : this.form.Email;

        CreateProductEm({
          ProductEmLst: this.lineLst,
          Email: this.form.Email
        }).then(response => {
          if (response.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("createOK");
            this.lineLst = [];
            this.form.Email = [];
          }
        });
      } else {
        if (this.mode == 1) {
          if (this.form.Email.length == 0) {
            this.$notify({
              title: "Lỗi",
              message: "Vui lòng điền mail gửi đến",
              type: "error",
              position: "top-left"
            });
            return;
          }
          this.form.Email = this.form.Email
            ? this.form.Email.join(";")
            : this.form.Email;

          CreateProductEm({
            ProductEmLst: this.lineLst,
            Email: this.form.Email
          }).then(response => {
            if (response.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Thêm mới thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("createOK");
              this.lineLst = [];
              this.form.Email = [];
            }
          });
        } else if (this.mode == 2) {
          this.$refs.form.validate(valid => {
            if (valid) {
              UpdateProductEm({
                ProductEmInfo: this.form
              }).then(response => {
                if (response.RespCode == 0) {
                  this.$notify({
                    title: "Thành công",
                    message: "Cập nhật thành công",
                    type: "success",
                    position: "top-left"
                  });
                  this.$emit("createOK");
                  this.$refs.form.resetFields();
                }
              });
            }
          });
        }
      }
    },
    changePro(val) {
      this.form.ProductID = val.ProductID;
      this.form.ProductName = val.ProductName;
      this.form.UnitOfMeasure = val.UnitOfMeasure;
    },
    addPro() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let obj = {
            TypeSale: this.form.TypeSale,
            ProductID: this.form.ProductID,
            ProductName: this.form.ProductName,
            UnitOfMeasure: this.form.UnitOfMeasure,
            Note: this.form.Note
          };
          this.lineLst.push(obj);
          this.$refs.form.resetFields();
        }
      });
    },
    delItem(index) {
      this.lineLst.splice(index, 1);
    },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.ProductID = this.row.ProductID;
        this.form.ProductName = this.row.ProductName;
        this.form.TypeSale = this.row.TypeSale;
        this.form.Note = this.row.Note;
        this.form.UnitOfMeasure = this.row.UnitOfMeasure;
        this.form.Status = this.row.Status;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.ProductID = "";
      this.form.ProductName = "";
      this.form.TypeSale = "";
      this.form.UnitOfMeasure = "";
      this.form.Note = "";
      this.form.EmployeeID = "";
      this.form.TimeCreate = "";
      this.form.Status = "";
      this.form.Email = [];
      this.lineLst = [];
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}
</style>
