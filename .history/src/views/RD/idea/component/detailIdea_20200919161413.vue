<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-size:10pt;font-weight:700;"
        >Chi tiết ý tưởng</span
      ></el-divider
    >
    <div slot="body" class="border-form">
      <el-form
        ref="form"
        label-position="left"
        size="small"
        :model="idea"
        label-width="150px"
      >
        <el-form-item label="Tên ý tưởng">
          <el-input
            class="selectIDGroup"
            v-model="idea.IdeaName"
            style="width:100%"
            placeholder="Nhập tên ý tưởng..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Nội dung">
          <el-input
            class="selectIDGroup"
            v-model="idea.IdeaContent"
            style="width:100%"
            placeholder="Nhập nội dung..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Cách bào chế">
          <el-input
            class="selectIDGroup"
            v-model="idea.Preparation"
            style="width:100%"
            placeholder="Nhập cách bào chế..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Hoạt chất">
          <el-input
            class="selectIDGroup"
            v-model="idea.ActiveElement"
            style="width:100%"
            placeholder="Nhập hoạt chất..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Tài liệu đính kèm">
          <el-link href="" target="_blank" v-if="idea == null"></el-link>
          <el-link href="" target="_blank" v-if="idea != null">{{
            idea.MoreInfo
          }}</el-link>
        </el-form-item>
        <el-form-item label="Người tạo">
          <el-input
            class="selectIDGroup"
            v-model="idea.Creater"
            style="width:100%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Thời gian tạo">
          <el-input
            class="selectIDGroup"
            v-model="idea.TimeCreate"
            style="width:100%"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["idea"],
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
