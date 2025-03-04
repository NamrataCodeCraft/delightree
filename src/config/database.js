
const mongoose = require("mongoose");
require('dotenv').config()

async function databaseConnection() {
    try {
        await mongoose.connect("mongodb+srv://namratajaiswal102441:namratajaiswal@cluster0.pp0c8.mongodb.net/delightree" || process.env.DBURL)
        console.log('database is connected')

    } catch (err) {
        console.log('errr', err)
    }

}

module.exports = databaseConnection