<template>
  <div class="item">
    <img
      class="item--image inline-block"
      src="/imgs/received.png"
      alt="icon-order"
    />
    <div class="item--image__clear inline-block"></div>
    <div class="inline-block">
      <h3 class="item--title">{{ item.PlaceName }}</h3>
      <p class="item--time " v-if="item.OrderDate">
        {{ Date.parse(item.OrderDate).toString("HH:mm dd/MM/yyyy") }}
      </p>
      <p class="item--sale">Giá trị {{ item.AmountSum | toVND }}</p>
      <el-tag
        class="item--status"
        size="mini"
        :type="item.StatusInv | toStatusText"
        >{{ item.StatusInv }}</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  filters: {
    toStatusText(val) {
      if (val == "Đang xử lý") return "primary";
      else if (val == "Đã duyệt") return "success";
      else if (val == "Bị treo") return "danger";
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  .item--image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    float: left;
    padding: 5px;
    margin-right: 10px;
  }
  .item--image__clear {
    clear: both;
  }
  .item--title {
    font-size: 10pt;
    margin: 10px 0 0 0;
    display: inline-block;
    width: 280px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  .item--time {
    color: #a8a0a0;
    margin: 0;
  }
}
.inline-block {
  display: inline-block;
}
p {
  margin: 5px 0;
  font-size: 10pt;
}
</style>
