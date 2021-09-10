<template>
  <div class="l_form">
    <div class="fields">
      <slot name="fields"></slot>
    </div>
    <div v-if="$slots.buttons" class="buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LForm',
  };
</script>

<style lang="scss" scoped>
  .l_form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .fields {
      margin: 0;
      width: 100%;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0 0 0;
      width: 100%;

      &::v-deep > * {
        margin: 0 0 0 10px;
      }
    }
  }
</style>
