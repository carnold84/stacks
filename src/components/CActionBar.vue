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
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font-size: 1em;
    justify-content: space-between;
    margin: 0;
    padding: 5px 0;
    width: 100%;

    &.has-border {
      border-bottom: #eeeeee solid 1px;
    }
  }
</style>
