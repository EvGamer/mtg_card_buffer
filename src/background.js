import uniqueId from 'lodash/uniqueId';
import { ADD_CARD, PASTE_CARD_LIST } from './background/const/contextMenu';
import { GET_CARD_LIST, ADD_CARD_TO_POPUP, UPDATE_CARD_LIST } from './background/const/messages';

browser.contextMenus.create(
  {
    id: ADD_CARD,
    title: "Добавить карту в список",
    contexts: ["selection", "link"]
  },
);

browser.contextMenus.create(
  {
    id: PASTE_CARD_LIST,
    title: "Вставить список карт",
    contexts: ["editable"],
  }
)

let cardList = [{
  id: uniqueId('back_mtg_card'),
  name: 'plains',
  count: 1,
  price: 0,
}];

const switchHandlers = (typeField, handlers) => (action, ...args) => {
  const handler = handlers[action[typeField]];
  if (handler) handler(action, ...args);
}

browser.contextMenus.onClicked.addListener(switchHandlers('menuItemId', {
  [ADD_CARD] (info, tab) {
    console.log(info);
    const card = {
      id: uniqueId('back_mtg_card'),
      name: info.linkText || info.selectionText,
      count: 1,
      price: 0,
    }
    cardList.push(card)
    browser.runtime.sendMessage({
      type: ADD_CARD_TO_POPUP,
      payload: card,
    })
  },
  async [PASTE_CARD_LIST] (info, tab) {
    browser.tabs.executeScript(
      tab.id,
      { file: 'insertListAtCursor.bundle.js' },
    )
  }
}));

browser.runtime.onMessage.addListener(switchHandlers('type', {
  [GET_CARD_LIST](message, sender, sendResponse) {
    sendResponse(cardList);
  },
  [UPDATE_CARD_LIST](message) {
    console.log(message);
    cardList = message.payload;
  }
}))