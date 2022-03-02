<template>
  <div class="info-window-content">
    <div class="loading-drawer" v-if="material == null">
      <i class="el-icon-loading loading-text"></i>
    </div>
    <div>
      <el-divider content-postition="left">Chi tiết</el-divider>
    </div>
    <div>
      •Mã nguyên liệu:
      <b>{{ material.MaterialId }}</b>
    </div>
    <div>
      •Tên nguyên liệu:
      <b>{{ material.MaterialName }}</b>
    </div>
    <div>
      •Tên thương mại:
      <b>{{ material.CommerceName }}</b>
    </div>
    <div>
      •Nhà cung cấp:
      <b>{{ material.SupplierId }}</b>
    </div>
    <div>
      •Hoạt chất:
      <b>{{ material.ActiveElement }}</b>
    </div>
    <div>
      •Giải thích:
      <b>{{ material.DesIdentify }}</b>
    </div>
    <div>
      •Người tạo:
      <b>{{ material.CreaterId }}</b>
    </div>
    <div>
      •Thời gian tạo:
      <b>{{ material.TimeCreate }}</b>
    </div>
    <div>
      •Ghi chú:
      <b>{{ material.Note }}</b>
    </div>
    <div>
      •Trạng thái:
      <span>{{ material.Status | callStatusText }}</span>
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
