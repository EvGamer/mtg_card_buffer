import { GET_CARD_LIST } from '../background/const/messages';

export default () => browser.runtime.sendMessage({
  type: GET_CARD_LIST
});