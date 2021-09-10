<template>
  <div class="c_modal_manager">
    <transition-group name="modal">
      <template v-for="modal of modals" :key="modal.id">
        <add-book
          v-if="modal.type === 'addBook'"
          :id="modal.id"
          @accept="onAccept(modal)"
          @cancel="onCancel(modal)"
        />
        <c-modal
          v-else
          :id="modal.id"
          :title="modal.title"
          @accept="onAccept(modal)"
          @cancel="onCancel(modal)"
        >
          {{ modal.text }}
        </c-modal>
      </template>
    </transition-group>
  </div>
</template>

<script>
  import AddBook from '@/modals/AddBook.vue';
  import CModal from '@/components/CModal.vue';

  export default {
    components: { AddBook, CModal },
    name: 'ModalManager',
    computed: {
      modals() {
        return this.$store.getters['modals/getAll'];
      },
    },
    methods: {
      async onAccept({ id, onAccept }) {
        if (onAccept) {
          await onAccept();
        }

        console.log('onAccept manager');

        this.$store.dispatch('modals/remove', id);
      },
      async onCancel({ id, onCancel }) {
        if (onCancel) {
          await onCancel();
        }

        this.$store.dispatch('modals/remove', id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .c_modal_manager {
    z-index: 3;

    .modal-enter-active,
    .modal-leave-active {
      transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
    }
  }
</style>
