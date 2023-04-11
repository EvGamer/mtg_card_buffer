<template>
  <div>
    <VueGoodTable
      v-if="isOpen"
      :rows="cards"
      :columns="columns"
      :pagination-options="paginationOptions"
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
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </VueGoodTable>
  </div>
</template>

<script>
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
        ]
      }
    },
    methods: {
      togglePreview(cardId) {
        this.$data.openedPreviewCardId = this.$data.openedPreviewCardId === cardId
          ? null
          : cardId
      }
    },
    computed: {
      cards() {
        return this.$store.state.cards;
      },
      isOpen() {
        return this.$store.state.isTableOpen;
      }
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
