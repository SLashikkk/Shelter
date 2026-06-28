import { initBurger } from "./modules/burger.js";

document.addEventListener("DOMContentLoaded", async () => {
  initBurger();

  if (document.querySelector(".our-friends__slider-track")) {
    const { initSlider } = await import("./modules/slider.js");
    initSlider();
  }
  if (document.querySelector(".cards__box")) {
    const { initPetsPage } = await import("./modules/pets.js");
    initPetsPage();
  }
});