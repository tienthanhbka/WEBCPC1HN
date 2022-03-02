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
  margin-bottom: 15px;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1),
    0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1),
    0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12),
    0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
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
      display: inline-block;
      font-size: 10pt;
      color: gray;
    }
    .user-bio-section-body {
      margin-left: 10px;
      padding-bottom: 5px;
      //border-bottom: 1px solid #dfe6ec;
      display: inline-block;
    }
  }
}
</style>
