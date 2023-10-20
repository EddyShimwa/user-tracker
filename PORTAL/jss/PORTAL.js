var map = L.map('map').setView([-1.92492,30.22882 ], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    // tileLayers
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);

let streets = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);
let satellite = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
let Terrain = L.tileLayer("http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
let Hybrid = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  });

// creating  an object to hold layer names as you want them to appear in the basemap switcher list
let basemapControl = {
  Streets: streets,
  Satellite: satellite,
  Terrain: Terrain,
  Hybrid: Hybrid,
}
new L.control.layers(basemapControl).addTo(map);



// adding scale
L.control.scale({ metric:500,imperial:false,position:'bottomright' }).addTo(map);


L.marker([-1.92492,30.22882 ]).addTo(map)
    .bindPopup('<strong>PHYSICAL PLAN</strong>')
    .openPopup();


/*Legend specific*/
    var legend = L.control({ position: "bottomleft" });
    
    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>LEGEND</h4>";
      div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
      div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
      div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
      div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
      div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
      
      return div;
    };
    
    legend.addTo(map);
    

// geocoding
//  GEOCODING            
var searchControl = new L.Control.Search({
  position: "topright",
  // textPlaceholder: "Search by UPI, zone or cell",
  // propertyName: "Zoning",
  // propertyName: "upi",
  // // layer: L.featureGroup([ 'mbandazishapefile.zip']),
  moveToLocation: function (latlng, title, map) {
    map.fitBounds( latlng.layer.getBounds() );
    var zoom = map.getBoundsZoom(latlng.layer.getBounds());
    map.setView(latlng, zoom); // access the zoom
  },
}).addTo(map);


 searchControl
  .on("search:locationfound", function (e) {
    e.layer.setStyle({
      fillColor: "none",
      color: "hwb(178deg 0% 0%)",
      weight: 3,
    });
    if (e.layer._popup) e.layer.openPopup();
  })
  .on("search:collapsed", function (e) {
    featuresLayer.eachLayer(function (layer) {
      //restore feature color
      featuresLayer.resetStyle(layer);
    });
  });

map.addControl(searchControl);
