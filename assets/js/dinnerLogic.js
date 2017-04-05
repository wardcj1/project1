var map;
var infowindow;
var lat = '';
var lng = '';
var name = '';
var zipCode = "90210";

function geoCodeMe() {
  geocoder = new google.maps.Geocoder;

  geocoder.geocode( { 'address': zipCode}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();

      var latAndLong = {lat: lat, lng: lng};

      map = new google.maps.Map(document.getElementById('map'), {
        center: latAndLong,
        zoom: 10
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: latAndLong,
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
    console.log(place);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.long());
  });
}

// Testing->
function initialize() {
  geoCodeMe()
}

// Testing Ends....

$("#submitModal").on("click", function() {
  $("#movieGen").html("<center>Click for a New Movie</center>");

  name = $("#userName").val();
  zipCode = $("#zipCode").val();
  
  initialize();
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