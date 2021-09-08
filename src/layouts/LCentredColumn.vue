<template>
  <div class="l_centred_column">
    <div class="content" :style="{ maxWidth }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LCentredColumn',
    props: {
      maxWidth: {
        default() {
          return '1000px';
        },
        type: String,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .l_centred_column {
    display: flex;
    justify-content: center;
    width: 100%;

    .content {
      margin: 30px 40px;
      width: 100%;
    }
  }
</style>
