<template>
  <c-typography class="c_message_screen">
    <slot />
  </c-typography>
</template>

<script>
  import CTypography from './CTypography.vue';

  export default {
    components: { CTypography },
    name: 'CMessageScreen',
  };
</script>

<style scoped>
  .c_message_screen {
    align-items: center;
    color: var(--font-color-primary);
    display: flex;
    flex-grow: 1;
    justify-content: center;
    margin: 0;
    width: 100%;
  }
</style>
