
var API_ID = "0842aa43";
var APIKey = "8c6fc20d5643b0a16e951c9afc6b5d7b";

var queryURL = "https://api.edamam.com/search?q=Lunch&app_id=${42aa43}&app_key={8c6fc20d5643b0a16e951c9afc6b5d7b}&from=0&to=3&balenced";

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (responce) {
        console.log(responce);

    })