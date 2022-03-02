<template>
  <div
    class="no-border-picker"
    :class="value ? '' : 'err'"
    @click="$refs.dpk.$el.click()"
  >
    <div class="icon">
      <i class="fas fa-calendar-day"></i>
    </div>
    <div class="content">
      <div class="label">Thời gian</div>
      <el-date-picker
        ref="dpk"
        size="large"
        style="width:100%"
        prefix-icon="dfs"
        v-model="value2"
        value-format="yyyy-MM-dd HH:mm"
        format="dd/MM/yyyy HH:mm"
        type="datetime"
        placeholder="Chọn thời gian"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      value2: this.value
    };
  },
  watch: {
    value2() {
      this.$emit("input", this.value2);
    }
  }
};
</script>
