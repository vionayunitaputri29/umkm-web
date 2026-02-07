const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (izinkan akses dari frontend)
app.use(cors());
app.use(express.json());

// Import Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Koneksi ke Database MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ Connection Error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});