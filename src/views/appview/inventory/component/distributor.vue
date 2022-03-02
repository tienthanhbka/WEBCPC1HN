<template>
  <div class="container">
    <div class="container-distributor">
      <div class="image">
        <img
          src="https://www.velosio.com/wp-content/uploads/2017/12/icon-sales-marketing.png"
          alt="imgae NPP"
          width="50"
          height="50"
        />
      </div>
      <div class="content">
        <h3 class="header-content">{{ data.StoreName }}</h3>
        <div class="detail-content">
          <span>Mã NPP: {{ data.StoreCode }}</span>
          <span>Thành phố: {{ data.City }}</span>
          <span>Địa chỉ: {{ data.Address }}</span>
        </div>
      </div>
    </div>
    <el-divider class="custom--divider"></el-divider>
    <div class="btn-detail">
      <el-button
        type="text"
        icon="fas fa-info-circle"
        size="small"
        @click="viewDetail"
      >
        Chi tiết</el-button
      >
    </div>
    <el-dialog :visible.sync="dialogDetail" custom-class="small--inventory">
      <span slot="title" class="title-dialog">{{ data.StoreName }}</span>
      <inventory :data="data.StoreCode"></inventory>
    </el-dialog>
  </div>
</template>

<script>
import Inventory from "./inventory.vue";
export default {
  components: { Inventory },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogDetail: false,
      dialogTitle: ""
    };
  },
  methods: {
    viewDetail(row) {
      this.dialogDetail = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 0 5px;
  margin-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  .container-distributor {
    display: flex;
    padding: 5px 0;
    .image {
      margin: 5px;
    }
    .content {
      .header-content {
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        padding: 5px;
      }
      .detail-content {
        color: rgba(0, 0, 0, 0.7);
        font-size: 10pt;
        span {
          display: block;
          padding-bottom: 3px;
        }
      }
    }
  }
  .btn-detail {
    width: 100%;
    text-align: center;
    font-size: 10pt;
  }
  .title-dialog {
    font-size: 10pt;
    font-weight: 700;
    color: #02bc77;
  }
}
</style>
<style lang="scss">
.small--inventory {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 0 10px;
  }
}
.custom--divider {
  margin: 0;
}
</style>
