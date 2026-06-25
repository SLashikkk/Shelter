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

export async function initSlider() {
  allPets = await initPetsData();
  renderSlider(allPets);
}