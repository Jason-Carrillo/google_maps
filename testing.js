function initMap() {

    console.log("test")
    var map;
    let markers = []

    var lat_lng = { lat: 29.4245, lng: -98.4931 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: lat_lng,
    });
    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

    const summaryPanel = document.getElementById("directions-panel");
    summaryPanel.innerHTML = "";

    document.getElementById("distance").value = "";
    document.getElementById("time").value = "";

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
    ;
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
        if (document.getElementById("routeCheck").checked === true) {
            markers.push(markers[0]);
        }


        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: true,
            map,
            panel: document.getElementById("right-panel"),
        });
        console.log(markers)
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    }


    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        const waypts = [];

        markers = markers.map(n => {
            const markerMapped = {location: n};
            return markerMapped
        });

        console.log(markers[0].location.lat)

        let markersString = [];
        for(let i = 0; i < markers.length; i++){

            markersString.push("{location: {lat: " + markers[i].location.lat + ", lng: " + markers[i].location.lng + " }}");
            console.log(markersString)
        }

        for (let i = 1; i < markers.length; i++) {
            waypts.push({
                location: markers[i],
                stopover: true,
            });

        }
        directionsService.route(
            {
                origin: markers[0],
                destination: markers[markers.length-1],
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
                    let distance = document.getElementById("distance");
                    let time = document.getElementById("time");

                    let totalDistance = 0;
                    let totalDuration = 0;

                    // For each route, display summary information.
                    for (let i = 0; i < route.legs.length-1; i++) {
                        const routeSegment = i + 1;

                        totalDistance += parseFloat(route.legs[i].distance.text);
                        totalDuration += parseInt(route.legs[i].duration.text);


                        console.log(route.legs[i].distance.text)

                        summaryPanel.innerHTML +=
                            "<b>Route Segment: " + routeSegment + "</b><br>";
                        summaryPanel.innerHTML += route.legs[i].start_address + "<br> to <br>";
                        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                        summaryPanel.innerHTML += route.legs[i].distance.text + "<br>";
                        summaryPanel.innerHTML += route.legs[i].duration.text + "<br><hr><br>"
                    }

                    console.log(totalDuration)

                    distance.value = totalDistance;
                    time.value = totalDuration;



                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }

    $(function(){
        $( "#testbtn" ).on( 'click', function (){
            initMapRoute();
        });

        $( "#clearBtn" ).on( 'click', initMap);
    });



    //Closing Brace of INITMAP
}