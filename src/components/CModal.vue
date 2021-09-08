<template>
  <div class="c_modal">
    <div class="modal" :style="{ maxWidth }">
      <header class="header">
        <c-typography v-if="title" class="title" component="h2" variant="h4">
          {{ title }}
        </c-typography>
      </header>
      <div class="content">
        <slot />
      </div>
      <div class="buttons">
        <c-button @click="$emit('cancel', id)">
          {{ declineText }}
        </c-button>
        <c-button :is-primary="true" @click="$emit('accept', id)">
          {{ acceptText }}
        </c-button>
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
    name: 'CModal',
    props: {
      acceptText: {
        default: 'OK',
        type: String,
      },
      declineText: {
        default: 'Cancel',
        type: String,
      },
      id: {
        required: true,
        type: String,
      },
      maxWidth: {
        default() {
          return '600px';
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
  .c_modal {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
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

    .modal {
      background-color: #ffffff;
      margin: 0 30px;
      padding: 30px;
      width: 100%;
      z-index: 1;
    }

    --transition-time: 300ms;
    --timing-enter: ease-out;
    --timing-leave: ease-in;

    &.modal-enter-active {
      .modal {
        transition: opacity var(--transition-time) var(--timing-enter),
          transform var(--transition-time) var(--timing-enter);
      }

      .overlay {
        transition: opacity var(--transition-time) var(--timing-enter);
      }
    }

    &.modal-leave-active {
      .modal {
        transition: opacity var(--transition-time) var(--timing-leave),
          transform var(--transition-time) var(--timing-leave);
      }

      .overlay {
        transition: opacity var(--transition-time) var(--timing-leave);
      }
    }

    &.modal-enter-from {
      .modal {
        opacity: 0;
        transform: translateY(-10%);
      }

      .overlay {
        opacity: 0;
      }
    }

    &.modal-leave-to {
      .modal {
        opacity: 0;
        transform: translateY(10%);
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
