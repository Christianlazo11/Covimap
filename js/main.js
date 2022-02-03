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
