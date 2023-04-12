<template>
  <button
    class="ipsButton ipsButton_verySmall ipsButton_light"
    @click.prevent="toggleTable"
  >
    {{ text }}
  </button>
</template>

<script>
  export default {
    name: "BtnToggleCardTable",
    methods: {
      toggleTable() {
        this.$store.dispatch("toggleTable");
      }
    },
    computed: {
      text() {
        return this.$store.state.cards.isTableOpen
          ? "Скрыть таблицу карт"
          : "Показать таблицу карт";
      }
    }
  }
</script>
