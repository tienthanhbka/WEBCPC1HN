<template>
  <div>
    <div style="width:100%" slot="body">
      <el-form
        ref="form"
        label-position="top"
        size="small"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item prop="place">
              <span class="form-label" slot="label">Tổ chức</span>
              <el-autocomplete
                class="inline-input"
                style="width:100%"
                placeholder="Chọn tổ chức"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="product">
              <span class="form-label" slot="label">Sản phẩm</span>

              <el-autocomplete
                class="inline-input"
                style="width:100%"
                placeholder="Chọn sản phẩm"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="type">
              <span class="form-label" slot="label">Loại hình bán</span>

              <el-autocomplete
                class="inline-input"
                style="width:100%"
                placeholder="Chọn loại hình bán"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item prop="type">
              <div class="form-label" slot="label">
                Mô
                <el-button
                  style="float:right"
                  type="primary"
                  size="mini"
                  icon="fas fa-plus"
                >
                  Thêm</el-button
                >
              </div>
              <el-input
                placeholder="Nhập %............"
                v-model="input3"
                class="input-with-select"
              >
                <el-select
                  v-model="select"
                  slot="prepend"
                  placeholder="Chọn mô"
                  class="t-select"
                >
                  <el-option label="Restaurant" value="1"></el-option>
                  <el-option label="Order No." value="2"></el-option>
                  <el-option label="Tel" value="3"></el-option>
                </el-select>
                <el-button
                  type="icon"
                  slot="append"
                  style="color:red"
                  icon="fas fa-minus-circle"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" size="small" @click="closeDialog">Hủy</el-button>
      <el-button type="danger" size="small" @click="uploadMission"
        >Thêm mới</el-button
      >
    </div>
    <el-dialog
      title="Thêm KHTC vào nhiệm vụ"
      :visible.sync="dialogAddPlace"
      custom-class="medium-modal"
    >
      <my-place-modal :employee="selectedEm"></my-place-modal>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isLoading: false,
      dates: [
        { name: "T2", value: 2 },
        { name: "T3", value: 3 },
        { name: "T4", value: 4 },
        { name: "T5", value: 5 },
        { name: "T6", value: 6 },
        { name: "T7", value: 7 },
        { name: "CN", value: 8 }
      ],
      rules: {
        place: [
          {
            required: true,
            message: "Hãy chọn tổ chức",
            trigger: "change"
          }
        ],
        product: [
          {
            required: true,
            message: "Hãy chọn sản phẩm",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "Hãy chọn loại hình bán",
            trigger: "change"
          },
          { validator: validateDeadline, trigger: "change" }
        ]
      },
      form: {
        place: "",
        product: "",
        type: "",
        target: "",
        note: "",
        date: []
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  },

  created() {},
  watch: {},
  filters: {}
};
</script>
<style lang="css" scoped>
.el-form-item {
  margin-bottom: 0px;
}
.el-form-item label {
  padding: 0px !important;
  width: 100%;
}
.el-table__row button {
  float: right;
  margin: -4px;
  color: #d63031;
}
.form-label{
    font-size: 10pt;
    font-weight: 700;
    color: #a2a2a2;
}
.inline-block{
    display: inline-block;
}
</style>
<style>
.t-select .el-input {
  width: 80px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-form-item__label {
  width: 100%;
}
</style>
