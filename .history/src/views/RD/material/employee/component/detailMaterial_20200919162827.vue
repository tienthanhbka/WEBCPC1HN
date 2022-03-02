<template>
  <div class="info-window-content">
    <el-divider content-position="left"
      ><span style="font-size:10pt;font-weight:700;"
        >Chi tiết nguyên liệu</span
      ></el-divider
    >
    <div slot="body" class="border-form">
      <el-form
        ref="form"
        label-position="left"
        size="small"
        :model="material"
        label-width="150px"
      >
        <el-form-item label="Tên nguyên liệu">
          <el-input
            class="selectIDGroup"
            v-model="material.MaterialName"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Tên thương mại">
          <el-input
            class="selectIDGroup"
            v-model="material.CommerceName"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Nhà cung cấp">
          <el-input
            class="selectIDGroup"
            v-model="material.Supplier"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Hoạt chất">
          <el-input
            class="selectIDGroup"
            v-model="material.ActiveElement"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Giải thích">
          <el-input
            class="selectIDGroup"
            v-model="material.DesIdentify"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Người tạo">
          <el-input
            class="selectIDGroup"
            v-model="material.CreaterId"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Thời gian tạo">
          <el-input
            class="selectIDGroup"
            v-model="material.TimeCreate"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input
            class="selectIDGroup"
            v-model="material.Note"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["material"],
  watch: {
    supplier() {
      this.initForm();
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="css" scoped>
.info-window-content div {
  margin-top: 3px;
}
</style>
