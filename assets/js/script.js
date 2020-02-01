$(document).ready(function () {
  $("#search").on("click", function () {
    event.preventDefault();
    console.log("button was clicked");
    var cityInput = $("#search-input").val();

    console.log(cityInput);
  });

  // TO-DO LIST
  var todos = ["Book a hotel", "Rent a car", "Download a map"];
  renderTodos();

  // create a check list
  function renderTodos() {
    $("#todo-list").empty();
    for (i = 0; i < todos.length; i++) {
      var lableDiv = $("<div>").addClass("todoBox");
      var labelList = $("<label>");
      var lableInput = $("<input>").attr("type", "checkbox");
      lableInput.addClass("strikethrough");
      var lableSpan = $("<span>").text(todos[i]);
      lableDiv.append(labelList);
      labelList.append(lableInput, lableSpan);
      $("#todo-list").append(lableDiv);
    }
  }
  // add new element to checklist
  $("#todoform").on("submit", function (event) {
    event.preventDefault();

    var todoInput = $("#todo-text")
      .val()
      .trim();
    if (todoInput === "") {
      return;
    }

    todos.push(todoInput);
    todoInput = $("#todo-text").val("");

    renderTodos();
  });

  //Weather content
  $("#search").on("click", function (event) {
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
    $.ajax({ url: queryURL, type: "GET" }).then(function (response) {
      var icon = $("<img>");
      var iconImg = response.weather[0].icon;
      icon.attr("src", "https://openweathermap.org/img/wn/" + iconImg + "@2x.png");
      icon.attr("width",100);
      $("#icon").html(icon);
      $(".current-city").html(response.name);
     
      $("#date").text(currentDate);
      $("#temp").text("Tempeture : " + response.main.temp + " °F");
      $("#hum").text("Humidity: " + response.main.humidity + " %");
      $("#windy").text("Wind Speed: " + response.wind.speed + " MPH");
      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);
      $("#search-input").val("");
    });
  });

  // ATTRACTIONS
  $("#search").on("click", function () {
    event.preventDefault();

    let cityInput = $("#search-input").val();


    let corsURL = "https://cors-anywhere.herokuapp.com/";
    var myKey = config.MY_KEY;
    let queryURL =
      corsURL +
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      cityInput +
      "+attraction&key=" +
      myKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {


      localStorage.setItem("city search", cityInput);
      var citySearchStore = localStorage.getItem("city search");

      //making the photo reference URL
      let photoRef = response.results[0].photos[0].photo_reference;
      let photoRef1 = response.results[1].photos[0].photo_reference;
      let photoRef2 = response.results[2].photos[0].photo_reference;

      let photoURL =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" +
        photoRef +
        "&key=" + myKey;
      let photoURL2 =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" +
        photoRef1 +
        "&key=" + myKey;
      let photoURL3 =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" +
        photoRef2 +
        "&key=" + myKey;

      //posting the images from the photo reference url to the Div's
      let cardImg1 = $("<img>");
      cardImg1.attr("src", photoURL);
      let cardImg2 = $("<img>");
      cardImg2.attr("src", photoURL2);
      let cardImg3 = $("<img>");
      cardImg3.attr("src", photoURL3);
      $("#card-image1")
        .empty()
        .append(cardImg1);
      $("#card-image2")
        .empty()
        .append(cardImg2);
      $("#card-image3")
        .empty()
        .append(cardImg3);

      //making the name reference URL
      let nameRef = response.results[0].name;
      let nameRef1 = response.results[1].name;
      let nameRef2 = response.results[2].name;
      console.log(nameRef);
      //posting the names to the card content
      $("#card-content1").text(nameRef);
      $("#card-content2").text(nameRef1);
      $("#card-content3").text(nameRef2);

      airoportSearch(cityInput);

    });
  });


function airoportSearch(cityInput){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text=" + cityInput,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
      "x-rapidapi-key": "6d5cf5c180mshb8b063a3d796c01p16a795jsnc128322bf4f8"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#airoprt").empty();
    for (i = 0; i < response.length; i++) {
      var airportName = response[i].name;
      var airoportCode = response[i].code;
      var air = airoportURL (airoportCode);
      
      var airportList = $("<li>").text(airportName);
      var airoprtPhoneSpot = $("<button>").addClass("btn");
      console.log("air :" + air);
      airoprtPhoneSpot.text("Visit Airport site");
      airportList.append(airoprtPhoneSpot);
      $("#airoprt").append(airportList);

      console.log(airportName);

    }
  
  });
}

function airoportURL (airoportCode){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://airport-info.p.rapidapi.com/airport?iata=" + airoportCode,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "airport-info.p.rapidapi.com",
      "x-rapidapi-key": "6d5cf5c180mshb8b063a3d796c01p16a795jsnc128322bf4f8"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response)
    var airportNewName =response.name;
    var airoprtWebsite = response.website;
    var airoprtPhone = response.phone;
    console.log(airportNewName);
    console.log(airoprtWebsite);
    console.log(airoprtPhone);
    return airoprtPhone;
  });
}
 

  });


