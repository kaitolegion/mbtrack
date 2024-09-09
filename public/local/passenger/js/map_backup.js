// coordinates

// var map = L.map('map',{
//   rotate: true,
// 				rotateControl: {
// 					closeOnZeroBearing: false,
// 				},
// 				bearing: 30,
// 				touchRotate: true,
// }).setView([6.8244269317651245, 125.16390989746955], 13);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.streets',
    maxZoom: 24,
    maxNativeZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
});


var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    maxNativeZoom: 19,
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});


var google = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    minZoom: 1,
    maxZoom: 24,
    subdomains: ['mt0'],
    attribution: 'Google',
});

// map view
var map = L.map('map', {
    center: [6.787150, 125.212952],
    zoom: 11,
    layers: [google],
    rotate: true,
    rotateControl: {
        closeOnZeroBearing: false,
        // position: 'bottomleft',
    },
    bearing: 30,
    touchRotate: true,
});

// change layers
var layers = L.control.layers({
    'Empty': L.tileLayer(''),
    'Streets': osm,
    'Satellite': esri,
    'Google Map': google,
}, null, {
    collapsed: false
}).addTo(map);


// icons
var BusIcon = L.icon({ iconUrl: 'https://www.svgrepo.com/show/527634/bus.svg', iconSize: [25, 40], iconAnchor: [16, 40], popupAnchor: [0, -32] });
var Icon = L.icon({ iconUrl: 'https://cdn.pixabay.com/photo/2013/07/13/11/42/map-158492_1280.png', iconSize: [25, 40], iconAnchor: [16, 30], popupAnchor: [0, -32] });
var TerminalIcon = L.icon({ iconUrl: 'https://www.svgrepo.com/show/384390/flag-location-map-marker-pin-pointer.svg', iconSize: [35, 40], iconAnchor: [0, 40], popupAnchor: [0, -32] });

// variable GET current location
// var current_position, current_accuracy;

// Location found
// function onLocationFound(e) {

//     if (current_position) {
//         map.removeLayer(current_position);
//         map.removeLayer(current_accuracy);
//     }

//     var radius = e.accuracy / 2;

//     // current_position = L.marker(e.latlng, { icon: Icon }).addTo(map)
//     //             .bindPopup("My location").openPopup();
//     current_position = L.marker(e.latlng).addTo(map)
//        .bindPopup("You are within " + radius + " meters from this point").openPopup();

//     current_accuracy = L.circle(e.latlng, radius).addTo(map);
// }

// location error
// function onLocationError(e) {
//     alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

// // locate now
  
// function locate() {
//     map.locate({
//         setView: true,
//         maxZoom: 16
//     });
// }

// call locate every 3 seconds... forever
// setInterval(locate, 3000);

// markers

if ("geolocation" in navigator) {
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(function (position) {

        const { latitude, longitude } = position.coords;


        var terminal1 = [6.787412, 125.212033];
        var terminal2 = [6.762854, 125.341644];

        L.marker([latitude, longitude], { icon: Icon }).addTo(map).bindPopup("My location").openPopup();
        L.circle([latitude, longitude], 1502.35622363).addTo(map);


        // bus routes

        var Buscoordinates = [6.761329, 125.232983];
        L.marker(Buscoordinates, { icon: BusIcon }).addTo(map).bindPopup("Bus Name: Minibus 1<br>Status: Open").openPopup();


        var control = L.Routing.control({
            waypoints: [terminal1, terminal2],
            routeWhileDragging: false,
            createMarker: function (i, waypoint, n) {
                var marker = L.marker(waypoint.latLng, {
                    draggable: false,
                    icon: TerminalIcon
                });
                marker.bindPopup("Terminal " + (i + 1));
                return marker;
            }
        }).addTo(map);


        var geofencingt1 = L.circle(terminal1, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);

        var geofencingt2 = L.circle(terminal2, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);



        // end
    }).addTo(map);
}


var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Set My Location here " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);



var marker = L.rotatedMarker([51.505, -0.09], {
    icon: L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }),
    rotationAngle: 45
}).addTo(map);

map.setRotationAngle(45);

