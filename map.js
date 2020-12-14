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

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 41.85, lng: -87.65 },
    });
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });


}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];
    const checkboxArray = document.getElementById("waypoints");

    for (let i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true,
            });
        }
    }
    directionsService.route(
        {
            origin: document.getElementById("start").value,
            destination: document.getElementById("end").value,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                const route = response.routes[0];
                const summaryPanel = document.getElementById("directions-panel");
                summaryPanel.innerHTML = "";

                // For each route, display summary information.
                for (let i = 0; i < route.legs.length; i++) {
                    const routeSegment = i + 1;
                    summaryPanel.innerHTML +=
                        "<b>Route Segment: " + routeSegment + "</b><br>";
                    summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                    summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                    summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
                }
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}

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

