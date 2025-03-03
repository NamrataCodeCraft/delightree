const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timeseries: true })


module.exports = mongoose.model('customer', customerSchema);