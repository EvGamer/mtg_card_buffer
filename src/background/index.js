import uniqueId from 'lodash/uniqueId';
import { ADD_CARD, PASTE_CARD_LIST, SET_PRICE } from './const/contextMenu';
import {
  GET_CARD_LIST,
  ADD_CARD_TO_POPUP,
  UPDATE_CARD_LIST,
  SELECT_CARD
} from './const/messages';

const menu = [
  {
    id: ADD_CARD,
    title: "Добавить карту в список",
    contexts: ["selection", "link"],
  },
  {
    id: PASTE_CARD_LIST,
    title: "Вставить список карт",
    contexts: ["editable"],
  },
  {
    id: SET_PRICE,
    title: "Присвоить карте выделенную цену",
    contexts: ["selection"],
  },
]

menu.forEach(menuItem => browser.contextMenus.create(menuItem));

let cardList = [];
let selectedCardId = null;

const switchHandlers = (typeField, handlers) => (action, ...args) => {
  const handler = handlers[action[typeField]];
  if (handler) handler(action, ...args);
}

browser.contextMenus.onClicked.addListener(switchHandlers('menuItemId', {
  [ADD_CARD] (info, tab) {
    const card = {
      id: uniqueId('back_mtg_card'),
      name: info.linkText || info.selectionText,
      count: 1,
      price: null,
    }
    cardList.push(card);
    selectedCardId = card.id;
    browser.runtime.sendMessage({
      type: ADD_CARD_TO_POPUP,
      payload: { card, selectedCardId },
    })
  },
  [SET_PRICE] (info, tab) {
    const card = cardList.find(e => e.id === selectedCardId);
    const price = Number(info.selectionText);
    console.log('price', (card || {}).name, price);
    if (card && card.price !== price) {
      card.price = price;
    }
  },
  [PASTE_CARD_LIST] (info, tab) {
    browser.tabs.executeScript(
      tab.id,
      { file: 'insertListAtCursor.bundle.js' },
    )
  }
}));

browser.runtime.onMessage.addListener(switchHandlers('type', {
  [GET_CARD_LIST](message, sender, sendResponse) {
    sendResponse({ cardList, selectedCardId });
  },
  [SELECT_CARD](message) {
    selectedCardId = message.payload.selectedCardId;
  },
  [UPDATE_CARD_LIST](message) {
    console.log(message);
    cardList = message.payload;
  }
}))