export function mapSlices(list, sliceSize, callback) {
  const results = [];

  for (let start = 0; start < list.length; start += sliceSize) {
    const end = Math.min(start + sliceSize, list.length);
    results.push(callback(list.slice(start, end), start));
  }

  return results;
}
