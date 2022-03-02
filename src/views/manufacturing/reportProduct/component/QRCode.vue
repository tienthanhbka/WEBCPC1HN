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
import { watch } from "fs"
export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  props: ["id"],
  created() {
    this.camera = "auto"
  },
  data() {
    return {
      QuestionID: "",
      Ans: "",
      camera: "auto",
      destroyed: false
    }
  },
  methods: {
    onDecode(Answer) {
      var a = {
        QuestionID: this.id,
        Ans: Answer
      }
      this.$emit("answer", a)
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
