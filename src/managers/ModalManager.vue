<template>
  <div class="c_modal_manager">
    <transition-group name="modal">
      <template v-for="modal of modals" :key="modal.id">
        <add-book
          v-if="modal.type === 'addBook'"
          :id="modal.id"
          @close="onClose(modal.id)"
        />
        <find-book
          v-else-if="modal.type === 'findBook'"
          :id="modal.id"
          @close="onClose(modal.id)"
        />
        <c-modal
          v-else
          :id="modal.id"
          :title="modal.title"
          @close="onClose(modal.id)"
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
  import FindBook from '../modals/FindBook.vue';

  export default {
    components: { AddBook, CModal, FindBook },
    name: 'ModalManager',
    computed: {
      modals() {
        return this.$store.getters['modals/getAll'];
      },
    },
    methods: {
      async onClose(id) {
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
