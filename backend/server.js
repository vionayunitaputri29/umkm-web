const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (izinkan akses dari frontend)
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Jalankan Koneksi ke database
connectDB();

// Endpoints
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});