const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, default: "Kopi" },
    description: { type: String },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);