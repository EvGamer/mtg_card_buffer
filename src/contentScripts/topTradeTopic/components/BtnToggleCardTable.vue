<template>
  <button 
    class="ipsButton ipsButton_verySmall ipsButton_narrow ipsButton_light"
    @click.prevent="toggleTable"
  >
    Карты
  </button>
</template>

<script>
  export default {
    name: "BtnToggleCardTable",
    methods: {
      toggleTable() {
        this.$store.commit("toggleTable");
      }
    }
  }
</script>