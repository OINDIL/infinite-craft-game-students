// Dom selected elements

import { generateOutput } from "./ai";

const domElements = {
  playground: document.getElementById("playground"),
  newCardsWrapper: document.getElementById("new-cards")
}

// style

const styles = {
  newElementCard: "h-fit text-gray w-fit px-5 py-2 border border-zinc-300 bg-linear-to-t from-sky-100 to-sky-200 rounded cursor-pointer hover:scale-105 hover:shadow transition ease-linear duration-75"
}

// logic
let playGroundElementsArray = [];
let arrayForAi = [];
let cloneCounter = 0;
const defaultCardMap = new Map([
  ["🔥 Fire", "🔥 Fire"],
  ["🌱 Earth", "🌱 Earth"],
  ["💦 Water", "💦 Water"],
  ["💨 Air", "💨 Air"],
])

/**
 * @param {HTMLDivElement} element 
 */
function renderPlaygroundElements(element) {
  domElements.playground.appendChild(element);
}

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
    const newClonedDivEle = document.createElement("div");
    cloneCounter++;
    newClonedDivEle.textContent = value;
    newClonedDivEle.className = styles.newElementCard;
    newClonedDivEle.id = `clone-${cloneCounter}`;




    newClonedDivEle.addEventListener('click', async (e) => {
      const previousInnerText = e.target.innerText;

      if (arrayForAi.length >= 2) {
        return alert("Only 2 elements can be added at once");
      }

      const selectedInnerText = `✅ ${previousInnerText}`;

      e.target.innerText = selectedInnerText;
      arrayForAi.push(selectedInnerText);
      console.log(arrayForAi)



      if (arrayForAi.length === 2) {

        const res = await generateOutput(arrayForAi);

        console.log(res)

        /**
         * @type {{success: boolean, output: string}}
        */
        const data = JSON.parse(res);

        if (data.success) {
          defaultCardMap.set(data.output, data.output);
          renderNewCards();

        }
      }

      arrayForAi = [];

    })

    newClonedDivEle.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      /**
       * @type {string} previousInnerText
       */
      const previousInnerText = e.target.innerText;

      if (previousInnerText.indexOf("✅") === -1) return;

      const nonSelectedInnerText = previousInnerText.split("✅")[1].trim();



      e.target.innerText = nonSelectedInnerText;

    })

    renderPlaygroundElements(newClonedDivEle);
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