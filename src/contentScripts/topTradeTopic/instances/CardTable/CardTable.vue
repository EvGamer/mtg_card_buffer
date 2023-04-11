<template>
  <div>
    <VueGoodTable
      v-if="isOpen"
      :rows="cards"
      :columns="columns"
      :pagination-options="paginationOptions"
      class="vgt-table condensed table"
    />
  </div>
</template>

<script>
  import { VueGoodTable } from "vue-good-table";

  import 'vue-good-table/dist/vue-good-table.css';

  export default {
    components: { VueGoodTable },
    data() {
      return {
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
            label: "Название"
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
  .table {
    font-size: 14px;
    margin-bottom: 15px;
  }
</style>
