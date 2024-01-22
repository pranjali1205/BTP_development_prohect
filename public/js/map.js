mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlcGFrODM1MCIsImEiOiJjbGxqZ3cycWowdXFuM2RsaWMzMnh2cjZpIn0.2SHBdM7eqkRzxVw4x3gyag';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  color: "#FFFFFF",
  center: [77.157895, 28.707741]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/test/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      //storeId: store.id,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.geometry.coordinates[0],
          store.geometry.coordinates[1]a
        ]
      },
      properties: {
        storeStopId: store.properties.stop_id, // Update with the new property names
        icon: 'pin', // Use 'pin' instead of 'marker' for the custom pin
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function () {
    map.loadImage('./image.png', function (error, image) {
      if (error) throw error;

      // Add the custom pin icon as a source
      map.addImage('custom-pin', image);

      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: stores
          }
        },
        layout: {
          'icon-image': 'custom-pin', // Use the custom pin icon
          'icon-size': 0.1,
          'text-field': '{storeStopId}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.5],
          'text-anchor': 'top'
        }
      });
    });
  });
}

// Show path between coordinates
// async function showPath(sourceCoordinates, destinationCoordinates) {
//   const response = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates[0]},${sourceCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?access_token=${mapboxgl.accessToken}`
//   );
//   const data = await response.json();

//   const pathGeometry = data.routes[0].geometry.coordinates;

//   // Display the path on the map
//   map.on('load', () => {
//     map.addLayer({
//       id: 'path',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'Feature',
//           geometry: {
//             type: 'LineString',
//             coordinates: pathGeometry,
//           },
//         },
//       },
//       paint: {
//         'line-color': '#ff0000',
//         'line-width': 4,
//       },
//     });

//     // Fit the map to the bounds of the path
//     const bounds = pathGeometry.reduce((bounds, coord) => {
//       return bounds.extend(coord);
//     }, new mapboxgl.LngLatBounds(pathGeometry[0], pathGeometry[0]));

//     map.fitBounds(bounds, {
//       padding: 40,
//     });
//   });
// }

pathForm.addEventListener('submit', showPath);

// Usage example
// const sourceCoordinates = [78.4867, 17.385];
// const destinationCoordinates = [77.5946, 12.9716];

getStores();
//showPath(sourceCoordinates, destinationCoordinates);
