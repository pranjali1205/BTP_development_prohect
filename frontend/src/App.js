import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
//import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import * as ELG from 'esri-leaflet-geocoder';


function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {

    if (map.current) return;

    map.current = L.map(mapContainer.current).setView([13.6288, 79.4192], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map.current);

    const LeafIcon = L.Icon.extend({
      options: {
        iconSize: [25, 30],
        
      },
    });

    const customIcon = new LeafIcon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png' });

    // Example marker with custom icon
    L.marker([13.6290, 79.4259], { icon: customIcon }).addTo(map.current);

//     L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
//   maxZoom: 20,
//   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
// }).addTo(map.current);


//     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVlcGFrODM1MCIsImEiOiJjbGxqZ3cycWowdXFuM2RsaWMzMnh2cjZpIn0.2SHBdM7eqkRzxVw4x3gyag', {
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoiZGVlcGFrODM1MCIsImEiOiJjbGxqZ3cycWowdXFuM2RsaWMzMnh2cjZpIn0.2SHBdM7eqkRzxVw4x3gyag'
// }).addTo(map.current);



    // Add a custom control to show coordinates
    const coordinatesControl = L.control();
    coordinatesControl.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'coordinates-control');
      this.update();
      return this._div;
    };
    coordinatesControl.update = function (latlng) {
      this._div.innerHTML = latlng ? `Latitude: ${latlng.lat.toFixed(4)}<br>Longitude: ${latlng.lng.toFixed(4)}` : '';
    };
    coordinatesControl.addTo(map.current);

    map.current.on('mousemove', (e) => {
      coordinatesControl.update(e.latlng);
    });
  }, []);

  const handleSearchChange = (newSearchText) => {
    // Update the map's center based on search text
    const geocoder = ELG.geocodeService();

    geocoder.geocode().text(newSearchText).run((error, response) => {
      if (error) {
        console.error('Geocoding error:', error);
        return;
      }

      const results = response.results;
      if (results && results.length > 0) {
        const [newLat, newLng] = results[0].latlng;
        map.current.setView([newLat, newLng]);
      }
    });

    console.log('Search text changed:', newSearchText);
  };

  const handleSourceChange = (newSource) => {
    // Handle source change logic here
    console.log('Source changed:', newSource);
    // You can update the map or perform other actions based on the source change
  };

  const handleDestinationChange = (newDestination) => {
    // Handle destination change logic here
    console.log('Destination changed:', newDestination);
    // You can update the map or perform other actions based on the destination change
  };

  return (
    <div className="app-container">
      <div className="row align-items-start">
        <Sidebar
          onSearchChange={handleSearchChange}
          onSourceChange={handleSourceChange}
          onDestinationChange={handleDestinationChange}
        />
        <div className="col-9">
          <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '90vh' }} />
        </div>
      </div>
    </div>
  );
}

export default App;
