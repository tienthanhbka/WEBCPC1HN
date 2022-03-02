<template>
  <div class="call-container">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    $bg: rgba(49, 49, 49, 0.05);
    .call-container {
        background: $mainBg;
       
    }
</style>
