var cityInput = document.querySelector("#cityInput");
var searchBtnEl = document.querySelector(".searchBtn");
var todayResultsEl = document.querySelector(".todayResults")
var prevSearchEl = document.querySelector(".prevSearch")
var prevSearchBtn = document.querySelector(".btn-secondary")
var fiveDayEl = document.querySelector(".fiveDay")
var firstDayEl = document.querySelector(".firstDay")
var secondDayEl = document.querySelector(".secondDay")
var thirdDayEl = document.querySelector(".thirdDay")
var fourthDayEl = document.querySelector(".fourthDay")
var fifthDayEl = document.querySelector(".fifthDay")
var resultsEl = document.querySelector(".results")

var lat = "";
var lon = "";

//hides these on load
resultsEl.setAttribute("style", "display: none")
prevSearchEl.setAttribute("style", "display: none")

//function to get lat and lon and start the getforecastApi and getTodayApi functions
function getLocation() {
  //capitalizes the first letter of each word in the city name
  var cityArray = cityInput.value.split(" ");
  for (var i = 0; i < cityArray.length; i++) {
    cityArray[i] = cityArray[i].charAt(0).toUpperCase() + cityArray[i].slice(1);
  }
  var capInput = cityArray.join(" ");
  cityInput.value = capInput

  //replaces spaces in user input with + to work with api url
  for (var i = 0; i < cityInput.value.length; i++) {
    cityInput.value = cityInput.value.replace(" ", "+")
  };

  var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=e4f7fa74cca6af69d01f1e01654e6cc3'

  fetch(requestURL)
      .then(function(response) {
        return response.json();
      })
      .then(function (jsonArray) {
        console.log(jsonArray);
        //sets lat and lon, functions need to be called within this function in order to use the variables from this function
        lat = jsonArray[0].lat;
        lon = jsonArray[0].lon;

        //stores just the city name, will reuse this whole function to re-search for data, rather than storing all of the data
        localStorage.setItem('prevCity', JSON.stringify(cityInput.value));

        var city = localStorage.getItem('prevCity')
        var storageArray = JSON.parse(localStorage.getItem('prevCity'))
        var prevCity = document.createElement("button") 
        //turns previously searched cities into buttons
        //prevents duplicating locally stored items
        console.log(cityInput.value)
        if (storageArray.indexOf(cityInput.value) == -1) {
          storageArray.push(cityInput.value);
          localStorage.setItem('prevCity', JSON.stringify(cityInput.value));
          // prevCity.textContent = cityInput.value;
          // prevSearchEl.appendChild(prevCity);
        }

        prevCity.textContent = cityInput.value;
        prevSearchEl.appendChild(prevCity);

        for(var i = 0; i < prevSearchEl.children.length-1; i++) {
          if (prevSearchEl.children[i].textContent === prevSearchEl.lastChild.textContent) {
            prevSearchEl.removeChild(prevSearchEl.lastElementChild)
          }
        }

        //adds style to each prevCity button
        for (var i=0; i < prevSearchEl.children.length; i++) {
          var child = prevSearchEl.children[i]
          child.classList.add("btn")
          child.classList.add("btn-secondary")
        }

        //adds event listener for locally stored previous searches
        if (prevCity) {
          prevCity.addEventListener('click', function() {
            // console.log(prevCity.textContent)
            cityInput.value = prevCity.textContent
            // console.log(cityInput.value)
            deleteChild()
            getLocation();
            resultsEl.setAttribute("style", "display: block")
          })
          
        }
        getforecastApi ()
        getTodayApi()
      })
  

  //shows search results elements
  prevSearchEl.setAttribute("style", "display: block")
  cityInput.value = cityInput.value.replace("+", " ")
}


//prevents showing multiple city results at once
function deleteChild() {
  var deletetodayChild = document.querySelector(".todayResults");
  deletetodayChild.innerHTML = "";
  var deletefirstdayChild = document.querySelector(".firstDay");
  deletefirstdayChild.innerHTML = "";
  var deleteseconddayChild = document.querySelector(".secondDay");
  deleteseconddayChild.innerHTML = "";
  var deletethirddayChild = document.querySelector(".thirdDay");
  deletethirddayChild.innerHTML = "";
  var deletefourthdayChild = document.querySelector(".fourthDay");
  deletefourthdayChild.innerHTML = "";
  var deletefifthdayChild = document.querySelector(".fifthDay");
  deletefifthdayChild.innerHTML = "";
}


//function to get info for 5 day forecast
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


//function to get today's weather info
function getTodayApi() {
  var requestURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e4f7fa74cca6af69d01f1e01654e6cc3'

  fetch(requestURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonArray) {
    console.log(jsonArray)

    var date = document.createElement("h3");
    var todayDate = moment.unix(jsonArray.dt).format("M/D/YYYY")
    date.textContent = jsonArray.name + " (" + todayDate + ")"
    todayResultsEl.appendChild(date);

    var symbol = document.createElement("img");
    symbol.src = 'http://openweathermap.org/img/wn/' + jsonArray.weather[0].icon + '@2x.png'
    todayResultsEl.appendChild(symbol)

    var temp = document.createElement("p")
    temp.textContent = "Temp: " + jsonArray.main.temp + " °F"
    todayResultsEl.appendChild(temp);

    var wind = document.createElement("p")
    wind.textContent = "Wind: " + jsonArray.wind.speed + " MPH"
    todayResultsEl.appendChild(wind);

    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + jsonArray.main.humidity + "%"
    todayResultsEl.appendChild(humidity);

  })
}



searchBtnEl.addEventListener("click", function() {
  deleteChild()
  getLocation();
  resultsEl.setAttribute("style", "display: block")
});
