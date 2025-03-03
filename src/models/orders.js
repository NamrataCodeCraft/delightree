const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        priceAtPurchase: {
            type: Number,
        }
    }],
    totalAmount: {
        type: Number,
    },
    orderDate: {
        type: Date,
    },
    status: {
        type: String,
    },

}, { timeseries: true, versionKey: false })


module.exports = mongoose.model('order', orderSchema);