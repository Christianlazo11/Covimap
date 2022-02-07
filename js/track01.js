const loader = document.querySelector("#loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// Esta sera la funcion que se llamara al iniciar la aplicación en este caso pintara los datos de afghanistan
window.onload = () => {
  InitialCountry();
};
function InitialCountry() {
  fetch(`${url}/Afghanistan`)
    .then((response) => response.json())
    .then((data) => {
      printDataCountry(data);
    });
}

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

// Metodos para Realizar la petición a la api y asi poder pintar los datos en el html

//Obtenemos la barra lateral superior
const bar_lateral = document.getElementById("barra_info_superior");
//Obtenemos la barra de paises
const barra_paises = document.getElementById("barra_paises");
//Obtenmos
const selectCountries = document.getElementById("select_countries");
const update = document.getElementById("update");

//Creamos una url de donde vamos a obtener los paises
const url = "https://disease.sh/v3/covid-19/countries";

let totalCaseGlobal = 0;
let totalRecoveredGlobal = 0;
let totalDeathsglobal = 0;
let totalNewDeathsGlobal = 0;

//Realizamos la petición para obtener los datos
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    //Le pasamos la funcion para pintar los datos
    pintarBarra(data);
  });

function pintarBarra(data) {
  // console.log(data.cases);
  //Creamos la variable donde vamos a guardar cada elemento del html
  let bar_sup = "";

  //Estas variables las utilizamos para obtener los datos totales de los datos
  let totalCase = 0;
  let totalCaseToday = 0;
  let activeCase = 0;
  let recoveredCase = 0;
  let recoveredCaseToday = 0;
  let deathCase = 0;
  let deathCaseToday = 0;
  let arrayCountries = [];

  //Recorremos el array para llenar los datos
  for (let i = 0; i < data.length; i++) {
    arrayCountries.push(data[i].country);
    totalCase += data[i].cases;
    totalCaseToday += data[i].todayCases;
    activeCase += data[i].active;
    recoveredCase += data[i].recovered;
    recoveredCaseToday += data[i].todayRecovered;
    deathCase += data[i].deaths;
    deathCaseToday += data[i].todayDeaths;
  }

  //Estas Variables Globales las usamos para poder acceder desde otras funciones a estos valores
  totalCaseGlobal = totalCase;
  totalRecoveredGlobal = recoveredCase;
  totalDeathsglobal = deathCase;
  totalNewDeathsGlobal = deathCaseToday;

  bar_sup = `<div
  class="card border-0 bg-tracker-pink p-3 mb-3 d-flex flex-row align-items-center justify-content-between total-case"
  >
  <p class="mb-0 me-4 text-blue-primary fw-bold">Total Case</p>
  <span class="text-secondary letter-button-tracker"
    >+${totalCaseToday}</span
  >
  <span class="fs-3 text-danger fw-bold">${totalCase}</span>
  </div>
  <div
  class="card border-0 bg-tracker-pink2 p-3 mb-3 d-flex flex-row align-items-center justify-content-between active-case"
  >
  <p class="mb-0 me-4 text-blue-primary fw-bold">Active Case</p>
  <span class="fs-3 text-orange fw-bold">${activeCase}</span>
  </div>
  <div
  class="card border-0 bg-tracker-green p-3 mb-3 d-flex flex-row align-items-center justify-content-between recovered-case"
  >
  <p class="mb-0 me-4 text-blue-primary fw-bold">Recovered Case</p>
  <span class="text-secondary letter-button-tracker">+${recoveredCaseToday}</span>
  <span class="fs-3 text-success fw-bold">${recoveredCase}</span>
  </div>
  <div
  class="card border-0 bg-tracker-blue p-3 mb-3 d-flex flex-row align-items-center justify-content-between deaths-case"
  >
  <p class="mb-0 me-4 text-blue-primary fw-bold">Deaths Case</p>
  <span class="text-secondary letter-button-tracker">+${deathCaseToday}</span>
  <span class="fs-3 text-primary fw-bold">${deathCase}</span>
  </div>`;

  //Creamos las varialbes para obtener la fecha actual
  let today = new Date();
  let todayDate =
    months[today.getMonth() + 1] +
    " " +
    today.getDate() +
    "," +
    today.getFullYear();
  //le pasamos los datos para agregarlos al Dom
  bar_lateral.innerHTML = bar_sup;
  pintarPaises(data);
  getCountries(arrayCountries);
  printDate(todayDate);
}

function pintarPaises(data) {
  //Utilizamos el metodo sort para ordenar los resultados de menos a mayor y asi obtener los mayores
  data.sort((a1, a2) => {
    if (a1.cases < a2.cases) {
      return -1;
    } else if (a1.cases > a2.cases) {
      return 1;
    } else {
      return 0;
    }
  });
  let newData = data.slice(data.length - 10, data.length);

  let countries = "";

  for (let i = 0; i < newData.length; i++) {
    countries += `
  <div
    class="card d-flex flex-row justify-content-between align-items-center p-2 shadow-sm border-1 countries mb-2"
  >
    <div
      class="d-flex flex-row justify-content-center align-items-center"
    >
      <img
        class="img-countries me-2"
        src="${newData[i].countryInfo.flag}"
        alt="fly"
      />
      <p class="mb-0">${newData[i].country}</p>
    </div>
    <div>
      <p class="mb-0 text-blue-primary">${newData[i].cases}</p>
    </div>
  </div>
</div>
</div>`;
  }
  barra_paises.innerHTML = countries;
}

