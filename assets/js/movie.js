
      var count = 0;
      // array of movies
      var movies = ["Moonlight", "La La Land", "Arrival", "Fences", "Hacksaw Ridge", "Hell or High Water", "Hidden Figures", "Lion", "Manchester by the Sea", "Logan", "Kong Skull Island", "John Wick Chapter 2", "xXx Return of Xander Cage", "A Dog’s Purpose", "T2 Trainspotting", "  The Lego Batman Movie", "Rings", "Fifty Shades Darker", "Bitter Harvest", "In Dubious Battle"];

  
      $("#movieGen").on("click", function() {

        if(count === movies.length - 1) {
          count = 0;
        };


        var movie = $(this).attr("data-name");
        var queryURL = "http://www.omdbapi.com/?t=" + movies[count] + "&y=&plot=short&r=json";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          movieDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          movieDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          movieDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#movies-view").empty().append(movieDiv);
          count++;

        });

      });
