// var map;
// var infowindow;
// var lat = '';
// var lng = '';
// var name = '';
// var zipCode = "90210";

// function geoCodeMe() {
//   geocoder.geocode( { 'address': zipCode}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       lat = results[0].geometry.location.lat();
//       lng = results[0].geometry.location.lng();

//       var pyrmont = {lat: lat, lng: lng};

//       map = new google.maps.Map(document.getElementById('map'), {
//         center: pyrmont,
//         zoom: 13
//       });

//       infowindow = new google.maps.InfoWindow();
//       var service = new google.maps.places.PlacesService(map);
//       service.nearbySearch({
//         location: pyrmont,
//         radius: 15000,
//         type: ['movie_theater']
//       }, callback);
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }


// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//     console.log('You clicked on place:' + placeId);
//   });
/*
  ClickEventHandler.prototype.handleClick = function(event) {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {
      console.log('You clicked on place:' + event.placeId);

      // Calling e.stop() on the event prevents the default info window from
      // showing.
      // If you call stop here when there is no placeId you will prevent some
      // other map click event handlers from receiving the event.
      event.stop();
      this.getPlaceInformation(event.placeId);
    }
  };
*/ 
// }

// function initMap() {
//   geocoder = new google.maps.Geocoder();
//   geoCodeMe();
  
// }

// Testing->
function initialize() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(38.8862447, -77.02158380000003),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);

  geocoder = new google.maps.Geocoder;

  //keep a reference to the original setPosition-function
  var fx = google.maps.InfoWindow.prototype.setPosition;

  //override the built-in setPosition-method
  google.maps.InfoWindow.prototype.setPosition = function() {

    //this property isn't documented, but as it seems
    //it's only defined for InfoWindows opened on POI's
    if (this.logAsInternal) {
      google.maps.event.addListenerOnce(this, 'map_changed', function() {
        var map = this.getMap();

        //the infoWindow will be opened, usually after a click on a POI
        if (map) {

          //trigger the click
          google.maps.event.trigger(map, 'click', {
            latLng: this.getPosition()
          });
        }
      });
    }
    //call the original setPosition-method
    fx.apply(this, arguments);
  };

  google.maps.event.addListener(map, 'click', function(e) {
    //alert('clicked @' + e.latLng.toString())
    geocoder.geocode({
      'location': e.latLng
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {

          alert('place id: ' + results[0].place_id);


        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });

  });
}

google.maps.event.addDomListener(window, 'load', initialize);

// Testing Ends....

$("#submitModal").on("click", function() {
  $("#movieGen").html("<center>Click for a New Movie</center>");

  name = $("#userName").val();
  zipCode = $("#zipCode").val();
  
  initMap();
  $(".pageHeader").show();
  $(".map_container").show();
  $(".titleButton").hide();
})

  // var icons = ["../media/icon001.jpg", "../media/icon002.jpg", "../media/icon003.jpg", "../media/icon004.jpg", "../media/icon005.jpg", "../media/icon006.jpg", "../media/icon007.jpg"];
  // var socialValue = ["https://www.facebook.com", "https://plus.google.com", "https://www.linkedin.com", "https://www.instagram.com", "https://www.pinterest.com", "https://www.youtube.com", "https://www.twitter.com"];

  // for (var i = 0; i < icons.length; i++) {
  //   var imageIcons = $("<img>");
  //   imageIcons.addClass("social-image");
  //   imageIcons.attr("src", icons[i]);
  //   // imageIcons.attr("src", socialValue[i]);
  //   $("#socialMedia").append(imageIcons);
  // }