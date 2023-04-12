const RE_SEPARATOR = /,?\s/;
const RE_PRICE = /^(\d+)[рР]?(?:уб)?/;

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
    const lineElement = cardLink.parentElement;

    // if it's not going straight after quantity - skip it, because it could match set name like "Weatherlight"
    if (lineElement.childNodes[1] !== cardLink) return;

    const quantity = Number(lineElement.childNodes[0].textContent.trim());

    // if line doesn't start with quantity, it's not a card listing
    if (Number.isNaN(quantity)) return;

    const card = {
      id: i,
      name: cardLink.textContent,
      imageUrl: cardLink.href,
      quantity,
    }

    const cardInfoText = convertNodesToText(lineElement.childNodes, 2);

    cardInfoText.split(RE_SEPARATOR).forEach(word => {
      if (!card.price) {
        const priceMatch = word.match(RE_PRICE);
        if (priceMatch) card.price = Number(priceMatch[1]);
      }
    })

    cards.push(card);
  })

  return cards;
}
