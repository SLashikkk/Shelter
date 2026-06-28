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
    img.src = `img/pets-${filename}`;
    img.alt = pet.name;

    fragment.appendChild(cardClone);
  });

  cardsBox.appendChild(fragment);
    cardsBox.classList.remove("fade-in");
    cardsBox.offsetHeight;
    cardsBox.classList.add("fade-in");
}

export async function initPetsPage() {
  const originalPets = await initPetsData();
  allPets = generate48Pets(originalPets);

  getPaginationConfig();
  renderCurrentPage();

  updatePaginationButtons();
  initPaginationClicks(); 

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

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function generate48Pets(originalPets) {
  let result = [];

  for (let i = 0; i < 6; i++) {
    const shuffledChunk = shuffle(originalPets);

    if (result.length > 0) {
      const lastElementOfResult = result[result.length - 1];
      const firstElementOfNewChunk = shuffledChunk[0];

      if (lastElementOfResult.id === firstElementOfNewChunk.id) {
        [shuffledChunk[0], shuffledChunk[1]] = [
          shuffledChunk[1],
          shuffledChunk[0],
        ];
      }
    }

    result = result.concat(shuffledChunk);
  }

  return result;
}

let currentPage = 1;
let itemsPerPage = 8;
let totalPages = 6;

function getPaginationConfig() {
  const width = window.innerWidth;

  if (width >= 1280) {
    itemsPerPage = 8;
    totalPages = 6;
  } else if (width >= 768) {
    itemsPerPage = 6;
    totalPages = 8;
  } else {
    itemsPerPage = 3;
    totalPages = 16;
  }
}

function handleResize() {
  const previousItemsPerPage = itemsPerPage;
  getPaginationConfig();

  if (itemsPerPage !== previousItemsPerPage) {
    currentPage = 1;
    renderCurrentPage();
    updatePaginationButtons();
  }
}

let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 100);
});

function renderCurrentPage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allPets.slice(start, end);
  renderPetsPage(pageItems);
}

const btnFirst = document.querySelector(".pagination__btn--double-left");
const btnPrev = document.querySelector(".pagination__btn--left");
const pageIndicator = document.querySelector(".pagination__btn--current");
const btnNext = document.querySelector(".pagination__btn--right");
const btnLast = document.querySelector(".pagination__btn--double-right");

function updatePaginationButtons() {
  if (!btnFirst || !btnPrev || !pageIndicator || !btnNext || !btnLast) return;

  pageIndicator.textContent = currentPage;

  if (currentPage === 1) {
    btnFirst.disabled = true;
    btnPrev.disabled = true;
  } else {
    btnFirst.disabled = false;
    btnPrev.disabled = false;
  }

  if (currentPage === totalPages) {
    btnNext.disabled = true;
    btnLast.disabled = true;
  } else {
    btnNext.disabled = false;
    btnLast.disabled = false;
  }
}

function initPaginationClicks() {
  if (!btnFirst || !btnPrev || !btnNext || !btnLast) return;

  btnNext.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
      updatePaginationButtons();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
      updatePaginationButtons();
    }
  });

  btnFirst.addEventListener("click", () => {
    if (currentPage !== 1) {
      currentPage = 1;
      renderCurrentPage();
      updatePaginationButtons();
    }
  });

  btnLast.addEventListener("click", () => {
    if (currentPage !== totalPages) {
      currentPage = totalPages;
      renderCurrentPage();
      updatePaginationButtons();
    }
  });
}
