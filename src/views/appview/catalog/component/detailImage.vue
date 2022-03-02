<template>
  <div class="list--image">
    <img :src="data.LinkImage1" alt="image1" class="image1" />
    <img :src="data.LinkImage2" alt="image2" class="image2" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.image1,
.image2 {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
