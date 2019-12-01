import { SELECT_CARD } from "../background/const/messages";

export default selectedCardId => browser.runtime.sendMessage({
  type: SELECT_CARD,
  payload: { selectedCardId }
})
