import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import * as ELG from 'esri-leaflet-geocoder';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([13.6288, 79.4192], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map.current);

      const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41], // Default size for Leaflet markers
        iconAnchor: [12, 41], // Half of the icon's size for correct placement
      });

      L.marker([13.6290, 79.4259], { icon: customIcon }).addTo(map.current);

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
    }
  }, []);

  const handleSearchChange = (newSearchText) => {
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
    console.log('Source changed:', newSource);
  };

  const handleDestinationChange = (newDestination) => {
    console.log('Destination changed:', newDestination);
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
