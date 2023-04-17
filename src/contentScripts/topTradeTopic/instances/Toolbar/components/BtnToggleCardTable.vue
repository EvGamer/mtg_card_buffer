<template>
  <IpsButton @click.prevent="toggleTable">
    {{ tableButtonText }}
  </IpsButton>
</template>

<script>
  import IpsButton from '../../components/IpsButton.vue';

  export default {
    name: "BtnToggleCardTable",
    components: { IpsButton },
    methods: {
      toggleTable() {
        this.$store.dispatch("cards/toggleTable");
      }
    },
    computed: {
      tableButtonText() {
        return this.$store.state.cards.isTableOpen
          ? "Скрыть таблицу карт"
          : "Показать таблицу карт";
      }
    }
  }
</script>
