export function openPopup(pet) {
  const overlay = document.querySelector(".popup__overlay");
  if (!overlay || !pet) return;

  const img = overlay.querySelector(".popup__img");
  const name = overlay.querySelector(".popup__name");
  const typeBreed = overlay.querySelector(".popup__type__breed");
  const description = overlay.querySelector(".popup__description");
  const age = overlay.querySelector(".popup__age");
  const inoculations = overlay.querySelector(".popup__inoculations");
  const diseases = overlay.querySelector(".popup__diseases");
  const parasites = overlay.querySelector(".popup__parasites");
}

