<template>
  <component
    :is="component"
    :class="['c_typography', variant, { 'has-margin': hasMargin }]"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    name: 'CTypography',
    props: {
      component: {
        default() {
          return 'p';
        },
        type: [Object, String],
      },
      hasMargin: {
        default() {
          return true;
        },
        type: Boolean,
      },
      variant: {
        default() {
          return 'p';
        },
        type: String,
        validator(value) {
          return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(value);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_typography {
    color: var(--text1);
    font-weight: 400;
    margin: 0;

    .has-margin {
      margin: 0 0 15px;
    }

    &.h1 {
      font-size: 3.2rem;
      line-height: 4.2rem;
    }

    &.h2 {
      font-size: 2.9rem;
      line-height: 3.9rem;
    }

    &.h3 {
      font-size: 2.6rem;
      line-height: 3.6rem;
    }

    &.h4 {
      font-size: 2.3rem;
      line-height: 3.3rem;
    }

    &.h5 {
      font-size: 2rem;
      line-height: 3rem;
    }

    &.h6 {
      font-size: 1.7rem;
      line-height: 2.7rem;
    }

    &.p {
      font-size: 1.4rem;
      line-height: 2.4rem;
    }
  }
</style>
