//variables
let appId = "6172545e4622f2da8158831c962a6c7f";
let units = "imperial";
let searchMethod;

//function confirming accurate zip
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = "zip";
  else
  searchMethod = "q";
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

function init(resultFromServer) {
  console.log(resultFromServer);
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});
