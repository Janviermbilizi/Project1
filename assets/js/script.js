$(document).ready(function() {
  $("#search").on("click", function() {
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
  $("#todoform").on("submit", function(event) {
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
      $("#temp").text("Tempeture : " + response.main.temp + " °F");
      $("#hum").text("Humidity: " + response.main.humidity + " %");
      $("#windy").text("Wind Speed: " + response.wind.speed + " MPH");
      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);
      $("#search-input").val("");
    });
  });
  $("#search").on("click", function() {
    event.preventDefault();
    console.log("button was clicked");
    let cityInput = $('#search-input').val();
    console.log(cityInput);
    
    
    let corsURL = "https://cors-anywhere.herokuapp.com/";
    var myKey = config.MY_KEY;
    let queryURL = corsURL + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + cityInput + "+attraction&key=" + myKey;
    console.log(queryURL);
    
    //ajax call for Google Place(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      
      
      localStorage.setItem("city search", cityInput);
      var citySearchStore = localStorage.getItem("city search");
      
      //making the photo reference URL
      let photoRef = response.results[0].photos[0].photo_reference;
      let photoRef1 = response.results[1].photos[0].photo_reference;
      let photoRef2 = response.results[2].photos[0].photo_reference;
      console.log(photoRef);
      let photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
      let photoURL2 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef1 + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
      let photoURL3 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef2 + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
      
      console.log(photoURL);
      console.log(photoURL2);
      console.log(photoURL3);
      
      //posting the images from the photo reference url to the Div's
      let cardImg1 = $("<img>");
      cardImg1.attr("src", photoURL);
      let cardImg2 = $("<img>");
      cardImg2.attr("src", photoURL2);
      let cardImg3 = $("<img>");
      cardImg3.attr("src", photoURL3);
      $("#card-image1").empty().append(cardImg1);
      $("#card-image2").empty().append(cardImg2);
      $("#card-image3").empty().append(cardImg3);
      
      //making the name reference URL
      let nameRef = response.results[0].name;
      let nameRef1 = response.results[1].name;
      let nameRef2 = response.results[2].name;
      console.log(nameRef);
      //posting the names to the card content
      $("#card-content1").text(nameRef);
      $("#card-content2").text(nameRef1);
      $("#card-content3").text(nameRef2);
      
    });
  });

  //CURRENCY EXCHANGE 
  function currency() {
    var queryURL3 = "https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=4ff5af938e7a12f2b755";
   
    $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function (response) {
     var currencyName = $("<span>").val()
     
     console.log(response);
  });
    
  }
  currency();
});

// Building the URL we need to query the Google Place(queryURL) & Google Places Photos(queryURL2)

// $(document).ready(function() {
//   $("#search").on("click", function() {
//     event.preventDefault();
//     console.log("button was clicked");
//     let cityInput = $('#search-input').val();
//     console.log(cityInput);
    
    
//     let corsURL = "https://cors-anywhere.herokuapp.com/";
//     var myKey = config.MY_KEY;
//     let queryURL = corsURL + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + cityInput + "+attraction&key=" + myKey;
//     console.log(queryURL);
    
//     //ajax call for Google Place(queryURL)
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {
//       console.log(response);
      
      
//       localStorage.setItem("city search", cityInput);
//       var citySearchStore = localStorage.getItem("city search");
      
//       //making the photo reference URL
//       let photoRef = response.results[0].photos[0].photo_reference;
//       let photoRef1 = response.results[1].photos[0].photo_reference;
//       let photoRef2 = response.results[2].photos[0].photo_reference;
//       console.log(photoRef);
//       let photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
//       let photoURL2 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef1 + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
//       let photoURL3 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=310&photoreference=" + photoRef2 + "&key=AIzaSyATrEzyvsK5KT2oZryXoBBUnN-zG70758M";
      
//       console.log(photoURL);
//       console.log(photoURL2);
//       console.log(photoURL3);
      
//       //posting the images from the photo reference url to the Div's
//       let cardImg1 = $("<img>");
//       cardImg1.attr("src", photoURL);
//       let cardImg2 = $("<img>");
//       cardImg2.attr("src", photoURL2);
//       let cardImg3 = $("<img>");
//       cardImg3.attr("src", photoURL3);
//       $("#card-image1").empty().append(cardImg1);
//       $("#card-image2").empty().append(cardImg2);
//       $("#card-image3").empty().append(cardImg3);
      
//       //making the name reference URL
//       let nameRef = response.results[0].name;
//       let nameRef1 = response.results[1].name;
//       let nameRef2 = response.results[2].name;
//       console.log(nameRef);
//       //posting the names to the card content
//       $("#card-content1").text(nameRef);
//       $("#card-content2").text(nameRef1);
//       $("#card-content3").text(nameRef2);
      
//     });
//   });
//     }); 
  

  
