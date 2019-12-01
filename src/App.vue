

<template>
  <div class='frame'>
    <div class='title'>Selected Cards</div>
    <div
      class="item"
      v-for="card in cards"
      :key="card.id"
    >
      <Counter
        :value="card.count"
        @changeField="card.count = $event"
      />
      <Input
        :value="card.name"
        class="name"
        @changeField="card.name = $event"
      />
      <Input
        :value="card.price"
        class="price"
        @changeField="card.price = $event"
      />
      <button class="remove" @click="remove(card.id)">X</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  GET_CARD_LIST,
  ADD_CARD_TO_POPUP,
  UPDATE_CARD_LIST,
} from './background/const/messages';
import msgGetCardList from './messages/msgGetCardList'
import Input from './components/Input.vue';
import Counter from './components/Counter.vue';


export default {
  name: "App",
  components: { Input, Counter },
  async mounted() {
    browser.runtime.onMessage.addListener(this.addCardHandler)
    const response = await msgGetCardList();
    this.cards = response;
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
    },
    remove(id) {
      this.cards = this.cards.filter(e => e.id !== id);
    }
  },
  watch: {
    cards: {
      handler(val) {
        browser.runtime.sendMessage({
          type: UPDATE_CARD_LIST,
          payload: val,
        });
      },
      deep: true,
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

.remove {
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  color: #c1d9d1;
}

.remove:focus {
  outline: none;
}
</style>
