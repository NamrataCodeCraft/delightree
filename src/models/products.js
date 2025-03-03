const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
}, { timeseries: true, versionKey: false })


module.exports = mongoose.model('product', productSchema);