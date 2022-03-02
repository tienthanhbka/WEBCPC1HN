<template>
  <div class="mission-container">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    $bg: rgba(49, 49, 49, 0.05);
    .mission-container {
        background: white;
        min-height: 100vh
    }
</style>

