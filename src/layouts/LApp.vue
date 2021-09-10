<template>
  <div class="l_app">
    <slot name="header"></slot>
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
  .l_form {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    .content {
      flex-grow: 1;
      position: relative;
    }
  }
</style>
