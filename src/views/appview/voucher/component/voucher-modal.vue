<template>
  <div class="voucher-box">
    <div class="logo"><img src="@/assets/logo.png" alt="logo coupon" /></div>
    <div class="content" v-if="voucher">
      <p class="title">{{ promoName }}</p>
      <p class="row">Đơn tích lũy: {{ condition | toVND }}</p>
      <p class="row">
        Hiệu lực từ {{ Date.parse(timeStart).toString("dd.MM") }} đến
        {{ Date.parse(timeEnd).toString("dd.MM") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["voucher"],
  data() {
    return {
      promoName: "",
      condition: "",
      timeStart: "",
      timeEnd: ""
    };
  },
  methods: {
    initData() {
      if (this.voucher) {
        this.promoName = this.voucher.PromoName;
        this.condition = this.voucher.Condition;
        this.timeStart = this.voucher.TimeStart;
        this.timeEnd = this.voucher.TimeEnd;
      } else {
        this.promoName = "";
        this.condition = "";
        this.timeStart = "";
        this.timeEnd = "";
      }
    }
  },
  created() {
    this.initData();
  },
  watch: {
    voucher() {
      this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>
.voucher-box {
  display: flex;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  height: 85px;
  border: 1px dotted #ccc;
  border-left: none;
  margin: 10px 0 10px 10px;
  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px dashed #ccc;
    img {
      margin: 8px;
      width: 60px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      background: #dedede;
      border-radius: 100%;
      left: 5px;
    }
  }
  .content {
    margin-left: 10px;
    .title {
      font-size: 11pt;
      font-weight: 600;
      color: #0277bc;
      margin: 7px;
    }
    .row {
      color: #7f7c7c;
      font-size: 10pt;
      margin: 7px;
    }
  }
}
</style>
