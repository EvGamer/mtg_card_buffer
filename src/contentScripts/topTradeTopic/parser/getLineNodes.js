export function getLineNodes(cardLink) {
  const nodes = [];

  let firstNode = cardLink;
  while (firstNode.previousSibling && firstNode.previousSibling.tagName !== "BR") {
    firstNode = firstNode.previousSibling;
  }

  let node = firstNode;
  while (node && node.tagName !== "BR") {
    nodes.push(node);
    node = node.nextSibling;
  }

  return nodes;
}
