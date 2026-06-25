import { initPetsData } from "./getData.js";

let allPets = [];
let currenPets = [];

export function renderSlider(petsToShow) {
  const sliderLine = document.querySelector(".our-friends__slider-track");
  const template = document.getElementById("pet__card__template");

  if (!sliderLine || !template) return;
  sliderLine.innerHTML = "";
  petsToShow.forEach((pet) => {
    const cardClone = template.content.cloneNode(true);

    const img = cardClone.querySelector(".card__img");
    const name = cardClone.querySelector(".card__name");

    name.textContent = pet.name;

    const filename = pet.img.split("/").pop();
    img.src = `./img/pets-${filename}`;
    img.alt = pet.name;

    sliderLine.appendChild(cardClone);
  });
}

function getCardsCoutn() {
  let width = window.innerWidth;
  let count = 3;
  if (width >= 1280) {
    count = 3;
  } else if (width >= 768) {
    count = 2;
  } else {
    count = 1;
  }
  return count;
}

export async function initSlider() {
  allPets = await initPetsData();
  renderSlider(allPets);
}
