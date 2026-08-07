// Dom selected elements

const domElements = {
  playground: document.getElementById("playground"),
  newCardsWrapper: document.getElementById("new-cards")
}

// style

const styles = {
  newElementCard: "h-fit text-gray w-fit px-5 py-2 border border-zinc-300 bg-linear-to-t from-sky-100 to-sky-200 rounded cursor-pointer hover:scale-105 hover:shadow transition ease-linear duration-75"
}

// logic

const defaultCardMap = new Map([
  ["🔥 Fire", "🔥 Fire"],
  ["🌱 Earth", "🌱 Earth"],
  ["💦 Water", "💦 Water"],
  ["💨 Air", "💨 Air"],
])

// console.log(defaultCardMap);

/**
 * @param {string} key 
 * @param {string} value 
 */
function createNewElement(key, value) {
  const divElement = document.createElement("div");
  divElement.className = styles.newElementCard;
  divElement.textContent = value;
  divElement.id = key;

  divElement.addEventListener("click", () => {

  })


  return divElement;
}


function renderNewCards() {
  domElements.newCardsWrapper.innerHTML = "";
  const cards = [];

  defaultCardMap.forEach((value, key) => {
    cards.push(createNewElement(key, value))
  })

  domElements.newCardsWrapper.append(...cards);

}


renderNewCards();