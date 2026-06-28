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

  description.textContent = pet.description;
  age.textContent = pet.age;
  typeBreed.textContent = `${pet.type} - ${pet.breed}`;

  inoculations.textContent = pet.inoculations.join(", ");
  diseases.textContent = pet.diseases.join(", ");
  parasites.textContent = pet.parasites.join(", ");

  name.textContent = pet.name;
  const filename = pet.img.split("/").pop().toLowerCase();
  img.src = `img/pets-${filename}`;
  img.alt = pet.name;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}


export function initPopupClose() {
  const overlay = document.querySelector(".popup__overlay");
  const closeBtn = document.querySelector(".popup__close");

  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}