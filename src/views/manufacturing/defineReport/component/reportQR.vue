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
  props: ["date1",'date2'],
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
      var a =
      this.$emit("answer", a)
      this.$router.push('/san-xuat/xem-bao-cao/'+Answer)
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
