<template>
  <div>
    <!-- <qrcode-stream @decode="onDecode"></qrcode-stream> -->
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSexC57tr1SQi1D9ktvv_2uiQPfUcqn_wBLGcG4i88ZP5AI8HQ/viewform?embedded=true"
      width="640"
      height="1432"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >Đang tải…</iframe
    >
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data() {
    return {};
  },
  methods: {
    onDecode(decodedString) {
      this.$router.push("/san-xuat/bao-cao/ca-nhan");
    }
  }
};
</script>
