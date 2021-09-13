<template>
  <l-centred-column>
    <c-action-bar>
      <template v-slot:content-left>
        <c-typography component="h2" style="margin: 0" variant="h5">
          Books
        </c-typography>
      </template>
      <template v-slot:content-right>
        <c-button :is-round="true" @click="onAddBook">
          <svg height="18px" viewBox="0 0 24 24" width="18px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </c-button>
      </template>
    </c-action-bar>
    <c-message-screen v-if="books?.length === 0" style="height: 200px">
      No books
    </c-message-screen>
    <c-table v-if="books?.length > 0">
      <template v-slot:body>
        <c-table-row v-for="book of books" :key="book.id">
          <c-table-cell>
            <c-typography style="display: inline; margin: 0">
              {{ book.title }}
            </c-typography>
          </c-table-cell>
          <c-table-cell>
            <c-link
              v-for="author of book.authors"
              component="router-link"
              :key="author.id"
              :to="`/author/${author.id}`"
            >
              {{ author.name }}
            </c-link>
          </c-table-cell>
          <c-table-cell>
            <c-link
              v-if="book.series"
              component="router-link"
              :to="`/series/${book.series.id}`"
            >
              {{ book.series.title }}
            </c-link>
            <c-typography
              v-if="book.bookNumber"
              style="display: inline; margin: 0"
            >
              - Book {{ book.bookNumber }}
            </c-typography>
          </c-table-cell>
          <c-table-cell :is-controls="true">
            <c-button
              component="router-link"
              :is-round="true"
              :to="`/book/${book.id}/edit`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 0 24 24"
                width="16px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                />
              </svg>
            </c-button>
            <c-button
              :is-round="true"
              style="margin: 0 0 0 5px"
              @click="onDelete(book.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 0 24 24"
                width="16px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </c-button>
          </c-table-cell>
        </c-table-row>
      </template>
    </c-table>
  </l-centred-column>
</template>

<script>
  import CActionBar from '@/components/CActionBar.vue';
  import CButton from '@/components/CButton.vue';
  import CLink from '@/components/CLink.vue';
  import CTable from '@/components/CTable.vue';
  import CTableCell from '@/components/CTableCell.vue';
  import CTableRow from '@/components/CTableRow.vue';
  import CTypography from '@/components/CTypography.vue';
  import LCentredColumn from '@/layouts/LCentredColumn.vue';
  import CMessageScreen from '../components/CMessageScreen.vue';

  export default {
    name: 'Home',
    components: {
      CButton,
      LCentredColumn,
      CTable,
      CTableRow,
      CTableCell,
      CLink,
      CTypography,
      CActionBar,
      CMessageScreen,
    },
    computed: {
      books() {
        return this.$store.getters['books/getAll'];
      },
    },
    methods: {
      onAddBook() {
        this.$store.dispatch('modals/add', {
          type: 'addBook',
        });
      },
      onDelete(id) {
        this.$store.dispatch('books/delete', id);
      },
    },
  };
</script>
