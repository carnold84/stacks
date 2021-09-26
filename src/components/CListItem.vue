<template>
  <component
    active-class="is-active"
    exact-active-class="is-exact-active"
    :class="['c_list_item']"
    :is="to ? 'router-link' : 'div'"
    :to="to"
  >
    <div class="content-start">
      <slot name="content-start"></slot>
    </div>
    <div class="content-center">
      <slot></slot>
    </div>
    <div class="content-end">
      <slot name="content-end"></slot>
    </div>
  </component>
</template>

<script>
  export default {
    name: 'CSideBar',
    props: {
      to: {
        type: [Object, String],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_list_item {
    align-items: center;
    color: rgba(0, 0, 0, 0.6);
    fill: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-shrink: 0;
    margin: 0;
    padding: 10px 20px;
    text-decoration: none;
    width: 100%;

    &:hover {
      background-color: var(--primary10);
      color: var(--primary);
      fill: var(--primary);
    }

    &.is-active,
    &.is-exact-active {
      background-color: var(--primary9);
      color: var(--primary);
      fill: var(--primary);
    }

    .content-start {
      align-items: center;
      display: flex;
    }

    .content-center {
      flex-grow: 1;
    }
  }
</style>
