$(document).ready(function () {

    var apiKey = "dd9d4a44fb97bef6dc58a6e1d73a0aa1";
    var appID = "f5efa17f"


    $("#search-btn").on("click", function () {
        var searchTerm = $("#inputSearchTerm").val();
        var resultsNo = $("#results-num").val();

        console.log(searchTerm);
        console.log(resultsNo);

        var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appID + "&app_key=" + apiKey;

        var cdbURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // console.log(response);
            console.log(response.hits);
            // console.log(response.hits[0].recipe.label);

            var results = response.hits

            for (var i = 0; i < resultsNo; i++) {

                var recipeCard = $('<div class="uk-card uk-card-default"></div>');
                var recBody = $('<div class="uk-card-body"></div>');


                //  console.log(results[i].recipe.label);

                var recTitle = $('<h8 class="uk-card-title"></h8>').text((i + 1) + '\u00A0' + results[i].recipe.label);

                var recTime = $('<p> class="uk-card-text"></p>').text(results[i].recipe.totalTime + " minutes");
                var recImg = $("<br />" + '<img src=' + results[i].recipe.image + '>');
                var recLink = $('<a class="uk-button uk-button-text"></a>').text("See Full Recipe");
                recLink.attr("href", results[i].recipe.shareAs)


                // recipeCard.append(recBody);
                //$("#results-display").append(recipeCard);

                //var drinkName = "";

                $.ajax({
                    url: cdbURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response.drinks[0].strDrink);
                    //var drink = response.drinks[0].strDrink;
                    var drinkName = $('<p class="uk-card-text"></p>').text("Pair with: " + response.drinks[0].strDrink);
                    recBody.append(drinkName);


                });

                recBody.append(recTitle);
                recBody.append(recImg);
                recBody.append(recTime);
                recBody.append(recLink);
                // recBody.append(drinkName);
                recipeCard.append(recBody);
                $("#results-display").append(recipeCard);
                $("#results-display").append("<br>");


            }

        });

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });

});


