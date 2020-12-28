function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: {lat: 34.7062978, lng: -116.1274117},
    });
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];
    for (let i = 0; i < markers.length; i++) {
        waypts.push({
                location: markers[i],
                stopover: true,
            });

    }
    directionsService.route(
        {
            origin: "El Paso, TX",
            destination: "Dallas, TX",
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