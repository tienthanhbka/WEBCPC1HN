<template>
  <div class="app-container">
    <div class="box-info" v-if="info.UID">
      <div class="header">
        <img src="@/assets/icpc1hn.png" alt="logo" />
      </div>
      <div class="body">
        <h3 class="title">QUÉT MÃ QR CODE DƯỚI ĐÂY:</h3>
        <qrcode-vue
          :value="info.UID"
          class="qrcode"
          :size="180"
          level="H"
        ></qrcode-vue>
        <p class="status" :class="info.Status | toStatusColor">
          <i class="el-icon-circle-check"></i> {{ info.Status | toStatusText }}
        </p>
      </div>
      <div class="footer">
        <p class="title">
          Vui lòng sử dụng mã QR Code trên để check-in, check-out !
        </p>
      </div>
    </div>
    <div class="blank-table" v-else>
      Không có dữ liệu
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { GetVaccineInfoByID } from "@/api/vaccine";

export default {
  components: {
    QrcodeVue
  },
  filters: {
    toStatusText(val) {
      if (val == 0) {
        return "Chưa đánh giá";
      } else if (val == 1) {
        return "Đã đăng kí";
      } else if (val == 3) {
        return "Đã kiểm tra sức khỏe";
      } else if (val == 5) {
        return "Đã tiêm xong";
      }
    },
    toStatusColor(val) {
      if (val == 0) {
        return "info";
      } else if (val == 1) {
        return "one";
      } else if (val == 3) {
        return "two";
      } else if (val == 5) {
        return "three";
      }
    }
  },
  data() {
    return {
      value: "",
      info: {}
    };
  },
  created() {
    this.value = this.$route.params.id;
    GetVaccineInfoByID({ UID: this.value }).then(res => {
      if (res.RespCode == 0) {
        this.info = res.VaccineInfo;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;

  .box-info {
    max-width: 450px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    height: auto;
    .header {
      text-align: center;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    .body {
      text-align: center;
      .title {
        color: #6c6a6a;
      }
      .qrcode {
      }
      .status {
        font-style: italic;
        font-size: 10pt;
        color: #6c6a6a;
      }
      .one {
        color: #6c6a6a;
      }
      .two {
        color: #ba6013;
      }
      .three {
        color: #299b15;
      }
    }
    .footer {
      text-align: center;
      .title {
        font-style: italic;
        font-size: 12pt;
        color: #6c6a6a;
        word-break: break-word;
        padding: 20px;
        line-height: 25px;
      }
    }
  }
}
</style>
