const firstPost = document.querySelector("#comments .cPost");

const firstPostToolbar = firstPost.querySelector(".ipsComment_tools");

const btnOpenTable = document.createElement('button');
btnOpenTable.appendChild(document.createTextNode("Карты"));
btnOpenTable.classList.add("ipsButton", "ipsButton_verySmall", "ipsButton_narrow", "ipsButton_light");

btnOpenTable.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Составляю список карт...');
})

const itemOpenTable = document.createElement('li');
itemOpenTable.appendChild(btnOpenTable);

firstPostToolbar.prepend(itemOpenTable);

