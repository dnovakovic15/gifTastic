//Create a global array variable
var topics = ["Sports", "Television", "Animals", "Game of Thrones"];

//Make sure the document is ready then run the code.
$(document).ready(function(){
    createButtons();    
})

//Create the buttons
function createButtons(){

    //Clear all previous buttons
    $(".buttons").html("");

    //Create the buttons and add the appropriate classes and id's to them
    for(var i = 0; i < topics.length; i++){
        var button = $("<button>" + topics[i] + "</button>");
        button.addClass("buttonClass");
        button.attr("id", topics[i]);
        $(".buttons").append(button);
    }

    //Handle Button onClick
    $("body").on("click", ".buttonClass", function(){
        //Create random starting point 
        var offset = randomNumberGenerator();

        //Reset the .gifs html so that we clear the old gifs.
        $(".gifs").html("");

        //Create the API url
        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + this.id + "&offset=" + (offset + i) + "&api_key=Glah83UZC77bEJcW2D8WAtoWz707rDkJ&limit=10");
    
        //When the GET method of xhr is complete loop through the data and create and add gifs to the page.
        xhr.done(function(data) { 
            for(var i = 0; i < 10; i++){
                var url = data.data[i].images.fixed_height_still.url;
                var div = $("<div>");
                div.addClass("group");
                var image = $('<img src=' + url+ '>');
                image.addClass("image");
                image.attr("state", "false");
                image.attr("count", i);
                var rating = data.data[i].rating;
                var ratingDisplay = $("<p>").text("Rating: " + rating);
                ratingDisplay.addClass("rating");

                div.append(image);
                div.append(ratingDisplay);
                $(".gifs").append(div); 
            }

            //Handle the gif onClick
            $(".image").on("click", function(){
                    console.log($(this).attr("state"));
                    //Change the image src attribute so we can make the gif animated or static depending on the previous state.
                    if($(this).attr("state") == 'false'){
                        $(this).attr("src", data.data[$(this).attr("count")].images.downsized.url);
                        $(this).attr("state", "true");
                    }
                    else{
                        $(this).attr("src", data.data[$(this).attr("count")].images.fixed_height_still.url);
                        $(this).attr("state", "false");
                    }
                })
        });
    });

    //Generate a random number
    function randomNumberGenerator(){
        return Math.floor((Math.random() * 100) + 1);
    }
}

//Add a button from search input
$(".btn").on("click", function(){
        topics.push($(".form-control").val().trim());
        $(".gifs").html("");
        $(".image").off("click");
        createButtons();
    });
