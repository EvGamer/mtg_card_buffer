

<template>
  <div class='frame'>
    <div class='title'>Selected Cards</div>
    <div
      class="item"
      v-for="card in cards"
      :key="card.id"
    >
      <Input :value="card.count" />
      <Input :value="card.name" class="name" />
      <Input :value="card.price" class="price" />
    </div>
  </div>
</template>

<script>
import { GET_CARD_LIST, ADD_CARD_TO_POPUP } from './background/const/messages';
import Input from './components/Input.vue';

export default {
  name: "App",
  components: { Input },
  async mounted() {
    browser.runtime.onMessage.addListener(this.addCardHandler)
    const response = await browser.runtime.sendMessage({
      type: GET_CARD_LIST
    });
    this.cards = response;
    console.log('polo');
  },
  beforeDestroy() {
    browser.runtime.onMessage.removeListener(this.addCardHandler);
  },
  data: () => ({
    cards: []
  }),
  methods: {
    addCardHandler(message) {
      if(message.type != ADD_CARD_TO_POPUP) return;
      this.cards.push(message.payload);
    }
  }
}
</script>

<style>
body {
  color: #c1d9d1;
  background-color: #4f5c58;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
}
</style>

<style scoped>
.title {
  margin-bottom: 4px;
  margin-left: 10px;
}

.item {
  display:flex;
}

.price {
  min-width: 30px;
}

.name {
  flex: 1;
  min-width: 60px;
}
</style>
