<template>
  <div class="box-card user-bio">
    <div slot="header" class="clearfix">
      <span>Thông tin học vấn</span>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="fas fa-book"></i> Trình độ</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].Qualification }}</div>
      </div>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="fas fa-book-reader"></i> Bằng cấp</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].Degree }}</div>
      </div>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="far fa-star"></i> Xếp loại</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].DegreeLevel }}</div>
      </div>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="fas fa-briefcase"></i> Chuyên ngành</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].Specialized }}</div>
      </div>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="fas fa-map-marker-alt"></i> Nơi đào tạo</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].TrainingPlaces }}</div>
      </div>
    </div>
    <div class="user-education user-bio-section">
      <div class="user-bio-section-header">
        <span><i class="far fa-calendar-check"></i> Thời gian đào tạo</span>
      </div>
      <div class="user-bio-section-body">
        <div class="text-muted">{{ user[0].TranningTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="scss" scoped>
.user-bio {
  margin-top: 10px;
  color: #606266;
  padding: 20px 10px;
  background: #fff;
  border-radius: 16px;
  span {
    padding-left: 4px;
  }
  .user-bio-section {
    font-size: 14px;
    padding: 10px 0;
    .user-bio-section-header {
      padding-bottom: 5px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .user-bio-section-body {
      margin-left: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #dfe6ec;
    }
  }
}
</style>
