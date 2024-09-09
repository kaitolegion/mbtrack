const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osmAttrib = '';
let osm = new L.TileLayer(osmUrl, {
  attribution: osmAttrib,
  detectRetina: true
});

// please replace this with your own mapbox token!
const token = "pk.eyJ1Ijoia2FpdG9jb2RpbmciLCJhIjoiY2x2dzRoN3U4MXJtZjJqbXMybHgzazVrYiJ9.ROaQ2Qqr9aT4sEHRElcFPw";
const mapboxUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=" + token;
const mapboxAttrib = '';
let mapbox = new L.TileLayer(mapboxUrl, {
  attribution: mapboxAttrib,
  tileSize: 512,
  zoomOffset: -1
});

let map = new L.Map("map", {
  layers: [mapbox],
  center: [51.505, -0.09],
  zoom: 10,
  zoomControl: true
});


  var options = {
    position: "topright",
    strings : {
        title: "hi"
    }
  };

  L.control.locate(options).addTo(map);


  map.animate({
    from: {
      rotation: 0,
    },
    to: {
      rotation: 45,
    },
    duration: 1000,
  });

