import { SELECT_CARD } from "../const/messages";

export default selectedCardId => browser.runtime.sendMessage({
  type: SELECT_CARD,
  payload: { selectedCardId }
})
