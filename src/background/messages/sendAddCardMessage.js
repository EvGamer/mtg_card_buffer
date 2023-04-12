import { ADD_CARD } from '../const/messages';

export default (card) => browser.runtime.sendMessage({
  type: ADD_CARD,
  payload: card,
});
