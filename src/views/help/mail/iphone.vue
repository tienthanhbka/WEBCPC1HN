<template>
<div class="demo-image__placeholder">
  <div class="img" >
    <el-image   :src="src"></el-image>
    <div> <a href="http://it-cpc1hn.simplesite.com/440905810?fbclid=IwAR2BMLkjUKi8PH1QX7cld7C7gAeKcsB3uf2Tsk0KtUc91d5Z2biDYKP43RU" > Click vào đây để xem hướng dẫn chi tiết </a> </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        src: 'https://www.websitecdn.com/doteasy-com/domain-email-website-hosting-articles/accessing-domain-emails-mobile/iphone/mail_app.jpg'
      }
    }
  }
</script>

<style>

    .img{
        padding-left: 400px;
    }
</style>
