<template>
  <div :class="{ c_action_bar: true, 'has-border': hasBorder }">
    <div class="content-left">
      <slot name="content-left"></slot>
    </div>
    <div class="content-right">
      <slot name="content-right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CActionBar',
    props: {
      hasBorder: {
        default() {
          return true;
        },
        type: Boolean,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_action_bar {
    width: 100%;
    height: 40px;
    font-size: 1em;
    margin: 0;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;

    &.has-border {
      border-bottom: #dddddd solid 1px;
    }
  }
</style>
