//variables
let appId = "6172545e4622f2da8158831c962a6c7f";
let units = "imperial";
let searchMethod;

//function confirming accurate zip
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

//search function
function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}

//set background based on weather
function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("images/clear.jpeg")';
      break;

    case "Clouds":
      document.body.style.backgroundImage = 'url("images/cloudy.jpeg")';
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("images/rain.jpeg")';
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("images/storm.jpeg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("images/snow.jpeg")';
      break;

    default:
      document.body.style.backgroundImage = 'url("images/default.jpg")';
      break;
  }
  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");

  // Use json to grab icon image
//   weatherIcon.src =
//     "http://openweathermap.org/img/w/" +
//     resultFromServer.weather[0].icon +
//     ".png";
  //Description of icon
  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176";
  windSpeedElement.innerHTML =
    "Winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clienWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});
