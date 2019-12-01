import uniqueId from 'lodash/uniqueId';

const CARD_RE = /^(?:^\d|^\w)*?(?:(\d+?)\s+?)?(.*?)(?:\s(\d+?))?$/mg;

const mapMatch = match => ({
  id: uniqueId('parsed_card_id'),
  count: match[1] ? Number(match[1]) : 1,
  name: match[2],
  price: match[3] ? Number(match[3]) : 0
})

export default function parseCardList(text) {
  const list = [];
  let match = null;
  while ((match = CARD_RE.exec(text)) !== null) {
    list.push(mapMatch(match));
  }
  return list;
}
