<template>
  <div class="info-window-content">
    <div class="loading-drawer" v-if="idea == null">
      <i class="el-icon-loading loading-text"></i>
    </div>
    <div>
      <el-divider content-position="left">Chi tiết ý tưởng</el-divider>
    </div>
    <div>
      •Mã ý tưởng:
      <b>{{ idea.DocumentId }}</b>
    </div>
    <div>
      •Tên ý tưởng:
      <b>{{ idea.IdeaName }}</b>
    </div>
    <div>
      •Nội dung:
      <b>{{ idea.IdeaContent }}</b>
    </div>
    <div>
      •Hoạt chất:
      <b>{{ idea.ActiveElement }}</b>
    </div>
    <div>
      •Cách bào chế:
      <b>{{ idea.Preparation }}</b>
    </div>
    <div>
      •Tài liệu tham khảo:
      <b>{{ idea.MoreInfo }}</b>
    </div>
    <div>
      •Người tạo:
      <b>{{ idea.CreaterId }}</b>
    </div>
    <div>
      •Thời gian tạo:
      <b>{{ idea.TimeCreate }}</b>
    </div>
    <div v-if="idea.UpdateId">
      •Người cập nhật:
      <b>{{ idea.UpdateId }}</b>
    </div>
    <div v-if="idea.TimeUpdate">
      •Cập nhật lần cuối:
      <b>{{ idea.TimeUpdate }}</b>
    </div>
    <div v-if="idea.ApproveId">
      •Người duyệt:
      <b>{{ idea.ApproveId }}</b>
    </div>
    <div v-if="idea.ApproveId">
      •Thời gian duyệt:
      <b>{{ idea.TimeApprove }}</b>
    </div>
    <!-- <div>
            •Ghi chú:
            <b>{{idea.Note}}</b>
          </div> -->
    <div>
      •Trạng thái:
      <el-tag :type="idea.Status | ideaStatusColor">
        {{ idea.Status | ideaStatusText }}
      </el-tag>
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
