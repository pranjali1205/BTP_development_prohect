import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlcGFrODM1MCIsImEiOiJjbGxqZ3cycWowdXFuM2RsaWMzMnh2cjZpIn0.2SHBdM7eqkRzxVw4x3gyag';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(78.4867);
  const [lat, setLat] = useState(17.3850);
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      const source = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      };

      const layer = {
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': 'red',
          'line-opacity': 0.7,
          'line-width': 2
        }
      };

      const locationIconStart = {
        id: 'location-start',
        type: 'symbol',
        source: 'route',
        layout: {
          'icon-image': 'location-icon',
          'icon-allow-overlap': true,
          'icon-size': 1
        },
        paint: {}
      };

      const locationIconEnd = {
        id: 'location-end',
        type: 'symbol',
        source: 'route',
        layout: {
          'icon-image': 'location-icon',
          'icon-allow-overlap': true,
          'icon-size': 1
        },
        paint: {}
      };

      const dropIcon = {
        id: 'location-drop',
        type: 'symbol',
        source: 'route',
        layout: {
          'icon-image': 'drop-icon',
          'icon-allow-overlap': true,
          'icon-size': 1
        },
        paint: {
          'icon-color': 'red' // Set the color of the destination drop symbol to red
        }
      };

      map.current.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.current.addImage('location-icon', image);
          
          // Add Hyderabad marker
          map.current.addSource('hyderabad', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [78.4867, 17.3850]
                  },
                  properties: {
                    'marker-color': 'blue',
                    'marker-symbol': 'marker'
                  }
                }
              ]
            }
          });

          map.current.addLayer({
            id: 'hyderabad',
            type: 'symbol',
            source: 'hyderabad',
            layout: {
              'icon-image': 'location-icon',
              'icon-allow-overlap': true,
              'icon-size': 1
            },
            paint: {}
          });

          // Add Bangalore marker
          map.current.addSource('bangalore', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [77.5946, 12.9716]
                  },
                  properties: {
                    'marker-color': 'red',
                    'marker-symbol': 'marker'
                  }
                }
              ]
            }
          });

          map.current.addLayer({
            id: 'bangalore',
            type: 'symbol',
            source: 'bangalore',
            layout: {
              'icon-image': 'location-icon',
              'icon-allow-overlap': true,
              'icon-size': 1
            },
            paint: {}
          });

          map.current.addSource('route', source);
          map.current.addLayer(layer);
          map.current.addLayer(locationIconStart);
          map.current.addLayer(locationIconEnd);
          map.current.addLayer(dropIcon);

          const directionsAPI = `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat};77.5946,12.9716?alternatives=false&geometries=geojson&access_token=${mapboxgl.accessToken}`;

          fetch(directionsAPI)
            .then(response => response.json())
            .then(data => {
              const route = data.routes[0].geometry;
              map.current.getSource('route').setData(route);

              const start = data.waypoints[0].location;
              const end = data.waypoints[1].location;

              map.current.flyTo({
                center: start,
                zoom: zoom
              });

              map.current.addSource('location-start', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: start
                      }
                    }
                  ]
                }
              });

              map.current.addSource('location-end', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: end
                      }
                    }
                  ]
                }
              });

              map.current.addSource('location-drop', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: end
                      }
                    }
                  ]
                }
              });
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        }
      );
    });
  }, [lat, lng, zoom]);

  return (
    <div className="app-container">
      <div className="row align-items-start">
        <div className="row gx-3">
          <div className="col">
            <div className="p-4 border bg-light">Longitude: {lng}</div>
          </div>
          <div className="col">
            <div className="p-4 border bg-light">Latitude: {lat}</div>
          </div>
          <div className="col">
            <div className="p-4 border bg-light">Zoom: {zoom}</div>
          </div>
        </div>
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: '100%', height: '90vh' }}
      />
    </div>
  );
}

export default App;