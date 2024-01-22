// const mongoose = require('mongoose');
// const geocoder = require('../utils/geocoder');

// const StoreSchema = new mongoose.Schema({
    
//           id: {
//             type: Number,
//             required: true,
//             unique: true,
//           },
//           type: {
//             type: String,
//             enum: ['Feature'],
//           },
//             properties: {
//               stop_id: {
//                 type: Number,
//                 required: true,
//                 unique: true,
//               },
//               stop_code: {
//                 type: [null,String]
//               },
//               stop_name: {
//                 type: String
//               },
//               stop_desc: {
//                 type:[null,String]
//               },
//               stop_lat: {
//                 type: Number
//               },
//               stop_lon: {
//                 type: Number
//               }
//             },
          
//           geometry: {
//              type: {
//                 type: String,
//                 enum: ['Point'],
//               },
//               coordinates: {
//                 type: [Number],
//                 index: '2dsphere',
//               },
//             },
      
// });

// // Geocode and create location.
// // StoreSchema.pre('save', async function (next) {
// //   const loc = await geocoder.geocode(this.address);
// //   this.location = {
// //     type: 'Point',
// //     coordinates: [loc[0].longitude, loc[0].latitude],
// //     formattedAddress: loc[0].formattedAddress,
// //   };

// //   this.address = undefined;
// //   next();
// // });

// const Store = mongoose.model('Store', StoreSchema);
// module.exports = Store;



// {
//     "id": "0",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 1,
//       "stop_name": "Dilshad Garden",
//       "stop_lat": 28.675991,
//       "stop_lon": 77.321495
//     },
//     "geometry": { "type": "Point", "coordinates": [77.321495, 28.675991] }
//   },
//   {
//     "id": "1",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 2,
//       "stop_name": "Jhilmil",
//       "stop_lat": 28.675648,
//       "stop_lon": 77.312393
//     },
//     "geometry": { "type": "Point", "coordinates": [77.312393, 28.675648] }
//   },
//   {
//     "id": "2",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 3,
//       "stop_name": "Mansrover park",
//       "stop_lat": 28.675352,
//       "stop_lon": 77.301178
//     },
//     "geometry": { "type": "Point", "coordinates": [77.301178, 28.675352] }
//   },
//   {
//     "id": "3",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 4,
//       "stop_name": "Shahdara",
//       "stop_lat": 28.673531,
//       "stop_lon": 77.28727
//     },
//     "geometry": { "type": "Point", "coordinates": [77.28727, 28.673531] }
//   },
//   {
//     "id": "4",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 5,
//       "stop_name": "Welcome",
//       "stop_lat": 28.671986,
//       "stop_lon": 77.277931
//     },
//     "geometry": { "type": "Point", "coordinates": [77.277931, 28.671986] }
//   },
//   {
//     "id": "5",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 6,
//       "stop_name": "Seelam Pur",
//       "stop_lat": 28.670324,
//       "stop_lon": 77.267311
//     },
//     "geometry": { "type": "Point", "coordinates": [77.267311, 28.670324] }
//   },
//   {
//     "id": "6",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 7,
//       "stop_name": "Shastri Park",
//       "stop_lat": 28.668451,
//       "stop_lon": 77.250404
//     },
//     "geometry": { "type": "Point", "coordinates": [77.250404, 28.668451] }
//   },
//   {
//     "id": "7",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 8,
//       "stop_name": "Kashmere Gate",
//       "stop_lat": 28.667879,
//       "stop_lon": 77.228012
//     },
//     "geometry": { "type": "Point", "coordinates": [77.228012, 28.667879] }
//   },
//   {
//     "id": "8",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 9,
//       "stop_name": "Tis Hazari",
//       "stop_lat": 28.667137,
//       "stop_lon": 77.216721
//     },
//     "geometry": { "type": "Point", "coordinates": [77.216721, 28.667137] }
//   },
//   {
//     "id": "9",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 10,
//       "stop_name": "Pul Bangash",
//       "stop_lat": 28.66571,
//       "stop_lon": 77.206329
//     },
//     "geometry": { "type": "Point", "coordinates": [77.206329, 28.66571] }
//   },
//   {
//     "id": "10",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 11,
//       "stop_name": "Pratap Nagar",
//       "stop_lat": 28.666632,
//       "stop_lon": 77.196869
//     },
//     "geometry": { "type": "Point", "coordinates": [77.196869, 28.666632] }
//   },
//   {
//     "id": "11",
//     "type": "Feature",
//     "properties": {
//       "stop_id": 12,
//       "stop_name": "Shastri Nagar",
//       "stop_lat": 28.670135,
//       "stop_lon": 77.181679
//     },
//     "geometry": { "type": "Point", "coordinates": [77.181679, 28.670135] }
//   },




    