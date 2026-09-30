const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Product Schema & Model with Image Field
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// GET route for fetching all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Connect to MongoDB Atlas and Start Server
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Live Connection Established Successfully!');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error('DB Connection Error:', err));