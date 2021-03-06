<template>
  <c-modal
    acceptText="Save"
    :id="id"
    title="Add Book"
    @accept="onSave"
    @cancel="$emit('close')"
  >
    <c-message-screen v-if="isSaving" style="min-height: 200px">
      Saving...
    </c-message-screen>
    <l-form v-else>
      <template v-slot:fields>
        <c-text-field
          v-model="title"
          id="title"
          :is-required="true"
          label="Book Title"
          style="margin: 0 0 20px"
        />
        <c-multiselect
          v-model="authors"
          id="authors"
          :is-multi="true"
          :options="authorOptions"
          placeholder="Select authors..."
          style="margin: 0 0 20px"
        />
        <c-multiselect
          v-model="series"
          id="series"
          :is-multi="false"
          :options="seriesOptions"
          placeholder="Select series..."
          style="margin: 0 0 20px"
        />
        <c-text-field
          v-model="bookNumber"
          id="bookNumber"
          label="Book Number"
        />
      </template>
    </l-form>
  </c-modal>
</template>

<script>
  import CTextField from '@/components/CTextField.vue';
  import LForm from '@/layouts/LForm.vue';
  import CModal from '@/components/CModal.vue';
  import CMultiselect from '@/components/CMultiselect.vue';
  import CMessageScreen from '../components/CMessageScreen.vue';

  export default {
    name: 'AddBook',
    components: {
      CTextField,
      LForm,
      CModal,
      CMultiselect,
      CMessageScreen,
    },
    data() {
      return {
        authors: [],
        bookNumber: null,
        isSaving: false,
        series: null,
        title: '',
      };
    },
    computed: {
      authorOptions() {
        const authors = this.$store.getters['authors/getAll'];

        return authors.map(({ id, name }) => {
          return {
            id,
            label: name,
            value: id,
          };
        });
      },
      seriesOptions() {
        const series = this.$store.getters['series/getAll'];

        return series.map(({ id, title }) => {
          return {
            id,
            label: title,
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
      async onSave() {
        this.isSaving = true;

        await this.$store.dispatch('books/create', {
          authors: this.authors,
          bookNumber: this.bookNumber,
          series: this.series,
          title: this.title,
        });

        this.isSaving = false;

        this.$emit('close');
      },
    },
  };
</script>
