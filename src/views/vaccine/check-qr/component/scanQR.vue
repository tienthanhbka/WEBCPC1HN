<template>
  <div>
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <img
          src="https://gruhn.github.io/vue-qrcode-reader/checkmark.svg"
          alt="Checkmark"
          width="128px"
        />
      </div>
    </qrcode-stream>
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
  created() {},
  data() {
    return {
      camera: "auto",
      result: null,
      showScanConfirmation: false
    };
  },
  methods: {
    async onInit(promise) {
      try {
        await promise;
      } catch (e) {
        console.error(e);
      } finally {
        this.showScanConfirmation = this.camera === "off";
      }
    },

    async onDecode(content) {
      this.result = content;
      this.$emit("answer", content);
      this.pause();
      await this.timeout(500);
      this.unpause();
    },

    unpause() {
      this.camera = "auto";
    },

    pause() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }
  },
  watch: {},
  created() {
    this.unpause();
  }
};
</script>
<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
