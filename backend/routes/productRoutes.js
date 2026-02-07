const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ambil semua produk kopi dari database
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tambah produk kopi baru ke database
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;