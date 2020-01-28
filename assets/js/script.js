$("#search").on("click", function(event) {
  event.preventDefault();
  var cityInput = $("#search-input").val();
  var currentDate = moment().format("LL");
  var apiKey = "af82d5a25061873accbbaaf6cb52f8c5";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&appid=" +
    apiKey;
  //get API data
  $.ajax({ url: queryURL, type: "GET" }).then(function(response) {
    $(".current-city").text(cityInput + " (" + currentDate + ")");
    $("#temp").text("Tempeture (F): " + response.main.temp);
    $("#hum").text("Humidity: " + response.main.humidity);
    $("#windy").text("Wind Speed: " + response.wind.speed);
    // Converts the temp to Kelvin with the below formula
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(".tempF").text("Temperature (Kelvin) " + tempF);
    cityInput("");
  });
});
