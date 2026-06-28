import { initPetsData } from "./getData.js";
import { openPopup, initPopupClose } from "./popup.js";


let allPets = [];
let currenPets = [];

export function renderSlider(
  petsToShow,
  isAnimation = false,
  direction = "next",
) {
  const sliderLine = document.querySelector(".our-friends__slider-track");
  const template = document.getElementById("pet__card__template");

  if (!sliderLine || !template || !petsToShow) return;
  if (!isAnimation) {
    sliderLine.innerHTML = "";
  }

  const fragment = document.createDocumentFragment();

  petsToShow.forEach((pet) => {
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
  if (isAnimation && direction === "prev") {
    sliderLine.prepend(fragment);
  } else {
    sliderLine.appendChild(fragment);
  }
}

function getCardsCount() {
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

function generateRandomPets() {
  const count = getCardsCount();
  let nextPets = [];

  while (nextPets.length < count) {
    const randomIndex = Math.floor(Math.random() * allPets.length);
    const randomPet = allPets[randomIndex];

    if (!nextPets.includes(randomPet) && !currenPets.includes(randomPet)) {
      nextPets.push(randomPet);
    }
  }
  return nextPets;
}

export async function initSlider() {
  allPets = await initPetsData();
  currenPets = generateRandomPets();
  renderSlider(currenPets);
  initPopupClose();
}

const btnPrev = document.querySelector(".our-friends__arrow--left");
const btnNext = document.querySelector(".our-friends__arrow--right");
const sliderLine = document.querySelector(".our-friends__slider-track");

let isAnimating = false;

btnNext.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  const nextPets = generateRandomPets();

  const width = document.querySelector(
    ".our-friends__slider-wrapper",
  ).offsetWidth;
  renderSlider(nextPets, true);

  const count = getCardsCount();
  const firstOldCard = sliderLine.children[0];
  const firstNewCard = sliderLine.children[count];
  const exactOffset =
    firstNewCard.getBoundingClientRect().left -
    firstOldCard.getBoundingClientRect().left;

  sliderLine.style.transition = "transform 0.5s ease-in-out";
  sliderLine.style.transform = `translateX(-${exactOffset}px)`;

  setTimeout(() => {
    sliderLine.style.transition = "none";
    renderSlider(nextPets, false);
    sliderLine.style.transform = "translateX(0)";
    currenPets = nextPets;
    isAnimating = false;
  }, 500);
});

btnPrev.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  const nextPets = generateRandomPets();
  renderSlider(nextPets, true, "prev");

  const count = getCardsCount();
  const firstOldCard = sliderLine.children[count];
  const firstNewCard = sliderLine.children[0];

  const exactOffset =
    firstOldCard.getBoundingClientRect().left -
    firstNewCard.getBoundingClientRect().left;

  sliderLine.style.transition = "none";
  sliderLine.style.transform = `translateX(-${exactOffset}px)`;
  sliderLine.offsetHeight;
  sliderLine.style.transition = "transform 0.5s ease-in-out";
  sliderLine.style.transform = "translateX(0)";

  setTimeout(() => {
    sliderLine.style.transition = "none";
    renderSlider(nextPets, false);

    currenPets = nextPets;
    isAnimating = false;
  }, 500);
});



sliderLine.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card || card.dataset.id === undefined) return;

  const petId = Number(card.dataset.id);
  const selectedPet = allPets.find((pet) => pet.id === petId);

  if (selectedPet) {
    openPopup(selectedPet);
  }
});