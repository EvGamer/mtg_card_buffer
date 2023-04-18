<template>
  <IpsButton @click.prevent="toggleTable">
    {{ tableButtonText }}
  </IpsButton>
</template>

<script>
  import { CardDisplayMode } from '../../../const';
  import IpsButton from '../../components/IpsButton.vue';

  export default {
    name: "BtnToggleCardTable",
    components: { IpsButton },
    methods: {
      toggleTable() {
        console.log('toggle table')
        this.$store.dispatch("cards/toggleCardDisplay", CardDisplayMode.table);
      }
    },
    computed: {
      tableButtonText() {
        return this.$store.state.cards.displayMode === CardDisplayMode.table
          ? "Скрыть таблицу карт"
          : "Показать таблицу карт";
      }
    }
  }
</script>
