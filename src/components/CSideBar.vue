<template>
  <div :class="{ c_side_bar: true }">
    <div class="content-start">
      <slot name="content-start"></slot>
    </div>
    <div class="content-center">
      <slot name="content-center"></slot>
    </div>
    <div class="content-end">
      <slot name="content-end"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CSideBar',
    props: {},
  };
</script>

<style lang="scss" scoped>
  .c_side_bar {
    border-right: #eeeeee solid 1px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 1em;
    height: 100vh;
    margin: 0;
    width: 220px;

    .content-start {
      padding: 20px;
      width: 100%;
    }

    .content-center {
      flex-grow: 1;
    }

    .content-end {
    }
  }
</style>
