<template>
  <v-client-table v-if="isOpen" :data="cards" :columns="columns" />
</template>

<script>
  export default {
    data() {
      return {
        columns: ["quantity", "name", "set", "quality", "language", "extra", "price"]
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