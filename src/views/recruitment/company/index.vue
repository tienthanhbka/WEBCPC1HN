<template>
  <div class="container-group">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-custom"
      mode="horizontal"
      @select="handleSelect"
      background-color="#57a8cc"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <el-menu-item index="/tuyen-dung/company/groups">Nhóm</el-menu-item>
      <el-menu-item index="/tuyen-dung/company/recruitments"
        >Bài đăng</el-menu-item
      >
      <el-menu-item index="/tuyen-dung/company/posts">Hội thảo</el-menu-item>
      <el-menu-item index="/tuyen-dung/company/resumes">CV</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {}
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.container-group {
  .el-menu-custom {
    display: flex;
    justify-content: center;
  }
}
</style>
