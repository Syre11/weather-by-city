var cityInput = document.querySelector("#cityInput");
var searchBtnEl = document.querySelector(".searchBtn");
var todayResultsEl = document.querySelector(".todayResults")
var fiveDayEl = document.querySelector(".fiveDay")
var firstDayEl = document.querySelector(".firstDay")
var secondDayEl = document.querySelector(".secondDay")
var thirdDayEl = document.querySelector(".thirdDay")
var fourthDayEl = document.querySelector(".fourthDay")
var fifthDayEl = document.querySelector(".fifthDay")


var lat = "";
var lon = "";

function getLocation() {
  //replaces spaces in user input with + to work with api url
  for (var i = 0; i < cityInput.value.length; i++) {
    cityInput.value = cityInput.value.replace(" ", "+")
    console.log (cityInput.value)
  };

  var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=e4f7fa74cca6af69d01f1e01654e6cc3'

  fetch(requestURL)
      .then(function(response) {
        return response.json();
      })
      .then(function (jsonArray) {
        console.log(jsonArray);
        lat = jsonArray[0].lat;
        lon = jsonArray[0].lon;
        getforecastApi ()
      })

  cityInput.value = cityInput.value.replace("+", " ")
}



function getforecastApi() {
  var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e4f7fa74cca6af69d01f1e01654e6cc3'

  fetch(requestURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonArray) {
    console.log(jsonArray)


    //ADDS 1ST OF 5 DAY FORECAST
    var date = document.createElement("h4");
    var momDate = moment.unix(jsonArray.list[4].dt).format("M/D/YYYY")
    date.textContent = momDate
    firstDayEl.appendChild(date);

    var symbol = document.createElement("img")
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.list[4].weather[0].icon + '@2x.png'
    firstDayEl.appendChild(symbol);

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.list[4].main.temp + " °F"
    firstDayEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.list[4].wind.speed + " MPH"
    firstDayEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.list[4].main.humidity + "%"
    firstDayEl.appendChild(humidity);


    
    //ADDS 2ND OF 5 DAY FORECAST
    var date = document.createElement("h4");
    var momDate = moment.unix(jsonArray.list[12].dt).format("M/D/YYYY")
    date.textContent = momDate
    secondDayEl.appendChild(date);

    var symbol = document.createElement("img")
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.list[12].weather[0].icon + '@2x.png'
    secondDayEl.appendChild(symbol);

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.list[12].main.temp + " °F"
    secondDayEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.list[12].wind.speed + " MPH"
    secondDayEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.list[12].main.humidity + "%"
    secondDayEl.appendChild(humidity);
    
    


    //ADDS 3RD OF 5 DAY FORECAST
    var date = document.createElement("h4");
    var momDate = moment.unix(jsonArray.list[20].dt).format("M/D/YYYY")
    date.textContent = momDate
    thirdDayEl.appendChild(date);

    var symbol = document.createElement("img")
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.list[20].weather[0].icon + '@2x.png'
    thirdDayEl.appendChild(symbol);

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.list[20].main.temp + " °F"
    thirdDayEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.list[20].wind.speed + " MPH"
    thirdDayEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.list[20].main.humidity + "%"
    thirdDayEl.appendChild(humidity); 
    
    



    //ADDS 4TH OF 5 DAY FORECAST
    var date = document.createElement("h4");
    var momDate = moment.unix(jsonArray.list[28].dt).format("M/D/YYYY")
    date.textContent = momDate
    fourthDayEl.appendChild(date);

    var symbol = document.createElement("img")
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.list[28].weather[0].icon + '@2x.png'
    fourthDayEl.appendChild(symbol);

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.list[28].main.temp + " °F"
    fourthDayEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.list[28].wind.speed + " MPH"
    fourthDayEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.list[28].main.humidity + "%"
    fourthDayEl.appendChild(humidity);     






    //ADDS 5TH OF 5 DAY FORECAST
    var date = document.createElement("h4");
    var momDate = moment.unix(jsonArray.list[36].dt).format("M/D/YYYY")
    date.textContent = momDate
    fifthDayEl.appendChild(date);

    var symbol = document.createElement("img")
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.list[36].weather[0].icon + '@2x.png'
    fifthDayEl.appendChild(symbol);

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.list[36].main.temp + " °F"
    fifthDayEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.list[36].wind.speed + " MPH"
    fifthDayEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.list[36].main.humidity + "%"
    fifthDayEl.appendChild(humidity);        
  })
}


searchBtnEl.addEventListener("click", function() {
  // getApi();
  getLocation();
});