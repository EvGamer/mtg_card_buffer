<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
  export default {
    computed: {
      text() {
        return this.$store.state.isTableOpen ? "table open" : "table closed";
      }
    }
  }
</script>