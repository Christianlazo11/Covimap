//Funcion para Realizar la peticion a la api
getData();

setInterval(() => {
  getData();
}, 8000);

//Colocamos las varibales para cargar un preloader al iniciar la pagina
const loader = document.querySelector("#loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

//Metodos y variables para mostrar las preguntas frecuentes
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

// Metodos y variables para cambiar el color de la barra de navegación y sus enlaces
// const nav = document.getElementById("mynav");
// const navItems = document.querySelectorAll(".nav-item-text");
// const logo = document.querySelector(".rotate");

// window.onscroll = function () {
//   if (window.innerWidth > 0) {
//     if (window.scrollY > 300) {
//       console.log("Entro");
//       nav.classList.remove("bg-transparent");
//       nav.classList.add("bg-white");
//       navItems.forEach((item) => {
//         item.classList.remove("text-white");
//         item.classList.add("text-blue-primary");
//       });
//       logo.src = "./images/coronavirus.png";
//     } else {
//       nav.classList.remove("bg-white");
//       nav.classList.add("bg-transparent");
//       navItems.forEach((item) => {
//         item.classList.remove("text-blue-primary");
//         item.classList.add("text-white");
//       });
//       logo.src = "./images/coronavirus_white.png";
//     }
//   } else if (window.innerWidth <= 990) {
//     // nav.classList.remove("bg-white");
//     // nav.classList.remove("bg-transparent");
//     // nav.classList.add("bg-dark");
//   }
// };

// Funcion que realiza la peticion a la apo
function getData() {
  //Creamos una url de donde vamos a obtener los paises
  const url = "https://disease.sh/v3/covid-19/countries";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getRandomData(data);
    });
}

// Funcion que obtiene un pais random de la informacion que devolvio la api
function getRandomData(data) {
  let countryRandom = Math.floor(Math.random() * (data.length - 1 + 1) + 1);

  let dataCountryRandom = data[countryRandom];
  printCardCountry(dataCountryRandom);
}
//Funcion que pinta la informacion en el html
function printCardCountry(data) {
  const bodyCard = document.getElementById("card-banner");
  let body = `<div class="card-banner-content d-flex flex-row justify-content-between">
  <div class="d-flex justify-content-center align-items-center ">
    <img src="${data.countryInfo.flag}" alt="flag">
  </div>

  <div>
    <h1 class="text-danger fs-3">${data.cases}</h1>
    <div class="d-flex justify-content-around align-items-center">
      <i class="fas fa-chart-line text-danger fs-5 me-2"></i>
      <span class="botton-orange me-2">${data.active}</span>
      <span class="botton-green me-2">${data.recovered}</span>
    </div>
  </div>
  </div>`;

  bodyCard.innerHTML = body;
}

//Evento para que al darle click a la targeta esta cambie de pais
const bodyCardEvent = document.getElementById("card-banner");
bodyCardEvent.onclick = () => {
  getData();
};
