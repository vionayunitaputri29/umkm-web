const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get All
router.get('/', async (req, res) => {
    try { res.json(await Product.find()); } catch (err) {
        res.status(500).json(err);
    }
});

// Create
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        res.status(201).json(await product.save());
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update (Togle Stok)
router.put('/:id/toggle', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.isAvailable = !product.isAvailable;
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Dihapus" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;