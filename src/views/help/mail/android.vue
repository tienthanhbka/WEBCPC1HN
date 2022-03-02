<template>
<div class="demo-image__placeholder">
  <div class="img" >
    <el-image style="margin: auto" :src="src"></el-image>
    <div> <a href="http://it-cpc1hn.simplesite.com/442407929" > Click vào đây để xem hướng dẫn chi tiết </a> </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        src: 'https://1.bp.blogspot.com/-aXZCsa3WFhw/XQvg5uOXjQI/AAAAAAAA0Po/XLmBjEF5ZE8_QbCqJxCupd13XszcruxxwCLcBGAs/s728-e100/outlook-for-android.jpg'
      }
    }
  }
</script>

<style>

    .img{
        padding-left: 300px;
    }
</style>