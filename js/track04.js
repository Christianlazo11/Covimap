// Metodos para Realizar la petición a la api y asi poder pintar los datos en el html

//Obtenemos la barra lateral superior
const bar_lateral = document.getElementById("barra_info_superior");
//Obtenemos la barra de paises
const barra_paises = document.getElementById("barra_paises");
//Obtenmos
const selectCountries = document.getElementById("select_countries");

const countryTabs = document.getElementById("track04_tabs");

const url = "https://disease.sh/v3/covid-19/countries";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    pintarBarra(data);
  });

function pintarBarra(data) {
  // console.log(data.cases);
  let bar_sup = "";

  let totalCase = 0;
  let totalCaseToday = 0;
  let activeCase = 0;
  let recoveredCase = 0;
  let recoveredCaseToday = 0;
  let deathCase = 0;
  let deathCaseToday = 0;
  let arrayCountries = [];

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

  bar_sup = `<div class="card border-0 bg-tracker-pink p-3 mb-3 d-flex flex-row align-items-center justify-content-between total-case">
  <p class="mb-0 me-4 text-blue-primary fw-bold">Total Case</p>
  <span class="text-secondary letter-button-tracker">+${totalCaseToday}</span>
  <span class="fs-3 text-danger fw-bold">${totalCase}</span>
  </div>
  <div class="card border-0 bg-tracker-pink2 p-3 mb-3 d-flex flex-row align-items-center justify-content-between active-case"
  >
  <p class="mb-0 me-4 text-blue-primary fw-bold">Active Case</p>
  <span class="fs-3 text-orange fw-bold">${activeCase}</span></div>
  <div class="card border-0 bg-tracker-green p-3 mb-3 d-flex flex-row align-items-center justify-content-between recovered-case">
  <p class="mb-0 me-4 text-blue-primary fw-bold">Recovered Case</p>
  <span class="text-secondary letter-button-tracker">+${recoveredCaseToday}</span>
  <span class="fs-3 text-success fw-bold">${recoveredCase}</span>
  </div>
  <div class="card border-0 bg-tracker-blue p-3 mb-3 d-flex flex-row align-items-center justify-content-between deaths-case">
  <p class="mb-0 me-4 text-blue-primary fw-bold">Deaths Case</p>
  <span class="text-secondary letter-button-tracker">+${deathCaseToday}</span>
  <span class="fs-3 text-primary fw-bold">${deathCase}</span>
  </div>`;

  bar_lateral.innerHTML = bar_sup;
  pintarPaises(data);
  getDataCountry("USA");
  getFlags(data);
  //   getCountries(arrayCountries);
}

function pintarPaises(data) {
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
    <div class="card d-flex flex-row justify-content-between align-items-center p-2 shadow-sm border-1 countries mb-2">
      <div class="d-flex flex-row justify-content-center align-items-center">
        <img class="img-countries me-2" src="${newData[i].countryInfo.flag}" alt="fly"/>
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

function getFlags(data) {
  const myTabs = [
    { country: "USA", flag: "" },
    { country: "Spain", flag: "" },
    { country: "Italy", flag: "" },
    { country: "India", flag: "" },
    { country: "UK", flag: "" },
    { country: "France", flag: "" },
    { country: "Germany", flag: "" },
    { country: "Russia", flag: "" },
    { country: "Turkey", flag: "" },
  ];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < myTabs.length; j++) {
      if (data[i].country === myTabs[j].country) {
        myTabs[j].flag = data[i].countryInfo.flag;
      }
    }
  }

  printTabs(myTabs);
}

function printTabs(data) {
  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `<div class="card border-0 d-flex flex-row flex-wrap me-3 align-items-center card-flag mb-3 tabCard" data-tab="${data[i].country}">
    <img src="${data[i].flag}" alt="flag" class="me-2" />
    <span class="text-dark">${data[i].country}</span>
    </div>`;
  }

  countryTabs.innerHTML = body;
  addEvents();
}

function addEvents() {
  const tabs = document.querySelectorAll(".tabCard");
  tabs.forEach((element) => {
    element.addEventListener("click", () => {
      cleanActive(tabs);
      getDataContries(element);
    });
  });
}

function cleanActive(tabs) {
  tabs.forEach((element) => {
    if (element.classList.contains("active-tab")) {
      element.classList.remove("active-tab");
    }
  });
}

function getDataCountry(country) {
  fetch(`${url}/${country}`)
    .then((response) => response.json())
    .then((data) => {
      printDataCountries(data);
    });
}

function getDataContries(country) {
  country.classList.add("active-tab");
  fetch(`${url}/${country.dataset.tab}`)
    .then((response) => response.json())
    .then((data) => {
      printDataCountries(data);
    });
}

function printDataCountries(data) {
  const cardTabsInfo = document.getElementById("track04_cards");
  let body = `<div class="row">
  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">Total Cases</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-blue-primary">
          ${data.cases}
        </p>
      </div>
      <img src="./images/icons/covid-blue.svg" alt="covis" />
    </div>
  </div>

  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">Total Deaths</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-danger">
          ${data.deaths}
        </p>
      </div>
      <img src="./images/icons/covid-red.svg" alt="covis" />
    </div>
  </div>

  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">Total Recovered</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-success">
          ${data.recovered}
        </p>
      </div>
      <img src="./images/icons/covid-green.svg" alt="covis" />
    </div>
  </div>

  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">Total Active</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-primary">
          ${data.active}
        </p>
      </div>
      <img src="./images/icons/covid-blue.svg" alt="covis" />
    </div>
  </div>

  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">New Cases</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-orange">
          ${0}
        </p>
      </div>
      <img src="./images/icons/covid-orange.svg" alt="covis" />
    </div>
  </div>

  <div
    class="card col-12 col-sm-12 col-md-4 col-lg-3 col-3 p-2 bg-transparent border-0 card-animation mb-1"
  >
    <div class="card border-0 card-total-cases p-2">
      <div
        class="d-flex justify-content-start align-items-center p-2 border-bottom"
      >
        <h1 class="ms-2 fs-5">New Deaths</h1>
      </div>
      <div
        class="d-flex justify-content-start align-items-center p-2"
      >
        <p class="ms-2 fs-2 mb-0 fw-bold text-darkred">
          ${0}
        </p>
      </div>
      <img src="./images/icons/covid-redark.svg" alt="covis" />
    </div>
  </div>
</div>`;

  cardTabsInfo.innerHTML = body;
}
