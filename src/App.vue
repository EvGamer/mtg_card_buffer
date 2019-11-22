<template>
  <div>
    <div class='title'>Selected Cards</div>
    <div
      class="item"
      v-for="card in cards"
      v-bind:key="card.id"
    >
      <input type="number" v-model="card.count">
      <input type="text" v-model="card.name">
      <input type="number" v-model="card.price">
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    cards: [
      { id: 1, name: 'Merciless Eviction', count: 1, price: 60 },
      { id: 2, name: 'Aquire', count: 1, price: 150 },
      { id: 3, name: 'Pllains', count: 1, price: 5 },
    ]
  })
}
</script>