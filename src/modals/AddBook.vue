<template>
  <c-modal
    acceptText="Save"
    :id="id"
    title="Add Book"
    @accept="onSave"
    @cancel="$emit('cancel')"
  >
    <l-form>
      <template v-slot:fields>
        <c-text-field v-model="name" id="name" label="Book Name" />
        <c-multiselect v-model="authors" :is-multi="true" :options="options" />
      </template>
    </l-form>
  </c-modal>
</template>

<script>
  import CTextField from '@/components/CTextField.vue';
  import LForm from '@/layouts/LForm.vue';
  import CModal from '@/components/CModal.vue';
  import CMultiselect from '@/components/CMultiselect.vue';

  export default {
    name: 'AddBook',
    components: {
      CTextField,
      LForm,
      CModal,
      CMultiselect,
    },
    data() {
      return {
        authors: [],
        name: '',
      };
    },
    computed: {
      options() {
        const authors = this.$store.getters['authors/getAll'];

        return authors.map(({ firstName, id, lastName }) => {
          return {
            id,
            label: `${lastName}, ${firstName}`,
            value: id,
          };
        });
      },
    },
    props: {
      id: {
        required: true,
        type: String,
      },
    },
    methods: {
      onSave() {
        console.log('save');
      },
    },
  };
</script>
