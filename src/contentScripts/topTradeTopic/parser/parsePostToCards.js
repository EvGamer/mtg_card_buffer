import { getLineNodes } from './getLineNodes';

const RE_SEPARATOR = /,?\s/;
const RE_PRICE = /^(\d+)[рР]?(?:уб)?/;
const RE_SET = /^\(?((?:[a-z]\w{2})|(?:\w{2}[a-z])|(?:\w[a-z]\w))\)?$/i;

function convertNodesToText(childNodes, startingFrom) {
  const textContents = [];

  for (let i = startingFrom; i < childNodes.length; i++) {
    textContents.push(childNodes[i].textContent);
  }

  return textContents.join(' ');
}

export function parsePostToCards(postContentElement) {
  const cards = [];

  const cardLinks = postContentElement.querySelectorAll('.topdeck_tooltipCard');

  cardLinks.forEach((cardLink, i) => {
    const nodes = getLineNodes(cardLink);

    // if it's not going straight after quantity - skip it, because it could match set name like "Weatherlight"
    if (nodes[1] !== cardLink) return;

    const quantity = Number(nodes[0].textContent.trim());

    const card = {
      id: i,
      name: cardLink.textContent.split("//")[0],
      imageUrl: cardLink.href,
      originalLine: convertNodesToText(nodes, 0),
      quantity: Number.isNaN(quantity) ? 1 : quantity,
    }

    const cardInfoText = convertNodesToText(nodes, 2);

    cardInfoText.split(RE_SEPARATOR).forEach(word => {
      if (card.name.trim() === 'Thorn of Amethyst') {
        console.log(word);
      }
      if (!card.price) {
        const priceMatch = word.match(RE_PRICE);
        if (priceMatch) card.price = Number(priceMatch[1]);
      }

      if (!card.set) {
        const setMatch = word.trim().match(RE_SET);
        if (setMatch) card.set = setMatch[1].toLowerCase();
      }
    })

    // If card doesn't have a price, it's not a card listing, or it's incorrect
    if (!card.price) return;

    cards.push(card);
  })

  return cards;
}
