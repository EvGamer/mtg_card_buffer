import { Toolbar, CardTable } from "./instances";

function createAppContainer(tag, id) {
  const element = document.createElement(tag);
  element.id = `mtgCardBuffer_${id}`;
  return element;
}

const firstPost = document.querySelector("#comments .cPost");

const firstPostToolbar = firstPost.querySelector(".ipsComment_tools");

const toolbarContainer = createAppContainer('li', 'toolbar');
firstPostToolbar.prepend(toolbarContainer);
new Toolbar().$mount(toolbarContainer);

const firstPostContent = firstPost.querySelector(".cPost_contentWrap");

const cardTableContainer = createAppContainer('div', 'cardTable');
firstPostContent.prepend(cardTableContainer);
new CardTable().$mount(cardTableContainer);

