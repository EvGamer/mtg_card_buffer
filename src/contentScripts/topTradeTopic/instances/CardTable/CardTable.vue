<template>
  <div>
    <VueGoodTable
      v-if="isOpen"
      :rows="cards"
      :columns="columns"
      :pagination-options="paginationOptions"
      :search-options="searchOptions"
      :totalRows="total"
      mode="remote"
      @on-search="handleSearch"
      @on-column-filter="handleColumnFilter"
      @on-page-change="handleChangePage"
      @on-per-page-change="handleChangePage"
      styleClass="vgt-table condensed"
      class="mtg-card-buffer__table"
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field === 'name'">
          <div
              role="button"
              tabindex="0"
              class="previewButton"
              @click="togglePreview(props.row.id)"
          >
            {{ props.row.name }}
          </div>
          <img v-if="openedPreviewCardId === props.row.id" :src="props.row.imageUrl" height="300"/>
        </div>
        <div v-else-if="props.column.field === 'actions'">
          <button
            class="ipsButton ipsButton_verySmall ipsButton_light"
            @click="addToCart(props.row)"
          >
            В корзину
          </button>
        </div>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </VueGoodTable>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

  import { VueGoodTable } from "vue-good-table";

  import 'vue-good-table/dist/vue-good-table.css';

  export default {
    components: { VueGoodTable },
    data() {
      return {
        openedPreviewCardId: null,
        paginationOptions: {
          enabled: true,
          perPage: 15,
          position: 'top',
          jumpToFirstOrLast: true,
          nextLabel: "вперед",
          prevLabel: "назад",
          rowsPerPageLabel: "Карт на странице",
          ofLabel: "из",
          allLabel: "Все",
        },
        searchOptions: {
          enabled: true,
          trigger: "enter",
          placeholder: "Найти в scryfall",
          searchFn: "",
        },
        columns: [
          {
            field: "quantity",
            label: "Количество",
            type: "number",
          },
          {
            field: "name",
            label: "Название",
            filterOptions: {
              enabled: true,
              placeholder: "Поиск по названию",
              trigger: "enter"
            }
          },
          {
            field: "set",
            label: "Издание"
          },
          {
            field: "quality",
            label: "Качество"
          },
          {
            field: "language",
            label: "Язык"
          },
          {
            field: "extra",
            label: "Особенности"
          },
          {
            field: "price",
            label: "Цена"
          },
          {
            field: "actions",
            label: ""
          }
        ]
      }
    },
    methods: {
      togglePreview(cardId) {
        this.$data.openedPreviewCardId = this.$data.openedPreviewCardId === cardId
          ? null
          : cardId
      },

      addToCart(card) {
        this.$store.dispatch('cards/addToCart', card);
      },

      handleSearch({ searchTerm }) {
        this.$store.dispatch("cards/searchOnScryfall", searchTerm);
      },

      handleChangePage({ currentPage }) {
        this.$store.commit('cards/setCurrentPage', currentPage)
      },

      handleChangePageSize({ currentPage, currentPerPage }) {
        this.$store.commit('cards/setPageSize', { currentPage, pageSize: currentPerPage })
      },

      handleColumnFilter(params) {
        this.$store.commit('cards/setFilters', params.columnFilters)
      }
    },
    computed: {
      ...mapState('cards', {
        isOpen: 'isTableOpen',
      }),
      ...mapGetters('cards', {
        cards: 'filtered',
        total: 'total',
      }),
    }
  }
</script>

<style scoped>
  .previewButton {
    cursor: pointer;

  }
  .previewButton:hover {
    color: var(--informational-dark);
  }
</style>
