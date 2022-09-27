// Change h2 to today's date
let today = new Date();

let date = today.getDate();
let year = today.getFullYear();
let minutes = today.getMinutes();
let hour = today.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];

let updateDate = document.querySelector("#updated-date");
updateDate.innerHTML = `${day}, ${month} ${date} ${year}, ${hour}:${minutes}`;

// Change City name in the title

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let cityHTML = document.querySelector("#titleCity");
  cityHTML.innerHTML = input.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

// BONUS FEATURE:conver to from ºC to ºF and vice-versa

function switchTemp(event) {
  event.preventDefault();

  let tempHTML = document.querySelector("#todays-temp");
  let metric = document.querySelector("#celsius-link");
  let otherMetric = document.querySelector("a#farenheit-link");

  if (metric.innerHTML === "°C") {
    let celsius = document.querySelector("#todays-temp").innerHTML;
    console.log(celsius);
    let farenheit = Math.round(1.8 * celsius + 32);
    tempHTML.innerHTML = farenheit;
    metric.innerHTML = "°F";
    otherMetric.innerHTML = "°C";
  } else {
    let farenheit = document.querySelector("#todays-temp").innerHTML;
    let newcalc = Math.round((farenheit - 32) / 1.8);
    tempHTML.innerHTML = newcalc;
    metric.innerHTML = "°C";
    otherMetric.innerHTML = "°F";
  }
}

let changeMetric = document.querySelector("#farenheit-link");
changeMetric.addEventListener("click", switchTemp);

// Get temperature in city
function getWeather(response) {
  let cityTemp = document.querySelector("#todays-temp");
  let temp = Math.round(response.data.main.temp);
  cityTemp.innerHTML = temp;
}

let apiKey = "f81d9102f55557fbaab58670b27ef077";

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

//Current Location button
function changeGeo() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showWeather(response) {
  let cityTemp = document.querySelector("#todays-temp");
  let titleCity = document.querySelector("#titleCity");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = temperature;
  titleCity.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", changeGeo);
