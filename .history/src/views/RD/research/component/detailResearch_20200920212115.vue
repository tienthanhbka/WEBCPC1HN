<template>
  <div class="info-window-content">
    <el-divider content-position="left"
      ><span style="font-size:10pt;font-weight:700;"
        >Chi tiết đề xuất sản phẩm</span
      ></el-divider
    >
    <div slot="body" class="border-form">
      <el-form
        ref="form"
        label-position="left"
        size="small"
        :model="research"
        label-width="150px"
      >
        <el-form-item label="Mã ý tưởng">
          <el-input
            class="selectIDGroup"
            v-model="research.IdeaId"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Mã sản phẩm">
          <el-input
            class="selectIDGroup"
            v-model="research.ProductID"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Sản phẩm">
          <el-input
            class="selectIDGroup"
            v-model="research.ProductName"
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
            v-model="research.ActiveElement"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Hàm lượng">
          <el-input
            class="selectIDGroup"
            v-model="research.Concentration"
            style="width:100%"
            type="textarea"
            autosize
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Dạng đóng gói">
          <el-input
            class="selectIDGroup"
            v-model="research.ResearchLineLst"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Người tạo">
          <el-input
            class="selectIDGroup"
            v-model="research.CreaterId"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Thời gian tạo">
          <el-input
            class="selectIDGroup"
            v-model="research.TimeCreate"
            style="width:100%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input
            class="selectIDGroup"
            v-model="research.Note"
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
  props: ["research"],
  watch: {},
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
