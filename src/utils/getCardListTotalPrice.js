export default list => list.reduce((a, e) => a + e.count * e.price, 0);