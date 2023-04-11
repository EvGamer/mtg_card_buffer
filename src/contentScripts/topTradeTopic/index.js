import { Toolbar, CardTable } from "./instances";


function createAppContainer(tag, id) {
  const element = document.createElement(tag);
  element.id = `mtgCardBuffer_${id}`;
  return element;
}

const firstPost = document.querySelector("#comments .cPost");

const topicHeaderElement = document.querySelector('#ipsLayout_mainArea>.ipsPageHeader');

const shareButtonElement = topicHeaderElement.querySelector(".ipsShareButton")

const toolbarContainer = createAppContainer('li', 'toolbar');
shareButtonElement.after(toolbarContainer)
new Toolbar().$mount(toolbarContainer);

const cardTableContainer = createAppContainer('div', 'cardTable');


topicHeaderElement.after(cardTableContainer);

new CardTable().$mount(cardTableContainer);

