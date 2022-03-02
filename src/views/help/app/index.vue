<template>
<div class="demo-image__placeholder">
  <div class="img" >
    <el-image style="margin: auto" :src="src"></el-image>
    <div> <a href="http://it-cpc1hn.simplesite.com/440898962" > Click vào đây để xem hướng dẫn chi tiết </a> </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        src: 'https://cdn.apkmonk.com/images/com.bk.thinhnd.icpc1hn.png'
      }
    }
  }
</script>

<style>

    .img{
        padding-left: 400px;
    }
</style>