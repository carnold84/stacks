<template>
  <div class="l_app">
    <slot name="side-bar"></slot>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LApp',
  };
</script>

<style lang="scss" scoped>
  .l_app {
    display: flex;
    min-height: 100vh;
    position: relative;
    width: 100%;

    .sidebar {
      height: 100%;
      position: relative;
    }

    .content {
      flex-grow: 1;
      position: relative;
    }
  }
</style>
