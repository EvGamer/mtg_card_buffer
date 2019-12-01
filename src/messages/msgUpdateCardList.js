import { UPDATE_CARD_LIST } from "../background/const/messages";

export default payload => browser.runtime.sendMessage({
  type: UPDATE_CARD_LIST,
  payload,
});
