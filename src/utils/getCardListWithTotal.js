export default cardList => [
  ...cardList,
  { name: 'Сумма', price: cardList.reduce((a, e) => a + e.price, 0) },
]