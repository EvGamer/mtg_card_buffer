import getCardListTotalPrice from './getCardListTotalPrice'

export default cardList => [
  ...cardList,
  { name: 'Сумма', price: getCardListTotalPrice(cardList) },
]