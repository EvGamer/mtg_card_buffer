import msgGetCardList from "../messages/msgGetCardList";

msgGetCardList().then(({ cardList }) => {
  let sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      
      cardList.forEach(e => {
        const div = document.createElement('div');
        const content = `${e.count} ${e.name}`
        div.textContent = (e.price
          ? `${content} ${e.price}`
          : content
        );
        range.insertNode(div);
      });
    }
  }
});