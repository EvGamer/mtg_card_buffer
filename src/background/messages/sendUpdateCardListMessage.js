import { UPDATE_CARD_LIST } from "../const/messages";

export default cardList => browser.runtime.sendMessage({
  type: UPDATE_CARD_LIST,
  payload: cardList,
});
