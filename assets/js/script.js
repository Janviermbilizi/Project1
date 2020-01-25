$("#search").on('click', function () {
    event.preventDefault();
    console.log("button was clicked");
    var cityInput = $('#search-input').val();

    console.log(cityInput);
});