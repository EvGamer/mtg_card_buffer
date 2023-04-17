<template>
  <div>
    <CardTable v-if="isTableOpen" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CardTable from './components/CardTable.vue';

  export default {
    components: { CardTable },
    computed: {
      ...mapGetters('cards', ['isTableOpen'])
    }
  }
</script>
