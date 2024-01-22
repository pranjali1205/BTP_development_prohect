const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeStopId = document.getElementById('stop-id');
const storeStopName = document.getElementById('stop-name');
const storeStopLat = document.getElementById('stop-lat');
const storeStopLon = document.getElementById('stop-lon');



async function addStore(e) {
  e.preventDefault();


  const sendBody = {
    id: parseInt(storeId.value),
    type: "Feature",
    properties: {
      stop_id: parseInt(storeStopId.value),
      stop_name: storeStopName.value,
      stop_lat: parseFloat(storeStopLat.value),
      stop_lon: parseFloat(storeStopLon.value)
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(storeStopLon.value), parseFloat(storeStopLat.value)]
    }
  };

  try {
    const res = await fetch('/test/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Store already exists!');
    }

    alert('Store added!');
    window.location.href = '/add.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addStore);
