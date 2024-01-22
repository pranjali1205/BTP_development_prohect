const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

const Store = require('./models/Store');
// Connect to the MongoDB database
connectDB();

const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

app.use(cors());


app.use(express.static(path.join(__dirname,'public')));
// Define a POST route to add a store
app.post('/test/stores', async (req, res) => {
  try {
    // Access the data from the request body
    const postData = req.body;

    // Create a new store in the database using the data from the request
    const newStore = await Store.create(postData);

    // Respond with a success message and the created store data
    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Already data existing' });
  }
});

// Define a GET route to retrieve store data
app.get('/test/stores', async (req, res) => {
  try {
    // Retrieve all stores from the database
    const stores = await Store.find();
    getStores(stores);
    // Respond with the retrieved store data
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
