const rightArrow = document.querySelector('.fa-arrow-right');
const leftArrow  = document.querySelector('.fa-arrow-left');
const slider     = document.querySelector('.slider');

if (rightArrow && slider) {
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({ left: 1520, behavior: 'smooth' });
  });
}

if (leftArrow && slider) {
  leftArrow.addEventListener('click', () => {
    slider.scrollBy({ left: -1520, behavior: 'smooth' });
  });
}

window.addEventListener("scroll", () => {
  const long   = document.querySelector(".long");
  const img1   = document.querySelector(".image1");
  const img2   = document.querySelector(".image2");
  const img3   = document.querySelector(".image3");

  if (long) long.style.marginTop = window.scrollY * 2 + "px";
  if (img1) {
    img1.style.marginLeft = window.scrollY * 1.2 + "px";
    img1.style.marginBottom = window.scrollY * 1.2 + "px";
  }
  if (img2) {
    img2.style.marginRight = window.scrollY * 1.2 + "px";
    img2.style.marginBottom = window.scrollY * 1.2 + "px";
  }
  if (img3) img3.style.marginTop = window.scrollY * 0.4 + "px";
});
