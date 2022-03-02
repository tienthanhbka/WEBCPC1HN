<template>
    <div>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
     components: {
    QrcodeStream,
    QrcodeDropZone, 
    QrcodeCapture
  },
    data(){
        return{

        }
    },
    methods:{
    onDecode (decodedString){
    this.$router.push('/san-xuat/bao-cao/ca-nhan')
  }
    }
}
</script>