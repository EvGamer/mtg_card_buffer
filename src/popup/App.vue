

<template>
  <div class='frame'>
    <div class='title'>Выбранные карты</div>
    <div
      :class="{selected: card.id === selectedCardId}"
      @click="selectCard(card.id)"
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
        @changeField="card.price = Number($event)"
      />
      <button class="remove" @click="remove(card.id)">X</button>
    </div>
    <div class="actions">
      <div class="item">Количество: {{ totalCount }}</div>
      <div class="item">Сумма: {{ totalPrice }}</div>
    </div>
    <div class="actions">
      <button class='action' @click="cards=[]">
        Отчистить
      </button>
      <button class='action' @click="copy">
        Копировать
      </button>
      <button class='action' @click="paste">
        Вставить
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  GET_CARD_LIST,
  ADD_CARD_TO_POPUP,
  UPDATE_CARD_LIST,
} from '../background/const/messages';
import msgGetCardList from '../messages/msgGetCardList';
import msgUpdateCardList from '../messages/msgUpdateCardList';
import msgSelectCard from '../messages/msgSelectCard';
import Input from './components/Input.vue';
import Counter from './components/Counter.vue';
import getCardLine from '../utils/getCardLine';
import parseCardList from '../utils/parseCardList';
import getCardListWithTotal from '../utils/getCardListWithTotal';
import getCardListTotalPrice from '../utils/getCardListTotalPrice';

export default {
  name: "App",
  components: { Input, Counter },
  async mounted() {
    browser.runtime.onMessage.addListener(this.addCardHandler);
    const { cardList, selectedCardId } = await msgGetCardList();
    this.cards = cardList;
    this.selectedCardId = selectedCardId;
  },
  beforeDestroy() {
    browser.runtime.onMessage.removeListener(this.addCardHandler);
  },
  data: () => ({
    cards: [],
    selectedCardId: null,
  }),
  methods: {
    addCardHandler(message) {
      if(message.type != ADD_CARD_TO_POPUP) return;
      this.cards.push(message.payload.card);
    },
    selectCard(id) {
      this.selectedCardId = id;
      msgSelectCard(id);
    },
    remove(id) {
      this.cards = this.cards.filter(e => e.id !== id);
    },
    copy() {
      const toClipboard = getCardListWithTotal(this.cards).map(getCardLine).join('\n');
      navigator.clipboard.writeText(toClipboard);
    },
    async paste() {
      const text = await navigator.clipboard.readText();
      this.cards = parseCardList(text);
    }
  },
  computed: {
    totalPrice() {
      return getCardListTotalPrice(this.cards);
    },
    totalCount() {
      return this.cards.reduce((a, e) => a + e.count, 0);
    }
  },
  watch: {
    cards: {
      handler(val) {
        msgUpdateCardList(val);
      },
      deep: true,
    },

  }
}
</script>

<style>
body {
  color: #c1d9d1;
  background-color: #4f5c58;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

button {
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

button:focus {
  outline: none;
  background-color: #c1d9d11f;
}
button:hover {
  color: #ffffff;
}
button:active {
  background-color: #c1d9d134;
}
</style>

<style scoped>
.title {
  margin-bottom: 4px;
  margin-left: 10px;
}

.item {
  display:flex;
  padding: 2px;
}

.selected {
  border: 1px solid #c1d9d1;
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
  width: 20px
}

.remove:focus {
  outline: none;
}

.actions {
  margin-top: 10px;
}

.action {
  margin-right: 10px;
}
</style>
