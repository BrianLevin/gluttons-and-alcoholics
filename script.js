$(document).ready(function () {

    var apiKey = "434808133d076f2691627d135ce2efbe";
    var appID = "75913b4a"

    var queryURL = "";
    var cdbURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    var searchResults = [];

    function apiCallDisplay() {

        var resultsNo = $("#results-num").val();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // console.log(response);
            console.log(response.hits);
            // console.log(response.hits[0].recipe.label);

            results = response.hits
            var drinkCounter = 0;

            for (var i = 0; i < resultsNo; i++) {

                var recipeCard = $('<div class="uk-card uk-card-default recipe-card"></div>');
                var recBody = $('<div class="uk-card-body"></div>');
                var recTitle = $('<h8 class="uk-card-title"></h8>').text((i + 1) + '\u00A0' + results[i].recipe.label.substring(0, 50));

                var recTime = $('<p> class="uk-card-text"></p>').text("Prep time: " + results[i].recipe.totalTime + " minutes");
                var recImg = $("<br />" + '<img src=' + results[i].recipe.image + '>');

                var recIngMod = $('<a class="uk-button uk-button-default" href="#modal-center" uk-toggle>Grocery list</a><div id="modal-center" classs="uk-flex-top" uk-modal><div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical ingredients-modal"><button class="uk-modal-close-default" type="button" uk-close></button></div></div>');

                var ingredientsCard = $('<ul id=ingrd-list></ul>')

                var ingredients = results[i].recipe.ingredientLines;
                $.each(ingredients, function (index, value) {
                    console.log(value);
                    ingredientsCard.append($("<li>" + value + "</li>"));
                });

                var recLink = $("<br />" + '<a class="uk-button uk-button-text"></a>').text("See Full Recipe");

                //drink api results

                var drinkMod = $("<br />" + '<a href="#modal-example" id=drink-' + i + ' uk-toggle>DRINK</a><div id="modal-example" uk-modal><div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" id="drink-mod-body"><button class="uk-modal-close-outside" type="button" uk-close></button></div></div>');

                var recDrinkIns = $('<p class="drink-text" id=drinkIns-' + i + '></p>').text("test");


                //append food detail
                recLink.attr("href", results[i].recipe.shareAs)
                recBody.append(recTitle);
                recBody.append(recImg);
                recBody.append(recTime);

                recBody.append(recIngMod);
                //recBody.append(ingredientsCard);
                ingredientsCard.appendTo(".ingredients-modal");
                recBody.append(recLink);

                //append drink detail
                recDrinkIns.appendTo("#drink-mod-body");
                recBody.append(drinkMod);

                //append all info to card
                recipeCard.append(recBody);

                //append to display div
                $("#results-display").append(recipeCard);
                $("#results-display").append("<br>");


                $.ajax({
                    url: cdbURL,
                    method: "GET"
                }).then(function (response) {
                    //console.log(response);
                    console.log(response.drinks[0].strDrink);
                    console.log(response.drinks[0].strInstructions);
                    console.log(response.drinks[0].strDrinkThumb);


                    $("#drink-" + drinkCounter).text("Pairs well with: " + response.drinks[0].strDrink);
                    $("#drinkIns-" + drinkCounter).text("Instructions: " + response.drinks[0].strInstructions);

                    drinkCounter++;

                });

            }

        });
    };

    function showResults() {
        for (var i = 0; i < searchResults.length; i++) {
            var recipeCard = $('<div class="uk-card uk-card-default"></div>');
            var recBody = $('<div class="uk-card-body"></div>');
            var recTitle = $('<h8 class="uk-card-title"></h8>').text((i + 1) + '\u00A0' + searchResults[i].recipe.label);
            var recTime = $('<p> class="uk-card-text"></p>').text(searchResults[i].recipe.totalTime + " minutes");
            var recImg = $("<br />" + '<img class= "recipe-image" src=' + searchResults[i].recipe.image + '>');
            var recLink = $('<a class="uk-button uk-button-text"></a>').text("See Full Recipe");
            recLink.attr("href", searchResults[i].recipe.shareAs)
            recBody.append(recTitle);
            recBody.append(recImg);
            recBody.append(recTime);
            recBody.append(recLink);
            recipeCard.append(recBody);
            $("#results-display").append(recipeCard);
            $("#results-display").append("<br>");
        }
    }

    $('#other-btn').on('click', function () {
        var fsearchTerm = $("#inputSearchTerm").val().trim();
        var queryURL = "https://api.edamam.com/search?q=" + fsearchTerm + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100";
        $.ajax({
            method: 'GET',
            url: queryURL,
        })
            .then(function (response) {
                searchResults = response.hits;
                console.log(searchResults);
                showResults();
                $('input[name="dietary-restriction"]').attr('checked', false);
            });
    });


    $('input[name="dietary-restriction"]').click(function (event) {

        var checkedDietaryRestrictions = [];
        // check for all of the dietary restrictions that are checked
        $('input[name="dietary-restriction"]:checked').each(function () {
            checkedDietaryRestrictions.push($(this).val());
        });
        // checking if the healthLabels from the search result match the dietary restrictions checked
        //

        searchResults = searchResults.filter(function (searchResult) {
            console.log(searchResult.recipe.healthLabels);
            for (var i = 0; i < checkedDietaryRestrictions.length; i++) {
                console.log(checkedDietaryRestrictions[i]);
                if (searchResult.recipe.healthLabels.indexOf(checkedDietaryRestrictions[i]) !== -1) {
                    return true;
                }
            }
            return false;
        });
        $('.uk-card-default').remove();
        showResults();
    });






    $("#carnivore-btn").on("click", function () {
        var carnivoreSearch = "meat";

        queryURL = "https://api.edamam.com/search?q=" + carnivoreSearch + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100"

        apiCallDisplay();

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });


    $("#herbivore-btn").on("click", function () {
        var herbivoreSearch = "entree";

        queryURL = "https://api.edamam.com/search?q=" + herbivoreSearch + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100" + "&health=vegan"

        apiCallDisplay();

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });

    $("#glutenfree-btn").on("click", function () {
        var glutenfreeSearch = "gluten";

        queryURL = "https://api.edamam.com/search?q=" + glutenfreeSearch + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100"

        apiCallDisplay();

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });

    $("#cocktail-btn").on("click", function () {
        var cocktailSearch = "desserts";

        queryURL = "https://api.edamam.com/search?q=" + cocktailSearch + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100"

        apiCallDisplay();

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });


    $("#search-btn").on("click", function () {


        var searchTerm = $("#inputSearchTerm").val();
        var resultsNo = $("#results-num").val();

        queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appID + "&app_key=" + apiKey + "&to=100";

        apiCallDisplay();

        $("#results-display").empty();
        $("#inputSearchTerm").empty();

    });

});








