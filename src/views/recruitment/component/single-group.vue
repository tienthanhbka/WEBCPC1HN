<template>
  <div class="single-group">
    <div class="group-top">
      <div class="image">
        <img :src="imageGroup" alt="image-group" />
      </div>
      <div class="logo">
        <img
          src="https://cpc1hn.com.vn/wp-content/uploads/2019/02/cropped-Logo-CPC1HN-02.png"
          alt="logo"
        />
      </div>
    </div>
    <div class="group-bottom">
      <router-link :to="'groups/:id'">
        <h4>Group IT</h4>
        <!-- <span>1 thành viên</span> -->
      </router-link>
    </div>
  </div>
</template>

<script>
import Image from "@/assets/img/group-image.png";
export default {
  data() {
    return {
      imageGroup: Image
    };
  }
};
</script>

<style lang="scss">
.single-group {
  width: 100%;
  max-height: 250px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  .group-top {
    position: relative;
    width: 100%;
    height: 200px;
    .image {
      width: 100%;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .logo {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .group-bottom {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h4 {
      margin: 0;
      padding: 10px;
      overflow: hidden;
      font-size: 10pt;
      color: #333;
      &:hover {
        cursor: pointer;
        color: #c9161d;
      }
    }
  }
}
</style>
