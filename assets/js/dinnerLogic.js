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
  });
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
