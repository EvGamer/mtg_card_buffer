export default e => {
  const content = e.count ? `${e.count} ${e.name}` : e.name;
  return  (e.price ? `${content} ${e.price}` : content);
}