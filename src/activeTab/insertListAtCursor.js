import msgGetCardList from "../messages/msgGetCardList";
import getCardLine from "../utils/getCardLine";
import getCardListWithTotal from '../utils/getCardListWithTotal';

msgGetCardList().then(({ cardList }) => {
  let sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      getCardListWithTotal(cardList).reverse().forEach(card => {
        const div = document.createElement('div');
        div.textContent = getCardLine(card);
        range.insertNode(div);
      });
    }
  }
});