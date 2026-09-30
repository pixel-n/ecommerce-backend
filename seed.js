require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    title: 'Wireless Gaming Headphones',
    price: 89.99,
    description: 'High quality noise cancelling gaming headset.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    title: 'Mechanical Gaming Keyboard',
    price: 129.99,
    description: 'RGB backlit mechanical keyboard with tactile switches.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  },
  {
    title: 'Smart Watch Series 5',
    price: 199.99,
    description: 'Fitness tracking, heart rate monitor, and HD AMOLED display.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas...');
    await Product.deleteMany({}); // Clears old records without images
    await Product.insertMany(sampleProducts);
    console.log('Successfully re-seeded database with images!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDB();