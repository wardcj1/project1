var map;
var infowindow;
var lat = '';
var lng = '';
var name = '';
var zipCode = "90210";

function geoCodeMe() {
  geocoder.geocode( { 'address': zipCode}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();

      var pyrmont = {lat: lat, lng: lng};

      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 13
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pyrmont,
        radius: 15000,
        type: ['movie_theater']
      }, callback);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    console.log('You clicked on place:' + placeId);
  });
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
}

function initMap() {
  geocoder = new google.maps.Geocoder();
  geoCodeMe();
  
}

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