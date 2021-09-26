<template>
  <c-panel :id="id" title="Find Books" @cancel="$emit('close')">
    <c-text-field
      v-model="query"
      id="query"
      label="Book Title"
      style="margin: 0 0 20px"
      @input="onSearchInput"
    />
    <c-message-screen v-if="isLoading" style="min-height: 200px">
      Loading...
    </c-message-screen>
    <c-message-screen v-else-if="books.length === 0" style="min-height: 200px">
      No books found
    </c-message-screen>
    <c-table v-else style="flex-grow: 1">
      <c-table-row v-for="book of books" :key="book.id">
        <c-table-cell>{{ book.title }}</c-table-cell>
        <c-table-cell>{{ book.authors }}</c-table-cell>
      </c-table-row>
    </c-table>
  </c-panel>
</template>

<script>
  import CTextField from '@/components/CTextField.vue';
  import CMessageScreen from '../components/CMessageScreen.vue';
  import CTable from '../components/CTable.vue';
  import CTableRow from '../components/CTableRow.vue';
  import CTableCell from '../components/CTableCell.vue';
  import CPanel from '../components/CPanel.vue';

  export default {
    name: 'AddBook',
    components: {
      CTextField,
      CMessageScreen,
      CTable,
      CTableRow,
      CTableCell,
      CPanel,
    },

    data() {
      return {
        books: [],
        isLoading: false,
        selectedBook: null,
        query: '',
      };
    },
    props: {
      id: {
        required: true,
        type: String,
      },
    },
    methods: {
      clearAll() {
        this.books = [];
      },
      onSearchInput(evt) {
        const query = evt.target.value;
        console.log(query);

        if (query.length > 3) {
          clearTimeout(this.searchTimeout);
          this.searchTimeout = setTimeout(async () => {
            console.log('searchTimeout', query);
            clearTimeout(this.searchTimeout);

            this.isOptionsLoading = true;

            const url = this.getQuery(query);
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);

            this.books = result.items.map((book) => {
              return {
                authors: book?.volumeInfo?.authors,
                id: book?.id,
                label: book?.volumeInfo?.title,
              };
            });

            console.log(this.books);
            this.isOptionsLoading = false;
          }, 500);
        } else {
          this.books = [];
        }
      },
      getQuery(query) {
        return `https://www.googleapis.com/books/v1/volumes?q=${query}`;
      },
      async onSave() {
        this.isSaving = true;

        console.log('onSave');

        await this.$store.dispatch('books/create', {
          authors: this.authors,
          bookNumber: this.bookNumber,
          series: this.series,
          title: this.title,
        });

        console.log('dispatched');

        this.isSaving = false;

        this.$emit('close');
      },
    },
  };
</script>
