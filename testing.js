    var testPoints = [{location: {lat: 30.8756133, lng: -101.571342}},
        {location: {lat: 30.8650913, lng: -101.6466300}},
        {location: {lat: 30.739580, lng: -101.659839}}]

    function initMap() {
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
            "El Paso, TX",
            "Dallas, TX",
            directionsService,
            directionsRenderer
        );
    }





    function displayRoute(origin, destination, service, display) {
        // markers = markers.map(n => {
        //     const markerMapped = {location: n};
        //     return markerMapped
        // });
        // console.log(markers)

        service.route(
            {
                origin: origin,
                destination: destination,
                waypoints: testPoints,
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