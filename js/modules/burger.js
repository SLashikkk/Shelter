export function initBurger() {
  const burgerBtn = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".header__menu");
  const bodyLock = document.querySelector("body");
  const overlay = document.querySelector(".overlay");
  const menuLinks = document.querySelectorAll(".header__menu a");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    bodyLock.classList.toggle("lock");
    overlay.classList.toggle("active");
  });

  function closeMenu() {
    burgerBtn.classList.remove("active");
    burgerMenu.classList.remove("active");
    bodyLock.classList.remove("lock");
    overlay.classList.remove("active");
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  
  overlay.addEventListener("click", closeMenu);
}


