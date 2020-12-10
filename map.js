const mapLink = "https://maps.googleapis.com/maps/api/js?key=" + mapCode + "&callback=initMap";

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById(map), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}