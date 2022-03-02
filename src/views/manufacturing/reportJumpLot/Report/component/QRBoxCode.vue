<template>
  <div>
    <qrcode-stream
      :camera="camera"
      @decode="onDecode"
      v-if="!destroyed"
    ></qrcode-stream>
    <div style="padding:5px;text-align:right;">
      <el-button type="warning" @click="reload">Quét lại</el-button>
    </div>
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader"

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  created() {
    this.camera = "auto"
  },
  data() {
    return {
      DateStart: "",
      DateEnd: "",
      camera: "auto",
      destroyed: false
    }
  },
  methods: {
    onDecode(Answer) {
      this.$emit("data", Answer)
      this.camera = "off"
    },
    async reload() {
      this.destroyed = true
      await this.$nextTick()
      this.destroyed = false
      this.camera = "auto"
    }
  },
  watch: {
  }
}
</script>
<style>
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