//Obtenemos loa paises para agregarlos al select
function getCountries(data) {
  let textCountries = "";

  for (let i = 0; i < data.length; i++) {
    textCountries += `<option value="${data[i]}">${data[i]}</option>`;
  }

  selectCountries.innerHTML = textCountries;
}
//Esta funcion la utilizamos para obtener el pais y toda su información
function khowCountry() {
  fetch(`${url}/${selectCountries.value}`)
    .then((response) => response.json())
    .then((data) => {
      printDataCountry(data);
    });
}

//Esta funcion la usamos para crear el html y agregarlo a la pagina por medio del innerHtml en este caso es toda la informacion del pais
function printDataCountry(data) {
  const cardC = document.getElementById("cardCountry");
  let body = `<div class="row h-100  ">
  <div class="col-12 col-md-12 col-lg-6">
    <div class="row">
      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3 ">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">Total Cases</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-blue-primary">${data.cases}</p>
          </div>
          <img src="./images/icons/covid-blue.svg" alt="covis">
        </div>
      </div>

      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3 ">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">Total Deaths</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-danger">${data.deaths}</p>
          </div>
          <img src="./images/icons/covid-red.svg" alt="covis">
        </div>
      </div>

      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">Total Recovered</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-success">${data.recovered}</p>
          </div>
          <img src="./images/icons/covid-green.svg" alt="covis">
        </div>
      </div>

      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">Total Active</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-primary">${data.active}</p>
          </div>
          <img src="./images/icons/covid-blue.svg" alt="covis">
        </div>
      </div>

      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">New Cases</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-orange">0</p>
          </div>
          <img src="./images/icons/covid-orange.svg" alt="covis">
        </div>
      </div>

      <div class="card col-md-4 col-lg-6 col-6 p-2 bg-transparent border-0 card-animation mb-3">
        <div class="card border-0 card-total-cases p-2">
          <div class="d-flex justify-content-start align-items-center p-2 border-bottom">
            <h7 class="ms-2 fs-5">New Deaths</h7>
          </div>
          <div class="d-flex justify-content-start align-items-center p-2">
            <p class=" ms-2 fs-2 mb-0 fw-bold text-darkred">0</p>
          </div>
          <img src="./images/icons/covid-redark.svg" alt="covis">
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-12 col-lg-6 bg-danger">
    <p>Mapa</p>
  </div>
</div>

<div class="row mt-3">
  <div class="col-12 row">
    <div class="card col-6 col-md-3 border-0 card-animation02">
      <div class="card row d-flex flex-row pt-4 pb-4 border-0 border-end">
        <div class="col-4">
          <img src="./images/icons/covid-defult.svg" alt="covis">
        </div>
        <div class="col-8">
          <p class="mb-0">Confirmed</p>
          <p class="fs-5 mb-0 text-blue-primary fw-bold">${totalCaseGlobal}</p>
        </div>
      </div>
    </div>

    <div class="card col-6 col-md-3 border-0 card-animation02">
      <div class="card row d-flex flex-row pt-4 pb-4 border-0 border-end">
        <div class="col-4">
          <img src="./images/icons/covid-green.svg" alt="covis">
        </div>
        <div class="col-8">
          <p class="mb-0">Recovered</p>
          <p class="fs-5 mb-0 text-blue-primary fw-bold">${totalRecoveredGlobal}</p>
        </div>
      </div>
    </div>
    
    <div class="card col-6 col-md-3 border-0 card-animation02">
      <div class="card row d-flex flex-row pt-4 pb-4 border-0 border-end">
        <div class="col-4">
          <img src="./images/icons/covid-red.svg" alt="covis">
        </div>
        <div class="col-8">
          <p class="mb-0">Deaths</p>
          <p class="fs-5 mb-0 text-blue-primary fw-bold">${totalDeathsglobal}</p>
        </div>
      </div>
    </div>
    <div class="card col-6 col-md-3 border-0 card-animation02">
      <div class="card row d-flex flex-row pt-4 pb-4 border-0 border-end">
        <div class="col-4">
          <img src="./images/icons/covid-redark.svg" alt="covis">
        </div>
        <div class="col-8">
          <p class="mb-0">New Deaths</p>
          <p class="fs-5 mb-0 text-blue-primary fw-bold">${totalNewDeathsGlobal}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;

  //Agreamos los datos al dom del html
  cardC.innerHTML = body;
}

function printDate(data) {
  console.log(data);
  let body = `<p class="mb-0 text-dark fst-italic">Update:   <span class="text-dark">${data}</span></p> `;
  update.innerHTML = body;
}
