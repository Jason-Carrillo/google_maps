// TESTING DIRECTIONS POINT A TO B

// function initMap() {
//     directionsService = new google.maps.DirectionsService();
//     directionsRenderer = new google.maps.DirectionsRenderer();
//     var arizona = new google.maps.LatLng(34.7062978, -116.1274117);
//     var mapOptions = {
//         zoom:7,
//         center: arizona
//     }
//     var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     directionsRenderer.setMap(map);
//     directionsRenderer.setPanel(document.getElementById('directionsPanel'));
// }
//
// function calcRoute() {
//     var start = document.getElementById('start').value;
//     var end = document.getElementById('end').value;
//     var request = {
//         origin: start,
//         destination: end,
//         travelMode: 'DRIVING'
//     };
//     directionsService.route(request, function(result, status) {
//         if (status == 'OK') {
//             directionsRenderer.setDirections(result);
//         }
//     });
// }

// TESTING WAYPOINTS WITH THE DIRECTIONS

// function initMap() {
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 6,
//         center: { lat: 41.85, lng: -87.65 },
//     });
//     directionsRenderer.setMap(map);
//     document.getElementById("submit").addEventListener("click", () => {
//         calculateAndDisplayRoute(directionsService, directionsRenderer);
//     });
//
//
// }

// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: { lat: 32.8205865, lng: -96.8716371 },
//     });
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer({
//         draggable: true,
//         map,
//         panel: document.getElementById("right-panel"),
//     });
//     directionsRenderer.addListener("directions_changed", () => {
//         computeTotalDistance(directionsRenderer.getDirections());
//     });
//     displayRoute(
//         "Ozona, TX",
//         "Sheffield, TX",
//         directionsService,
//         directionsRenderer
//     );
// }
//


// function computeTotalDistance(result) {
//     let total = 0;
//     const myroute = result.routes[0];
//
//     for (let i = 0; i < myroute.legs.length; i++) {
//         total += myroute.legs[i].distance.value;
//     }
//     total = total / 1000;
//     document.getElementById("total").innerHTML = total + " km";
// }
//
// var map;

//
// function initMap() {
//     var lat_lng = {lat: 34.7062978, lng:  -116.1274117};
//
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 7,
//         center: lat_lng,
//     });
//
//     // This event listener will call addMarker() when the map is clicked.
//     map.addListener('click', function(event) {
//         addMarker(event.latLng);
//     });
//
//     // Adds a marker at the center of the map.
//     addMarker(lat_lng);
// }



//
// // Update lat/long value of div when anywhere in the map is clicked
// google.maps.event.addEventListener(map,'click',function(event) {
//     document.getElementById('latclicked').innerHTML = event.latLng.lat();
//     document.getElementById('longclicked').innerHTML =  event.latLng.lng();
// });
//
// // Update lat/long value of div when you move the mouse over the map
// google.maps.event.addEventListener(map,'mousemove',function(event) {
//     document.getElementById('latmoved').innerHTML = event.latLng.lat();
//     document.getElementById('longmoved').innerHTML = event.latLng.lng();
// });


var map;
var markers = [];

function initMap() {

    var latitude = 34.7062978; // YOUR LATITUDE VALUE
    var longitude = -116.1274117; // YOUR LONGITUDE VALUE

    var myLatLng = {lat: 34.7062978, lng: -116.1274117};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        disableDoubleClickZoom: true, // disable the default map zoom on double click
    });

    // Update lat/long value of div when anywhere in the map is clicked
    google.maps.event.addListener(map,'click',function(event) {
        document.getElementById('latclicked').innerHTML = event.latLng.lat();
        document.getElementById('longclicked').innerHTML =  event.latLng.lng();
    });

    // Update lat/long value of div when you move the mouse over the map
    google.maps.event.addListener(map,'mousemove',function(event) {
        document.getElementById('latmoved').innerHTML = event.latLng.lat();
        document.getElementById('longmoved').innerHTML = event.latLng.lng();
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        //title: 'Hello World'

        // setting latitude & longitude as title of the marker
        // title is shown when you hover over the marker
        title: latitude + ', ' + longitude
    });

    // Update lat/long value of div when the marker is clicked
    marker.addListener('click', function(event) {
        document.getElementById('latclicked').innerHTML = event.latLng.lat();
        document.getElementById('longclicked').innerHTML =  event.latLng.lng();
    });

    var currentId = 0;
    var uniqueId = function() {
        return ++currentId;
    }
    var objLoc = {};
    // Create new marker on single click event on the map
    google.maps.event.addListener(map,'click',function(event) {
        var id = uniqueId(); // get new id
        var marker = new google.maps.Marker({
            id: id,
            position: event.latLng,
            map: map,
            title: event.latLng.lat()+', '+event.latLng.lng()

        });
        var obj = {};

        obj["lat"] = event.latLng.lat();
        obj["lng"] = event.latLng.lng();
        markers.push(obj);
        Object.assign(objLoc, obj)


        console.log(objLoc)
        console.log(markers)
    });


}

