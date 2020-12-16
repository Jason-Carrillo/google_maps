


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



// TEST COORDINATES
// {lat: 34.7062978, lng: -116.1274117}



function initMap() {

    var map;

    var marker = new google.maps.Marker({
        position: {lat: 34.7062978, lng: -116.1274117},
        map: map,

    });

    var lat_lng = {lat: 34.7062978, lng:  -116.1274117};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: lat_lng,
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

    // Adds a marker at the center of the map.
    addMarker(lat_lng);

    // Update lat/long value of div when you move the mouse over the map
    google.maps.event.addListener(map, 'mousemove', function (event) {
        document.getElementById('latmoved').innerHTML = event.latLng.lat();
        document.getElementById('longmoved').innerHTML = event.latLng.lng();
    });

    // Update lat/long value of div when the marker is clicked
    marker.addListener('click', function (event) {
        document.getElementById('latclicked').innerHTML = event.latLng.lat();
        document.getElementById('longclicked').innerHTML = event.latLng.lng();
    });

    var currentId = 0;
    var uniqueId = function () {
        return ++currentId;
    }


// // Adds a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

    }
    var markers = [];
    var objLoc = {};
    // Create new marker on single click event on the map
    google.maps.event.addListener(map, 'click', function (event) {
        var id = uniqueId(); // get new id
        var marker = new google.maps.Marker({
            id: id,
            position: event.latLng,
            map: map,
            title: event.latLng.lat() + ', ' + event.latLng.lng()

        });
        var obj = {};

        obj["lat"] = event.latLng.lat();
        obj["lng"] = event.latLng.lng();
        markers.push(obj);
        Object.assign(objLoc, obj)


        console.log(objLoc)
        console.log(markers)
    });


        function initMapRoute() {
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: {lat: 34.7062978, lng: -116.1274117},
            });
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
                draggable: true,
                map,
                panel: document.getElementById("right-panel"),
            });

            displayRoute(
                markers[0],
                markers[markers.length-1],
                directionsService,
                directionsRenderer
            );
        }



        function displayRoute(origin, destination, service, display) {
            markers = markers.map(n => {
                const markerMapped = {location: n};
                return markerMapped
            });
            console.log(markers)

            service.route(
                {
                    origin: origin,
                    destination: destination,
                    waypoints: markers,
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

    $(function(){
        $( "#testbtn" ).on( 'click', initMapRoute);
    });

    function testLog(){
        console.log(markers)
    }


    //Closing Brace of INITMAP
}





// THIS WILL TURN COORDINATES THAT WHERE ENTERED INTO LOCATION FORMAT TO BE USED IN THE "displayRoute()" function
//     var mapRealPoints = realPoints.map(n => {
//         const objTest = {location: n};
//         return objTest
//     });
//
//
//     var testPoints = [{location: {lat: 30.8756133, lng: -101.571342}},
//         {location: {lat: 30.8650913, lng: -101.6466300}},
//         {location: {lat: 30.739580, lng: -101.659839}}]

// }


    // ADD WAY POINTS IN THE MIDDLE OF A ROUTE
    // function displayRoute(origin, destination, service, display) {
    //     service.route(
    //         {
    //             origin: origin,
    //             destination: destination,
    //             waypoints: mapRealPoints,
    //             travelMode: google.maps.TravelMode.DRIVING,
    //             avoidTolls: true,
    //         },
    //         (result, status) => {
    //             if (status === "OK") {
    //                 display.setDirections(result);
    //             } else {
    //                 alert("Could not display directions due to: " + status);
    //             }
    //         }
    //     );
    // }

// }




var realPoints = [{lat: 34.70171128524146, lng: -116.14878354404999}, {
    lat: 34.70324799225423,
    lng: -116.141402104841
}, {lat: 34.70120165679538, lng: -116.12518010471894}, {lat: 34.705929320728494, lng: -116.1165112051828}]








// document.getElementById("testbtn").addEventListener("click", notify());

// $("testbtn").on("click", displayRouteWithPoints())





