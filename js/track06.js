// Metodos para Realizar la petición a la api y asi poder pintar los datos en el html

//Obtenemos la barra lateral superior
const bar_lateral = document.getElementById("barra_info_superior");
//Obtenemos la barra de paises
const barra_paises = document.getElementById("barra_paises");
//Obtenmos
const selectCountries = document.getElementById("select_countries");

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

  bar_lateral.innerHTML = bar_sup;
  pintarPaises(data);
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
  newData = newData.reverse();

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
