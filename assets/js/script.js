var cityInput = document.querySelector("#cityInput");
var searchBtnEl = document.querySelector(".searchBtn");


function getApi() {
  //replaces spaces in user input with + to work with api url
  for (var i = 0; i < cityInput.value.length; i++) {
    cityInput.value = cityInput.value.replace(" ", "+")
    console.log (cityInput.value)
  };

  var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=e4f7fa74cca6af69d01f1e01654e6cc3'

  var lat = "";
  var lon = "";

  fetch(requestURL)
      .then(function(response) {
        return response.json();
      })
      .then(function (jsonArray) {
        console.log(jsonArray);
        // lat = jsonArray.data.lat
        // lon = jsonArray.data.lon
        //***************** */
                //***************** */
        //***************** */
        //***************** */
        //***************** */
        //***************** */
        //NEED TO FIGURE OUT HOW TO GET LAT AND LON FROM JSONARRAY
                //***************** */
        //***************** */
        //***************** */
        //***************** */
        //***************** */
        //***************** */
        console.log(jsonArray[2]);
        // console.log(lon)

      })

  requestURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + {lat} + '&lon=' + {lon} + '&appid=e4f7fa74cca6af69d01f1e01654e6cc3'


}


searchBtnEl.addEventListener("click", function() {
  getApi()
});