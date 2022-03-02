<template>
  <div class="container">
       
  </div>
</template>

<script>
export default {
     data() {
    return {
      currentDate: new Date()
    };
  }
};
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
  .container {
    width: 50%;
  }
  @media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
}
</style>
