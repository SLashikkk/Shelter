import { initPetsData } from "./getData.js";
import { openPopup, initPopupClose } from "./popup.js";

let allPets = [];

function renderPetsPage(petsToRender) {
  const cardsBox = document.querySelector(".cards__box"); 
  const template = document.getElementById("pet__card__template");

  if (!cardsBox || !template || !petsToRender) return;
  cardsBox.innerHTML = "";

  const fragment = document.createDocumentFragment();

  petsToRender.forEach((pet) => {
    const cardClone = template.content.cloneNode(true);
    const cardElement =
      cardClone.querySelector(".card") || cardClone.firstElementChild;

    if (cardElement) {
      cardElement.dataset.id = pet.id;
    }

    const img = cardClone.querySelector(".card__img");
    const name = cardClone.querySelector(".card__name");

    name.textContent = pet.name;
    const filename = pet.img.split("/").pop();
    img.src = `./img/pets-${filename}`;
    img.alt = pet.name;

    fragment.appendChild(cardClone);
  });

  cardsBox.appendChild(fragment);
}

export async function initPetsPage() {
  allPets = await initPetsData();
  renderPetsPage(allPets);
  initPopupClose();
  initPetsCardClicks();
}

function initPetsCardClicks() {
  const cardsBox = document.querySelector(".cards__box");
  if (!cardsBox) return;

  cardsBox.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card || card.dataset.id === undefined) return;

    const petId = Number(card.dataset.id);
    const selectedPet = allPets.find((pet) => pet.id === petId);

    if (selectedPet) {
      openPopup(selectedPet);
    }
  });
}