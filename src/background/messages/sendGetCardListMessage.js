import { GET_CARD_LIST } from '../const/messages';

export default () => browser.runtime.sendMessage({
  type: GET_CARD_LIST
});
