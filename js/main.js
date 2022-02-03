const panel = document.querySelectorAll(".boton");

panel.forEach((p) => {
  p.addEventListener("click", () => {
    showText(p);
  });
});

function showText(p) {
  const data = document.getElementById(p.dataset.panel);
  data.classList.toggle("active");
}

const nav = document.getElementById("mynav");
const navItems = document.querySelectorAll(".nav-item-text");
const logo = document.querySelector(".rotate");

window.onscroll = function () {
  console.log(window.innerWidth);
  if (window.innerWidth > 0) {
    if (window.scrollY > 300) {
      nav.classList.remove("bg-transparent");
      nav.classList.add("bg-white");
      navItems.forEach((item) => {
        item.classList.remove("text-white");
        item.classList.add("text-blue-primary");
      });
      logo.src = "./images/coronavirus.png";
      console.log(logo);
    } else {
      nav.classList.remove("bg-white");
      nav.classList.add("bg-transparent");
      navItems.forEach((item) => {
        item.classList.remove("text-blue-primary");
        item.classList.add("text-white");
      });
      logo.src = "./images/coronavirus_white.png";
    }
  } else if (window.innerWidth <= 990) {
    // nav.classList.remove("bg-white");
    // nav.classList.remove("bg-transparent");
    // nav.classList.add("bg-dark");
  }
};
