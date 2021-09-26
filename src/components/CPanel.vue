<template>
  <div class="c_panel">
    <div
      :class="[
        'panel',
        { 'align-left': align === 'left', 'align-right': align === 'right' },
      ]"
      :style="{ maxWidth }"
    >
      <header class="header">
        <c-typography v-if="title" class="title" component="h2" variant="h3">
          {{ title }}
        </c-typography>
        <c-button @click="$emit('close')">Close</c-button>
      </header>
      <div class="content">
        <slot />
      </div>
    </div>
    <div class="overlay" />
  </div>
</template>

<script>
  import CButton from './CButton.vue';
  import CTypography from './CTypography.vue';

  export default {
    components: { CTypography, CButton },
    name: 'CPanel',
    props: {
      align: {
        default() {
          return 'left';
        },
        type: String,
      },
      id: {
        required: true,
        type: String,
      },
      maxWidth: {
        default() {
          return '400px';
        },
        type: String,
      },
      title: {
        type: String,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_panel {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;

    .overlay {
      background-color: rgba(0, 0, 0, 0.5);
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 0;
    }

    .panel {
      background-color: #ffffff;
      height: 100%;
      padding: 30px;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;

      &.align-left {
        left: 0;
      }

      &.align-right {
        right: 0;
      }
    }

    --transition-time: 300ms;
    --timing-enter: ease-out;
    --timing-leave: ease-in;

    &.panel-enter-active {
      .panel {
        transition: opacity var(--transition-time) var(--timing-enter),
          transform var(--transition-time) var(--timing-enter);
      }

      .overlay {
        transition: opacity var(--transition-time) var(--timing-enter);
      }
    }

    &.panel-leave-active {
      .panel {
        transition: opacity var(--transition-time) var(--timing-leave),
          transform var(--transition-time) var(--timing-leave);
      }

      .overlay {
        transition: opacity var(--transition-time) var(--timing-leave);
      }
    }

    &.panel-enter-from {
      .panel {
        transform: translateX(100%);
      }

      .overlay {
        opacity: 0;
      }
    }

    &.panel-leave-to {
      .panel {
        transform: translateX(100%);
      }

      .overlay {
        opacity: 0;
      }
    }

    .content {
      padding: 0 0 30px;
    }

    .header {
      padding: 0 0 30px;
    }

    .title {
      margin: 0;
    }

    .text {
      margin: 0;
    }

    .buttons {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      width: 100%;

      &::v-deep > * {
        margin: 0 0 0 10px;
      }

      &::v-deep > *:first-child {
        margin: 0;
      }
    }
  }
</style>
