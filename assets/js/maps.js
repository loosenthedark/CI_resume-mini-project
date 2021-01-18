function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2.7,
        center: {
            lat: 46.619261,
            lng: -40.134766
        }
    });

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var locations = [
        { lat: 53.3441915, lng: -6.2618256 },
        { lat: 53.3454391, lng: -6.2616357 },
        { lat: 40.7276647, lng: -74.0089732 },
        { lat: 40.73395, lng: -74.0051846 }
    ];

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}