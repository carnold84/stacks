<template>
  <div class="c_panel_manager">
    <transition-group name="panel">
      <template v-for="panel of panels" :key="panel.id">
        <find-book
          v-if="panel.type === 'findBook'"
          align="right"
          :id="panel.id"
          @close="onClose(panel.id)"
        />
        <c-panel
          v-else
          :id="panel.id"
          :title="panel.title"
          @close="onClose(panel.id)"
        >
          {{ panel.text }}
        </c-panel>
      </template>
    </transition-group>
  </div>
</template>

<script>
  import CPanel from '@/components/CModal.vue';
  import FindBook from '../modals/FindBook.vue';

  export default {
    components: { CPanel, FindBook },
    name: 'ModalManager',
    computed: {
      panels() {
        return this.$store.getters['panels/getAll'];
      },
    },
    methods: {
      async onClose(id) {
        this.$store.dispatch('panels/remove', id);

        this.$emit('close', id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_panel_manager {
    z-index: 3;

    .panel-enter-active,
    .panel-leave-active {
      transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
    }
  }
</style>