var realPoints = [{lat: 34.70171128524146, lng: -116.14878354404999}, {lat: 34.70324799225423, lng: -116.141402104841}, {lat: 34.70120165679538, lng: -116.12518010471894}, {lat: 34.705929320728494, lng: -116.1165112051828}]


// THIS WILL TURN COORDINATES THAT WHERE ENTERED INTO LOCATION FORMAT TO BE USED IN THE "displayRoute()" function
var mapRealPoints = realPoints.map(n => {
    const objTest = { location: n};
    return objTest
});

console.log(mapRealPoints)

var testPoints = [ {location:{lat: 30.8756133, lng: -101.571342 }},{location: {lat: 30.8650913, lng: -101.6466300}},{ location: {lat: 30.739580, lng:-101.659839}}]

function displayRoute(origin, destination, service, display) {
    service.route(
        {
            origin: origin,
            destination: destination,
            waypoints: mapRealPoints,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true,
        },
        (result, status) => {
            if (status === "OK") {
                display.setDirections(result);
            } else {
                alert("Could not display directions due to: " + status);
            }
        }
    );
}


// // Adds a marker to the map and push to the array.
// function addMarker(location) {
//     var marker = new google.maps.Marker({
//         position: location,
//         map: map
//     });
//
// }



// SEARCH FOR CITY WITH WAYPOINTS IN BETWEEN
// function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//     const waypts = [];
//     const checkboxArray = document.getElementById("waypoints");
//
//     for (let i = 0; i < checkboxArray.length; i++) {
//         if (checkboxArray.options[i].selected) {
//             waypts.push({
//                 location: checkboxArray[i].value,
//                 stopover: true,
//             });
//         }
//     }
//     directionsService.route(
//         {
//             origin: document.getElementById("start").value,
//             destination: document.getElementById("end").value,
//             waypoints: waypts,
//             optimizeWaypoints: true,
//             travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//                 const route = response.routes[0];
//                 const summaryPanel = document.getElementById("directions-panel");
//                 summaryPanel.innerHTML = "";
//
//                 // For each route, display summary information.
//                 for (let i = 0; i < route.legs.length; i++) {
//                     const routeSegment = i + 1;
//                     summaryPanel.innerHTML +=
//                         "<b>Route Segment: " + routeSegment + "</b><br>";
//                     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//                     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//                     summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//                 }
//             } else {
//                 window.alert("Directions request failed due to " + status);
//             }
//         }
//     );
// }

// function calculateAndDisplayRouteConverse(directionsService, directionsRenderer) {
//
//     directionsService.route(
//         {
//             origin: "Converse, TX",
//             destination: "Converse, TX",
//             waypoints: [{
//                 location: "San Marcos, TX",
//                 stopover: true,
//             }, {
//                 location: "Johnson, TX",
//                 stopover: true,
//             }],
//             optimizeWaypoints: true,
//             travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//                 const route = response.routes[0];
//                 const summaryPanel = document.getElementById("directions-panel");
//                 summaryPanel.innerHTML = "";
//
//                 // For each route, display summary information.
//                 for (let i = 0; i < route.legs.length; i++) {
//                     const routeSegment = i + 1;
//                     summaryPanel.innerHTML +=
//                         "<b>Route Segment: " + routeSegment + "</b><br>";
//                     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//                     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//                     summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//                 }
//             } else {
//                 window.alert("Directions request failed due to " + status);
//             }
//         }
//     );
// }
//
//
// function calculateAndDisplayRouteElPaso(directionsService, directionsRenderer) {
//     directionsService.route(
//         {
//             origin: "El Paso, TX",
//             destination: "El Paso, TX",
//             waypoints: [{
//                 location: "Ruidoso, NM",
//                 stopover: true,
//             }, {
//                 location: "Las Cruces, NM",
//                 stopover: true,
//             }],
//             optimizeWaypoints: true,
//             travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 directionsRenderer.setDirections(response);
//                 const route = response.routes[0];
//                 const summaryPanel = document.getElementById("directions-panel");
//                 summaryPanel.innerHTML = "";
//
//                 // For each route, display summary information.
//                 for (let i = 0; i < route.legs.length; i++) {
//                     const routeSegment = i + 1;
//                     summaryPanel.innerHTML +=
//                         "<b>Route Segment: " + routeSegment + "</b><br>";
//                     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//                     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//                     summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
//                 }
//             } else {
//                 window.alert("Directions request failed due to " + status);
//             }
//         }
//     );
// }


// document.getElementById("converse").addEventListener("click", calculateAndDisplayRouteConverse)
//
// document.getElementById("El_Paso").addEventListener("click", calculateAndDisplayRouteElPaso)

