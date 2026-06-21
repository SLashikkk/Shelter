export async function initPetsData() {
try {
  const response = await fetch("./data/pets.json");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const petsData = data.map((item, index) => ({ id: index, ...item }));
  const sliderLine = document.querySelector(".our-friends__slider-track");
  const template = document.getElementById("pet__card__template");
  if (sliderLine && template) {
    sliderLine.innerHTML = "";
    petsData.forEach((pet) => {
      const cardClone = template.content.cloneNode(true);
      const img = cardClone.querySelector(".card__img");
      const name = cardClone.querySelector(".card__name");
      const button = cardClone.querySelector(".card__button");

      name.textContent = pet.name;
      const filename = pet.img.split("/").pop();
      img.src = `./img/pets-${filename}`;
      img.alt = pet.name;
      sliderLine.appendChild(cardClone);
    });
  }
} catch (error) {
  console.error("Error fetching the pets data:", error);
}
}




