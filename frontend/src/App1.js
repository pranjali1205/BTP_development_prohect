import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'bootstrap/dist/css/bootstrap.min.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlcGFrODM1MCIsImEiOiJjbGxqZ3cycWowdXFuM2RsaWMzMnh2cjZpIn0.2SHBdM7eqkRzxVw4x3gyag';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/deepak8350/clljjcfuh019o01p88w2uc6q6',

      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(3));
    });
  }, [lat, lng, zoom]);

  return (
          <div class="app-container">
            <div class="row align-items-start">
              <div class="row gx-3">

                <div class="col">
                  <div class="p-4 border bg-light">Longitude: {lng}</div>                        
                </div>

                <div class="col">
                  <div class="p-4 border bg-light">Latitude: {lat}</div>
                </div>

                <div class="col">
                   <div class="p-4 border bg-light">Zoom: {zoom}</div>                       
                </div>

              </div> 
            </div>
            <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '90vh' }} />
          
          </div>
  );
}


export default App;